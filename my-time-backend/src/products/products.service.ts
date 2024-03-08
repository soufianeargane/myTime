import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { StoresService } from 'src/stores/stores.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private readonly storesService: StoresService,
  ) {}
  async create(
    createProductDto: CreateProductDto,
    file: Express.Multer.File,
    user: any,
  ) {
    try {
      const store = await this.storesService.getStoreByOwner(user, 'active');
      const url = await this.storesService.createImage(file);
      const product = new this.productModel({
        ...createProductDto,
        store: store.data._id,
        image: url.toString(),
      });
      await product.save();
      return {
        message: 'Product created successfully',
        success: true,
      };
    } catch (error) {
      console.log('error', error);
      return {
        message: 'An error occurred',
        success: false,
      };
    }
  }

  async findAll(user: any, { page, pageSize }): Promise<Product[]> {
    const store = await this.storesService.getStoreByOwner(user, 'active');
    const skip = (page - 1) * pageSize;
    const products = await this.productModel
      .find({
        store: store.data._id,
        deletedAt: null,
      })
      .populate('category')
      .skip(skip)
      .limit(pageSize);
    return products;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) {
      return { message: 'Product not found', success: false };
    }
    product.deletedAt = new Date();
    await product.save();
    return { message: 'Product deleted successfully', success: true };
  }
}
