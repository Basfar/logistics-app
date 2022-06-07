import jwt from "jsonwebtoken";
import Rider from "../models/Rider.js";
import PhoneNumber from "../models/PhoneNumber.js";

const authRiderToken = async (req, res, next) => {
  let authHeader;
  if (req.headers.cookie) {
    for (let ck of req.headers.cookie.split("; ")) {
      if (ck.split("=")[0] === "riderToken") {
        authHeader = ck.split("=")[1];
      }
    }
  }
  // req.headers.token;
  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SECRET, async (err, user) => {
      if (err)
        res.status(403).json("Token is not valid! Please login or Register");
      const foundRider = await Rider.findOne({ _id: user.id });
      if (foundRider.otp_verified && user.isRider) {
        req.user = user;
        next();
      } else
        return res.status(403).json("Rider email or phone number not verified");
    });
  } else {
    return res
      .status(401)
      .json("You are not authenticated! Please login or Register");
  }
};

const authRiderOTPVerified = async (req, res, next) => {
  const phone_number = req.body.phone_number;
  const foundNumber = await PhoneNumber.findOne({
    number: parseInt(phone_number.toString().substring(3)),
  });
  const foundRider = await Rider.findOne({ phone_number: foundNumber._id });
  if (foundRider.otp_verified) {
    next();
  } else {
    return res.status(403).json("Phone number not verified");
  }
};

export { authRiderToken, authRiderOTPVerified };
