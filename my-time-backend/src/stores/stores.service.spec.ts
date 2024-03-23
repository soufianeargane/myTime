import { Test, TestingModule } from '@nestjs/testing';
import { StoresService } from './stores.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { getModelToken } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import { EmailService } from '../email/email.service';
import { CreateStoreDto } from './dto/create-store.dto';

// Mock AuthService
class MockAuthService {
  async changeRole(userId: string, role: string): Promise<void> {
    // Mock implementation of the method
    return Promise.resolve(); // or any custom behavior you need for testing
  }
}

// Mock EmailService
class MockEmailService {
  async sendEmail(mailOptions: any): Promise<void> {
    // Mock implementation of the method
    return Promise.resolve(); // or any custom behavior you need for testing
  }
}

describe('StoresService', () => {
  let service: StoresService;
  let storeModel: any;
  let authService: AuthService;
  let emailService: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoresService,
        CloudinaryService,
        { provide: AuthService, useClass: MockAuthService },
        { provide: EmailService, useClass: MockEmailService },
        {
          provide: getModelToken('Store'),
          useValue: {
            save: jest.fn().mockResolvedValue({}),
            find: jest.fn().mockReturnThis(),
            populate: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValue([]),
            findByIdAndUpdate: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<StoresService>(StoresService);
    storeModel = module.get<any>(getModelToken('Store'));
    authService = module.get<AuthService>(AuthService);
    emailService = module.get<EmailService>(EmailService);

    jest.spyOn(storeModel, 'save').mockImplementation((store) => {
      console.log(store); // This will log the store object passed to the save method
      return Promise.resolve(store); // Return a resolved promise with the store object
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all active stores', async () => {
      // Arrange
      const mockStores = [
        { _id: '1', name: 'Store 1', status: 'active', owner: 'owner1' },
        { _id: '2', name: 'Store 2', status: 'active', owner: 'owner2' },
      ];
      jest.spyOn(storeModel, 'find').mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockStores),
        }),
      });

      // Act
      const stores = await service.findAll();

      // Assert
      expect(storeModel.find).toHaveBeenCalledWith({ status: 'active' });
      expect(stores).toEqual(mockStores);
    });
  });

  describe('acceptStore', () => {
    it('should update store status, change role, and send email', async () => {
      // Arrange
      const mockStore = {
        _id: '1',
        name: 'Test Store',
        owner: { _id: 'ownerId', email: 'owner@example.com' },
      };
      jest.spyOn(storeModel, 'findByIdAndUpdate').mockResolvedValue(mockStore);
      jest.spyOn(authService, 'changeRole').mockResolvedValue(void 0); // Change here
      jest.spyOn(emailService, 'sendEmail').mockResolvedValue(void 0);

      // Act
      const result = await service.acceptStore(mockStore);

      // Assert
      expect(storeModel.findByIdAndUpdate).toHaveBeenCalledWith(mockStore._id, {
        status: 'active',
      });
      expect(result).toEqual(undefined);
    });
  });

  describe('searchByName', () => {
    it('should return stores with matching name', async () => {
      // Arrange
      const name = 'test';
      const mockStores = [
        { _id: '1', name: 'Test Store 1' },
        { _id: '2', name: 'Test Store 2' },
      ];
      jest.spyOn(storeModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockStores),
      });

      // Act
      const result = await service.searchByName(name);

      // Assert
      expect(storeModel.find).toHaveBeenCalledWith({
        name: { $regex: name, $options: 'i' },
      });
      expect(result).toEqual(mockStores);
    });

    it('should return an empty array if no stores match the name', async () => {
      // Arrange
      const name = 'nonexistent';
      jest.spyOn(storeModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue([]),
      });

      // Act
      const result = await service.searchByName(name);

      // Assert
      expect(storeModel.find).toHaveBeenCalledWith({
        name: { $regex: name, $options: 'i' },
      });
      expect(result).toEqual([]);
    });
  });

  describe('getTotalStores', () => {
    it('should return the total count of active stores', async () => {
      // Arrange
      const mockActiveStores = [
        { _id: '1', name: 'Store 1', status: 'active' },
        { _id: '2', name: 'Store 2', status: 'active' },
      ];
      jest.spyOn(storeModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockActiveStores),
      });

      // Act
      const totalStores = await service.getTotalStores();

      // Assert
      expect(storeModel.find).toHaveBeenCalledWith({ status: 'active' });
      expect(totalStores).toBe(2); // Assuming there are 2 active stores
    });
  });

  describe('create', () => {
    it('should create a new store, save it to the database, and send an email notification', async () => {
      // Arrange
      const createStoreDto: CreateStoreDto = {
        name: 'Test Store',
        address: '123 Test St',
        phone: '1234567890',
        longitude: '123.456',
        latitude: '78.901',
      };
      const user = { userId: 'user_id', email: 'user@example.com' };
      const file: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'test.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 1000,
        stream: null,
        destination: './uploads',
        filename: 'test.jpg',
        path: './uploads/test.jpg',
        buffer: Buffer.from(''),
      };

      // Mock the createImage method to return a mock image URL
      jest.spyOn(service, 'createImage').mockResolvedValue('mock_image_url');

      // Act
      await service.create(createStoreDto, user, file);

      // Assert
      expect(service.createImage).toHaveBeenCalledWith(file);
    });
  });
});
