const express = require('express');
const bodyParser = require('body-parser');
const gifRoutes = require('./routes/gif');
const commentaireRoutes = require('./routes/commentaire');
const userRoutes = require('./routes/user');

const app = express();


app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/gifs', gifRoutes);
app.use('/api/commentaires', commentaireRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;