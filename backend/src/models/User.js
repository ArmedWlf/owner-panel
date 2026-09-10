const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  phone_number: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('cargo_owner', 'driver', 'admin'),
    allowNull: false,
    defaultValue: 'cargo_owner',
  },
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;