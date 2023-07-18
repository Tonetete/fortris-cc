import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AccountComponent } from './components/account/account.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { TableComponent } from './components/table/table.component';
import { NotFoundComponent } from './components/not-found-component/not-found.component';
import { AccountService } from './services/account.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
    AppComponent,
    AccountComponent,
    AccountDetailComponent,
    TableComponent,
    NotFoundComponent,
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    MatTableModule,
  ],
  providers: [AccountService],
  bootstrap: [AppComponent],
})
export class AppModule {}
