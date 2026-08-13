import React, { useState, useEffect, useRef } from 'react';
import StatCard from './StatCard';
import ExportButton from './ExportButton';
import { exportWorkbookAsExcel } from '../utils/exportExcel';
import { readWorkbookFromFile } from '../utils/importExcel';

const normalizeImportKey = (key) => String(key ?? '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');

const normalizeDateValue = (value) => {
  if (!value) return '';

  if (typeof value === 'number' && Number.isFinite(value)) {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const parsed = new Date(excelEpoch.getTime() + value * 86400000);
    return parsed.toISOString().slice(0, 10);
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return '';

    const direct = new Date(trimmed);
    if (!Number.isNaN(direct.getTime())) {
      return direct.toISOString().slice(0, 10);
    }

    const match = trimmed.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
    if (match) {
      const [, day, month, year] = match;
      const normalizedYear = year.length === 2 ? `20${year}` : year;
      const parsed = new Date(`${normalizedYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed.toISOString().slice(0, 10);
      }
    }

    return trimmed;
  }

  return String(value).trim();
};

const normalizeImportedRecord = (row) => {
  const result = {};

  Object.entries(row || {}).forEach(([key, value]) => {
    const normalizedKey = normalizeImportKey(key);
    const cleanValue = value == null ? '' : String(value).trim();

    if (!normalizedKey || !cleanValue) return;

    if (normalizedKey.includes('tanggal')) {
      result.Tanggal = normalizeDateValue(value);
    } else if (normalizedKey.includes('namasiswa') || normalizedKey.includes('siswa')) {
      result.NamaSiswa = cleanValue;
    } else if (normalizedKey.includes('kelas')) {
      result.Kelas = cleanValue;
    } else if (normalizedKey.includes('kejadian') || normalizedKey.includes('perilaku')) {
      result.Kejadian = cleanValue;
    } else if (normalizedKey.includes('penanganan') || normalizedKey.includes('tindaklanjut')) {
      result.Penanganan = cleanValue;
    } else if (normalizedKey.includes('keterangan')) {
      result.Keterangan = cleanValue;
    }
  });

  return {
    ID: '',
    Tanggal: result.Tanggal || '',
    NamaSiswa: result.NamaSiswa || '',
    Kelas: result.Kelas || '',
    Kejadian: result.Kejadian || '',
    Penanganan: result.Penanganan || '',
    Keterangan: result.Keterangan || '',
  };
};

export default function Dashboard({ user, onLogout, postToGas }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [formData, setFormData] = useState({ ID: '', Tanggal: '', NamaSiswa: '', Kelas: '', Kejadian: '', Penanganan: '', Keterangan: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const fileInputRef = useRef(null);
  const actionBusy = loading || exporting || importing;

  const resetForm = () => {
    setFormData({ ID: '', Tanggal: '', NamaSiswa: '', Kelas: '', Kejadian: '', Penanganan: '', Keterangan: '' });
    setIsEditing(false);
    setIsFormOpen(false);
  };

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const data = await postToGas({ action: 'read' }, 'Memuat data');
      if (data.success) {
        setRecords(data.data || []);
      } else {
        alert(data.message || 'Gagal memuat data.');
      }
    } catch (err) {
      console.error('Fetch records error:', err);
      alert(`Terjadi kesalahan koneksi.\n${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = isEditing ? 'update' : 'create';

    setLoading(true);
    try {
      const data = await postToGas({ action, payload: formData }, isEditing ? 'Update data' : 'Simpan data');

      if (data.success !== false) {
        resetForm();
        await fetchRecords();
      } else {
        alert(data.message || 'Gagal menyimpan data');
      }
    } catch (err) {
      console.error('Save data error:', err);
      alert(`Terjadi kesalahan saat menyimpan data.\n${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    if (!Number.isNaN(d.getTime())) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  };

  const openFormModal = () => {
    setIsFormOpen(true);
  };

  const closeFormModal = () => {
    resetForm();
  };

  const handleEdit = (record) => {
    setFormData({
      ...record,
      Tanggal: formatDateForInput(record.Tanggal),
    });
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus catatan ini?')) return;

    setLoading(true);
    try {
      const data = await postToGas({ action: 'delete', id }, 'Hapus data');
      if (data.success === false) {
        alert(data.message || 'Gagal menghapus data.');
      } else {
        await fetchRecords();
      }
    } catch (err) {
      console.error('Delete data error:', err);
      alert(`Terjadi kesalahan saat menghapus data.\n${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    resetForm();
  };

  const getExportFilename = (extension) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `catatan-anekdot-${year}-${month}-${day}.${extension}`;
  };

  const getExportRows = () => records.map((item) => [
    item.Tanggal ? formatDateForInput(item.Tanggal) : '',
    item.NamaSiswa || '',
    item.Kelas || '',
    item.Kejadian || '',
    item.Penanganan || '',
    item.Keterangan || '',
  ]);

  const exportToExcel = async () => {
    if (!records.length) {
      alert('Belum ada data yang bisa diekspor.');
      return;
    }

    setExporting(true);
    try {
      const headers = ['Tanggal', 'Nama Siswa', 'Kelas', 'Kejadian', 'Penanganan', 'Keterangan'];
      const rows = [headers, ...getExportRows()];
      await exportWorkbookAsExcel(rows, getExportFilename('xlsx'), 'Catatan Anekdot');
    } catch (error) {
      console.error('Export Excel error:', error);
      alert(error.message || 'Gagal mengekspor file Excel.');
    } finally {
      setExporting(false);
    }
  };

  const exportToPdf = async () => {
    if (!records.length) {
      alert('Belum ada data yang bisa diekspor.');
      return;
    }

    setExporting(true);

    try {
      const rows = getExportRows();
      const tableRows = rows
        .map((row) => `
          <tr>
            ${row.map((cell) => `<td>${String(cell).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>`).join('')}
          </tr>
        `)
        .join('');

      const printWindow = window.open('', '_blank', 'width=1200,height=900');
      if (!printWindow) {
        throw new Error('Pop-up diblokir. Izinkan pop-up untuk mengekspor PDF.');
      }

      const today = new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });

      printWindow.document.write(`
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Catatan Anekdot BK</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 32px;
                color: #102a43;
                background: #ffffff;
              }
              .report-header {
                border-bottom: 3px solid #102a43;
                padding-bottom: 14px;
                margin-bottom: 18px;
              }
              .report-title {
                font-size: 28px;
                font-weight: 700;
                margin: 0;
              }
              .report-subtitle {
                font-size: 13px;
                color: #475569;
                margin-top: 6px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 18px;
                font-size: 12px;
              }
              th, td {
                border: 1px solid #cbd5e1;
                padding: 8px 10px;
                text-align: left;
                vertical-align: top;
              }
              th {
                background: #e2e8f0;
                font-weight: 700;
              }
              .report-meta {
                margin-top: 12px;
                font-size: 12px;
                color: #334155;
              }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>
            <div class="report-header">
              <div class="report-title">Catatan Anekdot BK</div>
              <div class="report-subtitle">MTsN 1 Mojokerto</div>
            </div>
            <div class="report-meta">
              <strong>Tanggal cetak:</strong> ${today}
            </div>
            <table>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Nama Siswa</th>
                  <th>Kelas</th>
                  <th>Kejadian</th>
                  <th>Penanganan</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>
          </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 300);
    } catch (error) {
      console.error('Export PDF error:', error);
      alert(error.message || 'Gagal mengekspor file PDF.');
    } finally {
      setTimeout(() => setExporting(false), 350);
    }
  };

  const handleImportExcel = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!/\.(xlsx|xls)$/i.test(file.name)) {
      alert('File yang didukung hanya .xlsx atau .xls');
      event.target.value = '';
      return;
    }

    setImporting(true);

    try {
      const rows = await readWorkbookFromFile(file);
      const normalizedRows = rows
        .map(normalizeImportedRecord)
        .filter((row) => row.NamaSiswa || row.Kelas || row.Kejadian || row.Penanganan || row.Keterangan || row.Tanggal);

      if (!normalizedRows.length) {
        alert('File Excel tidak berisi data yang valid untuk diimpor.');
        return;
      }

      for (const item of normalizedRows) {
        await postToGas({ action: 'create', payload: item }, 'Impor data Excel');
      }

      await fetchRecords();
      alert(`${normalizedRows.length} data berhasil diimpor dari file Excel.`);
    } catch (error) {
      console.error('Import Excel error:', error);
      alert(error.message || 'Gagal mengimpor file Excel.');
    } finally {
      setImporting(false);
      event.target.value = '';
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body {
          margin: 0;
          background: #f3f7fb;
        }
        .app-page {
          min-height: 100vh;
          padding: 28px 24px 32px;
          background:
            radial-gradient(circle at top left, rgba(16,42,67,0.12), transparent 28%),
            radial-gradient(circle at bottom right, rgba(212,167,60,0.12), transparent 25%),
            linear-gradient(135deg, #f4f8fc 0%, #edf8f3 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #1f2937;
        }
        .app-shell {
          max-width: 1280px;
          margin: 0 auto;
        }
        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          background: linear-gradient(135deg, #102a43 0%, #14486d 100%);
          border-radius: 24px;
          padding: 20px 24px;
          box-shadow: 0 22px 50px rgba(16,42,67,0.2);
          position: relative;
          overflow: hidden;
        }
        .topbar::before {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: rgba(212,167,60,0.14);
          right: -24px;
          top: -34px;
        }
        .brand-wrap {
          display: flex;
          align-items: center;
          gap: 14px;
          position: relative;
          z-index: 1;
        }
        .school-logo {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, #d4a73c, #b98518);
          color: #102a43;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 800;
          box-shadow: 0 12px 24px rgba(212,167,60,0.3);
        }
        .brand-title {
          margin: 0;
          color: #ffffff;
          font-size: clamp(1.5rem, 2vw, 2.2rem);
        }
        .brand-subtitle {
          display: block;
          color: rgba(255,255,255,0.78);
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .topbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: flex-end;
          position: relative;
          z-index: 1;
        }
        .user-pill {
          padding: 9px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.14);
          border: 1px solid rgba(255,255,255,0.18);
          color: #f8fafc;
          font-weight: 600;
          font-size: 0.88rem;
        }
        .logout-button,
        .table-action,
        .primary-button,
        .secondary-button,
        .danger-button,
        .modal-close,
        .export-button {
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 700;
        }
        .logout-button {
          padding: 10px 16px;
          background: linear-gradient(135deg, #d64545, #b42318);
          color: white;
          box-shadow: 0 12px 20px rgba(212,69,69,0.2);
        }
        .logout-button:hover,
        .primary-button:hover,
        .secondary-button:hover,
        .danger-button:hover,
        .table-action:hover,
        .export-button:hover,
        .save-button:hover,
        .modal-close:hover {
          transform: translateY(-1px);
          filter: brightness(0.98);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(180px, 1fr));
          gap: 18px;
          margin-top: 20px;
        }
        .stat-card {
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-left: 5px solid #d4a73c;
          border-radius: 20px;
          box-shadow: 0 18px 35px rgba(15, 23, 42, 0.06);
          padding: 16px 18px;
        }
        .stat-label {
          display: block;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #64748b;
          margin-bottom: 8px;
        }
        .stat-value {
          font-size: clamp(1.5rem, 2vw, 2.1rem);
          font-weight: 800;
          color: #102a43;
          margin: 0;
        }
        .stat-meta {
          display: inline-block;
          margin-top: 8px;
          font-size: 0.8rem;
          color: #0f766e;
          font-weight: 600;
        }
        .panel {
          margin-top: 22px;
          background: rgba(255,255,255,0.9);
          border-radius: 24px;
          border: 1px solid rgba(148, 163, 184, 0.18);
          box-shadow: 0 22px 40px rgba(15, 23, 42, 0.07);
          padding: 24px 20px 18px;
        }
        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
          margin-bottom: 18px;
        }
        .panel-header h3 {
          margin: 0;
          font-size: clamp(1.2rem, 1.7vw, 1.7rem);
          color: #102a43;
        }
        .panel-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .primary-button,
        .export-button {
          padding: 12px 18px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
          font-size: 0.92rem;
          box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
        }
        .primary-button {
          background: linear-gradient(135deg, #0f766e, #0b5e64);
          color: white;
          box-shadow: 0 14px 26px rgba(15,118,110,0.24);
        }
        .export-button {
          min-width: 132px;
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f8fbff, #edf4ff);
          color: #1e3a5f;
          border-color: rgba(148, 163, 184, 0.35);
          box-shadow: 0 8px 18px rgba(37, 99, 235, 0.08);
        }
        .export-button.default-button,
        .export-button.import-button {
          background: linear-gradient(135deg, #eff6ff, #dbeafe);
          color: #1d4ed8;
          border-color: rgba(96, 165, 250, 0.45);
        }
        .export-button.pdf-button {
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          color: #334155;
          border-color: rgba(148, 163, 184, 0.35);
        }
        .export-button.excel-button {
          background: linear-gradient(135deg, #ecfdf5, #d1fae5);
          color: #166534;
          border-color: rgba(34, 197, 94, 0.3);
        }
        .export-button:disabled,
        .primary-button:disabled {
          opacity: 0.72;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        .button-content {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          font-weight: 700;
        }
        .button-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 6px;
          font-size: 0.95rem;
          transition: transform 0.2s ease;
        }
        .button-icon.is-loading {
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .table-wrap {
          width: 100%;
          overflow-x: auto;
          border-radius: 18px;
          border: 1px solid #dfeaf2;
          background: #fff;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1160px;
          table-layout: fixed;
          background: #fff;
        }
        thead th {
          text-align: left;
          background: linear-gradient(135deg, #e9f1f8, #dfeef7);
          color: #102a43;
          padding: 14px 12px;
          font-weight: 800;
          border-bottom: 1px solid #dbe6ef;
          vertical-align: middle;
        }
        thead th:nth-child(1) { width: 120px; }
        thead th:nth-child(2) { width: 170px; }
        thead th:nth-child(3) { width: 120px; }
        thead th:nth-child(4), thead th:nth-child(5) { width: 260px; }
        thead th:nth-child(6) { width: 180px; }
        tbody td {
          padding: 12px;
          border-bottom: 1px solid #edf2f7;
          vertical-align: top;
          color: #334155;
          line-height: 1.55;
        }
        tbody tr:nth-child(even) {
          background: rgba(248,250,252,0.92);
        }
        tbody tr:hover {
          background: rgba(236,249,255,0.65);
        }
        .table-actions {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 8px;
          flex-wrap: wrap;
          min-width: 160px;
        }
        .table-action,
        .danger-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 12px;
          border-radius: 12px;
          font-size: 0.82rem;
          line-height: 1;
          width: 104px;
          min-width: 104px;
          flex: 0 0 104px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.06);
        }
        .table-action {
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          color: #0f172a;
        }
        .danger-button {
          background: linear-gradient(135deg, #f87171, #dc2626);
          color: white;
          border-color: rgba(153, 27, 27, 0.18);
          box-shadow: 0 10px 20px rgba(220, 38, 38, 0.18);
        }
        .table-text {
          max-width: 260px;
          white-space: normal;
          word-break: break-word;
          line-height: 1.55;
        }
        .status-text {
          color: #475569;
          font-weight: 600;
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 1000;
        }
        .modal-card {
          width: 100%;
          max-width: 640px;
          max-height: calc(100vh - 40px);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(148, 163, 184, 0.18);
          border-top: 6px solid #d4a73c;
          border-radius: 28px;
          padding: 0;
          box-shadow: 0 30px 80px rgba(15, 23, 42, 0.22);
          overscroll-behavior: contain;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .modal-card::-webkit-scrollbar {
          display: none;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 22px 22px 16px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.18);
          background: linear-gradient(135deg, rgba(16,42,67,0.98), rgba(20,72,109,0.98));
          box-shadow: inset 0 -1px 0 rgba(255,255,255,0.06);
        }
        .modal-header h3 {
          margin: 0;
          color: #ffffff;
          font-size: 1.45rem;
          letter-spacing: 0.01em;
        }
        .modal-close {
          width: 38px;
          height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.14);
          color: #ffffff;
          font-size: 1.5rem;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow: 0 8px 16px rgba(15, 23, 42, 0.12);
        }
        .modal-body {
          padding: 20px 22px 18px;
        }
        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .field-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }
        .field-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .field-group.full {
          grid-column: 1 / -1;
        }
        .field-group label {
          font-size: 0.9rem;
          font-weight: 700;
          color: #334155;
        }
        .form-input,
        .form-textarea {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid #d6e1eb;
          background: #f8fafc;
          font-size: 0.96rem;
          color: #102a43;
          resize: vertical;
          transition: all 0.2s ease;
          box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.04);
        }
        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #0f766e;
          box-shadow: 0 0 0 4px rgba(15,118,110,0.12), inset 0 1px 2px rgba(15, 23, 42, 0.04);
          background: #fff;
        }
        .button-row {
          display: flex;
          gap: 10px;
          margin-top: 8px;
          padding-top: 12px;
          border-top: 1px solid rgba(148, 163, 184, 0.18);
        }
        .secondary-button {
          flex: 1;
          padding: 12px 14px;
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          color: #0f172a;
          border: 1px solid rgba(148, 163, 184, 0.22);
          box-shadow: 0 10px 18px rgba(15, 23, 42, 0.04);
        }
        .save-button {
          flex: 1;
          padding: 12px 14px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #16a34a, #15803d);
          color: white;
          cursor: pointer;
          box-shadow: 0 12px 22px rgba(22,163,74,0.2);
        }
        @media (max-width: 768px) {
          .app-page {
            padding: 18px 14px 26px;
          }
          .topbar,
          .panel-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .brand-wrap {
            width: 100%;
          }
          .topbar-right {
            width: 100%;
            justify-content: space-between;
          }
          .panel-actions {
            width: 100%;
            justify-content: stretch;
          }
          .panel-actions > * {
            flex: 1 1 140px;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .field-grid {
            grid-template-columns: 1fr;
          }
          .button-row {
            flex-direction: column;
          }
          .modal-card {
            max-height: calc(100vh - 20px);
          }
          .modal-header,
          .modal-body {
            padding-left: 16px;
            padding-right: 16px;
          }
        }
        @media print {
          body * {
            visibility: hidden;
          }
          .app-page,
          .app-page * {
            visibility: visible;
          }
          .topbar,
          .stats-grid,
          .panel-actions,
          .logout-button,
          .table-actions {
            display: none !important;
          }
          .app-page {
            background: white;
            padding: 0;
          }
          .panel {
            box-shadow: none;
            border: none;
            padding: 0;
            margin: 0;
          }
          .table-wrap {
            overflow: visible;
            border: 1px solid #dfeaf2;
          }
          table {
            min-width: 100% !important;
          }
        }
      `}</style>

      <div className="app-page">
        <div className="app-shell">
          <div className="topbar">
            <div className="brand-wrap">
              <div className="school-logo">BK</div>
              <div>
                <h2 className="brand-title">Catatan Anekdot BK</h2>
                <span className="brand-subtitle">MTsN 1 Mojokerto</span>
              </div>
            </div>
            <div className="topbar-right">
              <span className="user-pill">Halo, {user.username} ({user.role})</span>
              <button className="logout-button" onClick={onLogout}>Logout</button>
            </div>
          </div>

          <div className="stats-grid">
            <StatCard label="Total Catatan" value={records.length} meta="Data aktif" />
            <StatCard label="Siswa Terdata" value={new Set(records.map((item) => item.NamaSiswa)).size} meta="Unique siswa" />
            <StatCard label="Status Sistem" value="Online" meta="Siap digunakan" />
          </div>

          <div className="panel">
            <div className="panel-header">
              <h3>Daftar Catatan Anekdot</h3>
              <div className="panel-actions">
                <input ref={fileInputRef} type="file" accept=".xlsx,.xls" hidden onChange={handleImportExcel} />

                <ExportButton
                  label={{ icon: '📥', text: 'Import', loadingText: 'Mengimpor...' }}
                  variant="import"
                  loading={importing}
                  disabled={actionBusy}
                  onClick={() => fileInputRef.current?.click()}
                />

                <ExportButton
                  label={{ icon: '📄', text: 'PDF', loadingText: 'Membuat PDF...' }}
                  variant="pdf"
                  loading={exporting}
                  disabled={actionBusy}
                  onClick={exportToPdf}
                />
                <ExportButton
                  label={{ icon: '📊', text: 'Excel', loadingText: 'Mengekspor...' }}
                  variant="excel"
                  loading={exporting}
                  disabled={actionBusy}
                  onClick={exportToExcel}
                />
                <button type="button" className="primary-button" onClick={openFormModal}>
                  + Tambah Catatan
                </button>
              </div>
            </div>

            {loading ? <p className="status-text">Memuat data...</p> : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Tanggal</th>
                      <th>Siswa</th>
                      <th>Kelas</th>
                      <th>Kejadian</th>
                      <th>Tindak Lanjut</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r, index) => (
                      <tr key={index}>
                        <td>{formatDateForInput(r.Tanggal)}</td>
                        <td>{r.NamaSiswa}</td>
                        <td>{r.Kelas}</td>
                        <td className="table-text">{r.Kejadian}</td>
                        <td className="table-text">{r.Penanganan}</td>
                        <td>
                          <div className="table-actions">
                            <button type="button" className="table-action" onClick={() => handleEdit(r)}>
                              ✏️ Edit
                            </button>

                            {user.role === 'superuser' && (
                              <button type="button" className="danger-button" onClick={() => handleDelete(r.ID)}>
                                🗑️ Hapus
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {isFormOpen && (
          <div className="modal-overlay">
            <div className="modal-card">
              <div className="modal-header">
                <h3>{isEditing ? 'Edit Catatan' : 'Tambah Catatan Baru'}</h3>
                <button type="button" className="modal-close" onClick={closeFormModal}>×</button>
              </div>

              <div className="modal-body">
                <form className="modal-form" onSubmit={handleSubmit}>
                  <div className="field-grid">
                    <div className="field-group">
                      <label>Tanggal</label>
                      <input className="form-input" type="date" name="Tanggal" value={formData.Tanggal} onChange={handleInputChange} required />
                    </div>

                    <div className="field-group">
                      <label>Kelas</label>
                      <input className="form-input" type="text" name="Kelas" value={formData.Kelas} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className="field-group full">
                    <label>Nama Siswa</label>
                    <input className="form-input" type="text" name="NamaSiswa" value={formData.NamaSiswa} onChange={handleInputChange} required />
                  </div>

                  <div className="field-group full">
                    <label>Kejadian / Perilaku</label>
                    <textarea className="form-textarea" name="Kejadian" value={formData.Kejadian} onChange={handleInputChange} required rows="3" />
                  </div>

                  <div className="field-group full">
                    <label>Tindak Lanjut / Penanganan</label>
                    <textarea className="form-textarea" name="Penanganan" value={formData.Penanganan} onChange={handleInputChange} required rows="3" />
                  </div>

                  <div className="field-group full">
                    <label>Keterangan</label>
                    <input className="form-input" type="text" name="Keterangan" value={formData.Keterangan} onChange={handleInputChange} />
                  </div>

                  <div className="button-row">
                    <button type="submit" disabled={loading} className="save-button">
                      {loading ? 'Menyimpan...' : 'Simpan Catatan'}
                    </button>

                    <button type="button" className="secondary-button" onClick={cancelEdit}>
                      {isEditing ? 'Batal Edit' : 'Tutup'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
