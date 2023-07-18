import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transactions, TransactionsDocument } from './entities/transaction.entity';
import { Accounts, AccountsDocument } from '../app/accounts/entities/accounts.entity';
import { Model } from 'mongoose';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transactions.name)
    private transactionsModel: Model<TransactionsDocument>,
    @InjectModel(Accounts.name) 
    private accountsModel: Model<AccountsDocument>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const { account_id } = createTransactionDto;
    const account = await this.accountsModel.findOne({ _id: account_id }).exec();
    
    if (account) {
      try {
        return (await this.transactionsModel.create(createTransactionDto)).save();
      } catch (error) {
          throw new Error(error.message);
      }
    }
    throw new Error('Account ID Not Found');
  }

  findAll() {
    return this.transactionsModel.find().exec();
  }

  findOne(id: string) {
    return this.transactionsModel.findOne({ _id: id }).exec();
  }

  findByAccountId(account_id: string) {
    return this.transactionsModel.find({ account_id }).exec();
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsModel
      .updateOne({ _id: id }, updateTransactionDto)
      .exec();
  }

  remove(id: string) {
    return this.transactionsModel.deleteOne({ _id: id }).exec();
  }
}
