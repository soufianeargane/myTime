import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(userDto: any) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userDto.password, salt);
    const data = {
      ...userDto,
      password: hashPassword,
    };

    const createdUser = new this.userModel(data);
    return await createdUser.save();
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }
}
