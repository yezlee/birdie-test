// Implement virtual server and request API
import request from "supertest";
import app from "../src/app.js";
import { connection } from "../src/db/connection.js";

// Need to release connection after each test for reconnect
afterEach(() => {
  return connection.release();
});

// Test the connection and status code
describe("Test the status paths", () => {
  test("The GET / route should give status code 200", async () => {
    expect.assertions(1);
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

// Test getting data from getMood query
describe("Test the GET /mood route in multiple ways; ", () => {
  test("The GET /mood route should give status 200", async () => {
    const response = await request(app).get("/mood");
    expect(response.status).toBe(200);
    await expect(response).toBeTruthy();
  });

  test("The GET /mood route should give status 404 as there's no POST / route", async () => {
    const response = await request(app).post("/mood");
    expect(response.status).toBe(404);
    await expect(response.body.status).toBeFalsy();
  });

  test("The GET /mood route should give the exact length of the body of the data", async () => {
    const response = await request(app).get("/mood");
    expect(response.body).toHaveLength(99);
    await expect(response).toBeTruthy();
  });

  test("The GET /mood route should give the correct data; care_recipient_id, event_type which are used on WHERE clause", async () => {
    const response = await request(app).get("/mood");
    expect(response.body[0].payload.care_recipient_id).toEqual(
      "df50cac5-293c-490d-a06c-ee26796f850d"
    );
    expect(response.body[27].payload.event_type).toEqual("mood_observation");
  });

  test("The GET /mood route should NOT give the data that not on the query; ", async () => {
    const response = await request(app).get("/mood");
    expect(response.body[3].payload.event_type).not.toBe(
      "fluid_intake_observation"
    );
    expect(response.body[94].payload.event_type).not.toBe(
      "physical_health_observation"
    );
    expect(response.body[62].payload.event_type).not.toBe(
      "regular_medication_taken"
    );
  });
});

// Test getting data from getAllIntakeObservationByDate query
describe("Test the GET /intake_by_date route in multiple ways; ", () => {
  test("The GET /intake_by_date route should give status 200", async () => {
    const response = await request(app).get(
      "/intake_by_date/?from=2019-04-23&to=2019-04-25"
    );
    expect(response.status).toBe(200);
    await expect(response).toBeTruthy();
  });

  test("The GET /intake_by_date route should give the exact length of the body of the data", async () => {
    const response = await request(app).get(
      "/intake_by_date/?from=2019-04-23&to=2019-04-25"
    );
    expect(response.body).toHaveLength(51);
    await expect(response).toBeTruthy();
  });

  test("The GET /intake_by_date route should give the error message when there is no date on API URL", async () => {
    const response = await request(app).get("/intake_by_date/?from=&to=");
    expect(response.body).toEqual({ message: "There's no data" });
    await expect(response.body.status).toBeFalsy();
  });

  test("The GET /intake_by_date route should give the correct data; care_recipient_id, event_type which are used on WHERE clause", async () => {
    const response = await request(app).get(
      "/intake_by_date/?from=2019-04-23&to=2019-04-25"
    );
    expect(response.body[0].payload.care_recipient_id).toEqual(
      "df50cac5-293c-490d-a06c-ee26796f850d"
    );
    expect(response.body[17].payload.event_type).toContain(
      "fluid_intake_observation" && "food_intake_observation"
    );
  });

  test("The GET /intake_by_date route should NOT give the data that not on the query; ", async () => {
    const response = await request(app).get(
      "/intake_by_date/?from=2019-04-23&to=2019-04-25"
    );
    expect(response.body[3].payload.event_type).not.toBe("mood_observation");
    expect(response.body[22].payload.event_type).not.toBe("check_in");
    expect(response.body[45].payload.event_type).not.toBe("task_completed");
  });
});

// Test getting data from getAllHealthObservationByDate query
describe("Test the GET /health_by_date route in multiple ways; ", () => {
  test("The GET /health_by_date route should give status 200", async () => {
    const response = await request(app).get(
      "/health_by_date/?from=2019-05-01&to=2019-05-05"
    );
    expect(response.status).toBe(200);
    await expect(response).toBeTruthy();
  });

  test("The GET /health_by_date route should give the exact length of the body of the data", async () => {
    const response = await request(app).get(
      "/health_by_date/?from=2019-05-01&to=2019-05-12"
    );
    expect(response.body).toHaveLength(25);
    await expect(response).toBeTruthy();
  });

  test("The GET /health_by_date route should give the error message when there is no date on API URL", async () => {
    const response = await request(app).get(
      "/health_by_date/?from=4534&to=5645"
    );
    expect(response.body).toEqual({ message: "There's no data" });
    await expect(response.body.status).toBeFalsy();
  });

  test("The GET /health_by_date route should give the correct data; care_recipient_id, event_type which are used on WHERE clause", async () => {
    const response = await request(app).get(
      "/health_by_date/?from=2019-05-01&to=2019-05-12"
    );
    expect(response.body[4].payload.care_recipient_id).toEqual(
      "df50cac5-293c-490d-a06c-ee26796f850d"
    );
    expect(response.body[24].payload.event_type).toContain(
      "physical_health_observation" && "mental_health_observation"
    );
  });

  test("The GET /health_by_date route should NOT give the data that not on the query; ", async () => {
    const response = await request(app).get(
      "/health_by_date/?from=2019-05-01&to=2019-05-12"
    );
    expect(response.body[8].payload.event_type).not.toBe("mood_observation");
    expect(response.body[2].payload.event_type).not.toBe("check_in");
    expect(response.body[24].payload.event_type).not.toBe("task_completed");
  });
});

// Test getting data from getAllMedicationByDate query
describe("Test the GET /medication_by_date route in multiple ways; ", () => {
  test("The GET /medication_by_date route should give status 200", async () => {
    const response = await request(app).get(
      "/medication_by_date/?from=2019-05-01&to=2019-05-05"
    );
    expect(response.status).toBe(200);
    await expect(response).toBeTruthy();
  });

  test("The GET /medication_by_date route should give the exact length of the body of the data", async () => {
    const response = await request(app).get(
      "/medication_by_date/?from=2019-05-01&to=2019-05-12"
    );
    expect(response.body).toHaveLength(143);
    await expect(response).toBeTruthy();
  });

  test("The GET /medication_by_date route should give the error message when there is no date on API URL", async () => {
    const response = await request(app).get(
      "/medication_by_date/?from=5d4&to=0v4"
    );
    expect(response.body).toEqual({ message: "There's no data" });
    await expect(response.body.status).toBeFalsy();
  });

  test("The GET /medication_by_date route should give the correct data; care_recipient_id, event_type which are used on WHERE clause", async () => {
    const response = await request(app).get(
      "/medication_by_date/?from=2019-05-01&to=2019-05-12"
    );
    expect(response.body[74].payload.care_recipient_id).toEqual(
      "e3e2bff8-d318-4760-beea-841a75f00227" &&
        "df50cac5-293c-490d-a06c-ee26796f850d"
    );
  });

  test("The GET /medication_by_date route should NOT give the data that not on the query; ", async () => {
    const response = await request(app).get(
      "/medication_by_date/?from=2019-04-24&to=2019-05-01"
    );
    expect(response.body[8].payload.event_type).not.toBe(
      "food_intake_observation"
    );
    expect(response.body[2].payload.event_type).not.toBe(
      "mental_health_observation"
    );
    expect(response.body[24].payload.event_type).not.toBe("task_completed");
  });
});

// Test getting data from getGeneralObservationByDate query
describe("Test the GET /general_by_date route in multiple ways; ", () => {
  test("The GET /general_by_date route should give status 200", async () => {
    const response = await request(app).get(
      "/general_by_date/?from=2019-04-29&to=2019-05-05"
    );
    expect(response.status).toBe(200);
    await expect(response).toBeTruthy();
  });

  test("The GET /general_by_date route should give the exact length of the body of the data", async () => {
    const response = await request(app).get(
      "/general_by_date/?from=2019-04-29&to=2019-05-05"
    );
    expect(response.body).toHaveLength(36);
    await expect(response).toBeTruthy();
  });

  test("The GET /general_by_date route should give the error message when there is no date on API URL", async () => {
    const response = await request(app).get(
      "/general_by_date/?from=5d4&to=0v4"
    );
    expect(response.body).toEqual({ message: "There's no data" });
    await expect(response.body.status).toBeFalsy();
  });

  test("The GET /general_by_date route should give the correct data; care_recipient_id, event_type which are used on WHERE clause", async () => {
    const response = await request(app).get(
      "/general_by_date/?from=2019-04-29&to=2019-05-05"
    );
    expect(response.body[10].payload.care_recipient_id).toEqual(
      "df50cac5-293c-490d-a06c-ee26796f850d"
    );
  });

  test("The GET /general_by_date route should NOT give the data that not on the query; ", async () => {
    const response = await request(app).get(
      "/general_by_date/?from=2019-04-24&to=2019-05-01"
    );
    expect(response.body[34].payload.event_type).not.toBe(
      "food_intake_observation"
    );
    expect(response.body[16].payload.event_type).not.toBe(
      "mental_health_observation"
    );
    expect(response.body[9].payload.event_type).not.toBe("task_completed");
  });
});

// Test getting data from getGeneralObservationByDate query
describe("Test the GET /task_by_date route in multiple ways; ", () => {
  test("The GET /task_by_date route should give status 200", async () => {
    const response = await request(app).get(
      "/task_by_date/?from=2019-04-29&to=2019-05-05"
    );
    expect(response.status).toBe(200);
    await expect(response).toBeTruthy();
  });

  test("The GET /task_by_date route should give the exact length of the body of the data", async () => {
    const response = await request(app).get(
      "/task_by_date/?from=2019-04-29&to=2019-05-02"
    );
    expect(response.body).toHaveLength(65);
    await expect(response).toBeTruthy();
  });

  test("The GET /task_by_date route should give the error message when there is no date on API URL", async () => {
    const response = await request(app).get("/task_by_date/?from=5d4&to=0v4");
    expect(response.body).toEqual({ message: "There's no data" });
    await expect(response.body.status).toBeFalsy();
  });

  test("The GET /task_by_date route should give the correct data; care_recipient_id, event_type which are used on WHERE clause", async () => {
    const response = await request(app).get(
      "/task_by_date/?from=2019-04-29&to=2019-05-02"
    );
    expect(response.body[10].payload.care_recipient_id).toEqual(
      "df50cac5-293c-490d-a06c-ee26796f850d"
    );
  });

  test("The GET /task_by_date route should NOT give the data that not on the query; ", async () => {
    const response = await request(app).get(
      "/task_by_date/?from=2019-04-29&to=2019-05-02"
    );
    expect(response.body[34].payload.event_type).not.toBe(
      "general_observation"
    );
    expect(response.body[16].payload.event_type).not.toBe(
      "mental_health_observation"
    );
    expect(response.body[9].payload.event_type).not.toBe(
      "regular_medication_partially_taken"
    );
  });
});
