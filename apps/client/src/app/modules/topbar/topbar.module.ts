import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { SharedModule } from '../shared/shared.module';

import { TrackerService } from '../../services/tracker.service';

import { TopbarComponent } from './components/topbar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TopbarComponent],
  imports: [
    CommonModule,
    BreadcrumbModule,
    MatIconModule,
    RouterModule,
    SharedModule,
  ],
  providers: [TrackerService],
  exports: [TopbarComponent],
})
export class TopBarModule {}
