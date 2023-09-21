'use strict';

const { Sequelize, DataTypes } = require('sequelize'); // Imports the Sequelize class and the DataTypes object from the sequelize module. - sydney

const SQL_CONNECTION_STRING = process.env.SQL_CONNECTION_STRING || 'sqlite:memory:'; // Defines the SQL_CONNECTION_STRING variable. If the SQL_CONNECTION_STRING environment variable exists, use its value. Otherwise, use the string 'sqlite:memory:'. - sydney

const sequelize = new Sequelize(SQL_CONNECTION_STRING); // Creates a new Sequelize instance using the SQL_CONNECTION_STRING variable. - sydney

module.exports = sequelize; // Exports the sequelize instance. - sydney
