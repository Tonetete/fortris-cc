import {
  ComponentRef,
  Directive,
  Input,
  Type,
  ViewContainerRef,
} from '@angular/core';
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
  cellComponentRef: ComponentRef<ComponentCellType> | null = null;

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    let component: ComponentCellType = DefaultCellTemplateComponent;

    switch (this.templateName) {
      case 'btcUsdTemplate':
        component =
          BtcUsdCellTemplateComponent as Type<BtcUsdCellTemplateComponent>;
        break;
      case 'dateTemplate':
        component = DateTemplateComponent as Type<DateTemplateComponent>;
        break;
      default:
        component =
          DefaultCellTemplateComponent as Type<DefaultCellTemplateComponent>;
    }

    this.cellComponentRef = this.viewContainerRef.createComponent(
      component
    ) as unknown as ComponentRef<ComponentCellType>;

    (this.cellComponentRef.instance as unknown as any).element = this.element;
  }
}
