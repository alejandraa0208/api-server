'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Clothes = sequelize.define('Clothes', { // Defines the Clothes model. - sydney
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Clothes;
