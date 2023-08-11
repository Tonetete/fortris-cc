import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
  RouterState,
  convertToParamMap,
} from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { BreadcrumbComponent } from '../../breadcrumb/components/breadcrumb.component';

const eventSubject = new ReplaySubject<RouterEvent>();
const title = 'Accounts';
const routerMock = {
  navigate: jest.fn(),
  events: eventSubject.asObservable(),
  url: '/accounts',
  routerState: {
    snapshot: {
      root: {
        data: {
          title,
        },
      },
    },
  },
};

class MockActivatedRoute {
  snapshot = {
    paramMap: convertToParamMap({ id: '1' }),
  };
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, BreadcrumbComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
    });
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
  });

  describe('WHEN on init', () => {
    it('THEN title SHOULD be set', () => {
      eventSubject.next(new NavigationEnd(1, '/accounts', '/accounts'));

      expect(component.title).toBe(title);
    });

    it('THEN if title is not defined in route data SHOULD be set according to route.firstChild', () => {
      const mockRouterState = {
        snapshot: {
          root: {
            data: {},
            firstChild: {
              data: {
                title,
              },
            },
          },
        },
      };
      jest.replaceProperty(router, 'routerState', mockRouterState as any);
      eventSubject.next(new NavigationEnd(1, '/accounts', '/accounts'));
    
      expect(component.title).toBe(title);
    });
   
    it('THEN if title is not defined neither in route data nor firstChild SHOULD return empty', () => {
      const mockRouterState = {
        snapshot: {
          root: {
            data: {},
          },
        },
      };
      jest.replaceProperty(router, 'routerState', mockRouterState as any);
      eventSubject.next(new NavigationEnd(1, '/accounts', '/accounts'));
    
      expect(component.title).toBe('');
    });
  });
});
