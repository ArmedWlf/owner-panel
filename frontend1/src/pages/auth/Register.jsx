import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Building2, Phone, Lock, ArrowLeft } from 'lucide-react';
import api from '../../api/axios.config';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import AuthShell from './AuthShell';

export default function Register() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    company_name: '',
    phone_number: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'ثبت‌نام با خطا مواجه شد.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="ساخت حساب صاحب کالا"
      subtitle="چند اطلاعات کوتاه، بعدش مستقیم می‌ری سراغ ثبت اولین بارت."
    >
      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="نام"
            icon={User}
            value={form.first_name}
            onChange={update('first_name')}
            required
          />
          <Input
            label="نام خانوادگی"
            value={form.last_name}
            onChange={update('last_name')}
            required
          />
        </div>
        <Input
          label="نام شرکت (اختیاری)"
          icon={Building2}
          value={form.company_name}
          onChange={update('company_name')}
          placeholder="مثلاً: بازرگانی نوین بار"
        />
        <Input
          label="شماره موبایل"
          icon={Phone}
          type="tel"
          dir="ltr"
          className="text-left tabular"
          placeholder="0912xxxxxxx"
          value={form.phone_number}
          onChange={update('phone_number')}
          required
        />
        <Input
          label="رمز عبور"
          icon={Lock}
          type="password"
          hint="حداقل ۸ کاراکتر"
          value={form.password}
          onChange={update('password')}
          required
        />
        <Button type="submit" variant="accent" size="lg" loading={loading} className="w-full">
          ساخت حساب
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-300">
        قبلاً ثبت‌نام کردی؟{' '}
        <Link to="/login" className="inline-flex items-center gap-1 font-medium text-ink-700 hover:text-amber-600">
          ورود به حساب
          <ArrowLeft size={14} />
        </Link>
      </p>
    </AuthShell>
  );
}
