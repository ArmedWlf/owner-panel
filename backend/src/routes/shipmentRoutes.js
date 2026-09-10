const express = require('express');
const router = express.Router();
const shipmentController = require('../controllers/shipmentController');
const authenticateToken = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { createShipmentSchema } = require('../validations/shipmentValidation');

router.post('/', authenticateToken, validate(createShipmentSchema), shipmentController.createShipment);
router.get('/my-shipments', authenticateToken, shipmentController.getMyShipments);

module.exports = router;