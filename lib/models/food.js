'use strict';

module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });

  Food.associate = (models) => {
    Food.hasMany(models.Clothes, { as: 'clothes', foreignKey: 'foodId' });
  };

  return Food;
};



