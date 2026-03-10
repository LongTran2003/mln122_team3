import { BossRound } from '../data/boss-round';
import { useState } from 'react'; // 🆕 Import useState 

interface BossIntroModalProps {
  boss: BossRound;
  onStart: () => void;
}

export function BossIntroModal({ boss, onStart }: BossIntroModalProps) {
  const [isTipOpen, setIsTipOpen] = useState(false); // 🆕 State để track tip
  
  return (
    // Xóa backdrop-blur-sm, đặt bg-black/70 để chỉ làm tối nền
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      {/* Thay bg-gradient bằng bg-white, bỏ hiệu ứng mờ */}
      <div className="bg-white rounded-2xl max-w-3xl w-full p-8 shadow-2xl border-2 border-gray-200 overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{boss.icon}</div>
          <h2 className="text-gray-900 font-bold text-2xl mb-2">{boss.title}</h2>
          <div className="inline-block bg-gray-900 text-white px-5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            Vòng {boss.round} - Boss Round
          </div>
        </div>

        {/* Nội dung: dùng background đặc để dễ đọc */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="text-red-600 font-bold text-sm mb-2 uppercase flex items-center gap-2">
              ⚠️ Tình huống
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{boss.description}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="text-amber-600 font-bold text-sm mb-2 uppercase flex items-center gap-2">
              📚 Bối cảnh lịch sử
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{boss.historicalContext}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="text-purple-600 font-bold text-sm mb-2 uppercase flex items-center gap-2">
              🎮 Luật chơi đặc biệt
            </h3>
            <p className="text-gray-700 text-sm mb-4">{boss.mechanicDescription}</p>
            
            {/* Hiệu ứng tự động */}
            {boss.rules.autoEffects && (
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                <span className="text-gray-500 text-[10px] font-bold block mb-1">HIỆU ỨNG TỰ ĐỘNG</span>
                <div className="flex gap-4 justify-center">
                  {['C', 'L', 'R'].map((key) => boss.rules.autoEffects[key] !== 0 && (
                    <span key={key} className={`${boss.rules.autoEffects[key] > 0 ? 'text-green-600' : 'text-red-600'} font-black`}>
                      {key}: {boss.rules.autoEffects[key] > 0 ? '+' : ''}{boss.rules.autoEffects[key]}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
          {/* 🆕 Collapsible Tip - Compact version */}
          {boss.educationalInsight && (
            <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl border-2 border-amber-300 overflow-hidden">
              <button
                onClick={() => setIsTipOpen(!isTipOpen)}
                className="w-full p-3 hover:bg-amber-200 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💡</span>
                    <span className="text-amber-700 font-bold text-xs uppercase">
                      Mẹo chiến thắng
                    </span>
                  </div>
                  <span className={`text-amber-600 text-lg transition-transform ${isTipOpen ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {isTipOpen && (
                <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 p-4 border-t-2 border-emerald-200">
                  <div className="flex items-start gap-2">
                    <span className="text-base">🎓</span>
                    <p className="text-gray-800 text-xs leading-relaxed">
                      {boss.educationalInsight}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl text-base font-bold transition-all shadow-md"
        >
          ĐỐI MẶT VỚI BOSS
        </button>

        <p className="text-center text-gray-400 text-[10px] mt-4 uppercase tracking-widest">
          "Lịch sử là lịch sử của đấu tranh giai cấp"
        </p>
      </div>
    </div>
  );
}