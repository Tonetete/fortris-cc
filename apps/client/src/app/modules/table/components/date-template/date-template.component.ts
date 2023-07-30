import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'fortris-date-template',
  template: `<div>{{ element | date : 'dd/MM/yyyy HH:mm:ss' }}</div>`,
  styleUrls: ['./date-template.component.css'],
  imports: [DatePipe],
  standalone: true,
})
export class DateTemplateComponent {
  @Input() element: string | number = '';
}
