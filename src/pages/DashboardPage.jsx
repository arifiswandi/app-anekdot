import React from 'react';
import { RecordsDashboard } from '../features/records';

export default function DashboardPage({ user, onLogout, postToGas }) {
  return <RecordsDashboard user={user} onLogout={onLogout} postToGas={postToGas} />;
}
