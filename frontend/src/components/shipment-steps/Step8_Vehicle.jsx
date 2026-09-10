import { useEffect, useState } from 'react';
import { getVehicleTypes } from '../../api/shipment.api';

export default function Step8_Vehicle({ data, onChange }) {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getVehicleTypes()
      .then((res) => setVehicles(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">۸. انتخاب نوع ناوگان (خودرو)</h3>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">خودرو مورد نیاز را انتخاب کنید:</label>
        <select
          className="w-full rounded border p-2"
          value={data.vehicle_type_id || ''}
          onChange={(e) => onChange('vehicle_type_id', parseInt(e.target.value))}
        >
          <option value="">-- انتخاب کنید --</option>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.title} (حداکثر وزن: {v.max_weight_kg} کیلوگرم)
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}