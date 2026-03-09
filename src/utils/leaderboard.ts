import { GameResult } from '../App';
import { LEADERBOARD_API_URL, LEADERBOARD_CONFIG } from '../config/leaderboard';

export interface LeaderboardEntry {
  id?: string;
  playerName: string;
  rank: string;
  exploitationRate: number;
  rounds: number;
  survived: boolean;
  timestamp: number;
  laborTime: number;
  necessaryLabor: number;
  surplusLabor: number;
  surplusValue: number;
  finalC: number;
  finalL: number;
  finalR: number;
}

const LOCAL_BACKUP_KEY = 'marx_game_local_backup';

export function getRank(exploitationRate: number, survived: boolean): string {
  if (!survived) return 'F';
  if (exploitationRate < 0.5) return 'S';
  if (exploitationRate < 1.0) return 'A';
  if (exploitationRate < 1.5) return 'B';
  if (exploitationRate < 2.5) return 'C';
  if (exploitationRate < 4.0) return 'D';
  return 'F';
}

// ✅ Save to Google Sheets
export async function saveToLeaderboard(result: GameResult, playerName: string): Promise<LeaderboardEntry> {
  const entry: LeaderboardEntry = {
    playerName: playerName.trim() || 'Anonymous',
    rank: getRank(result.exploitationRate, result.survived),
    exploitationRate: result.exploitationRate,
    rounds: result.rounds,
    survived: result.survived,
    timestamp: Date.now(),
    laborTime: result.laborTime,
    necessaryLabor: result.necessaryLabor,
    surplusLabor: result.surplusLabor,
    surplusValue: result.surplusValue,
    finalC: result.finalC,
    finalL: result.finalL,
    finalR: result.finalR,
  };

  try {
    // Send to Google Sheets
    const response = await fetch(LEADERBOARD_API_URL, {
      method: 'POST',
      mode: 'no-cors', // Important for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });

    console.log('✅ Saved to Google Sheets');

    // Backup to localStorage
    if (LEADERBOARD_CONFIG.enableLocalBackup) {
      saveToLocalBackup(entry);
    }

    return entry;
  } catch (error) {
    console.error('❌ Failed to save to Google Sheets:', error);
    
    // Fallback to localStorage
    if (LEADERBOARD_CONFIG.enableLocalBackup) {
      saveToLocalBackup(entry);
    }
    
    throw error;
  }
}

// ✅ Get leaderboard from Google Sheets
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const response = await fetch(LEADERBOARD_API_URL);
    const result = await response.json();
    
    if (result.status === 'success') {
      console.log('✅ Loaded from Google Sheets:', result.data.length, 'entries');
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('❌ Failed to load from Google Sheets:', error);
    
    // Fallback to localStorage
    if (LEADERBOARD_CONFIG.enableLocalBackup) {
      return getLocalBackup();
    }
    
    return [];
  }
}

// Local backup functions
function saveToLocalBackup(entry: LeaderboardEntry): void {
  try {
    const backup = getLocalBackup();
    backup.push(entry);
    localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(backup));
    console.log('💾 Backup saved to localStorage');
  } catch (error) {
    console.error('Failed to backup:', error);
  }
}

function getLocalBackup(): LeaderboardEntry[] {
  try {
    const data = localStorage.getItem(LOCAL_BACKUP_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
}

export function clearLeaderboard(): void {
  localStorage.removeItem(LOCAL_BACKUP_KEY);
}

export function getTopEntries(limit: number = 10): Promise<LeaderboardEntry[]> {
  return getLeaderboard().then(entries => entries.slice(0, limit));
}

export function getPlayerRanking(playerName: string): Promise<number> {
  return getLeaderboard().then(entries => {
    const index = entries.findIndex(e => e.playerName === playerName);
    return index >= 0 ? index + 1 : -1;
  });
}