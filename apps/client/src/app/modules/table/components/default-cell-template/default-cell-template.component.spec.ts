import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCellTemplateComponent } from './default-cell-template.component';

describe('DefaultCellTemplateComponent', () => {
  let component: DefaultCellTemplateComponent;
  let fixture: ComponentFixture<DefaultCellTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DefaultCellTemplateComponent]
    });
    fixture = TestBed.createComponent(DefaultCellTemplateComponent);
    component = fixture.componentInstance;
    component.element = 'content example';
    fixture.detectChanges();
  });

  describe('WHEN on init', () => {
    it('THEN default template SHOULD be rendered correctly', () => {
      const div = fixture.nativeElement.querySelector('div');
      expect(div.textContent).toBe(' content example ');
    });
  });
});
