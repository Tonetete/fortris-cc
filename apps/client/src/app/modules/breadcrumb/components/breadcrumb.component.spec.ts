import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { Observable, ReplaySubject, pipe, startWith } from 'rxjs';
import { BreadcrumbPath } from '@fortris-cc/types';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const breadcrumbPath = [
  { path: '', alias: 'Home' },
  { path: 'accounts', alias: 'Accounts' },
  { path: 'account-detail', alias: 'Details' },
]

class BreadcrumbServiceMock {
  breadcrumbPathBehaviourSubject$ = new Observable<BreadcrumbPath[]>().pipe(
    startWith(breadcrumbPath)
  );
  setBreadcrumbPath() {}
}

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: BreadcrumbService, useClass: BreadcrumbServiceMock },
      ],
    });
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('WHEN on init', () => {
    it('THEN breadcrumb path SHOULD be set', () => {
      expect(component).toBeTruthy();
      expect(component.breadcrumbItems).toBe(breadcrumbPath);
    });
  });
});
