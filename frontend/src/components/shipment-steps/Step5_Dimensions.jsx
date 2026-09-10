export default function Step5_Dimensions({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">۵. ابعاد و بسته‌بندی</h3>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">توضیحات ابعاد یا نوع بسته‌بندی (اختیاری):</label>
        <input
          type="text"
          className="w-full rounded border p-2"
          placeholder="مثلاً: پالت‌بندی شده، طول ۲ متر"
          onChange={(e) => onChange('packing_details', e.target.value)}
        />
      </div>
    </div>
  );
}