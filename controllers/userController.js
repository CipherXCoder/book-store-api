import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { User, validateUpdateUser } from "../models/User.js";

/**
 * @desc    Update User
 * @route  /api/users/:id
 * @method PUT
 * @access private
 */
export const updateUser = asyncHandler(async(req, res) => {

  const { error } = validateUpdateUser(req.body);
  if(error) {
    return res.status(400).json({ message: error.details[0].message });
  };

  if(req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  };

  const updatedUser = await User.findByIdAndUpdate(req.params.id, {
    $set: {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    },
  }, { new: true }).select("-password");

  res.status(200).json(updatedUser);
});

/**
 * @desc    Get All Users
 * @route  /api/users
 * @method GET
 * @access private (only admin)
 */
export const getAllUsers = asyncHandler(async(req, res) => {

  const users = await User.find().select("-password");

  res.status(200).json(users);
});

/**
 * @desc    Get User By Id
 * @route  /api/users/:id
 * @method GET
 * @access private (only admin & User Himself)
 */
export const getUserById = asyncHandler(async(req, res) => {

  const user = await User.findById(req.params.id).select("-password");

  if(user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User Not Found"});
  };
});

/**
 * @desc    Delete User
 * @route  /api/users/:id
 * @method DELETE
 * @access private (only admin & User Himself)
 */
export const deleteUser = asyncHandler(async(req, res) => {

  const user = await User.findById(req.params.id).select("-password");

  if(user) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User has been deleted successfully" });
  } else {
    res.status(404).json({ message: "User not found"});
  };
});