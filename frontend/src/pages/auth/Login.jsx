import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('09123456789');
  const [password, setPassword] = useState('mySecurePassword123');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(phoneNumber, password);
      navigate('/create-shipment');
    } catch (err) {
      setError(err.response?.data?.message || 'خطا در ورود به سیستم');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 dir-rtl">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">ورود به پنل صاحب کالا</h2>
        {error && <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">{error}</div>}
        
        <label className="mb-2 block text-sm font-medium">شماره موبایل:</label>
        <input
          type="text"
          className="mb-4 w-full rounded border p-2"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />

        <label className="mb-2 block text-sm font-medium">رمز عبور:</label>
        <input
          type="password"
          className="mb-6 w-full rounded border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700">
          ورود
        </button>
      </form>
    </div>
  );
}