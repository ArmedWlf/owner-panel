import { CalendarClock } from 'lucide-react';
import Input from '../common/Input';
import StepHeader from './StepHeader';

const URGENCY_OPTIONS = [
  { value: 'urgent', label: 'فوری (همین الان)' },
  { value: 'today', label: 'امروز' },
  { value: 'tomorrow', label: 'فردا' },
  { value: 'scheduled', label: 'زمان‌بندی‌شده' },
];

export default function Step8_DateUrgency({ data, onChange }) {
  return (
    <div className="space-y-5">
      <StepHeader title="زمان بارگیری" description="بازه‌ی زمانی آماده بودن بار برای تحویل به راننده." />

      <Input
        label="تاریخ بارگیری"
        icon={CalendarClock}
        type="date"
        className="tabular"
        value={data.loading_date || ''}
        onChange={(e) => onChange('loading_date', e.target.value)}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="از ساعت"
          type="time"
          className="tabular"
          value={data.loading_time_from || ''}
          onChange={(e) => onChange('loading_time_from', e.target.value)}
          required
        />
        <Input
          label="تا ساعت"
          type="time"
          className="tabular"
          value={data.loading_time_to || ''}
          onChange={(e) => onChange('loading_time_to', e.target.value)}
          required
        />
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-medium text-ink-700">میزان فوریت</span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {URGENCY_OPTIONS.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => onChange('urgency', opt.value)}
              className={`rounded-lg border px-3 py-2.5 text-xs font-medium transition-colors ${
                data.urgency === opt.value
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : 'border-ink-100 text-ink-500 hover:border-ink-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
