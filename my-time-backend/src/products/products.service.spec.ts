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
            findById: jest.fn().mockResolvedValue({
              _id: '1',
              name: 'Test Product',
              deletedAt: null,
              save: jest.fn().mockResolvedValue({}),
            }),
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

  describe('remove', () => {
    it('should delete a product successfully', async () => {
      // Arrange
      const mockProduct = {
        _id: '1',
        name: 'Test Product',
        deletedAt: null,
        save: jest.fn(),
      };
      jest.spyOn(productModel, 'findById').mockResolvedValue(mockProduct);

      // Act
      const result = await service.remove('1');

      // Assert
      expect(productModel.findById).toHaveBeenCalledWith('1');
      expect(mockProduct.deletedAt).not.toBeNull();
      expect(mockProduct.save).toHaveBeenCalled(); // Ensure that save method is called
      expect(result).toEqual({
        message: 'Product deleted successfully',
        success: true,
      });
    });

    it('should return product not found when product does not exist', async () => {
      // Arrange
      jest.spyOn(productModel, 'findById').mockResolvedValue(null);

      // Act
      const result = await service.remove('nonexistentId');

      // Assert
      expect(productModel.findById).toHaveBeenCalledWith('nonexistentId');
      expect(result).toEqual({ message: 'Product not found', success: false });
    });
  });
  describe('getTotalProducts', () => {
    it('should return the total number of products for a given store', async () => {
      const storeId = 'mockStoreId';
      const totalProducts = 5;
      jest
        .spyOn(productModel, 'find')
        .mockReturnThis()
        .mockReturnValue({
          countDocuments: jest.fn().mockReturnThis(),
          exec: jest.fn().mockResolvedValue(totalProducts),
        } as any);

      // Act
      const result = await service.getTotalProducts(storeId);

      // Assert
      expect(productModel.find).toHaveBeenCalledWith({
        store: storeId,
        deletedAt: null,
      });
      expect(result).toEqual(totalProducts);
    });
  });

  describe('getProductsByStore', () => {
    it('should return an array of products for a given store', async () => {
      // Arrange
      const storeId = 'mockStoreId';
      const mockProducts = [{ name: 'Product 1' }, { name: 'Product 2' }];
      jest.spyOn(productModel, 'find').mockReturnValueOnce({
        populate: jest.fn().mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(mockProducts),
        }),
      } as any);

      // Act
      const result = await service.getProductsByStore(storeId);

      // Assert
      expect(productModel.find).toHaveBeenCalledWith({
        store: storeId,
        deletedAt: null,
        quantity: { $gt: 0 },
      });
      expect(result).toEqual(mockProducts);
    });
  });
});
