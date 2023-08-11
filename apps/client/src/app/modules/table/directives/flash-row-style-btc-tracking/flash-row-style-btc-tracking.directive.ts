import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { DELAY_BACKGROUND_COLOR_CHANGE } from '@fortris-cc/constants';
import { USDBTCPrice } from '@fortris-cc/types';

@Directive({
  selector: '[fortrisFlashRowStyleBTCTracking]',
})
export class FlashRowStyleBTCTrackingDirective implements OnChanges {
  @Input() USDBTCPrice: USDBTCPrice | null = null;

  trs: HTMLElement[] = [];
  previousUSDBTCPrice: USDBTCPrice | null = null;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    const {
      USDBTCPrice: {
        previousValue: previousUSDBTCPrice,
        currentValue: currentUSDBTCPrice,
      },
    } = changes;
    if (currentUSDBTCPrice && previousUSDBTCPrice) {
      this.setFlashClassToTrRows(previousUSDBTCPrice);
    }
  }

  ngAfterViewInit() {
    this.trs = this.el.nativeElement.querySelectorAll('tbody tr');
  }

  private setFlashClassToTrRows(previousUSDBTCPrice: USDBTCPrice) {
    this.trs.forEach((tr) => {
      if (
        (this.USDBTCPrice?.rate_float || 0) >
        (previousUSDBTCPrice.rate_float || 0)
      ) {
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
