import { useState } from 'react';
import { Wallet } from 'lucide-react';
import StepHeader from './StepHeader';
import Input from '../common/Input';
import Button from '../common/Button';
import { formatToman } from '../../utils/currency.util';
import { parseNumberInput } from '../../utils/digits';

const ROWS = [
  ['origin_address', 'مبدأ'],
  ['dest_address', 'مقصد'],
  ['weight_kg', 'وزن (kg)'],
];

const MIN_PRICE = 10000;

export default function Step12_Confirm({ data, onChange, onSubmit }) {
  const [loading, setLoading] = useState(false);

  const priceInvalid = !data.proposed_price || data.proposed_price < MIN_PRICE;

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
      <StepHeader title="کرایه پیشنهادی و بررسی نهایی" description="این مبلغ پیشنهاد شماست؛ قیمت نهایی توسط اپراتور بررسی و تأیید می‌شود." />

      <Input
        label="مبلغ کرایه پیشنهادی (تومان)"
        icon={Wallet}
        type="text"
        inputMode="decimal"
        className="tabular"
        value={data.proposed_price ?? ''}
        onChange={(e) => onChange('proposed_price', parseNumberInput(e.target.value))}
        placeholder="مثلاً 3500000"
        error={priceInvalid && data.proposed_price !== '' ? `مبلغ باید حداقل ${MIN_PRICE.toLocaleString('fa-IR')} تومان باشد.` : undefined}
        required
      />

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
          <span className="text-ink-300">ارزش اعلامی</span>
          <span className="tabular font-medium text-ink-900">{formatToman(data.cargo_value)} تومان</span>
        </div>
        <div className="flex justify-between gap-4 px-4 py-2.5 text-sm">
          <span className="text-ink-300">گیرنده</span>
          <span className="font-medium text-ink-900">
            {data.receiver_name} <span className="tabular text-ink-300">({data.receiver_phone})</span>
          </span>
        </div>
      </div>

      <Button
        variant="accent"
        size="lg"
        loading={loading}
        onClick={handleSubmit}
        disabled={priceInvalid}
        className="w-full"
      >
        تأیید و ارسال درخواست بار
      </Button>
    </div>
  );
}
