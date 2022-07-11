import express from "express";
import { auth } from "../routes/auth.js";
import {
  addSite,
  getSite,
  updateSite,
  deleteSite,
} from "../controllers/sites.controller.js";

export const sitesRoute = express.Router();

sitesRoute.post("/", auth, addSite);

sitesRoute.get("/:userName/:siteName", getSite);

sitesRoute.patch("/:id", auth, updateSite);

sitesRoute.delete("/:id", auth, deleteSite);
