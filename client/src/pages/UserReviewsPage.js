import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserReviewsPage({ products, currentUser, fetchProducts }) {
  const navigate = useNavigate();

  // Cuộn lên đầu trang khi mở
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Nếu chưa đăng nhập thì không cho xem
  if (!currentUser) {
    return (
      <div style={{ padding: '150px 40px', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '24px', fontFamily: "'Playfair Display', serif" }}>Vui lòng đăng nhập</h2>
        <p style={{ color: '#666', marginTop: '15px', marginBottom: '30px' }}>Bạn cần đăng nhập để xem lịch sử đánh giá của mình.</p>
        <button onClick={() => navigate('/homepage')} style={{ padding: '14px 30px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '30px' }}>Quay lại Trang Chủ</button>
      </div>
    );
  }

  // Thu thập TẤT CẢ các đánh giá của User này trên TOÀN BỘ sản phẩm
  const myReviews = products.flatMap(p => 
    (p.reviews || []).filter(r => r.username === currentUser.username).map(r => ({
      ...r,
      product: p // Gắn kèm thông tin sản phẩm để hiển thị ảnh & tên
    }))
  );

  // Sắp xếp bài mới nhất lên đầu
  myReviews.sort((a, b) => b.id - a.id);

  // Hàm cho phép khách hàng tự xóa đánh giá của mình
  const handleDeleteMyReview = (productId, reviewId) => {
    if(window.confirm('Bạn có chắc chắn muốn gỡ bỏ bài đánh giá này?')) {
      const targetProduct = products.find(p => p._id === productId);
      const updatedReviews = targetProduct.reviews.filter(r => r.id !== reviewId);
      
      fetch(`http://127.0.0.1:5000/api/products/${productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({...targetProduct, reviews: updatedReviews})
      }).then(() => {
          alert("🗑️ Đã xóa bài đánh giá của bạn!");
          if(fetchProducts) fetchProducts(); // Tải lại dữ liệu
      });
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingTop: '110px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 40px' }}>
        
        <h2 style={{ fontSize: '28px', fontFamily: "'Playfair Display', serif", marginBottom: '10px' }}>Lịch sử đánh giá</h2>
        <p style={{ color: '#666', marginBottom: '40px', fontSize: '14px' }}>Quản lý các bài viết và đánh giá bạn đã chia sẻ trên THE SEA.</p>

        {myReviews.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {myReviews.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '25px', padding: '25px', border: '1px solid #e5e5e5', borderRadius: '8px', backgroundColor: '#fcfcfc', alignItems: 'flex-start' }}>
                
                {/* 1. Ảnh sản phẩm */}
                <div style={{ width: '120px', height: '120px', backgroundColor: '#f6f5f3', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }} onClick={() => navigate(`/product/${item.product._id}`)}>
                  <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                
                {/* 2. Nội dung đánh giá & Nút xóa */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                       <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: '500', cursor: 'pointer' }} onClick={() => navigate(`/product/${item.product._id}`)}>{item.product.name}</h4>
                       <div style={{ color: '#f39c12', marginBottom: '15px', fontSize: '14px' }}>
                          {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)} 
                          <span style={{ color: '#999', fontSize: '12px', marginLeft: '10px' }}>{item.date}</span>
                       </div>
                    </div>
                    
                    <button onClick={() => handleDeleteMyReview(item.product._id, item.id)} style={{ padding: '8px 15px', backgroundColor: '#fff', color: '#ff4757', border: '1px solid #ff4757', borderRadius: '30px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }}>
                      Xóa đánh giá
                    </button>
                  </div>
                  
                  <p style={{ margin: '0', fontSize: '14px', color: '#333', lineHeight: '1.6', padding: '15px', backgroundColor: '#fff', border: '1px dashed #ccc', borderRadius: '4px' }}>
                    "{item.text}"
                  </p>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px dashed #ccc' }}>
            <p style={{ color: '#666', fontSize: '15px', fontStyle: 'italic' }}>Bạn chưa viết bài đánh giá nào trên hệ thống.</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default UserReviewsPage;