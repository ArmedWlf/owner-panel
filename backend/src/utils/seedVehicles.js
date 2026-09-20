const { VehicleType } = require('../models');

const seedVehicleTypes = async () => {
  const count = await VehicleType.count();
  if (count > 0) return;

  await VehicleType.bulkCreate([
    { title: 'وانت پراید/پیکان', max_weight_kg: 500, max_length_cm: 210, max_width_cm: 140, max_height_cm: 100, base_price: 1500000 },
    { title: 'نیسان زامیاد', max_weight_kg: 2000, max_length_cm: 280, max_width_cm: 170, max_height_cm: 180, base_price: 2500000 },
    { title: 'خاور مسقف', max_weight_kg: 4000, max_length_cm: 430, max_width_cm: 200, max_height_cm: 210, base_price: 4500000 },
    { title: 'کامیون تک (۱۰ تن)', max_weight_kg: 10000, max_length_cm: 600, max_width_cm: 230, max_height_cm: 230, base_price: 7000000 },
    { title: 'کامیون جفت (۱۵ تن)', max_weight_kg: 15000, max_length_cm: 750, max_width_cm: 240, max_height_cm: 240, base_price: 9500000 },
    { title: 'تریلی کفی / ترانزیت', max_weight_kg: 22000, max_length_cm: 1200, max_width_cm: 245, max_height_cm: 270, base_price: 14000000 },
  ]);
  console.log('✅ Default vehicle types added to database.');
};

module.exports = seedVehicleTypes;
