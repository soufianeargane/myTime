import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongoModule } from './mongo/mongo.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EmailModule } from './email/email.module';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [AuthModule, MongoModule, EmailModule, StoresModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
