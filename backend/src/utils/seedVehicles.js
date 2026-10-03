const { Op } = require("sequelize");
const { VehicleType } = require("../models");

const DEFAULT_VEHICLE_TYPES = [
  {
    title: "خاور",
    max_weight_kg: 5000,
    max_length_cm: 430,
    max_width_cm: 200,
    max_height_cm: 210,
    base_price: 4500000,
  },
  {
    title: "۹۱۱",
    max_weight_kg: 5000,
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
    title: "تریلی کفی",
    max_weight_kg: 27000,
    max_length_cm: 1200,
    max_width_cm: 245,
    max_height_cm: 270,
    base_price: 14000000,
  },
];

const normalizeDigits = (value = "") =>
  value.replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)));
const normalizeTitle = (value = "") =>
  normalizeDigits(value).replace(/\s+/g, " ").trim();

const seedVehicleTypes = async () => {
  if ((await VehicleType.count()) === 0) {
    await VehicleType.bulkCreate(DEFAULT_VEHICLE_TYPES);
    console.log("✅ Default vehicle types added to database.");
  }

  const rows = await VehicleType.findAll();
  const canonicalize = async ({ matches, title, maxWeight }) => {
    const matched = rows.filter((row) => matches(normalizeTitle(row.title)));
    let canonical = matched.find((row) => row.is_active) || matched[0];
    if (!canonical) {
      const defaults = DEFAULT_VEHICLE_TYPES.find((item) => matches(normalizeTitle(item.title)));
      if (!defaults) return null;
      canonical = await VehicleType.create({
        ...defaults,
        title,
        max_weight_kg: maxWeight,
        is_active: true,
      });
      rows.push(canonical);
      return canonical;
    }

    await canonical.update({
      title,
      max_weight_kg: maxWeight,
      is_active: true,
    });
    for (const duplicate of matched) {
      if (duplicate.id !== canonical.id) {
        await duplicate.update({ is_active: false });
      }
    }
    return canonical;
  };

  // Preserve existing IDs/references while renaming the old Khavar entry and enforcing capacity.
  let khavar = await canonicalize({
    matches: (title) => title === "خاور" || title.startsWith("خاور مسقف"),
    title: "خاور",
    maxWeight: 5000,
  });
  if (!khavar) {
    khavar = await VehicleType.create(DEFAULT_VEHICLE_TYPES[0]);
  }

  // Reuse an existing 911 row when possible; otherwise copy Khavar's price/dimensions.
  const vehicle911 = await canonicalize({
    matches: (title) => title === "911",
    title: "۹۱۱",
    maxWeight: 5000,
  });
  if (!vehicle911) {
    const khavarData = khavar.get({ plain: true });
    delete khavarData.id;
    await VehicleType.create({ ...khavarData, title: "۹۱۱", max_weight_kg: 5000, is_active: true });
  }

  // Keep the existing truck options and their IDs/capacities, but expose one canonical entry each.
  await canonicalize({
    matches: (title) => title.includes("کامیون تک"),
    title: "کامیون تک (۱۰ تن)",
    maxWeight: 10000,
  });
  await canonicalize({
    matches: (title) => title.includes("کامیون جفت"),
    title: "کامیون جفت (۱۵ تن)",
    maxWeight: 15000,
  });
  await canonicalize({
    matches: (title) => title.includes("تریلی کفی"),
    title: "تریلی کفی",
    maxWeight: 27000,
  });

  // Keep legacy rows and shipment references, but hide retired vehicles from the active API.
  await VehicleType.update(
    { is_active: false },
    { where: { title: { [Op.like]: "%وانت پراید%" } } },
  );
  await VehicleType.update(
    { is_active: false },
    { where: { title: { [Op.like]: "%نیسان زامیاد%" } } },
  );
};

module.exports = seedVehicleTypes;
