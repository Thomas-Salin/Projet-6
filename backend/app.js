const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const gifRoutes = require('./routes/gif');
const commentaireRoutes = require('./routes/commentaire');
const userRoutes = require('./routes/user');


const app = express();


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use('/gifs', express.static(path.join(__dirname, 'gifs')));
app.use('/photos', express.static(path.join(__dirname, 'photos')));
app.use('/api/gifs', gifRoutes);
app.use('/api/commentaires', commentaireRoutes);
app.use('/api/users', userRoutes);

module.exports = app;