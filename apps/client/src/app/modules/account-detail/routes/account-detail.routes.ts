import { Route } from '@angular/router';

import { AccountResolver } from './account.resolver';
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
      account: AccountResolver,
      transactions: AccountDetailResolver,
    },
    component: AccountDetailComponent,
  },
];
