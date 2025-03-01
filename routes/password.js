import express from "express";
import { getForgotPasswordView, getResetPasswordView, resetThePassword, sendForgotPasswordLink } from "../controllers/passwordController.js";

const router = express.Router();

// /password/forgot-password
router.route("/forgot-password")
      .get(getForgotPasswordView)
      .post(sendForgotPasswordLink);

// /password/reset-password/:userId/:token
router.route("/reset-password/:userId/:token")
      .get(getResetPasswordView)
      .post(resetThePassword);

export default router;