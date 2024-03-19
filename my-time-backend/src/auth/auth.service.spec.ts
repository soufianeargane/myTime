import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { EmailService } from '../email/email.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        EmailService,
        {
          provide: getModelToken('User'),
          useValue: {
            findById: jest.fn().mockResolvedValue({
              role: 'user',
              save: jest.fn().mockResolvedValue({}),
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('changeRole', () => {
    it('should change the role of the user', async () => {
      // Arrange
      const userId = '123';
      const role = 'admin';
      const userModel = {
        findById: jest.fn().mockResolvedValue({
          role: 'user',
          save: jest.fn().mockResolvedValue({}),
        }),
      };

      // Act
      const result = await service.changeRole(userId, role);
      expect(result.role).toBe(role);
      expect(result).toEqual({
        role: 'admin',
        save: expect.any(Function),
      });
    });
  });
});
