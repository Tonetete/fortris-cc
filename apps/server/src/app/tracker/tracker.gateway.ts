import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { TrackerService } from './tracker.service';
import { USDBTCPrice } from '@fortris-cc/types';
import { Logger } from '@nestjs/common';

const FREQUENCY_BTC_PRICE = 30000;

@WebSocketGateway({
  namespace: 'btc-tracker',
  cors: '*.*',
})

@WebSocketGateway()
export class TrackerGateway {

  @WebSocketServer() private server;
  private logger: Logger = new Logger('TrackerGateway');
  private USDBTCPrice: USDBTCPrice = {
    rate_float: 0,
    code: 'USD',
    description: '',
    rate: '0.0',
  };

  constructor(private trackerService: TrackerService) {}

  afterInit(server: any) {
    this.server = server;
    this.server.emit('Welcome to BTC Tracker Websocket Server');

    this.emitUSDBTCPrice();

    setInterval(() => {
      this.emitUSDBTCPrice();
    }, FREQUENCY_BTC_PRICE);
  }

  emitUSDBTCPrice() {
    this.USDBTCPrice = this.trackerService.getBTCToUSDPrice();
    this.server.emit('getUSDBTCPrice', this.USDBTCPrice);
    this.logger.log('Current BTC Price: ' + this.USDBTCPrice.rate_float);
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(
      'connection',
      `Connected to Tracker Websocket Server ${client.id}`,
    );
  }

  handleDisconnect(client: any) {
    this.logger.log(`Disconnected from Tracker Websocket Server ${client.id}`);
  }

  @SubscribeMessage('getUSDBTCPriceMessage')
  getUSDBTCPrice() {
    this.server.emit('getUSDBTCPrice', this.USDBTCPrice);
  }

  // @SubscribeMessage('sendMessage')
  // onGetBtcPrice(@MessageBody() body: any) {
  //   this.logger.log(`Send message: ${body}`);
  // }
}
