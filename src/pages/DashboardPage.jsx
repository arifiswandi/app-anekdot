import React from 'react';
import Dashboard from '../components/Dashboard';

export default function DashboardPage({ user, onLogout, postToGas }) {
  return <Dashboard user={user} onLogout={onLogout} postToGas={postToGas} />;
}
