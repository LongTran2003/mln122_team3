// API URL từ Google Apps Script
export const LEADERBOARD_API_URL = 
'https://script.google.com/macros/s/AKfycbz5B59at-ldvGgqAMFC8rttYkryoY4F29fpuAMbyN7EyGIU734TM_wtvLADlFSMiTkZ5A/exec'; // ✅ Paste URL từ bước 2

export const LEADERBOARD_CONFIG = {
  maxEntries: 100,
  enableLocalBackup: true, // Backup vào localStorage nếu API fail
};