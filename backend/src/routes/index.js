const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const shipmentRoutes = require('./shipmentRoutes');
const vehicleRoutes = require('./vehicleRoutes');

router.use('/auth', authRoutes);
router.use('/shipments', shipmentRoutes);
router.use('/vehicles', vehicleRoutes);

module.exports = router;