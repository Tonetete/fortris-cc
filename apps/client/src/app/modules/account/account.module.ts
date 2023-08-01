import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TableModule } from '../table/table.module';
import { SharedModule } from '../shared/shared.module';

import { accountRoutes } from './routes/account.routes';

import { AccountService } from '../../services/account.service';
import { TrackerService } from '../../services/tracker.service';
import { BreadcrumbService } from '../breadcrumb/services/breadcrumb.service';

import { AccountComponent } from './components/account.component';

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(accountRoutes),
    SharedModule,
    TableModule,
  ],
  providers: [AccountService, BreadcrumbService, TrackerService],
  exports: [AccountComponent],
})
export class AccountModule {}
