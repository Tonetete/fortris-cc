import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AccountComponent } from './components/account/account.component';
import { NotFoundComponent } from './components/not-found-component/not-found.component';
import { AccountService } from './services/account.service';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
    AppComponent,
    AccountComponent,
    NotFoundComponent,
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [AccountService],
  bootstrap: [AppComponent],
})
export class AppModule {}
