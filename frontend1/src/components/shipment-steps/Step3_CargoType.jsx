import Input from '../common/Input';
import StepHeader from './StepHeader';

export default function Step3_CargoType({ data, onChange }) {
  return (
    <div className="space-y-5">
      <StepHeader title="نوع و مشخصات بار" description="کالای خودتون رو با جزئیات کافی توصیف کنید تا راننده‌ی مناسب پیدا بشه." />
      <Input
        as="textarea"
        rows={4}
        label="شرح کالا"
        value={data.cargo_details || ''}
        onChange={(e) => onChange('cargo_details', e.target.value)}
        placeholder="مثلاً: ۲۰ کارتن قطعات صنعتی آسیب‌پذیر"
        required
      />
    </div>
  );
}
