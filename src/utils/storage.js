import { STORAGE_KEY } from '../constants/gameData';

export function loadSavedData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.error('Gagal membaca data dari localStorage', e);
    return null;
  }
}

export function saveGameData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Gagal menyimpan progress game ke localStorage', e);
  }
}

export function clearGameData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Gagal menghapus data dari localStorage', e);
  }
}