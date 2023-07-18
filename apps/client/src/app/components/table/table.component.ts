import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';

interface TemplateRefTable {
  element: { [key: string]: unknown };
  col: string;
}

@Component({
  selector: 'fortris-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> {
  @ViewChild('defaultTemplate') defaultTemplate:
    | TemplateRef<TemplateRefTable>
    | undefined;
  @ViewChild('dateTemplate') dateTemplate:
    | TemplateRef<TemplateRefTable>
    | undefined;

  @Input() columns: string[] = [];
  @Input() dataSource: T[] = [];
  @Input() displayedColumns: { [key: string]: string } = {};

  @Output() rowClickedCb = new EventEmitter<MouseEvent>();

  constructor() {}

  getTemplate(col: string, element: { [key: string]: unknown }): TemplateRef<TemplateRefTable> {
    if (typeof element[col] === 'string' && this.isDateFormat(element[col] as string)) {
      return this.dateTemplate as TemplateRef<TemplateRefTable>;
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
