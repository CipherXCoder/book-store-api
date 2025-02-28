import asyncHandler from "express-async-handler";
import { User, validateRegisterUser, validateLoginUser, validateUpdateUser } from "../models/User.js";
import bcrypt from "bcryptjs";

/**
 * @desc   Register new user
 * @route  /api/auth/register
 * @method POST
 * @access public
 */
export const register = asyncHandler(async(req, res) => {
  const { error } = validateRegisterUser(req.body);
  if(error) {
    return res.status(400).json({ message: error.details[0].message });
  };

  let user = await User.findOne({email: req.body.email});
  if(user) {
    return res.status(400).json({ message: "This user already registered" });
  };

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  const result = await user.save();
  const token = user.generateToken();

  const { password, ...other } = result._doc; 

  res.status(201).json({ ...other, token });
});

/**
 * @desc   Login user
 * @route  /api/auth/login
 * @method POST
 * @access public
 */
export const login = asyncHandler(async(req, res) => {
  const { error } = validateLoginUser(req.body);
  if(error) {
    return res.status(400).json({ message: error.details[0].message });
  };

  let user = await User.findOne({email: req.body.email});
  if(!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  };

  const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
  if(!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  };

  const token = user.generateToken();

  const { password, ...other } = user._doc; 

  res.status(201).json({ ...other, token });
});