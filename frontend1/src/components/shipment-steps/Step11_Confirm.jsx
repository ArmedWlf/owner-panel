import { useState } from 'react';
import StepHeader from './StepHeader';
import Button from '../common/Button';
import { formatToman } from '../../utils/currency.util';
import { formatDate } from '../../utils/date.util';

const ROWS = [
  ['origin_address', 'مبدأ'],
  ['dest_address', 'مقصد'],
  ['cargo_details', 'شرح کالا'],
  ['weight_kg', 'وزن (kg)'],
];

export default function Step11_Confirm({ data, onSubmit }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <StepHeader title="بررسی نهایی و ارسال" description="پیش از ارسال، اطلاعات زیر را یک‌بار بررسی کنید." />

      <div className="divide-y divide-ink-50 rounded-lg border border-ink-100">
        {ROWS.map(([key, label]) => (
          <div key={key} className="flex justify-between gap-4 px-4 py-2.5 text-sm">
            <span className="text-ink-300">{label}</span>
            <span className="max-w-[65%] truncate text-left font-medium text-ink-900">
              {data[key] || '—'}
            </span>
          </div>
        ))}
        <div className="flex justify-between gap-4 px-4 py-2.5 text-sm">
          <span className="text-ink-300">تاریخ بارگیری</span>
          <span className="tabular font-medium text-ink-900">{formatDate(data.loading_time)}</span>
        </div>
        <div className="flex justify-between gap-4 px-4 py-2.5 text-sm">
          <span className="text-ink-300">ارزش اعلامی</span>
          <span className="tabular font-medium text-ink-900">{formatToman(data.cargo_value)} تومان</span>
        </div>
        <div className="flex justify-between gap-4 px-4 py-2.5 text-sm">
          <span className="text-ink-300">کرایه پیشنهادی</span>
          <span className="tabular font-medium text-ink-900">{formatToman(data.total_price)} تومان</span>
        </div>
        <div className="flex justify-between gap-4 px-4 py-2.5 text-sm">
          <span className="text-ink-300">گیرنده</span>
          <span className="font-medium text-ink-900">
            {data.receiver_name} <span className="tabular text-ink-300">({data.receiver_phone})</span>
          </span>
        </div>
      </div>

      <Button variant="accent" size="lg" loading={loading} onClick={handleSubmit} className="w-full">
        تأیید و ارسال درخواست بار
      </Button>
    </div>
  );
}
