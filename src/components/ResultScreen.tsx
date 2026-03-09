import { useState } from 'react';
import { GameResult } from '../App';
import { getQuoteForRank } from '../data/quotes';
import { saveToLeaderboard } from '../utils/leaderboard';
import { PlayerNameModal } from './PlayerNameModal';

interface ResultScreenProps {
  result: GameResult;
  onRestart: () => void;
  onBackToMenu: () => void;
  onViewLeaderboard: () => void;
  onLeaderboardSaved: (entryId: string) => void;
}

export function ResultScreen({ result, onRestart, onBackToMenu, onViewLeaderboard, onLeaderboardSaved }: ResultScreenProps) {
  const [showNameModal, setShowNameModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Calculate rank based on exploitation rate
  const getRank = (exploitationRate: number): string => {
    if (!result.survived) return 'F';
    
    if (exploitationRate < 0.5) return 'S'; // Very low exploitation - humane
    if (exploitationRate < 1.0) return 'A'; // Low exploitation
    if (exploitationRate < 1.5) return 'B'; // Moderate
    if (exploitationRate < 2.5) return 'C'; // High
    if (exploitationRate < 4.0) return 'D'; // Very high
    return 'F'; // Extreme exploitation
  };

  const getRankDescription = (rank: string): string => {
    const descriptions: Record<string, string> = {
      'S': 'Chủ nghĩa xã hội lý tưởng - Bóc lột tối thiểu',
      'A': 'Tư bản có lương tâm - Phúc lợi cao',
      'B': 'Tư bản điều tiết - Cân bằng khá tốt',
      'C': 'Tư bản chuẩn mực - Bóc lột trung bình',
      'D': 'Tư bản bóc lột - Mâu thuẫn giai cấp cao',
      'F': 'Tư bản dã man - Hệ thống sụp đổ'
    };
    return descriptions[rank] || 'Không xác định';
  };

  const getRankColor = (rank: string): string => {
    const colors: Record<string, string> = {
      'S': 'text-purple-600',
      'A': 'text-green-600',
      'B': 'text-blue-600',
      'C': 'text-yellow-600',
      'D': 'text-orange-600',
      'F': 'text-red-600'
    };
    return colors[rank] || 'text-gray-600';
  };

  const rank = getRank(result.exploitationRate);
  const rankColor = getRankColor(rank);
  const quote = getQuoteForRank(rank);

  const handleSaveToLeaderboard = () => {
    setShowNameModal(true);
  };

  const handleNameSubmit = (name: string) => {
    const entry = saveToLeaderboard(result, name);
    onLeaderboardSaved(entry.id);
    setIsSaved(true);
    setShowNameModal(false);
  };

  const handleNameSkip = () => {
    const entry = saveToLeaderboard(result, 'Anonymous');
    onLeaderboardSaved(entry.id);
    setIsSaved(true);
    setShowNameModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-rose-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        {/* Result Header */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">{result.survived ? '🏆' : '💀'}</div>
          <h1 className={result.survived ? 'text-green-600 mb-2' : 'text-red-600 mb-2'}>
            {result.survived ? 'HOÀN THÀNH!' : 'THẤT BẠI!'}
          </h1>
          <p className="text-gray-600 text-lg">{result.reason}</p>
          <div className="mt-4 text-gray-500">
            Đã trải qua <strong className="text-red-600">{result.rounds}</strong> vòng sản xuất
          </div>
        </div>

        {/* Rank Display */}
        {result.survived && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl p-8 mb-8 text-center">
            <div className="text-sm text-purple-600 mb-2">XẾP HẠNG</div>
            <div className={`text-9xl ${rankColor} mb-4 animate-pulse`}>{rank}</div>
            <div className={`text-xl ${rankColor} mb-3`}>{getRankDescription(rank)}</div>
            <div className="text-gray-600">
              Tỷ lệ bóc lột: <strong className={rankColor}>{result.exploitationRate.toFixed(3)}</strong>
            </div>
          </div>
        )}

        {/* Marx's Metrics */}
        <div className="mb-8">
          <h2 className="text-red-700 mb-4 text-center">📊 Chỉ số Marx</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
              <div className="text-blue-700 text-sm mb-1">Tổng thời gian lao động</div>
              <div className="text-3xl text-blue-800">{result.laborTime.toFixed(0)}</div>
              <div className="text-xs text-gray-500 mt-1">Tổng thời gian lao động</div>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
              <div className="text-green-700 text-sm mb-1">Lao động cần thiết</div>
              <div className="text-3xl text-green-800">{result.necessaryLabor.toFixed(0)}</div>
              <div className="text-xs text-gray-500 mt-1">Lao động cần thiết</div>
            </div>

            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 text-center">
              <div className="text-orange-700 text-sm mb-1">Lao động thặng dư</div>
              <div className="text-3xl text-orange-800">{result.surplusLabor.toFixed(0)}</div>
              <div className="text-xs text-gray-500 mt-1">Lao động thặng dư</div>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
              <div className="text-red-700 text-sm mb-1">Giá trị thặng dư</div>
              <div className="text-3xl text-red-800">{result.surplusValue.toFixed(0)}</div>
              <div className="text-xs text-gray-500 mt-1">Giá trị thặng dư</div>
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 text-center">
              <div className="text-purple-700 text-sm mb-1">Tỷ lệ bóc lột</div>
              <div className="text-3xl text-purple-800">{result.exploitationRate.toFixed(2)}</div>
              <div className="text-xs text-gray-500 mt-1">Tỷ lệ bóc lột</div>
            </div>

            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 text-center">
              <div className="text-gray-700 text-sm mb-1">Số vòng hoàn thành</div>
              <div className="text-3xl text-gray-800">{result.rounds}</div>
              <div className="text-xs text-gray-500 mt-1">Số vòng hoàn thành</div>
            </div>
          </div>
        </div>

        {/* Final Stats */}
        <div className="mb-8">
          <h3 className="text-gray-700 mb-4 text-center">Chỉ số cuối cùng</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
              <div className="text-blue-700 text-sm mb-1">Tư bản sản xuất (C)</div>
              <div className="text-2xl text-blue-800">{result.finalC.toFixed(1)}</div>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
              <div className="text-green-700 text-sm mb-1">Sức lao động (L)</div>
              <div className="text-2xl text-green-800">{result.finalL.toFixed(1)}</div>
            </div>
            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 text-center">
              <div className="text-orange-700 text-sm mb-1">Tái sản xuất (R)</div>
              <div className="text-2xl text-orange-800">{result.finalR.toFixed(1)}</div>
            </div>
          </div>
        </div>

        {/* Marx Quote */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 rounded-2xl p-6 mb-8">
          <div className="text-center">
            <div className="text-4xl mb-4">✊</div>
            <p className="text-gray-800 italic leading-relaxed mb-3">
              "{quote.text}"
            </p>
            <div className="text-red-700">— {quote.author} — </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
  <h4 className="text-blue-700 mb-3 text-center font-bold text-lg">📚 Giải thích Thuật ngữ</h4>
  <div className="text-gray-700 text-sm leading-relaxed space-y-3">
    <p>
      <strong className="text-blue-800">1. Thời gian lao động:</strong> Tổng thời gian công nhân làm việc trong một chu kỳ.
    </p>
    <p>
      <strong className="text-green-700">2. Lao động tất yếu (Necessary Labor):</strong> Phần thời gian công nhân tạo ra giá trị ngang bằng với sức lao động của mình (tương đương tiền lương nhận được).
    </p>
    <p>
      <strong className="text-orange-700">3. Lao động thặng dư (Surplus Labor):</strong> 
      <br/>
      <span className="italic">Lao động thặng dư = Tổng thời gian - Lao động tất yếu.</span>
      <br/>
      Trong thời gian này, công nhân vẫn làm việc nhưng không được trả công. Đây là nguồn gốc của lợi nhuận.
    </p>
    <p>
      <strong className="text-red-700">4. Giá trị thặng dư (m):</strong> Giá trị được tạo ra trong thời gian lao động thặng dư.
    </p>
    <div className="bg-white p-3 rounded-lg border border-blue-100">
      <strong className="text-purple-700 block mb-1">5. Tỷ suất giá trị thặng dư (m'):</strong>
      <div>Công thức: <code className="bg-gray-100 px-2 py-1 rounded font-mono text-red-600 font-bold">m' = m / v</code></div>
      <ul className="list-disc pl-4 mt-1 text-gray-600">
        <li><strong>m:</strong> Giá trị thặng dư</li>
        <li><strong>v:</strong> Tư bản khả biến (Tiền lương/Lao động tất yếu)</li>
      </ul>
      <p className="mt-1 italic text-xs">
        ➔ Tỷ lệ này càng cao nghĩa là mức độ bóc lột của nhà tư bản đối với công nhân càng nặng nề.
      </p>
    </div>
  </div>
</div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {!isSaved && (
            <button
              onClick={handleSaveToLeaderboard}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-black py-4 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              💾 Lưu vào bảng xếp hạng
            </button>
          )}
          
          {isSaved && (
            <button
              onClick={onViewLeaderboard}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-black py-4 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              🏆 Xem bảng xếp hạng
            </button>
          )}

          <div className="flex gap-4">
            <button
              onClick={onRestart}
              className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-4 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              🔄 Chơi lại
            </button>
            <button
              onClick={onBackToMenu}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-4 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              🏠 Menu
            </button>
          </div>
        </div>

        {showNameModal && (
          <PlayerNameModal onSubmit={handleNameSubmit} onSkip={handleNameSkip} />
        )}
      </div>
    </div>
  );
}
