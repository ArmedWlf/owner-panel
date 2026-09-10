export default function Step4_Weight({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">۴. وزن محموله</h3>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">وزن کل (کیلوگرم):</label>
        <input
          type="number"
          className="w-full rounded border p-2"
          value={data.weight_kg || ''}
          onChange={(e) => onChange('weight_kg', parseFloat(e.target.value))}
          placeholder="مثلاً 1500"
        />
      </div>
    </div>
  );
}