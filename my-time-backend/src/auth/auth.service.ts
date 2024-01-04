import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly emailService: EmailService,
  ) { }

  async create(userDto: any) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userDto.password, salt);
    const data = {
      ...userDto,
      password: hashPassword,
    };

    const createdUser = new this.userModel(data);
    await createdUser.save();
    const verificationToken = await this.generateToken(createdUser);
    await this.emailService.sendVerificationEmail(
      createdUser.email,
      verificationToken,
    );
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async generateToken(user: any) {
    const token = jwt.sign(
      { userId: user.id, userEmail: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: '1h',
      },
    );
    return token;
  }
}
