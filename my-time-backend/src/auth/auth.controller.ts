import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatedUserDto } from './dto/create-user.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createdUserDto: CreatedUserDto) {
    const existUser = await this.authService.getUserByEmail(
      createdUserDto.email,
    );
    console.log({ existUser });
    if (existUser) {
      throw new UnauthorizedException('User already exists');
    }
    await this.authService.create(createdUserDto);
    return 'createdUser';
  }
}
