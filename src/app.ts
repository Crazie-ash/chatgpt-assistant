import * as express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import indexRouter from './routes/indexRouter';
import * as path from 'path';
import { SocketService } from './services/socketService';

const app: any = express();
const server: http.Server = http.createServer(app);
export const io: Server = require('socket.io')(server);

app.use(express.static('public/assets'));
app.use(express.static(path.join(__dirname, '..', 'uploads')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.use('/', indexRouter);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('user connected');
  const socketService = new SocketService();
  socket.on('SOCKET_EMIT_EVENT', (event) => {
    socketService.socketHandling(event);
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
