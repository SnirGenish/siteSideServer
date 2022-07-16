import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.MONGODB_URI, (err, mongoConnection) => {
  if (err) throw new Error("Mongoose connection!!, Error: " + err);
});
