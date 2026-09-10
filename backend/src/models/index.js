const { sequelize } = require('../config/database');
const User = require('./User');
const CargoOwner = require('./CargoOwner');
const VehicleType = require('./VehicleType');
const Shipment = require('./Shipment');

// رابطه یک‌به‌یک بین User و CargoOwner
User.hasOne(CargoOwner, { foreignKey: 'user_id', onDelete: 'CASCADE' });
CargoOwner.belongsTo(User, { foreignKey: 'user_id' });

// رابطه یک‌به‌چند بین User و Shipment
User.hasMany(Shipment, { foreignKey: 'owner_id', as: 'shipments' });
Shipment.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });

// رابطه یک‌به‌چند بین VehicleType و Shipment
VehicleType.hasMany(Shipment, { foreignKey: 'vehicle_type_id' });
Shipment.belongsTo(VehicleType, { foreignKey: 'vehicle_type_id' });

module.exports = {
  sequelize,
  User,
  CargoOwner,
  VehicleType,
  Shipment,
};