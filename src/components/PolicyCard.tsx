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

  const categoryColor = categoryColors[policy.category];

  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`${categoryColor} border-2 rounded-2xl p-6 transition-all duration-200 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 w-full`}
    >
      <div className="text-5xl mb-3">{policy.icon}</div>
      <h3 className="text-gray-800 mb-2">{policy.name}</h3>
      <p className="text-sm text-gray-600 mb-4 min-h-[48px]">{policy.description}</p>
      
      <div className="bg-white/70 rounded-xl p-3 space-y-1 border border-gray-200">
        <div className="text-xs text-gray-500 mb-1">Hiệu ứng:</div>
        {formatEffect(policy.effects.C, 'C')}
        {formatEffect(policy.effects.L, 'L')}
        {formatEffect(policy.effects.R, 'R')}
      </div>
    </button>
  );
}
