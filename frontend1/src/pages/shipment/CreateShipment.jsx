import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { createShipment } from '../../api/shipment.api';
import Button from '../../components/common/Button';

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

const STEPS = [
  { title: 'مبدأ', Component: Step1_Origin },
  { title: 'مقصد', Component: Step2_Destination },
  { title: 'نوع کالا', Component: Step3_CargoType },
  { title: 'وزن', Component: Step4_Weight },
  { title: 'ابعاد', Component: Step5_Dimensions },
  { title: 'زمان', Component: Step6_Date },
  { title: 'کرایه', Component: Step7_Price },
  { title: 'خودرو', Component: Step8_Vehicle },
  { title: 'بیمه', Component: Step9_Insurance },
  { title: 'گیرنده', Component: Step10_Contact },
  { title: 'تأیید', Component: Step11_Confirm },
  { title: 'پایان', Component: Step12_Done },
];

export default function CreateShipment() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    origin_address: '',
    origin_lat: '',
    origin_lng: '',
    dest_address: '',
    dest_lat: '',
    dest_lng: '',
    cargo_details: '',
    weight_kg: '',
    cargo_value: '',
    receiver_name: '',
    receiver_phone: '',
    loading_time: new Date().toISOString(),
    total_price: '',
    vehicle_type_id: '',
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 12));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const updateFormData = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    try {
      await createShipment(formData);
      nextStep();
    } catch (err) {
      alert(err.response?.data?.message || 'خطا در ثبت بار');
    }
  };

  const ActiveStep = STEPS[currentStep - 1].Component;
  const isFinal = currentStep === 12;

  return (
    <div className="mx-auto max-w-2xl">
      {!isFinal && (
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-ink-900">ثبت بار جدید</h1>
          <p className="tabular text-sm text-ink-300">مرحله {currentStep} از ۱۲</p>
        </div>
      )}

      {!isFinal && <RouteProgress current={currentStep} />}

      <div className="mt-6 rounded-xl border border-ink-100 bg-white p-6 shadow-panel sm:p-8">
        <ActiveStep data={formData} onChange={updateFormData} onSubmit={handleSubmit} />
      </div>

      {currentStep < 11 && (
        <div className="mt-5 flex justify-between">
          <Button variant="ghost" onClick={prevStep} disabled={currentStep === 1} icon={ChevronRight}>
            مرحله قبل
          </Button>
          <Button variant="accent" onClick={nextStep} icon={ChevronLeft}>
            مرحله بعد
          </Button>
        </div>
      )}
    </div>
  );
}

function RouteProgress({ current }) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="relative flex min-w-[640px] items-center justify-between px-1">
        <div className="absolute inset-x-1 top-1/2 h-px -translate-y-1/2 bg-dash-line bg-[length:18px_1px] bg-repeat-x" />
        {STEPS.slice(0, 11).map((step, idx) => {
          const num = idx + 1;
          const done = num < current;
          const active = num === current;
          return (
            <div key={step.title} className="relative flex flex-col items-center gap-1.5">
              <span
                className={`tabular flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors ${
                  done
                    ? 'border-ink-900 bg-ink-900 text-white'
                    : active
                    ? 'border-amber-500 bg-amber-500 text-ink-950'
                    : 'border-ink-100 bg-white text-ink-300'
                }`}
              >
                {done ? <Check size={14} /> : num}
              </span>
              <span
                className={`whitespace-nowrap text-[11px] ${
                  active ? 'font-medium text-ink-900' : 'text-ink-300'
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
