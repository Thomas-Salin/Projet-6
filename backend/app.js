const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const gifRoutes = require('./routes/gif');

const app = express();


app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/gifs', gifRoutes);


module.exports = app;