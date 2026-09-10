export default function Step11_Confirm({ data, onSubmit }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">۱۱. بررسی و تأیید اطلاعات</h3>
      <div className="space-y-2 rounded-lg bg-gray-50 p-4 text-sm leading-relaxed border">
        <p><strong>آدرس مبدأ:</strong> {data.origin_address}</p>
        <p><strong>آدرس مقصد:</strong> {data.dest_address}</p>
        <p><strong>مشخصات کالا:</strong> {data.cargo_details}</p>
        <p><strong>وزن:</strong> {data.weight_kg} کیلوگرم</p>
        <p><strong>ارزش اعلامی:</strong> {Number(data.cargo_value || 0).toLocaleString()} تومان</p>
        <p><strong>کرایه پیشنهادی:</strong> {Number(data.total_price || 0).toLocaleString()} تومان</p>
        <p><strong>گیرنده:</strong> {data.receiver_name} ({data.receiver_phone})</p>
      </div>
      <button
        onClick={onSubmit}
        className="w-full rounded bg-green-600 py-3 text-white font-bold hover:bg-green-700 transition-colors"
      >
        تأیید و ارسال درخواست بار
      </button>
    </div>
  );
}