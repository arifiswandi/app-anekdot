import React from 'react';

export default function RecordFormModal({
  isOpen,
  isEditing,
  formData,
  loading,
  onClose,
  onSubmit,
  onChange,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h3>{isEditing ? 'Edit Catatan' : 'Tambah Catatan Baru'}</h3>
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <form className="modal-form" onSubmit={onSubmit}>
            <div className="field-grid">
              <div className="field-group">
                <label>Tanggal</label>
                <input className="form-input" type="date" name="Tanggal" value={formData.Tanggal} onChange={onChange} required />
              </div>

              <div className="field-group">
                <label>Kelas</label>
                <input className="form-input" type="text" name="Kelas" value={formData.Kelas} onChange={onChange} required />
              </div>
            </div>

            <div className="field-group full">
              <label>Nama Siswa</label>
              <input className="form-input" type="text" name="NamaSiswa" value={formData.NamaSiswa} onChange={onChange} required />
            </div>

            <div className="field-group full">
              <label>Kejadian / Perilaku</label>
              <textarea className="form-textarea" name="Kejadian" value={formData.Kejadian} onChange={onChange} required rows="3" />
            </div>

            <div className="field-group full">
              <label>Tindak Lanjut / Penanganan</label>
              <textarea className="form-textarea" name="Penanganan" value={formData.Penanganan} onChange={onChange} required rows="3" />
            </div>

            <div className="field-group full">
              <label>Keterangan</label>
              <input className="form-input" type="text" name="Keterangan" value={formData.Keterangan} onChange={onChange} />
            </div>

            <div className="button-row">
              <button type="submit" disabled={loading} className="save-button">
                {loading ? 'Menyimpan...' : 'Simpan Catatan'}
              </button>

              <button type="button" className="secondary-button" onClick={onCancel}>
                {isEditing ? 'Batal Edit' : 'Tutup'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
