import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { DELAY_BACKGROUND_COLOR_CHANGE } from '@fortris-cc/constants';
import { Account, USDBTCPrice } from 'libs/types/src/lib/types';

interface TemplateRefTable {
  element: { [key: string]: unknown };
  col: string;
}

@Component({
  selector: 'fortris-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> implements OnChanges {
  @ViewChild('defaultTemplate') defaultTemplate:
    | TemplateRef<TemplateRefTable>
    | undefined;
  @ViewChild('dateTemplate') dateTemplate:
    | TemplateRef<TemplateRefTable>
    | undefined;
  @ViewChild('btcUSDCurrencyFormatTemplate') btcUSDCurrencyFormatTemplate:
    | TemplateRef<TemplateRefTable>
    | undefined;

  templateMap: { [col: string]: TemplateRef<TemplateRefTable> } = {};

  @Input() columns: string[] = [];
  @Input() dataSource: T[] = [];
  @Input() displayedColumns: { [key: string]: string } = {};
  @Input() enablePointerCssClass = false;
  @Input() btcUsdFormatColums: string[] = [];
  @Input() USDBTCPrice: USDBTCPrice | null = null;

  @Output() rowClickedCb = new EventEmitter<MouseEvent>();

  rowBackgroundPriceStyleIncrease: boolean | null = null;
  sortedData: T[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    const {
      dataSource: { currentValue: currDataSource } = { currentValue: null },
      USDBTCPrice: {
        currentValue: currUSDBTCPrice,
        previousValue: prevUSDBTCPrice,
      } = { currentValue: null, previousValue: null },
    } = changes;
    if (
      currUSDBTCPrice &&
      prevUSDBTCPrice &&
      currUSDBTCPrice.rate_float !== prevUSDBTCPrice.rate_float
    ) {
      this.rowBackgroundPriceStyleIncrease =
        (currUSDBTCPrice.rate_float || 0) > (prevUSDBTCPrice.rate_float || 0);
      setTimeout(() => {
        this.rowBackgroundPriceStyleIncrease = null;
      }, DELAY_BACKGROUND_COLOR_CHANGE);
    }

    if (currDataSource) {
      this.sortedData = currDataSource.slice();
    }
    // Manually trigger change detection after resetting the property to avoid the ExpressionChangedAfterItHasBeenCheckedError
    this.cdr.detectChanges();
  }

  getTemplate(
    col: string,
    element: { [key: string]: unknown }
  ): TemplateRef<TemplateRefTable> {
    if (
      typeof element[col] === 'string' &&
      this.isDateFormat(element[col] as string)
    ) {
      return this.dateTemplate as TemplateRef<TemplateRefTable>;
    } else if (this.btcUsdFormatColums.includes(col)) {
      return this.btcUSDCurrencyFormatTemplate as TemplateRef<TemplateRefTable>;
    }
    return this.defaultTemplate as TemplateRef<TemplateRefTable>;
  }

  isDateFormat(str: string) {
    // Regular expression to match the date format (YYYY-MM-DDTHH:mm:ss.sssZ)
    var regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

    // Test if the string matches the regular expression
    return regex.test(str);
  }

  rowClicked(event: MouseEvent) {
    this.rowClickedCb.emit(event);
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
