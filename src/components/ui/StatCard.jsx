import React from 'react';

export default function StatCard({ label, value, meta }) {
  return (
    <div className="stat-card">
      <span className="stat-label">{label}</span>
      <p className="stat-value">{value}</p>
      <span className="stat-meta">{meta}</span>
    </div>
  );
}
