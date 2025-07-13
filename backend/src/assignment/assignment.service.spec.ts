import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssignmentService } from './assignment.service';
import { Assignment } from './assignment.entity';

describe('AssignmentService', () => {
  let service: AssignmentService;
  let mockRepository: jest.Mocked<Repository<Assignment>>;

  beforeEach(async () => {
    const mockRepositoryProvider = {
      provide: getRepositoryToken(Assignment),
      useValue: {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        remove: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignmentService, mockRepositoryProvider],
    }).compile();

    service = module.get<AssignmentService>(AssignmentService);
    mockRepository = module.get(getRepositoryToken(Assignment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculateRemainingDays', () => {
    it('should calculate remaining days correctly for future treatment', () => {
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() + 5); // Start 5 days from now
      const numberOfDays = 10;

      const remainingDays = service.calculateRemainingDays(startDate, numberOfDays);
      expect(remainingDays).toBe(15); // 5 days until start + 10 days treatment
    });

    it('should calculate remaining days correctly for ongoing treatment', () => {
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 3); // Started 3 days ago
      const numberOfDays = 10;

      const remainingDays = service.calculateRemainingDays(startDate, numberOfDays);
      expect(remainingDays).toBe(7); // 10 days total - 3 days passed
    });

    it('should return 0 for completed treatment', () => {
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 15); // Started 15 days ago
      const numberOfDays = 10;

      const remainingDays = service.calculateRemainingDays(startDate, numberOfDays);
      expect(remainingDays).toBe(0); // Treatment completed
    });

    it('should handle treatment starting today', () => {
      const today = new Date();
      const startDate = new Date(today);
      const numberOfDays = 7;

      const remainingDays = service.calculateRemainingDays(startDate, numberOfDays);
      expect(remainingDays).toBe(7); // Full treatment period remaining
    });
  });
}); 