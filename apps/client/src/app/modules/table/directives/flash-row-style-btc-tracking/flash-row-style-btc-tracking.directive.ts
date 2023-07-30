import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { DELAY_BACKGROUND_COLOR_CHANGE } from '@fortris-cc/constants';
import { USDBTCPrice } from '@fortris-cc/types';
import { TrackerService } from '../../../../services/tracker.service';

@Directive({
  selector: '[fortrisFlashRowStyleBTCTracking]',
})
export class FlashRowStyleBTCTrackingDirective {
  trs: HTMLElement[] = [];
  previousUSDBTCPrice: USDBTCPrice | null = null;
  USDBTCPrice: USDBTCPrice | null = null;

  constructor(
    private trackerService: TrackerService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngAfterViewInit() {
    this.trackerService.USDBTCPrice$.subscribe((USDBTCPrice) => {
      this.trs = this.el.nativeElement.querySelectorAll('tbody tr');
      if (this.previousUSDBTCPrice === null) {
        this.previousUSDBTCPrice = USDBTCPrice;
      }
      this.USDBTCPrice = USDBTCPrice;
      this.setFlashClassToTrRows();
      this.previousUSDBTCPrice = USDBTCPrice;
    });
  }

  private setFlashClassToTrRows() {
    this.trs.forEach((tr) => {
      if ((this.USDBTCPrice?.rate_float || 0) >
        ((this.previousUSDBTCPrice || { rate_float: 0 }).rate_float || 0)) {
        this.renderer.addClass(tr, 'increase');
      } else {
        this.renderer.addClass(tr, 'decrease');
      }
      setTimeout(() => {
        this.renderer.removeClass(tr, 'increase');
        this.renderer.removeClass(tr, 'decrease');
      }, DELAY_BACKGROUND_COLOR_CHANGE);
    });
  }
}
