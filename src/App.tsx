import { useState, useEffect } from 'react';
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
  
  // Load playerName từ localStorage
  const [playerName, setPlayerName] = useState<string>(() => {
    return localStorage.getItem('playerName') || '';
  });

  const handleStartGame = (name: string) => {
    setPlayerName(name);
    setScreen('game');
  };

  const handleGameEnd = (gameResult: GameResult) => {
    setResult(gameResult);
    setScreen('result');
  };

  const handleRestart = () => {
    setResult(null);
    setScreen('menu'); // Về menu nhưng GIỮ NGUYÊN tên
    setSavedEntryId(undefined);
    // ❌ KHÔNG reset playerName nữa
  };

  const handleBackToMenu = () => {
    setResult(null);
    setScreen('menu');
    // ❌ KHÔNG reset playerName nữa
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
        playerName={playerName}
        onRestart={handleRestart}
        onBackToMenu={handleBackToMenu}
        onViewLeaderboard={handleViewLeaderboard}
        onLeaderboardSaved={handleLeaderboardSaved}
      />
    );
  }

  return <GameScreen playerName={playerName} onGameEnd={handleGameEnd} />;
}