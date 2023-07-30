import { Directive, Input, Type, ViewContainerRef } from '@angular/core';
import { BtcUsdCellTemplateComponent } from '../../components/btc-usd-cell-template/btc-usd-cell-template.component';
import { DateTemplateComponent } from '../../components/date-template/date-template.component';
import { DefaultCellTemplateComponent } from '../../components/default-cell-template/default-cell-template.component';
import { ColumnCellTemplate } from '@fortris-cc/types';

type ComponentCellType =
  | Type<DefaultCellTemplateComponent>
  | Type<BtcUsdCellTemplateComponent>
  | Type<DateTemplateComponent>;

@Directive({
  selector: '[fortrisDynamicCellComponent]',
})
export class DynamicCellComponentDirective {
  @Input() element: string | number = '';
  @Input() templateName?: ColumnCellTemplate = 'defaultTemplate';

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    let component: ComponentCellType = DefaultCellTemplateComponent;
    let cellComponentRef = null;

    switch (this.templateName) {
      case 'btcUsdTemplate':
        component =
          BtcUsdCellTemplateComponent as Type<BtcUsdCellTemplateComponent>;
        cellComponentRef = this.viewContainerRef.createComponent(component);
        break;
      case 'dateTemplate':
        component = DateTemplateComponent as Type<DateTemplateComponent>;
        cellComponentRef = this.viewContainerRef.createComponent(component);
        break;
      default:
        component =
          DefaultCellTemplateComponent as Type<DefaultCellTemplateComponent>;
        cellComponentRef = this.viewContainerRef.createComponent(component);
    }

    (cellComponentRef.instance as unknown as any).element = this.element;
  }
}
