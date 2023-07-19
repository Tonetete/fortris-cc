import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { svgBitcoinLogo } from '../../../assets/svg-logo';
import { USDBTCPrice } from '@fortris-cc/types';
import { filter, map } from 'rxjs';
import { TrackerService } from '../../services/tracker.service';

@Component({
  selector: 'fortris-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = '';
  decodedSymbol: SafeHtml | undefined;
  USDBTCPrice: USDBTCPrice | null = null;

  constructor(
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private trackerService: TrackerService
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

      this.registryIcon('btc-icon', svgBitcoinLogo);
  }

  ngOnInit() {
    this.trackerService.getUSDBTCPriceMessage();
    this.trackerService.USDBTCPrice$.subscribe((price: USDBTCPrice) => {
      this.USDBTCPrice = price;
    });
  }

  registryIcon(name: string, path: string) {
    this.matIconRegistry.addSvgIconLiteral(
      name,
      this.domSanitizer.bypassSecurityTrustHtml(path)
    );
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
