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

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    file: Express.Multer.File,
    user: any,
  ) {
    try {
      // Retrieve the product by ID
      const product = await this.productModel.findById(id);

      if (!product) {
        return {
          message: 'Product not found',
          success: false,
        };
      }

      // Check if the user is the owner of the store associated with the product
      const store = await this.storesService.getStoreByOwner(user, 'active');
      if (store.data._id.toString() !== product.store.toString()) {
        return {
          message: 'You do not have permission to update this product',
          success: false,
        };
      }

      // Update the product details
      let update: UpdateProductDto & { image?: string } = {
        ...updateProductDto,
      };
      if (file) {
        const image = await this.cloudinaryService.uploadImage(file);
        update = { ...update, image: image.url };
      }

      await this.productModel.updateOne({ _id: product._id }, { $set: update });

      return {
        message: 'Product updated successfully',
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
        quantity: { $gt: 0 },
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

    filter = { ...filter, deletedAt: null, quantity: { $gt: 0 } };

    console.log('filter', filter);
    const products = await this.productModel.find(filter).populate('category');
    return products;
  }
}
