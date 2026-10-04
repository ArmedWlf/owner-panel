import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  PackagePlus,
  History,
  Bell,
  ShieldAlert,
  LogOut,
  Truck,
  User,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { getMyNotifications } from "../../api/notification.api";
import Avatar from "./Avatar";
import Modal from "./Modal";
import Button from "./Button";

const links = [
  { to: "/dashboard", label: "داشبورد", icon: LayoutGrid },
  { to: "/create-shipment", label: "ثبت بار جدید", icon: PackagePlus },
  { to: "/shipments", label: "بارهای من", icon: History },
  { to: "/notifications", label: "اعلان‌ها", icon: Bell, badgeKey: "unread" },
  { to: "/complaints", label: "ثبت شکایت", icon: ShieldAlert },
  { to: "/profile", label: "پروفایل", icon: User },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [unread, setUnread] = useState(0);
  const [logoutOpen, setLogoutOpen] = useState(false);

  useEffect(() => {
    getMyNotifications()
      .then((items) => setUnread(items.filter((i) => !i.is_read).length))
      .catch(() => {});
  }, []);

  // خروج واقعی فقط بعد از تأیید در Modal انجام می‌شود
  const handleLogout = () => {
    setLogoutOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <>
      <aside className="relative flex h-full w-64 shrink-0 flex-col overflow-hidden bg-ink-950 text-ink-100">
        <div className="pointer-events-none absolute inset-0 bg-ink-radial" />

        <div className="relative flex items-center gap-2.5 px-6 py-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-gradient text-ink-950 shadow-glow">
            <Truck size={19} strokeWidth={2.5} />
          </span>
          <div className="leading-tight">
            <p className="text-[15px] font-bold text-white">ترابر</p>
            <p className="text-[11px] text-ink-300">پنل صاحب کالا</p>
          </div>
        </div>

        <nav className="relative flex-1 space-y-1 px-3">
          {links.map(({ to, label, icon: Icon, badgeKey }) => {
            const isActive = location.pathname === to;
            return (
              <NavLink
                key={to}
                to={to}
                className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "font-medium text-white"
                    : "text-ink-300 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 rounded-lg bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon size={18} strokeWidth={2} className="relative" />
                <span className="relative flex-1">{label}</span>
                {badgeKey === "unread" && unread > 0 && (
                  <span className="tabular relative flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber-500 px-1 text-[11px] font-bold text-ink-950">
                    {unread}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="relative border-t border-white/10 p-3">
          <div className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2">
            <Avatar
              avatarUrl={user?.avatar_url}
              firstName={user?.first_name}
              lastName={user?.last_name}
            />
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-sm text-white">
                {user?.first_name
                  ? `${user.first_name} ${user.last_name}`
                  : user?.phone_number}
              </p>
            </div>
          </div>
          <button
            onClick={() => setLogoutOpen(true)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-300 transition-colors hover:bg-red-500/15 hover:text-red-300"
          >
            <LogOut size={18} strokeWidth={2} />
            خروج از حساب
          </button>
        </div>
      </aside>

      <Modal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        title="خروج از حساب"
        footer={
          <>
            <Button variant="ghost" onClick={() => setLogoutOpen(false)}>
              انصراف
            </Button>
            <Button
              variant="danger"
              className="!bg-red-50 hover:!bg-red-100"
              onClick={handleLogout}
            >
              خروج از حساب
            </Button>
          </>
        }
      >
        آیا مطمئنی که می‌خواهی از اکانتت خارج شوی؟
      </Modal>
    </>
  );
}
