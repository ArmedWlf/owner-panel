import { Weight } from 'lucide-react';
import Input from '../common/Input';
import StepHeader from './StepHeader';

export default function Step4_Weight({ data, onChange }) {
  return (
    <div className="space-y-5">
      <StepHeader title="وزن محموله" description="وزن کل بار به کیلوگرم، برای انتخاب خودروی مناسب استفاده می‌شود." />
      <Input
        label="وزن کل"
        icon={Weight}
        type="number"
        className="tabular"
        value={data.weight_kg || ''}
        onChange={(e) => onChange('weight_kg', parseFloat(e.target.value))}
        placeholder="مثلاً ۱۵۰۰"
        hint="واحد: کیلوگرم"
        required
      />
    </div>
  );
}
