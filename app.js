require('dotenv').config();
// susikuriam serveri
const express = require('express');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');

const app = express();
const morgan = require('morgan');
const socketIo = require('socket.io');
const http = require('http').createServer(app);

const router = require('./router/mainRouter');
const socketRouter = require('./modules/socketRouter');

const port = process.env.PORT || 5000;


const io = socketIo(http, {
  cors: {
    origin: "http://localhost:3000"
  }
})
// Middleware
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.json({
    msg: 'Server online',
  });
});

// ROUTES

// 404 - returns json
app.use((req, res) => {
  res.status(404).json({
    msg: 'Page not found',
  });
});

async function testDbConnection() {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.query('SELECT 1');
    // console.log('rows ===', rows);
    console.log('Connected to MYSQL DB '.bgCyan.bold);
    conn.end();
  } catch (error) {
    console.log(`Error connecting to db ${error.message}`.bgRed.bold);
    // console.log('error ===', error);
    if (error.code === 'ECONNREFUSED') {
      console.log('is Xammp running?'.yellow);
    }
  }
}

testDbConnection();

http.listen(port, () => console.log(`Server online on port ${port}`.bgYellow.bold));
