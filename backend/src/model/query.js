import db from "../db/connection.js";

export const moodQuery = `SELECT *
FROM events
WHERE care_recipient_id = 'ad3512a6-91b1-4d7d-a005-6f8764dd0111'
       AND event_type = 'mood_observation'
ORDER BY timestamp DESC;`;

export async function getMood() {
  const mood = await db(moodQuery);
  return mood;
}
