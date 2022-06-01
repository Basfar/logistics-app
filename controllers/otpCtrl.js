import "dotenv/config";
import url from "url";
import { OTP } from "../sequelize.js";
import { encode, decode } from "../middlewares/crypt.js";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import twilio from "twilio";
import sgMail from "@sendgrid/mail";
import User from "../models/User.js";
import Rider from "../models/Rider.js";

import {
  message as message_vf,
  subject_mail as subject_mail_vf,
} from "../templates/email/email_verification.js";
import {
  message as message_f,
  subject_mail as subject_mail_f,
} from "../templates/email/email_forget.js";
import {
  message as message_2fa,
  subject_mail as subject_mail_2fa,
} from "../templates/email/email_2FA.js";

import { message as message_pvf } from "../templates/SMS/phone_verification.js";
import { message as message_pf } from "../templates/SMS/phone_forget.js";
import { message as message_p2fa } from "../templates/SMS/phone_2FA.js";
import PhoneNumber from "../models/PhoneNumber.js";

const AddMinutesToDate = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000);
};

let dates = {
  convert: function (d) {
    // Converts the date in d to a date-object. The input can be:
    //   a date object: returned without modification
    //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
    //   a number     : Interpreted as number of milliseconds
    //                  since 1 Jan 1970 (a timestamp)
    //   a string     : Any format supported by the javascript engine, like
    //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
    //  an object     : Interpreted as an object with year, month and date
    //                  attributes.  **NOTE** month is 0-11.
    return d.constructor === Date
      ? d
      : d.constructor === Array
      ? new Date(d[0], d[1], d[2])
      : d.constructor === Number
      ? new Date(d)
      : d.constructor === String
      ? new Date(d)
      : typeof d === "object"
      ? new Date(d.year, d.month, d.date)
      : NaN;
  },
  compare: function (a, b) {
    // Compare two dates (could be of any type supported by the convert
    // function above) and returns:
    //  -1 : if a < b
    //   0 : if a = b
    //   1 : if a > b
    // NaN : if a or b is an illegal date
    return isFinite((a = this.convert(a).valueOf())) &&
      isFinite((b = this.convert(b).valueOf()))
      ? (a > b) - (a < b)
      : NaN;
  },
  inRange: function (d, start, end) {
    // Checks if date in d is between dates in start and end.
    // Returns a boolean or NaN:
    //    true  : if d is between start and end (inclusive)
    //    false : if d is before start or after end
    //    NaN   : if one or more of the dates is illegal.
    return isFinite((d = this.convert(d).valueOf())) &&
      isFinite((start = this.convert(start).valueOf())) &&
      isFinite((end = this.convert(end).valueOf()))
      ? start <= d && d <= end
      : NaN;
  },
};

const otpCtrl = {
  otpEmail: async (req, res, next) => {
    try {
      const { email } = req.body;
      const path = url.parse(req.url).path;
      let email_subject, email_message;
      if (!email) {
        const response = { Status: "Failure", Details: "Email not provided" };
        return res.status(400).send(response);
      }

      const otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      const now = new Date();
      const expiration_time = AddMinutesToDate(now, 5);

      const newOTP = new OTP({
        otp: otp,
        expiration_time: expiration_time,
      });

      const otp_instance = await newOTP.save();
      let details = {
        timestamp: now,
        check: email,
        success: true,
        message: "OTP sent to user",
        otp_id: otp_instance._id,
      };

      const encoded = encode(JSON.stringify(details));

      email_message = message_vf(otp);
      email_subject = subject_mail_vf;

      let statusCode;
      let resp;

      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: email,
        from: "nologe37@gmail.com", // Use the email address or domain you verified above
        subject: email_subject,
        text: email_message,
      };
      //ES6
      sgMail.send(msg).then(
        () => {
          statusCode = 200;
          resp = {
            Status: "Success",
            Details: encoded,
          };
        },
        (error) => {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
          statusCode = 400;
          resp = {
            Status: "Failure",
            Details: error,
          };
        }
      );
      res.status(statusCode).json(resp);
    } catch (err) {
      const response = { Status: "Failure", Details: err.message };
      console.log("Here in catch");
      return res.status(400).send(response);
    }
  },
  otpPhone: async (req, res, next) => {
    try {
      const { phone_number } = req.body;
      const path = url.parse(req.url).path;

      let phone_message;

      if (!phone_number) {
        const response = {
          Status: "Failure",
          Details: "Phone Number not provided",
        };
        return res.status(400).send(response);
      }

      // Generate OTP
      const otp = otpGenerator.generate(4, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      const now = new Date();
      const expiration_time = AddMinutesToDate(now, 10);

      const newOTP = new OTP({
        otp: otp,
        expiration_time: expiration_time,
      });

      const otp_instance = await newOTP.save();

      let details = {
        timestamp: now,
        check: phone_number,
        success: true,
        message: "OTP sent to user",
        otp_id: otp_instance._id,
      };

      const encoded = encode(JSON.stringify(details));

      phone_message = message_pvf(otp);

      const len = phone_number.toString().length;
      const accountSid = process.env.ACCOUNT_SID;
      const authTokenTwilio = process.env.AUTH_TOKEN_TWILIO;
      const client = twilio(accountSid, authTokenTwilio);
      const newNumber = new PhoneNumber({
        country_code: parseInt(phone_number.toString().substring(0, len - 10)),
        number: parseInt(phone_number.toString().substring(len - 10)),
      });
      await newNumber.save();
      if (path == "/api/v1/users/otp/phone") {
        const newUser = new User({
          phone_number: newNumber._id,
        });
        await newUser.save();
      } else if (path == "/api/v1/riders/otp/phone") {
        const newRider = new Rider({
          phone_number: newNumber._id,
        });
        await newRider.save();
      }
      client.messages
        .create({
          body: phone_message,
          messagingServiceSid: process.env.MESSAGING_SERVICE_SID,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: `+${phone_number}`,
        })
        .then((message) => console.log(message.sid))
        .done();
      return res.status(200).json({ Status: "Success", Details: encoded });
    } catch (err) {
      const response = { Status: "Failure", Details: err.message };
      return res.status(400).send(response);
    }
  },
  verifyOtpEmail: async (req, res, next) => {
    try {
      var currentdate = new Date();
      console.log(currentdate.getHours());
      console.log(currentdate);
      const { verification_key, otp, check } = req.body;
      const path = url.parse(req.url).path;

      if (!verification_key) {
        const response = {
          Status: "Failure",
          Details: "Verification Key not provided",
        };
        return res.status(400).send(response);
      }
      if (!otp) {
        const response = { Status: "Failure", Details: "OTP not Provided" };
        return res.status(400).send(response);
      }
      if (!check) {
        const response = { Status: "Failure", Details: "Check not Provided" };
        return res.status(400).send(response);
      }

      let decoded;

      //Check if verification key is altered or not and store it in variable decoded after decryption
      try {
        decoded = decode(verification_key);
      } catch (err) {
        const response = { Status: "Failure", Details: "Bad Request" };
        return res.status(400).send(response);
      }

      console.log(decoded);

      let obj = JSON.parse(decoded);
      const check_obj = obj.check;

      // Check if the OTP was meant for the same email or phone number for which it is being verified
      if (check_obj != check) {
        const response = {
          Status: "Failure",
          Details: "OTP was not sent to this particular email or phone number",
        };
        return res.status(400).send(response);
      }

      const otp_instance = await OTP.findOne({ _id: obj.otp_id });

      //Check if OTP is available in the DB
      if (otp_instance != null) {
        //Check if OTP is already used or not
        if (otp_instance.verified != true) {
          //Check if OTP is expired or not
          console.log(otp_instance.expiration_time);
          if (dates.compare(otp_instance.expiration_time, currentdate) == 1) {
            //Check if OTP is equal to the OTP in the DB
            if (otp == otp_instance.otp) {
              // Mark OTP as verified or used
              otp_instance.verified = true;
              await otp_instance.save();
              // const foundNumber = await PhoneNumber.findOne({
              //   number: parseInt(check_obj.toString().substring(3)),
              // });

              // let accessToken;
              if (path == "/api/v1/users/otp/verify/email") {
                const foundUser = await User.findOne({
                  email: check,
                });
                foundUser.email_verified = true;
                await foundUser.save();
              } else if (path == "/api/v1/riders/otp/verify/email") {
                const foundRider = await Rider.findOne({
                  email: check,
                });
                foundRider.email_verified = true;
                await foundRider.save();
              }
              const response = {
                Status: "Success",
                Details: "OTP Matched",
                Check: check,
              };
              return res.status(200).send(response);
            } else {
              const response = {
                Status: "Failure",
                Details: "OTP NOT Matched",
              };
              return res.status(400).send(response);
            }
          } else {
            const response = { Status: "Failure", Details: "OTP Expired" };
            return res.status(400).send(response);
          }
        } else {
          const response = { Status: "Failure", Details: "OTP Already Used" };
          return res.status(400).send(response);
        }
      } else {
        const response = { Status: "Failure", Details: "Bad Request" };
        return res.status(400).send(response);
      }
    } catch (err) {
      const response = { Status: "Failure", Details: err.message };
      return res.status(400).send(response);
    }
  },
  verifyOtpPhone: async (req, res, next) => {
    try {
      var currentdate = new Date();
      console.log(currentdate.getHours());
      console.log(currentdate);
      const { verification_key, otp, check } = req.body;
      const path = url.parse(req.url).path;

      if (!verification_key) {
        const response = {
          Status: "Failure",
          Details: "Verification Key not provided",
        };
        return res.status(400).send(response);
      }
      if (!otp) {
        const response = { Status: "Failure", Details: "OTP not Provided" };
        return res.status(400).send(response);
      }
      if (!check) {
        const response = { Status: "Failure", Details: "Check not Provided" };
        return res.status(400).send(response);
      }

      let decoded;

      //Check if verification key is altered or not and store it in variable decoded after decryption
      try {
        decoded = decode(verification_key);
      } catch (err) {
        const response = { Status: "Failure", Details: "Bad Request" };
        return res.status(400).send(response);
      }

      console.log(decoded);

      let obj = JSON.parse(decoded);
      const check_obj = obj.check;

      // Check if the OTP was meant for the same email or phone number for which it is being verified
      if (check_obj != check) {
        const response = {
          Status: "Failure",
          Details: "OTP was not sent to this particular email or phone number",
        };
        return res.status(400).send(response);
      }

      const otp_instance = await OTP.findOne({ _id: obj.otp_id });

      //Check if OTP is available in the DB
      if (otp_instance != null) {
        //Check if OTP is already used or not
        if (otp_instance.verified != true) {
          //Check if OTP is expired or not
          console.log(otp_instance.expiration_time);
          if (dates.compare(otp_instance.expiration_time, currentdate) == 1) {
            //Check if OTP is equal to the OTP in the DB
            if (otp == otp_instance.otp) {
              // Mark OTP as verified or used
              otp_instance.verified = true;
              await otp_instance.save();
              const foundNumber = await PhoneNumber.findOne({
                number: parseInt(check_obj.toString().substring(3)),
              });

              let accessToken;
              if (path == "/api/v1/users/otp/verify/phone") {
                const foundUser = await User.findOne({
                  phone_number: foundNumber._id,
                });
                foundUser.otp_verified = true;
                await foundUser.save();
                accessToken = jwt.sign(
                  {
                    id: foundUser._id,
                  },
                  process.env.JWT_SECRET,
                  { expiresIn: "3d" }
                );
                res.cookie("userToken", accessToken, {
                  maxAge: 3 * 24 * 60 * 60 * 1000,
                  httpOnly: true,
                });
              } else if (path == "/api/v1/riders/otp/verify/phone") {
                const foundRider = await Rider.findOne({
                  phone_number: foundNumber._id,
                });
                foundRider.otp_verified = true;
                await foundRider.save();
                accessToken = jwt.sign(
                  {
                    id: foundRider._id,
                    isRider: true,
                  },
                  process.env.JWT_SECRET,
                  { expiresIn: "3d" }
                );
                res.cookie("riderToken", accessToken, {
                  maxAge: 3 * 24 * 60 * 60 * 1000,
                  httpOnly: true,
                });
              }
              const response = {
                Status: "Success",
                Details: "OTP Matched",
                Check: check,
                accessToken,
              };
              return res.status(200).send(response);
            } else {
              const response = {
                Status: "Failure",
                Details: "OTP NOT Matched",
              };
              return res.status(400).send(response);
            }
          } else {
            const response = { Status: "Failure", Details: "OTP Expired" };
            return res.status(400).send(response);
          }
        } else {
          const response = { Status: "Failure", Details: "OTP Already Used" };
          return res.status(400).send(response);
        }
      } else {
        const response = { Status: "Failure", Details: "Bad Request" };
        return res.status(400).send(response);
      }
    } catch (err) {
      const response = { Status: "Failure", Details: err.message };
      return res.status(400).send(response);
    }
  },
};

export default otpCtrl;
