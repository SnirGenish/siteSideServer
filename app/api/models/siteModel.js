import mongoose from "mongoose";
import { siteSchema } from "./sites/siteSchema.js";

export const Site = mongoose.model("site", siteSchema);
