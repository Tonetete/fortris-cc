import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { BreadcrumbService } from './services/breadcrumb.service';

import { BreadcrumbComponent } from './components/breadcrumb.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  providers: [BreadcrumbService],
  exports: [BreadcrumbComponent],
})
export class BreadcrumbModule {}
