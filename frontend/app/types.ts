export interface Patient {
  id: number;
  name: string;
  dateOfBirth: string;
  assignments?: Assignment[];
}

export interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  assignments?: Assignment[];
}

export interface Assignment {
  id: number;
  patientId: number;
  medicationId: number;
  startDate: string;
  numberOfDays: number;
  patient?: Patient;
  medication?: Medication;
  remainingDays?: number;
}

export interface CreatePatientDto {
  name: string;
  dateOfBirth: string;
}

export interface CreateMedicationDto {
  name: string;
  dosage: string;
  frequency: string;
}

export interface CreateAssignmentDto {
  patientId: number;
  medicationId: number;
  startDate: string;
  numberOfDays: number;
} 