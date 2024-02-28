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
// import { log } from 'console';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createdUserDto: CreatedUserDto) {
    console.log(createdUserDto);
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

    // Set the token as an HTTP-only cookie
    res.cookie('token', token, { httpOnly: true });

    return result;
  }

  @Get('validate')
  async validateToken(@Req() req: Request) {
    console.log(req.cookies);
    return true;
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
}
