import express from "express";
// import { getAllMoodEvents } from "./model/query.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Server is running3 ⚡️");
});

// router.get("/mood", (req, res, next) => {
//   const data = getAllMoodEvents;

//   try {
//     data.length > 0 ? res.json(data) : res.json("No data");
//   } catch (err) {
//     console.error("Someting is wrong here", err.message);
//     next(err);
//   }
// });

export default router;
