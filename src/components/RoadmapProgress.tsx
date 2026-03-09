interface RoadmapProgressProps {
  currentRound: number;
  maxRounds: number;
}

export function RoadmapProgress({ currentRound, maxRounds }: RoadmapProgressProps) {
  const milestones = [
    { round: 1, label: 'Bắt đầu', icon: '🏁' },
    { round: 10, label: 'Thử thách 1', icon: '💥' },
    { round: 20, label: 'Thử thách 2', icon: '⚡' },
    { round: 30, label: 'Win', icon: '🏆' }
  ];

  const clampedRound = Math.min(Math.max(currentRound, 1), maxRounds);
  const progress = (clampedRound / maxRounds) * 100;

  return (
    <div className="bg-white border-2 border-red-300 rounded-2xl p-8 min-h-[220px] shadow-lg mb-6 relative">
      {/* Header: title + round cùng 1 layer */}
      <div className="relative z-40 flex items-start justify-between mb-6 -translate-y-1">
        <h2 className="text-red-700 font-bold text-xl flex items-center gap-1 leading-none">
          🗺️ Lộ trình tiến độ
        </h2>
        <div className="bg-red-100 px-4 py-2 rounded-xl leading-none">
          <span className="text-gray-700 font-semibold">Vòng </span>
          <span className="text-red-700 text-2xl font-bold">{clampedRound}</span>
          <span className="text-gray-700 font-semibold"> / {maxRounds}</span>
        </div>
      </div>

      {/* Progress Container */}
      <div className="relative z-10 px-4">
        {/* Player layer: nằm trên milestones */}
        <div
          className="absolute -top-16 transform -translate-x-1/2 transition-all duration-700 ease-in-out z-30"
          style={{ left: `calc(${progress}% - 8px)` }}
        >
          <div className="text-3xl animate-bounce drop-shadow-2xl">🧐</div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 transition-all duration-700 ease-in-out"
            style={{
              width: `${Math.min(progress, 100)}%`,
              boxShadow: '0 0 20px rgba(251, 146, 60, 0.8)'
            }}
          />
        </div>

        {/* Milestone layer */}
        <div className="relative mt-3 z-20">
          {milestones.map((milestone) => {
            const position = (milestone.round / maxRounds) * 100;
            const isPassed = clampedRound >= milestone.round;
            const isCurrent = clampedRound === milestone.round;

            return (
              <div
                key={milestone.round}
                className="absolute transform -translate-x-1/2 z-20"
                style={{ left: `calc(${position}% - 30px)`, top: '-40px' }}
              >
                {/* Marker dot */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl border-3 shadow-lg transition-all duration-300 ${
                    isCurrent
                      ? 'bg-yellow-400 border-yellow-600 scale-125 animate-pulse'
                      : isPassed
                      ? 'bg-green-500 border-green-700'
                      : 'bg-gray-300 border-gray-500'
                  }`}
                >
                  {milestone.icon}
                </div>

                {/* Label */}
                <div
                  className={`mt-2 text-xs font-bold whitespace-nowrap text-center transition-colors ${
                    isPassed ? 'text-green-700' : 'text-gray-500'
                  }`}
                >
                  <div className="text-sm">V{milestone.round}</div>
                  <div className="text-[10px] mt-0.5">{milestone.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Spacing for milestone labels */}
        <div className="h-16" />
      </div>

      {/* Progress percentage */}
      <div className="text-center mt-2">
        <span className="text-gray-600 text-sm">
          Tiến độ:{' '}
          <span className="font-bold text-red-600">{Math.min(Math.round(progress), 100)}%</span>
        </span>
      </div>
    </div>
  );
}