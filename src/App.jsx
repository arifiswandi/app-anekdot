import React, { useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { postToGas } from './services/gasService';
import { useStoredUser } from './hooks/useStoredUser';

export default function App() {
  const [user, setUser] = useStoredUser();

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('bk-user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('bk-user');
    }
  }, [user]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={setUser} postToGas={postToGas} />}
        />
        <Route
          path="/dashboard"
          element={user ? <DashboardPage user={user} onLogout={() => setUser(null)} postToGas={postToGas} /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </HashRouter>
  );
}
