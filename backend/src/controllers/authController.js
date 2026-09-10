const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, CargoOwner } = require('../models');

// ۱. ثبت‌نام صاحب کالا
exports.registerCargoOwner = async (req, res) => {
  try {
    const { phone_number, password, first_name, last_name, company_name } = req.body;

    // بررسی تکراری نبودن شماره موبایل
    const existingUser = await User.findOne({ where: { phone_number } });
    if (existingUser) {
      return res.status(400).json({ message: 'این شماره موبایل قبلاً ثبت شده است.' });
    }

    // هش کردن رمز عبور
    const hashedPassword = await bcrypt.hash(password, 10);

    // ساخت کاربر در جدول users
    const user = await User.create({
      phone_number,
      password: hashedPassword,
      role: 'cargo_owner',
    });

    // ساخت پروفایل صاحب کالا در جدول cargo_owners
    await CargoOwner.create({
      user_id: user.id,
      first_name,
      last_name,
      company_name,
    });

    return res.status(201).json({ message: 'ثبت‌نام با موفقیت انجام شد.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'خطای سرور در ثبت‌نام.' });
  }
};

// ۲. ورود صاحب کالا
exports.login = async (req, res) => {
  try {
    const { phone_number, password } = req.body;

    // پیدا کردن کاربر
    const user = await User.findOne({ where: { phone_number } });
    if (!user) {
      return res.status(404).json({ message: 'کاربری با این شماره یافت نشد.' });
    }

    // بررسی صحت رمز عبور
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'رمز عبور اشتباه است.' });
    }

    // صدور توکن JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      message: 'ورود موفقیت‌آمیز بود.',
      token,
      user: { id: user.id, phone_number: user.phone_number, role: user.role }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'خطای سرور در ورود.' });
  }
};