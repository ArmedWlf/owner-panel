import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  PackagePlus,
  History,
  Bell,
  Star,
  ShieldAlert,
  LogOut,
  Truck,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const mainLinks = [
  { to: '/dashboard', label: 'داشبورد', icon: LayoutGrid },
  { to: '/create-shipment', label: 'ثبت بار جدید', icon: PackagePlus },
  { to: '/shipments', label: 'بارهای من', icon: History },
];

const soonLinks = [
  { label: 'اعلان‌ها', icon: Bell },
  { label: 'امتیاز من', icon: Star },
  { label: 'ثبت شکایت', icon: ShieldAlert },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col bg-ink-950 text-ink-100">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-ink-950">
          <Truck size={19} strokeWidth={2.5} />
        </span>
        <div className="leading-tight">
          <p className="text-[15px] font-bold text-white">ترابر</p>
          <p className="text-[11px] text-ink-300">پنل صاحب کالا</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {mainLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-white/10 font-medium text-white'
                  : 'text-ink-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={18} strokeWidth={2} />
            {label}
          </NavLink>
        ))}

        <p className="mb-1 mt-5 px-3 text-[11px] font-medium text-ink-500">به‌زودی</p>
        {soonLinks.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-500"
          >
            <Icon size={18} strokeWidth={2} />
            {label}
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <div className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
            {(user?.phone_number || '?').slice(-2)}
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm text-white">{user?.phone_number}</p>
            <p className="text-[11px] text-ink-400">صاحب کالا</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-300 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut size={18} strokeWidth={2} />
          خروج از حساب
        </button>
      </div>
    </aside>
  );
}
