import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';

export default function OwnerLayout() {
  return (
    <div className="flex min-h-screen bg-route-bg" dir="rtl">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-6 py-8 md:px-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
