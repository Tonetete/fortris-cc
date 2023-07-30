import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCellTemplateComponent } from './default-cell-template.component';

describe('DefaultCellTemplateComponent', () => {
  let component: DefaultCellTemplateComponent;
  let fixture: ComponentFixture<DefaultCellTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultCellTemplateComponent]
    });
    fixture = TestBed.createComponent(DefaultCellTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
