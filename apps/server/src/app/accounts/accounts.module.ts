import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Accounts, AccountsSchema } from './entities/accounts.entity';

@Module({
  controllers: [AccountsController],
  imports: [
    MongooseModule.forFeature([{ name: Accounts.name, schema: AccountsSchema }]),
  ],
  providers: [AccountsService]
})
export class AccountsModule {}
