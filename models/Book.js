import mongoose from "mongoose";
import Joi from "joi";

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 250,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author",
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
  },
  price: {
    type: Number,
    required: true,
    minlength: 0,
  },
  cover: {
    type: String,
    required: true,
    enum: ["Soft cover", "Hard cover"],
  }
}, { timestamps: true });

const Book = mongoose.model("Book", BookSchema);

function validateCreateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(250).required(),
    author: Joi.string().required(),
    description: Joi.string().trim().min(5).required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().valid("Soft cover", "Hard cover").required(),
  });

  return schema.validate(obj);
};

function validateUpdateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(250),
    author: Joi.string(),
    description: Joi.string().trim().min(5),
    price: Joi.number().min(0),
    cover: Joi.string().valid("Soft cover", "Hard cover"),
  });

  return schema.validate(obj);
};

export { Book, validateCreateBook, validateUpdateBook };