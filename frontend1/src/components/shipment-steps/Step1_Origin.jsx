import { MapPin } from 'lucide-react';
import Input from '../common/Input';
import StepHeader from './StepHeader';

export default function Step1_Origin({ data, onChange }) {
  return (
    <div className="space-y-5">
      <StepHeader title="مبدأ بارگیری" description="آدرس دقیق فقط برای راننده‌ی تأییدشده نمایش داده می‌شود." />
      <Input
        as="textarea"
        rows={3}
        label="آدرس دقیق مبدأ"
        icon={MapPin}
        value={data.origin_address || ''}
        onChange={(e) => onChange('origin_address', e.target.value)}
        placeholder="مثلاً: تهران، خیابان آزادی، پلاک ۱۲"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="عرض جغرافیایی"
          type="number"
          step="any"
          className="tabular text-left"
          dir="ltr"
          value={data.origin_lat || ''}
          onChange={(e) => onChange('origin_lat', parseFloat(e.target.value))}
        />
        <Input
          label="طول جغرافیایی"
          type="number"
          step="any"
          className="tabular text-left"
          dir="ltr"
          value={data.origin_lng || ''}
          onChange={(e) => onChange('origin_lng', parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}
