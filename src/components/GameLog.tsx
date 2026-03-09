export interface LogEntry {
  round: number;
  message: string;
  type: 'policy' | 'event' | 'warning' | 'critical';
}

interface GameLogProps {
  logs: LogEntry[];
  currentRound: number;
}

export function GameLog({ logs, currentRound }: GameLogProps) {
  const getLogStyle = (type: string) => {
    switch (type) {
      case 'event':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'event':
        return '⚡';
      case 'warning':
        return '⚠️';
      case 'critical':
        return '🚨';
      default:
        return '📝';
    }
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-700 flex items-center gap-2">
          <span className="text-xl">📜</span>
          Nhật ký sự kiện
        </h3>
        <div className="text-sm text-gray-500">Vòng {currentRound}/30</div>
      </div>
      
      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
        {logs.length === 0 ? (
          <div className="text-gray-400 text-sm text-center py-8">
            Chưa có sự kiện nào
          </div>
        ) : (
          logs.slice().reverse().map((log, index) => (
            <div
              key={`${log.round}-${index}`}
              className={`border-2 rounded-xl p-3 text-sm ${getLogStyle(log.type)} transition-all duration-300`}
            >
              <div className="flex items-start gap-2">
                <span className="text-lg">{getLogIcon(log.type)}</span>
                <div className="flex-1">
                  <div className="opacity-70 text-xs mb-1">Vòng {log.round}</div>
                  <div className="leading-relaxed">{log.message}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
