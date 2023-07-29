import { ActivatedRouteSnapshot, Route, RouterStateSnapshot } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { NotFoundComponent } from './components/not-found-component/not-found.component';
import { AccountService } from './services/account.service';
import { AccountResolver } from './services/account.resolver';

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
    data: {
      title: 'Accounts',
      breadcrumb: { path: 'accounts', title: 'Accounts' },
    },
    resolve: {
      accounts: AccountResolver,
    }
  },
  {
    path: 'accounts/account-detail/:id',
    component: AccountDetailComponent,
    data: {
      title: 'Account Detail',
      breadcrumb: { path: 'account-detail', title: 'Details' },
    },
  },
];
