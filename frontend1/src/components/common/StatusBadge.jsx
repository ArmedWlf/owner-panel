const STATUS_MAP = {
  pending: { label: 'در انتظار بررسی', dot: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50' },
  driver_assigned: { label: 'راننده تعیین شد', dot: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-50' },
  at_pickup: { label: 'راننده به مبدأ رسید', dot: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-50' },
  in_transit: { label: 'در حال حمل', dot: 'bg-ink-500', text: 'text-ink-700', bg: 'bg-ink-50' },
  delivered: { label: 'تحویل داده شد', dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  cancelled: { label: 'لغو شده', dot: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50' },
};

export default function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${s.bg} ${s.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
