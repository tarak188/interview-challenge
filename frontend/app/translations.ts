export type Language = 'en' | 'it';

export interface Translations {
  // Navigation
  backToDashboard: string;
  backToPatients: string;
  managePatients: string;
  manageMedications: string;
  manageAssignments: string;
  
  // Dashboard
  dashboardTitle: string;
  patientsOverview: string;
  activeTreatments: string;
  viewAllPatients: string;
  viewAllAssignments: string;
  noPatientsFound: string;
  noActiveTreatments: string;
  createFirstPatient: string;
  
  // Common
  loading: string;
  error: string;
  edit: string;
  delete: string;
  cancel: string;
  save: string;
  update: string;
  create: string;
  viewDetails: string;
  patientNotFound: string;
  
  // Patients
  patients: string;
  addPatient: string;
  createNewPatient: string;
  editPatient: string;
  updatePatient: string;
  deletePatient: string;
  patientName: string;
  dateOfBirth: string;
  age: string;
  yearsOld: string;
  totalAssignments: string;
  patientInformation: string;
  medicationAssignments: string;
  noMedicationAssignments: string;
  assignMedication: string;
  
  // Medications
  medications: string;
  addMedication: string;
  createNewMedication: string;
  editMedication: string;
  updateMedication: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  dosagePlaceholder: string;
  frequencyPlaceholder: string;
  patientAssignments: string;
  noMedicationsFound: string;
  createFirstMedication: string;
  
  // Assignments
  assignments: string;
  assignMedicationToPatient: string;
  editAssignment: string;
  updateAssignment: string;
  patient: string;
  medication: string;
  startDate: string;
  numberOfDays: string;
  selectPatient: string;
  selectMedication: string;
  daysLeft: string;
  noAssignmentsFound: string;
  createFirstAssignment: string;
  
  // Status
  startDateLabel: string;
  duration: string;
  days: string;
  
  // Confirmations
  confirmDeletePatient: string;
  confirmDeleteMedication: string;
  confirmDeleteAssignment: string;
  confirmDeletePatientAssignments: string;
  
  // Errors
  failedToFetchData: string;
  failedToCreatePatient: string;
  failedToUpdatePatient: string;
  failedToDeletePatient: string;
  failedToCreateMedication: string;
  failedToUpdateMedication: string;
  failedToDeleteMedication: string;
  failedToCreateAssignment: string;
  failedToUpdateAssignment: string;
  failedToDeleteAssignment: string;
  failedToFetchPatientData: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    backToDashboard: 'Back to Dashboard',
    backToPatients: 'Back to Patients',
    managePatients: 'Manage Patients',
    manageMedications: 'Manage Medications',
    manageAssignments: 'Manage Assignments',
    
    // Dashboard
    dashboardTitle: 'Digital Health Workflow Dashboard',
    patientsOverview: 'Patients Overview',
    activeTreatments: 'Active Treatments',
    viewAllPatients: 'View all patients →',
    viewAllAssignments: 'View all assignments →',
    noPatientsFound: 'No patients found. Create your first patient!',
    noActiveTreatments: 'No active treatments found.',
    createFirstPatient: 'Create your first patient!',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    save: 'Save',
    update: 'Update',
    create: 'Create',
    viewDetails: 'View Details',
    patientNotFound: 'Patient not found',
    
    // Patients
    patients: 'Patients',
    addPatient: 'Add Patient',
    createNewPatient: 'Create New Patient',
    editPatient: 'Edit Patient',
    updatePatient: 'Update Patient',
    deletePatient: 'Delete Patient',
    patientName: 'Name',
    dateOfBirth: 'Date of Birth',
    age: 'Age',
    yearsOld: 'years old',
    totalAssignments: 'Total Assignments',
    patientInformation: 'Patient Information',
    medicationAssignments: 'Medication Assignments',
    noMedicationAssignments: 'No medication assignments found for this patient.',
    assignMedication: 'Assign Medication',
    
    // Medications
    medications: 'Medications',
    addMedication: 'Add Medication',
    createNewMedication: 'Create New Medication',
    editMedication: 'Edit Medication',
    updateMedication: 'Update Medication',
    medicationName: 'Name',
    dosage: 'Dosage',
    frequency: 'Frequency',
    dosagePlaceholder: 'e.g., 500mg, 10ml',
    frequencyPlaceholder: 'e.g., Twice daily, Every 8 hours',
    patientAssignments: 'patient assignment(s)',
    noMedicationsFound: 'No medications found. Create your first medication!',
    createFirstMedication: 'Create your first medication!',
    
    // Assignments
    assignments: 'Medication Assignments',
    assignMedicationToPatient: 'Assign Medication to Patient',
    editAssignment: 'Edit Assignment',
    updateAssignment: 'Update Assignment',
    patient: 'Patient',
    medication: 'Medication',
    startDate: 'Start Date',
    numberOfDays: 'Number of Days',
    selectPatient: 'Select a patient',
    selectMedication: 'Select a medication',
    daysLeft: 'days left',
    noAssignmentsFound: 'No assignments found. Create your first assignment!',
    createFirstAssignment: 'Create your first assignment!',
    
    // Status
    startDateLabel: 'Start Date',
    duration: 'Duration',
    days: 'days',
    
    // Confirmations
    confirmDeletePatient: 'Are you sure you want to delete this patient?',
    confirmDeleteMedication: 'Are you sure you want to delete this medication?',
    confirmDeleteAssignment: 'Are you sure you want to delete this assignment?',
    confirmDeletePatientAssignments: 'Are you sure you want to delete this patient? This will also delete all their medication assignments.',
    
    // Errors
    failedToFetchData: 'Failed to fetch data',
    failedToCreatePatient: 'Failed to create patient',
    failedToUpdatePatient: 'Failed to update patient',
    failedToDeletePatient: 'Failed to delete patient',
    failedToCreateMedication: 'Failed to create medication',
    failedToUpdateMedication: 'Failed to update medication',
    failedToDeleteMedication: 'Failed to delete medication',
    failedToCreateAssignment: 'Failed to create assignment',
    failedToUpdateAssignment: 'Failed to update assignment',
    failedToDeleteAssignment: 'Failed to delete assignment',
    failedToFetchPatientData: 'Failed to fetch patient data',
  },
  it: {
    // Navigation
    backToDashboard: 'Torna alla Dashboard',
    backToPatients: 'Torna ai Pazienti',
    managePatients: 'Gestisci Pazienti',
    manageMedications: 'Gestisci Farmaci',
    manageAssignments: 'Gestisci Assegnazioni',
    
    // Dashboard
    dashboardTitle: 'Dashboard del Flusso di Lavoro Sanitario Digitale',
    patientsOverview: 'Panoramica Pazienti',
    activeTreatments: 'Trattamenti Attivi',
    viewAllPatients: 'Visualizza tutti i pazienti →',
    viewAllAssignments: 'Visualizza tutte le assegnazioni →',
    noPatientsFound: 'Nessun paziente trovato. Crea il tuo primo paziente!',
    noActiveTreatments: 'Nessun trattamento attivo trovato.',
    createFirstPatient: 'Crea il tuo primo paziente!',
    
    // Common
    loading: 'Caricamento...',
    error: 'Errore',
    edit: 'Modifica',
    delete: 'Elimina',
    cancel: 'Annulla',
    save: 'Salva',
    update: 'Aggiorna',
    create: 'Crea',
    viewDetails: 'Visualizza Dettagli',
    patientNotFound: 'Paziente non trovato',
    
    // Patients
    patients: 'Pazienti',
    addPatient: 'Aggiungi Paziente',
    createNewPatient: 'Crea Nuovo Paziente',
    editPatient: 'Modifica Paziente',
    updatePatient: 'Aggiorna Paziente',
    deletePatient: 'Elimina Paziente',
    patientName: 'Nome',
    dateOfBirth: 'Data di Nascita',
    age: 'Età',
    yearsOld: 'anni',
    totalAssignments: 'Assegnazioni Totali',
    patientInformation: 'Informazioni Paziente',
    medicationAssignments: 'Assegnazioni di Farmaci',
    noMedicationAssignments: 'Nessuna assegnazione di farmaci trovata per questo paziente.',
    assignMedication: 'Assegna Farmaco',
    
    // Medications
    medications: 'Farmaci',
    addMedication: 'Aggiungi Farmaco',
    createNewMedication: 'Crea Nuovo Farmaco',
    editMedication: 'Modifica Farmaco',
    updateMedication: 'Aggiorna Farmaco',
    medicationName: 'Nome',
    dosage: 'Dosaggio',
    frequency: 'Frequenza',
    dosagePlaceholder: 'es., 500mg, 10ml',
    frequencyPlaceholder: 'es., Due volte al giorno, Ogni 8 ore',
    patientAssignments: 'assegnazione(i) di paziente',
    noMedicationsFound: 'Nessun farmaco trovato. Crea il tuo primo farmaco!',
    createFirstMedication: 'Crea il tuo primo farmaco!',
    
    // Assignments
    assignments: 'Assegnazioni di Farmaci',
    assignMedicationToPatient: 'Assegna Farmaco al Paziente',
    editAssignment: 'Modifica Assegnazione',
    updateAssignment: 'Aggiorna Assegnazione',
    patient: 'Paziente',
    medication: 'Farmaco',
    startDate: 'Data di Inizio',
    numberOfDays: 'Numero di Giorni',
    selectPatient: 'Seleziona un paziente',
    selectMedication: 'Seleziona un farmaco',
    daysLeft: 'giorni rimanenti',
    noAssignmentsFound: 'Nessuna assegnazione trovata. Crea la tua prima assegnazione!',
    createFirstAssignment: 'Crea la tua prima assegnazione!',
    
    // Status
    startDateLabel: 'Data di Inizio',
    duration: 'Durata',
    days: 'giorni',
    
    // Confirmations
    confirmDeletePatient: 'Sei sicuro di voler eliminare questo paziente?',
    confirmDeleteMedication: 'Sei sicuro di voler eliminare questo farmaco?',
    confirmDeleteAssignment: 'Sei sicuro di voler eliminare questa assegnazione?',
    confirmDeletePatientAssignments: 'Sei sicuro di voler eliminare questo paziente? Questo eliminerà anche tutte le sue assegnazioni di farmaci.',
    
    // Errors
    failedToFetchData: 'Impossibile recuperare i dati',
    failedToCreatePatient: 'Impossibile creare il paziente',
    failedToUpdatePatient: 'Impossibile aggiornare il paziente',
    failedToDeletePatient: 'Impossibile eliminare il paziente',
    failedToCreateMedication: 'Impossibile creare il farmaco',
    failedToUpdateMedication: 'Impossibile aggiornare il farmaco',
    failedToDeleteMedication: 'Impossibile eliminare il farmaco',
    failedToCreateAssignment: 'Impossibile creare l\'assegnazione',
    failedToUpdateAssignment: 'Impossibile aggiornare l\'assegnazione',
    failedToDeleteAssignment: 'Impossibile eliminare l\'assegnazione',
    failedToFetchPatientData: 'Impossibile recuperare i dati del paziente',
  },
}; 