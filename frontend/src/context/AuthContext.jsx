import { createContext, useState, useEffect } from 'react';
import { requestOtp, verifyOtp } from '../api/auth.api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const sendOtp = async (phoneNumber) => {
    return requestOtp(phoneNumber); // { devOtpCode } در حالت توسعه
  };

  // profile فقط برای کاربر جدید لازم است؛ برای کاربر قدیمی نادیده گرفته می‌شود
  const confirmOtp = async (phoneNumber, otpCode, profile) => {
    const data = await verifyOtp({ phoneNumber, otpCode, profile });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, sendOtp, confirmOtp, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
