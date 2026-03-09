
import { GameResult } from '../App';

export interface LeaderboardEntry {
  id: string;
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

const LEADERBOARD_KEY = 'marx_game_leaderboard';
const MAX_ENTRIES = 100;

export function getRank(exploitationRate: number, survived: boolean): string {
  if (!survived) return 'F';
  
  if (exploitationRate < 0.5) return 'S';
  if (exploitationRate < 1.0) return 'A';
  if (exploitationRate < 1.5) return 'B';
  if (exploitationRate < 2.5) return 'C';
  if (exploitationRate < 4.0) return 'D';
  return 'F';
}

export function saveToLeaderboard(result: GameResult, playerName: string): LeaderboardEntry {
  const entries = getLeaderboard();
  
  const newEntry: LeaderboardEntry = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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
  
  entries.push(newEntry);
  
  // Sort by: survived first, then by exploitation rate (lower is better), then by rounds (higher is better)
  entries.sort((a, b) => {
    if (a.survived !== b.survived) return a.survived ? -1 : 1;
    if (a.survived && b.survived) {
      if (Math.abs(a.exploitationRate - b.exploitationRate) > 0.01) {
        return a.exploitationRate - b.exploitationRate;
      }
      return b.rounds - a.rounds;
    }
    return b.rounds - a.rounds;
  });
  
  // Keep only top entries
  const trimmedEntries = entries.slice(0, MAX_ENTRIES);
  
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(trimmedEntries));
  } catch (error) {
    console.error('Failed to save to leaderboard:', error);
  }
  
  return newEntry;
}

export function getLeaderboard(): LeaderboardEntry[] {
  try {
    const data = localStorage.getItem(LEADERBOARD_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load leaderboard:', error);
    return [];
  }
}

export function clearLeaderboard(): void {
  try {
    localStorage.removeItem(LEADERBOARD_KEY);
  } catch (error) {
    console.error('Failed to clear leaderboard:', error);
  }
}

export function getTopEntries(limit: number = 10): LeaderboardEntry[] {
  const entries = getLeaderboard();
  return entries.slice(0, limit);
}

export function getPlayerRanking(entryId: string): number {
  const entries = getLeaderboard();
  const index = entries.findIndex(e => e.id === entryId);
  return index >= 0 ? index + 1 : -1;
}
