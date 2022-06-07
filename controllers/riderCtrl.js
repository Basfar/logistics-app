import Rider from "../models/Rider.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import Order from "../models/Order.js";
import Company from "../models/Company.js";
import NotificationRider from "../models/NotificationRider.js";
import LocationCol from "../models/Location.js";
import PhoneNumber from "../models/PhoneNumber.js";

const riderCtrl = {
  setPassword: async (req, res) => {
    try {
      const { password, company_id } = req.body;
      // const foundNumber = await PhoneNumber.findOne({
      //   number: parseInt(phone_number.toString().substring(3)),
      // });
      const foundRider = await Rider.findOne({
        _id: req.user.id,
      });
      if (!foundRider.password) {
        foundRider.password = CryptoJS.AES.encrypt(
          password,
          process.env.SECRET_PASSPHRASE
        ).toString();

        foundRider.company_id = company_id;
        await foundRider.save();

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
      const foundRider = await Rider.findOne({
        _id: req.user.id,
      });
      foundRider.first_name = first_name;
      foundRider.last_name = last_name;
      foundRider.email = email;

      await foundRider.save();

      // const response = await fetch(
      //   `${process.env.SERVER_HOST}/api/v1/riders/otp/email`,
      //   {
      //     method: "POST",
      //     body: JSON.stringify({ email }),
      //     headers: { "Content-Type": "application/json" },
      //   }
      // );
      // const result = await response.json();

      res.status(200).json({
        message: "Personal Info added successfully",
        // ...result,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  addBikeDetails: async (req, res) => {
    try {
      const { vehicle_type, plate_number } = req.body;
      // const foundNumber = await PhoneNumber.findOne({
      //   number: parseInt(phone_number.toString().substring(3)),
      // });
      const foundRider = await Rider.findOne({
        _id: req.user.id,
      });
      foundRider.vehicle_type = vehicle_type;
      foundRider.plate_number = plate_number;

      await foundRider.save();

      const admin = await Company.findOne({
        company_id: foundRider.company_id,
      });
      if (admin.riders.indexOf(foundRider._id) > -1) {
        admin.riders.push(foundRider._id);
      }

      res.status(200).json({
        message: "Bike details added successfully",
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
      const foundRider = await Rider.findOne({
        _id: req.user.id,
      });
      const loc = await LocationCol.create({
        location_id,
        name,
        longitude,
        latitude,
        type,
      });
      foundRider.current_location = loc._id;
      await foundRider.save();

      res.status(200).json({
        message: "Delivery Location added successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  setStatus: async (req, res) => {
    try {
      const { rider_status } = req.body;
      // const foundNumber = await PhoneNumber.findOne({
      //   number: parseInt(phone_number.toString().substring(3)),
      // });
      const foundRider = await Rider.findOne({
        // phone_number: foundNumber._id,
      });
      foundRider.active = rider_status;
      await foundRider.save();
      const admin = await Company.findOne({
        company_id: foundRider.company_id,
      });
      console.log(admin.riders.indexOf(foundRider._id));
      if (admin.riders.indexOf(foundRider._id) == -1) {
        console.log("Here");
        admin.riders.push(foundRider._id);
        await admin.save();
      }
      const index = admin.active_riders.indexOf(foundRider._id);
      if (index == -1 && rider_status) {
        console.log("Here 2");
        admin.active_riders.push(foundRider._id);
        await admin.save();
      } else if (!rider_status && index > -1) {
        console.log("Here 3");
        admin.active_riders.splice(index, 1);
        await admin.save();
      }
      res.status(200).json({
        message: `Status set successfully to ${
          rider_status ? "active" : "inactive"
        }`,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  login: async (req, res) => {
    try {
      const rider = await Rider.findOne({ email: req.body.email });
      if (!rider) res.status(401).json("Wrong credentials");
      const hashedPassword = CryptoJS.AES.decrypt(
        rider.password,
        process.env.SECRET_PASSPHRASE
      );
      const psw = hashedPassword.toString(CryptoJS.enc.Utf8);
      const accessToken = jwt.sign(
        {
          id: rider._id,
          isRider: true,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );
      res.cookie("riderToken", accessToken, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      // const { password, ...others } = user._doc;
      if (psw !== req.body.password) res.status(401).json("Wrong password");
      else res.status(200).json({ accessToken });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },
  logout: (req, res) => {
    res.clearCookie("riderToken");
    res.json("Successfully logged out");
  },
  getRider: async (req, res) => {
    let foundRider;
    if (req.user) {
      foundRider = await Rider.findById(req.user.id);
    }
    if (!foundRider) return res.status(404).json("Rider not found!");
    const { password, createdAt, updatedAt, ...others } = foundRider._doc;
    // const admin = await Company.findOne();
    // admin.riders.push(foundRider._id);
    console.log(others);
    res.status(200).json(others);
  },
  getPendingOrders: async (req, res) => {
    const pendingOrders = await Order.find({
      order_status: "pending",
      rider_id: req.user.id,
    });
    res.status(200).json(pendingOrders);
  },
  getDeliveredOrders: async (req, res) => {
    const deliveredOrders = await Order.find({
      delivered: true,
      rider_id: req.user.id,
    });
    res.status(200).json(deliveredOrders);
  },
  getRiders: async (req, res) => {
    const riders = await Rider.find({ active: true });
    res.status(200).json(riders);
  },
  getRidersCompany: async (req, res) => {
    const riders = await Rider.find({ active: true, company_id: req.user.id });
    res.status(200).json(riders);
  },
  addRider: async (req, res) => {
    try {
      const { rider } = req.body; // email, password, phone number
      const { password } = rider;
      const company_id = req.user.id;
      const encPassword = CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_PASSPHRASE
      ).toString();
      const newRider = await Rider.create({
        ...rider,
        password: encPassword,
        company_id,
      });
      const { createdAt, updatedAt, ...others } = newRider._doc;
      res.status(201).json(others);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  removeRider: async (req, res) => {
    try {
      const { rider_id } = req.body;
      const company_id = req.user.id;
      const admin = await Company.findOne({ company_id: company_id });
      const deletedRider = await Rider.findOne({ _id: rider_id });
      if (deletedRider && deletedRider.company_id == company_id) {
        await Rider.deleteOne({ _id: rider_id });
        const indexA = admin.active_riders.indexOf(rider_id);
        const indexR = admin.riders.indexOf(rider_id);
        admin.active_riders.splice(indexA, 1);
        admin.riders.splice(indexR, 1);
        await admin.save();
        return res.status(200).json({ message: "Rider removed successfully" });
      } else {
        return res.status(400).json({ message: "Rider doesn't exist" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  getNotifications: async (req, res) => {
    const rider_id = req.user.id;
    const riderNots = await NotificationRider.find({ rider_id: rider_id });
    res.status(200).json(riderNots);
  },
};

export default riderCtrl;
