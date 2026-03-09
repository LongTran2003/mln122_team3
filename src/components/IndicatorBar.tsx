interface IndicatorBarProps {
  label: string;
  value: number;
  maxValue: number;
  icon: string;
  color: 'blue' | 'green' | 'orange';
  warning?: boolean;
}

export function IndicatorBar({ label, value, maxValue, icon, color, warning }: IndicatorBarProps) {
  const percentage = Math.max(0, Math.min(100, (value / maxValue) * 100));
  
  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      light: 'bg-blue-50',
      border: 'border-blue-300',
      text: 'text-blue-700'
    },
    green: {
      bg: 'bg-green-500',
      light: 'bg-green-50',
      border: 'border-green-300',
      text: 'text-green-700'
    },
    orange: {
      bg: 'bg-orange-500',
      light: 'bg-orange-50',
      border: 'border-orange-300',
      text: 'text-orange-700'
    }
  };

  const colors = colorClasses[color];

  return (
    <div className={`${colors.light} border-2 ${colors.border} rounded-2xl p-4 ${warning ? 'animate-pulse' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-3xl">{icon}</span>
          <div>
            <div className={`${colors.text}`}>{label}</div>
            <div className="text-xs text-gray-500">Max: {maxValue}</div>
          </div>
        </div>
        <div className={`text-2xl ${colors.text} ${warning ? 'text-red-600' : ''}`}>
          {value.toFixed(0)}
        </div>
      </div>
      
      <div className={`relative h-8 bg-white border-2 ${colors.border} rounded-lg overflow-hidden`}>
        <div
          className={`h-full ${colors.bg} transition-all duration-500 ease-out ${warning ? 'bg-red-500' : ''}`}
          style={{ width: `${percentage}%` }}
        />
        {percentage < 20 && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-sm animate-pulse">
            ⚠️ NGUY HIỂM
          </div>
        )}
      </div>
      
      {warning && (
        <div className="mt-2 text-red-600 text-sm text-center animate-pulse">
          ⚠️ {label} đang ở mức nguy hiểm!
        </div>
      )}
    </div>
  );
}
