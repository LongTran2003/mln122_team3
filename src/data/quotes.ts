export interface Quote {
  text: string;
  author: string;
  rank: string[];
}

export const MARXIST_QUOTES: Quote[] = [
  {
    text: 'Giá trị thặng dư là nguồn gốc của tích lũy tư bản. Đó là phần giá trị mà công nhân tạo ra nhưng không được trả công.',
    author: 'Karl Marx',
    rank: ['S', 'A']
  },
  {
    text: 'Tư bản là lao động chết, như ma cà rồng, chỉ sống bằng cách hút máu lao động sống.',
    author: 'Karl Marx - Das Kapital',
    rank: ['B', 'C', 'D']
  },
  {
    text: 'Người công nhân bán sức lao động của mình, nhưng nhận lại ít hơn giá trị mà họ tạo ra.',
    author: 'Karl Marx',
    rank: ['A', 'B']
  },
  {
    text: 'Tích lũy tư bản là tích lũy đau khổ ở một cực, và tích lũy của cải ở cực đối lập.',
    author: 'Karl Marx - Das Kapital, Vol. 1',
    rank: ['C', 'D', 'F']
  },
  {
    text: 'Sự giải phóng của giai cấp công nhân phải là sự nghiệp của chính giai cấp công nhân.',
    author: 'Karl Marx',
    rank: ['S']
  },
  {
    text: 'Lao động tạo ra mọi của cải, nhưng người lao động lại nghèo khổ nhất.',
    author: 'Friedrich Engels',
    rank: ['D', 'F']
  },
  {
    text: 'Không có quyền mà không có nghĩa vụ, không có nghĩa vụ mà không có quyền.',
    author: 'Karl Marx',
    rank: ['S', 'A']
  },
  {
    text: 'Lịch sử của mọi xã hội cho đến nay là lịch sử của đấu tranh giai cấp.',
    author: 'Karl Marx & Friedrich Engels - Tuyên ngôn Đảng Cộng sản',
    rank: ['B', 'C']
  },
  {
    text: 'Tư bản đến thế gian, từ đầu đến chân, từng lỗ chân lông đều chảy máu và mủ.',
    author: 'Karl Marx',
    rank: ['F']
  },
  {
    text: 'Ai không làm việc, người đó không được ăn. Nhưng ai làm việc cũng phải được hưởng thành quả lao động.',
    author: 'V.I. Lenin',
    rank: ['S', 'A', 'B']
  },
  {
    text: 'Cuộc cách mạng xã hội chủ nghĩa không phải là sự kiện đơn lẻ, mà là một kỷ nguyên.',
    author: 'Rosa Luxemburg',
    rank: ['S']
  },
  {
    text: 'Tự do mà không có công bằng kinh tế chỉ là đặc quyền của người giàu.',
    author: 'Rosa Luxemburg',
    rank: ['D', 'F']
  },
  {
    text: 'Văn hóa là sản phẩm của lịch sử, và lịch sử là sản phẩm của đấu tranh giai cấp.',
    author: 'Antonio Gramsci',
    rank: ['B', 'C']
  },
  {
    text: 'Cuộc khủng hoảng chính là lúc cái cũ đã chết, nhưng cái mới chưa sinh ra.',
    author: 'Antonio Gramsci',
    rank: ['C', 'D']
  },
  {
    text: 'Bóc lột không biến mất khi đổi tên. Nó chỉ thay hình thức.',
    author: 'Rosa Luxemburg',
    rank: ['F']
  }
];

export function getQuoteForRank(rank: string): Quote {
  const matchingQuotes = MARXIST_QUOTES.filter(q => q.rank.includes(rank));
  if (matchingQuotes.length === 0) {
    return MARXIST_QUOTES[0]; // Fallback
  }
  const randomIndex = Math.floor(Math.random() * matchingQuotes.length);
  return matchingQuotes[randomIndex];
}
