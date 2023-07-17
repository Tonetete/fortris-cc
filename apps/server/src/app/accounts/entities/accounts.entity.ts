import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountsDocument = Accounts & Document;

@Schema({
  validateBeforeSave: true,
})
export class Accounts {
  @Prop({
    required: true,
    message: 'Account name is required',
  })
  account_name: string;

  @Prop()
  tag: string;

  @Prop()
  category: string;

  @Prop({
    default: 0.0,
  })
  balance: number;

  @Prop({
    default: 0.0,
  })
  available_balance: number;

  @Prop({
    default: Date.now,
  })
  created_at: Date;

  @Prop({
    default: Date.now,
  })
  updated_at: Date;

}

export const AccountsSchema = SchemaFactory.createForClass(Accounts);