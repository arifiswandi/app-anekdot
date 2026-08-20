import React, { useState, useEffect, useRef } from 'react';
import './RecordsDashboard.css';
import StatCard from '../../../components/ui/StatCard';
import ExportButton from '../../../components/ui/ExportButton';
import { exportWorkbookAsExcel } from '../utils/exportExcel';
import { mapExcelRowToRecord } from '../utils/excelImport';
import {
  fetchRecords,
  createRecord,
  updateRecord,
  deleteRecord,
  importRecordsFromExcel,
} from '../../../services/dashboardService';
import RecordFormModal from './RecordFormModal';

const INITIAL_RECORD_FORM = {
  ID: '',
  Tanggal: '',
  NamaSiswa: '',
  Kelas: '',
  Kejadian: '',
  Penanganan: '',
  Keterangan: '',
};

export default function RecordsDashboard({ user, onLogout, postToGas }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [formData, setFormData] = useState(INITIAL_RECORD_FORM);
  const [isEditing, setIsEditing] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const fileInputRef = useRef(null);
  const isActionBusy = loading || exporting || importing;

  const resetForm = () => {
    setFormData(INITIAL_RECORD_FORM);
    setIsEditing(false);
    setIsFormOpen(false);
  };

  const loadRecords = async () => {
    setLoading(true);
    try {
      const data = await fetchRecords(postToGas);
      setRecords(data);
    } catch (err) {
      console.error('Fetch records error:', err);
      alert(`Terjadi kesalahan koneksi.\n${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFieldChange = (event) => {
    setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    try {
      if (isEditing) {
        await updateRecord(postToGas, formData);
      } else {
        await createRecord(postToGas, formData);
      }
      resetForm();
      await loadRecords();
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
      await deleteRecord(postToGas, id);
      await loadRecords();
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
                  <th>Tindak Lanjut</th>
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
      const importedCount = await importRecordsFromExcel(postToGas, file, mapExcelRowToRecord);
      await loadRecords();
      alert(`${importedCount} data berhasil diimpor dari file Excel.`);
    } catch (error) {
      console.error('Import Excel error:', error);
      alert(error.message || 'Gagal mengimpor file Excel.');
    } finally {
      setImporting(false);
      event.target.value = '';
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard__shell">
        <div className="dashboard__topbar">
          <div className="dashboard__brand">
            <div className="dashboard__logo">BK</div>
            <div>
              <h2 className="dashboard__title">Catatan Anekdot BK</h2>
              <span className="dashboard__subtitle">MTsN 1 Mojokerto</span>
            </div>
          </div>
          <div className="dashboard__actions">
            <span className="dashboard__user">Halo, {user.username} ({user.role})</span>
            <button className="dashboard__logout" onClick={onLogout}>Logout</button>
          </div>
        </div>

        <div className="dashboard__stats">
          <StatCard label="Total Catatan" value={records.length} meta="Data aktif" />
          <StatCard label="Siswa Terdata" value={new Set(records.map((item) => item.NamaSiswa)).size} meta="Unique siswa" />
          <StatCard label="Status Sistem" value="Online" meta="Siap digunakan" />
        </div>

        <div className="dashboard__panel">
          <div className="dashboard__panel-header">
            <h3>Daftar Catatan Anekdot</h3>
            <div className="dashboard__panel-actions">
              <input ref={fileInputRef} type="file" accept=".xlsx,.xls" hidden onChange={handleImportExcel} />

              <ExportButton
                label={{ icon: '📥', text: 'Import', loadingText: 'Mengimpor...' }}
                variant="import"
                loading={importing}
                disabled={isActionBusy}
                onClick={() => fileInputRef.current?.click()}
              />

              <ExportButton
                label={{ icon: '📄', text: 'PDF', loadingText: 'Membuat PDF...' }}
                variant="pdf"
                loading={exporting}
                disabled={isActionBusy}
                onClick={exportToPdf}
              />
              <ExportButton
                label={{ icon: '📊', text: 'Excel', loadingText: 'Mengekspor...' }}
                variant="excel"
                loading={exporting}
                disabled={isActionBusy}
                onClick={exportToExcel}
              />
              <button type="button" className="dashboard__primary-button" onClick={openFormModal}>
                + Tambah Catatan
              </button>
            </div>
          </div>

          <div className="dashboard__table-wrap">
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
              {loading ? (<p className="dashboard__status">Memuat data...</p>) : (
                <tbody>
                  {records.map((r, index) => (
                    <tr key={index}>
                      <td>{formatDateForInput(r.Tanggal)}</td>
                      <td>{r.NamaSiswa}</td>
                      <td>{r.Kelas}</td>
                      <td className="dashboard__table-text">{r.Kejadian}</td>
                      <td className="dashboard__table-text">{r.Penanganan}</td>
                      <td>
                        <div className="dashboard__table-actions">
                          <button type="button" className="dashboard__table-action" onClick={() => handleEdit(r)}>
                            ✏️ Edit
                          </button>

                          {user.role === 'superuser' && (
                            <button type="button" className="dashboard__danger-button" onClick={() => handleDelete(r.ID)}>
                              🗑️ Hapus
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>

      <RecordFormModal
        isOpen={isFormOpen}
        isEditing={isEditing}
        formData={formData}
        loading={loading}
        onClose={closeFormModal}
        onSubmit={handleSubmit}
        onChange={handleFieldChange}
        onCancel={cancelEdit}
      />
    </div>
  );
}
