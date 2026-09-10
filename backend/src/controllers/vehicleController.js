const { VehicleType } = require('../models');

exports.getVehicleTypes = async (req, res) => {
  try {
    const vehicles = await VehicleType.findAll({ where: { is_active: true } });
    return res.json(vehicles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'خطا در دریافت لیست خودروها.' });
  }
};