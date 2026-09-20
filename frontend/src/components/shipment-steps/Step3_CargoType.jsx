import Input from '../common/Input';
import StepHeader from './StepHeader';

const CARGO_TYPES = [
  { value: 'general', label: 'کالای عمومی' },
  { value: 'fragile', label: 'شکستنی / حساس' },
  { value: 'perishable', label: 'فسادپذیر (خوراکی، دارویی)' },
  { value: 'construction', label: 'مصالح ساختمانی' },
  { value: 'industrial', label: 'قطعات صنعتی' },
  { value: 'other', label: 'سایر' },
];

export default function Step3_CargoType({ data, onChange }) {
  return (
    <div className="space-y-5">
      <StepHeader title="نوع و مشخصات بار" description="کالای خودتون رو با جزئیات کافی توصیف کنید تا راننده‌ی مناسب پیدا بشه." />

      <Input
        as="select"
        label="نوع کالا"
        value={data.cargo_type || ''}
        onChange={(e) => onChange('cargo_type', e.target.value)}
        required
      >
        <option value="">انتخاب کنید</option>
        {CARGO_TYPES.map((t) => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </Input>

      {data.cargo_type === 'other' && (
        <Input
          label="توضیح نوع کالا"
          value={data.cargo_type_other || ''}
          onChange={(e) => onChange('cargo_type_other', e.target.value)}
          placeholder="نوع کالا را توضیح دهید"
          required
        />
      )}

      <Input
        label="نوع بسته‌بندی (اختیاری)"
        value={data.packaging_type || ''}
        onChange={(e) => onChange('packaging_type', e.target.value)}
        placeholder="مثلاً: پالت‌بندی‌شده، کارتنی، فله"
      />
    </div>
  );
}
