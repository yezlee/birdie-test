import express from "express";
import { moodQuery } from "./model/query.js";
import db from "./db/connection.js";
import { pingController } from "./controller/controller.js";

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.status(200).json({ message: "ok!" });
});

app.use(pingController);

app.listen(port, () => {
  console.log("port", port);
  console.log("Server started");
});
