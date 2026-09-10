export default function Step6_Date({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">۶. تاریخ و زمان بارگیری</h3>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">زمان دقیق آماده‌سازی بار:</label>
        <input
          type="datetime-local"
          className="w-full rounded border p-2"
          value={data.loading_time ? new Date(data.loading_time).toISOString().slice(0, 16) : ''}
          onChange={(e) => onChange('loading_time', new Date(e.target.value).toISOString())}
        />
      </div>
    </div>
  );
}