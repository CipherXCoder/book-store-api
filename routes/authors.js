import express from "express";
import asyncHandler from "express-async-handler";
import {Author, validateCreateAuthor, validateUpdateAuthor} from "../models/Author.js";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken.js";

const router = express.Router();

/**
 * @desc   Get all authors
 * @route  /api/authors
 * @method GET
 * @access public
 */

router.get("/", asyncHandler(
  async(req, res) => {
    const authorList = await Author.find();
    res.status(200).json(authorList);
  }
));

/**
 * @desc   Get author by id
 * @route  /api/authors/:id
 * @method GET
 * @access public
 */

router.get("/:id", asyncHandler(
  async(req, res) => {
    const author = await Author.findById(req.params.id);
    if(author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: "Author not found"});
    }
  }
));

/**
 * @desc   Create a new author
 * @route  /api/author
 * @method POST
 * @access private (Only admin)
 */

router.post("/", verifyTokenAndAdmin, asyncHandler(
  async(req, res) => {
    const { error } = validateCreateAuthor(req.body);
    if(error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    });
    
    const result = await author.save();

    res.status(201).json(result);
  }
));

/**
 * @desc   Update an author
 * @route  /api/authors/:id
 * @method PUT
 * @access private (Only admin)
 */

router.put("/:id", verifyTokenAndAdmin, asyncHandler(
  async(req, res) => {
    const { error } = validateUpdateAuthor(req.body);
    if(error) {
      return res.status(400).json({ message: error.details[0].message });
    };
  
    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image,
      }
    }, { new: true});
  
    res.status(200).json(updatedAuthor);
  }
));

/**
 * @desc   Delete an author
 * @route  /api/authors/:id
 * @method DELETE
 * @access private (Only admin)
 */

router.delete("/:id", verifyTokenAndAdmin, asyncHandler(
  async(req, res) => {
    const author = await Author.findById(req.params.id);
    if(author) {
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Author has been deleted"});
    } else {
      res.status(404).json({ message: "Author not found"});
    };
  }
));

export default router;