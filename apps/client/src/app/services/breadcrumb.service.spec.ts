import { TestBed } from '@angular/core/testing';

import { BreadcrumbService } from './breadcrumb.service';
import { Router } from '@angular/router';

const routerMock = {
  config: [
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


  describe('WHEN setBreadcrumbPath', () => {
    it('THEN breadcrumb path SHOULD be pass to subject', () => {
      jest.spyOn(service['_breadcrumbPathSubject'], 'next');
      const breadcrumbPath = [
        { path: 'accounts', alias: 'Accounts' },
        { path: 'account-detail', alias: 'Account Detail' },
      ];
      const url = '/accounts/account-detail';
      const router = TestBed.inject(Router);
      
      service.setBreadcrumbPath(url, router);

      expect(service['_breadcrumbPathSubject'].next).toHaveBeenCalledWith(breadcrumbPath);
    });
  });
});
