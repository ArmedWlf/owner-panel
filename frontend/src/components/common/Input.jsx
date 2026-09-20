export default function Input({
  label,
  error,
  hint,
  icon: Icon,
  as = 'input',
  className = '',
  required,
  ...props
}) {
  const Field = as;
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 flex items-baseline gap-1 text-sm font-medium text-ink-700">
          {label}
          {required && <span className="text-amber-600">*</span>}
        </span>
      )}
      <span className="relative flex items-center">
        {Icon && (
          <Icon size={17} className="pointer-events-none absolute right-3 text-ink-300" />
        )}
        <Field
          className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink-900
            placeholder:text-ink-300 transition-colors
            focus:outline-none focus:ring-2 focus:ring-amber-500/40
            ${Icon ? 'pr-10' : ''}
            ${error ? 'border-red-300 focus:border-red-400' : 'border-ink-100 focus:border-amber-400'}
            ${className}`}
          {...props}
        />
      </span>
      {error ? (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-ink-300">{hint}</span>
      ) : null}
    </label>
  );
}
