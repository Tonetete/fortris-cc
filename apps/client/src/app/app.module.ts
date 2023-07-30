import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { getBTCTrackerBaseUrl } from './api/urls';

import { appRoutes } from './routes/app.routes';

import { AccountDetailModule } from './modules/account-detail/account-detail.module';
import { AccountModule } from './modules/account/account.module';
import { HeaderModule } from './modules/header/header.module';
import { TopBarModule } from './modules/topbar/topbar.module';

import { AppComponent } from './app.component';

const config: SocketIoConfig = { url: getBTCTrackerBaseUrl(), options: {} };

@NgModule({
  declarations: [AppComponent],
  imports: [
    AccountModule,
    AccountDetailModule,
    BrowserModule,
    BrowserAnimationsModule,
    HeaderModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    SocketIoModule.forRoot(config),
    TopBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
