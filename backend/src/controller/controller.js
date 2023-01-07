import * as express from "express";
import { getMoodQuery } from "../model/query.js";
import db from "../db/connection.js";

export const pingController = express.Router();

pingController.get("/mood", async (req, res) => {
  const data = await db(getMoodQuery);
  console.log(data);

  try {
    data.length > 0
      ? res.status(200).json(data)
      : res.json({ message: "There's no data" });
  } catch (e) {
    console.error("There's an error", e.message);
    next(e);
  }
});
