import { Component, Input } from '@angular/core';

@Component({
  selector: 'fortris-default-cell-template',
  template: `<div>
    {{ element }}
  </div>`,
  styleUrls: ['./default-cell-template.component.css'],
  standalone: true,
})
export class DefaultCellTemplateComponent {
  @Input() element: string = '';
}
