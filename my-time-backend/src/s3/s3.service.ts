import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandOutput,
  PutObjectCommandInput,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private region: string;

  // accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
  // secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),

  constructor(private configService: ConfigService) {
    this.region = 'us-east-1';
    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: 'AKIATGEB5CLTRH74NQIP',
        secretAccessKey: '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',
      },
    });
  }

  async uploadFile(file: Express.Multer.File, key: string) {
    const bucket = this.configService.get<string>('S3_BUCKET');
    const params: PutObjectCommandInput = {
      Bucket: bucket,
      Key: key,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
    };

    try {
      const response = await this.s3Client.send(new PutObjectCommand(params));
      if (response.$metadata.httpStatusCode == 200) {
        return `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`;
      }
      throw new Error('Error uploading file');
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
