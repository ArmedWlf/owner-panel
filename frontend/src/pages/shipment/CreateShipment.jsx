import { useState } from 'react';
import { createShipment } from '../../api/shipment.api';

// ایمپورت کامپوننت‌های ۱۲ مرحله
import Step1_Origin from '../../components/shipment-steps/Step1_Origin';
import Step2_Destination from '../../components/shipment-steps/Step2_Destination';
import Step3_CargoType from '../../components/shipment-steps/Step3_CargoType';
import Step4_Weight from '../../components/shipment-steps/Step4_Weight';
import Step5_Dimensions from '../../components/shipment-steps/Step5_Dimensions';
import Step6_Date from '../../components/shipment-steps/Step6_Date';
import Step7_Price from '../../components/shipment-steps/Step7_Price';
import Step8_Vehicle from '../../components/shipment-steps/Step8_Vehicle';
import Step9_Insurance from '../../components/shipment-steps/Step9_Insurance';
import Step10_Contact from '../../components/shipment-steps/Step10_Contact';
import Step11_Confirm from '../../components/shipment-steps/Step11_Confirm';
import Step12_Done from '../../components/shipment-steps/Step12_Done';

export default function CreateShipment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    origin_address: 'تهران، میدان آزادی',
    origin_lat: 35.6997,
    origin_lng: 51.3380,
    dest_address: 'اصفهان، سی و سه پل',
    dest_lat: 32.6546,
    dest_lng: 51.6680,
    cargo_details: 'مواد غذایی',
    weight_kg: 1500,
    cargo_value: 50000000,
    receiver_name: 'حسین احمدی',
    receiver_phone: '09120000000',
    loading_time: new Date().toISOString(),
    total_price: 3500000,
    vehicle_type_id: 1,
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 12));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      await createShipment(formData);
      nextStep(); // رفتن به مرحله ۱۲ (پایان)
    } catch (err) {
      alert(err.response?.data?.message || 'خطا در ثبت بار');
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6 dir-rtl">
      {/* شريط پیشرفت */}
      <div className="mb-8 flex justify-between border-b pb-4">
        <span className="font-bold">مرحله {currentStep} از ۱۲</span>
        <div className="h-2 w-1/2 rounded bg-gray-200">
          <div
            className="h-2 rounded bg-blue-600 transition-all"
            style={{ width: `${(currentStep / 12) * 100}%` }}
          />
        </div>
      </div>

      {/* نمایش کامپوننت مرحله جاری */}
      <div className="min-h-[300px] rounded border bg-white p-6 shadow-sm">
        {currentStep === 1 && <Step1_Origin data={formData} onChange={updateFormData} />}
        {currentStep === 2 && <Step2_Destination data={formData} onChange={updateFormData} />}
        {currentStep === 3 && <Step3_CargoType data={formData} onChange={updateFormData} />}
        {currentStep === 4 && <Step4_Weight data={formData} onChange={updateFormData} />}
        {currentStep === 5 && <Step5_Dimensions data={formData} onChange={updateFormData} />}
        {currentStep === 6 && <Step6_Date data={formData} onChange={updateFormData} />}
        {currentStep === 7 && <Step7_Price data={formData} onChange={updateFormData} />}
        {currentStep === 8 && <Step8_Vehicle data={formData} onChange={updateFormData} />}
        {currentStep === 9 && <Step9_Insurance data={formData} onChange={updateFormData} />}
        {currentStep === 10 && <Step10_Contact data={formData} onChange={updateFormData} />}
        {currentStep === 11 && <Step11_Confirm data={formData} onSubmit={handleSubmit} />}
        {currentStep === 12 && <Step12_Done />}
      </div>

      {/* دکمه‌های کنترل */}
      {currentStep < 11 && (
        <div className="mt-6 flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
          >
            قبلی
          </button>
          <button onClick={nextStep} className="rounded bg-blue-600 px-4 py-2 text-white">
            بعدی
          </button>
        </div>
      )}
    </div>
  );
}