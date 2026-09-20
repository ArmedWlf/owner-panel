const jwt = require('jsonwebtoken');
const { User, CargoOwner } = require('../models');
const AppError = require('../utils/AppError');
const otpService = require('./otp.service');

// درخواست کد تأیید: اگر کاربر وجود نداشته باشد، رکورد اولیه با نقش صاحب کالا ساخته می‌شود
async function requestOtp(phoneNumber) {
  let user = await User.findOne({ where: { phone_number: phoneNumber } });
  if (!user) {
    user = await User.create({ phone_number: phoneNumber, role: 'cargo_owner' });
  }

  otpService.assertCanResend(user);

  const code = otpService.generateOtp();
  user.otp_code = code;
  user.otp_expires_at = otpService.getOtpExpiry();
  user.otp_last_sent_at = new Date();
  user.otp_attempts = 0;
  await user.save();

  const smsResult = await otpService.sendOtpSms(phoneNumber, code);

  return {
    isNewUser: !user.is_phone_verified,
    // فقط وقتی درگاه واقعی وصل نیست (حالت توسعه) کد برای راحتی تست برگردانده می‌شود؛
    // به‌محض تنظیم SMS_PROVIDER در .env، این مقدار همیشه undefined خواهد بود.
    devOtpCode: smsResult.mocked ? code : undefined,
  };
}

// تأیید کد و صدور توکن. برای کاربر جدید، اطلاعات پروفایل هم لازم است.
async function verifyOtpAndAuthenticate({ phoneNumber, otpCode, profile }) {
  const user = await User.findOne({ where: { phone_number: phoneNumber } });
  if (!user) {
    throw new AppError('ابتدا درخواست کد تأیید بدهید.', 400);
  }

  try {
    otpService.verifyOtpMatch(user, otpCode);
  } catch (err) {
    if (err.isWrongOtp) {
      user.otp_attempts += 1;
      await user.save();
    }
    throw err;
  }

  // نکته‌ی مهم: کد OTP هنوز پاک نمی‌شود، چون ممکن است کاربر جدید باشد و این تابع
  // یک‌بار دیگر (این‌بار همراه با نام/نام‌خانوادگی) با همین کد صدا زده شود.
  let cargoOwner = await CargoOwner.findOne({ where: { user_id: user.id } });

  if (!cargoOwner) {
    if (!profile?.first_name || !profile?.last_name) {
      // نیاز به تکمیل پروفایل - خطای شناخته‌شده که فرانت آن را تشخیص می‌دهد
      const err = new AppError('برای تکمیل ثبت‌نام، نام و نام خانوادگی را وارد کنید.', 422);
      err.code = 'PROFILE_REQUIRED';
      throw err;
    }
    cargoOwner = await CargoOwner.create({
      user_id: user.id,
      first_name: profile.first_name,
      last_name: profile.last_name,
      company_name: profile.company_name || null,
    });
  }

  // فقط الان که کل فرآیند (کد + پروفایل در صورت نیاز) با موفقیت تمام شده، کد پاک می‌شود
  user.otp_code = null;
  user.otp_expires_at = null;
  user.otp_attempts = 0;
  user.is_phone_verified = true;
  await user.save();

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  return {
    token,
    user: {
      id: user.id,
      phone_number: user.phone_number,
      role: user.role,
      first_name: cargoOwner.first_name,
      last_name: cargoOwner.last_name,
      company_name: cargoOwner.company_name,
      rating_avg: user.rating_avg,
    },
  };
}

module.exports = { requestOtp, verifyOtpAndAuthenticate };
