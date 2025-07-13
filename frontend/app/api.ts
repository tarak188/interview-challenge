import { API_ENDPOINTS } from './constants';
import { 
  Patient, 
  Medication, 
  Assignment, 
  CreatePatientDto, 
  CreateMedicationDto, 
  CreateAssignmentDto 
} from './types';

// Generic API functions
async function apiRequest<T>(
  url: string, 
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  if (response.status === 204) {
    return {} as T; // No content
  }

  return response.json();
}

// Patient API functions
export const patientApi = {
  getAll: (): Promise<Patient[]> => 
    apiRequest<Patient[]>(API_ENDPOINTS.PATIENTS),

  getById: (id: number): Promise<Patient> => 
    apiRequest<Patient>(`${API_ENDPOINTS.PATIENTS}/${id}`),

  create: (data: CreatePatientDto): Promise<Patient> => 
    apiRequest<Patient>(API_ENDPOINTS.PATIENTS, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<CreatePatientDto>): Promise<Patient> => 
    apiRequest<Patient>(`${API_ENDPOINTS.PATIENTS}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (id: number): Promise<void> => 
    apiRequest<void>(`${API_ENDPOINTS.PATIENTS}/${id}`, {
      method: 'DELETE',
    }),
};

// Medication API functions
export const medicationApi = {
  getAll: (): Promise<Medication[]> => 
    apiRequest<Medication[]>(API_ENDPOINTS.MEDICATIONS),

  getById: (id: number): Promise<Medication> => 
    apiRequest<Medication>(`${API_ENDPOINTS.MEDICATIONS}/${id}`),

  create: (data: CreateMedicationDto): Promise<Medication> => 
    apiRequest<Medication>(API_ENDPOINTS.MEDICATIONS, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<CreateMedicationDto>): Promise<Medication> => 
    apiRequest<Medication>(`${API_ENDPOINTS.MEDICATIONS}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (id: number): Promise<void> => 
    apiRequest<void>(`${API_ENDPOINTS.MEDICATIONS}/${id}`, {
      method: 'DELETE',
    }),
};

// Assignment API functions
export const assignmentApi = {
  getAll: (): Promise<Assignment[]> => 
    apiRequest<Assignment[]>(API_ENDPOINTS.ASSIGNMENTS),

  getById: (id: number): Promise<Assignment> => 
    apiRequest<Assignment>(`${API_ENDPOINTS.ASSIGNMENTS}/${id}`),

  create: (data: CreateAssignmentDto): Promise<Assignment> => 
    apiRequest<Assignment>(API_ENDPOINTS.ASSIGNMENTS, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<CreateAssignmentDto>): Promise<Assignment> => 
    apiRequest<Assignment>(`${API_ENDPOINTS.ASSIGNMENTS}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (id: number): Promise<void> => 
    apiRequest<void>(`${API_ENDPOINTS.ASSIGNMENTS}/${id}`, {
      method: 'DELETE',
    }),

  getWithRemainingDays: (): Promise<Assignment[]> => 
    apiRequest<Assignment[]>(API_ENDPOINTS.ASSIGNMENTS_WITH_REMAINING_DAYS),

  getPatientAssignmentsWithRemainingDays: (patientId: number): Promise<Assignment[]> => 
    apiRequest<Assignment[]>(API_ENDPOINTS.PATIENT_ASSIGNMENTS_WITH_REMAINING_DAYS(patientId)),
}; 