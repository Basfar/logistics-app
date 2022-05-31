import Order from "../models/Order.js";
import got from "got";
import otpGenerator from "otp-generator";
import Package from "../models/Package.js";
import NotificationUser from "../models/NotificationUser.js";
import NotificationRider from "../models/NotificationRider.js";
import User from "../models/User.js";
import LocationCol from "../models/Location.js";
import Rider from "../models/Rider.js";
import Company from "../models/Company.js";

const genOrderId = () => {
  return (
    "OO-" +
    otpGenerator.generate(5, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    })
  );
};

const genPackageId = () => {
  return otpGenerator.generate(10, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
};

const createNotification = async (
  user_id,
  order_id,
  title,
  contentUser,
  contentRider,
  notification_type,
  rider_id
) => {
  const userNot = await NotificationUser.create({
    user_id,
    title,
    content: contentUser,
    notification_type,
    order_id,
  });

  const riderNot = await NotificationRider.create({
    rider_id,
    title,
    content: contentRider,
    notification_type,
    order_id,
  });

  return [userNot, riderNot];
};

const orderCtrl = {
  createOrder: async (req, res) => {
    try {
      const { description, packages, price, rider_id } = req.body;
      /*"description": "Best phone ever order",
    "packages": [{
        "package_id": "smpg8t94u2",
        "quantity": 1
    }],
    "price": 375000,
    "rider_id": "6290c277e3bbd3c0de26c41e" */
      let { delivery_location } = req.body;

      const user_id = req.user.id;
      const order_id = genOrderId();
      const pickup_locations = [];
      for (let element of packages) {
        const package_ordered = await Package.findOne({
          package_id: element.package_id, // smpg8t94u2
        });
        const oldQty = package_ordered.quantity;
        if (oldQty <= 0) {
          return res.status(500).json({ message: "Package not available" });
        }
        package_ordered.quantity = oldQty - element.quantity;
        await package_ordered.save();
        console.log(package_ordered.pickup_location);
        pickup_locations.push(package_ordered.pickup_location);
        console.log(pickup_locations);
      }
      const user = await User.findById(user_id);
      if (!user.current_location && !delivery_location) {
        return res
          .status(500)
          .json({ message: "No delivery location specified" });
      } else if (!user.current_location && delivery_location) {
        user.current_location = delivery_location;
      } else if (user.current_location && !delivery_location) {
        delivery_location = user.current_location;
      }
      const package_ids = packages.map((elem) => elem.package_id);
      console.log(pickup_locations);
      const newOrder = await Order.create({
        order_id,
        description,
        price,
        user_id,
        rider_id,
        packages: package_ids,
        pickup_locations,
        delivery_location,
        order_status: "pending",
      });

      const rider = await Rider.findById(rider_id);
      const admin = await Company.findOne();

      rider.orders.push(newOrder._id);
      await rider.save();
      admin.orders.push(newOrder._id);
      await admin.save();

      await createNotification(
        user_id,
        order_id,
        "Order Creation",
        `You have created a new order with order id ${order_id}`,
        `You have received a new order with order id ${order_id}`,
        "order",
        rider_id
      );
      return res.status(201).json({ ...newOrder._doc, status: "successful" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  getOrder: async (req, res) => {
    try {
      const order = await Order.findOne({
        order_id: req.body.order_id,
      });
      return res.status(200).json(order);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  getPackages: async (req, res) => {
    try {
      const packages = await Package.find();
      return res.status(200).json(packages);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  getPackage: async (req, res) => {
    try {
      const packageFound = await Package.findOne({
        package_id: req.body.package_id,
      });
      return res.status(200).json(packageFound);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  getLocation: async (req, res) => {
    try {
      const loc = await LocationCol.findOne({ _id: req.body.id });
      return res.status(200).json(loc);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  acceptOrder: async (req, res) => {
    try {
      const { order_id } = req.body;
      const foundOrder = await Order.findOne({ order_id });
      foundOrder.order_status = "pending";
      const rider_id = foundOrder.rider_id;
      const user_id = foundOrder.user_id;
      await foundOrder.save();

      await createNotification(
        user_id,
        order_id,
        "Order Accepted",
        `Your order ${order_id} has been accepted`,
        `You have accepted a new order with order id ${order_id}`,
        "order",
        rider_id
      );
      return res.status(200).json({ message: "order accepted" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  declineOrder: async (req, res) => {
    try {
      const { order_id } = req.body;
      const foundOrder = await Order.findOne({ order_id });
      foundOrder.order_status = "pending";
      const rider_id = foundOrder.rider_id;
      foundOrder.rider_id = null;
      const user_id = foundOrder.user_id;
      await foundOrder.save();

      await createNotification(
        user_id,
        order_id,
        "Order Declined",
        `Your order ${order_id} has been declined. Please choose another rider`,
        `You have declined order with order id ${order_id}`,
        "order",
        rider_id
      );
      return res.status(200).json({ message: "order declined" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  changeRider: async (req, res) => {
    try {
      const { order_id, rider_id } = req.body;
      const foundOrder = await Order.findOne({ order_id });
      foundOrder.rider_id = rider_id;
      await foundOrder.save();
      await createNotification(
        req.user.id,
        order_id,
        "Rider Changed",
        `Your rider for order ${order_id} has been changed.`,
        `You have received a new order with order id ${order_id}`,
        "order",
        rider_id
      );
      res.status(200).json({ message: "rider changed successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  pickedUp: async (req, res) => {
    try {
      const { order_id } = req.body;
      const foundOrder = await Order.findOne({ order_id });
      foundOrder.picked_up = true;
      await foundOrder.save();
      return res.status(200).json({ message: "order picked up" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  deliveredOrder: async (req, res) => {
    try {
      const { order_id } = req.body;
      const foundOrder = await Order.findOne({ order_id });
      foundOrder.delivered = true;
      await foundOrder.save();
      return res.status(200).json({ message: "order delivered" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  incPackageQty: async (req, res) => {
    try {
      const { quantity, package_id } = req.body; // quantity to increase by
      const foundPackage = await Package.findOneAndUpdate(
        { package_id: package_id },
        { $inc: { quantity: quantity } },
        { new: true }
      );
      return res
        .status(200)
        .json({ quantity: foundPackage.quantity, message: "successful" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  addPackage: async (req, res) => {
    try {
      const { package_name, description, price, pickup_location, quantity } =
        req.body;
      const loc = await LocationCol.create({
        ...pickup_location,
      });
      const package_id = genPackageId();
      const newPackage = await Package.create({
        package_id,
        package_name,
        description,
        price,
        quantity,
        pickup_location: loc._id,
      });
      return res.status(201).json({ ...newPackage._doc, status: "successful" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};

export default orderCtrl;
