export const normalizeImportKey = (key) => String(key ?? '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');

export const normalizeDateValue = (value) => {
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

export const normalizeImportedRecord = (row) => {
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
