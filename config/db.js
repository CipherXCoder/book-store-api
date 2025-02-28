import mongoose from "mongoose";

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.log("Connection Failed to MongoDB!", error);
  };
};

export default connectToDb;

// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("Connected to MongoDB..."))
// .catch((error) => console.log("Connection Failed to MongoDB!", error));