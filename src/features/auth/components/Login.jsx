import React, { useState } from 'react';
import './Login.css';

export default function Login({ onLogin, postToGas }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await postToGas({ action: 'login', username, password }, 'Login');

      if (data.success) {
        onLogin({ username: data.username, role: data.role });
      } else {
        alert(data.message || 'Login gagal.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert(`Terjadi kesalahan koneksi.\n${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-shell">
        <div className="login-hero">
          <div className="hero-content">
            <div className="hero-badge">BK</div>
            <h1>Catatan Anekdot Siswa</h1>
            <p>
              Portal pendataan dan pencatatan perilaku siswa untuk mendukung pelayanan Bimbingan Konseling secara cepat, rapi, dan profesional.
            </p>
            <ul className="hero-points">
              <li>Input data siswa lebih cepat</li>
              <li>Monitoring perilaku dan penanganan</li>
              <li>Rekap data yang tertata dengan baik</li>
            </ul>
          </div>
        </div>

        <div className="login-card">
          <div className="login-brand">
            <div className="school-badge">BK</div>
            <h2>Login Aplikasi BK</h2>
            <p>MTsN 1 Mojokerto | Sistem Catatan Anekdot</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                className="login-input"
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className="login-input"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="login-button" type="submit" disabled={loading}>
              {loading ? 'Memproses...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
