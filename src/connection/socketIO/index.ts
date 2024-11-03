import { CorsOptions } from 'cors';
import { Server } from 'socket.io';

import { EVENT_KEYS } from '@app/constants';
import { Server as HttpServer, IncomingMessage, ServerResponse } from 'http';

type ServerCustomType = HttpServer<typeof IncomingMessage, typeof ServerResponse>;

class SocketIO {
  private readonly server: ServerCustomType;
  private readonly corsConfig: CorsOptions;
  private readonly io: Server;

  constructor(server: ServerCustomType, corsConfig: CorsOptions) {
    this.server = server;
    this.corsConfig = corsConfig;
    this.io = new Server(this.server, {
      cors: this.corsConfig,
    });

    this.connection();
  }

  connection() {
    this.io.on('connection', (socket) => {
      console.log(`Socket server connected with id: ${socket.id}`);

      socket.on('disconnect', () => console.log('Socket server disconnected'));
    });
  }

  pushNotification(eventKey: EVENT_KEYS, data: any) {
    this.io.emit(eventKey, data);
  }
}

export default SocketIO;
