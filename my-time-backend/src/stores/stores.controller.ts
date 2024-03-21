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
  Query,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { User } from 'src/decorators/userDecorator';
import { RoleGuard } from 'src/guard/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @UseGuards(new RoleGuard('client'))
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

  // @UseGuards(new RoleGuard('admin'))
  @Get()
  findAll(@Query('status') status?: string) {
    if (status) {
      return status;
      // return this.storesService.findAllByStatus(status);
    } else {
      return this.storesService.findAll();
    }
  }

  @Get('filterStores')
  async filterStores(
    @Query('name') name: string,
    @Query('distance') distance: string,
    @Query('longitude') longitude: string, // Use string type here
    @Query('latitude') latitude: string, // Use string type here
  ) {
    console.log(name, distance, longitude, latitude);
    const stores = await this.storesService.filterStores(
      name,
      parseInt(distance),
      longitude,
      latitude,
    );
    return stores;
  }

  // get all for admin
  @Get('getAllStores')
  @UseGuards(new RoleGuard('admin'))
  async getAllStores() {
    return await this.storesService.getAllStores();
  }

  @Get('getStoreByOwner')
  async getStoreByOwner(@User() user: any) {
    return await this.storesService.getStoreByOwner(user, 'pending');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.getOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.remove(+id);
  }

  @Post('acceptStore')
  @UseGuards(new RoleGuard('admin'))
  async acceptStore(@Body() body: any) {
    console.log(body.store);
    return await this.storesService.acceptStore(body.store);
  }

  @Get('search')
  search(@Query('q') q: string) {
    console.log(q);
    return this.storesService.searchByName(q);
  }
}
