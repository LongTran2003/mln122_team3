export interface Milestone {
  round: number;
  event: string;
  description: string;
}

export interface Ideology {
  id: string;
  name: string;
  icon: string;
  color: string; // gradient colors
  description: string;
  condition: (C: number, L: number, R: number) => boolean;
  milestones: string[]; // Key characteristics
  historicalExample: string;
}

export const IDEOLOGIES: Ideology[] = [
  {
    id: 'wild_capitalism',
    name: 'Tư bản Tự do Cực đoan',
    icon: '🏭',
    color: 'from-gray-700 to-gray-900',
    description: 'Bóc lột tối đa, phúc lợi tối thiểu. Tư bản thống trị hoàn toàn, công nhân chỉ là công cụ sản xuất.',
    condition: (C, L, R) => C > 60 && L < 40 && R < 35,
    milestones: [
      '📊 Tư bản cao (C > 60) - tích luỹ không giới hạn',
      '😰 Lao động thấp (L < 40) - công nhân suy kiệt',
      '💔 Tái sản xuất kém (R < 35) - không đầu tư cho người lao động',
      '⚖️ Mâu thuẫn lớn (|C-L| cao) - xung đột giai cấp nghiêm trọng'
    ],
    historicalExample: 'Cách mạng Công nghiệp Anh thế kỷ 19 - trẻ em làm việc 14h/ngày trong nhà máy'
  },
  {
    id: 'fascism',
    name: 'Chủ nghĩa Phát xít',
    icon: '⚔️',
    color: 'from-red-900 to-black',
    description: 'Quân sự hoá nền kinh tế, đàn áp công nhân, toàn bộ nguồn lực phục vụ nhà nước toàn trị.',
    condition: (C, L, R) => C > 70 && Math.abs(C - L) > 35 && R < 30,
    milestones: [
      '⚔️ Quân sự hoá (C rất cao) - công nghiệp phục vụ chiến tranh',
      '🔒 Đàn áp lao động (L thấp, bị kiểm soát)',
      '💀 Tái sản xuất bị bỏ qua (R < 30) - con người chỉ là công cụ',
      '🚫 Không có quyền công đoàn - lao động bị cưỡng bức'
    ],
    historicalExample: 'Đức Quốc xã 1933-1945 - nền kinh tế phục vụ chiến tranh, lao động cưỡng bức'
  },
  {
    id: 'welfare_state',
    name: 'Nhà nước Phúc lợi',
    icon: '🏥',
    color: 'from-blue-400 to-green-400',
    description: 'Cân bằng giữa tư bản và lao động. Đầu tư mạnh vào phúc lợi xã hội, Y tế + Giáo dục miễn phí.',
    condition: (C, L, R) => Math.abs(C - L) < 25 && R > 45 && C > 40 && L > 40,
    milestones: [
      '⚖️ Cân bằng C-L (|C-L| < 25) - lợi ích cả hai giai cấp',
      '💚 Phúc lợi cao (R > 45) - Y tế, giáo dục, bảo hiểm đầy đủ',
      '🏛️ Nhà nước can thiệp - điều tiết thu nhập, thuế luỹ tiến',
      '🤝 Đối thoại xã hội - công đoàn và doanh nghiệp thương lượng'
    ],
    historicalExample: 'Scandinavia hiện đại - Thụy Điển, Na Uy, Đan Mạch'
  },
  {
    id: 'socialism',
    name: 'Chủ nghĩa Xã hội',
    icon: '✊',
    color: 'from-red-500 to-orange-500',
    description: 'Ưu tiên lợi ích công nhân, tư bản bị giới hạn. Phương tiện sản xuất thuộc sở hữu tập thể.',
    condition: (C, L, R) => L > C && L > 50 && R > 40 && C > 25,
    milestones: [
      '👷 Lao động ưu tiên (L > C) - công nhân là trung tâm',
      '🏭 Tư bản hạn chế - doanh nghiệp nhà nước chiếm ưu thế',
      '🌾 Phúc lợi tốt (R > 40) - đảm bảo đời sống công nhân',
      '🗳️ Dân chủ công nhân - công nhân tham gia quản lý'
    ],
    historicalExample: 'Nam Tư dưới thời Tito - tự quản công nhân, kinh tế hợp tác xã'
  },
  {
    id: 'communism',
    name: 'Chủ nghĩa Cộng sản',
    icon: '🚩',
    color: 'from-red-600 to-yellow-500',
    description: 'Xoá bỏ tư bản tư nhân, toàn bộ phương tiện sản xuất thuộc về nhân dân. "Của mỗi người, theo năng lực; cho mỗi người, theo nhu cầu."',
    condition: (C, L, R) => C < 35 && L > 60 && R > 50,
    milestones: [
      '🚩 Xoá bỏ tư bản tư nhân (C < 35) - tài sản công hữu',
      '✊ Quyền lực công nhân (L > 60) - công nhân nắm quyền',
      '🌾 Đời sống đảm bảo (R > 50) - miễn phí Y tế, giáo dục, nhà ở',
      '🏛️ Độc tài vô sản - giai cấp công nhân làm chủ nhà nước'
    ],
    historicalExample: 'Liên Xô thời kỳ đầu (1920s) - xoá bỏ tư hữu, tập thể hoá'
  },
  {
    id: 'balanced',
    name: 'Nền kinh tế Hỗn hợp',
    icon: '⚖️',
    color: 'from-purple-400 to-pink-400',
    description: 'Cân bằng các yếu tố, không quá cực đoan về bất kỳ mô hình nào. Thực dụng, điều chỉnh linh hoạt.',
    condition: (C, L, R) => Math.abs(C - L) < 30 && C > 35 && L > 35 && R > 35,
    milestones: [
      '⚖️ Cân bằng tổng thể (C, L, R đều ổn định)',
      '🎯 Không cực đoan - tránh các mô hình quá thái',
      '🔄 Thích ứng linh hoạt - điều chỉnh theo tình hình',
      '🤷 Thiếu định hướng rõ ràng - có thể dẫn đến mâu thuẫn'
    ],
    historicalExample: 'Hầu hết nền kinh tế hiện đại - hỗn hợp thị trường và nhà nước'
  }
];

export function determineIdeology(C: number, L: number, R: number): Ideology {
  // Check theo thứ tự từ cực đoan đến moderate
  for (const ideology of IDEOLOGIES) {
    if (ideology.condition(C, L, R)) {
      return ideology;
    }
  }
  
  // Default: Balanced
  return IDEOLOGIES[IDEOLOGIES.length - 1];
}