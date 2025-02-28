import express from "express";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken.js";
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from "../controllers/bookController.js";

const router = express.Router();

// api/books
router.route("/").get(getAllBooks).post(verifyTokenAndAdmin, createBook);

// api/books/:id
router.route("/:id").get(getBookById).put(verifyTokenAndAdmin, updateBook).delete(verifyTokenAndAdmin, deleteBook);

export default router;