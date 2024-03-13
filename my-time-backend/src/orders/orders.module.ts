import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/orders/entities/order.entity';
import { AuthMiddleware } from 'src/middlewares/authMiddleware';
import { ProductsModule } from 'src/products/products.module';
import { StoresModule } from 'src/stores/stores.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    ProductsModule,
    StoresModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(OrdersController);
  }
}
