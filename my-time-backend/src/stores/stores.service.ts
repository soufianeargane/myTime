import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Express } from 'express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { extname } from 'path';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from './entities/store.entity';

@Injectable()
export class StoresService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectModel('Store') private readonly storeModel: Model<Store>,
  ) {}

  async create(
    createStoreDto: CreateStoreDto,
    user: any,
    file: Express.Multer.File,
  ) {
    console.log(createStoreDto);
    console.log(user);
    console.log(file);
    const url = await this.createImage(file);
    const store = new this.storeModel({
      ...createStoreDto,
      owner: user.userId,
      image: url.toString(),
    });
    await store.save();
  }
  async createImage(file: Express.Multer.File) {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

    const fileExtension = extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException(
        'Invalid file type. Only image files are allowed.',
      );
    }

    const result = await this.cloudinaryService.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
    console.log(result);
    return result.url;
  }

  findAll() {
    return `This action returns all stores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
