const { Op } = require("sequelize");
const { VehicleType } = require("../models");

const DEFAULT_VEHICLE_TYPES = [
  {
    title: "خاور مسقف",
    max_weight_kg: 4000,
    max_length_cm: 430,
    max_width_cm: 200,
    max_height_cm: 210,
    base_price: 4500000,
  },
  {
    title: "کامیون تک (۱۰ تن)",
    max_weight_kg: 10000,
    max_length_cm: 600,
    max_width_cm: 230,
    max_height_cm: 230,
    base_price: 7000000,
  },
  {
    title: "کامیون جفت (۱۵ تن)",
    max_weight_kg: 15000,
    max_length_cm: 750,
    max_width_cm: 240,
    max_height_cm: 240,
    base_price: 9500000,
  },
  {
    title: "تریلی کفی / ترانزیت",
    max_weight_kg: 27000,
    max_length_cm: 1200,
    max_width_cm: 245,
    max_height_cm: 270,
    base_price: 14000000,
  },
];

const seedVehicleTypes = async () => {
  const count = await VehicleType.count();
  if (count === 0) {
    await VehicleType.bulkCreate(DEFAULT_VEHICLE_TYPES);
    console.log("✅ Default vehicle types added to database.");
  }

  // Deactivate legacy rows instead of deleting them, preserving shipment foreign keys.
  // The active-only vehicle API and shipment reference validation will then hide/reject them.
  await VehicleType.update(
    { is_active: false },
    { where: { title: { [Op.like]: "%وانت پراید%" } } },
  );
  await VehicleType.update(
    { is_active: false },
    { where: { title: { [Op.like]: "%نیسان زامیاد%" } } },
  );

  // Keep the existing flatbed record and shipments linked to it, but update its capacity.
  await VehicleType.update(
    { max_weight_kg: 27000 },
    { where: { title: "تریلی کفی / ترانزیت" } },
  );
};

module.exports = seedVehicleTypes;
