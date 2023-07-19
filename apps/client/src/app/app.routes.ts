import { Route } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { NotFoundComponent } from './components/not-found-component/not-found.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '/accounts',
    pathMatch: 'full',
    data: { title: 'Home', breadcrumb: { path: '' } },
  },
  {
    path: 'accounts',
    component: AccountComponent,
    data: { title: 'Accounts', breadcrumb: { path: 'accounts' } },
  },
  {
    path: 'accounts/account-detail/:id',
    component: AccountDetailComponent,
    data: { title: 'Account Details', breadcrumb: { path: 'account-detail' } },
  },
];
