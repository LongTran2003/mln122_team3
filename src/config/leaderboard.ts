// API URL từ Google Apps Script
export const LEADERBOARD_API_URL = 
'https://script.google.com/macros/s/AKfycbzHhiVW_-2qSafg6g8NzgWCmZLqOZCWBZ8M0dJN9XkCrwp0mbXnRkdaNx0YVWAxXIeltA/exec'; // ✅ Paste URL từ bước 2

export const LEADERBOARD_CONFIG = {
  maxEntries: 100,
  enableLocalBackup: true, // Backup vào localStorage nếu API fail
};