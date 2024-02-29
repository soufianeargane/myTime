import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongoModule } from './mongo/mongo.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EmailModule } from './email/email.module';
import { StoresModule } from './stores/stores.module';
import { S3Module } from './s3/s3.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    AuthModule,
    MongoModule,
    EmailModule,
    StoresModule,
    S3Module,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
