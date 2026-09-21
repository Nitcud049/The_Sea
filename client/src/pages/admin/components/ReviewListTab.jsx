import React, { useState, useMemo } from 'react';

const ReviewListTab = ({ products, fetchProducts, formatPrice }) => {
  const [selectedProductForReview, setSelectedProductForReview] = useState(null);

  // 1. Lấy và sắp xếp đánh giá từ mảng products
  const sortedRealtimeReviews = useMemo(() => {
    if (!products) return [];
    const list = [];
    products.forEach(p => { 
        if (p.reviews && p.reviews.length > 0) { 
            p.reviews.forEach(r => { 
                list.push({ ...r, productInfo: p, timestamp: r.createdAt ? new Date(r.createdAt).getTime() : (r.id || 0) }); 
            }); 
        } 
    });
    return list.sort((a, b) => b.timestamp - a.timestamp);
  }, [products]);

  // 2. Format thời gian
  const formatVNDateTime = (dateStrOrTimestamp) => {
    if (!dateStrOrTimestamp) return 'Mới đây';
    const date = new Date(dateStrOrTimestamp);
    if (isNaN(date.getTime())) return 'Mới đây';
    return date.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // 3. Xử lý xóa đánh giá
  const handleDeleteReviewItem = (productId, reviewId) => {
    if (!window.confirm('Bạn có chắc muốn xóa đánh giá này?')) return;
    const targetProduct = products.find(p => p._id === productId);
    if (!targetProduct) return;
    const updatedReviews = targetProduct.reviews.filter(r => r.id !== reviewId);
    fetch(`http://127.0.0.1:5000/api/products/${productId}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ ...targetProduct, reviews: updatedReviews }) 
    })
    .then(res => res.json())
    .then(() => { 
        alert("Đã gỡ bỏ đánh giá thành công!"); 
        if (fetchProducts) fetchProducts(); 
        if (selectedProductForReview && selectedProductForReview._id === productId) { 
            setSelectedProductForReview({ ...selectedProductForReview, reviews: updatedReviews }); 
        } 
    })
    .catch(err => alert("⚠️ Lỗi khi xóa đánh giá: " + err));
  };

  // 4. Khai báo CSS cục bộ (lấy từ AdminPanel gốc)
  const cardStyle = { backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', border: '1px solid #eaeaea' };
  const tableStyle = { width: '100%', borderCollapse: 'collapse', textAlign: 'left' };
  const thStyle = { padding: '12px 15px', backgroundColor: '#f9f9f9', color: '#333', fontWeight: '600', borderBottom: '2px solid #ddd', userSelect: 'none', fontSize: '13px' };
  const tdStyle = { padding: '12px 15px', verticalAlign: 'middle', fontSize: '13px' };

  return (
    <>
      <div style={{ ...cardStyle, maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
            <h3 style={{ margin: 0, fontSize: '20px', color: '#1a1a1a' }}>⭐ Quản Lý Đánh Giá Khách Hàng (Thời gian thực)</h3>
        </div>
        <table style={tableStyle}>
          <thead><tr><th style={thStyle}>Thời gian (VN)</th><th style={thStyle}>Sản phẩm</th><th style={thStyle}>Khách hàng</th><th style={thStyle}>Nội dung nhận xét</th><th style={{...thStyle, textAlign: 'center'}}>Thao tác</th></tr></thead>
          <tbody>
            {sortedRealtimeReviews.length > 0 ? (
              sortedRealtimeReviews.map((item) => (
                <tr key={item.id || item._id} onClick={() => setSelectedProductForReview(item.productInfo)} style={{ borderBottom: '1px solid #eee', cursor: 'pointer' }}>
                  <td style={{ ...tdStyle, color: '#e67e22', fontWeight: '500', fontSize: '12px' }}>🕒 {formatVNDateTime(item.createdAt || item.timestamp)}</td>
                  <td style={tdStyle}><div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><img src={item.productInfo.image} alt={item.productInfo.name} style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '4px' }} /><div><div style={{ fontWeight: 'bold' }}>{item.productInfo.name}</div></div></div></td>
                  <td style={tdStyle}><strong>{item.name}</strong><div style={{ color: '#f39c12', fontSize: '12px' }}>{'★'.repeat(item.rating)}</div></td>
                  <td style={{ ...tdStyle, maxWidth: '320px' }}>"{item.text}"</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }} onClick={(e) => e.stopPropagation()}><button onClick={() => setSelectedProductForReview(item.productInfo)} style={{ padding: '6px 12px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', marginRight: '6px' }}>👁️ Lịch sử</button><button onClick={() => handleDeleteReviewItem(item.productInfo._id, item.id)} style={{ padding: '6px 10px', backgroundColor: '#ffeaea', color: '#ff4757', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>Gỡ</button></td>
                </tr>
              ))
            ) : ( <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Chưa có đánh giá nào.</td></tr> )}
          </tbody>
        </table>
      </div>

      {/* Modal Lịch sử đánh giá */}
      {selectedProductForReview && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', width: '90%', maxWidth: '900px', maxHeight: '85vh', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px', backgroundColor: '#1a1a1a', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><img src={selectedProductForReview.image} alt={selectedProductForReview.name} style={{ width: '55px', height: '55px', objectFit: 'cover', borderRadius: '6px', border: '2px solid #fff' }} /><div><h4 style={{ margin: 0, fontSize: '18px' }}>{selectedProductForReview.name}</h4><div style={{ fontSize: '13px', color: '#ccc', marginTop: '4px' }}>Giá: <strong style={{ color: '#e67e22' }}>{formatPrice && formatPrice(selectedProductForReview.price)}</strong></div></div></div><button onClick={() => setSelectedProductForReview(null)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}>✕</button></div>
            <div style={{ padding: '20px', overflowY: 'auto', flex: 1, minHeight: '450px' }}>
              <h5 style={{ margin: '0 0 15px 0', fontSize: '15px', color: '#333', borderBottom: '2px solid #1a1a1a', paddingBottom: '8px', display: 'inline-block' }}>📜 Lịch Sử Đóng Góp Ý Kiến</h5>
              {selectedProductForReview.reviews && selectedProductForReview.reviews.length > 0 ? ( <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}> {selectedProductForReview.reviews.map((rev, idx) => ( <div key={rev.id || idx} style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '6px', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}> <div> <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><strong style={{ fontSize: '14px' }}>{rev.name}</strong><span style={{ color: '#f39c12', fontSize: '12px' }}>{'★'.repeat(rev.rating)}</span></div> <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#444' }}>"{rev.text}"</p> </div> <button onClick={() => handleDeleteReviewItem(selectedProductForReview._id, rev.id)} style={{ padding: '6px 12px', backgroundColor: '#ff4757', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>🗑️ Xóa</button> </div> ))} </div> ) : ( <p style={{ color: '#888', fontStyle: 'italic', textAlign: 'center' }}>Sản phẩm chưa có đánh giá.</p> )}
            </div>
            <div style={{ padding: '15px 20px', borderTop: '1px solid #eee', backgroundColor: '#f5f5f5', textAlign: 'right' }}><button onClick={() => setSelectedProductForReview(null)} style={{ padding: '8px 20px', backgroundColor: '#666', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Đóng</button></div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewListTab;