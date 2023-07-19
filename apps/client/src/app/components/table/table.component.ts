import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { USDBTCPrice } from 'libs/types/src/lib/types';

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

  @Input() columns: string[] = [];
  @Input() dataSource: T[] = [];
  @Input() displayedColumns: { [key: string]: string } = {};
  @Input() enablePointerCssClass = false;
  @Input() btcUsdFormatColums: string[] = [];
  @Input() USDBTCPrice: USDBTCPrice | null = null;

  @Output() rowClickedCb = new EventEmitter<MouseEvent>();

  rowBackgroundPriceStyleIncrease: boolean | null = null;

  FREQUENCY_REFRESH_USD_BTC_PRICE = 30000;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    const {
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
      }, this.FREQUENCY_REFRESH_USD_BTC_PRICE);
    }
  }

  getTemplate(col: string, element: { [key: string]: unknown }): TemplateRef<TemplateRefTable> {
    if ((typeof element[col] === 'string' && this.isDateFormat(element[col] as string))) {
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
}
