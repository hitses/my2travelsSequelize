'use strict';
module.exports = (sequelize, DataTypes) => {
  var ActivationCode = sequelize.define('ActivationCode', {
    code: DataTypes.STRING,
  });

  ActivationCode.associate = function(models) {
    models.ActivationCode.belongsTo(models.User);
  };

  return ActivationCode;
};