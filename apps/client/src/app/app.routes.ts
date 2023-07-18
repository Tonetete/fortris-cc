import { Route } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { NotFoundComponent } from './components/not-found-component/not-found.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '/accounts',
    pathMatch: 'full',
    data: { title: 'Accounts' },
  },
  {
    path: 'accounts',
    component: AccountComponent,
    data: { title: 'Accounts' },
  },
  {
    path: 'account-detail/:id',
    component: AccountDetailComponent,
    data: { title: 'Account Detail' },
  },
  {
    path: '**',
    redirectTo: '/accounts',
    pathMatch: 'full',
    data: { title: 'Accounts' },
  },
];
