import express from "express";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken.js";
import { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } from "../controllers/authorController.js";

const router = express.Router();

// api/authors
router.route("/").get(getAllAuthors).post(verifyTokenAndAdmin, createAuthor);

// api/authors/:id
router.route("/:id").get(getAuthorById).put(verifyTokenAndAdmin, updateAuthor).delete(verifyTokenAndAdmin, deleteAuthor);

export default router;