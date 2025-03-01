import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

// api/auth/register
router.route("/register").post(register);

//api/auth/login
router.route("/login").post(login);

export default router;