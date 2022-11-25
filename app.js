require('dotenv').config();
// susikuriam serveri
const express = require('express');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');

const app = express();
const morgan = require('morgan');
const socketIo = require('socket.io');
const http = require('http').createServer(app);
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mainRouter = require('./router/mainRouter');
const socketRouter = require('./modules/socketRouter');

const port = 5000;


const io = socketIo(http, {
  cors: {
    origin: 'http://localhost:3000',
  },
})
// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);


app.get('/', (req, res) => {
  res.json({
    msg: 'Server online',
  });
});

// ROUTES
app.use('/', mainRouter);
// 404 - returns json
app.use((req, res) => {
  res.status(404).json({
    msg: 'Page not found',
  });
});

// app.set('socketio', io);

// socketRouter(io);
async function testDbConnection() {
  try {
    mongoose.connect(process.env.MONGO_KEY);
    // console.log('rows ===', rows);
    console.log('Connected to Mongo DB '.bgCyan.bold);

  } catch (error) {
    console.log(`Error connecting to db ${error.message}`.bgRed.bold);
    // console.log('error ===', error);
    if (error.code === 'ECONNREFUSED') {
      console.log('is Mongo DB running?'.yellow);
    }
  }
}

testDbConnection();

http.listen(port, () => console.log(`Server online on port ${port}`.bgYellow.bold));
