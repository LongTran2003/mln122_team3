import { Policy } from '../data/policies';

interface PolicyCardProps {
  policy: Policy;
  onSelect: () => void;
  disabled?: boolean;
}

export function PolicyCard({ policy, onSelect, disabled }: PolicyCardProps) {
  const formatEffect = (value: number, label: string) => {
    const sign = value > 0 ? '+' : '';
    const color = value > 0 ? 'text-green-600' : 'text-red-600';
    return (
      <div className={`text-sm ${color}`}>
        {label}: {sign}{value}
      </div>
    );
  };

  const categoryColors = {
    exploitation: 'border-red-300 hover:border-red-500 bg-red-50',
    investment: 'border-blue-300 hover:border-blue-500 bg-blue-50',
    welfare: 'border-green-300 hover:border-green-500 bg-green-50',
    balanced: 'border-purple-300 hover:border-purple-500 bg-purple-50'
  };

  const tierConfig = {
    common: { 
      label: 'Common', 
      bgColor: 'bg-gray-600', 
      textColor: 'text-black',
      glow: ''
    },
    rare: { 
      label: 'Rare', 
      bgColor: 'bg-blue-600', 
      textColor: 'text-black',
      glow: 'shadow-md shadow-blue-300'
    },
    epic: { 
      label: 'Epic', 
      bgColor: 'bg-gradient-to-r from-purple-600 to-pink-600', 
      textColor: 'text-black',
      glow: 'shadow-lg shadow-purple-400'
    }
  };

  const categoryColor = categoryColors[policy.category];
  const tierStyle = tierConfig[policy.tier];

  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`${categoryColor} border-2 rounded-2xl p-6 transition-all duration-200 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 w-full relative`}
    >
      {/* Tier Badge */}
      <div className="flex justify-center mb-2">
        <div className={`${tierStyle.bgColor} ${tierStyle.textColor} ${tierStyle.glow} px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest`}>
          {tierStyle.label}
        </div>
      </div>

      <div className="text-5xl mb-3">{policy.icon}</div>
      <h3 className="text-gray-800 mb-2 text-lg font-bold">{policy.name}</h3>
      <p className="text-sm text-gray-600 mb-4 min-h-[48px]">{policy.description}</p>
      
      <div className="bg-white/70 rounded-xl p-3 space-y-1 border border-gray-200 mb-3">
        <div className="text-xs text-gray-500 mb-1">Hiệu ứng:</div>
        {formatEffect(policy.effects.C, 'C')}
        {formatEffect(policy.effects.L, 'L')}
        {formatEffect(policy.effects.R, 'R')}
      </div>

      {/* Historical Context */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 mt-2">
        <div className="text-xs text-amber-800 italic leading-relaxed">
          📜 {policy.historicalContext}
        </div>
      </div>
    </button>
  );
}
