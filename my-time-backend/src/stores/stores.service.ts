import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { extname } from 'path';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from './entities/store.entity';
import { EmailService } from 'src/email/email.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class StoresService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectModel('Store') private readonly storeModel: Model<Store>,
    private readonly emailService: EmailService,
    private readonly authService: AuthService,
  ) {}

  async create(
    createStoreDto: CreateStoreDto,
    user: any,
    file: Express.Multer.File,
  ) {
    try {
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
    } catch (error) {
      console.log('error', error);
    }
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
    const result = this.storeModel.find().populate('owner').exec();
    return result;
  }

  getOne(id: number) {
    return `This action retu`;
  }

  async getStoreByOwner(user: any, status: string) {
    const result = await this.storeModel
      .findOne({ owner: user.userId, status: status })
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

  async acceptStore(store: any) {
    try {
      const result = await this.storeModel
        .findByIdAndUpdate(store._id, { status: 'active' })
        .exec();
      const user = await this.authService.changeRole(store.owner._id, 'owner');
      const mailOptions = {
        from: 'myTimesupport@mytime.com',
        to: store.owner.email,
        subject: 'Your store has been accepted',
        text: `Your store ${store.name} has been accepted. You can now start selling your products.`,
      };
      await this.emailService.sendEmail(mailOptions);
      return 'accepted';
    } catch (error) {
      console.log(error);
    }
  }

  // search by name
  async searchByName(name: string) {
    const result = await this.storeModel
      .find({ name: { $regex: name, $options: 'i' } })
      .exec();
    return result;
  }
}
