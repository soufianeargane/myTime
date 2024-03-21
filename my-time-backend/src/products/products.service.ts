import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { StoresService } from '../stores/stores.service';

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
    try {
      const store = await this.storesService.getStoreByOwner(user, 'active');
      const skip = (page - 1) * pageSize;
      const products = await this.productModel
        .find({
          store: store.data._id,
          deletedAt: null,
          quantity: { $gt: 0 },
        })
        .populate('category')
        .skip(skip)
        .limit(pageSize);
      return products;
    } catch (error) {
      console.log('error', error);
    }
  }

  findOne(id: string) {
    try {
      const product = this.productModel.findById(id);
      return product;
    } catch (error) {
      console.log('error', error);
    }
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

  async getProductsByStore(storeId: string) {
    const products = await this.productModel
      .find({
        store: storeId,
        deletedAt: null,
      })
      .populate('category')
      .exec();

    // console.log(products.length);
    return products;
  }

  async getTotalProducts(storeId: string) {
    const totalProducts = await this.productModel
      .find({
        store: storeId,
        deletedAt: null,
      })
      .countDocuments()
      .exec();
    return totalProducts;
  }

  async filterProducts({ name, category, id, user }) {
    let filter = {};
    if (name) {
      filter = { ...filter, name: { $regex: name, $options: 'i' } };
    }
    if (category) {
      filter = { ...filter, category };
    }
    if (id) {
      filter = { ...filter, store: id };
    } else {
      const store = await this.storesService.getStoreByOwner(user, 'active');
      filter = { ...filter, store: store.data._id };
    }

    console.log('filter', filter);
    const products = await this.productModel.find(filter).populate('category');
    return products;
  }
}
