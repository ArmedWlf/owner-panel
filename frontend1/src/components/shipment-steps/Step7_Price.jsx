import { Wallet } from 'lucide-react';
import Input from '../common/Input';
import StepHeader from './StepHeader';

export default function Step7_Price({ data, onChange }) {
  return (
    <div className="space-y-5">
      <StepHeader
        title="کرایه پیشنهادی"
        description="این مبلغ به‌عنوان پیشنهاد شما ثبت می‌شود؛ قیمت نهایی توسط اپراتور بررسی و تأیید خواهد شد."
      />
      <Input
        label="مبلغ کرایه پیشنهادی (تومان)"
        icon={Wallet}
        type="number"
        className="tabular"
        value={data.total_price || ''}
        onChange={(e) => onChange('total_price', parseInt(e.target.value, 10))}
        placeholder="مثلاً ۳۵۰۰۰۰۰"
        required
      />
    </div>
  );
}
