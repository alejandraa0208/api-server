'use strict';

module.exports = (sequelize, DataTypes) => {
  const Clothes = sequelize.define('Clothes', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });

  Clothes.associate = (models) => {
    Clothes.belongsTo(models.Food, { as: 'food', foreignKey: 'foodId' });
  };

  return Clothes;
};
