export interface BossRound {
  round: number;
  name: string;
  icon: string;
  title: string;
  description: string;
  historicalContext: string;
  mechanicDescription: string;
  educationalInsight?: string;
  rules: {
    policyCount?: number;
    allowedCategories?: ('exploitation' | 'investment' | 'welfare' | 'balanced')[];
    autoEffects?: { C: number; L: number; R: number };
    specialCondition?: string;
    // 🆕 Persistent mechanics
    persistentDuration?: number; // Số vòng Boss kéo dài
    persistentEffect?: { C: number; L: number; R: number }; // Effect mỗi vòng
    defeatCondition?: string; // Điều kiện để kết thúc Boss sớm
    crisisMode?: boolean; // Có unlock crisis policies không
  };
}

export const BOSS_ROUNDS: BossRound[] = [
  {
    round: 10,
    name: 'Khủng hoảng Thừa',
    icon: '📉',
    title: 'BOSS VÒNG 10: KHỦNG HOẢNG THỪA',
    description: 'Hàng hóa sản xuất dư thừa, không bán được! Thị trường bão hòa, giá cả sụp đổ. Kho hàng đầy ắp nhưng công nhân đói khát.',
    historicalContext: 'Khủng hoảng 1929 - "Thứ Sáu Đen": Dư thừa hàng hóa dẫn đến thảm họa kinh tế toàn cầu. 15 triệu người Mỹ thất nghiệp, trong khi kho hàng đầy ắp. "Cái nghịch lý của tư bản: giàu có trong cơn đói!"',
    mechanicDescription: 'KHỦNG HOẢNG KÉO DÀI 5 VÒNG (10-14)! Mỗi vòng C tự động -3. Chỉ được chọn 2 policies. Unlock Crisis Policies đặc biệt. Có thể kết thúc sớm nếu giảm C hoặc tăng L đủ mạnh.',
    educationalInsight: '💡 Bí quyết giải quyết khủng hoảng thừa: Khủng hoảng này chỉ giải quyết được bằng 2 cách: (1) Tăng sức mua của công nhân (L↑) để tiêu thụ hàng hóa tồn kho, hoặc (2) Phá hủy/thanh lý tư bản dư thừa (C↓) qua bán phá giá. Đây là mâu thuẫn cơ bản của TBCN: sản xuất vì lợi nhuận, không vì nhu cầu thực sự! Chọn 3/5 policies đúng hướng (C↓ hoặc L↑) → kết thúc khủng hoảng sớm + nhận thưởng!',
    rules: {
      policyCount: 2,
      persistentDuration: 5, // Vòng 10-14
      persistentEffect: { C: -3, L: 0, R: 0 }, // Mỗi vòng C -3
      defeatCondition: 'crisis_resolved', // Kiểm tra xem đã giải quyết khủng hoảng chưa
      crisisMode: true // Unlock crisis policies
    }
  },
  {
    round: 20,
    name: 'Đình công Toàn quốc',
    icon: '✊',
    title: 'BOSS VÒNG 20: ĐÌNH CÔNG TOÀN QUỐC',
    description: 'Công nhân đình công toàn diện phản đối bóc lột! Sản xuất tê liệt, mâu thuẫn giai cấp bùng phát. Nhà máy ngừng hoạt động toàn bộ. Cuộc đấu tranh sẽ kéo dài cho đến khi bạn nhượng bộ hoặc hệ thống sụp đổ!',
    historicalContext: 'Công xã Paris 1871 & Tổng đình công Nga 1905: "Người công nhân không còn gì để mất ngoài xiềng xích!" - Tuyên ngôn Đảng Cộng sản. Giai cấp công nhân tổ chức đấu tranh lâu dài đòi quyền lợi.',
    mechanicDescription: 'ĐÌNH CÔNG KÉO DÀI 10 VÒNG (20-29)! Mỗi vòng L tự động -2. CHỈ được chọn Welfare/Balanced policies. ĐIỀU KIỆN THẮNG: Đạt L ≥ 25 ở ít nhất 5/10 vòng → công nhân chấp nhận đàm phán. CẢNH BÁO: Nếu L < 15 bất kỳ lúc nào → GAME OVER ngay (nổi loạn bạo lực)!',
    educationalInsight: '💡 Chiến lược marathon: Đình công dài hạn cần sức chịu đựng! Phải duy trì L ≥ 25 cho ít nhất 5/10 vòng để công nhân tin rằng bạn nghiêm túc cải thiện đời sống họ. Chọn policies tăng L và R đều đặn, tránh để L giảm < 15 (điểm tới hạn). Đây là cuộc đấu tranh ý chí: ai chịu đựng lâu hơn? Lưu ý: không có chính sách bóc lột/đàn áp - chỉ có thương lượng thực sự!',
    rules: {
      policyCount: 3,
      allowedCategories: ['welfare', 'balanced'],
      autoEffects: { C: 0, L: 0, R: 0 }, // Vòng 20 đầu tiên
      persistentDuration: 10, // Vòng 20-29
      persistentEffect: { C: 0, L: -3, R: 0 }, // Mỗi vòng L -2 (nhẹ hơn)
      defeatCondition: 'strike_resolved', // Track số vòng có L >= 25
      specialCondition: 'labor_collapse' // L < 15 → instant death
    }
  },
  {
    round: 30,
    name: 'Cách mạng Vô sản',
    icon: '🚩',
    title: 'BOSS VÒNG 30: CÁCH MẠNG VÔ SẢN',
    description: 'Đây là vòng cuối cùng! Mâu thuẫn đạt đỉnh điểm. Công nhân sẵn sàng lật đổ giai cấp tư sản. Số phận của bạn phụ thuộc vào quyết định cuối cùng!',
    historicalContext: 'Cách mạng tháng Mười Nga 1917: "Giới cướp có của được cắt đầu, người bị cướp được sống lại!" - V.I. Lenin. Giai cấp công nhân nắm chính quyền, kết thúc chế độ tư bản chủ nghĩa Nga.',
    mechanicDescription: 'ĐIỀU KIỆN NGHIÊM NGẶT: (1) |C-L| > 40 → CÁCH MẠNG ngay! (2) Bất kỳ chỉ số < 20 → Hệ thống sụp đổ! Phải cân bằng TẤT CẢ metrics để vượt qua. Kết quả cuối cùng sẽ phản ánh chủ nghĩa kinh tế bạn đang theo đuổi!',
    educationalInsight: '💡 Bài kiểm tra cuối cùng: Mỗi cách điều chỉnh C-L-R sẽ dẫn đến một hệ thống kinh tế khác nhau! C cao + L thấp = Tư bản bóc lột. C-L cân bằng + R cao = Nhà nước phúc lợi. L cao + C thấp = Xã hội chủ nghĩa. Quyết định của bạn trong 30 vòng sẽ định hình chủ nghĩa kinh tế cuối cùng - hãy xem kết quả!',
    rules: {
      policyCount: 3,
      specialCondition: 'final_judgment', // Custom check
    }
  }
];

/**
 * Check if current round is a Boss round
 */
export function isBossRound(round: number): boolean {
  return BOSS_ROUNDS.some(boss => boss.round === round);
}

/**
 * Get Boss data for a specific round
 */
export function getBossRound(round: number): BossRound | null {
  return BOSS_ROUNDS.find(boss => boss.round === round) || null;
}