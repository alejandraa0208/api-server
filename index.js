'use strict';

require('dotenv').config();
const { sequelize } = require('./lib/models'); // Imports the 'sequelize' object from the './lib/models' module using destructuring. Object destructuring syntax allows you to declare multiple variables at once by using braces { }. And if only one variable is being declared, you can omit the braces altogether. - sydney
const server = require('./lib/server');
const PORT = process.env.PORT || 3001;

sequelize.sync() // sync() will automatically create tables based on the models in the models folder. - sydney
  .then(() => {
    server.start(PORT);
  }); 