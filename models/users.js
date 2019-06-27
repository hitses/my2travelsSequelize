'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: 'actions_unique',
    },
    activate: {
      type: DataTypes.ENUM('noActivated', 'activated'),
      defaultValue: 'noActivated',
    },
    password: DataTypes.TEXT,
    rol: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
    }
  });

  User.associate = function(models) {
    models.User.hasMany(models.Travel);
    models.User.hasOne(models.ActivationCode);
  };

  return User;
};