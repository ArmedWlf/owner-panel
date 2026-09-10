export default function Step7_Price({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">۷. قیمت و کرایه حمل (تومان)</h3>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">مبلغ کرایه پیشنهادی:</label>
        <input
          type="number"
          className="w-full rounded border p-2"
          value={data.total_price || ''}
          onChange={(e) => onChange('total_price', parseInt(e.target.value))}
          placeholder="مثلاً 3500000"
        />
      </div>
    </div>
  );
}