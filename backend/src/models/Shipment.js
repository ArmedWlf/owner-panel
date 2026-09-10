const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Shipment = sequelize.define('Shipment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tracking_code: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  origin_address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  origin_lat: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false,
  },
  origin_lng: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false,
  },
  dest_address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dest_lat: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false,
  },
  dest_lng: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false,
  },
  cargo_details: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  weight_kg: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  cargo_value: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  receiver_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  receiver_phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  loading_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'driver_assigned', 'at_pickup', 'in_transit', 'delivered', 'cancelled'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'shipments',
  timestamps: true,
});

module.exports = Shipment;