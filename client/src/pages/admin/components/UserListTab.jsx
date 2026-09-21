import React, { useState } from 'react';
import { Users, Search, Trash2, Mail, Phone, Calendar } from 'lucide-react';

const UserListTab = ({ users = [], onDeleteUser }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-7xl mx-auto">
      {/* Header & Công cụ tìm kiếm */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-200 pb-6">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-black" />
          <h2 className="text-xl font-bold tracking-widest uppercase text-gray-900">Danh Sách Khách Hàng</h2>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition"
          />
        </div>
      </div>

      {/* Bảng Dữ Liệu */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="py-4 px-4 text-xs font-bold text-gray-900 uppercase tracking-wider">Khách Hàng</th>
              <th className="py-4 px-4 text-xs font-bold text-gray-900 uppercase tracking-wider">Email</th>
              <th className="py-4 px-4 text-xs font-bold text-gray-900 uppercase tracking-wider">Số Điện Thoại</th>
              <th className="py-4 px-4 text-xs font-bold text-gray-900 uppercase tracking-wider">Ngày Tham Gia</th>
              <th className="py-4 px-4 text-xs font-bold text-gray-900 uppercase tracking-wider text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.length > 0 ? filteredUsers.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50 transition group">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs uppercase tracking-wider">
                      {u.name ? u.name.charAt(0) : 'U'}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{u.name || 'N/A'}</div>
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                        {u.role || 'Member'}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <span>{u.email}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>{u.phone || 'Chưa cập nhật'}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{u.createdAt ? new Date(u.createdAt).toLocaleDateString('vi-VN') : 'N/A'}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <button 
                    onClick={() => { if(window.confirm('Xóa tài khoản khách hàng này?')) onDeleteUser(u._id); }}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                    title="Xóa khách hàng"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="py-12 text-center text-gray-400 text-sm tracking-wide">
                  Không tìm thấy tài khoản khách hàng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListTab;