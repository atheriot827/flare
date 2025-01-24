import https from 'https';
import http from 'http';
import fs from 'fs';
import { Server, Socket as OriginalSocket } from 'socket.io';
import app from './app';
import database from './db/index';

import('./db/index');

// declare module 'socket.io' {
//   interface Socket extends OriginalSocket {
//     name: number;
//     x: number;
//     y: number;
//   }
// }

const PORT = 4000;
 interface SocketList {
  [key: string]: any;
 };

 let SOCKET_LIST: SocketList = {}

if (process.env.DEVELOPMENT === 'true') {
  database
    .sync({ alter: true })
    .then(() => {
      if (process.env.SOCKET !== 'true') {
        app.listen(PORT, '0.0.0.0', () => {
          console.log(`Listening on http://localhost:${PORT}`);
        });
      } else {
        const server = http.createServer(app);
        const io = new Server(server);
        // Register event listeners for Socket.IO
        io.on('connection', (socket) => {
          console.log('a user connected', socket);
          socket.data.name = Math.random();
          socket.data.x = 0;
          socket.data.y = 0;
          let stringName = socket.data.name;
          SOCKET_LIST[stringName] = socket;
          // Handle socket events here
          socket.on('disconnect', () => {
            console.log('user disconnected');
          });

          socket.on('message', (msg) => {
            console.log('message: ' + msg);
            io.emit('message', msg);
          });

        });

        server.listen(4000, () => {
          console.log('listening on *:4000');
        });
      }
    })
    .catch((err: Error) => {
      console.error(err, 'oops!');
    });
} else {
  const options = {
    cert: fs.readFileSync('/etc/letsencrypt/live/slayer.events/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/slayer.events/privkey.pem'),
  };

  const io = new Server(https.createServer(options, app));
  io.on('connection', (socket) => {
    socket.emit('connect', { message: 'a new client connected!' });
  });

  https.createServer(options, app).listen(443);
}

setInterval(() => {
  let pack = []
  for(let key in SOCKET_LIST){
    let socket = SOCKET_LIST[key];
    socket.data.x++;
    socket.data.y++;
    pack.push({
        x: socket.data.x,
        y: socket.data.y
    })
  }
  for(let key in SOCKET_LIST){
    let socket = SOCKET_LIST[key];
  socket.emit('newPositions', pack);
  console.log(pack.length)
}
}, 1000 / 25 ); 