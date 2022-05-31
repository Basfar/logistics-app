import jwt from "jsonwebtoken";
import Company from "../models/Company.js";
import CryptoJS from "crypto-js";

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Company.findOne({ email: email });
    if (!admin) return res.status(401).json("Wrong credentials");
    const hashedPassword = CryptoJS.AES.decrypt(
      admin.password,
      process.env.SECRET_PASSPHRASE
    );
    const psw = hashedPassword.toString(CryptoJS.enc.Utf8);
    const accessToken = jwt.sign(
      {
        id: admin._id,
        isAdmin: true,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    res.cookie("adminToken", accessToken, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    // const { password, ...others } = user._doc;
    if (psw !== password) res.status(401).json("Wrong password");
    else return res.status(200).json({ accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const adminLogout = async (req, res) => {
  res.clearCookie("adminToken");
  res.json("Successfully logged out");
};

const authAdminToken = async (req, res, next) => {
  let authHeader;
  if (req.headers.cookie) {
    for (let ck of req.headers.cookie.split(";")) {
      if (ck.split("=")[0] === "adminToken") {
        authHeader = ck.split("=")[1];
      }
    }
  }
  // req.headers.token;
  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SECRET, async (err, user) => {
      if (err) res.status(403).json("Token is not valid! Please login");

      const admin = await Company.findOne({ _id: user.id });

      if (admin && user.isAdmin) {
        req.user = user;
        next();
      } else
        return res.status(403).json("User email or phone number not verified");
    });
  } else {
    return res.status(401).json("You are not authenticated! Please login");
  }
};

export { authAdminToken, adminLogin, adminLogout };
