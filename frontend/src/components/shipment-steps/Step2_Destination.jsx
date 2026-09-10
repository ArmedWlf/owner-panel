export default function Step2_Destination({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">۲. مشخصات مقصد تخلیه</h3>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">آدرس دقیق مقصد:</label>
        <textarea
          rows={3}
          className="w-full rounded border p-2 focus:border-blue-500 focus:outline-none"
          value={data.dest_address || ''}
          onChange={(e) => onChange('dest_address', e.target.value)}
          placeholder="مثلاً: اصفهان، سی و سه پل، بزرگراه خیام"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">عرض جغرافیایی (Latitude):</label>
          <input
            type="number"
            step="any"
            className="w-full rounded border p-2"
            value={data.dest_lat || ''}
            onChange={(e) => onChange('dest_lat', parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">طول جغرافیایی (Longitude):</label>
          <input
            type="number"
            step="any"
            className="w-full rounded border p-2"
            value={data.dest_lng || ''}
            onChange={(e) => onChange('dest_lng', parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}