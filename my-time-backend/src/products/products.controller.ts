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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RoleGuard } from 'src/guard/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/decorators/userDecorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(new RoleGuard('owner'))
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
    @User() user: any,
  ) {
    return this.productsService.create(createProductDto, file, user);
  }

  @UseGuards(new RoleGuard('owner'))
  @Get()
  async findAll(
    @User() user: any,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.productsService.findAll(user, { page, pageSize });
  }

  @Get('store/filter')
  async filterProducts(
    @Query('name') name: string,
    @Query('category') category: string,
    @Query('id') id: string,
    @User() user: any,
  ) {
    return this.productsService.filterProducts({ name, category, id, user });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image')) // Handle file upload
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File, // Uploaded file
    @User() user: any, // Assuming you have a decorator like @User to get authenticated user
  ) {
    return this.productsService.update(id, updateProductDto, file, user); // Pass the file and user to service
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Get('store/:id')
  getProductsByStore(@Param('id') id: string) {
    return this.productsService.getProductsByStore(id);
  }
}
