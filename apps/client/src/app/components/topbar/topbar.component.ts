import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { USDBTCPrice } from '@fortris-cc/types';
import { svgBitcoinLogo } from 'apps/client/src/assets/svg-logo';
import { TrackerService } from '../../services/tracker.service';

@Component({
  selector: 'fortris-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  USDBTCPrice: USDBTCPrice | null = null;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private trackerService: TrackerService
  ) { 
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
}
