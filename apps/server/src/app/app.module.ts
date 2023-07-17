import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsController } from './accounts/accounts.controller';

import * as settings from '../../settings.json';

@Module({
  imports: [
    MongooseModule.forRoot(settings['DATABASE_URI']),
  ],
  controllers: [AppController, AccountsController],
  providers: [AppService],
})
export class AppModule {}
