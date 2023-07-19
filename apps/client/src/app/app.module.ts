import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, provideRouter, withDebugTracing } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AccountComponent } from './components/account/account.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { BtcToUsdFormatPipe } from './pipes/btc-to-usd-format.pipe';
import { NotFoundComponent } from './components/not-found-component/not-found.component';
import { AccountService } from './services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { TrackerService } from './services/tracker.service';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { getBTCTrackerBaseUrl } from './api/urls';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { TopbarComponent } from './components/topbar/topbar.component';

const config: SocketIoConfig = { url: getBTCTrackerBaseUrl(), options: {} };

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    AccountDetailComponent,
    BreadcrumbComponent,
    HeaderComponent,
    TableComponent,
    BtcToUsdFormatPipe,
    NotFoundComponent,
    TopbarComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [AccountService, TrackerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
