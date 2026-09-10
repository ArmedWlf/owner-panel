export default function Step3_CargoType({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">۳. نوع و مشخصات بار</h3>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">شرح کالا / جزئیات محموله:</label>
        <textarea
          rows={3}
          className="w-full rounded border p-2"
          value={data.cargo_details || ''}
          onChange={(e) => onChange('cargo_details', e.target.value)}
          placeholder="مثلاً: ۲۰ کارتن قطعات صنعتی آسیب‌پذیر"
        />
      </div>
    </div>
  );
}