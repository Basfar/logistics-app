import os from "os";
import url from "url";
import User from "../models/User.js";
import NotificationUser from "../models/NotificationUser.js";
import PhoneNumber from "../models/PhoneNumber.js";
import LocationCol from "../models/Location.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";

const userCtrl = {
  setPassword: async (req, res) => {
    try {
      const password = req.body.password;
      // console.log(parseInt(phone_number.toString().substring(3)));
      // const foundNumber = await PhoneNumber.findOne({
      //   number: parseInt(phone_number.toString().substring(3)),
      // });

      const foundUser = await User.findOne({
        _id: req.user.id,
      });
      if (!foundUser.password) {
        foundUser.password = CryptoJS.AES.encrypt(
          password,
          process.env.SECRET_PASSPHRASE
        ).toString();

        await foundUser.save();

        // const accessToken = jwt.sign(
        //   {
        //     id: foundUser._id,
        //   },
        //   process.env.JWT_SECRET,
        //   { expiresIn: "3d" }
        // );
        // res.cookie("userToken", accessToken, {
        //   maxAge: 3 * 24 * 60 * 60 * 1000,
        //   httpOnly: true,
        // });
        return res.status(200).json({ message: "Password set successfully" });
      } else {
        return res
          .status(400)
          .json({ Message: "You have already set the password" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  addPersonalInfo: async (req, res) => {
    try {
      const { first_name, last_name, email } = req.body;
      // const foundNumber = await PhoneNumber.findOne({
      //   number: parseInt(phone_number.toString().substring(3)),
      // });
      const foundUser = await User.findOne({
        _id: req.user.id,
      });
      foundUser.first_name = first_name;
      foundUser.last_name = last_name;
      foundUser.email = email;

      await foundUser.save();

      const response = await fetch(
        `${process.env.SERVER_HOST}/api/v1/users/otp/email`,
        {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await response.json();

      res.status(200).json({
        message: "Personal Info added successfully",
        ...result,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  addDeliveryLocation: async (req, res) => {
    try {
      const { location_id, name, longitude, latitude } = req.body;
      const type = "delivery";
      // const foundNumber = await PhoneNumber.findOne({
      //   number: parseInt(phone_number.toString().substring(3)),
      // });
      const foundUser = await User.findOne({
        _id: req.user.id,
      });
      const loc = await LocationCol.create({
        location_id,
        type,
        name,
        longitude,
        latitude,
      });
      foundUser.current_location = loc._id;
      await foundUser.save();

      res.status(200).json({
        message: "Delivery Location added successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) res.status(401).json("Wrong credentials");
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_PASSPHRASE
      );
      const psw = hashedPassword.toString(CryptoJS.enc.Utf8);
      const accessToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );
      res.cookie("userToken", accessToken, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      // const { password, ...others } = user._doc;
      if (psw !== req.body.password)
        res.status(401).json({ message: "Wrong password" });
      else res.status(200).json({ accessToken });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },
  logout: (req, res) => {
    res.clearCookie("userToken");
    res.json({ message: "Successfully logged out" });
  },
  getUser: async (req, res) => {
    let foundUser;
    if (req.user) {
      foundUser = await User.findById(req.user.id);
    }
    if (!foundUser) return res.status(404).json({ message: "User not found!" });
    const { password, createdAt, updatedAt, ...others } = foundUser._doc;
    console.log(others);
    const path = url.parse(req.url).path;
    console.log(path);
    console.log(req.headers.host);
    res.status(200).json(others);
  },
  getPendingOrders: async (req, res) => {
    const pendingOrders = await Order.find({
      order_status: "pending",
      user_id: req.user.id,
    });
    res.status(200).json(pendingOrders);
  },
  getDeliveredOrders: async (req, res) => {
    const deliveredOrders = await Order.find({
      delivered: true,
      user_id: req.user.id,
    });
    res.status(200).json(deliveredOrders);
  },
  getNotifications: async (req, res) => {
    const user_id = req.user.id;
    const userNots = await NotificationUser.find({ user_id: user_id });
    res.status(200).json(userNots);
  },
};

export default userCtrl;
