'use strict';

require('dotenv').config();
const sequelize = require('./lib/models/index');
const server = require('./lib/server');
const PORT = process.env.PORT || 3001;

sequelize.sync()
  .then(() => {
    server.start(PORT);
  });