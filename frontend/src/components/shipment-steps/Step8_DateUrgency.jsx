import JalaliDatePicker from "../common/JalaliDatePicker";
import StepHeader from "./StepHeader";

const URGENCY_OPTIONS = [
  { value: "today", label: "امروز" },
  { value: "tomorrow", label: "فردا" },
  { value: "scheduled", label: "زمان‌بندی‌شده" },
];

const TIME_RANGES = [
  { label: "۸ تا ۱۲", from: "08:00", to: "12:00" },
  { label: "۱۲ تا ۱۶", from: "12:00", to: "16:00" },
  { label: "۱۶ تا ۲۰", from: "16:00", to: "20:00" },
  { label: "۲۰ تا ۲۴", from: "20:00", to: "24:00" },
];

export default function Step8_DateUrgency({ data, onChange }) {
  const selectedRange = TIME_RANGES.find(
    (range) =>
      range.from === data.loading_time_from && range.to === data.loading_time_to,
  );
  return (
    <div className="space-y-5">
      <StepHeader
        title="انتخاب بازه زمانی"
        description="بازه‌ی زمانی آماده بودن بار برای تحویل به راننده."
      />

      <JalaliDatePicker
        label="تاریخ بارگیری"
        value={data.loading_date || ""}
        onChange={(iso) => onChange("loading_date", iso)}
        required
      />

      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-ink-700">
          انتخاب بازه زمانی <span className="text-red-500" aria-hidden="true">*</span>
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {TIME_RANGES.map((range) => {
            const isSelected = selectedRange === range;
            return (
              <button
                type="button"
                key={range.from}
                aria-pressed={isSelected}
                onClick={() => {
                  onChange("loading_time_from", range.from);
                  onChange("loading_time_to", range.to);
                }}
                className={`min-h-11 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                  isSelected
                    ? "border-amber-500 bg-amber-50 text-amber-700"
                    : "border-ink-100 text-ink-600 hover:border-ink-300"
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <span className="mb-1.5 block text-sm font-medium text-ink-700">
          میزان فوریت
        </span>
        <div className="grid grid-cols-3 gap-2">
          {URGENCY_OPTIONS.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => onChange("urgency", opt.value)}
              className={`rounded-lg border px-3 py-2.5 text-xs font-medium transition-colors ${
                data.urgency === opt.value
                  ? "border-amber-500 bg-amber-50 text-amber-700"
                  : "border-ink-100 text-ink-500 hover:border-ink-300"
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
