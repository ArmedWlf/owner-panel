import { useEffect, useRef, useState } from "react";
import { Clock, ChevronDown } from "lucide-react";

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);

const selectClass =
  "tabular flex h-10 w-[4.5rem] items-center justify-between rounded-lg border border-ink-100 bg-white px-2 text-sm text-ink-900 transition-colors focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40";

function TimeSelect({
  label,
  value,
  options,
  onChange,
  isOpen,
  onToggle,
  onClose,
}) {
  const rootRef = useRef(null);
  const selectedRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) onClose();
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    selectedRef.current?.scrollIntoView({ block: "nearest" });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={onToggle}
        className={selectClass}
      >
        <span>{value || "--"}</span>
        <ChevronDown size={14} className="text-ink-400" aria-hidden="true" />
      </button>
      {isOpen && (
        <div
          role="listbox"
          aria-label={label}
          className="absolute left-0 top-full z-50 mt-1 max-h-40 w-[4.5rem] overflow-y-auto overscroll-contain rounded-lg border border-ink-100 bg-white p-1 shadow-lg"
        >
          {options.map((option) => (
            <button
              type="button"
              role="option"
              aria-selected={value === option}
              key={option}
              ref={value === option ? selectedRef : null}
              onClick={() => {
                onChange(option);
                onClose();
              }}
              className={`block w-full rounded-md px-2 py-1.5 text-center text-sm tabular transition-colors hover:bg-amber-50 hover:text-amber-700 ${
                value === option
                  ? "bg-amber-50 font-semibold text-amber-700"
                  : "text-ink-800"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// انتخاب زمان ۲۴ ساعته (بدون AM/PM). value و خروجی onChange همیشه "HH:MM" است.
export default function TimeInput24({ label, value, onChange, required }) {
  const [hour = "", minute = ""] = (value || "").split(":");
  const [openPart, setOpenPart] = useState(null);

  // اگر فقط یکی از دو بخش انتخاب شد، بخش دیگر موقتاً 00 در نظر گرفته می‌شود
  const setHour = (h) => onChange(`${h}:${minute || "00"}`);
  const setMinute = (m) => onChange(`${hour || "00"}:${m}`);

  return (
    <div className="flex min-w-0 items-center justify-start gap-3">
      {label && (
        <span className="shrink-0 text-sm font-medium text-ink-700">
          {label}
          {required && <span className="ms-1 text-amber-600">*</span>}
        </span>
      )}
      <div className="flex shrink-0 items-center gap-1.5" dir="ltr">
        <Clock size={16} className="shrink-0 text-ink-300" aria-hidden="true" />
        <TimeSelect
          label="ساعت"
          value={hour}
          options={HOURS}
          onChange={setHour}
          isOpen={openPart === "hour"}
          onToggle={() => setOpenPart(openPart === "hour" ? null : "hour")}
          onClose={() => setOpenPart(null)}
        />
        <span className="font-semibold text-ink-500">:</span>
        <TimeSelect
          label="دقیقه"
          value={minute}
          options={MINUTES}
          onChange={setMinute}
          isOpen={openPart === "minute"}
          onToggle={() => setOpenPart(openPart === "minute" ? null : "minute")}
          onClose={() => setOpenPart(null)}
        />
      </div>
    </div>
  );
}
