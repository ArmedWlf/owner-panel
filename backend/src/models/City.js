const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// فهرست شهرها - مبنای انتخاب ساختاریافته مبدأ/مقصد
const City = sequelize.define('City', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'cities',
  timestamps: false,
});

module.exports = City;
