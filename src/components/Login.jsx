import React, { useState } from 'react';

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
    <>
      <style>{`
        * { box-sizing: border-box; }
        body {
          margin: 0;
          background: #f4f7fb;
        }
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px;
          background:
            radial-gradient(circle at top left, rgba(15,118,110,0.18), transparent 30%),
            radial-gradient(circle at bottom right, rgba(212,167,60,0.2), transparent 28%),
            linear-gradient(135deg, #f3f7ff 0%, #edf8f3 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .login-shell {
          width: min(1200px, 100%);
          display: grid;
          grid-template-columns: 1.2fr 0.95fr;
          gap: 24px;
          align-items: center;
        }
        .login-hero {
          background: linear-gradient(135deg, #102a43 0%, #14486d 100%);
          border-radius: 28px;
          min-height: 620px;
          padding: 48px 40px;
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .login-hero::before,
        .login-hero::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
        }
        .login-hero::before {
          width: 420px;
          height: 420px;
          top: -160px;
          right: -100px;
        }
        .login-hero::after {
          width: 240px;
          height: 240px;
          left: -70px;
          bottom: -50px;
        }
        .hero-badge {
          width: 90px;
          height: 90px;
          border-radius: 24px;
          background: linear-gradient(135deg, #d4a73c, #f1c75d);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 900;
          color: #102a43;
          box-shadow: 0 18px 28px rgba(212,167,60,0.3);
          position: relative;
          z-index: 1;
        }
        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 480px;
        }
        .hero-content h1 {
          margin: 22px 0 12px;
          font-size: clamp(2.1rem, 3vw, 3.5rem);
          line-height: 1.1;
        }
        .hero-content p {
          margin: 0 0 28px;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.82);
          line-height: 1.7;
        }
        .hero-points {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .hero-points li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.9);
          font-weight: 600;
        }
        .hero-points li::before {
          content: "✓";
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(212,167,60,0.2);
          color: #f7d77e;
          font-size: 0.9rem;
        }
        .login-card {
          width: 100%;
          max-width: 470px;
          margin: 0 auto;
          background: rgba(255,255,255,0.94);
          border: 1px solid rgba(15, 76, 92, 0.08);
          border-top: 6px solid #d4a73c;
          border-radius: 24px;
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
          padding: 30px 26px 28px;
          position: relative;
          overflow: hidden;
        }
        .login-card::before {
          content: "";
          position: absolute;
          inset: 0 auto auto 0;
          width: 180px;
          height: 180px;
          background: rgba(16,42,67,0.04);
          border-radius: 50%;
          transform: translate(-30%, -30%);
        }
        .login-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 14px;
          margin-bottom: 22px;
          position: relative;
          z-index: 1;
        }
        .school-badge {
          width: 74px;
          height: 74px;
          border-radius: 50%;
          background: linear-gradient(135deg, #102a43, #1d5c7b);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: 1px;
          box-shadow: 0 18px 35px rgba(16,42,67,0.18);
        }
        .login-brand h2 {
          margin: 0;
          font-size: clamp(1.7rem, 2vw, 2.2rem);
          color: #102a43;
        }
        .login-brand p {
          margin: 0;
          color: #52667d;
          font-size: 0.93rem;
          letter-spacing: 0.03em;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
          z-index: 1;
        }
        .login-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .login-field label {
          font-weight: 700;
          color: #233a4f;
          font-size: 0.92rem;
        }
        .login-input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid #d7e1ec;
          background: #f8fafc;
          font-size: 1rem;
          transition: all 0.2s ease;
          color: #102a43;
        }
        .login-input:focus {
          outline: none;
          border-color: #0f766e;
          box-shadow: 0 0 0 4px rgba(15,118,110,0.12);
          background: #fff;
        }
        .login-button {
          width: 100%;
          padding: 14px 16px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #0f766e, #0b5e64);
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 12px 20px rgba(15,118,110,0.22);
        }
        .login-button:hover {
          transform: translateY(-1px);
        }
        .login-button:disabled {
          opacity: 0.72;
          cursor: not-allowed;
        }

        @media (max-width: 900px) {
          .login-shell {
            grid-template-columns: 1fr;
          }
          .login-hero {
            min-height: 280px;
            padding: 34px 22px;
          }
          .hero-content {
            max-width: none;
          }
          .hero-content h1 {
            margin-top: 14px;
          }
        }
      `}</style>

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
    </>
  );
}
