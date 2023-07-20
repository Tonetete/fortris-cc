import { TestBed } from '@angular/core/testing';
import { Socket } from 'ngx-socket-io';

import { TrackerService } from './tracker.service';
import { USDBTCPrice } from '@fortris-cc/types';

const data: USDBTCPrice = {
  code: 'USD',
  description: 'United States Dollar',
  rate: '1.0000',
  rate_float: 1,
};

class SocketMock {
  emit() {}
  on(msg: string, cb: (data: USDBTCPrice) => void) {
    cb({ ...data });
  }
}

describe('TrackerService', () => {
  let service: TrackerService;
  let socketMock: jest.Mocked<Socket>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Socket, useValue: new SocketMock() }],
    });
    service = TestBed.inject(TrackerService);
    socketMock = TestBed.inject(Socket) as jest.Mocked<Socket>;
  });

  describe('WHEN on init', () => {
    it('THEN getUSDBTCPrice SHOULD be called', () => {
      jest.spyOn(socketMock, 'on');
      jest.spyOn(service['USDBTCPriceSubject'], 'next');
      service.getUSDBTCPrice();
      expect(socketMock.on).toHaveBeenCalled();
      expect(service['USDBTCPriceSubject'].next).toHaveBeenCalledWith(data);
    });

    it('THEN getUSDBTCPriceMessage SHOULD be called', () => {
      jest.spyOn(socketMock, 'emit');
      service.getUSDBTCPriceMessage();
      expect(socketMock.emit).toHaveBeenCalled();
    });
  });
});
