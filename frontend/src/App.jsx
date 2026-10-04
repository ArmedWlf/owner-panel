import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateShipment from "./pages/shipment/CreateShipment";
import ShipmentHistory from "./pages/shipment/ShipmentHistory";
import ShipmentDetail from "./pages/shipment/ShipmentDetail";
import Notifications from "./pages/notification/Notifications";
import Complaints from "./pages/complaint/Complaints";
import Profile from "./pages/profile/Profile";
import OwnerLayout from "./layouts/OwnerLayout";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-route-bg text-sm text-ink-300">
        در حال بارگذاری...
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <OwnerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-shipment" element={<CreateShipment />} />
        <Route path="/shipments" element={<ShipmentHistory />} />
        <Route path="/shipments/:id" element={<ShipmentDetail />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
