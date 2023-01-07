import * as express from "express";
import { moodQuery } from "../model/query.js";
import db from "../db/connection.js";

export const pingController = express.Router();

pingController.get("/mood", async (req, res) => {
  db(moodQuery, req, res);
});
