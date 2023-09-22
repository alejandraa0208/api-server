'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const SQL_CONNECTION_STRING = process.env.SQL_CONNECTION_STRING || 'sqlite:memory:';

const sequelize = new Sequelize(SQL_CONNECTION_STRING, {
  logging: console.log,
});



const Food = require('./food')(sequelize, DataTypes);
const Clothes = require('./clothes')(sequelize, DataTypes);

module.exports = {
  sequelize,
  Food,
  Clothes,
};
