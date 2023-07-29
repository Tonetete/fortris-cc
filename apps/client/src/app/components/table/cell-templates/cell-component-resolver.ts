import { ViewContainerRef } from '@angular/core';
import { BtcUsdCellTemplateComponent } from '../cell-templates/btc-usd-cell-template/btc-usd-cell-template.component';
import { DefaultCellTemplateComponent } from '../cell-templates/default-cell-template/default-cell-template.component';
// import { DateTemplateComponent } from './date-template.component';

export const buildCellComponentType = (
  viewContainerRef: ViewContainerRef,
  dataset: { element: string | number },
  templateName?: string
): any => {
  let component:
    | typeof DefaultCellTemplateComponent
    | typeof BtcUsdCellTemplateComponent
    | undefined = DefaultCellTemplateComponent;

  switch (templateName) {
    case 'btcUsdTemplate':
      component = BtcUsdCellTemplateComponent;
      break;
    // case 'dateTemplate':
    //   return DateTemplateComponent;
    default:
      component = DefaultCellTemplateComponent;

      const cellComponentRef = viewContainerRef.createComponent(component);
      (cellComponentRef.instance as unknown as any).element = dataset.element;
  }
};
