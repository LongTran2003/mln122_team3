import { useState } from 'react';
import { MenuScreen } from './components/MenuScreen';
import { GameScreen } from './components/GameScreen';
import { ResultScreen } from './components/ResultScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';

export interface GameResult {
  survived: boolean;
  rounds: number;
  finalC: number;
  finalL: number;
  finalR: number;
  laborTime: number;
  necessaryLabor: number;
  surplusLabor: number;
  surplusValue: number;
  exploitationRate: number;
  reason: string;
}

export default function App() {
  const [screen, setScreen] = useState<'menu' | 'game' | 'result' | 'leaderboard'>('menu');
  const [result, setResult] = useState<GameResult | null>(null);
  const [savedEntryId, setSavedEntryId] = useState<string | undefined>(undefined);
  const [playerName, setPlayerName] = useState<string>(''); // ✅ Thêm state lưu tên

  const handleStartGame = (name: string) => { // ✅ Nhận tên từ MenuScreen
    setPlayerName(name); // ✅ Lưu tên vào state
    setScreen('game');
  };

  const handleGameEnd = (gameResult: GameResult) => {
    setResult(gameResult);
    setScreen('result');
  };

  const handleRestart = () => {
    setResult(null);
    setScreen('menu'); // ✅ Về menu để nhập tên lại
    setSavedEntryId(undefined);
    setPlayerName(''); // ✅ Reset tên
  };

  const handleBackToMenu = () => {
    setResult(null);
    setScreen('menu');
    setPlayerName(''); // ✅ Reset tên
  };

  const handleViewLeaderboard = () => {
    setScreen('leaderboard');
  };

  const handleLeaderboardSaved = (entryId: string) => {
    setSavedEntryId(entryId);
  };

  if (screen === 'menu') {
    return <MenuScreen onStart={handleStartGame} onViewLeaderboard={handleViewLeaderboard} />;
  }

  if (screen === 'leaderboard') {
    return (
      <LeaderboardScreen
        onBack={handleBackToMenu}
        highlightEntryId={savedEntryId}
      />
    );
  }

  if (screen === 'result' && result) {
    return (
      <ResultScreen
        result={result}
        playerName={playerName} // ✅ Truyền tên xuống ResultScreen
        onRestart={handleRestart}
        onBackToMenu={handleBackToMenu}
        onViewLeaderboard={handleViewLeaderboard}
        onLeaderboardSaved={handleLeaderboardSaved}
      />
    );
  }

  return <GameScreen playerName={playerName} onGameEnd={handleGameEnd} />; {/* ✅ Truyền tên xuống GameScreen */}
}
