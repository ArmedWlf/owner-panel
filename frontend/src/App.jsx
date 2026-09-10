import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/auth/Login';
import CreateShipment from './pages/shipment/CreateShipment';

// کامپوننت محافظت از صفحات خصوصی
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-10 text-center">در حال بارگذاری...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/create-shipment"
        element={
          <ProtectedRoute>
            <CreateShipment />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/create-shipment" replace />} />
    </Routes>
  );
}