import { Route } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { NotFoundComponent } from './components/not-found-component/not-found.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '/accounts',
    pathMatch: 'full',
    data: { title: 'Home', breadcrumb: { path: '', title: 'Home' } },
  },
  {
    path: 'accounts',
    component: AccountComponent,
    data: { title: 'Accounts', breadcrumb: { path: 'accounts', title: 'Accounts' } },
  },
  {
    path: 'accounts/account-detail/:id',
    component: AccountDetailComponent,
    data: { title: 'Account Detail', breadcrumb: { path: 'account-detail', title: 'Details' } },
  },
];
