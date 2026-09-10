const Joi = require('joi');

const createShipmentSchema = Joi.object({
  origin_address: Joi.string().required().messages({ 'any.required': 'آدرس مبدأ الزامی است.' }),
  origin_lat: Joi.number().required(),
  origin_lng: Joi.number().required(),
  dest_address: Joi.string().required().messages({ 'any.required': 'آدرس مقصد الزامی است.' }),
  dest_lat: Joi.number().required(),
  dest_lng: Joi.number().required(),
  cargo_details: Joi.string().required().messages({ 'any.required': 'جزئیات محموله الزامی است.' }),
  weight_kg: Joi.number().positive().required().messages({ 'number.positive': 'وزن باید عدد مثبت باشد.' }),
  cargo_value: Joi.number().positive().required(),
  receiver_name: Joi.string().required().messages({ 'any.required': 'نام گیرنده الزامی است.' }),
  receiver_phone: Joi.string().pattern(/^09\d{9}$/).required().messages({ 'string.pattern.base': 'شماره موبایل گیرنده معتبر نیست.' }),
  loading_time: Joi.date().required(),
  total_price: Joi.number().positive().required(),
  vehicle_type_id: Joi.number().integer().optional(),
});

module.exports = { createShipmentSchema };