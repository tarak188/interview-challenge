import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    const assignment = this.assignmentRepository.create({
      ...createAssignmentDto,
      startDate: new Date(createAssignmentDto.startDate),
    });
    return this.assignmentRepository.save(assignment);
  }

  async findAll(): Promise<Assignment[]> {
    return this.assignmentRepository.find({
      relations: ['patient', 'medication'],
    });
  }

  async findOne(id: number): Promise<Assignment> {
    const assignment = await this.assignmentRepository.findOne({
      where: { id },
      relations: ['patient', 'medication'],
    });
    
    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    
    return assignment;
  }

  async update(id: number, updateAssignmentDto: UpdateAssignmentDto): Promise<Assignment> {
    const assignment = await this.findOne(id);
    
    if (updateAssignmentDto.startDate) {
      assignment.startDate = new Date(updateAssignmentDto.startDate);
    }
    if (updateAssignmentDto.numberOfDays) {
      assignment.numberOfDays = updateAssignmentDto.numberOfDays;
    }
    if (updateAssignmentDto.patientId) {
      assignment.patientId = updateAssignmentDto.patientId;
    }
    if (updateAssignmentDto.medicationId) {
      assignment.medicationId = updateAssignmentDto.medicationId;
    }
    
    return this.assignmentRepository.save(assignment);
  }

  async remove(id: number): Promise<void> {
    const assignment = await this.findOne(id);
    await this.assignmentRepository.remove(assignment);
  }

  calculateRemainingDays(startDate: Date, numberOfDays: number): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + numberOfDays);
    endDate.setHours(0, 0, 0, 0); // Reset time to start of day
    
    const timeDiff = endDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return Math.max(0, daysDiff);
  }

  async getAssignmentsWithRemainingDays(): Promise<any[]> {
    const assignments = await this.findAll();
    
    return assignments.map(assignment => ({
      ...assignment,
      remainingDays: this.calculateRemainingDays(assignment.startDate, assignment.numberOfDays),
    }));
  }

  async getPatientAssignmentsWithRemainingDays(patientId: number): Promise<any[]> {
    const assignments = await this.assignmentRepository.find({
      where: { patientId },
      relations: ['patient', 'medication'],
    });
    
    return assignments.map(assignment => ({
      ...assignment,
      remainingDays: this.calculateRemainingDays(assignment.startDate, assignment.numberOfDays),
    }));
  }
} 