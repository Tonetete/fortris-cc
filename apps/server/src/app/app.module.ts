import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';

import * as settings from '../../settings.json';

@Module({
  imports: [
    AccountsModule,
    MongooseModule.forRoot(settings['DATABASE_URI']),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
