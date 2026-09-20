import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import Input from '../common/Input';
import LocationPicker from '../common/LocationPicker';
import StepHeader from './StepHeader';
import { getCities, getZonesByCity } from '../../api/location.api';

export default function Step1_Origin({ data, onChange }) {
  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState([]);

  useEffect(() => {
    getCities().then(setCities).catch(() => setCities([]));
  }, []);

  useEffect(() => {
    if (!data.origin_city_id) {
      setZones([]);
      return;
    }
    getZonesByCity(data.origin_city_id).then(setZones).catch(() => setZones([]));
  }, [data.origin_city_id]);

  const handlePick = (lat, lng, address) => {
    onChange('origin_lat', lat);
    onChange('origin_lng', lng);
    if (address) onChange('origin_address', address);
  };

  return (
    <div className="space-y-5">
      <StepHeader title="مبدأ بارگیری" description="روی نقشه محل دقیق رو مشخص کن؛ آدرس دقیق فقط برای راننده‌ی تأییدشده نمایش داده می‌شود." />

      <div className="grid grid-cols-2 gap-4">
        <Input
          as="select"
          label="شهر مبدأ"
          value={data.origin_city_id || ''}
          onChange={(e) => {
            onChange('origin_city_id', Number(e.target.value));
            onChange('origin_zone_id', '');
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
          value={data.origin_zone_id || ''}
          onChange={(e) => onChange('origin_zone_id', e.target.value ? Number(e.target.value) : '')}
          disabled={!data.origin_city_id}
        >
          <option value="">انتخاب کنید</option>
          {zones.map((z) => (
            <option key={z.id} value={z.id}>{z.name}</option>
          ))}
        </Input>
      </div>

      <LocationPicker lat={data.origin_lat} lng={data.origin_lng} onPick={handlePick} placeholder="جست‌وجوی آدرس مبدأ..." />

      <Input
        as="textarea"
        rows={2}
        label="آدرس دقیق مبدأ"
        icon={MapPin}
        value={data.origin_address || ''}
        onChange={(e) => onChange('origin_address', e.target.value)}
        placeholder="پلاک، واحد و جزئیاتی که نقشه نشون نمی‌ده رو اینجا کامل کن"
        hint="با انتخاب روی نقشه خودکار پر می‌شود؛ در صورت نیاز ویرایشش کن."
        required
      />
    </div>
  );
}
