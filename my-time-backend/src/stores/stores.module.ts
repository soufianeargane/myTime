import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { AuthMiddleware } from '../middlewares/authMiddleware';

@Module({
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(StoresController);
  }
}
