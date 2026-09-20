const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { sequelize } = require('./models');
const routes = require('./routes');
const { notFoundHandler, errorHandler } = require('./middlewares/errorMiddleware');
const seedVehicleTypes = require('./utils/seedVehicles');
const seedLocations = require('./utils/seedLocations');
const startReminderScheduler = require('./utils/scheduler');

const app = express();

app.use(cors());
app.use(express.json());

// فایل‌های آپلودی (عکس بار) به‌صورت استاتیک در دسترس قرار می‌گیرند
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api', routes);

// این دو میدل‌ور همیشه باید آخرین چیزهایی باشند که وصل می‌شوند
app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection to MySQL has been established successfully.');

    await sequelize.sync({ alter: true });
    console.log('✅ All database models were synchronized successfully.');

    await seedVehicleTypes();
    await seedLocations();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });

    startReminderScheduler();
  } catch (error) {
    console.error('❌ Unable to connect or sync database:', error);
  }
};

startServer();
