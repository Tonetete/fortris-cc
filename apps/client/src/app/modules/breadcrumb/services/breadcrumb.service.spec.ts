import { TestBed } from '@angular/core/testing';

import { NavigationEnd, Router } from '@angular/router';
import { ReplaySubject, map } from 'rxjs';
import { BreadcrumbService } from './breadcrumb.service';

const eventSubject = new ReplaySubject<NavigationEnd>();

const routerMock = {
  events: eventSubject.asObservable(),
  config: [
    {
      path: 'home',
      data: {
        breadcrumb: {
          path: 'home',
          title: 'Home',
        },
      },
    },
    {
      path: 'accounts',
      data: {
        breadcrumb: {
          path: 'accounts',
          title: 'Accounts',
        },
      },
    },
    {
      path: 'account-detail',
      data: {
        breadcrumb: {
          path: 'account-detail',
          title: 'Account Detail',
        },
      },
    },
  ],
};

describe('BreadcrumbService', () => {
  let service: BreadcrumbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerMock }],
    });
    service = TestBed.inject(BreadcrumbService);
  });

  describe('WHEN buildBreacrumPathBasedInRouter', () => {
    it('THEN breadcrumb path SHOULD be pass to subject', () => {
      jest.spyOn(service['_breadcrumbPathSubject'], 'next');
      const breadcrumbPath = [{ path: 'accounts', alias: 'Accounts' }];
      const router = TestBed.inject(Router);
      eventSubject.next(new NavigationEnd(1, '/accounts', '/accounts'));

      service.buildBreacrumPathBasedInRouter(router);
      expect(service['_breadcrumbPathSubject'].next).toHaveBeenCalledWith(
        breadcrumbPath
      );
    });
    it('THEN if url and urlAfterRedirects are different SHOULD build according to urlAfterRedirects', () => {
      jest.spyOn(service['_breadcrumbPathSubject'], 'next');
      const breadcrumbPath = [{ path: 'home', alias: 'Home' }];
      const router = TestBed.inject(Router);
      eventSubject.next(new NavigationEnd(1, '/', '/home'));

      service.buildBreacrumPathBasedInRouter(router);
      expect(service['_breadcrumbPathSubject'].next).toHaveBeenCalledWith(
        breadcrumbPath
      );
    });
  });

  describe('WHEN subscribe to observable from subject', () => {
    it('THEN last emmited value SHOULD be retrieved', (done) => {
      const breadcrumbPath = [{ path: 'accounts', alias: 'Accounts' }];
      service.breadcrumbPathBehaviourSubject$.subscribe((path) => {
        expect(path).toEqual(breadcrumbPath);
        done();
      });
      service['_breadcrumbPathSubject'].next(breadcrumbPath);
    });
  });
});
