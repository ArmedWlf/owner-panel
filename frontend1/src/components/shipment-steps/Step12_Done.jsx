import { Link } from 'react-router-dom';
import { CheckCircle2, LayoutGrid, History } from 'lucide-react';
import Button from '../common/Button';

export default function Step12_Done() {
  return (
    <div className="space-y-6 py-6 text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <CheckCircle2 size={30} />
      </span>
      <div>
        <h2 className="text-xl font-bold text-ink-900">بار شما با موفقیت ثبت شد</h2>
        <p className="mt-1.5 text-sm text-ink-300">
          درخواست شما بررسی و به رانندگان واجد شرایط ارسال می‌شود. به‌محض پیدا شدن راننده، اعلان دریافت می‌کنید.
        </p>
      </div>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Button as={Link} to="/dashboard" variant="ghost" icon={LayoutGrid}>
          بازگشت به داشبورد
        </Button>
        <Button as={Link} to="/shipments" variant="accent" icon={History}>
          مشاهده بارهای من
        </Button>
      </div>
    </div>
  );
}
