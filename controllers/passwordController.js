import asynHandler from "express-async-handler";
import { User, validateChangePassword } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

/**
 * @desc    Get Forgot Password View
 * @route  /password/forgot-password
 * @method GET
 * @access public
 */

export const getForgotPasswordView = asynHandler((req, res) => {
  res.render('forgot-password');
});

/**
 * @desc    Send Forgot Password Link
 * @route  /password/forgot-password
 * @method POST
 * @access public
 */

export const sendForgotPasswordLink = asynHandler(async(req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if(!user) {
    return res.status(404).json({ message: "User not found" });
  };

  const secret = process.env.JWT_SECRET_KEY + user.password;
  const token = jwt.sign({ email: user.email, id: user.id }, secret, { expiresIn: "10m" });

  const link = `http://localhost:5000/password/reset-password/${user._id}/${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    }
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: user.email,
    subject: "Reset Password",
    html: `<div>
              <h4>Click on the link bellow to reset your password</h4>
              <p>${link}</p>
          </div>`
  };

  transporter.sendMail(mailOptions, function(error, success) {
    if(error){
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    } else {
      console.log("Email sent: " + success.response);
      res.render("link-send");
    }
  });
});

/**
 * @desc    Get Reset Password View
 * @route  /password/reset-password/:userId/:token
 * @method GET
 * @access public
 */

export const getResetPasswordView = asynHandler(async(req, res) => {
  const user = await User.findById(req.params.userId);
  if(!user) {
    return res.status(404).json({ message: "User not found" });
  };

  const secret = process.env.JWT_SECRET_KEY + user.password;
  
  try {
    jwt.verify(req.params.token, secret);
    res.render('reset-password', { email: user.email });
  } catch (error) {
    console.log(error);
    res.json({ message: "Error" });
  };
});

/**
 * @desc    Reset The Password
 * @route  /password/reset-password/:userId/:token
 * @method POST
 * @access public
 */

export const resetThePassword = asynHandler(async(req, res) => {

  const { error } = validateChangePassword(req.body);
  if(error) {
    res.status(500).json({ message: error.details[0].message });
  };

  const user = await User.findById(req.params.userId);
  if(!user) {
    return res.status(404).json({ message: "User not found" });
  };

  const secret = process.env.JWT_SECRET_KEY + user.password;
  
  try {
    jwt.verify(req.params.token, secret);
    
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user.password = req.body.password;

    await user.save();
    res.render('success-password');

  } catch (error) {
    console.log(error);
    res.json({ message: "Error" });
  };
});