import { Test, TestingModule } from '@nestjs/testing';
import { StoresService } from './stores.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { getModelToken } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import { EmailService } from '../email/email.service';

// Mock AuthService
class MockAuthService {}

// Mock EmailService
class MockEmailService {}

describe('StoresService', () => {
  let service: StoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoresService,
        CloudinaryService,
        { provide: AuthService, useClass: MockAuthService }, // Provide the mock AuthService
        { provide: EmailService, useClass: MockEmailService }, // Provide the mock EmailService
        {
          provide: getModelToken('Store'),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findById: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<StoresService>(StoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
