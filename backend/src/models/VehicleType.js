const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const VehicleType = sequelize.define('VehicleType', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  max_weight_kg: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  base_price: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'vehicle_types',
  timestamps: false,
});

module.exports = VehicleType;