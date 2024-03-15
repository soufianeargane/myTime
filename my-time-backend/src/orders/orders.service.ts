import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto, OrderItemDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { ProductsService } from '../products/products.service';
import { StoresService } from 'src/stores/stores.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    private readonly productsService: ProductsService,
    private readonly storeService: StoresService,
  ) {}
  async create(createOrderDto: CreateOrderDto, user: any) {
    const items = createOrderDto.items;
    const itemsAreValid = await this.validateOrderItems(items);

    if (!itemsAreValid) {
      throw new BadRequestException(
        'Ordered quantity for one or more items is more than the available quantity',
      );
    }

    const totalAmount = await this.calculateTotalAmount(items);

    const order = new this.orderModel({
      ...createOrderDto,
      client: user.userId,
      totalAmount,
      store: createOrderDto.storeId,
      products: items,
    });

    await order.save();
    await this.decreaceQuantity(items);
    return {
      message: 'Order created successfully',
      success: true,
    };
  }

  async findAll(user: any, page: number = 1, limit: number = 10) {
    const store = await this.storeService.getStoreByOwner(user, 'active');

    if (!store.success) {
      throw new BadRequestException('You do not have any active store');
    }

    const skip = (page - 1) * limit;
    const totalOrders = await this.orderModel.countDocuments({
      store: store.data._id,
    });
    console.log(totalOrders);

    const orders = await this.orderModel
      .find({ store: store.data._id })
      .populate('client')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    return {
      success: true,
      orders,
      totalOrders,
    };
  }

  async getOrderDetails(id: string) {
    console.log(id);
    try {
      const order = await this.orderModel
        .findOne({ _id: id })
        .populate({
          path: 'products._id',
          model: 'Product',
        })
        .exec();

      if (!order) {
        throw new BadRequestException('Order not found');
      }

      return order;
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async validateOrderItems(items: OrderItemDto[]): Promise<boolean> {
    for (const item of items) {
      const product = await this.productsService.findOne(item._id); // Fetch the product from the database

      if (item.orderQuantity > product.quantity) {
        // If the ordered quantity is more than the available quantity, return false
        return false;
      }
    }

    // If all ordered quantities are less than or equal to the available quantities, return true
    return true;
  }

  async calculateTotalAmount(items: OrderItemDto[]): Promise<number> {
    let totalAmount = 0;

    for (const item of items) {
      const product = await this.productsService.findOne(item._id);
      totalAmount += product.price * item.orderQuantity;
    }

    return totalAmount;
  }

  async decreaceQuantity(items: OrderItemDto[]) {
    for (const item of items) {
      const product = await this.productsService.findOne(item._id);
      product.quantity -= item.orderQuantity;
      await product.save();
    }
  }
}
