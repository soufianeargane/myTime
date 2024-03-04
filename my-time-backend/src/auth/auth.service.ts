import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { EmailService } from 'src/email/email.service';
import { CreatedUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly emailService: EmailService,
  ) {}

  async create(userDto: CreatedUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userDto.password, salt);
    const data = {
      ...userDto,
      password: hashPassword,
    };

    const createdUser = new this.userModel(data);
    await createdUser.save();
    const verificationToken = await this.generateToken(createdUser);
    const mailOptions = {
      from: 'your-email@example.com',
      to: createdUser.email,
      subject: 'Verify Your Account',
      text: `Click the following link to verify your account:
             <a href="http://localhost:5000/verify?token=${verificationToken}">Verify</a>
      `,
    };
    await this.emailService.sendEmail(mailOptions);
    return createdUser;
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async generateToken(user: any) {
    const token = jwt.sign({ user }, process.env.SECRET_KEY, {
      // expire in 24 hours
      expiresIn: '24h',
    });
    return token;
  }

  async verifyUser(token: string) {
    try {
      const decoded: any = jwt.verify(token, process.env.SECRET_KEY);
      const user = await this.userModel.findById(decoded.user._id);
      user.isVerified = true;
      await user.save();
      return true;
    } catch (e) {
      return false;
    }
  }

  async login(userDto: LoginUserDto) {
    const user = await this.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    if (!user.isVerified) {
      throw new UnauthorizedException('User is not verified');
    }

    const payload = {
      userId: user._id.toString(), // Convert _id to string
      email: user.email,
      role: user.role,
    };

    const token = await this.generateToken(payload);
    return { token, payload };
  }

  async validateToken(token: string) {
    try {
      const decoded: any = jwt.verify(token, process.env.SECRET_KEY);
      return decoded;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async changeRole(userId: string, role: string) {
    const user = await this.userModel.findById(userId);
    user.role = role;
    await user.save();
    return user;
  }
}
