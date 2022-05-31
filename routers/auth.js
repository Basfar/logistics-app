import jwt from "jsonwebtoken";
import User from "../models/User.js";
import PhoneNumber from "../models/PhoneNumber.js";

const authToken = async (req, res, next) => {
  let authHeader;
  if (req.headers.cookie) {
    for (let ck of req.headers.cookie.split("; ")) {
      if (ck.split("=")[0] === "userToken") {
        authHeader = ck.split("=")[1];
      }
    }
  }
  // req.headers.token;
  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SECRET, async (err, user) => {
      if (err)
        res.status(403).json("Token is not valid! Please login or Register");
      const foundUser = await User.findOne({ _id: user.id });
      if (foundUser.otp_verified) {
        req.user = user;
        next();
      } else
        return res.status(403).json("User email or phone number not verified");
    });
  } else {
    return res
      .status(401)
      .json("You are not authenticated! Please login or Register");
  }
};

const authOTPVerified = async (req, res, next) => {
  const phone_number = req.body.phone_number;
  const foundNumber = await PhoneNumber.findOne({
    number: parseInt(phone_number.toString().substring(3)),
  });
  const foundUser = await User.findOne({
    phone_number: foundNumber._id,
  });
  if (foundUser.otp_verified) {
    next();
  } else {
    return res.status(403).json("Phone number not verified");
  }
};

export { authToken, authOTPVerified };
