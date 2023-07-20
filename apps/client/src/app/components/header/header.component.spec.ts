import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
  convertToParamMap,
} from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

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
        }
      }
    }
  }
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
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('WHEN on init', () => {
    it('THEN title SHOULD be set', () => {
      eventSubject.next(new NavigationEnd(1, '/accounts', '/accounts'));

      expect(component.title).toBe(title);
    });
  });
});
