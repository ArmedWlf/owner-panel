const { Shipment, VehicleType } = require('../models');

// ثبت بار جدید
exports.createShipment = async (req, res) => {
  try {
    const owner_id = req.user.id; // دریافت ID کاربر از توکن JWT
    
    // تولید کد پیگیری یکتا
    const tracking_code = 'SHIP-' + Math.floor(100000 + Math.random() * 900000);

    const shipmentData = {
      ...req.body,
      owner_id,
      tracking_code,
    };

    const shipment = await Shipment.create(shipmentData);

    return res.status(201).json({
      message: 'بار با موفقیت ثبت شد.',
      shipment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'خطا در ثبت بار.' });
  }
};

// دریافت لیست بارهای صاحب کالا
exports.getMyShipments = async (req, res) => {
  try {
    const owner_id = req.user.id;
    const shipments = await Shipment.findAll({
      where: { owner_id },
      include: [{ model: VehicleType }],
      order: [['createdAt', 'DESC']],
    });

    return res.json(shipments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'خطا در دریافت لیست بارها.' });
  }
};