import { SpecialEvent } from '../data/special-events';

interface SpecialEventModalProps {
  event: SpecialEvent;
  onClose: () => void;
}

export function SpecialEventModal({ event, onClose }: SpecialEventModalProps) {
  const formatEffect = (value: number, label: string) => {
    if (value === 0) return null;
    const sign = value > 0 ? '+' : '';
    const color = value > 0 ? 'text-green-600' : 'text-red-600';
    return (
      <div className={`${color}`}>
        {label}: {sign}{value}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="max-w-lg w-full bg-gradient-to-br from-orange-50 to-red-50 border-4 border-red-500 rounded-3xl p-8 shadow-2xl animate-in zoom-in duration-300">
        <div className="text-center mb-6">
          <div className="text-7xl mb-4 animate-bounce">{event.icon}</div>
          <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm mb-3">
            Vòng {event.round} - Sự kiện đặc biệt
          </div>
          <h2 className="text-red-700 mb-3">{event.title}</h2>
          <p className="text-gray-700 leading-relaxed">{event.description}</p>
        </div>
        
        <div className="bg-white border-2 border-red-300 rounded-2xl p-6 mb-6">
          <div className="text-red-700 mb-3 text-center">⚡ Tác động:</div>
          <div className="space-y-2 text-lg text-center">
            {formatEffect(event.effects.C, 'Capital (C)')}
            {formatEffect(event.effects.L, 'Labor (L)')}
            {formatEffect(event.effects.R, 'Reproduction (R)')}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-4 rounded-xl transition-all duration-200 transform hover:scale-105"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
