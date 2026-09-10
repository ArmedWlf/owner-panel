import api from './axios.config';

// دریافت انواع خودروها برای مرحله ۸ فرم
export const getVehicleTypes = async () => {
  const response = await api.get('/vehicles');
  return response.data;
};

// ثبت نهایی بار در مرحله ۱۲ فرم
export const createShipment = async (shipmentData) => {
  const response = await api.post('/shipments', shipmentData);
  return response.data;
};

// دریافت لیست بارهای ثبت‌شده صاحب کالا
export const getMyShipments = async () => {
  const response = await api.get('/shipments/my-shipments');
  return response.data;
};