import express from "express";
import { auth } from "./auth.js";
import {
  addUser,
  logIn,
  logOut,
  updateUser,
  getUser,
  deleteUser,
  getUserByName,
  getUserByEmail,
} from "../controllers/users.controller.js";

export const usersRoute = express.Router();

usersRoute.get("/me", auth, getUser);

usersRoute.post("/", addUser);

usersRoute.post("/logIn", logIn);

usersRoute.post("/logOut", auth, logOut);

usersRoute.patch("/me", auth, updateUser);

usersRoute.delete("/me", auth, deleteUser);

usersRoute.get("/name/:name", getUserByName);

usersRoute.get("/email/:email", getUserByEmail);
