/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';

import '@shared/infra/typeorm';
import '@shared/container';

import net from 'net';

import HandShake from './controllers/HandShakeController';

(async () => {
  const handleConnection = socket => {
    console.log('New Client Connection');

    socket.on('data', async (data: Buffer) => {
      const packageData = data.toString();

      const result = await HandShake(packageData, socket);

      if (result) {
        if (result.heartbeat) {
          socket.write(result.response);
        }
      } else {
        socket.end();
      }
    });

    socket.on('error', (err: Error) => console.log(err.stack));
  };

  const server = net.createServer(handleConnection);

  server.listen(9000, '127.0.0.1', () => {
    console.log('Server started on port 9000');
  });
})();
