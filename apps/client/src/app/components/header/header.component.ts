import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'fortris-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = '';

  constructor(
    private router: Router,
  ) {
    
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() =>
          this.findRouteWithTitle(this.router.routerState.snapshot.root)
        )
      )
      .subscribe((title: string) => {
        this.title = title;
      });
  }

  private findRouteWithTitle(route: ActivatedRouteSnapshot): string {
    const { title } = route.data;
    return title
      ? title
      : route.firstChild
      ? this.findRouteWithTitle(route.firstChild)
      : '';
  }
}
