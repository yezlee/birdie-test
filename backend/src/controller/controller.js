// import express from "express";
// import { getAllMoodEvents } from "../model/query";

// const router = express.Router();

// router.get("/mood", async (req, res, next) => {
//   const data = await getAllMoodEvents();

//   try {
//     data.length > 0 ? res.json(data) : res.json("No data");
//   } catch (err) {
//     console.error("Someting is wrong here", err.message);
//     next(err);
//   }
// });

// export default router;
