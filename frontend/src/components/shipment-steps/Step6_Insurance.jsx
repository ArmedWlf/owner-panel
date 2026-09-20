import { ShieldCheck } from 'lucide-react';
import Input from '../common/Input';
import StepHeader from './StepHeader';
import { parseNumberInput } from '../../utils/digits';

export default function Step6_Insurance({ data, onChange }) {
  return (
    <div className="space-y-5">
      <StepHeader title="ارزش اعلامی کالا" description="این مبلغ مبنای محاسبه‌ی بیمه‌ی بار در طول مسیر حمل خواهد بود." />
      <Input
        label="ارزش کل محموله (تومان)"
        icon={ShieldCheck}
        type="text"
        inputMode="decimal"
        className="tabular"
        value={data.cargo_value ?? ''}
        onChange={(e) => onChange('cargo_value', parseNumberInput(e.target.value))}
        placeholder="مثلاً 5000000"
        required
      />
    </div>
  );
}
