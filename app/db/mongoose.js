import mongoose from "mongoose";
mongoose.connect(
  "mongodb+srv://snir712:RSBCqaceZ2QaPPFz@cluster0.yjwj1h3.mongodb.net/?retryWrites=true&w=majority",
  (err, mongoConnection) => {
    if (err) throw new Error("Mongoose connection!!, Error: " + err);
  }
);
