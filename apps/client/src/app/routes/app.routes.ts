import { Route } from '@angular/router';
import { AccountResolver } from '../modules/account/routes/account.resolver';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '/accounts',
    pathMatch: 'full',
    data: { title: 'Home', breadcrumb: { path: '', title: 'Home' } },
  },
  {
    path: 'accounts',
    data: {
      title: 'Accounts',
      breadcrumb: { path: 'accounts', title: 'Accounts' },
    },
    resolve: {
      accounts: AccountResolver,
    },
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'accounts/account-detail/:id',
    data: {
      title: 'Account Detail',
      breadcrumb: { path: 'account-detail', title: 'Details' },
    },
    loadChildren: () =>
      import('../modules/account-detail/account-detail.module').then(
        (m) => m.AccountDetailModule
      ),
  },
];
