import Input from '../common/Input';
import StepHeader from './StepHeader';
import { parseNumberInput } from '../../utils/digits';

export default function Step5_Dimensions({ data, onChange }) {
  return (
    <div className="space-y-5">
      <StepHeader title="ابعاد بار (اختیاری)" description="وارد کردن ابعاد به تطبیق دقیق‌تر خودروی مناسب کمک می‌کند." />
      <div className="grid grid-cols-3 gap-3">
        <Input
          label="طول (cm)"
          type="text"
          inputMode="decimal"
          className="tabular"
          value={data.length_cm ?? ''}
          onChange={(e) => onChange('length_cm', parseNumberInput(e.target.value))}
        />
        <Input
          label="عرض (cm)"
          type="text"
          inputMode="decimal"
          className="tabular"
          value={data.width_cm ?? ''}
          onChange={(e) => onChange('width_cm', parseNumberInput(e.target.value))}
        />
        <Input
          label="ارتفاع (cm)"
          type="text"
          inputMode="decimal"
          className="tabular"
          value={data.height_cm ?? ''}
          onChange={(e) => onChange('height_cm', parseNumberInput(e.target.value))}
        />
      </div>
    </div>
  );
}
