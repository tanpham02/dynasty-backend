import { Server } from 'socket.io';
import { CorsOptions } from 'cors';

import { EVENT_KEYS } from '@app/constants';
import { EventBus } from '@app/events';

const connectSocketIO = (server: any, corsConfig: CorsOptions) => {
  const io = new Server(server, {
    cors: corsConfig,
  });

  io.on('connection', (socket) => {
    console.log(`Socket server connected with id: ${socket.id}`);
    io.on('disconnect', () => console.log('Socket server disconnected'));
  });

  EventBus.on(EVENT_KEYS.CREATE_ORDER, (data) => {
    io.emit(EVENT_KEYS.CREATE_ORDER, data);
  });
};

export default connectSocketIO;
