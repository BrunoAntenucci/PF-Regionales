const express = require('express');
const morgan = require('morgan');
const server = express();
const mongoose = require("mongoose");


server.use(express.urlencoded({ extended: true, limit: "50mb"}));
server.use(express.json({limit: "50mb"}))
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


server.listen(3001, () => {
    console.log('Listening at 3001')
})
