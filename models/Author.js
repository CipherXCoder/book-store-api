import mongoose from "mongoose";
import Joi from "joi";

const AuthorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 200,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 200,
  },
  nationality: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  image: {
    type: String,
    default: "default-avatar.png",
  },
}, {
  timestamps: true,
});

const Author = mongoose.model("Author", AuthorSchema);

function validateCreateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(2).max(200).required(),
    lastName: Joi.string().trim().min(2).max(200).required(),
    nationality: Joi.string().trim().min(2).max(100).required(),
    image: Joi.string().trim().min(5).max(200),
  });

  return schema.validate(obj);
};

function validateUpdateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(2).max(200),
    lastName: Joi.string().trim().min(2).max(200),
    nationality: Joi.string().trim().min(2).max(100),
    image: Joi.string().trim().min(5).max(200),
  });

  return schema.validate(obj);
};

export { Author, validateCreateAuthor, validateUpdateAuthor };