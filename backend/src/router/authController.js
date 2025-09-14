import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/User.js";

const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send({
        message: "please fill all the required field",
        success: false,
      });
    }

    const checkexistuser = await userModel.findOne({ email });

    if (!checkexistuser) {
      return res.send({ message: "user does not exist", success: false });
    }

    const checkpassword = await bcrypt.compare(
      password,
      checkexistuser.password
    );

    if (!checkpassword) {
      return res.send({ message: "password is incorrect", success: false });
    }

    const token = await jwt.sign(
      { id: checkexistuser._id },
      process.env.TOKEN_SECRET,
      { expiresIn: '3d' }
    );

    if (!token) {
      return res.send({ message: "token is not created", success: false });
    }

    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: THREE_DAYS_IN_MS
      })
      .send({ message: "user login successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.send({ message: error.message, success: false });
  }
};

export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
      return res.send({
        message: "please fill all the required field",
        success: false,
      });
    }

    const checkexistuser = await userModel.findOne({ email });

    if (checkexistuser) {
      return res.send({ message: "user already exist", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newuser = new userModel({
      name,
      email,
      password: hashpassword,
    });

    await newuser.save();

    const token = await jwt.sign(
      { _id: newuser._id },
      process.env.TOKEN_SECRET,
      { expiresIn: '3d' }
    );

    if (!token) {
      return res.send({ message: "token is not created", success: false });
    }

    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: THREE_DAYS_IN_MS
      })
      .send({ message: "user created successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.send({ message: error.message, success: false });
  }
};

export const Logout = async (req, res) => {
  try {
    return res
      .cookie("token", "", { expires: new Date(0), httpOnly: true })
      .send({
        message: "Logged out successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.send({ message: error.message, success: false });
  }
};

export const getAuthStatus = async (req, res) => {
  try {
    const userId = req.userid;
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      user: user, // This contains user info like name, email, etc.
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
