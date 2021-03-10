const express = require('express');
const genres = require('../routes/genres');
const games = require('../routes/games');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/genres', genres);
  app.use('/api/games', games);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use(error);
}