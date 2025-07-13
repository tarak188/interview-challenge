# API Documentation

This document describes all the available API endpoints for the Digital Health Workflow Management System.

## Base URL
```
http://localhost:8080
```

## Authentication
Currently, no authentication is required. All endpoints are publicly accessible.

## Response Format
All successful responses return JSON data. Error responses include an error message.

## Endpoints

### Patients

#### Get All Patients
```http
GET /patients
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "dateOfBirth": "1990-05-15",
    "assignments": [
      {
        "id": 1,
        "patientId": 1,
        "medicationId": 1,
        "startDate": "2024-01-01",
        "numberOfDays": 14,
        "medication": {
          "id": 1,
          "name": "Amoxicillin",
          "dosage": "500mg",
          "frequency": "Twice daily"
        }
      }
    ]
  }
]
```

#### Get Patient by ID
```http
GET /patients/{id}
```

**Parameters:**
- `id` (number): Patient ID

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "dateOfBirth": "1990-05-15",
  "assignments": [...]
}
```

#### Create Patient
```http
POST /patients
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "dateOfBirth": "1985-03-20"
}
```

**Response:**
```json
{
  "id": 2,
  "name": "Jane Smith",
  "dateOfBirth": "1985-03-20"
}
```

#### Update Patient
```http
PATCH /patients/{id}
Content-Type: application/json
```

**Parameters:**
- `id` (number): Patient ID

**Request Body:**
```json
{
  "name": "Jane Smith Updated"
}
```

**Response:**
```json
{
  "id": 2,
  "name": "Jane Smith Updated",
  "dateOfBirth": "1985-03-20"
}
```

#### Delete Patient
```http
DELETE /patients/{id}
```

**Parameters:**
- `id` (number): Patient ID

**Response:**
- Status: 204 No Content

### Medications

#### Get All Medications
```http
GET /medications
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Amoxicillin",
    "dosage": "500mg",
    "frequency": "Twice daily",
    "assignments": [...]
  }
]
```

#### Get Medication by ID
```http
GET /medications/{id}
```

**Parameters:**
- `id` (number): Medication ID

**Response:**
```json
{
  "id": 1,
  "name": "Amoxicillin",
  "dosage": "500mg",
  "frequency": "Twice daily",
  "assignments": [...]
}
```

#### Create Medication
```http
POST /medications
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Ibuprofen",
  "dosage": "400mg",
  "frequency": "Every 6 hours"
}
```

**Response:**
```json
{
  "id": 2,
  "name": "Ibuprofen",
  "dosage": "400mg",
  "frequency": "Every 6 hours"
}
```

#### Update Medication
```http
PATCH /medications/{id}
Content-Type: application/json
```

**Parameters:**
- `id` (number): Medication ID

**Request Body:**
```json
{
  "dosage": "600mg"
}
```

**Response:**
```json
{
  "id": 2,
  "name": "Ibuprofen",
  "dosage": "600mg",
  "frequency": "Every 6 hours"
}
```

#### Delete Medication
```http
DELETE /medications/{id}
```

**Parameters:**
- `id` (number): Medication ID

**Response:**
- Status: 204 No Content

### Assignments

#### Get All Assignments
```http
GET /assignments
```

**Response:**
```json
[
  {
    "id": 1,
    "patientId": 1,
    "medicationId": 1,
    "startDate": "2024-01-01",
    "numberOfDays": 14,
    "patient": {
      "id": 1,
      "name": "John Doe",
      "dateOfBirth": "1990-05-15"
    },
    "medication": {
      "id": 1,
      "name": "Amoxicillin",
      "dosage": "500mg",
      "frequency": "Twice daily"
    }
  }
]
```

#### Get Assignment by ID
```http
GET /assignments/{id}
```

**Parameters:**
- `id` (number): Assignment ID

**Response:**
```json
{
  "id": 1,
  "patientId": 1,
  "medicationId": 1,
  "startDate": "2024-01-01",
  "numberOfDays": 14,
  "patient": {...},
  "medication": {...}
}
```

#### Create Assignment
```http
POST /assignments
Content-Type: application/json
```

**Request Body:**
```json
{
  "patientId": 1,
  "medicationId": 1,
  "startDate": "2024-01-01",
  "numberOfDays": 14
}
```

**Response:**
```json
{
  "id": 1,
  "patientId": 1,
  "medicationId": 1,
  "startDate": "2024-01-01",
  "numberOfDays": 14
}
```

#### Update Assignment
```http
PATCH /assignments/{id}
Content-Type: application/json
```

**Parameters:**
- `id` (number): Assignment ID

**Request Body:**
```json
{
  "numberOfDays": 21
}
```

**Response:**
```json
{
  "id": 1,
  "patientId": 1,
  "medicationId": 1,
  "startDate": "2024-01-01",
  "numberOfDays": 21
}
```

#### Delete Assignment
```http
DELETE /assignments/{id}
```

**Parameters:**
- `id` (number): Assignment ID

**Response:**
- Status: 204 No Content

#### Get Assignments with Remaining Days
```http
GET /assignments/with-remaining-days
```

**Response:**
```json
[
  {
    "id": 1,
    "patientId": 1,
    "medicationId": 1,
    "startDate": "2024-01-01",
    "numberOfDays": 14,
    "remainingDays": 7,
    "patient": {...},
    "medication": {...}
  }
]
```

#### Get Patient Assignments with Remaining Days
```http
GET /assignments/patient/{patientId}/with-remaining-days
```

**Parameters:**
- `patientId` (number): Patient ID

**Response:**
```json
[
  {
    "id": 1,
    "patientId": 1,
    "medicationId": 1,
    "startDate": "2024-01-01",
    "numberOfDays": 14,
    "remainingDays": 7,
    "patient": {...},
    "medication": {...}
  }
]
```

## Error Responses

### Validation Error (400 Bad Request)
```json
{
  "statusCode": 400,
  "message": [
    "name should not be empty",
    "dateOfBirth must be a valid date"
  ],
  "error": "Bad Request"
}
```

### Not Found Error (404 Not Found)
```json
{
  "statusCode": 404,
  "message": "Patient with ID 999 not found",
  "error": "Not Found"
}
```

### Internal Server Error (500 Internal Server Error)
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

## Data Validation Rules

### Patient
- `name`: Required string, not empty
- `dateOfBirth`: Required valid date string (YYYY-MM-DD format)

### Medication
- `name`: Required string, not empty
- `dosage`: Required string, not empty
- `frequency`: Required string, not empty

### Assignment
- `patientId`: Required number, must exist in patients table
- `medicationId`: Required number, must exist in medications table
- `startDate`: Required valid date string (YYYY-MM-DD format)
- `numberOfDays`: Required positive number

## Testing the API

### Using cURL

**Get all patients:**
```bash
curl http://localhost:8080/patients
```

**Create a patient:**
```bash
curl -X POST http://localhost:8080/patients \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","dateOfBirth":"1990-05-15"}'
```

**Create an assignment:**
```bash
curl -X POST http://localhost:8080/assignments \
  -H "Content-Type: application/json" \
  -d '{"patientId":1,"medicationId":1,"startDate":"2024-01-01","numberOfDays":14}'
```

### Using Postman

1. Import the collection (if available)
2. Set the base URL to `http://localhost:8080`
3. Use the provided examples for request bodies
4. Check the response status and body

### Using JavaScript/Fetch

```javascript
// Get all patients
const response = await fetch('http://localhost:8080/patients');
const patients = await response.json();

// Create a patient
const newPatient = await fetch('http://localhost:8080/patients', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    dateOfBirth: '1990-05-15'
  })
});
```

## Rate Limiting

Currently, no rate limiting is implemented. In a production environment, consider implementing rate limiting to prevent abuse.

## CORS

CORS is enabled for the frontend origin (`http://localhost:3000`). Allowed methods: GET, POST, PUT, DELETE, PATCH.

## Notes

- All dates are in ISO format (YYYY-MM-DD)
- IDs are auto-generated integers
- The `remainingDays` calculation is based on the current date
- Deleting a patient will also delete all their assignments
- Deleting a medication will also delete all assignments using that medication 