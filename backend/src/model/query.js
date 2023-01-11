// All queries only for care_recipient_id = 'df50cac5-293c-490d-a06c-ee26796f850d'

export const getAllEvent = `
SELECT payload
FROM events
WHERE care_recipient_id = 'df50cac5-293c-490d-a06c-ee26796f850d'
ORDER BY timestamp;`;

export const getMoodObservation = `
SELECT payload
FROM events
WHERE (care_recipient_id = 'e3e2bff8-d318-4760-beea-841a75f00227' OR care_recipient_id = 'df50cac5-293c-490d-a06c-ee26796f850d')
AND event_type = 'mood_observation'
ORDER BY timestamp;`;

export const getMoodByDate = `        
SELECT payload 
FROM events 
WHERE timestamp 
BETWEEN CAST(? AS DATE) AND CAST(? AS DATE) 
AND (care_recipient_id = 'e3e2bff8-d318-4760-beea-841a75f00227' OR care_recipient_id = 'df50cac5-293c-490d-a06c-ee26796f850d')
AND event_type = 'mood_observation'
ORDER BY timestamp;`;

export const getAllIntakeObservation = `
SELECT payload
FROM events
WHERE care_recipient_id = 'df50cac5-293c-490d-a06c-ee26796f850d'
AND (event_type = 'fluid_intake_observation'
OR event_type = 'food_intake_observation')
ORDER BY timestamp;`;

export const getAllIntakeObservationByDate = `
SELECT payload
FROM events
WHERE care_recipient_id = 'df50cac5-293c-490d-a06c-ee26796f850d'
AND timestamp 
BETWEEN CAST(? AS DATE) AND CAST(? AS DATE) 
AND (event_type = 'fluid_intake_observation'
OR event_type = 'food_intake_observation')
ORDER BY timestamp;`;

export const getGeneralObservation = `
SELECT payload
FROM events
WHERE care_recipient_id = 'df50cac5-293c-490d-a06c-ee26796f850d'
AND event_type = 'general_observation'
ORDER BY timestamp;`;

export const getGeneralObservationByDate = `        
SELECT payload
FROM events
WHERE timestamp
BETWEEN CAST(? AS DATE) AND CAST(? AS DATE)
AND care_recipient_id = 'df50cac5-293c-490d-a06c-ee26796f850d'
AND event_type = 'general_observation'
ORDER BY timestamp;`;

export const getAllHealthObservationByDate = `
SELECT payload
FROM events
WHERE timestamp
BETWEEN CAST(? AS DATE) AND CAST(? AS DATE)
AND care_recipient_id = 'df50cac5-293c-490d-a06c-ee26796f850d'
AND (event_type = 'physical_health_observation'
OR event_type = 'mental_health_observation')
ORDER BY timestamp;`;

export const getAllMedication = `        
SELECT payload 
FROM events 
WHERE (care_recipient_id = 'e3e2bff8-d318-4760-beea-841a75f00227' OR care_recipient_id = 'df50cac5-293c-490d-a06c-ee26796f850d' OR care_recipient_id ='ad3512a6-91b1-4d7d-a005-6f8764dd0111')
AND (event_type = 'medication_schedule_created'
OR event_type = 'medication_schedule_updated'
OR event_type = 'regular_medication_taken'
OR event_type = 'regular_medication_partially_taken'
OR event_type = 'regular_medication_maybe_taken'
OR event_type = 'regular_medication_not_taken')
ORDER BY timestamp;`;

export const getAllMedicationByDate = `        
SELECT payload 
FROM events 
WHERE timestamp 
BETWEEN CAST(? AS DATE) AND CAST(? AS DATE) 
AND (care_recipient_id = 'e3e2bff8-d318-4760-beea-841a75f00227' OR care_recipient_id = 'df50cac5-293c-490d-a06c-ee26796f850d')
AND (event_type = 'medication_schedule_created'
OR event_type = 'medication_schedule_updated'
OR event_type = 'regular_medication_taken'
OR event_type = 'regular_medication_partially_taken'
OR event_type = 'regular_medication_not_taken')
ORDER BY timestamp;`;
