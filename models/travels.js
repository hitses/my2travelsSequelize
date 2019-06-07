'use strict';
module.exports = (sequelize, DataTypes) => {
  var Travel = sequelize.define('Travel', {
    destiny: DataTypes.STRING,
    img: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    discount: DataTypes.INTEGER,
  });

  Travel.associate = function (models) {
    models.Travel.belongsTo(models.User)
  };
  
  return Travel;
};