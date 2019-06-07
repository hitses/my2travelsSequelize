'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: 'actions_unique',
    },
    password: DataTypes.TEXT,
    rol: DataTypes.ENUM('admin', 'user')
  });

  User.associate = function(models) {
    models.User.hasMany(models.Travel);
  };

  return User;
};