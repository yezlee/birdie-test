import express from "express";
import cors from "cors";
import { pingController } from "./controller/controller.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: "*",
    methods: "GET",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "ok!" });
});

app.use(pingController);

app.listen(port, () => {
  console.log("Server started");
});

export default app;
