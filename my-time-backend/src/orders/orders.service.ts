import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto, OrderItemDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    private readonly productsService: ProductsService,
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
    });
    console.log('order', order);

    await order.save();
    return {
      message: 'Order created successfully',
      success: true,
    };
  }

  findAll() {
    return `This action returns all orders`;
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
}
