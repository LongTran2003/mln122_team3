
export interface SpecialEvent {
  title: string;
  description: string;
  icon: string;
  effects: {
    C: number;
    L: number;
    R: number;
  };
}

// All available special events (no longer tied to specific rounds)
export const ALL_SPECIAL_EVENTS: SpecialEvent[] = [
  {
    title: 'Đình công tự phát',
    description: 'Công nhân đình công phản đối điều kiện làm việc tồi tệ',
    icon: '✊',
    effects: { C: -10, L: -15, R: -8 }
  },
  {
    title: 'Luật lao động mới',
    description: 'Chính phủ ban hành luật bảo vệ người lao động',
    icon: '⚖️',
    effects: { C: -8, L: 5, R: 10 }
  },
  {
    title: 'Cách mạng công nghiệp 4.0',
    description: 'Làn sóng tự động hóa lan rộng trong ngành',
    icon: '🤖',
    effects: { C: -12, L: -20, R: 5 }
  },
  {
    title: 'Khủng hoảng kinh tế',
    description: 'Suy thoái kinh tế, nhu cầu thị trường giảm mạnh',
    icon: '📉',
    effects: { C: -15, L: -10, R: -12 }
  },
  {
    title: 'Tăng lương tối thiểu',
    description: 'Nhà nước tăng mức lương tối thiểu vùng',
    icon: '💰',
    effects: { C: -10, L: 8, R: 15 }
  },
  {
    title: 'Thành lập công đoàn',
    description: 'Công nhân lập công đoàn đòi quyền lợi',
    icon: '🏛️',
    effects: { C: -5, L: 10, R: 12 }
  },
  {
    title: 'Bùng nổ AI và Robot',
    description: 'AI thay thế hàng loạt công việc',
    icon: '🦿',
    effects: { C: -18, L: -25, R: 8 }
  },
  {
    title: 'Thanh tra lao động đột xuất',
    description: 'Kiểm tra vi phạm luật lao động, phạt nặng',
    icon: '👮',
    effects: { C: -12, L: 3, R: 10 }
  },
  {
    title: 'Phong trào công nhân toàn cầu',
    description: 'Công nhân đoàn kết quốc tế đòi quyền lợi',
    icon: '🌍',
    effects: { C: -8, L: 12, R: 18 }
  },
  {
    title: 'Tư nhân hóa hoàn toàn',
    description: 'Chính sách tư nhân hóa, cắt giảm phúc lợi',
    icon: '🏦',
    effects: { C: 15, L: -10, R: -20 }
  }
];

// Configuration for random event system
const EVENT_CONFIG = {
  BASE_PROBABILITY: 0.25, // 25% base chance per round (increased for more challenge)
  MIN_ROUND_GAP: 1, // Minimum rounds between events (reduced for more frequent events)
  PROBABILITY_INCREASE_PER_ROUND: 0.03 // Probability increases by 3% each round without event (faster escalation)
};

// Track used events to avoid repetition in the same game
let usedEventIndices: number[] = [];
let lastEventRound = 0;

/**
 * Reset the event tracking (call this when starting a new game)
 */
export function resetEventTracking(): void {
  usedEventIndices = [];
  lastEventRound = 0;
}

/**
 * Get a random special event based on probability
 * Returns null if no event should occur this round
 */
export function getRandomSpecialEvent(currentRound: number): SpecialEvent | null {
  // Don't trigger events in first 3 rounds (tutorial period)
  if (currentRound <= 2) {
    return null;
  }

  // Check minimum gap between events
  if (currentRound - lastEventRound < EVENT_CONFIG.MIN_ROUND_GAP) {
    return null;
  }

  // Calculate probability based on rounds since last event
  const roundsSinceLastEvent = currentRound - lastEventRound;
  const probability = Math.min(
    0.65, // Cap at 65% max probability (increased for more challenge)
    EVENT_CONFIG.BASE_PROBABILITY + 
    (roundsSinceLastEvent - EVENT_CONFIG.MIN_ROUND_GAP) * EVENT_CONFIG.PROBABILITY_INCREASE_PER_ROUND
  );

  // Roll for event occurrence
  if (Math.random() > probability) {
    return null;
  }

  // Get available events (not yet used)
  const availableIndices = ALL_SPECIAL_EVENTS
    .map((_, index) => index)
    .filter(index => !usedEventIndices.includes(index));

  // If all events used, reset the pool
  if (availableIndices.length === 0) {
    usedEventIndices = [];
    availableIndices.push(...ALL_SPECIAL_EVENTS.map((_, index) => index));
  }

  // Select random event from available pool
  const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  usedEventIndices.push(randomIndex);
  lastEventRound = currentRound;

  return ALL_SPECIAL_EVENTS[randomIndex];
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use getRandomSpecialEvent instead
 */
export function getSpecialEvent(round: number): SpecialEvent | null {
  return getRandomSpecialEvent(round);
}
