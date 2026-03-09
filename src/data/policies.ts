export interface Policy {
  id: string;
  name: string;
  description: string;
  icon: string;
  effects: {
    C: number;  // Capital change (absolute)
    L: number;  // Labor change (absolute)
    R: number;  // Reproduction change (absolute)
  };
  category: 'exploitation' | 'investment' | 'welfare' | 'balanced';
}

export const ALL_POLICIES: Policy[] = [
  // Exploitation-heavy policies
  {
    id: 'overtime',
    name: 'Tăng ca bắt buộc',
    description: 'Bắt công nhân làm thêm giờ không trả lương',
    icon: '⏰',
    effects: { C: 8, L: -6, R: -4 },
    category: 'exploitation'
  },
  {
    id: 'wage_cut',
    name: 'Cắt giảm lương',
    description: 'Giảm lương để tăng lợi nhuận',
    icon: '✂️',
    effects: { C: 10, L: -8, R: -5 },
    category: 'exploitation'
  },
  {
    id: 'speedup',
    name: 'Tăng tốc độ sản xuất',
    description: 'Đẩy nhanh dây chuyền, tăng cường độ lao động',
    icon: '⚡',
    effects: { C: 7, L: -7, R: -3 },
    category: 'exploitation'
  },
  {
    id: 'layoff',
    name: 'Sa thải hàng loạt',
    description: 'Cắt giảm lực lượng lao động',
    icon: '🚪',
    effects: { C: 12, L: -15, R: 0 },
    category: 'exploitation'
  },

  // Investment/Automation policies
  {
    id: 'machinery',
    name: 'Đầu tư máy móc',
    description: 'Mua thiết bị mới thay thế lao động',
    icon: '🤖',
    effects: { C: -8, L: -4, R: 2 },
    category: 'investment'
  },
  {
    id: 'automation',
    name: 'Tự động hóa toàn diện',
    description: 'Thay thế lao động bằng robot và AI',
    icon: '🦾',
    effects: { C: -15, L: -10, R: 3 },
    category: 'investment'
  },
  {
    id: 'tech_upgrade',
    name: 'Nâng cấp công nghệ',
    description: 'Đầu tư R&D và công nghệ mới',
    icon: '🔬',
    effects: { C: -10, L: 0, R: 4 },
    category: 'investment'
  },
  {
    id: 'factory_expansion',
    name: 'Mở rộng nhà máy',
    description: 'Xây dựng cơ sở sản xuất mới',
    icon: '🏭',
    effects: { C: -12, L: 6, R: -2 },
    category: 'investment'
  },

  // Welfare policies
  {
    id: 'wage_increase',
    name: 'Tăng lương',
    description: 'Tăng lương để cải thiện đời sống công nhân',
    icon: '💵',
    effects: { C: -6, L: 8, R: 10 },
    category: 'welfare'
  },
  {
    id: 'healthcare',
    name: 'Bảo hiểm y tế',
    description: 'Cung cấp bảo hiểm sức khỏe toàn diện',
    icon: '🏥',
    effects: { C: -5, L: 4, R: 12 },
    category: 'welfare'
  },
  {
    id: 'safety',
    name: 'An toàn lao động',
    description: 'Cải thiện điều kiện làm việc',
    icon: '🦺',
    effects: { C: -4, L: 3, R: 8 },
    category: 'welfare'
  },
  {
    id: 'education',
    name: 'Đào tạo nghề',
    description: 'Đầu tư giáo dục và kỹ năng',
    icon: '📚',
    effects: { C: -7, L: 6, R: 9 },
    category: 'welfare'
  },
  {
    id: 'childcare',
    name: 'Trợ cấp con nhỏ',
    description: 'Hỗ trợ công nhân có con nhỏ',
    icon: '👶',
    effects: { C: -4, L: 2, R: 11 },
    category: 'welfare'
  },

  // Balanced policies
  {
    id: 'hire_workers',
    name: 'Tuyển thêm công nhân',
    description: 'Mở rộng lực lượng lao động',
    icon: '👥',
    effects: { C: -5, L: 10, R: -3 },
    category: 'balanced'
  },
  {
    id: 'outsource',
    name: 'Gia công thuê ngoài',
    description: 'Chuyển một phần sản xuất ra ngoài',
    icon: '🏢',
    effects: { C: 4, L: -5, R: 2 },
    category: 'balanced'
  },
  {
    id: 'bonus',
    name: 'Thưởng hiệu suất',
    description: 'Thưởng dựa trên năng suất',
    icon: '🎁',
    effects: { C: -3, L: 5, R: 6 },
    category: 'balanced'
  },
  {
    id: 'reduce_hours',
    name: 'Giảm giờ làm',
    description: 'Rút ngắn thời gian làm việc',
    icon: '🌙',
    effects: { C: -4, L: 6, R: 7 },
    category: 'balanced'
  },
  {
    id: 'profit_sharing',
    name: 'Chia sẻ lợi nhuận',
    description: 'Công nhân được hưởng phần lợi nhuận',
    icon: '🤝',
    effects: { C: -8, L: 7, R: 10 },
    category: 'balanced'
  }
];

export function getRandomPolicies(count: number = 3): Policy[] {
  const shuffled = [...ALL_POLICIES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
