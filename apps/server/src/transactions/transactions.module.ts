import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Accounts, AccountsSchema } from '../app/accounts/entities/accounts.entity';
import { Transactions, TransactionsSchema } from './entities/transaction.entity';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [
    MongooseModule.forFeature([
      { name: Accounts.name, schema: AccountsSchema },
      { name: Transactions.name, schema: TransactionsSchema },
    ]),
  ],
})
export class TransactionsModule {}
