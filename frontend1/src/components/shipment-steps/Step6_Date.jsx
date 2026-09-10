import { CalendarClock } from 'lucide-react';
import Input from '../common/Input';
import StepHeader from './StepHeader';
import { toDatetimeLocalValue } from '../../utils/date.util';

export default function Step6_Date({ data, onChange }) {
  return (
    <div className="space-y-5">
      <StepHeader title="تاریخ و زمان بارگیری" description="زمانی که بار برای تحویل به راننده آماده خواهد بود." />
      <Input
        label="زمان دقیق آماده‌سازی بار"
        icon={CalendarClock}
        type="datetime-local"
        className="tabular"
        value={toDatetimeLocalValue(data.loading_time)}
        onChange={(e) => onChange('loading_time', new Date(e.target.value).toISOString())}
        required
      />
    </div>
  );
}
