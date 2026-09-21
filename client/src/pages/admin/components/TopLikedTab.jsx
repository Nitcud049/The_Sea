import React, { useEffect, useState } from 'react';
import { Heart, Award, Sparkles } from 'lucide-react';

const TopLikedTab = ({ formatPrice }) => {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopLiked = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/admin/top-liked-products');
        if (response.ok) {
          const data = await response.json();
          setTopProducts(data);
        }
      } catch (error) {
        console.error('Lỗi lấy danh sách top liked:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopLiked();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
        <div className="flex items-center gap-3">
          <Award className="w-6 h-6 text-black" />
          <h2 className="text-xl font-bold tracking-widest uppercase text-gray-900">Top 10 Sản Phẩm Yêu Thích</h2>
        </div>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-black" /> Xếp hạng theo lượt thả tim
        </span>
      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-400 text-sm">Đang tải bảng xếp hạng...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-16">Hạng</th>
                <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-20">Ảnh</th>
                <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tên Sản Phẩm</th>
                <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Phân Loại</th>
                <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Giá Tiền</th>
                <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Lượt Yêu Thích</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topProducts.length > 0 ? topProducts.map((p, index) => (
                <tr key={p._id} className="hover:bg-gray-50 transition group">
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold tracking-wider ${
                      index === 0 ? 'bg-black text-white' : 
                      index === 1 ? 'bg-gray-800 text-white' : 
                      index === 2 ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}>
                      #{index + 1}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded border border-gray-100" />
                  </td>
                  <td className="py-4 px-4 font-semibold text-gray-900">{p.name}</td>
                  <td className="py-4 px-4 text-sm text-gray-500 capitalize">{p.category}</td>
                  <td className="py-4 px-4 font-medium text-gray-900">{formatPrice(p.price)}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 border border-rose-100 text-rose-700 rounded-full font-bold text-xs">
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                      <span>{p.likesCount || 0}</span>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-400 text-sm">
                    Chưa có dữ liệu lượt yêu thích.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TopLikedTab;