export default function Step12_Done() {
  return (
    <div className="py-12 text-center space-y-4">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 text-3xl font-bold">
        ✓
      </div>
      <h2 className="text-2xl font-bold text-gray-800">بار شما با موفقیت ثبت شد!</h2>
      <p className="text-gray-600">درخواست شما به رانندگان واجد شرایط ارسال شد.</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
      >
        ثبت بار جدید
      </button>
    </div>
  );
}