import { ShieldCheck } from 'lucide-react';
import Input from '../common/Input';
import StepHeader from './StepHeader';

export default function Step9_Insurance({ data, onChange }) {
  return (
    <div className="space-y-5">
      <StepHeader title="ارزش اعلامی کالا" description="این مبلغ مبنای محاسبه‌ی بیمه‌ی بار در طول مسیر حمل خواهد بود." />
      <Input
        label="ارزش کل محموله (تومان)"
        icon={ShieldCheck}
        type="number"
        className="tabular"
        value={data.cargo_value || ''}
        onChange={(e) => onChange('cargo_value', parseInt(e.target.value, 10))}
        placeholder="مثلاً ۵۰۰۰۰۰۰۰"
        required
      />
    </div>
  );
}
