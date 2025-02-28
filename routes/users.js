import express from "express";
import { verifyTokenAndAuthorization, verifyTokenAndAdmin } from "../middlewares/verifyToken.js";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userController.js";

const router = express.Router();

// api/users
router.get("/", verifyTokenAndAdmin, getAllUsers);

// api/users/:id
router.route("/:id")
      .put(verifyTokenAndAuthorization, updateUser)
      .get(verifyTokenAndAuthorization, getUserById)
      .delete(verifyTokenAndAuthorization, deleteUser);

export default router;
