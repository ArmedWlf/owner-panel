import Input from '../common/Input';
import StepHeader from './StepHeader';

export default function Step5_Dimensions({ data, onChange }) {
  return (
    <div className="space-y-5">
      <StepHeader title="ابعاد و بسته‌بندی" description="این مرحله اختیاری است اما به تطبیق دقیق‌تر خودرو کمک می‌کند." />
      <div className="grid grid-cols-3 gap-3">
        <Input
          label="طول (cm)"
          type="number"
          className="tabular"
          value={data.length_cm || ''}
          onChange={(e) => onChange('length_cm', parseFloat(e.target.value))}
        />
        <Input
          label="عرض (cm)"
          type="number"
          className="tabular"
          value={data.width_cm || ''}
          onChange={(e) => onChange('width_cm', parseFloat(e.target.value))}
        />
        <Input
          label="ارتفاع (cm)"
          type="number"
          className="tabular"
          value={data.height_cm || ''}
          onChange={(e) => onChange('height_cm', parseFloat(e.target.value))}
        />
      </div>
      <Input
        label="توضیحات بسته‌بندی (اختیاری)"
        value={data.packing_details || ''}
        onChange={(e) => onChange('packing_details', e.target.value)}
        placeholder="مثلاً: پالت‌بندی شده"
      />
    </div>
  );
}
