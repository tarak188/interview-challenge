export const BACKEND_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  PATIENTS: `${BACKEND_URL}/patients`,
  MEDICATIONS: `${BACKEND_URL}/medications`,
  ASSIGNMENTS: `${BACKEND_URL}/assignments`,
  ASSIGNMENTS_WITH_REMAINING_DAYS: `${BACKEND_URL}/assignments/with-remaining-days`,
  PATIENT_ASSIGNMENTS_WITH_REMAINING_DAYS: (patientId: number) => 
    `${BACKEND_URL}/assignments/patient/${patientId}/with-remaining-days`,
} as const; 