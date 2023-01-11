import * as express from "express";
import {
  getAllEvent,
  getMoodObservation,
  getMoodByDate,
  getAllIntakeObservation,
  getGeneralObservation,
  getAllHealthObservationByDate,
  getAllMedication,
  getAllMedicationByDate,
  getAllIntakeObservationByDate,
  getGeneralObservationByDate,
  getTaskCompletedByDate,
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
  tryCatch(data[0], req, res);
});

// getMoodObservation
pingController.get("/mood", async (req, res) => {
  const data = await db(getMoodObservation);

  // try, catch
  tryCatch(data[0], req, res);
});

// getMoodByDate
pingController.get("/mood_by_date", async (req, res) => {
  const { from, to } = req.query;
  const data = await db(getMoodByDate, [from, to]);

  // try, catch
  tryCatch(data[0], req, res);
});

// getAllIntakeObservation
pingController.get("/intake", async (req, res) => {
  const data = await db(getAllIntakeObservation);

  // try, catch
  tryCatch(data[0], req, res);
});

// getAllIntakeObservationByDate
pingController.get("/intake_by_date", async (req, res) => {
  const { from, to } = req.query;
  const data = await db(getAllIntakeObservationByDate, [from, to]);

  // try, catch
  tryCatch(data[0], req, res);
});

// getGeneralObservation
pingController.get("/general", async (req, res) => {
  const data = await db(getGeneralObservation);

  // try, catch
  tryCatch(data[0], req, res);
});

// getGeneralObservationByDate
pingController.get("/general_by_date", async (req, res) => {
  const { from, to } = req.query;
  const data = await db(getGeneralObservationByDate, [from, to]);

  // try, catch
  tryCatch(data[0], req, res);
});

// getAllHealthObservationByDate
pingController.get("/health_by_date", async (req, res) => {
  const { from, to } = req.query;
  const data = await db(getAllHealthObservationByDate, [from, to]);

  // try, catch
  tryCatch(data[0], req, res);
});

// getAllMedication
pingController.get("/medication", async (req, res) => {
  const data = await db(getAllMedication);

  // try, catch
  tryCatch(data[0], req, res);
});

// getAllMedicationByDate
pingController.get("/medication_by_date", async (req, res) => {
  const { from, to } = req.query;
  const data = await db(getAllMedicationByDate, [from, to]);

  // try, catch
  tryCatch(data[0], req, res);
});

// getTaskCompletedByDate
pingController.get("/task_by_date", async (req, res) => {
  const { from, to } = req.query;
  const data = await db(getTaskCompletedByDate, [from, to]);

  // try, catch
  tryCatch(data[0], req, res);
});
