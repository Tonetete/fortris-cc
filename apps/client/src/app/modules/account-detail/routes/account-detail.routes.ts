import { Route } from '@angular/router';

import { AccountDetailResolver } from './account-detail.resolver';

import { AccountDetailComponent } from '../components/account-detail.component';

export const accountDetailRoutes: Route[] = [
  {
    path: 'accounts/account-detail/:id',
    data: {
      title: 'Account Detail',
      breadcrumb: { path: 'account-detail', title: 'Details' },
    },
    resolve: {
      transactions: AccountDetailResolver,
    },
    component: AccountDetailComponent,
  },
];
