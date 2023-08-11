import { Component, ComponentRef, Type, ViewContainerRef } from '@angular/core';
import { DynamicCellComponentDirective } from './dynamic-cell-component.directive';
import { DefaultCellTemplateComponent } from '../../components/default-cell-template/default-cell-template.component';
import { BtcUsdCellTemplateComponent } from '../../components/btc-usd-cell-template/btc-usd-cell-template.component';
import { DateTemplateComponent } from '../../components/date-template/date-template.component';

let viewContainerRef: ViewContainerRef;

type ComponentCellType =
  | DefaultCellTemplateComponent
  | BtcUsdCellTemplateComponent
  | DateTemplateComponent;

describe('DynamicCellComponentDirective', () => {
  beforeEach(() => {
    viewContainerRef = {
      createComponent: jest.fn((component: Type<ComponentCellType>) => ({
        instance: {
          element: undefined,
        },
      })),
      clear: jest.fn(),
    } as unknown as ViewContainerRef;
  });

  describe('WHEN create component', () => {
    it('THEN if templateName is btcUsdTemplate SHOULD create component with BtcUsdCellTemplateComponent', () => {
      const directive = new DynamicCellComponentDirective(viewContainerRef);
      directive.templateName = 'btcUsdTemplate';
      directive.element = 10;

      directive.ngOnInit();

      expect(viewContainerRef.createComponent).toHaveBeenCalledWith(BtcUsdCellTemplateComponent);
      expect(
        (
          directive.cellComponentRef as unknown as ComponentRef<ComponentCellType>
        ).instance.element
      ).toBe(10);
    });
    it('THEN if templateName is dateTemplate SHOULD create component with DateTemplateComponent', () => {
      const date  = '2022-07-10T21:00:30.00Z';
      const directive = new DynamicCellComponentDirective(viewContainerRef);
      directive.templateName = 'dateTemplate';
      directive.element = date;

      directive.ngOnInit();

      expect(viewContainerRef.createComponent).toHaveBeenCalledWith(DateTemplateComponent);
      expect(
        (
          directive.cellComponentRef as unknown as ComponentRef<ComponentCellType>
        ).instance.element
      ).toBe(date);
    });
    it('THEN if templateName is empty SHOULD create component with DefaultCellTemplateComponent', () => {
      const directive = new DynamicCellComponentDirective(viewContainerRef);
      directive.element = 'example';

      directive.ngOnInit();

      expect(viewContainerRef.createComponent).toHaveBeenCalledWith(DefaultCellTemplateComponent);
      expect(
        (
          directive.cellComponentRef as unknown as ComponentRef<ComponentCellType>
        ).instance.element
      ).toBe('example');
    });
  });
});
