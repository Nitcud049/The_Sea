import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetailPage({ products, addToCart, formatPrice, currentUser, fetchProducts, setCurrentUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  const [displayImg, setDisplayImg] = useState('');
  const productIdStr = String(product?._id || product?.id || '');
  const isLiked = Boolean(currentUser?.wishlist?.some(id => String(id) === productIdStr));

  // 3. Hàm xử lý thả tim
  const handleToggleHeart = async () => {
    if (!currentUser) {
      alert("Vui lòng đăng nhập để lưu sản phẩm yêu thích!");
      return;
    }
    if (!currentUser._id) {
      alert("Không tìm thấy thông tin tài khoản!");
      return;
    }
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/users/${currentUser._id}/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: productIdStr })
      });
      const data = await res.json();
      if (data.success) {
        if (typeof setCurrentUser === 'function') {
          setCurrentUser(prev => ({ ...prev, wishlist: data.wishlist }));
        }
      }
    } catch (error) {
      console.error("Lỗi thả tim:", error);
    }
  };
  // Tự động cuộn lên đầu và tìm đúng sản phẩm
  useEffect(() => {
    window.scrollTo(0, 0);
    if (products && products.length > 0) {
      const foundProduct = products.find(p => p._id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setDisplayImg(foundProduct.image);
      }
    }
  }, [id, products]);

  // BỘ LỌC TỪ NGỮ CHẶN ĐÁNH GIÁ TIÊU CỰC
  const badWords = ["đụ", "đĩ", "lồn", "cặc", "địt", "chó đẻ", "đm", "vcl", "cứt", "ngu", "điếm", "cave"];

  const handleSubmitReview = () => {
    if (!currentUser) return alert("⚠️ Bạn cần đăng nhập để viết đánh giá!");
    if (!newReview.trim()) return alert("⚠️ Vui lòng nhập nội dung đánh giá!");

    const isProfane = badWords.some(word => newReview.toLowerCase().includes(word));
    if (isProfane) {
      return alert("⛔ TỪ CHỐI: Đánh giá của bạn chứa từ ngữ vi phạm Tiêu chuẩn Cộng đồng. Vui lòng sử dụng ngôn từ lịch sự hơn!");
    }

    const reviewData = {
      id: Date.now().toString(),
      username: currentUser.username,
      name: currentUser.name || currentUser.username,
      rating: rating,
      text: newReview,
      date: new Date().toLocaleDateString('vi-VN')
    };

    const updatedReviews = [reviewData, ...(product.reviews || [])];

    // CẬP NHẬT REAL-TIME: Hiện đánh giá ngay lập tức trên màn hình khách hàng mà không cần chờ đợi Server
    setProduct(prevProduct => ({
      ...prevProduct,
      reviews: updatedReviews
    }));

    // Reset Form
    setNewReview('');
    setRating(5);
    alert("✨ Cảm ơn bạn! Đánh giá đã được ghi nhận.");

    // Gửi ngầm dữ liệu lên Server để lưu vào Database
    fetch(`http://127.0.0.1:5000/api/products/${product._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...product, reviews: updatedReviews })
    })
    .then(() => {
      if(fetchProducts) fetchProducts(); // Đồng bộ dữ liệu ngầm cho các trang khác
    })
    .catch(() => alert("⚠️ Lỗi kết nối máy chủ! Dữ liệu đánh giá có thể chưa được lưu vĩnh viễn."));
  };

  if (!product) return <div style={{ padding: '150px', textAlign: 'center', minHeight: '100vh' }}>Đang tải thông tin sản phẩm...</div>;

  // Lấy danh sách màu sắc
  const allColors = [];
  if (product.defaultColorCode) allColors.push({ name: product.defaultColorName || 'Mặc định', code: product.defaultColorCode, img: product.image });
  if (product.colors && product.colors.length > 0) {
    product.colors.forEach(c => allColors.push({ name: c.colorName, code: c.colorCode, img: c.colorImage }));
  }

  // TÍNH TOÁN ĐIỂM ĐÁNH GIÁ TRUNG BÌNH (GIỐNG SHOPEE)
  const totalReviews = product.reviews ? product.reviews.length : 0;
  const averageRating = totalReviews > 0 
    ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1) 
    : 0;

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingTop: '110px', paddingBottom: '60px' }}>
       
       {/* ==================================================== */}
       {/* 1. KHUNG THÔNG TIN SẢN PHẨM Ở TRÊN (CỘT ẢNH + THÔNG TIN) */}
       {/* ==================================================== */}
       <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px', backgroundColor: '#fff', borderRadius: '4px', display: 'flex', flexWrap: 'wrap', gap: '40px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          
          <div style={{ flex: '1 1 450px' }}>
             <img src={displayImg} alt={product.name} style={{ width: '100%', objectFit: 'cover', borderRadius: '4px' }} />
          </div>
          
          <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column' }}>
             <h1 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '10px', color: '#1a1a1a' }}>{product.name}</h1>
             
             {/* Preview Sao Nhỏ Dưới Tên */}
             <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                {totalReviews > 0 ? (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#ee4d2d', fontSize: '15px', borderRight: '1px solid #eee', paddingRight: '15px' }}>
                        <span style={{ borderBottom: '1px solid #ee4d2d', marginRight: '5px' }}>{averageRating}</span>
                        {'★'.repeat(Math.round(averageRating))}{'☆'.repeat(5 - Math.round(averageRating))}
                    </div>
                    <span style={{ color: '#222', fontSize: '14px' }}>{totalReviews} <span style={{ color: '#767676' }}>Đánh Giá</span></span>
                  </>
                ) : (
                  <span style={{ color: '#767676', fontSize: '14px' }}>Chưa có đánh giá</span>
                )}
             </div>

             <div style={{ backgroundColor: '#fafafa', padding: '15px 20px', marginBottom: '25px' }}>
                <span style={{ fontSize: '30px', fontWeight: '500', color: '#ee4d2d' }}>{formatPrice(product.price)}</span>
             </div>

             {allColors.length > 0 && (
                 <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
                     <span style={{ fontSize: '14px', color: '#757575', width: '100px' }}>Màu sắc:</span>
                     <div style={{ display: 'flex', gap: '10px' }}>
                         {allColors.map((c, i) => (
                             <div key={i} title={c.name} onMouseEnter={() => setDisplayImg(c.img)} style={{ width: '32px', height: '32px', borderRadius: '2px', backgroundColor: c.code, border: displayImg === c.img ? '2px solid #ee4d2d' : '1px solid #e1e1e1', cursor: 'pointer' }} />
                         ))}
                     </div>
                 </div>
             )}

             <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6', marginBottom: '40px' }}>
               {product.description || "Sản phẩm chính hãng. Cam kết chất lượng và dịch vụ tốt nhất dành cho khách hàng của THE SEA."}
             </p>

             <button onClick={() => addToCart(product)} style={{ width: '250px', padding: '15px', backgroundColor: '#1a1a1a', color: '#fff', border: '1px solid #1a1a1a', borderRadius: '2px', fontSize: '15px', cursor: 'pointer', transition: '0.2s' }}>
                 Thêm Vào Giỏ Hàng
             </button>
          </div>
       </div>

       {/* ==================================================== */}
       {/* 2. KHU VỰC LỊCH SỬ ĐÁNH GIÁ (CHUẨN FORM SHOPEE/TIKTOK) */}
       {/* ==================================================== */}
       <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '30px', backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '400', textTransform: 'uppercase', marginBottom: '20px', color: '#1a1a1a' }}>Đánh Giá Sản Phẩm</h3>

          {/* Hộp Tổng Quan Sao */}
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fffbf8', border: '1px solid #f9ede5', padding: '30px', borderRadius: '2px', marginBottom: '30px' }}>
              <div style={{ textAlign: 'center', marginRight: '40px' }}>
                  <div style={{ color: '#ee4d2d' }}>
                      <span style={{ fontSize: '32px', fontWeight: '500' }}>{averageRating}</span>
                      <span style={{ fontSize: '18px' }}> trên 5</span>
                  </div>
                  <div style={{ color: '#ee4d2d', fontSize: '20px', marginTop: '5px' }}>
                      {'★'.repeat(Math.round(averageRating))}{'☆'.repeat(5 - Math.round(averageRating))}
                  </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ padding: '8px 20px', border: '1px solid #ee4d2d', color: '#ee4d2d', backgroundColor: '#fff', borderRadius: '2px', fontSize: '14px', cursor: 'pointer' }}>Tất Cả ({totalReviews})</span>
              </div>
          </div>

          {/* Form để Khách hàng tự viết bình luận */}
          <div style={{ paddingBottom: '30px', marginBottom: '30px', borderBottom: '1px solid #f5f5f5' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '14px', marginRight: '15px', color: '#555' }}>Chạm để đánh giá:</span>
                  {[1,2,3,4,5].map(num => (
                      <span key={num} onClick={() => setRating(num)} style={{ cursor: 'pointer', fontSize: '24px', color: rating >= num ? '#ee4d2d' : '#ccc', marginRight: '5px' }}>★</span>
                  ))}
              </div>
              <textarea value={newReview} onChange={(e) => setNewReview(e.target.value)} placeholder="Hãy chia sẻ nhận xét của bạn về sản phẩm này nhé..." style={{ width: '100%', padding: '15px', borderRadius: '2px', border: '1px solid #e1e1e1', minHeight: '80px', marginBottom: '15px', outline: 'none', resize: 'vertical', fontSize: '14px' }} />
              <button onClick={handleSubmitReview} style={{ padding: '10px 30px', backgroundColor: '#ee4d2d', color: '#fff', border: 'none', borderRadius: '2px', cursor: 'pointer', fontSize: '14px' }}>Gửi Đánh Giá</button>
          </div>

          {/* Danh sách các Bình Luận (Reviews) giống Shopee */}
          <div>
              {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map(r => (
                      <div key={r.id} style={{ display: 'flex', gap: '15px', borderBottom: '1px solid #f5f5f5', paddingBottom: '20px', marginBottom: '20px' }}>
                          
                          {/* Avatar Hình Tròn */}
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f1f1f1', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: '#666', fontSize: '16px' }}>
                              {r.name.charAt(0).toUpperCase()}
                          </div>
                          
                          {/* Nội dung Review */}
                          <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '12px', color: '#222' }}>{r.name}</div>
                              <div style={{ color: '#ee4d2d', fontSize: '12px', margin: '4px 0' }}>
                                  {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                              </div>
                              <div style={{ fontSize: '12px', color: '#999', marginBottom: '12px' }}>
                                  {r.date} | Phân loại hàng: Mặc định
                              </div>
                              <p style={{ margin: 0, fontSize: '14px', color: '#222', lineHeight: '1.5' }}>
                                  {r.text}
                              </p>
                          </div>
                      </div>
                  ))
              ) : (
                  <div style={{ textAlign: 'center', padding: '50px 0', color: '#999' }}>
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" style={{ marginBottom: '15px' }}>
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      <p>Chưa có đánh giá nào.</p>
                  </div>
              )}
          </div>

       </div>
    </div>
  );
}

export default ProductDetailPage;