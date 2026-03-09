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

export type SaveLeaderboardStatus = 'success' | 'updated' | 'ignored';

export interface SaveLeaderboardResult {
  status: SaveLeaderboardStatus;
  message: string;
  entry: LeaderboardEntry;
}

const LOCAL_BACKUP_KEY = 'marx_game_local_backup';

function normalizeName(value: string): string {
  return String(value || '').trim().replace(/\s+/g, ' ').toLowerCase();
}

function toTimestamp(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  if (value instanceof Date) return value.getTime();
  return 0;
}

function toBoolean(value: unknown): boolean {
  return value === true || value === 'true' || value === 'TRUE' || value === 1 || value === '1';
}

function toSaveStatus(value: unknown): SaveLeaderboardStatus | null {
  if (value === 'success' || value === 'updated' || value === 'ignored') {
    return value;
  }
  return null;
}

function defaultSaveMessage(status: SaveLeaderboardStatus): string {
  if (status === 'updated') return 'Cập nhật kết quả mới nhất thành công!';
  if (status === 'ignored') return 'Tên đã có, kết quả cũ được giữ lại.';
  return 'Lưu kết quả thành công!';
}

function sanitizeEntry(raw: unknown): LeaderboardEntry {
  const src = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};

  return {
    id: typeof src.id === 'string' ? src.id : undefined,
    playerName: String(src.playerName || '').trim() || 'Anonymous',
    rank: String(src.rank || 'F'),
    exploitationRate: Number(src.exploitationRate || 0),
    rounds: Number(src.rounds || 0),
    survived: toBoolean(src.survived),
    timestamp: toTimestamp(src.timestamp),
    laborTime: Number(src.laborTime || 0),
    necessaryLabor: Number(src.necessaryLabor || 0),
    surplusLabor: Number(src.surplusLabor || 0),
    surplusValue: Number(src.surplusValue || 0),
    finalC: Number(src.finalC || 0),
    finalL: Number(src.finalL || 0),
    finalR: Number(src.finalR || 0),
  };
}

function dedupeLatestByName(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  const byName = new Map<string, LeaderboardEntry>();

  for (const entry of entries) {
    const key = normalizeName(entry.playerName);
    if (!key) continue;

    const prev = byName.get(key);
    if (!prev || entry.timestamp >= prev.timestamp) {
      byName.set(key, entry);
    }
  }

  return Array.from(byName.values());
}

async function parseSaveResponse(response: Response): Promise<{ status: SaveLeaderboardStatus | null; message: string | null }> {
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    return { status: null, message: null };
  }

  if (!payload || typeof payload !== 'object') {
    return { status: null, message: null };
  }

  const data = payload as Record<string, unknown>;
  const status = toSaveStatus(data.status);
  const message = typeof data.message === 'string' ? data.message : null;

  return { status, message };
}

export function getRank(exploitationRate: number, survived: boolean): string {
  if (!survived) return 'F';
  if (exploitationRate < 0.5) return 'S';
  if (exploitationRate < 1.0) return 'A';
  if (exploitationRate < 1.5) return 'B';
  if (exploitationRate < 2.5) return 'C';
  if (exploitationRate < 4.0) return 'D';
  return 'F';
}

export async function saveToLeaderboard(result: GameResult, playerName: string): Promise<SaveLeaderboardResult> {
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

  const requestBody = JSON.stringify(entry);

  try {
    const response = await fetch(LEADERBOARD_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: requestBody,
    });

    const parsed = await parseSaveResponse(response);
    const status = parsed.status ?? 'success';
    const message = parsed.message ?? defaultSaveMessage(status);

    if (LEADERBOARD_CONFIG.enableLocalBackup && status !== 'ignored') {
      saveToLocalBackup(entry);
    }

    return { status, message, entry };
  } catch (readablePostError) {
    // Fallback no-cors nếu endpoint không đọc response được
    try {
      await fetch(LEADERBOARD_API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: requestBody,
      });

      if (LEADERBOARD_CONFIG.enableLocalBackup) {
        saveToLocalBackup(entry);
      }

      return {
        status: 'success',
        message: 'Đã gửi kết quả thành công!',
        entry,
      };
    } catch (error) {
      console.error('Failed to save to Google Sheets:', readablePostError, error);

      if (LEADERBOARD_CONFIG.enableLocalBackup) {
        saveToLocalBackup(entry);
      }

      throw error;
    }
  }
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const response = await fetch(LEADERBOARD_API_URL);
    const payload: unknown = await response.json();

    if (!payload || typeof payload !== 'object') {
      throw new Error('Invalid leaderboard payload');
    }

    const result = payload as Record<string, unknown>;
    if (result.status === 'success') {
      const rawRows = Array.isArray(result.data) ? result.data : [];
      const rows = rawRows.map((row) => sanitizeEntry(row));
      return dedupeLatestByName(rows);
    }

    throw new Error(typeof result.message === 'string' ? result.message : 'Leaderboard API error');
  } catch (error) {
    console.error('Failed to load from Google Sheets:', error);

    if (LEADERBOARD_CONFIG.enableLocalBackup) {
      return dedupeLatestByName(getLocalBackup());
    }

    return [];
  }
}

function saveToLocalBackup(entry: LeaderboardEntry): void {
  try {
    const backup = getLocalBackup();
    backup.push(sanitizeEntry(entry));
    const deduped = dedupeLatestByName(backup);
    localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(deduped));
  } catch (error) {
    console.error('Failed to backup:', error);
  }
}

function getLocalBackup(): LeaderboardEntry[] {
  try {
    const data = localStorage.getItem(LOCAL_BACKUP_KEY);
    const parsed: unknown = data ? JSON.parse(data) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => sanitizeEntry(item));
  } catch {
    return [];
  }
}

export function clearLeaderboard(): void {
  localStorage.removeItem(LOCAL_BACKUP_KEY);
}

export function getTopEntries(limit: number = 10): Promise<LeaderboardEntry[]> {
  return getLeaderboard().then((entries) => entries.slice(0, limit));
}

export function getPlayerRanking(playerName: string): Promise<number> {
  return getLeaderboard().then((entries) => {
    const target = normalizeName(playerName);
    const index = entries.findIndex((e) => normalizeName(e.playerName) === target);
    return index >= 0 ? index + 1 : -1;
  });
}