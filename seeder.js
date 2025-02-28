import { Book } from "./models/Book.js";
import { Author } from "./models/Author.js";
import { books, authors } from "./data.js";
import connectToDb from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

//Connection To Database
connectToDb();

//Import Books (seeding database)
const importBooks = async() => {
  try {
    await Book.insertMany(books);
    console.log("Books imported");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//Import Authors (seeding database)
const importAuthors = async() => {
  try {
    await Author.insertMany(authors);
    console.log("Authors imported");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//Remove Books
const removeBooks = async() => {
  try {
    await Book.deleteMany();
    console.log("Books removed");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if(process.argv[2] === "-import") {
  importBooks();
} else if (process.argv[2] === "-remove") {
  removeBooks();
} else if (process.argv[2] === "-import-authors") {
  importAuthors();
};