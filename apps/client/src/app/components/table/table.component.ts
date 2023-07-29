import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ColumnTemplate } from '@fortris-cc/types';

@Component({
  selector: 'fortris-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> implements OnChanges, OnInit {
  @Input() columns: ColumnTemplate<T>[] = [];
  @Input() dataSource: T[] = [];
  @Input() displayedColumns: { [key: string]: string } = {};
  @Input() enablePointerCssClass = false;
  @Input() btcUsdFormatColums: string[] = [];

  @Output() rowClickedCb = new EventEmitter<{
    event: MouseEvent;
    element: T;
  }>();

  columnsName: string[] = [];
  rowBackgroundPriceStyleIncrease: boolean | null = null;
  sortedData: T[] = [];

  ngOnInit() {
    this.columnsName = this.columns.map((col) => col.name);
  }

  ngOnChanges(changes: SimpleChanges) {
    const {
      dataSource: { currentValue: currDataSource } = { currentValue: null },
    } = changes;

    if (currDataSource) {
      this.sortedData = currDataSource.slice();
    }
  }

  rowClicked(event: MouseEvent, element: T) {
    this.rowClickedCb.emit({ event, element });
  }

  sortData(sort: Sort) {
    const data = this.dataSource.slice();
    const sort2 = sort as unknown as Sort;

    const isAsc = sort2.direction === 'asc';
    const index = sort2.active as string;

    this.sortedData = data.sort((a, b) =>
      this.compare((a as any)[index], (b as any)[index], isAsc)
    );
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngOnDestroy() {}
}
