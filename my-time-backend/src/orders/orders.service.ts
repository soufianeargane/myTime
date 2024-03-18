import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto, OrderItemDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { ProductsService } from '../products/products.service';
import { StoresService } from '../stores/stores.service';

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

  async findOne(id: string) {
    try {
      return await this.orderModel.findOne({ _id: id }).exec();
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, status: string) {
    const order = await this.orderModel.findOne({
      _id: id,
    });

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    order.status = status;
    await order.save();
    return {
      message: 'Order updated successfully',
      success: true,
    };
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

  async getStats(user: any) {
    const store = await this.storeService.getStoreByOwner(user, 'active');
    const acceptedOrders = await this.orderModel.countDocuments({
      store: store.data._id,
      status: 'accepted',
    });

    const totalProfit = await this.orderModel.aggregate([
      {
        $match: {
          store: store.data._id,
          status: 'accepted',
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: '$totalAmount',
          },
        },
      },
    ]);

    const totalProducts = await this.productsService.getTotalProducts(
      store.data._id,
    );

    const avaregeProfit = (totalProfit[0].total / acceptedOrders).toFixed(2);

    const currentYear = new Date().getFullYear();

    // Group orders by month and calculate total profit for each month in the current year
    const monthlyProfits = await this.orderModel.aggregate([
      {
        $match: {
          store: store.data._id,
          status: 'accepted',
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          total: { $sum: '$totalAmount' },
        },
      },
    ]);

    const currentMonth = new Date().getMonth() + 1; // Get current month (0-indexed)
    const monthlyProfitMap = {};

    // Initialize monthlyProfitMap with default values for months up to the current month
    for (let month = 1; month <= currentMonth; month++) {
      monthlyProfitMap[month] = 0;
    }

    // Iterate through monthlyProfits and update monthlyProfitMap
    monthlyProfits.forEach((monthlyProfit) => {
      const month = monthlyProfit._id;
      monthlyProfitMap[month] = monthlyProfit.total;
    });

    const bestProducts = await this.best3SellingProducts(user);

    const obj = {
      cardsData: {
        acceptedOrders,
        totalProfit: totalProfit[0].total,
        totalProducts,
        avaregeProfit,
      },
      monthlyProfitMap: monthlyProfitMap,
      bestProducts,
    };

    return obj;
  }

  async best3SellingProducts(user: any) {
    const store = await this.storeService.getStoreByOwner(user, 'active');

    const bestProducts = await this.orderModel.aggregate([
      {
        $match: {
          store: store.data._id,
          status: 'accepted',
        },
      },
      {
        $unwind: '$products', // Split the products array into separate documents
      },
      {
        $group: {
          _id: '$products._id',
          totalQuantitySold: { $sum: '$products.orderQuantity' },
        },
      },
      {
        $lookup: {
          from: 'products', // The name of the products collection
          localField: '_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $addFields: {
          product: { $arrayElemAt: ['$product', 0] }, // Convert the product array to a single object
        },
      },
      {
        $sort: { totalQuantitySold: -1 }, // Sort products by total quantity sold in descending order
      },
      {
        $limit: 3, // Limit the results to the top 3 selling products
      },
      {
        $project: {
          _id: 0, // Exclude the MongoDB _id field from the result
          productId: '$product._id',
          productName: '$product.name',
          productImage: '$product.image',
          totalQuantitySold: 1,
        },
      },
    ]);

    return bestProducts;
  }
}
