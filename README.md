# Digital Health Workflow Management System

A full-stack application for managing patients, medications, and treatment assignments in a digital health workflow. Built with NestJS backend and Next.js frontend.

## 🏗️ Architecture Overview

This application follows the **MVC (Model-View-Controller)** pattern:

- **Models**: TypeORM entities representing database tables
- **Views**: Next.js React components for the user interface
- **Controllers**: NestJS controllers handling HTTP requests
- **Services**: Business logic layer between controllers and models

## 🚀 Features

### Backend (NestJS - Port 8080)
- **Patient Management**: CRUD operations for patient records
- **Medication Management**: CRUD operations for medication catalog
- **Assignment Management**: Assign medications to patients with treatment schedules
- **Remaining Days Calculation**: Automatic calculation of treatment remaining days
- **Input Validation**: Comprehensive validation using class-validator
- **Error Handling**: Proper HTTP status codes and error responses
- **Unit Testing**: Test coverage for core business logic

### Frontend (Next.js - Port 3000)
- **Dashboard**: Overview of patients and active treatments
- **Patient Management**: Create, view, and manage patient records
- **Medication Management**: Create and manage medication catalog
- **Assignment Management**: Assign medications to patients with visual remaining days
- **Responsive Design**: Modern UI with Tailwind CSS
- **Type Safety**: Full TypeScript implementation

## 📁 Project Structure

```
interview-challenge/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── patient/         # Patient module (MVC)
│   │   ├── medication/      # Medication module (MVC)
│   │   ├── assignment/      # Assignment module (MVC)
│   │   ├── app.module.ts    # Main application module
│   │   └── main.ts          # Application entry point
│   ├── database.sqlite      # SQLite database
│   └── package.json         # Backend dependencies
├── frontend/                # Next.js Frontend
│   ├── app/
│   │   ├── patients/        # Patient pages
│   │   ├── medications/     # Medication pages
│   │   ├── assignments/     # Assignment pages
│   │   ├── api.ts           # API service functions
│   │   ├── types.ts         # TypeScript type definitions
│   │   └── constants.ts     # Application constants
│   └── package.json         # Frontend dependencies
└── README.md               # This file
```

## 🛠️ Technology Stack

### Backend
- **NestJS**: Progressive Node.js framework
- **TypeORM**: Object-Relational Mapping
- **SQLite**: Lightweight database
- **class-validator**: Input validation
- **Jest**: Testing framework

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: State management

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Backend Setup

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run start:dev
   ```

3. **Run tests**:
   ```bash
   npm run test
   ```

The backend will be available at `http://localhost:8080`

### Frontend Setup

1. **Install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

## 📊 Database Schema

### Patient Table
- `id` (Primary Key): Unique identifier
- `name` (VARCHAR): Patient's full name
- `dateOfBirth` (DATE): Patient's date of birth

### Medication Table
- `id` (Primary Key): Unique identifier
- `name` (VARCHAR): Medication name
- `dosage` (VARCHAR): Dosage information
- `frequency` (VARCHAR): Administration frequency

### Assignment Table
- `id` (Primary Key): Unique identifier
- `patientId` (Foreign Key): Reference to Patient
- `medicationId` (Foreign Key): Reference to Medication
- `startDate` (DATE): Treatment start date
- `numberOfDays` (INTEGER): Treatment duration in days

## 🔌 API Endpoints

### Patients
- `GET /patients` - Get all patients
- `GET /patients/:id` - Get patient by ID
- `POST /patients` - Create new patient
- `PATCH /patients/:id` - Update patient
- `DELETE /patients/:id` - Delete patient

### Medications
- `GET /medications` - Get all medications
- `GET /medications/:id` - Get medication by ID
- `POST /medications` - Create new medication
- `PATCH /medications/:id` - Update medication
- `DELETE /medications/:id` - Delete medication

### Assignments
- `GET /assignments` - Get all assignments
- `GET /assignments/:id` - Get assignment by ID
- `POST /assignments` - Create new assignment
- `PATCH /assignments/:id` - Update assignment
- `DELETE /assignments/:id` - Delete assignment
- `GET /assignments/with-remaining-days` - Get assignments with calculated remaining days
- `GET /assignments/patient/:patientId/with-remaining-days` - Get patient's assignments with remaining days

## 🧪 Testing

### Backend Tests
The backend includes unit tests for the assignment service, specifically testing the remaining days calculation logic:

```bash
cd backend
npm run test
```

### Test Coverage
- Assignment service calculation logic
- Edge cases for date calculations
- Future, ongoing, and completed treatments

## 🎨 Frontend Features

### Dashboard
- Overview of patients and active treatments
- Quick access to management pages
- Visual indicators for treatment status

### Patient Management
- List all patients with basic information
- Create new patients with validation
- View detailed patient information
- Delete patients (with confirmation)

### Medication Management
- List all medications with dosage and frequency
- Create new medications
- Delete medications (with confirmation)

### Assignment Management
- List all assignments with remaining days
- Create new assignments with patient and medication selection
- Visual indicators for treatment urgency (red/yellow/green)
- Delete assignments (with confirmation)

## 🔧 Configuration

### Backend Configuration
- Database: SQLite (`database.sqlite`)
- Port: 8080 (configurable via environment variable)
- CORS: Enabled for frontend origin
- Validation: Global validation pipe enabled

### Frontend Configuration
- Backend URL: `http://localhost:8080` (configurable in `constants.ts`)
- Port: 3000
- API endpoints: Centralized in `constants.ts`

## 🚨 Error Handling

### Backend
- Input validation using class-validator
- Proper HTTP status codes
- Detailed error messages
- Global exception handling

### Frontend
- API error handling with user-friendly messages
- Loading states for better UX
- Form validation
- Confirmation dialogs for destructive actions

## 📝 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow NestJS conventions for backend
- Use React hooks and functional components
- Implement proper error handling
- Write meaningful commit messages

### Best Practices
- Validate all user inputs
- Handle loading and error states
- Use proper HTTP status codes
- Implement proper database relationships
- Test critical business logic

## 🔄 Deployment

### Backend Deployment
1. Build the application: `npm run build`
2. Start production server: `npm run start:prod`
3. Ensure database file is accessible
4. Configure environment variables

### Frontend Deployment
1. Build the application: `npm run build`
2. Start production server: `npm run start`
3. Update backend URL in constants if needed

## 🤝 Contributing

1. Follow the existing code structure
2. Add tests for new features
3. Update documentation as needed
4. Use meaningful commit messages
5. Test thoroughly before submitting

## 📄 License

This project is part of a technical assessment and is not licensed for commercial use.

---

**Note**: This application is designed for educational and assessment purposes. In a production environment, additional security measures, logging, monitoring, and error handling would be implemented.

