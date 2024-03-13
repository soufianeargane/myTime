import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AuthMiddleware } from 'src/middlewares/authMiddleware';
import { StoresModule } from 'src/stores/stores.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './entities/product.entity';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    StoresModule,
    CloudinaryModule,
    CategoriesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ProductsController);
  }
}
