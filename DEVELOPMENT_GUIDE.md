# Development Guide for Junior Developers

This guide will help you understand the codebase structure and how to work with this digital health workflow application.

## 🎯 Understanding the Application

This is a **full-stack web application** that manages:
- **Patients**: People receiving medical treatment
- **Medications**: Drugs that can be prescribed
- **Assignments**: Connections between patients and medications with treatment schedules

Think of it like a digital prescription system where doctors can assign medications to patients and track how long the treatment should last.

## 🏗️ Architecture Breakdown

### Backend (NestJS)
The backend is like the "brain" of the application. It:
- Stores data in a database
- Handles requests from the frontend
- Performs calculations (like remaining treatment days)
- Validates data before saving

**Key Concepts:**
- **Controllers**: Handle HTTP requests (like a receptionist)
- **Services**: Contain business logic (like the actual work)
- **Entities**: Represent database tables (like forms)
- **DTOs**: Define what data should look like (like templates)

### Frontend (Next.js)
The frontend is what users see and interact with. It:
- Shows data in a user-friendly way
- Collects user input
- Sends requests to the backend
- Updates the display when data changes

**Key Concepts:**
- **Pages**: Different screens users can visit
- **Components**: Reusable UI pieces
- **Hooks**: Manage state and side effects
- **API calls**: Communicate with the backend

## 📁 File Structure Explained

### Backend Structure
```
backend/src/
├── patient/           # Everything related to patients
│   ├── patient.entity.ts      # Database table structure
│   ├── patient.service.ts     # Business logic
│   ├── patient.controller.ts  # HTTP request handling
│   ├── patient.module.ts      # Organizes patient features
│   └── dto/                   # Data validation rules
├── medication/        # Everything related to medications
├── assignment/        # Everything related to assignments
└── app.module.ts      # Main application configuration
```

### Frontend Structure
```
frontend/app/
├── patients/          # Patient-related pages
├── medications/       # Medication-related pages
├── assignments/       # Assignment-related pages
├── api.ts            # Functions to talk to backend
├── types.ts          # TypeScript type definitions
└── constants.ts      # Configuration values
```

## 🔧 How to Add New Features

### Adding a New Backend Feature

1. **Create an Entity** (if needed):
   ```typescript
   // new-feature.entity.ts
   import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
   
   @Entity()
   export class NewFeature {
     @PrimaryGeneratedColumn()
     id: number;
   
     @Column()
     name: string;
   }
   ```

2. **Create a Service**:
   ```typescript
   // new-feature.service.ts
   import { Injectable } from '@nestjs/common';
   import { InjectRepository } from '@nestjs/typeorm';
   import { Repository } from 'typeorm';
   import { NewFeature } from './new-feature.entity';
   
   @Injectable()
   export class NewFeatureService {
     constructor(
       @InjectRepository(NewFeature)
       private repository: Repository<NewFeature>,
     ) {}
   
     async findAll(): Promise<NewFeature[]> {
       return this.repository.find();
     }
   }
   ```

3. **Create a Controller**:
   ```typescript
   // new-feature.controller.ts
   import { Controller, Get } from '@nestjs/common';
   import { NewFeatureService } from './new-feature.service';
   
   @Controller('new-features')
   export class NewFeatureController {
     constructor(private service: NewFeatureService) {}
   
     @Get()
     findAll() {
       return this.service.findAll();
     }
   }
   ```

4. **Create a Module**:
   ```typescript
   // new-feature.module.ts
   import { Module } from '@nestjs/common';
   import { TypeOrmModule } from '@nestjs/typeorm';
   import { NewFeature } from './new-feature.entity';
   import { NewFeatureService } from './new-feature.service';
   import { NewFeatureController } from './new-feature.controller';
   
   @Module({
     imports: [TypeOrmModule.forFeature([NewFeature])],
     controllers: [NewFeatureController],
     providers: [NewFeatureService],
   })
   export class NewFeatureModule {}
   ```

5. **Add to App Module**:
   ```typescript
   // app.module.ts
   import { NewFeatureModule } from './new-feature/new-feature.module';
   
   @Module({
     imports: [
       // ... other imports
       NewFeatureModule,
     ],
   })
   export class AppModule {}
   ```

### Adding a New Frontend Feature

1. **Create a Page**:
   ```typescript
   // app/new-features/page.tsx
   'use client';
   
   import { useState, useEffect } from 'react';
   
   export default function NewFeaturesPage() {
     const [data, setData] = useState([]);
   
     useEffect(() => {
       // Fetch data from backend
     }, []);
   
     return (
       <div>
         <h1>New Features</h1>
         {/* Your UI here */}
       </div>
     );
   }
   ```

2. **Add API Functions**:
   ```typescript
   // api.ts
   export const newFeatureApi = {
     getAll: (): Promise<any[]> => 
       apiRequest<any[]>(`${API_ENDPOINTS.NEW_FEATURES}`),
   };
   ```

3. **Add Types**:
   ```typescript
   // types.ts
   export interface NewFeature {
     id: number;
     name: string;
   }
   ```

## 🧪 Testing Your Code

### Backend Testing
```bash
# Run all tests
npm run test

# Run tests in watch mode (reruns when files change)
npm run test:watch

# Run tests with coverage
npm run test:cov
```

### Writing Tests
```typescript
// new-feature.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { NewFeatureService } from './new-feature.service';

describe('NewFeatureService', () => {
  let service: NewFeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewFeatureService],
    }).compile();

    service = module.get<NewFeatureService>(NewFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all features', async () => {
    const result = await service.findAll();
    expect(Array.isArray(result)).toBe(true);
  });
});
```

## 🐛 Common Issues and Solutions

### Backend Issues

1. **Database Connection Error**:
   - Make sure `database.sqlite` file exists
   - Check if TypeORM is properly configured

2. **Validation Errors**:
   - Check that DTOs are properly decorated
   - Ensure ValidationPipe is enabled in main.ts

3. **Import Errors**:
   - Make sure modules are properly imported in app.module.ts
   - Check file paths are correct

### Frontend Issues

1. **API Connection Error**:
   - Ensure backend is running on port 8080
   - Check CORS configuration
   - Verify API endpoints in constants.ts

2. **TypeScript Errors**:
   - Check that types are properly defined
   - Ensure API responses match expected types

3. **Styling Issues**:
   - Make sure Tailwind CSS is properly configured
   - Check that classes are correctly applied

## 📚 Learning Resources

### NestJS
- [NestJS Official Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [Class Validator](https://github.com/typestack/class-validator)

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [React Hooks](https://react.dev/reference/react)
- [Tailwind CSS](https://tailwindcss.com/docs)

### General
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [REST API Design](https://restfulapi.net/)

## 🎯 Best Practices

### Code Organization
- Keep related files together in folders
- Use meaningful file and function names
- Add comments for complex logic
- Follow the existing code style

### Error Handling
- Always handle potential errors
- Provide user-friendly error messages
- Log errors for debugging
- Use proper HTTP status codes

### Testing
- Write tests for business logic
- Test edge cases
- Keep tests simple and focused
- Use descriptive test names

### Performance
- Avoid unnecessary API calls
- Use proper database queries
- Implement loading states
- Optimize bundle size

## 🚀 Next Steps

Once you're comfortable with the current codebase, consider:

1. **Adding Authentication**: Implement user login/logout
2. **Role-Based Access**: Different permissions for different users
3. **Audit Logging**: Track changes to patient data
4. **Notifications**: Alert users about expiring treatments
5. **Reporting**: Generate treatment reports
6. **Mobile App**: Create a React Native version
7. **Real-time Updates**: Use WebSockets for live updates

Remember: Start small, test often, and don't be afraid to ask questions! 