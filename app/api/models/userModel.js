import mongoose from "mongoose";
import { userSchema } from "./users/userSchema.js";

const User = mongoose.model("users", userSchema);

export { User };
