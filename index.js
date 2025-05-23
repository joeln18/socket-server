const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Puedes restringir a tu dominio en producción
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Usuario conectado: ', socket.id);

  socket.on('mensaje', (data) => {
    console.log('Mensaje recibido: ', data);
    io.emit('mensaje ', data); // retransmite a todos
  });

  socket.on('disponibilidadValidada', (data) => {
    console.log('Mensaje recibido disponibilidadValidada: ', JSON.stringify(data));
    io.emit('disponibilidadValidada', data); // retransmite a todos
  });

  socket.on('inventarioActualizado', (data) => {
    console.log('Mensaje recibido inventarioActualizado: ', JSON.stringify(data));
    io.emit('inventarioActualizado', data); // retransmite a todos
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado: ', socket.id);
  });
});

server.listen(process.env.PORT || 3001, () => {
  console.log('Servidor de sockets port ', process.env.PORT);
});