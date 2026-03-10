import { useState, useEffect, useCallback, useRef } from 'react';
import { IndicatorBar } from './IndicatorBar';
import { PolicyCard } from './PolicyCard';
import { GameLog, LogEntry } from './GameLog';
import { RoadmapProgress } from './RoadmapProgress';
import { SpecialEventModal } from './SpecialEventModal';
import { Policy, getRandomPolicies } from '../data/policies';
import { getRandomSpecialEvent, SpecialEvent } from '../data/special-events';
import { GameResult } from '../App';
import { isBossRound, getBossRound, BossRound } from '../data/boss-round';
import { BossIntroModal } from './BossIntroModal';
import { getMixedPolicies, getMixedCrisisPolicies } from '../data/policies';

interface GameScreenProps {
  playerName: string; // ✅ Thêm prop playerName
  onGameEnd: (result: GameResult) => void;
}

export function GameScreen({ playerName, onGameEnd }: GameScreenProps) { // ✅ Destructure playerName
  // Core game state
  const [round, setRound] = useState(1);
  const [C, setC] = useState(50); // Capital
  const [L, setL] = useState(50); // Labor
  const [R, setR] = useState(50); // Reproduction

  // Tracking for calculations
  const [totalLaborTime, setTotalLaborTime] = useState(0);
  const [totalSurplusLabor, setTotalSurplusLabor] = useState(0);
  const [lowRCount, setLowRCount] = useState(0); // Count consecutive rounds with R < 15

  // UI state
  const [currentPolicies, setCurrentPolicies] = useState<Policy[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [specialEvent, setSpecialEvent] = useState<SpecialEvent | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Boss round state
  const [currentBoss, setCurrentBoss] = useState<BossRound | null>(null);
  const [showBossIntro, setShowBossIntro] = useState(false);
  const [bossState, setBossState] = useState<{
    active: boolean;
    bossRound: number | null;
    roundsRemaining: number;
    defeatProgress: number; // Track progress để defeat boss sớm
  }>({
    active: false,
    bossRound: null,
    roundsRemaining: 0,
    defeatProgress: 0
  });
  // ✅ Flag để tránh gọi endGame nhiều lần
  const gameEndedRef = useRef(false);

  // Initialize first round
  useEffect(() => {
    setCurrentPolicies(getRandomPolicies(3));
    addLog(1, 'Bắt đầu chu kỳ sản xuất tư bản chủ nghĩa...', 'policy');
  }, []);

  const addLog = useCallback((round: number, message: string, type: LogEntry['type']) => {
    setLogs(prev => [...prev, { round, message, type }]);
  }, []);

  const calculateMarxianMetrics = useCallback(() => {
    const laborTime = totalLaborTime;
    const necessaryLabor = laborTime * (R / 100);
    const surplusLabor = totalSurplusLabor;
    const surplusValue = surplusLabor * (C / 50);
    const exploitationRate = necessaryLabor > 0 ? surplusLabor / necessaryLabor : 0;

    return {
      laborTime,
      necessaryLabor,
      surplusLabor,
      surplusValue,
      exploitationRate
    };
  }, [totalLaborTime, totalSurplusLabor, C, R]);

  const endGame = useCallback((survived: boolean, reason: string) => {
    // ✅ Tránh gọi nhiều lần
    if (gameEndedRef.current) return;
    gameEndedRef.current = true;

    const metrics = calculateMarxianMetrics();

    const result: GameResult = {
      survived,
      rounds: round - 1,
      finalC: Math.max(0, C),
      finalL: Math.max(0, L),
      finalR: Math.max(0, R),
      laborTime: metrics.laborTime,
      necessaryLabor: metrics.necessaryLabor,
      surplusLabor: metrics.surplusLabor,
      surplusValue: metrics.surplusValue,
      exploitationRate: metrics.exploitationRate,
      reason
    };

    onGameEnd(result);
  }, [round, C, L, R, calculateMarxianMetrics, onGameEnd]);

  // ✅ Check lose conditions - CHỈ check khi round thay đổi
  useEffect(() => {
    if (round === 30) {
      const boss = getBossRound(30);
      if (boss?.rules.specialCondition === 'final_judgment') {
        // Check contradiction
        const contradiction = Math.abs(C - L);
        if (contradiction > 40) {
          const reason = `🚩 Cách mạng Vô sản: Mâu thuẫn |C-L| = ${contradiction.toFixed(0)} > 40. Giai cấp công nhân đã lật đổ bạn!`;
          setTimeout(() => endGame(false, reason), 300);
          return;
        }

        // Check if any metric too low
        if (C < 20 || L < 20 || R < 20) {
          let reason = '🚩 Hệ thống sụp đổ tại vòng cuối: ';
          if (C < 20) reason += 'Tư bản cạn kiệt. ';
          if (L < 20) reason += 'Lao động suy kiệt. ';
          if (R < 20) reason += 'Tái sản xuất thất bại.';
          setTimeout(() => endGame(false, reason), 300);
          return;
        }
      }
    }

    // Condition 1: Any indicator reaches 0
    if (C <= 0 || L <= 0 || R <= 0) {
      let reason = '';
      if (C <= 0) {
        reason = 'Tư bản cạn kiệt - hệ thống sản xuất sụp đổ!';
      } else if (L <= 0) {
        reason = 'Lực lượng lao động kiệt quệ - không còn ai để bóc lột!';
      } else {
        reason = 'Tái sản xuất sức lao động về 0 - công nhân không thể tiếp tục làm việc!';
      }
      setTimeout(() => endGame(false, reason), 300);
      return;
    }

    // Condition 2: |C - L| > 50
    const contradiction = Math.abs(C - L);
    if (contradiction > 55) {
      const reason = `Mâu thuẫn giữa Tư bản và Lao động quá lớn (|C-L| = ${contradiction.toFixed(0)} > 55). Hệ thống không thể duy trì!`;
      setTimeout(() => endGame(false, reason), 300);
      return;
    }

    // Condition 3: R < 15 for 3 consecutive rounds
    if (R < 15) {
      const newCount = lowRCount + 1;
      setLowRCount(newCount);

      if (newCount >= 3 && !gameEndedRef.current) {
        const reason = 'Tái sản xuất sức lao động < 15 trong 3 vòng liên tiếp. Công nhân kiệt quệ hoàn toàn!';
        setTimeout(() => endGame(false, reason), 300);
      }
    } else {
      setLowRCount(0);
    }
  }, [round]); // ✅ CHỈ phụ thuộc vào round

  // Check win condition
  useEffect(() => {
    if (round > 30 && C > 0 && L > 0 && R > 0 && !gameEndedRef.current) {
      endGame(true, 'Hoàn thành 30 vòng - bạn đã cân bằng được mâu thuẫn tư bản và lao động!');
    }
  }, [round, C, L, R, endGame]);

  const handlePolicySelect = (policy: Policy) => {
    if (isProcessing || gameEndedRef.current) return;

    setIsProcessing(true);

    // Apply policy effects
    const newC = Math.max(0, Math.min(100, C + policy.effects.C));
    const newL = Math.max(0, Math.min(100, L + policy.effects.L));
    const newR = Math.max(0, Math.min(100, R + policy.effects.R));

    setC(newC);
    setL(newL);
    setR(newR);

    // Track labor metrics
    setTotalLaborTime(prev => prev + newL);
    const surplusThisRound = Math.max(0, newL - (newR * 0.5));
    setTotalSurplusLabor(prev => prev + surplusThisRound);

    // Log action
    const effectMsg = [];
    if (policy.effects.C !== 0) effectMsg.push(`C ${policy.effects.C > 0 ? '+' : ''}${policy.effects.C}`);
    if (policy.effects.L !== 0) effectMsg.push(`L ${policy.effects.L > 0 ? '+' : ''}${policy.effects.L}`);
    if (policy.effects.R !== 0) effectMsg.push(`R ${policy.effects.R > 0 ? '+' : ''}${policy.effects.R}`);

    addLog(round, `Chính sách: ${policy.name} \n Hiệu ứng: ${effectMsg.join(', ')}`, 'policy');

    // 🆕 BOSS 10 DEFEAT TRACKING: Check if policy helps resolve crisis
    if (bossState.active && bossState.bossRound === 10) {
      const boss = getBossRound(10);
      if (boss?.rules.defeatCondition === 'crisis_resolved') {
        // Kiểm tra xem policy có giúp giải quyết khủng hoảng không:
        // - Giảm C (thanh lý hàng tồn kho): policy.effects.C < 0
        // - Tăng L (tăng sức mua công nhân): policy.effects.L > 0
        const isResolvingCrisis = policy.effects.C < 0 || policy.effects.L > 0;

        if (isResolvingCrisis) {
          const newDefeatProgress = bossState.defeatProgress + 1;
          setBossState(prev => ({ ...prev, defeatProgress: newDefeatProgress }));

          addLog(round, `🎯 Tiến độ giải quyết khủng hoảng: ${newDefeatProgress}/3`, 'event');

          // Nếu đạt 3/5 vòng thực hiện đúng hướng → Boss defeated sớm!
          if (newDefeatProgress >= 3) {
            // Bonus reward: Restore C một phần, boost L và R
            setC(prev => Math.min(100, prev + 10));
            setL(prev => Math.min(100, prev + 8));
            setR(prev => Math.min(100, prev + 5));

            addLog(round, `✨ KHỦNG HOẢNG ĐÃ ĐƯỢC GIẢI QUYẾT! Bạn nhận thưởng: C +10, L +8, R +5`, 'event');

            // End boss immediately
            setBossState({ active: false, bossRound: null, roundsRemaining: 0, defeatProgress: 0 });
            setCurrentBoss(null);

            // 🆕 NGAY LẬP TỨC generate 3 policies mới thay vì đợi advanceRound()
            setTimeout(() => {
              setCurrentPolicies(getRandomPolicies(3));
            }, 100);

            // 🆕 KHÔNG tiếp tục vào phần event/advanceRound bên dưới nữa
            setIsProcessing(false);
            return;
          }
        }
      }
    }

    // Check for special event
    setTimeout(() => {
      if (gameEndedRef.current) {
        setIsProcessing(false);
        return;
      }

      const EVENT_CHANCE = 0.3;
      const isEventTriggered = Math.random() < EVENT_CHANCE && round > 1;

      if (isEventTriggered) {
        const randomEvent = getRandomSpecialEvent(round);
        if (randomEvent) {
          // Có event → hiển thị modal
          setSpecialEvent(randomEvent);
          setIsProcessing(false);
        } else {
          // Không có event → tiếp tục advance round
          advanceRound();
        }
      } else {
        advanceRound();
      }
    }, 600); // ✅ Giảm delay xuống 600ms
  };

  const handleEventClose = () => {
    if (!specialEvent || gameEndedRef.current) return;

    // Apply event effects
    const newC = Math.max(0, Math.min(100, C + specialEvent.effects.C));
    const newL = Math.max(0, Math.min(100, L + specialEvent.effects.L));
    const newR = Math.max(0, Math.min(100, R + specialEvent.effects.R));

    setC(newC);
    setL(newL);
    setR(newR);

    addLog(round, `Sự kiện: ${specialEvent.title}`, 'event');

    setSpecialEvent(null);
    advanceRound();
  };

  const advanceRound = () => {
    if (gameEndedRef.current) {
      setIsProcessing(false);
      return;
    }

    setTimeout(() => {
      const nextRound = round + 1;
      setRound(nextRound);

      // 🆕 STEP 1: Check nếu boss đã hết effect từ vòng trước, disable nó
      if (bossState.active && bossState.roundsRemaining === 0) {
        const boss = getBossRound(bossState.bossRound!);
        setBossState({ active: false, bossRound: null, roundsRemaining: 0, defeatProgress: 0 });
        setCurrentBoss(null);
        addLog(nextRound, `✅ ${boss?.name} đã qua! Hệ thống trở lại bình thường.`, 'event');
      }
      // 🆕 STEP 2: Apply persistent Boss effects nếu còn rounds
      else if (bossState.active && bossState.roundsRemaining > 0) {
        const boss = getBossRound(bossState.bossRound!);
        if (boss?.rules.persistentEffect) {
          setC(prev => Math.max(0, Math.min(100, prev + boss.rules.persistentEffect!.C)));
          setL(prev => Math.max(0, Math.min(100, prev + boss.rules.persistentEffect!.L)));
          setR(prev => Math.max(0, Math.min(100, prev + boss.rules.persistentEffect!.R)));

          // 🆕 Dynamic log message based on which stat is affected
          const effectMsg = [];
          if (boss.rules.persistentEffect.C !== 0) effectMsg.push(`C ${boss.rules.persistentEffect.C}`);
          if (boss.rules.persistentEffect.L !== 0) effectMsg.push(`L ${boss.rules.persistentEffect.L}`);
          if (boss.rules.persistentEffect.R !== 0) effectMsg.push(`R ${boss.rules.persistentEffect.R}`);

          const icon = boss.icon || '⚠️';
          addLog(nextRound, `${icon} ${boss.name} tiếp diễn: ${effectMsg.join(', ')}`, 'event');
        }

        // Giảm rounds remaining
        const newRemaining = bossState.roundsRemaining - 1;
        setBossState(prev => ({ ...prev, roundsRemaining: newRemaining }));
      }

      // Check if next round is NEW Boss round
      if (isBossRound(nextRound) && !bossState.active) {
        const boss = getBossRound(nextRound);
        if (boss) {
          setCurrentBoss(boss);
          setShowBossIntro(true);

          // Apply auto effects if any
          if (boss.rules.autoEffects) {
            setC(prev => Math.max(0, Math.min(100, prev + boss.rules.autoEffects!.C)));
            setL(prev => Math.max(0, Math.min(100, prev + boss.rules.autoEffects!.L)));
            setR(prev => Math.max(0, Math.min(100, prev + boss.rules.autoEffects!.R)));
            addLog(nextRound, `⚠️ Boss Round: ${boss.name} - Hiệu ứng tự động!`, 'event');
          }

          // 🆕 Setup persistent Boss state
          if (boss.rules.persistentDuration) {
            setBossState({
              active: true,
              bossRound: nextRound,
              roundsRemaining: boss.rules.persistentDuration - 1, // -1 vì vòng hiện tại đã tính
              defeatProgress: 0
            });
          }

          setIsProcessing(false);
          return;
        }
      }

      // Normal round - generate policies
      // 🆕 Nếu đang trong Boss crisis mode, mix crisis policies
      if (bossState.active && bossState.roundsRemaining > 0 && currentBoss?.rules.crisisMode) {
        const policyCount = currentBoss.rules.policyCount || 3;
        if (policyCount === 2) {
          setCurrentPolicies(getMixedCrisisPolicies(1, 1));
        } else {
          setCurrentPolicies(getRandomPolicies(policyCount));
        }
      } else {
        setCurrentPolicies(getRandomPolicies(3));
      }
      setIsProcessing(false);
    }, 400);
  };

  const handleBossStart = () => {
    setShowBossIntro(false);

    if (!currentBoss) return;

    // Generate policies based on Boss rules
    const policyCount = currentBoss.rules.policyCount || 3;

    if (currentBoss.rules.allowedCategories && currentBoss.rules.allowedCategories.length > 0) {
      // Filter by allowed categories (Round 20)
      setCurrentPolicies(getMixedPolicies(currentBoss.rules.allowedCategories, policyCount));
    } else {
      // Normal random (Round 10, 30)
      setCurrentPolicies(getRandomPolicies(policyCount));
    }

    addLog(round, `🔥 Boss Round bắt đầu: ${currentBoss.name}!`, 'event');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-rose-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* ✅ ROADMAP Ở ĐẦU TRANG */}
        <RoadmapProgress currentRound={round} maxRounds={30} />

        {/* Boss Round Banner - Full Width với Progress */}
        {(currentBoss || bossState.active) && (
          <div className={`bg-gradient-to-r from-red-600 to-orange-600 text-white p-4 rounded-2xl mb-6 border-4 border-red-800 shadow-xl ${bossState.active ? 'animate-pulse' : ''}`}>
            <div className="text-center font-black text-lg flex items-center justify-center gap-3">
              <span className="text-3xl">
                {currentBoss?.icon || getBossRound(bossState.bossRound!)?.icon}
              </span>

              {/* Nếu đang ở vòng Boss chính (round === bossRound) */}
              {currentBoss && round === currentBoss.round ? (
                <span>BOSS ROUND: {currentBoss.name}</span>
              ) : (
                /* Nếu đang trong persistent effect */
                bossState.active && (
                  <span>
                    {getBossRound(bossState.bossRound!)?.name} tiếp diễn: 
                    <span className="ml-2 bg-white/20 px-3 py-1 rounded-full text-sm">
                      {bossState.roundsRemaining + 1}/{getBossRound(bossState.bossRound!)?.rules.persistentDuration} vòng
                    </span>
                  </span>
                )
              )}

              <span className="text-3xl">
                {currentBoss?.icon || getBossRound(bossState.bossRound!)?.icon}
              </span>
            </div>

            {/* Progress bar cho persistent effect */}
            {bossState.active && bossState.roundsRemaining > 0 && (
              <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-white h-full transition-all duration-500"
                  style={{
                    width: `${((getBossRound(bossState.bossRound!)?.rules.persistentDuration! - bossState.roundsRemaining) / getBossRound(bossState.bossRound!)?.rules.persistentDuration!) * 100}%`
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left: Indicators */}
          <div className="lg:col-span-3 space-y-4">
            <IndicatorBar
              label="Tư bản sản xuất (C)"
              value={C}
              maxValue={100}
              icon="🏦"
              color="blue"
              warning={C < 15}
            />

            <IndicatorBar
              label="Sức lao động (L)"
              value={L}
              maxValue={100}
              icon="👷"
              color="green"
              warning={L < 15}
            />

            <IndicatorBar
              label="Tái sản xuất (R)"
              value={R}
              maxValue={100}
              icon="🏥"
              color="orange"
              warning={R < 15}
            />

            {/* Contradiction Indicator */}
            <div className="bg-purple-50 border-2 border-purple-300 rounded-2xl p-4">
              <div className="text-purple-700 mb-2 font-bold">Mâu thuẫn |C-L|</div>
              <div className={`text-3xl font-bold ${Math.abs(C - L) > 30 ? 'text-red-600' : 'text-purple-700'}`}>
                {Math.abs(C - L).toFixed(0)}
              </div>
              <div className="text-xs text-gray-500 mt-1">Giới hạn: 55</div>
              {Math.abs(C - L) > 30 && (
                <div className="text-red-600 text-sm mt-2 animate-pulse font-bold">
                  ⚠️ Nguy hiểm!
                </div>
              )}
            </div>

            {/* Player Info Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl p-4">
              <div className="text-purple-700 font-bold text-sm mb-2">👤 Người chơi</div>
              <div className="text-purple-800 text-lg font-bold truncate">{playerName}</div>
            </div>

            {/* Low R Counter */}
            {lowRCount > 0 && (
              <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 animate-pulse">
                <div className="text-red-700 mb-2 font-bold">Cảnh báo R thấp</div>
                <div className="text-2xl text-red-600 font-bold">{lowRCount}/3 vòng</div>
                <div className="text-xs text-gray-600 mt-1">R {'<'} 15 liên tiếp</div>
              </div>
            )}
          </div>

          {/* Center: Policy Cards & Theory Box */}
          <div className="lg:col-span-6">
            <div className="bg-white/60 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-6 mb-6">
              <h2 className="text-gray-700 mb-6 text-center text-lg font-bold">
                Chọn chính sách sản xuất:
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentPolicies.map((policy) => (
                  <PolicyCard
                    key={policy.id}
                    policy={policy}
                    onSelect={() => handlePolicySelect(policy)}
                    disabled={isProcessing}
                  />
                ))}
              </div>

              {isProcessing && (
                <div className="mt-6 text-center">
                  <div className="inline-block animate-spin text-5xl">⚙️</div>
                  <div className="text-gray-600 mt-2">Đang xử lý...</div>
                </div>
              )}
            </div>

            {/* Theory Box */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-red-800 font-bold text-lg mb-4 flex items-center gap-2 border-b border-red-200 pb-2">
                <span className="text-2xl">📖</span>
                Lý thuyết Marx
              </h3>

              <div className="mb-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong className="text-red-700 font-bold text-base">1. Giá trị thặng dư (m):</strong>
                  <br />
                  Là phần giá trị do công nhân tạo ra nhưng không được trả công. Đây là phần lao động vượt quá <span className="italic text-gray-600">lao động tất yếu</span> (phần giá trị để tái sản xuất sức lao động - hay tiền lương).
                </p>
              </div>

              <div className="bg-white/60 rounded-xl p-4 border border-red-100">
                <p className="text-gray-700 text-sm mb-2">
                  <strong className="text-red-700 font-bold text-base">2. Tỷ suất giá trị thặng dư (m'):</strong>
                  <span className="block text-xs text-gray-500 mt-1">Chỉ số cốt lõi đo lường mức độ bóc lột.</span>
                </p>

                <div className="bg-red-100 text-red-800 font-bold text-center py-2 rounded-lg my-3 font-mono text-lg border border-red-200">
                  m' = m / v
                </div>

                <ul className="text-sm text-gray-700 space-y-1 mb-3 pl-2">
                  <li>• <strong>m:</strong> Giá trị thặng dư</li>
                  <li>• <strong>v:</strong> Tư bản khả biến (tiền lương trả cho công nhân)</li>
                </ul>

                <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 text-sm">
                  <strong className="text-orange-800 block mb-1">Ý nghĩa:</strong>
                  <ul className="space-y-1 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">📈</span>
                      <span><strong>m' càng cao:</strong> Mức bóc lột càng lớn (Tư bản chiếm nhiều hơn trả lương).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">📉</span>
                      <span><strong>m' thấp:</strong> Sự phân chia giá trị công bằng hơn.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Event Log */}
          <div className="lg:col-span-3">
            <GameLog logs={logs} currentRound={round} />
          </div>
        </div>
      </div>

      {/* Special Event Modal */}
      {specialEvent && (
        <SpecialEventModal
          event={specialEvent}
          currentRound={round}
          onClose={handleEventClose}
        />
      )}

      {/* Boss Intro Modal */}
      {showBossIntro && currentBoss && (
        <BossIntroModal
          boss={currentBoss}
          onStart={handleBossStart}
        />
      )}
    </div>
  );
}