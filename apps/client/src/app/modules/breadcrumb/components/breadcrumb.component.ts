import { Component } from '@angular/core';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { BreadcrumbPath } from '@fortris-cc/types';

@Component({
  selector: 'fortris-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  breadcrumbItems: BreadcrumbPath = [];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.breadcrumbPathBehaviourSubject$.subscribe(
      (breadcrumbPath) => {
        this.breadcrumbItems = breadcrumbPath;
      }
    );
  }
}
