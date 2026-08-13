import React from 'react';
import Login from '../components/Login';

export default function LoginPage({ onLogin, postToGas }) {
  return <Login onLogin={onLogin} postToGas={postToGas} />;
}
