interface MenuScreenProps {
  onStart: () => void;
  onViewLeaderboard: () => void;
}

export function MenuScreen({ onStart, onViewLeaderboard }: MenuScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-rose-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="text-7xl mb-4">⚒️</div>
          <h1 className="text-red-700 mb-3">Project M'</h1>
          <h2 className="text-gray-700 mb-2">Mật Mã Thặng Dư</h2>
          <p className="text-gray-500">Bạn có thể cân bằng mâu thuẫn giữa Tư bản và Lao động?</p>
          <p className="text-gray-500 italic mt-4">
    "Bạn sẽ là nhà tư bản vĩ đại hay kẻ bóc lột tàn bạo?"
  </p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 mb-8 border-2 border-red-200">
          <h3 className="text-red-700 mb-6 text-center">📚 Luật Chơi</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border-2 border-blue-200">
              <div className="text-4xl mb-2 text-center"></div>
              <img alt="Tư bản sản xuất" className="w-36 h-36 object-contain" src="/img/BANK.png" />
              <div className="text-blue-700 text-center mb-2">Tư bản sản xuất (C)</div>
              
            </div>
            <div className="bg-white rounded-xl p-4 border-2 border-green-200">
              <div className="text-4xl mb-2 text-center"></div>
              <img alt="Sức lao động" className="w-36 h-36 object-contain" src="/img/congnhan.png" />
              <div className="text-green-700 text-center mb-2">Sức lao động (L)</div>
          
            </div>
            <div className="bg-white rounded-xl p-4 border-2 border-orange-200">
              <div className="text-4xl mb-2 text-center"></div>
              <img alt="Tái sản xuất sức lao động" className="w-36 h-36 object-contain" src="/img/nhamay.png" />
              <div className="text-orange-700 text-center mb-2">Tái sản xuất sức lao động (R)</div>
           
            </div>
          </div>

          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3 bg-white rounded-lg p-3">
              <span className="text-2xl">🎯</span>
              <div>
                <strong>Mục tiêu:</strong> Tồn tại 30 vòng với 3 chỉ số C, L, R cân bằng
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white rounded-lg p-3">
              <span className="text-2xl">🎴</span>
              <div>
                <strong>Gameplay:</strong> Mỗi vòng chọn 1 trong 3 chính sách ngẫu nhiên
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white rounded-lg p-3">
              <span className="text-2xl">⚡</span>
              <div>
                <strong>Sự kiện đặc biệt:</strong> Xuất hiện ngẫu nhiên với xác suất tăng dần
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 mb-8">
          <h3 className="text-red-700 mb-4 text-center">💀 Điều Kiện Thua</h3>
          <div className="space-y-2 text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-red-600">✗</span>
              <span>C, L hoặc R về 0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-600">✗</span>
              <span>|C - L| {'>'} 40 (mâu thuẫn tư bản - lao động quá lớn)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-600">✗</span>
              <span>R {'<'} 15 trong 3 vòng liên tiếp (công nhân kiệt quệ)</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6 mb-8">
          <h3 className="text-purple-700 mb-3 text-center">📊 Đánh Giá Cuối Game</h3>
          <p className="text-gray-700 text-center">
            Hệ thống sẽ tính toán <strong>Thời gian lao động </strong>, <strong>Lao động cần thiết</strong>, 
            <strong> Lao động dư thừa</strong>, <strong>Giá trị thặng dư (m')</strong> và 
            <strong> Tỉ lệ bóc lột (m/v)</strong> theo công thức của Karl Marx
          </p>
          <div className="mt-4 text-center text-sm text-gray-600">
            Xếp rank: S, A, B, C, D, F
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={onStart}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-5 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            ⚒️ Bắt đầu cuộc cách mạng
          </button>
          
          <button
            onClick={onViewLeaderboard}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-black py-4 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            🏆 Bảng xếp hạng
          </button>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm italic">
          "Giá trị thặng dư, được quan niệm là con đẻ của toàn bộ tư bản ứng trước, mang hình thái chuyển hóa là lợi nhuận" - Karl Marx
        </div>
      </div>
    </div>
  );
}
