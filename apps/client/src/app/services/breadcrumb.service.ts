import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbPath } from '@fortris-cc/types';
import {  ReplaySubject, filter } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private readonly _breadcrumbPathSubject: ReplaySubject<BreadcrumbPath> =
    new ReplaySubject<BreadcrumbPath>(0);
  readonly breadcrumbPathBehaviourSubject$ = this._breadcrumbPathSubject
    .asObservable()
    .pipe(filter((value) => !!value));

  constructor() {}

  setBreadcrumbPath(url: string, router: Router) {
    const breadcrumbPath: BreadcrumbPath = [];
    const paths = url.split('/');
    paths.forEach((p) => {
      const routeConfig = router.config.find((r) => p === r.data?.['breadcrumb']?.['path']);
      if (routeConfig) {
        const alias = routeConfig.data?.['breadcrumb']?.['title'] as string;
        const path = routeConfig.path as string;

        breadcrumbPath.push({ path, alias });
      }
    });
    this._breadcrumbPathSubject.next(breadcrumbPath);
  }
}
