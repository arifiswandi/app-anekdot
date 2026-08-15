import React, { useEffect, useState } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

const GAS_URL = 'https://script.google.com/macros/s/AKfycby4No_Yd3lOZ90h4SnwFEohUD_99_q3khqsb8raPeUCQl7bX63R81FCjueejU--GP1O/exec'; // PASTE URL WEB APP ANDA DI SINI

// const GAS_URL = '/api/gas'; // PASTE URL WEB APP ANDA DI SINI

const postToGas = async (payload, actionLabel = 'permintaan') => {
  const response = await fetch(GAS_URL, {
    method: 'POST',    
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let data = {};

  if (text) {
    try {
      data = JSON.parse(text);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      throw new Error(`${actionLabel} gagal: server mengembalikan format bukan JSON. Status: ${response.status}. Detail: ${text.slice(0, 200)}`);
    }
  }

  if (!response.ok) {
    throw new Error(`${actionLabel} gagal. Status: ${response.status}. ${data.message || text || 'Server tidak merespons.'}`);
  }

  return data;
};

const SESSION_KEY = 'bk-user';

const readStoredUser = () => {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export default function App() {
  const [user, setUser] = useState(() => readStoredUser());

  useEffect(() => {
    if (user) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(SESSION_KEY);
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
