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

  @Get('getStats')
  getStats(@User() user: any) {
    return this.ordersService.getStats(user);
  }

  @UseGuards(new RoleGuard('admin'))
  @Get('getStatsAdmin')
  getStatsAdmin() {
    return this.ordersService.getAdminStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    console.log(body.status);
    console.log(id);
    return this.ordersService.update(id, body.status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
