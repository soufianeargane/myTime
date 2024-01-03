import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userDto: any) {
    const createdUser = new this.userModel(userDto);
    return await createdUser.save();
    // return 'createdUser';
  }
}
