const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const CargoOwner = sequelize.define('CargoOwner', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  company_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  national_id: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
}, {
  tableName: 'cargo_owners',
  timestamps: true,
});

module.exports = CargoOwner;