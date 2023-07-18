import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionsDocument = Transactions & Document;

@Schema({
  validateBeforeSave: true,
})
export class Transactions {
  @Prop({
    required: true,
    message: 'Account id is required',
  })
  account_id: string;

  @Prop({
    required: true,
    unique: true,
    message: 'Order id is required',
  })
  order_id: string;

  @Prop({
    required: true,
    unique: true,
    message: 'Order code is required',
  })
  order_code: string;

  @Prop({
    required: true,
    message: 'Transaction type is required',
  })
  transaction_type: string;

  @Prop()
  debit: string;

  @Prop({
    required: true,
    message: 'Credit is required',
  })
  credit: number;

  @Prop({
    required: true,
    message: 'Balance is required',
  })
  balance: number;

  @Prop({
    required: true,
    default: Date.now,
  })
  created_at: Date;
}

export const TransactionsSchema = SchemaFactory.createForClass(Transactions);