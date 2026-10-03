import JalaliDatePicker from "../common/JalaliDatePicker";
import TimeInput24 from "../common/TimeInput24";
import StepHeader from "./StepHeader";

const URGENCY_OPTIONS = [
  { value: "today", label: "امروز" },
  { value: "tomorrow", label: "فردا" },
  { value: "scheduled", label: "زمان‌بندی‌شده" },
];

export default function Step8_DateUrgency({ data, onChange }) {
  return (
    <div className="space-y-5">
      <StepHeader
        title="زمان بارگیری"
        description="بازه‌ی زمانی آماده بودن بار برای تحویل به راننده."
      />

      <JalaliDatePicker
        label="تاریخ بارگیری"
        value={data.loading_date || ""}
        onChange={(iso) => onChange("loading_date", iso)}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <TimeInput24
          label="از ساعت"
          value={data.loading_time_from || ""}
          onChange={(v) => onChange("loading_time_from", v)}
          required
        />
        <TimeInput24
          label="تا ساعت"
          value={data.loading_time_to || ""}
          onChange={(v) => onChange("loading_time_to", v)}
          required
        />
      </div>

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
