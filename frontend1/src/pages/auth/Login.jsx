import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import AuthShell from './AuthShell';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(phoneNumber, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'شماره موبایل یا رمز عبور اشتباه است.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="خوش برگشتی"
      subtitle="وارد پنل صاحب کالا شو و بارت رو در کمتر از ۲ دقیقه ثبت کن."
    >
      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="شماره موبایل"
          icon={Phone}
          type="tel"
          dir="ltr"
          className="text-left tabular"
          placeholder="0912xxxxxxx"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <Input
          label="رمز عبور"
          icon={Lock}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="accent" size="lg" loading={loading} className="w-full">
          ورود به پنل
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-300">
        هنوز حساب کاربری نساختی؟{' '}
        <Link to="/register" className="inline-flex items-center gap-1 font-medium text-ink-700 hover:text-amber-600">
          ثبت‌نام صاحب کالا
          <ArrowLeft size={14} />
        </Link>
      </p>
    </AuthShell>
  );
}
