export default function Step1_Origin({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">۱. مشخصات مبدأ بارگیری</h3>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">آدرس دقیق مبدأ:</label>
        <textarea
          rows={3}
          className="w-full rounded border p-2 focus:border-blue-500 focus:outline-none"
          value={data.origin_address || ''}
          onChange={(e) => onChange('origin_address', e.target.value)}
          placeholder="مثلاً: تهران، خیابان آزادی، پلاک ۱۲"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">عرض جغرافیایی (Latitude):</label>
          <input
            type="number"
            step="any"
            className="w-full rounded border p-2"
            value={data.origin_lat || ''}
            onChange={(e) => onChange('origin_lat', parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">طول جغرافیایی (Longitude):</label>
          <input
            type="number"
            step="any"
            className="w-full rounded border p-2"
            value={data.origin_lng || ''}
            onChange={(e) => onChange('origin_lng', parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}