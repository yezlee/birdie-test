import express from "express";
import { moodQuery } from "./model/query.js";
import db from "./db/connection.js";

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({ message: "ok!" });
});

app.get("/mood", (req, res) => {
  db(moodQuery, req, res);
});

app.listen(port, () => {
  console.log("Server started");
});
