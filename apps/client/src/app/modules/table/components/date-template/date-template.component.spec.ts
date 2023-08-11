import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTemplateComponent } from './date-template.component';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';

const date = '2022-07-10T21:00:30.00Z';

describe('DateTemplateComponent', () => {
  let component: DateTemplateComponent;
  let fixture: ComponentFixture<DateTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { timezone: '+0000' } },
      ],
      imports: [DateTemplateComponent],
    });
    fixture = TestBed.createComponent(DateTemplateComponent);
    component = fixture.componentInstance;
    component.element = date;
    fixture.detectChanges();
  });

  describe('WHEN on init', () => {
    it('THEN date SHOULD be rendered correctly', () => {
      const div = fixture.nativeElement.querySelector('div');
      expect(div.textContent).toBe('10/07/2022 21:00:30');
    });
  });
});
