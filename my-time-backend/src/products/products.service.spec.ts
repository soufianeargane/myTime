import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { getModelToken } from '@nestjs/mongoose';
import { StoresService } from '../stores/stores.service';
import { Model } from 'mongoose';

// Mock StoresService with the required method
class MockStoresService {
  getStoreByOwner = jest
    .fn()
    .mockImplementation((user: any, status: string) => {
      return Promise.resolve({ success: true, data: { _id: 'mockStoreId' } });
    });
}

describe('ProductsService', () => {
  let service: ProductsService;
  let storesService: MockStoresService;
  let productModel: Model<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        CloudinaryService,
        { provide: StoresService, useClass: MockStoresService }, // Provide the mock StoresService
        {
          provide: getModelToken('Product'),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findById: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    storesService = module.get<MockStoresService>(StoresService);
    productModel = module.get<Model<any>>(getModelToken('Product'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      // Arrange
      const user = {
        /* mock user object */
      };
      const page = 1;
      const pageSize = 10;

      // Act
      const result = await service.findAll(user, { page, pageSize });

      // Assert
      expect(storesService.getStoreByOwner).toHaveBeenCalledWith(
        user,
        'active',
      );
    });
  });
  describe('findOne', () => {
    it('should return a product when found', async () => {
      const mockProduct = { _id: '1', name: 'Test Product' };
      jest
        .spyOn((service as any).productModel, 'findById')
        .mockResolvedValue(mockProduct);

      const result = await service.findOne('1');
      expect(result).toEqual(mockProduct);
    });

    it('should return null when product is not found', async () => {
      jest
        .spyOn((service as any).productModel, 'findById')
        .mockResolvedValue(null);

      const result = await service.findOne('1');
      expect(result).toBeNull();
    });
  });
});
