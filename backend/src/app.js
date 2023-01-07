import express from "express";
import { moodQuery } from "./model/query.js";
import db from "./db/connection.js";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "ok!" });
});

app.get("/mood", (req, res) => {
  db(moodQuery, req, res);
});

app.listen(process.env.PORT || "8080", () => {
  console.log("Server started");
});
