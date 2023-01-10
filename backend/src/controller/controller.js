import * as express from "express";
import {
  getAllEvent,
  getMoodObservation,
  getAllIntakeObservation,
  getGeneralObservation,
  getAllHealthObservation,
  getAllMedication,
} from "../model/query.js";
import db from "../db/connection.js";

export const pingController = express.Router();

// A Function for try and catch
function tryCatch(data, req, res) {
  try {
    data.length > 0
      ? res.status(200).json(data)
      : res.json({ message: "There's no data" });
  } catch (e) {
    console.error("There's an error", e.message);
    next(e);
  }
}

// getAllEvent
pingController.get("/all", async (req, res) => {
  const data = await db(getAllEvent);

  // try, catch
  tryCatch(data, req, res);
});

// getMoodObservation
pingController.get("/mood", async (req, res) => {
  const data = await db(getMoodObservation);

  // try, catch
  tryCatch(data, req, res);
});

// getAllIntakeObservation
pingController.get("/intake", async (req, res) => {
  const data = await db(getAllIntakeObservation);

  // try, catch
  tryCatch(data, req, res);
});

// getGeneralObservation
pingController.get("/general", async (req, res) => {
  const data = await db(getGeneralObservation);

  // try, catch
  tryCatch(data, req, res);
});

// getAllHealthObservation
pingController.get("/health", async (req, res) => {
  const data = await db(getAllHealthObservation);

  // try, catch
  tryCatch(data, req, res);
});

// getAllMedication
pingController.get("/medication", async (req, res) => {
  const data = await db(getAllMedication);

  // try, catch
  tryCatch(data, req, res);
});
