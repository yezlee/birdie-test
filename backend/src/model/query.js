// All queries only for care_recipient_id = 'df50cac5-293c-490d-a06c-ee26796f850d'

export const getAllEvent = `
SELECT payload
FROM events
WHERE care_recipient_id = 'df50cac5-293c-490d-a06c-ee26796f850d'
ORDER BY timestamp;`;

export const getMoodObservation = `
SELECT payload
FROM events
WHERE care_recipient_id = 'df50cac5-293c-490d-a06c-ee26796f850d'
AND event_type = 'mood_observation'
ORDER BY timestamp;`;

export const getAllIntakeObservation = `
SELECT payload
FROM events
WHERE care_recipient_id = 'df50cac5-293c-490d-a06c-ee26796f850d'
AND (event_type = 'fluid_intake_observation'
OR event_type = 'food_intake_observation')
ORDER BY timestamp;`;

export const getGeneralObservation = `
SELECT payload
FROM events
WHERE care_recipient_id = 'df50cac5-293c-490d-a06c-ee26796f850d'
AND event_type = 'general_observation'
ORDER BY timestamp;`;

export const getAllHealthObservation = `
SELECT payload
FROM events
WHERE care_recipient_id = 'df50cac5-293c-490d-a06c-ee26796f850d'
AND (event_type = 'physical_health_observation'
OR event_type = 'mental_health_observation')
ORDER BY timestamp;`;
