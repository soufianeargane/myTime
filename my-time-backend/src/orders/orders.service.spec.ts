import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StoresService } from '../stores/stores.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let orderModel: Model<any>; // Adjust this type according to your Order model
  let storeService: StoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        StoresService, // Mock the StoresService
        {
          provide: getModelToken('Order'), // Adjust this token according to your model name
          useValue: {
            countDocuments: jest.fn().mockResolvedValue(0), // Mock the countDocuments method
            find: jest.fn().mockReturnThis(), // Mock the find method
            populate: jest.fn().mockReturnThis(), // Mock the populate method
            sort: jest.fn().mockReturnThis(), // Mock the sort method
            skip: jest.fn().mockReturnThis(), // Mock the skip method
            limit: jest.fn().mockReturnThis(), // Mock the limit method
            exec: jest.fn().mockResolvedValue([]), // Mock the exec method
          },
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    orderModel = module.get<Model<any>>(getModelToken('Order')); // Adjust this token according to your model name
    storeService = module.get<StoresService>(StoresService);
  });

  describe('findAll', () => {
    it('should return orders', async () => {
      const mockUser = {
        /* mock user object */
      };
      const mockStore = { success: true, data: { _id: 'mockStoreId' } };
      jest.spyOn(storeService, 'getStoreByOwner').mockResolvedValue(mockStore);

      const result = await service.findAll(mockUser);

      expect(result.success).toBe(true);
      expect(orderModel.countDocuments).toHaveBeenCalledWith({
        store: 'mockStoreId',
      });
      expect(orderModel.find).toHaveBeenCalledWith({ store: 'mockStoreId' });
      expect(orderModel.populate).toHaveBeenCalledWith('client');
      expect(orderModel.sort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(orderModel.skip).toHaveBeenCalled();
      expect(orderModel.limit).toHaveBeenCalled();
      expect(orderModel.exec).toHaveBeenCalled();
    });

    it('should throw BadRequestException if no active store found', async () => {
      const mockUser = {
        /* mock user object */
      };
      const mockStore = { success: false };
      jest.spyOn(storeService, 'getStoreByOwner').mockResolvedValue(mockStore);

      await expect(service.findAll(mockUser)).rejects.toThrowError(
        'You do not have any active store',
      );
    });
  });
});
