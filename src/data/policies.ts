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
  tier: 'common' | 'rare' | 'epic';
  historicalContext: string; // Quote hoặc context lịch sử
}

export const ALL_POLICIES: Policy[] = [
  // ==================== COMMON TIER (60% - Vòng 1-10) ====================
  // Exploitation policies - giảm R mạnh hơn
  {
    id: 'unsafe_workplace',
    name: 'Bỏ qua an toàn lao động',
    description: 'Cắt giảm chi phí bảo hộ để tăng lợi nhuận',
    icon: '⚠️',
    effects: { C: 12, L: -8, R: -10 },
    category: 'exploitation',
    tier: 'common',
    historicalContext: 'Triangle Shirtwaist Factory 1911: 146 công nhân chết cháy vì thiếu an toàn'
  },
  {
    id: 'pollution',
    name: 'Thải ô nhiễm không xử lý',
    description: 'Tiết kiệm chi phí môi trường, ảnh hưởng sức khỏe',
    icon: '☢️',
    effects: { C: 10, L: -6, R: -12 },
    category: 'exploitation',
    tier: 'common',
    historicalContext: 'Ô nhiễm công nghiệp: lợi nhuận tư bản > sức khỏe con người'
  },

  // Exploitation policies - Common
  {
    id: 'overtime',
    name: 'Tăng ca bắt buộc',
    description: 'Bắt công nhân làm thêm giờ không trả lương',
    icon: '⏰',
    effects: { C: 8, L: -6, R: -4 },
    category: 'exploitation',
    tier: 'common',
    historicalContext: 'Ngày làm việc kéo dài là nền tảng của chế độ tư bản - K. Marx, Tư bản I'
  },
  {
    id: 'wage_cut',
    name: 'Cắt giảm lương',
    description: 'Giảm lương để tăng lợi nhuận',
    icon: '✂️',
    effects: { C: 10, L: -8, R: -5 },
    category: 'exploitation',
    tier: 'common',
    historicalContext: 'Lương chỉ là giá trị của sức lao động tái sản xuất - Lý thuyết giá trị thặng dư'
  },
  {
    id: 'speedup',
    name: 'Tăng tốc độ sản xuất',
    description: 'Đẩy nhanh dây chuyền, tăng cường độ lao động',
    icon: '⚡',
    effects: { C: 7, L: -7, R: -3 },
    category: 'exploitation',
    tier: 'common',
    historicalContext: 'Cường độ lao động tăng = tăng giá trị thặng dư tương đối'
  },
  {
    id: 'child_labor',
    name: 'Thuê lao động trẻ em',
    description: 'Sử dụng trẻ em với mức lương thấp',
    icon: '👧',
    effects: { C: 9, L: -10, R: -6 },
    category: 'exploitation',
    tier: 'common',
    historicalContext: 'Anh thế kỷ 19: Trẻ em 6 tuổi làm việc 14 giờ/ngày trong nhà máy dệt'
  },

  // Investment policies - Common
  {
    id: 'steam_engine',
    name: 'Máy hơi nước',
    description: 'Lắp đặt máy hơi nước thay sức người',
    icon: '🚂',
    effects: { C: -8, L: -4, R: 2 },
    category: 'investment',
    tier: 'common',
    historicalContext: 'Cách mạng Công nghiệp 1.0 (1760): Máy hơi nước James Watt thay đổi thế giới'
  },
  {
    id: 'textile_machine',
    name: 'Máy dệt cơ khí',
    description: 'Đầu tư máy dệt thay thợ thủ công',
    icon: '🧵',
    effects: { C: -7, L: -5, R: 1 },
    category: 'investment',
    tier: 'common',
    historicalContext: 'Spinning Jenny (1764): 1 người vận hành = 8 thợ thủ công'
  },
  {
    id: 'basic_tools',
    name: 'Nâng cấp dụng cụ',
    description: 'Mua công cụ sản xuất hiện đại hơn',
    icon: '🔧',
    effects: { C: -5, L: 0, R: 3 },
    category: 'investment',
    tier: 'common',
    historicalContext: 'Tư bản bất biến (c) thay thế tư bản khả biến (v) - xu hướng tất yếu'
  },

  // Welfare policies - Common
  {
    id: 'wage_increase',
    name: 'Tăng lương nhẹ',
    description: 'Tăng lương theo mức tối thiểu',
    icon: '💵',
    effects: { C: -6, L: 8, R: 7 },
    category: 'welfare',
    tier: 'common',
    historicalContext: 'Cải cách xã hội là thuốc giảm đau, không chữa căn bệnh - Lenin'
  },
  {
    id: 'safety',
    name: 'An toàn lao động',
    description: 'Cải thiện điều kiện làm việc cơ bản',
    icon: '🦺',
    effects: { C: -4, L: 3, R: 5 },
    category: 'welfare',
    tier: 'common',
    historicalContext: 'Luật Nhà máy Anh 1833: Cấm trẻ dưới 9 tuổi làm việc - bước đầu bảo vệ'
  },
  {
    id: 'meal_break',
    name: 'Nghỉ ăn trưa',
    description: 'Cho phép nghỉ giữa giờ',
    icon: '🍱',
    effects: { C: -3, L: 4, R: 4 },
    category: 'welfare',
    tier: 'common',
    historicalContext: 'Giờ nghỉ là phần cần thiết để tái sản xuất sức lao động'
  },

  // Balanced policies - Common
  {
    id: 'hire_workers',
    name: 'Tuyển thêm công nhân',
    description: 'Mở rộng lực lượng lao động',
    icon: '👥',
    effects: { C: -5, L: 10, R: -3 },
    category: 'balanced',
    tier: 'common',
    historicalContext: 'Đội quân dự bị công nghiệp - luôn có người thất nghiệp chờ làm việc'
  },
  {
    id: 'bonus',
    name: 'Thưởng hiệu suất',
    description: 'Thưởng dựa trên năng suất',
    icon: '🎁',
    effects: { C: -3, L: 5, R: 6 },
    category: 'balanced',
    tier: 'common',
    historicalContext: 'Hệ thống khích lệ vật chất - chiêu bài che đậy bóc lột'
  },
  {
    id: 'piece_wage',
    name: 'Lương khoán sản phẩm',
    description: 'Trả lương theo số lượng sản phẩm',
    icon: '📦',
    effects: { C: 5, L: -4, R: 2 },
    category: 'balanced',
    tier: 'common',
    historicalContext: 'Lương theo sản phẩm: công nhân tự bóc lột chính mình để tăng sản lượng'
  },

  // ==================== RARE TIER (30% - Vòng 11-20) ====================
  // Exploitation policies - Rare
  {
    id: 'layoff',
    name: 'Sa thải hàng loạt',
    description: 'Cắt giảm lực lượng lao động',
    icon: '🚪',
    effects: { C: 12, L: -15, R: 0 },
    category: 'exploitation',
    tier: 'rare',
    historicalContext: 'Khủng hoảng 1929: 15 triệu người Mỹ thất nghiệp'
  },
  {
    id: 'zero_contract',
    name: 'Hợp đồng 0 giờ',
    description: 'Không cam kết giờ làm tối thiểu',
    icon: '📄',
    effects: { C: 11, L: -12, R: -8 },
    category: 'exploitation',
    tier: 'rare',
    historicalContext: 'Kinh tế gig: lao động không ổn định, không quyền lợi - tân thời đại bóc lột'
  },
  {
    id: 'union_busting',
    name: 'Đàn áp công đoàn',
    description: 'Sa thải người tổ chức công đoàn',
    icon: '⚒️',
    effects: { C: 10, L: -14, R: -7 },
    category: 'exploitation',
    tier: 'rare',
    historicalContext: 'Thảm sát Haymarket 1886: Cảnh sát bắn vào công nhân đòi 8 giờ làm/ngày'
  },

  // Investment policies - Rare
  {
    id: 'assembly_line',
    name: 'Dây chuyền lắp ráp Ford',
    description: 'Áp dụng hệ thống sản xuất hàng loạt',
    icon: '🏭',
    effects: { C: -14, L: -8, R: 4 },
    category: 'investment',
    tier: 'rare',
    historicalContext: 'Fordism 1913: Năng suất tăng 800%, công nhân trở thành bộ phận máy móc'
  },
  {
    id: 'electricity',
    name: 'Điện khí hóa nhà máy',
    description: 'Chuyển sang năng lượng điện',
    icon: '⚡',
    effects: { C: -12, L: -6, R: 5 },
    category: 'investment',
    tier: 'rare',
    historicalContext: 'Cách mạng Công nghiệp 2.0 (1870): Điện thay hơi nước'
  },
  {
    id: 'taylorism',
    name: 'Quản lý khoa học Taylor',
    description: 'Tối ưu hóa từng động tác lao động',
    icon: '⏱️',
    effects: { C: -10, L: -10, R: 2 },
    category: 'investment',
    tier: 'rare',
    historicalContext: 'Taylorism: Phân tích vi mô từng động tác - biến con người thành robot thịt'
  },

  // Welfare policies - Rare
  {
    id: 'healthcare',
    name: 'Bảo hiểm y tế',
    description: 'Cung cấp bảo hiểm sức khỏe toàn diện',
    icon: '🏥',
    effects: { C: -10, L: 8, R: 10 },
    category: 'welfare',
    tier: 'rare',
    historicalContext: 'Nhà nước Phúc lợi Bắc Âu: Nhượng bộ để ngăn cách mạng xã hội chủ nghĩa'
  },
  {
    id: 'education',
    name: 'Đào tạo nghề miễn phí',
    description: 'Đầu tư giáo dục và kỹ năng',
    icon: '📚',
    effects: { C: -9, L: 10, R: 9 },
    category: 'welfare',
    tier: 'rare',
    historicalContext: 'Giáo dục cho công nhân = tăng kỹ năng = tăng giá trị sức lao động'
  },
  {
    id: 'reduce_hours',
    name: 'Giảm xuống 8 giờ/ngày',
    description: 'Áp dụng chuẩn 8 giờ làm việc',
    icon: '🌙',
    effects: { C: -8, L: 9, R: 8 },
    category: 'welfare',
    tier: 'rare',
    historicalContext: '1 Tháng 5/1886: Công nhân toàn cầu đấu tranh cho 8 giờ làm, 8 giờ ngủ, 8 giờ giải trí'
  },

  // Balanced policies - Rare
  {
    id: 'profit_sharing',
    name: 'Chia sẻ lợi nhuận',
    description: 'Công nhân được hưởng phần lợi nhuận',
    icon: '🤝',
    effects: { C: -11, L: 9, R: 12 },
    category: 'balanced',
    tier: 'rare',
    historicalContext: 'Cổ phần hóa công nhân: ảo tưởng giai cấp - vẫn bị bóc lột nhưng nghĩ mình là chủ'
  },
  {
    id: 'outsource',
    name: 'Chuyển sản xuất ra nước ngoài',
    description: 'Mở nhà máy ở nước có lương thấp',
    icon: '🌏',
    effects: { C: 8, L: -10, R: 3 },
    category: 'balanced',
    tier: 'rare',
    historicalContext: 'Toàn cầu hóa: Bóc lột lao động giá rẻ ở Á-Phi-La, bán hàng ở phương Tây'
  },

  // ==================== EPIC TIER (10% - Vòng 21-30) ====================
  // Exploitation policies - Epic
  {
    id: 'ai_surveillance',
    name: 'AI giám sát toàn diện',
    description: 'Dùng AI theo dõi từng hành động công nhân',
    icon: '👁️',
    effects: { C: 18, L: -20, R: -12 },
    category: 'exploitation',
    tier: 'epic',
    historicalContext: 'Amazon Warehouse 2020: AI đếm từng giây nghỉ, sa thải tự động'
  },
  {
    id: 'gig_economy',
    name: 'Nền kinh tế Gig toàn diện',
    description: 'Chuyển toàn bộ sang hợp đồng tự do',
    icon: '🚗',
    effects: { C: 20, L: -22, R: -15 },
    category: 'exploitation',
    tier: 'epic',
    historicalContext: 'Uber/Grab: Không phải nhân viên = không bảo hiểm, lương hưu, nghỉ lễ'
  },

  // Investment policies - Epic
  {
    id: 'full_automation',
    name: 'Tự động hóa hoàn toàn',
    description: 'Thay thế 90% lao động bằng robot và AI',
    icon: '🦾',
    effects: { C: -22, L: -25, R: 8 },
    category: 'investment',
    tier: 'epic',
    historicalContext: 'Cách mạng 4.0: 800 triệu việc làm mất đi vào 2030 - WEF 2018'
  },
  {
    id: 'advanced_ai',
    name: 'Trí tuệ nhân tạo AGI',
    description: 'Triển khai AI tổng quát thay con người',
    icon: '🧠',
    effects: { C: -25, L: -30, R: 10 },
    category: 'investment',
    tier: 'epic',
    historicalContext: 'AI thay thế cả lao động trí óc - Marx chưa tưởng tượng được sự bóc lột này'
  },
  {
    id: 'quantum_leap',
    name: 'Máy tính lượng tử',
    description: 'Đầu tư công nghệ đột phá',
    icon: '⚛️',
    effects: { C: -20, L: -18, R: 12 },
    category: 'investment',
    tier: 'epic',
    historicalContext: 'Cách mạng Lượng tử: Năng suất tăng vọt, nhưng ai hưởng lợi?'
  },

  // Welfare policies - Epic
  {
    id: 'ubi',
    name: 'Thu nhập cơ bản UBI',
    description: 'Phát tiền miễn phí cho mọi công dân',
    icon: '💰',
    effects: { C: -18, L: 15, R: 20 },
    category: 'welfare',
    tier: 'epic',
    historicalContext: 'UBI: Câu trả lời của tư bản cho AI thất nghiệp hàng loạt - hay bẫy mới?'
  },
  {
    id: 'worker_takeover',
    name: 'Công nhân nắm quyền kiểm soát',
    description: 'Dân chủ hóa nơi làm việc',
    icon: '✊',
    effects: { C: -20, L: 18, R: 22 },
    category: 'welfare',
    tier: 'epic',
    historicalContext: 'Hợp tác xã công nhân Mondragon, Tây Ban Nha: Tự quản đích thực'
  },

  // Balanced policies - Epic
  {
    id: '4day_week',
    name: 'Tuần làm việc 4 ngày',
    description: 'Giảm xuống 32 giờ/tuần, lương không đổi',
    icon: '📅',
    effects: { C: -15, L: 12, R: 18 },
    category: 'balanced',
    tier: 'epic',
    historicalContext: 'Iceland 2021: Thử nghiệm thành công - năng suất tăng, căng thẳng giảm'
  },
  {
    id: 'post_capitalism',
    name: 'Chuyển sang Hợp tác xã',
    description: 'Từ bỏ mô hình tư bản, chuyển sang sở hữu tập thể',
    icon: '🚩',
    effects: { C: -30, L: 20, R: 25 },
    category: 'balanced',
    tier: 'epic',
    historicalContext: 'Cộng sản chủ nghĩa: "Từ mỗi người theo khả năng, cho mỗi người theo nhu cầu"'
  },

  // ==================== CRISIS TIER - BOSS VÒNG 10 ONLY ====================
  {
    id: 'crisis_destroy_goods',
    name: 'Phá hủy hàng tồn kho',
    description: 'Đổ sữa, đốt lúa mì để duy trì giá cả',
    icon: '💥',
    effects: { C: -25, L: -20, R: -15 },
    category: 'exploitation',
    tier: 'epic',
    historicalContext: 'Khủng hoảng 1929: Đổ 6 triệu lợn, 10 triệu mẫu bông xuống sông trong khi dân đói'
  },
  {
    id: 'crisis_fire_sale',
    name: 'Bán tháo giá sàn',
    description: 'Bán lỗ để thu hồi vốn nhanh, chấp nhận phá sản',
    icon: '🔥',
    effects: { C: -18, L: 5, R: -10 },
    category: 'balanced',
    tier: 'epic',
    historicalContext: 'Fire sale: Bán với giá 10-20% để tránh phá sản hoàn toàn'
  },
  {
    id: 'crisis_export_dump',
    name: 'Dumping thị trường ngoại',
    description: 'Bán phá giá ra nước ngoài, gây chiến tranh thương mại',
    icon: '🚢',
    effects: { C: -12, L: -8, R: 2 },
    category: 'investment',
    tier: 'epic',
    historicalContext: 'Chính sách bảo hộ mậu dịch 1930s: mỗi nước đổ hàng qua nước khác'
  },
  {
    id: 'crisis_massive_layoff',
    name: 'Sa thải hàng loạt khẩn cấp',
    description: 'Đóng cửa nhà máy, sa thải 70% lao động',
    icon: '🚪',
    effects: { C: 15, L: -40, R: -5 },
    category: 'exploitation',
    tier: 'epic',
    historicalContext: 'Khủng hoảng 1929-1933: Thất nghiệp lên 25% ở Mỹ, 30% ở Đức'
  },
  {
    id: 'crisis_bank_bailout',
    name: 'Vay nợ Ngân hàng Trung ương',
    description: 'Xin cứu trợ từ nhà nước, nợ chồng chất',
    icon: '🏦',
    effects: { C: 20, L: -15, R: -8 },
    category: 'balanced',
    tier: 'epic',
    historicalContext: 'Bailout 2008: Nhà nước bơm 700 tỷ USD cứu ngân hàng, dân chịu hậu quả'
  }
];

// ==================== BOSS 30 - FINAL ADJUSTMENT POLICIES ====================
/**
 * Boss 30 Final Policies - Simple single-stat boost (+15) để điều chỉnh cuối cùng
 */
export const FINAL_ADJUSTMENT_POLICIES: Policy[] = [
  // C-focused
  {
    id: 'final_capital_boost',
    name: 'Đầu tư Khẩn cấp Tư bản',
    description: 'Bơm vốn lớn vào hệ thống sản xuất để cân bằng cuối cùng',
    icon: '💰',
    effects: { C: 15, L: 0, R: 0 },
    category: 'investment',
    tier: 'epic',
    historicalContext: 'Quyết định cuối cùng: Tập trung vào tích lũy tư bản'
  },
  {
    id: 'final_capital_moderate',
    name: 'Điều chỉnh Tư bản Vừa phải',
    description: 'Bổ sung tư bản để đạt cân bằng hệ thống',
    icon: '🏦',
    effects: { C: 15, L: 0, R: 0 },
    category: 'balanced',
    tier: 'rare',
    historicalContext: 'Cân bằng tư bản trong giai đoạn cuối'
  },
  {
    id: 'final_capital_critical',
    name: 'Cứu nguy Tư bản',
    description: 'Huy động nguồn lực cuối cùng để tránh sụp đổ tư bản',
    icon: '🆘',
    effects: { C: 15, L: 0, R: 0 },
    category: 'investment',
    tier: 'epic',
    historicalContext: 'Biện pháp khẩn cấp cứu vãn kinh tế'
  },

  // L-focused
  {
    id: 'final_labor_recovery',
    name: 'Phục hồi Lực lượng Lao động',
    description: 'Tuyển dụng và huấn luyện công nhân mới để khôi phục lực lượng lao động',
    icon: '👷',
    effects: { C: 0, L: 15, R: 0 },
    category: 'welfare',
    tier: 'epic',
    historicalContext: 'Đầu tư vào con người trong giai đoạn then chốt'
  },
  {
    id: 'final_labor_mobilize',
    name: 'Tổng động viên Lao động',
    description: 'Huy động toàn bộ nguồn nhân lực có thể',
    icon: '✊',
    effects: { C: 0, L: 15, R: 0 },
    category: 'balanced',
    tier: 'rare',
    historicalContext: 'Động viên lực lượng lao động tối đa'
  },
  {
    id: 'final_labor_import',
    name: 'Nhập khẩu Lao động',
    description: 'Mở cửa biên giới, thu hút lao động từ nước ngoài',
    icon: '🌍',
    effects: { C: 0, L: 15, R: 0 },
    category: 'investment',
    tier: 'epic',
    historicalContext: 'Giải pháp khan hiếm lao động thời kỳ cuối'
  },

  // R-focused
  {
    id: 'final_reproduction_boost',
    name: 'Đầu tư Phúc lợi Toàn diện',
    description: 'Xây dựng hệ thống y tế, giáo dục, nhà ở miễn phí cho công nhân',
    icon: '🏥',
    effects: { C: 0, L: 0, R: 15 },
    category: 'welfare',
    tier: 'epic',
    historicalContext: 'Đầu tư vào tái sản xuất sức lao động dài hạn'
  },
  {
    id: 'final_reproduction_urgent',
    name: 'Cấp cứu Tái sản xuất',
    description: 'Trợ cấp khẩn cấp cho công nhân để đảm bảo đời sống tối thiểu',
    icon: '🆘',
    effects: { C: 0, L: 0, R: 15 },
    category: 'welfare',
    tier: 'rare',
    historicalContext: 'Biện pháp khẩn cấp cứu công nhân khỏi khủng hoảng'
  },
  {
    id: 'final_reproduction_sustain',
    name: 'Duy trì Sức khỏe Công nhân',
    description: 'Chương trình chăm sóc sức khỏe tổng thể cho giai cấp công nhân',
    icon: '💚',
    effects: { C: 0, L: 0, R: 15 },
    category: 'balanced',
    tier: 'epic',
    historicalContext: 'Đầu tư dài hạn vào chất lượng sức lao động'
  }
];

/**
 * Get 3 random Final Adjustment policies for Boss 30
 * Ensures at least one policy for each stat (C, L, R)
 */
export function getFinalPolicies(): Policy[] {
  const cPolicies = FINAL_ADJUSTMENT_POLICIES.filter(p => p.effects.C > 0);
  const lPolicies = FINAL_ADJUSTMENT_POLICIES.filter(p => p.effects.L > 0);
  const rPolicies = FINAL_ADJUSTMENT_POLICIES.filter(p => p.effects.R > 0);

  // Pick 1 from each category randomly
  const selectedC = cPolicies[Math.floor(Math.random() * cPolicies.length)];
  const selectedL = lPolicies[Math.floor(Math.random() * lPolicies.length)];
  const selectedR = rPolicies[Math.floor(Math.random() * rPolicies.length)];

  return [selectedC, selectedL, selectedR].sort(() => Math.random() - 0.5);
}


/**
 * Get random policies based on tier rarity
 * Common: 60%, Rare: 30%, Epic: 10%
 * Optional: filter by round for progression
 */
export function getRandomPolicies(count: number = 3, currentRound?: number): Policy[] {
  const pool: Policy[] = [];
  const usedIds = new Set<string>(); // Track đã dùng

  // Separate by tier
  const commonPolicies = ALL_POLICIES.filter(p => p.tier === 'common');
  const rarePolicies = ALL_POLICIES.filter(p => p.tier === 'rare');
  const epicPolicies = ALL_POLICIES.filter(p => p.tier === 'epic');

  // Build pool based on rarity weights
  let attempts = 0;
  const maxAttempts = 100; // Tránh infinite loop

  while (pool.length < count && attempts < maxAttempts) {
    attempts++;
    const roll = Math.random();
    let selectedPolicy: Policy | null = null;

    if (roll < 0.10 && epicPolicies.length > 0) {
      // 10% Epic
      const availableEpic = epicPolicies.filter(p => !usedIds.has(p.id));
      if (availableEpic.length > 0) {
        selectedPolicy = availableEpic[Math.floor(Math.random() * availableEpic.length)];
      }
    } else if (roll < 0.40 && rarePolicies.length > 0) {
      // 30% Rare
      const availableRare = rarePolicies.filter(p => !usedIds.has(p.id));
      if (availableRare.length > 0) {
        selectedPolicy = availableRare[Math.floor(Math.random() * availableRare.length)];
      }
    } else {
      // 60% Common
      const availableCommon = commonPolicies.filter(p => !usedIds.has(p.id));
      if (availableCommon.length > 0) {
        selectedPolicy = availableCommon[Math.floor(Math.random() * availableCommon.length)];
      }
    }

    // Nếu tìm được policy chưa dùng, thêm vào pool
    if (selectedPolicy && !usedIds.has(selectedPolicy.id)) {
      pool.push(selectedPolicy);
      usedIds.add(selectedPolicy.id);
    }
  }

  // Fallback: nếu không đủ, lấy random từ toàn bộ policies
  if (pool.length < count) {
    const remaining = ALL_POLICIES.filter(p => !usedIds.has(p.id));
    const shuffled = [...remaining].sort(() => Math.random() - 0.5);
    pool.push(...shuffled.slice(0, count - pool.length));
  }

  return pool;
}

/**
 * Get policies filtered by category (for Boss rounds)
 */
export function getPoliciesByCategory(
  category: Policy['category'],
  count: number = 3
): Policy[] {
  const filtered = ALL_POLICIES.filter(p => p.category === category);
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, filtered.length));
}

/**
 * Get mixed policies (for Boss rounds that need specific mix)
 */
export function getMixedPolicies(
  categories: Policy['category'][],
  count: number = 3
): Policy[] {
  const filtered = ALL_POLICIES.filter(p => categories.includes(p.category));
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, filtered.length));
}

/**
 * Get crisis-specific policies (for Boss Round 10)
 */
export function getCrisisPolicies(count: number = 2): Policy[] {
  const crisisPolicies = ALL_POLICIES.filter(p =>
    p.id.startsWith('crisis_')
  );
  const shuffled = [...crisisPolicies].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, crisisPolicies.length));
}

/**
 * Mix crisis policies with normal policies
 */
export function getMixedCrisisPolicies(normalCount: number = 1, crisisCount: number = 1): Policy[] {
  const normal = getRandomPolicies(normalCount);
  const crisis = getCrisisPolicies(crisisCount);
  return [...normal, ...crisis].sort(() => Math.random() - 0.5);
}
