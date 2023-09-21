'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Food = sequelize.define('Food', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Food;

