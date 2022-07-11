import express from "express";
import { usersRoute } from "./api/routes/users.route.js";
import { sitesRoute } from "./api/routes/sites.route.js";
import bodyparser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/users", usersRoute);
app.use("/sites", sitesRoute);

export { app };
