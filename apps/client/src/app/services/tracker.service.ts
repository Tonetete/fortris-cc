import { Socket } from 'ngx-socket-io';
import { Injectable } from '@angular/core';
import { USDBTCPrice } from '@fortris-cc/types';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {
  USDBTCPriceSubject = new ReplaySubject<USDBTCPrice>();
  USDBTCPrice$ = this.USDBTCPriceSubject.asObservable();

  constructor(private socket: Socket) {
    this.getUSDBTCPrice();
   }

  getUSDBTCPriceMessage() {
    this.socket.emit('getUSDBTCPriceMessage', '');
  }

  getUSDBTCPrice() {
    this.socket.on('getUSDBTCPrice', (data: USDBTCPrice) => {
      this.USDBTCPriceSubject.next(data);
    });
  }
}
