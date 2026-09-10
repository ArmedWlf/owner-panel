export default function Step9_Insurance({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">۹. ارزش اعلامی جهت بیمه</h3>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">ارزش کل محموله (تومان):</label>
        <input
          type="number"
          className="w-full rounded border p-2"
          value={data.cargo_value || ''}
          onChange={(e) => onChange('cargo_value', parseInt(e.target.value))}
          placeholder="مثلاً 50000000"
        />
      </div>
    </div>
  );
}