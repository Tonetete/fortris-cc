import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { getBTCTrackerBaseUrl } from './api/urls';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { AccountComponent } from './components/account/account.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found-component/not-found.component';
import { TableComponent } from './components/table/table.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { BtcToUsdFormatPipe } from './pipes/btc-to-usd-format.pipe';
import { AccountService } from './services/account.service';
import { TrackerService } from './services/tracker.service';
import { BtcUsdCellTemplateComponent } from './components/table/cell-templates/btc-usd-cell-template/btc-usd-cell-template.component';
import { DefaultCellTemplateComponent } from './components/table/cell-templates/default-cell-template/default-cell-template.component';
import { DynamicCellComponentDirective } from './components/table/cell-templates/dynamic-cell-component.directive';
import { DateTemplateComponent } from './components/table/cell-templates/date-template/date-template.component';
import { FlashRowStyleDirective } from './components/table/flash-row-style.directive';

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
    BtcUsdCellTemplateComponent,
    DefaultCellTemplateComponent,
    DynamicCellComponentDirective,
    DateTemplateComponent,
    FlashRowStyleDirective,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    MatSortModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [AccountService, TrackerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
