import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreSchema } from './entities/store.entity';
import { S3Module } from 'src/s3/s3.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { EmailModule } from 'src/email/email.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Store', schema: StoreSchema }]),
    S3Module,
    CloudinaryModule,
    EmailModule,
    AuthModule,
  ],
  controllers: [StoresController],
  providers: [StoresService],
  exports: [StoresService],
})
export class StoresModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(StoresController);
  }
}
