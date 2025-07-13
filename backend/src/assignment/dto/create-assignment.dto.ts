import { IsNumber, IsDateString, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateAssignmentDto {
  @IsNumber()
  @IsNotEmpty()
  patientId: number;

  @IsNumber()
  @IsNotEmpty()
  medicationId: number;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsNumber()
  @IsPositive()
  numberOfDays: number;
} 