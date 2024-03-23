import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Res,
  Get,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreatedUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createdUserDto: CreatedUserDto) {
    console.log('createdUserDto');
    const existUser = await this.authService.getUserByEmail(
      createdUserDto.email,
    );
    if (existUser) {
      throw new UnauthorizedException('User already exists');
    }
    const createdUser = await this.authService.create(createdUserDto);
    return {
      success: true,
      message: 'User created successfully',
    };
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginUserDto);
    const token = result.token;
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });

    return result;
  }

  @Get('validate-token')
  async validateToken(@Req() req: Request) {
    const result = await this.authService.validateToken(req.cookies.token);
    return result;
  }

  @Post('validate-email')
  async validateEmail(@Body('token') token: string) {
    // return token;
    const check = await this.authService.verifyUser(token);
    if (check) {
      return {
        success: true,
        message: 'User verified',
      };
    } else {
      return {
        success: false,
        message: 'Invalid token',
      };
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('token', '', { httpOnly: true, sameSite: 'lax' });
    res.clearCookie('token');
    return {
      success: true,
      message: 'Logged out successfully',
    };
  }
}
