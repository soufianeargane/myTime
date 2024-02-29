import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { User } from 'src/decorators/userDecorator';
import { RoleGuard } from 'src/guard/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('stores')
@UseGuards(new RoleGuard('client'))
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createStoreDto: CreateStoreDto,
    @User() user: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(createStoreDto);
    console.log(file);

    await this.storesService.create(createStoreDto, user, file);
    return {
      message: 'Store created successfully',
      success: true,
    };
  }

  @Post('createImage')
  @UseInterceptors(FileInterceptor('file'))
  async createImage(
    // @Body() createStoreDto: CreateStoreDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    return await this.storesService.createImage(file);
  }

  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.remove(+id);
  }
}
