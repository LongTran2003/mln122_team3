export interface Milestone {
  round: number;
  event: string;
  description: string;
}

export interface Ideology {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  condition: (C: number, L: number, R: number) => boolean;
  milestones: string[];
  imageDescriptions: string[]; // 🆕 Thêm field này
  historicalExample: string;
}

export const IDEOLOGIES: Ideology[] = [
  {
    id: 'wild_capitalism',
    name: 'Tư bản Tự do Cực đoan',
    icon: '🏭',
    color: 'from-gray-700 to-gray-900',
    description: '...',
    condition: (C, L, R) => C > 60 && L < 40 && R < 35,
    milestones: [
      '📊 Tư bản cao (C > 60) - tích luỹ không giới hạn',
      '😰 Lao động thấp (L < 40) - công nhân suy kiệt',
      '💔 Tái sản xuất kém (R < 35) - không đầu tư cho người lao động',
      '⚖️ Mâu thuẫn lớn (|C-L| cao) - xung đột giai cấp nghiêm trọng'
    ],
    imageDescriptions: [
      'Thời kỳ Gilded Age (1870-1900): Nhà máy khổng lồ với điều kiện lao động tồi tệ, không có luật bảo hộ. Công nhân làm việc 12-16 giờ/ngày.',
      'Khủng hoảng 1929: Sự sụp đổ của thị trường chứng khoán Wall Street. Hàng triệu người mất việc, kinh tế toàn cầu rơi vào suy thoái.',
      'Robber Barons: Các ông trùm tư bản như Rockefeller, Carnegie, J.P. Morgan tích lũy tài sản khổng lồ bằng cách độc quyền và bóc lột.',
      'Dây chuyền lắp ráp Ford (1913): Công nhân trở thành "bộ phận máy móc", lao động đơn điệu, không sáng tạo, lương thấp.'
    ],
    historicalExample: '...'
  },
  {
    id: 'fascism',
    name: 'Chủ nghĩa Phát xít',
    icon: '⚔️',
    color: 'from-red-900 to-black',
    description: '...',
    condition: (C, L, R) => C > 70 && Math.abs(C - L) > 35 && R < 30,
    milestones: [
      '⚔️ Quân sự hoá (C rất cao) - công nghiệp phục vụ chiến tranh',
      '🔒 Đàn áp lao động (L thấp, bị kiểm soát)',
      '💀 Tái sản xuất bị bỏ qua (R < 30) - con người chỉ là công cụ',
      '🚫 Không có quyền công đoàn - lao động bị cưỡng bức'
    ],
    imageDescriptions: [
      'Tuần hành quần chúng của Mussolini (1922): Hàng ngàn người biểu tình ủng hộ chế độ toàn trị. "Cuộc hành quân tới Rome" đánh dấu quyền lực phát xít.',
      'Áp phích tuyên truyền Đức Quốc xã: "Sức mạnh qua niềm vui" - tuyên truyền hình ảnh dân tộc vĩ đại, che giấu đàn áp và chiến tranh.',
      'Đảng phát xít chiếm chính quyền Italy (1922): Hệ thống chính trị độc tài chính thức ra đời, xoá bỏ dân chủ.',
      'Động viên quân sự toàn dân: Đàn ông, phụ nữ, trẻ em đều bị quân sự hóa. Toàn bộ kinh tế phục vụ chiến tranh.'
    ],
    historicalExample: '...'
  },
  {
    id: 'welfare_state',
    name: 'Nhà nước Phúc lợi',
    icon: '🏥',
    color: 'from-blue-400 to-green-400',
    description: '...',
    condition: (C, L, R) => Math.abs(C - L) < 25 && R > 45 && C > 40 && L > 40,
    milestones: [
      '⚖️ Cân bằng C-L (|C-L| < 25) - lợi ích cả hai giai cấp',
      '💚 Phúc lợi cao (R > 45) - Y tế, giáo dục, bảo hiểm đầy đủ',
      '🏛️ Nhà nước can thiệp - điều tiết thu nhập, thuế luỹ tiến',
      '🤝 Đối thoại xã hội - công đoàn và doanh nghiệp thương lượng'
    ],
    imageDescriptions: [
      'New Deal của FDR (1933): Chính phủ Mỹ can thiệp mạnh vào kinh tế, tạo việc làm công, xây dựng cơ sở hạ tầng, bảo vệ công nhân.',
      'Bảo hiểm xã hội sau WWII (1945-1960): Châu Âu xây dựng hệ thống phúc lợi toàn diện - lương hưu, thất nghiệp, y tế miễn phí.',
      'Chương trình Y tế mở rộng: NHS của Anh (1948) - chăm sóc sức khỏe miễn phí cho toàn dân. "Từ nôi đến mồ, nhà nước chăm lo."',
      'Mô hình Scandinavia: Thụy Điển, Na Uy, Đan Mạch - thuế cao, phúc lợi cao, bất bình đẳng thấp, chất lượng sống tốt nhất thế giới.'
    ],
    historicalExample: '...'
  },
  {
    id: 'socialism',
    name: 'Chủ nghĩa Xã hội',
    icon: '✊',
    color: 'from-red-500 to-orange-500',
    description: '...',
    condition: (C, L, R) => L > C && L > 50 && R > 40 && C > 25,
    milestones: [
      '👷 Lao động ưu tiên (L > C) - công nhân là trung tâm',
      '🏭 Tư bản hạn chế - doanh nghiệp nhà nước chiếm ưu thế',
      '🌾 Phúc lợi tốt (R > 40) - đảm bảo đời sống công nhân',
      '🗳️ Dân chủ công nhân - công nhân tham gia quản lý'
    ],
    imageDescriptions: [
      'Đình công công nhân thế kỷ 19: Công nhân đoàn kết đấu tranh đòi quyền lợi - 8 giờ làm việc, lương tối thiểu, điều kiện an toàn.',
      'Cuộc họp công đoàn sơ khai: Nơi công nhân tổ chức, thảo luận, học tập lý thuyết xã hội chủ nghĩa. "Nhân dân giác ngộ là nhân dân mạnh."',
      'Cộng đồng xã hội chủ nghĩa không tưởng: Robert Owen, Charles Fourier - các thí nghiệm xây dựng xã hội đồng đều, không bóc lột.',
      'Bảng hiệu hợp tác xã công nhân: "Được chia sẻ bởi những người làm việc" - công nhân sở hữu tập thể, quyết định dân chủ.'
    ],
    historicalExample: '...'
  },
  {
    id: 'communism',
    name: 'Chủ nghĩa Cộng sản',
    icon: '🚩',
    color: 'from-red-600 to-yellow-500',
    description: '...',
    condition: (C, L, R) => C < 35 && L > 60 && R > 50,
    milestones: [
      '🚩 Xoá bỏ tư bản tư nhân (C < 35) - tài sản công hữu',
      '✊ Quyền lực công nhân (L > 60) - công nhân nắm quyền',
      '🌾 Đời sống đảm bảo (R > 50) - miễn phí Y tế, giáo dục, nhà ở',
      '🏛️ Độc tài vô sản - giai cấp công nhân làm chủ nhà nước'
    ],
    imageDescriptions: [
      'Cách mạng tháng Mười 1917: Bolshevik chiếm Cung điện Mùa đông. Lần đầu tiên công nhân lật đổ giai cấp tư sản, thiết lập nhà nước công nhân.',
      'Chân dung Marx, Engels, Lenin, Mao: Các nhà lý luận và lãnh đạo cộng sản - "Triết học không chỉ giải thích thế giới mà còn thay đổi nó."',
      'Áp phích tập thể hoá nông nghiệp: "Cùng nhau cày, cùng nhau ăn." Nông dân hợp tác, sản xuất tập thể, xóa bỏ ruộng đất tư hữu.',
      'Biểu tượng công nhân công nghiệp: Búa liềm - biểu tượng liên minh công nhân và nông dân. Sức mạnh vô địch của giai cấp lao động đoàn kết.'
    ],
    historicalExample: '...'
  },
  {
    id: 'balanced',
    name: 'Nền kinh tế Hỗn hợp',
    icon: '⚖️',
    color: 'from-purple-400 to-pink-400',
    description: '...',
    condition: (C, L, R) => Math.abs(C - L) < 30 && C > 35 && L > 35 && R > 35,
    milestones: [
      '⚖️ Cân bằng tổng thể (C, L, R đều ổn định)',
      '🎯 Không cực đoan - tránh các mô hình quá thái',
      '🔄 Thích ứng linh hoạt - điều chỉnh theo tình hình',
      '🤷 Thiếu định hướng rõ ràng - có thể dẫn đến mâu thuẫn'
    ],
    imageDescriptions: [
      'Cơ sở hạ tầng công-tư: Cầu đường, điện nước do nhà nước xây, doanh nghiệp tư nhân vận hành. Hợp tác vì lợi ích chung.',
      'Quy hoạch thành phố hiện đại: Khu công nghiệp, khu dân cư, khu công viên được bố trí khoa học. Cân bằng kinh tế và môi trường.',
      'Hợp tác Giáo dục - Công nghệ: Trường đại học công lập đào tạo, công ty tư nhân tuyển dụng. Liên kết tri thức và sản xuất.',
      'Sàn giao dịch được quản lý: Thị trường tự do nhưng có luật pháp kiểm soát, chống độc quyền, bảo vệ người tiêu dùng.'
    ],
    historicalExample: '...'
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