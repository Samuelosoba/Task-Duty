import createHttpError, { isHttpError } from "http-errors";
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateAccessToken } from "../config/generateToken.js";
export const registerUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return next(createHttpError(400, "All fields are required"));
    }

    const exisitingUsername = await User.findOne({ username: username });
    if (exisitingUsername) {
      return next(createHttpError(409, "Username exits"));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      password: hashedPassword,
    });
    const accessToken = generateAccessToken(user._id);
    res.status(201).json({
      success: true,
      message: "Account Created Successfully",
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return next(createHttpError(400, "Enter all fields"));
    }
    const user = await User.findOne({ username: username }).select("+password");
    if (!user) {
      return next(createHttpError(404, "Account not found"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createHttpError(401, "Invalid credentials"));
    }

    const accessToken = generateAccessToken(user._id);
    res.status(200).json({
      success: true,
      accessToken,
      message: `Welcome ${user.username}`,
    });
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, res, next) => {
  const { id: userId } = req.user;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(createHttpError(404, "User not found"));
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res, next) => {
  res.status(200).json({ message: "Logged out successfully" });
};
//MVC
//MVVM
//MI
