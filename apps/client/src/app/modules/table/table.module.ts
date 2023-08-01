import { NgModule } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { TableComponent } from './components/table/table.component';

import { DynamicCellComponentDirective } from './directives/dynamic-cell-component/dynamic-cell-component.directive';
import { FlashRowStyleBTCTrackingDirective } from './directives/flash-row-style-btc-tracking/flash-row-style-btc-tracking.directive';

@NgModule({
  declarations: [
    DynamicCellComponentDirective,
    TableComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    TitleCasePipe
  ],
  providers: [],
  exports: [TableComponent],
})
export class TableModule {}
