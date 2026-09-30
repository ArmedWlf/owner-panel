import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, X } from "lucide-react";

const normalizeFa = (str) => {
  if (!str) return "";
  return String(str)
    .replace(/[\u064A\u0649]/g, "ی")
    .replace(/[\u0643]/g, "ک")
    .replace(/[\u0640]/g, "")
    .replace(/\u200c/g, " ")
    .trim()
    .toLowerCase();
};

// تابع کمکی برای انتقال فوکوس به المان تعاملی بعدی در فرم
const focusNextField = (currentElement) => {
  if (!currentElement) return;
  const formContainer =
    currentElement.closest("form") ||
    currentElement.closest(".space-y-5") ||
    document;
  const focusables = Array.from(
    formContainer.querySelectorAll(
      'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), button[type="submit"]',
    ),
  ).filter((el) => el.offsetParent !== null); // فقط عناصر قابل مشاهده

  const currentIndex = focusables.indexOf(currentElement);
  if (currentIndex > -1 && currentIndex < focusables.length - 1) {
    focusables[currentIndex + 1].focus();
  }
};

export default function SearchableSelect({
  label,
  value,
  onChange,
  options = [],
  placeholder = "تایپ یا انتخاب کنید...",
  disabled = false,
  required = false,
  error = null,
  noResultsText = "موردی یافت نشد",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const selectedItem = useMemo(() => {
    return options.find((opt) => String(opt.value) === String(value));
  }, [options, value]);

  useEffect(() => {
    if (selectedItem) {
      setSearchTerm(selectedItem.label);
    } else if (!value) {
      setSearchTerm("");
    }
  }, [selectedItem, value]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchTerm(selectedItem ? selectedItem.label : "");
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [selectedItem]);

  // فیلتر فقط بر اساس نام شهر / searchKey
  const filteredOptions = useMemo(() => {
    if (
      !searchTerm.trim() ||
      (selectedItem && searchTerm === selectedItem.label)
    ) {
      return options;
    }
    const cleanQuery = normalizeFa(searchTerm);
    return options.filter((opt) => {
      const searchTarget = opt.searchKey || opt.label;
      return normalizeFa(searchTarget).includes(cleanQuery);
    });
  }, [options, searchTerm, selectedItem]);

  // ریست ایندکس هایلایت با تغییر نتایج
  useEffect(() => {
    setHighlightedIndex(0);
  }, [filteredOptions.length]);

  // اسکرول اتوماتیک روی گزینه هایلایت شده با کلیدهای فلش
  useEffect(() => {
    if (isOpen && listRef.current) {
      const activeEl = listRef.current.children[highlightedIndex];
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex, isOpen]);

  const handleSelect = (opt) => {
    if (!opt) return;
    onChange(opt.value);
    setSearchTerm(opt.label);
    setIsOpen(false);
    // انتقال فوکوس به فیلد بعدی
    setTimeout(() => {
      focusNextField(inputRef.current);
    }, 50);
  };

  const handleKeyDown = (e) => {
    if (disabled) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev,
        );
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (isOpen) {
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      }
    } else if (e.key === "Enter") {
      e.preventDefault(); // جلوگیری از سابمیت فرم
      if (isOpen && filteredOptions.length > 0) {
        const targetOption =
          filteredOptions[highlightedIndex] || filteredOptions[0];
        handleSelect(targetOption);
      } else if (!isOpen) {
        // اگر منو بسته بود، مستقیم به فیلد بعدی برود
        focusNextField(inputRef.current);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange("");
    setSearchTerm("");
    setIsOpen(false);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div
      className={`relative block text-right ${isOpen ? "z-30" : "z-0"}`}
      ref={wrapperRef}
    >
      {label && (
        <span className="mb-1.5 flex items-baseline gap-1 text-sm font-medium text-ink-700">
          {label}
          {required && <span className="text-amber-600">*</span>}
        </span>
      )}

      <div
        className={`relative flex items-center w-full rounded-lg border bg-white text-sm text-ink-900 transition-colors ${
          disabled
            ? "bg-gray-100 cursor-not-allowed opacity-60"
            : "hover:border-ink-300"
        } ${isOpen ? "border-amber-400 ring-2 ring-amber-500/30" : error ? "border-red-300" : "border-ink-100"}`}
      >
        <input
          ref={inputRef}
          type="text"
          disabled={disabled}
          value={searchTerm}
          placeholder={placeholder}
          className="w-full bg-transparent px-3.5 py-2.5 text-sm text-ink-900 outline-none placeholder:text-ink-300"
          onFocus={() => !disabled && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!isOpen) setIsOpen(true);
            if (value && e.target.value !== selectedItem?.label) {
              onChange("");
            }
          }}
        />
        <div className="flex items-center pl-3 gap-1 text-ink-300">
          {value && !disabled && (
            <button
              type="button"
              className="p-1 hover:text-red-500 transition-colors"
              onClick={handleClear}
              title="پاک کردن"
            >
              <X size={15} />
            </button>
          )}
          <ChevronDown
            size={16}
            className={`cursor-pointer transition-transform ${isOpen ? "rotate-180 text-amber-500" : ""}`}
            onClick={() => !disabled && setIsOpen(!isOpen)}
          />
        </div>
      </div>

      {isOpen && !disabled && (
        <div
          ref={listRef}
          className="absolute inset-x-0 top-full z-[1100] mt-1 max-h-56 overflow-y-auto overscroll-contain rounded-lg border border-ink-100 bg-white shadow-xl"
        >
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-3 text-xs text-ink-300 text-center">
              {noResultsText}
            </div>
          ) : (
            filteredOptions.map((opt, idx) => {
              const isSelected = String(opt.value) === String(value);
              const isHighlighted = idx === highlightedIndex;

              return (
                <div
                  key={opt.value}
                  className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between border-b border-gray-50 last:border-0 ${
                    isHighlighted
                      ? "bg-amber-50 text-amber-900 font-medium"
                      : ""
                  } ${isSelected ? "bg-amber-100/70 font-semibold text-amber-950" : "text-ink-800"}`}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  onClick={() => handleSelect(opt)}
                >
                  <span>{opt.label}</span>
                  {opt.subLabel && (
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-ink-400 font-normal pointer-events-none">
                      {opt.subLabel}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {error && (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      )}
    </div>
  );
}
