import { CommonModule, TitleCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TableModule } from '../table/table.module';
import { SharedModule } from '../shared/shared.module';

import { accountDetailRoutes } from './routes/account-detail.routes';

import { AccountService } from '../../services/account.service';
import { TrackerService } from '../../services/tracker.service';

import { AccountDetailComponent } from './components/account-detail.component';

@NgModule({
  declarations: [AccountDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(accountDetailRoutes),
    SharedModule,
    TableModule,
    TitleCasePipe,
  ],
  providers: [AccountService, TrackerService],
})
export class AccountDetailModule {}
