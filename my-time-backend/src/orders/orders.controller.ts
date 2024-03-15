import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { RoleGuard } from 'src/guard/role.guard';
import { User } from 'src/decorators/userDecorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(new RoleGuard('client'))
  @Post()
  create(
    @Body(ValidationPipe) createOrderDto: CreateOrderDto,
    @User() user: any,
  ) {
    return this.ordersService.create(createOrderDto, user);
  }

  @Get()
  findAll(
    @User() user: any,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    // console.log(user);
    return this.ordersService.findAll(user, page, limit);
  }

  @Post('orderDetails')
  getOrderDetails(@Body() body: any) {
    console.log(body);
    return this.ordersService.getOrderDetails(body.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
