import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { extname } from 'path';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from './entities/store.entity';
import { EmailService } from '../email/email.service';
import { AuthService } from '../auth/auth.service';

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

  async findAll() {
    const result = await this.storeModel
      .find({
        status: 'active',
      })
      .populate('owner')
      .exec();
    return result;
  }

  async getAllStores() {
    const result = await this.storeModel.find().populate('owner').exec();
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

  async filterStores(
    name: string,
    distance: number,
    longitude?: string,
    latitude?: string,
  ) {
    let stores = [];
    if (name) {
      stores = await this.storeModel
        .find({ name: { $regex: name, $options: 'i' }, status: 'active' })
        .exec();
    } else {
      stores = await this.storeModel.find().exec();
    }

    if (distance && longitude && latitude) {
      const filteredStores = stores.filter((store) => {
        const storeDistance = this.calculateDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          parseFloat(store.latitude),
          parseFloat(store.longitude),
        );
        return storeDistance <= distance;
      });

      return filteredStores;
    }
    return stores;
  }

  deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // Function to calculate distance between two coordinates using Haversine formula
  calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in kilometers
    return d;
  };

  async getTotalStores() {
    const result = await this.storeModel
      .find({
        status: 'active',
      })
      .exec();
    return result.length;
  }
}
