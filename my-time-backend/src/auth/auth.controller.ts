import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatedUserDto } from './dto/create-user.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createdUserDto: CreatedUserDto) {
    console.log('userDto', createdUserDto);
    return true;

    return await this.authService.create(createdUserDto);
  }
}
