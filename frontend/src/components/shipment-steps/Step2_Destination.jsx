import { useEffect, useState } from 'react';
import { Flag } from 'lucide-react';
import Input from '../common/Input';
import LocationPicker from '../common/LocationPicker';
import StepHeader from './StepHeader';
import { getCities, getZonesByCity } from '../../api/location.api';

export default function Step2_Destination({ data, onChange }) {
  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState([]);

  useEffect(() => {
    getCities().then(setCities).catch(() => setCities([]));
  }, []);

  useEffect(() => {
    if (!data.dest_city_id) {
      setZones([]);
      return;
    }
    getZonesByCity(data.dest_city_id).then(setZones).catch(() => setZones([]));
  }, [data.dest_city_id]);

  const handlePick = (lat, lng, address) => {
    onChange('dest_lat', lat);
    onChange('dest_lng', lng);
    if (address) onChange('dest_address', address);
  };

  return (
    <div className="space-y-5">
      <StepHeader title="مقصد تخلیه" description="روی نقشه محل دقیق رو مشخص کن؛ آدرس دقیق مقصد فقط بعد از صدور بارنامه به راننده نشان داده می‌شود." />

      <div className="grid grid-cols-2 gap-4">
        <Input
          as="select"
          label="شهر مقصد"
          value={data.dest_city_id || ''}
          onChange={(e) => {
            onChange('dest_city_id', Number(e.target.value));
            onChange('dest_zone_id', '');
          }}
          required
        >
          <option value="">انتخاب کنید</option>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </Input>
        <Input
          as="select"
          label="محدوده (اختیاری)"
          value={data.dest_zone_id || ''}
          onChange={(e) => onChange('dest_zone_id', e.target.value ? Number(e.target.value) : '')}
          disabled={!data.dest_city_id}
        >
          <option value="">انتخاب کنید</option>
          {zones.map((z) => (
            <option key={z.id} value={z.id}>{z.name}</option>
          ))}
        </Input>
      </div>

      <LocationPicker lat={data.dest_lat} lng={data.dest_lng} onPick={handlePick} placeholder="جست‌وجوی آدرس مقصد..." />

      <Input
        as="textarea"
        rows={2}
        label="آدرس دقیق مقصد"
        icon={Flag}
        value={data.dest_address || ''}
        onChange={(e) => onChange('dest_address', e.target.value)}
        placeholder="پلاک، واحد و جزئیاتی که نقشه نشون نمی‌ده رو اینجا کامل کن"
        hint="با انتخاب روی نقشه خودکار پر می‌شود؛ در صورت نیاز ویرایشش کن."
        required
      />
    </div>
  );
}
