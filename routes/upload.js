import express from "express";
const router = express.Router();
import multer from "multer";
import { __dirname } from "../dirname.js";
import path from "node:path";


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});

const upload = multer({ storage });

// /api/upload
router.post("/", upload.single("image"), (req, res) => {
  res.status(200).json({ message: "Image uploaded" });
});

export default router;