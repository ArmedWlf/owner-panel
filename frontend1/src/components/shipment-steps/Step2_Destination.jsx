import { Flag } from 'lucide-react';
import Input from '../common/Input';
import StepHeader from './StepHeader';

export default function Step2_Destination({ data, onChange }) {
  return (
    <div className="space-y-5">
      <StepHeader title="مقصد تخلیه" description="آدرس دقیق مقصد فقط بعد از صدور بارنامه به راننده نشان داده می‌شود." />
      <Input
        as="textarea"
        rows={3}
        label="آدرس دقیق مقصد"
        icon={Flag}
        value={data.dest_address || ''}
        onChange={(e) => onChange('dest_address', e.target.value)}
        placeholder="مثلاً: اصفهان، سی و سه پل، بزرگراه خیام"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="عرض جغرافیایی"
          type="number"
          step="any"
          className="tabular text-left"
          dir="ltr"
          value={data.dest_lat || ''}
          onChange={(e) => onChange('dest_lat', parseFloat(e.target.value))}
        />
        <Input
          label="طول جغرافیایی"
          type="number"
          step="any"
          className="tabular text-left"
          dir="ltr"
          value={data.dest_lng || ''}
          onChange={(e) => onChange('dest_lng', parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}
