import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';

import { HeaderComponent } from './components/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, BreadcrumbModule, RouterModule],
  providers: [],
  exports: [HeaderComponent],
})
export class HeaderModule {}
