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
    const storeId = store.data._id;

    const [
      acceptedOrders,
      totalProfit,
      totalProducts,
      monthlyProfits,
      bestProducts,
    ] = await Promise.all([
      this.orderModel.countDocuments({ store: storeId, status: 'accepted' }),
      this.orderModel.aggregate([
        {
          $match: { store: storeId, status: 'accepted' },
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$totalAmount' },
          },
        },
      ]),
      this.productsService.getTotalProducts(storeId),
      this.orderModel.aggregate([
        {
          $match: {
            store: storeId,
            status: 'accepted',
            createdAt: {
              $gte: new Date(new Date().getFullYear(), 0, 1),
              $lt: new Date(new Date().getFullYear() + 1, 0, 1),
            },
          },
        },
        {
          $group: {
            _id: { $month: '$createdAt' },
            total: { $sum: '$totalAmount' },
          },
        },
      ]),
      this.best3SellingProducts(user),
    ]);

    const totalProfitValue = totalProfit.length > 0 ? totalProfit[0].total : 0;

    const currentMonth = new Date().getMonth() + 1;
    const monthlyProfitMap = Object.fromEntries(
      Array.from({ length: currentMonth }, (_, i) => [i + 1, 0]),
    );
    monthlyProfits.forEach((monthlyProfit) => {
      monthlyProfitMap[monthlyProfit._id] = monthlyProfit.total;
    });

    return {
      cardsData: {
        acceptedOrders,
        totalProfit: totalProfitValue,
        totalProducts,
        avaregeProfit: (totalProfitValue / acceptedOrders).toFixed(2) || 0,
      },
      monthlyProfitMap,
      bestProducts,
    };
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

  async getAdminStats() {
    const totalOrders = await this.orderModel.countDocuments();
    const totalStores = await this.storeService.getTotalStores();
    const totalProfit = await this.orderModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' },
        },
      },
    ]);

    const acceptedOrdersMonthlyMap =
      await this.monthlyOrdersByStatus('accepted');
    const rejectedOrdersMonthlyMap =
      await this.monthlyOrdersByStatus('rejected');
    const pendingOrdersMonthlyMap = await this.monthlyOrdersByStatus('pending');

    return {
      cardsData: {
        totalOrders,
        totalStores,
        totalProfit: totalProfit.length > 0 ? totalProfit[0].total : 0,
      },
      monthlyOrdersMap: {
        accepted: acceptedOrdersMonthlyMap,
        rejected: rejectedOrdersMonthlyMap,
        pending: pendingOrdersMonthlyMap,
      },
      best3SellingStores: await this.best3sellingStores(),
    };
  }

  async monthlyOrdersByStatus(status: string) {
    const currentMonth = new Date().getMonth() + 1;
    const monthlyOrders = await this.orderModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().getFullYear(), 0, 1),
            $lt: new Date(new Date().getFullYear() + 1, 0, 1),
          },
          status: status,
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          total: { $sum: 1 },
        },
      },
    ]);

    const monthlyOrdersMap = Object.fromEntries(
      Array.from({ length: currentMonth }, (_, i) => [i + 1, 0]),
    );
    monthlyOrders.forEach((monthlyOrder) => {
      monthlyOrdersMap[monthlyOrder._id] = monthlyOrder.total;
    });

    return monthlyOrdersMap;
  }

  async best3sellingStores() {
    // I want to get the top 3 stores with the highest total amount of orders
    const stores = await this.orderModel.aggregate([
      {
        $group: {
          _id: '$store',
          totalAmount: { $sum: '$totalAmount' },
        },
      },
      {
        $lookup: {
          from: 'stores',
          localField: '_id',
          foreignField: '_id',
          as: 'store',
        },
      },
      {
        $addFields: {
          store: { $arrayElemAt: ['$store', 0] },
        },
      },
      {
        $sort: { totalAmount: -1 },
      },
      {
        $limit: 3,
      },
      {
        $project: {
          _id: 0,
          storeId: '$store._id',
          storeName: '$store.name',
          storeImage: '$store.image',
          totalAmount: 1,
        },
      },
    ]);

    return stores;
  }

  async getClientOrders(user: any) {
    const orders = await this.orderModel
      .find({ client: user.userId })
      .populate('store')
      .sort({ createdAt: -1 })
      .exec();

    return orders;
  }
}
