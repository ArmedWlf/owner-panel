import { useEffect, useState } from 'react';
import { Truck } from 'lucide-react';
import { getVehicleTypes } from '../../api/shipment.api';
import StepHeader from './StepHeader';
import { formatToman } from '../../utils/currency.util';

export default function Step8_Vehicle({ data, onChange }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVehicleTypes()
      .then(setVehicles)
      .catch(() => setVehicles([]))
      .finally(() => setLoading(false));
  }, []);

  const suitable = (v) => !data.weight_kg || v.max_weight_kg >= Number(data.weight_kg);

  return (
    <div className="space-y-5">
      <StepHeader title="انتخاب نوع ناوگان" description="بر اساس وزن بار وارد شده، خودروهای مناسب را پیشنهاد می‌دهیم." />

      {loading ? (
        <p className="text-sm text-ink-300">در حال دریافت فهرست خودروها...</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {vehicles.map((v) => {
            const active = data.vehicle_type_id === v.id;
            const fits = suitable(v);
            return (
              <button
                type="button"
                key={v.id}
                onClick={() => onChange('vehicle_type_id', v.id)}
                className={`flex items-start gap-3 rounded-lg border p-3.5 text-right transition-colors ${
                  active
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-ink-100 bg-white hover:border-ink-300'
                } ${!fits ? 'opacity-50' : ''}`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    active ? 'bg-amber-500 text-ink-950' : 'bg-ink-50 text-ink-500'
                  }`}
                >
                  <Truck size={17} />
                </span>
                <span>
                  <span className="block text-sm font-medium text-ink-900">{v.title}</span>
                  <span className="tabular mt-0.5 block text-xs text-ink-300">
                    تا {v.max_weight_kg.toLocaleString('fa-IR')} کیلوگرم
                    {!fits && ' · کمتر از وزن بار شما'}
                  </span>
                  <span className="tabular mt-1 block text-xs font-medium text-ink-500">
                    از {formatToman(v.base_price)} تومان
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
