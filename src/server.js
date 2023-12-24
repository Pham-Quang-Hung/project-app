//dotenv
require('dotenv').config();

// connect mongodb
const mongoose = require('./configs/mongoose/db');
mongoose.connectToDatabase();

const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const socketio = require('socket.io');

app.use(express.json());
app.use(cors());

const route = require('./routes/route');
const errorhandling = require('./middlewares/errorhandling');
const chat = require('./routes/socketRoute');

const port = process.env.APP_PORT ;
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:200/',
    methods: ['GET', 'POST']
  }
});

chat.connect(io);

app.get('/', (req, res) => {
  res.send("home");
});

route(app);

// unhandled route
app.all('*', (req, res, next) => {
  const err = new Error('the route can not be found');
  err.statusCode = 404;
  next(err);
});

app.use(errorhandling);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
