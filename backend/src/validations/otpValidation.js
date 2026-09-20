const Joi = require('joi');
const commonMessages = require('../utils/joiMessages');

const phoneSchema = Joi.string()
  .pattern(/^09\d{9}$/)
  .required()
  .label('شماره موبایل')
  .messages({ 'string.pattern.base': '{{#label}} باید به‌فرم ۰۹xxxxxxxxx باشد.' });

const requestOtpSchema = Joi.object({
  phone_number: phoneSchema,
}).messages(commonMessages);

const verifyOtpSchema = Joi.object({
  phone_number: phoneSchema,
  otp_code: Joi.string()
    .length(5)
    .pattern(/^\d+$/)
    .required()
    .label('کد تأیید')
    .messages({ 'string.pattern.base': '{{#label}} باید فقط شامل عدد باشد.' }),
  // فقط برای کاربر جدید الزامی است؛ در سرویس بررسی می‌شود
  first_name: Joi.string().max(50).allow('', null).label('نام'),
  last_name: Joi.string().max(50).allow('', null).label('نام خانوادگی'),
  company_name: Joi.string().max(100).allow('', null).label('نام شرکت'),
}).messages(commonMessages);

module.exports = { requestOtpSchema, verifyOtpSchema };
