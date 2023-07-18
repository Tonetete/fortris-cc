import { Component } from '@angular/core';

@Component({
  selector: 'fotris-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';

  constructor() {
    console.log('App component loaded');
  }
}
