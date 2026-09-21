import React, { useState, useMemo } from 'react';
import { Search, Plus, Edit3, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import styles from '../styles/AdminPanel.module.css';

const ProductListTab = ({ products = [], onEdit, onDelete, onAddNew, formatPrice }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [jumpPage, setJumpPage] = useState('');

  const processedProducts = useMemo(() => {
    let sortableItems = [...products];
    if (searchTerm) {
      sortableItems = sortableItems.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [products, searchTerm, sortConfig]);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') direction = 'descending';
    setSortConfig({ key, direction });
  };

  const totalPages = Math.ceil(processedProducts.length / itemsPerPage) || 1;
  const currentProducts = processedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  const handleJumpPage = (e) => {
    if (e.key === 'Enter') {
      const page = parseInt(jumpPage, 10);
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        setJumpPage('');
      } else {
        alert(`Vui lòng nhập trang từ 1 đến ${totalPages}`);
      }
    }
  };

  return (
    <div className={styles.productListWrapper}>
      {/* Header & Thanh công cụ */}
      <div className={styles.productListHeader}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="TÌM KIẾM SẢN PHẨM..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className={styles.searchInput}
          />
        </div>
        <button onClick={onAddNew} className={styles.addBtn}>
          <Plus size={14} /> THÊM SẢN PHẨM
        </button>
      </div>

      {/* Bảng dữ liệu */}
      <table className={styles.productListTable}>
        <thead>
          <tr>
            <th className={styles.productListTh} style={{ width: '90px' }}>Hình Ảnh</th>
            <th className={`${styles.productListTh} ${styles.sortableTh}`} onClick={() => handleSort('name')}>
              Sản Phẩm {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
            </th>
            <th className={`${styles.productListTh} ${styles.sortableTh}`} onClick={() => handleSort('gender')}>
              Đối Tượng {sortConfig.key === 'gender' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
            </th>
            <th className={styles.productListTh}>Phân Loại</th>
            <th className={`${styles.productListTh} ${styles.sortableTh}`} onClick={() => handleSort('price')}>
              Giá {sortConfig.key === 'price' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
            </th>
            <th className={styles.productListTh} style={{ textAlign: 'right' }}>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length > 0 ? currentProducts.map(p => (
            <tr key={p._id}>
              <td className={styles.productListTd}>
                <img src={p.image} alt={p.name} className={styles.productImage} />
              </td>
              <td className={`${styles.productListTd} ${styles.productNameTd}`}>
                {p.name}
              </td>
              <td className={styles.productListTd}>
                <span className={styles.genderTag}>
                  {p.gender === 'men' ? 'NAM' : p.gender === 'unisex' ? 'UNISEX' : p.gender === 'other' ? 'KHÁC' : 'NỮ'}
                </span>
              </td>
              <td className={`${styles.productListTd} ${styles.categoryTd}`}>{p.category}</td>
              <td className={`${styles.productListTd} ${styles.priceTd}`}>{formatPrice(p.price)}</td>
              <td className={styles.productListTd} style={{ textAlign: 'right' }}>
                <button onClick={() => onEdit(p)} className={styles.actionBtn} title="Sửa">
                  <Edit3 size={18} strokeWidth={1.5} />
                </button>
                <button onClick={() => { if(window.confirm('Xóa sản phẩm này vĩnh viễn?')) onDelete(p._id) }} className={styles.actionBtn} title="Xóa">
                  <Trash2 size={18} strokeWidth={1.5} color="#d93025" />
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="6" className={`${styles.productListTd} ${styles.emptyTd}`}>
                Không tìm thấy sản phẩm.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className={styles.pagination}>
        <div className={styles.paginationSection}>
          <span className={styles.paginationLabel}>Hiển thị:</span>
          <select 
            value={itemsPerPage} 
            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            className={styles.pageSelect}
          >
            <option value={8}>8 / TRANG</option>
            <option value={15}>15 / TRANG</option>
            <option value={25}>25 / TRANG</option>
          </select>
        </div>
        
        <div className={styles.pageControl}>
          <button onClick={() => paginate(1)} disabled={currentPage === 1} className={styles.pageBtn}>
            <ChevronsLeft size={16} />
          </button>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={styles.pageBtn}>
            <ChevronLeft size={16} />
          </button>
          
          <span className={styles.pageCounter}>
            {currentPage} / {totalPages}
          </span>
          
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className={styles.pageBtn}>
            <ChevronRight size={16} />
          </button>
          <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} className={styles.pageBtn}>
            <ChevronsRight size={16} />
          </button>
        </div>

        <div className={styles.paginationSection}>
          <span className={styles.paginationLabel}>Đến trang:</span>
          <input 
            type="number" min="1" max={totalPages} 
            value={jumpPage} 
            onChange={(e) => setJumpPage(e.target.value)} 
            onKeyDown={handleJumpPage}
            className={styles.jumpInput}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListTab;