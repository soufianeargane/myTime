import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/auth/user.schema';
import { Product } from 'src/products/entities/product.entity';
import { Store } from 'src/stores/entities/store.entity';

@Schema()
export class Order extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  client: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Store' })
  store: Store;

  @Prop([
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      orderQuantity: Number,
    },
  ])
  products: { productId: Product; orderQuantity: number }[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: null })
  deletedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
