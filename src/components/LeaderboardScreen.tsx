
import { useState, useEffect, useMemo } from 'react';
import { getLeaderboard, clearLeaderboard, LeaderboardEntry } from '../utils/leaderboard';

interface LeaderboardScreenProps {
  onBack: () => void;
  highlightEntryId?: string;
}

type SortField = 'exploitationRate' | 'rounds' | 'timestamp';
type SortOrder = 'asc' | 'desc';
type FilterStatus = 'all' | 'survived' | 'failed';
type FilterRank = 'all' | 'S' | 'A' | 'B' | 'C' | 'D' | 'F';

export function LeaderboardScreen({ onBack, highlightEntryId }: LeaderboardScreenProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  
  // Filter and sort states
  const [sortField, setSortField] = useState<SortField>('exploitationRate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterRank, setFilterRank] = useState<FilterRank>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = () => {
    const data = getLeaderboard();
    setEntries(data);
  };

  const handleClearLeaderboard = () => {
    clearLeaderboard();
    setEntries([]);
    setShowConfirmClear(false);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Filter and sort entries
  const filteredAndSortedEntries = useMemo(() => {
    let filtered = [...entries];

    // Apply status filter
    if (filterStatus === 'survived') {
      filtered = filtered.filter(e => e.survived);
    } else if (filterStatus === 'failed') {
      filtered = filtered.filter(e => !e.survived);
    }

    // Apply rank filter
    if (filterRank !== 'all') {
      filtered = filtered.filter(e => e.rank === filterRank);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(e => 
        e.playerName.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'exploitationRate':
          comparison = a.exploitationRate - b.exploitationRate;
          break;
        case 'rounds':
          comparison = a.rounds - b.rounds;
          break;
        case 'timestamp':
          comparison = a.timestamp - b.timestamp;
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [entries, filterStatus, filterRank, searchQuery, sortField, sortOrder]);

  const getRankColor = (rank: string): string => {
    switch (rank) {
      case 'S': return 'text-yellow-500';
      case 'A': return 'text-green-500';
      case 'B': return 'text-blue-500';
      case 'C': return 'text-orange-500';
      case 'D': return 'text-red-500';
      case 'F': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getRankBgColor = (rank: string): string => {
    switch (rank) {
      case 'S': return 'bg-yellow-50 border-yellow-300';
      case 'A': return 'bg-green-50 border-green-300';
      case 'B': return 'bg-blue-50 border-blue-300';
      case 'C': return 'bg-orange-50 border-orange-300';
      case 'D': return 'bg-red-50 border-red-300';
      case 'F': return 'bg-gray-50 border-gray-300';
      default: return 'bg-gray-50 border-gray-300';
    }
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <span className="text-gray-400 ml-1">⇅</span>;
    }
    return sortOrder === 'asc' ? 
      <span className="text-purple-600 ml-1">↑</span> : 
      <span className="text-purple-600 ml-1">↓</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-7xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-7xl mb-4">🏆</div>
          <h1 className="text-4xl text-purple-700 mb-3">Bảng Xếp Hạng</h1>
          <p className="text-gray-600">Top người chơi xuất sắc nhất</p>
        </div>

        {/* Stats Summary */}
        {entries.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4 text-center">
              <div className="text-purple-700 text-sm mb-1">Tổng số người chơi</div>
              <div className="text-3xl text-purple-800">{entries.length}</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-4 text-center">
              <div className="text-green-700 text-sm mb-1">Người sống sót</div>
              <div className="text-3xl text-green-800">
                {entries.filter(e => e.survived).length}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-4 text-center">
              <div className="text-yellow-700 text-sm mb-1">Vòng cao nhất</div>
              <div className="text-3xl text-yellow-800">
                {Math.max(...entries.map(e => e.rounds), 0)}
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        {entries.length > 0 && (
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Tìm kiếm theo tên người chơi..."
                className="w-full px-4 py-3 pl-12 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none text-gray-700"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">🔍</span>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3">
              {/* Status Filter */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filterStatus === 'all'
                      ? 'bg-purple-600 text-black shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setFilterStatus('survived')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filterStatus === 'survived'
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  ✓ Sống sót
                </button>
                <button
                  onClick={() => setFilterStatus('failed')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filterStatus === 'failed'
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  ✗ Thất bại
                </button>
              </div>

              {/* Rank Filter */}
              <div className="flex gap-2">
                {(['all', 'S', 'A', 'B', 'C', 'D', 'F'] as FilterRank[]).map((rank) => (
                  <button
                    key={rank}
                    onClick={() => setFilterRank(rank)}
                    className={`px-3 py-2 rounded-lg font-bold transition-all ${
                      filterRank === rank
                        ? 'bg-purple-600 text-black shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {rank === 'all' ? 'Tất cả Rank' : rank}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters Info */}
            {(filterStatus !== 'all' || filterRank !== 'all' || searchQuery) && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Đang hiển thị: {filteredAndSortedEntries.length} / {entries.length} kết quả</span>
                <button
                  onClick={() => {
                    setFilterStatus('all');
                    setFilterRank('all');
                    setSearchQuery('');
                  }}
                  className="text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        )}

        {/* Leaderboard Table */}
        {entries.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-gray-500 text-lg mb-4">Chưa có dữ liệu xếp hạng</p>
            <p className="text-gray-400">Hãy chơi game và lưu kết quả để xuất hiện ở đây!</p>
          </div>
        ) : filteredAndSortedEntries.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg mb-4">Không tìm thấy kết quả</p>
            <p className="text-gray-400">Thử điều chỉnh bộ lọc hoặc tìm kiếm khác</p>
          </div>
        ) : (
          <div className="overflow-x-auto mb-8">
            <div className="max-h-[500px] overflow-y-auto rounded-xl border-2 border-purple-100">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-100 to-pink-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-purple-700 font-semibold">#</th>
                    <th className="px-4 py-3 text-left text-purple-700 font-semibold">Người chơi</th>
                    <th className="px-4 py-3 text-center text-purple-700 font-semibold">Rank</th>
                    <th 
                      className="px-4 py-3 text-center text-purple-700 font-semibold cursor-pointer hover:bg-purple-200 transition-colors"
                      onClick={() => handleSort('exploitationRate')}
                    >
                      <div className="flex items-center justify-center">
                        Tỷ lệ bóc lột
                        <SortIcon field="exploitationRate" />
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-center text-purple-700 font-semibold cursor-pointer hover:bg-purple-200 transition-colors"
                      onClick={() => handleSort('rounds')}
                    >
                      <div className="flex items-center justify-center">
                        Vòng
                        <SortIcon field="rounds" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-center text-purple-700 font-semibold">Trạng thái</th>
                    <th 
                      className="px-4 py-3 text-left text-purple-700 font-semibold cursor-pointer hover:bg-purple-200 transition-colors"
                      onClick={() => handleSort('timestamp')}
                    >
                      <div className="flex items-center">
                        Thời gian
                        <SortIcon field="timestamp" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedEntries.map((entry, index) => (
                    <tr
                      key={entry.id}
                      className={`border-b border-gray-200 hover:bg-purple-50 transition-colors ${
                        entry.id === highlightEntryId ? 'bg-yellow-100 animate-pulse' : ''
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {index === 0 && <span className="text-2xl">🥇</span>}
                          {index === 1 && <span className="text-2xl">🥈</span>}
                          {index === 2 && <span className="text-2xl">🥉</span>}
                          <span className="text-gray-700 font-semibold">{index + 1}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-gray-800">{entry.playerName}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center">
                          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border-2 ${getRankBgColor(entry.rank)}`}>
                            <span className={`text-2xl font-bold ${getRankColor(entry.rank)}`}>
                              {entry.rank}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`font-semibold ${getRankColor(entry.rank)}`}>
                          {entry.exploitationRate.toFixed(3)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-gray-700 font-semibold">{entry.rounds}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {entry.survived ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            ✓ Sống sót
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                            ✗ Thất bại
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-sm">
                        {formatDate(entry.timestamp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-4 rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            ← Quay lại
          </button>
          {entries.length > 0 && (
            <button
              onClick={() => setShowConfirmClear(true)}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-black py-4 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              🗑️ Xóa bảng xếp hạng
            </button>
          )}
        </div>

        {/* Confirm Clear Modal */}
        {showConfirmClear && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl text-gray-800 mb-2">Xác nhận xóa</h2>
                <p className="text-gray-600">
                  Bạn có chắc chắn muốn xóa toàn bộ bảng xếp hạng? Hành động này không thể hoàn tác.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-black py-3 rounded-xl transition-all duration-200"
                >
                  Hủy
                </button>
                <button
                  onClick={handleClearLeaderboard}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition-all duration-200"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
