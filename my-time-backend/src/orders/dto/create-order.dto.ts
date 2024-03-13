// create-order.dto.ts

import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  orderQuantity: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  storeId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsNotEmpty()
  totalPrice: number;
}
