import express from "express";
import booksPath from "./routes/books.js";
import authorsPath from "./routes/authors.js";
import authPath from "./routes/auth.js";
import usersPath from "./routes/users.js";
import logger from "./middlewares/logger.js";
import { notFound, errorHandler } from "./middlewares/errors.js";
import dotenv from "dotenv";
import connectToDb from "./config/db.js";

dotenv.config();

//Connection To Database
connectToDb();

//Init App
const app = express();

//Apply Middlewares
app.use(express.json());
app.use(logger);

//Routes

// app.use("/api/books", booksPath);
// app.use("/api/authors", authorsPath);
// app.use("/api/auth", authPath);
// app.use("/api/users", usersPath);

const routes = {
  "/api/books": booksPath,
  "/api/authors": authorsPath,
  "/api/auth": authPath,
  "/api/users": usersPath,
};

Object.entries(routes).forEach(([path, handler]) => app.use(path, handler));

//Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

//Running The Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));