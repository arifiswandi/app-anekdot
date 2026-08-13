import React from 'react';

export default function ExportButton({
  label,
  onClick,
  variant = 'default',
  loading = false,
  disabled = false,
}) {
  const resolvedLabel = typeof label === 'string' ? { text: label } : label;
  const className = `export-button ${
    variant === 'excel'
      ? 'excel-button'
      : variant === 'pdf'
        ? 'pdf-button'
        : variant === 'import'
          ? 'import-button'
          : 'default-button'
  }`;

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading ? 'true' : 'false'}
    >
      <span className="button-content">
        <span className={`button-icon ${loading ? 'is-loading' : ''}`} aria-hidden="true">
          {loading ? '⏳' : resolvedLabel.icon || '•'}
        </span>
        <span>{loading ? resolvedLabel.loadingText || 'Memproses...' : resolvedLabel.text}</span>
      </span>
    </button>
  );
}
