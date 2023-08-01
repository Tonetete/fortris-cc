import { Injectable } from '@nestjs/common';
import { CreateAccountsDto } from './dto/create-accounts.dto';
import { UpdateAccountsDto } from './dto/update-accounts.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Accounts, AccountsDocument } from './entities/accounts.entity';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(Accounts.name) private accountsModel: Model<AccountsDocument>) {}

  create(createAccountDto: CreateAccountsDto) {
    return this.accountsModel.create(createAccountDto);
  }

  findAll() {
    return this.accountsModel.find().exec();
  }

  findOne(id: string) {
    const objectId = new ObjectId(id);
    return this.accountsModel.findOne(objectId).exec();
  }

  update(id: string, updateAccountDto: UpdateAccountsDto) {
    updateAccountDto.updated_at = new Date();
    return this.accountsModel.updateOne({_id: id}, updateAccountDto).exec();
  }

  remove(id: string) {
    return this.accountsModel.deleteOne({_id: id}).exec();
  }
}
