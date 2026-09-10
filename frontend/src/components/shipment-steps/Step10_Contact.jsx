export default function Step10_Contact({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">۱۰. اطلاعات گیرنده بار</h3>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">نام و نام خانوادگی گیرنده:</label>
        <input
          type="text"
          className="w-full rounded border p-2"
          value={data.receiver_name || ''}
          onChange={(e) => onChange('receiver_name', e.target.value)}
          placeholder="علی رضایی"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">شماره تماس گیرنده:</label>
        <input
          type="text"
          className="w-full rounded border p-2"
          value={data.receiver_phone || ''}
          onChange={(e) => onChange('receiver_phone', e.target.value)}
          placeholder="09120000000"
        />
      </div>
    </div>
  );
}