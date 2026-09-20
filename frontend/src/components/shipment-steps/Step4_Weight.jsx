import { Weight } from 'lucide-react';
import Input from '../common/Input';
import StepHeader from './StepHeader';
import { parseNumberInput } from '../../utils/digits';

export default function Step4_Weight({ data, onChange }) {
  return (
    <div className="space-y-5">
      <StepHeader title="وزن محموله" description="وزن کل بار به کیلوگرم، برای انتخاب خودروی مناسب استفاده می‌شود." />
      <Input
        label="وزن کل"
        icon={Weight}
        type="text"
        inputMode="decimal"
        className="tabular"
        value={data.weight_kg ?? ''}
        onChange={(e) => onChange('weight_kg', parseNumberInput(e.target.value))}
        placeholder="مثلاً 1500"
        hint="واحد: کیلوگرم"
        required
      />
    </div>
  );
}
