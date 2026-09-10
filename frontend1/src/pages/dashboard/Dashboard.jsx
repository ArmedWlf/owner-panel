import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PackagePlus, Package, Clock, CheckCircle2, ArrowLeft } from 'lucide-react';
import { getMyShipments } from '../../api/shipment.api';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import { formatToman } from '../../utils/currency.util';
import { formatDate } from '../../utils/date.util';

export default function Dashboard() {
  const { user } = useAuth();
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyShipments()
      .then(setShipments)
      .catch(() => setShipments([]))
      .finally(() => setLoading(false));
  }, []);

  const active = shipments.filter((s) => !['delivered', 'cancelled'].includes(s.status));
  const delivered = shipments.filter((s) => s.status === 'delivered');

  const stats = [
    { label: 'بارهای فعال', value: active.length, icon: Clock, tone: 'text-amber-600 bg-amber-50' },
    { label: 'تحویل‌شده', value: delivered.length, icon: CheckCircle2, tone: 'text-emerald-600 bg-emerald-50' },
    { label: 'کل بارهای ثبت‌شده', value: shipments.length, icon: Package, tone: 'text-ink-700 bg-ink-50' },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">
            سلام {user?.phone_number ? '👋' : ''}
          </h1>
          <p className="mt-1 text-sm text-ink-300">خلاصه‌ی وضعیت بارهای شما</p>
        </div>
        <Button as={Link} to="/create-shipment" variant="accent" icon={PackagePlus}>
          ثبت بار جدید
        </Button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="rounded-xl border border-ink-100 bg-white p-5 shadow-panel">
            <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${tone}`}>
              <Icon size={18} />
            </span>
            <p className="tabular mt-3 text-2xl font-bold text-ink-900">{value}</p>
            <p className="text-xs text-ink-300">{label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-ink-100 bg-white shadow-panel">
        <div className="flex items-center justify-between border-b border-ink-50 px-5 py-4">
          <h2 className="text-sm font-bold text-ink-900">آخرین بارهای ثبت‌شده</h2>
          <Link
            to="/shipments"
            className="inline-flex items-center gap-1 text-xs font-medium text-ink-300 hover:text-amber-600"
          >
            مشاهده همه
            <ArrowLeft size={13} />
          </Link>
        </div>

        {loading ? (
          <p className="px-5 py-10 text-center text-sm text-ink-300">در حال بارگذاری...</p>
        ) : shipments.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="divide-y divide-ink-50">
            {shipments.slice(0, 5).map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <p className="tabular text-sm font-bold text-ink-900">{s.tracking_code}</p>
                  <p className="mt-0.5 truncate text-xs text-ink-300">
                    {s.origin_address} ← {s.dest_address}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span className="tabular hidden text-sm text-ink-500 sm:block">
                    {formatToman(s.total_price)} تومان
                  </span>
                  <StatusBadge status={s.status} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 px-5 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600">
        <Package size={22} />
      </span>
      <p className="text-sm font-medium text-ink-700">هنوز باری ثبت نکردی</p>
      <p className="max-w-xs text-xs text-ink-300">
        اولین بارت رو در ۱۲ مرحله‌ی ساده ثبت کن تا برات راننده پیدا کنیم.
      </p>
      <Button as={Link} to="/create-shipment" variant="accent" size="sm" icon={PackagePlus}>
        ثبت بار جدید
      </Button>
    </div>
  );
}
