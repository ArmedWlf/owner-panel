import { User, Phone } from 'lucide-react';
import Input from '../common/Input';
import StepHeader from './StepHeader';
import { toEnglishDigits } from '../../utils/digits';

export default function Step11_Contact({ data, onChange }) {
  return (
    <div className="space-y-5">
      <StepHeader title="اطلاعات گیرنده‌ی بار" description="این اطلاعات فقط در اختیار راننده و متصدی مأموریت قرار می‌گیرد." />
      <Input
        label="نام و نام خانوادگی گیرنده"
        icon={User}
        value={data.receiver_name || ''}
        onChange={(e) => onChange('receiver_name', e.target.value)}
        placeholder="علی رضایی"
        required
      />
      <Input
        label="شماره تماس گیرنده"
        icon={Phone}
        dir="ltr"
        className="tabular text-left"
        value={data.receiver_phone || ''}
        onChange={(e) => onChange('receiver_phone', toEnglishDigits(e.target.value).replace(/[^\d]/g, ''))}
        placeholder="09120000000"
        maxLength={11}
        required
      />
    </div>
  );
}
