const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./models');
const routes = require('./routes');
const seedVehicleTypes = require('./utils/seedVehicles'); // <--- اضافه شد

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection to MySQL has been established successfully.');

    await sequelize.sync({ alter: true });
    console.log('✅ All database models were synchronized successfully.');

    await seedVehicleTypes(); // <--- پر کردن خودکار لیست ماشین‌ها

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect or sync database:', error);
  }
};

startServer();