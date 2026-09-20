const { City, Zone } = require('../models');

// چند شهر و محدوده‌ی نمونه برای شروع؛ در آینده از پنل مدیریت قابل مدیریت خواهد بود
const LOCATIONS = {
  'تهران': ['آزادی', 'ونک', 'تهرانپارس', 'جنوب شهر'],
  'اصفهان': ['سی و سه پل', 'خیابان چهارباغ', 'شاهین‌شهر'],
  'مشهد': ['حرم مطهر', 'وکیل‌آباد', 'الهیه'],
  'شیراز': ['معالی‌آباد', 'زند', 'قصردشت'],
  'تبریز': ['ولیعصر', 'آبرسان'],
};

const seedLocations = async () => {
  const count = await City.count();
  if (count > 0) return;

  for (const [cityName, zones] of Object.entries(LOCATIONS)) {
    const city = await City.create({ name: cityName });
    await Zone.bulkCreate(zones.map((name) => ({ name, city_id: city.id })));
  }
  console.log('✅ Default cities & zones added to database.');
};

module.exports = seedLocations;
