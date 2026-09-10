const { VehicleType } = require('../models');

const seedVehicleTypes = async () => {
  try {
    const count = await VehicleType.count();
    if (count === 0) {
      await VehicleType.bulkCreate([
        { title: 'وانت پراید/پیکان', max_weight_kg: 500, base_price: 1500000 },
        { title: 'نیسان زامیاد', max_weight_kg: 2000, base_price: 2500000 },
        { title: 'خاور مسقف', max_weight_kg: 4000, base_price: 4500000 },
        { title: 'کامیون تک (۱۰ تن)', max_weight_kg: 10000, base_price: 7000000 },
        { title: 'کامیون جفت (۱۵ تن)', max_weight_kg: 15000, base_price: 9500000 },
        { title: 'تریلی کفی / ترانزیت', max_weight_kg: 22000, base_price: 14000000 },
      ]);
      console.log('✅ Default vehicle types added to database.');
    }
  } catch (error) {
    console.error('❌ Error seeding vehicle types:', error);
  }
};

module.exports = seedVehicleTypes;