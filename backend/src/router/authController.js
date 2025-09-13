import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/User.js";

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
      process.env.TOKEN_SECRET
    );

    if (!token) {
      return res.send({ message: "token is not created", success: false });
    }

    return res
      .cookie("token", token, {
        httpOnly: true,
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
      process.env.TOKEN_SECRET
    );

    console.log(token);

    if (!token) {
      return res.send({ message: "token is not created", success: false });
    }

    return res
      .cookie("token", token, {
        httpOnly: true,
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
    // The user ID was attached to `req` by the AuthApi middleware
    const userId = req.userid;

    // Find the user in the database but exclude their password from the result
    const user = await userModel.findById(userId).select("-password");

    // If for some reason the user isn't in the DB, send an error
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // If user is found, send a success response with the user's data ✅
    res.status(200).json({
      success: true,
      user: user, // This contains user info like name, email, etc.
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};