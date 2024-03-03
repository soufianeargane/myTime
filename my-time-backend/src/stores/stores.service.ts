import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { extname } from 'path';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from './entities/store.entity';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class StoresService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectModel('Store') private readonly storeModel: Model<Store>,
    private readonly emailService: EmailService,
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
    const mailOptions = {
      from: 'your-email@example.com',
      to: 'anovicsoso@gmail.com',
      subject: 'new request to open a store',
      text: `A new request to open a store has been made by ${user.email}`,
    };
    await this.emailService.sendEmail(mailOptions);
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
    // get all stores from the database
    const result = this.storeModel.find().exec();
    return result;
  }

  getOne(id: number) {
    return `This action retu`;
  }

  async getStoreByOwner(user: any) {
    const result = await this.storeModel
      .findOne({ owner: user.userId, status: { $nin: ['active', 'blocked'] } })
      .sort({ createdAt: -1 })
      .exec();
    if (result) {
      return {
        success: true,
        message: 'Store found',
        data: result,
      };
    }
    return {
      success: false,
      message: 'Store not found',
    };
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
