import { Route } from '@angular/router';

import { AccountResolver } from './account.resolver';

import { AccountComponent } from '../components/account.component';

export const accountRoutes: Route[] = [
  {
    path: 'accounts',
    data: {
      title: 'Accounts',
      breadcrumb: { path: 'accounts', title: 'Accounts' },
    },
    resolve: {
      accounts: AccountResolver,
    },
    component: AccountComponent,
  },
];
