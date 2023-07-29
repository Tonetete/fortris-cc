import { Component, Input } from '@angular/core';

@Component({
  selector: 'fortris-date-template',
  template: `<div>{{ element | date : 'dd/MM/yyyy HH:mm:ss' }}</div>`,
  styleUrls: ['./date-template.component.css'],
})
export class DateTemplateComponent {
  @Input() element: string | number = '';
}
