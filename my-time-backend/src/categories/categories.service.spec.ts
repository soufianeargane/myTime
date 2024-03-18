import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let categoryModel: Model<any>; // Adjust this type according to your Category model

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getModelToken('Category'), // Adjust this token according to your model name
          useValue: {
            find: jest.fn().mockResolvedValue([]), // Mock the find method
          },
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    categoryModel = module.get<Model<any>>(getModelToken('Category')); // Adjust this token according to your model name
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(categoryModel.find).toHaveBeenCalled();
    });
  });
});
