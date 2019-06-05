'use strict';
module.exports = (sequelize, DataTypes) => {
  var Travel = sequelize.define('Travel', {
    country: DataTypes.STRING,
    imgURL: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    discount: DataTypes.INTEGER,
    creator: DataTypes.STRING,
  });

  return Travel;
};