
import { useState } from 'react';

interface PlayerNameModalProps {
  onSubmit: (name: string) => void;
  onSkip: () => void;
}

export function PlayerNameModal({ onSubmit, onSkip }: PlayerNameModalProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl text-gray-800 mb-2">Lưu vào bảng xếp hạng</h2>
          <p className="text-gray-600">Nhập tên của bạn để lưu kết quả</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên của bạn..."
              maxLength={20}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
              autoFocus
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {name.length}/20
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onSkip}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl transition-all duration-200"
            >
              Bỏ qua
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Lưu
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          Nhấn Enter để lưu hoặc Esc để bỏ qua
        </div>
      </div>
    </div>
  );
}
