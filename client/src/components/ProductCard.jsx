import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// THÊM: currentUser và setCurrentUser vào props để nhận dữ liệu từ App.jsx
function ProductCard({ product, setSelectedProduct, addToCart, formatPrice, currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const [displayImage, setDisplayImage] = useState(product.image);
  const [isHovered, setIsHovered] = useState(false);

  // Giữ nguyên logic cập nhật ảnh của bạn
  useEffect(() => {
    setDisplayImage(product.image);
  }, [product.image]);

  // =======================================
  // LOGIC THẢ TIM (WISHLIST)
  // =======================================
  // Kiểm tra xem ID sản phẩm này có nằm trong wishlist của user đang đăng nhập không
  const isLiked = currentUser?.wishlist?.includes(product._id);

  const handleToggleHeart = async (e) => {
    e.stopPropagation(); // Ngăn không cho sự kiện click lan ra ngoài (tránh chuyển trang chi tiết)
    
    if (!currentUser) {
        alert("Vui lòng đăng nhập để lưu sản phẩm yêu thích!");
        return;
    }

    try {
        const res = await fetch(`http://127.0.0.1:5000/api/users/${currentUser._id}/wishlist`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: product._id })
        });
        const data = await res.json();
        
        if (data.success) {
            // Cập nhật lại state currentUser để icon Trái tim đổi màu ngay lập tức
            setCurrentUser({ ...currentUser, wishlist: data.wishlist });
        }
    } catch (error) {
        console.error("Lỗi thả tim:", error);
    }
  };

  // Tạo Nhãn (Label) tinh tế giống LV
  let label = "";
  if (product.isNewProduct) label = "Mới - Có thể cá nhân hóa";
  if (product.isSale) label = "Đang giảm giá";
  // Mẹo CSS: Ký tự \u00A0 là khoảng trắng vô hình, giúp giữ nguyên chiều cao dù sp không có nhãn
  const displayLabel = label || "\u00A0"; 

  return (
    <div className="w3-col l3 m6 s12 w3-container w3-margin-bottom" style={{ padding: '10px' }}>
      <div 
        style={{ 
          position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', 
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' 
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* ======================================= */}
        {/* PHẦN 1: KHUNG ẢNH & CHỨC NĂNG CỦA BẠN   */}
        {/* ======================================= */}
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1/1', backgroundColor: '#f6f5f3', borderRadius: '4px', marginBottom: '12px' }}>
          
          {/* Icon hộp 3D (Góc trái LV) */}
          <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2, padding: '4px', backgroundColor: '#fff', borderRadius: '2px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>

          {/* SỬA ĐỔI: Icon Trái tim (Góc phải LV) - Gắn hàm click và đổi icon dựa trên state isLiked */}
          <div 
            onClick={handleToggleHeart}
            style={{ 
              position: 'absolute', top: '12px', right: '12px', zIndex: 3, 
              cursor: 'pointer', padding: '5px' 
            }}
          >
            {isLiked ? (
               // Tim đỏ (đã thích)
               <svg width="20" height="20" viewBox="0 0 24 24" fill="#ee4d2d" stroke="#ee4d2d" strokeWidth="1.2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
               </svg>
            ) : (
               // Tim rỗng (chưa thích)
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
               </svg>
            )}
          </div>

          <img 
            src={displayImage} 
            alt={product.name} 
            onClick={() => navigate(`/product/${product._id}`)} 
            style={{ 
              width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer',
              transition: 'all 0.4s ease',
              filter: isHovered ? 'brightness(0.85)' : 'brightness(1)',
              transform: isHovered ? 'scale(1.03)' : 'scale(1)'
            }}
          />

          {/* NÚT THÊM VÀO GIỎ HÀNG (GIỮ NGUYÊN HOÀN TOÀN CỦA BẠN) */}
          <div style={{
            position: 'absolute', bottom: isHovered ? '15px' : '-10px', left: '50%',
            transform: 'translateX(-50%)', width: '85%', opacity: isHovered ? 1 : 0,
            visibility: isHovered ? 'visible' : 'hidden', transition: 'all 0.3s ease', zIndex: 2
          }}>
            <button 
              onClick={(e) => { e.stopPropagation(); addToCart(product); }}
              style={{ 
                width: '100%', padding: '12px', backgroundColor: '#1a1a1a', color: '#fff', 
                border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', 
                cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' 
              }}
            >
              Thêm vào giỏ
            </button>
          </div>
        </div>

        {/* ======================================= */}
        {/* PHẦN 2: THÔNG TIN CỐ ĐỊNH CHUẨN LV      */}
        {/* ======================================= */}
        <div style={{ padding: '0 5px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
          
          {/* Nửa trên: Label và Tên sản phẩm */}
          <div>
            <div style={{ fontSize: '11px', color: '#666', marginBottom: '5px', minHeight: '16px' }}>
              {displayLabel}
            </div>
            
            <h4 
              onClick={() => navigate(`/product/${product._id}`)} 
              style={{ 
                fontSize: '13px', margin: '0', fontWeight: '400', color: '#1a1a1a', lineHeight: '1.4', cursor: 'pointer',
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' // Giới hạn tên tối đa 2 dòng
              }}
            >
              {product.name}
            </h4>
          </div>
          
          {/* Nửa dưới: Giá và Màu sắc CÙNG NẰM TRÊN 1 HÀNG */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
            
            <span style={{ fontSize: '13px', color: '#1a1a1a', fontWeight: '400' }}>
              {formatPrice(product.price)}
            </span>

            {/* LOGIC MÀU SẮC ĐƯỢC GIỮ NGUYÊN (Chỉ thu nhỏ size một chút để vừa hàng) */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                
                <div 
                  onMouseEnter={() => setDisplayImage(product.image)}
                  title={product.defaultColorName || "Mặc định"}
                  style={{ 
                    width: '12px', height: '12px', borderRadius: '50%', 
                    border: displayImage === product.image ? '1.5px solid #1a1a1a' : '1px solid #d0d0d0', 
                    backgroundColor: product.defaultColorCode || '#ffffff',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                />

                {product.colors.map((c, idx) => (
                  <div 
                    key={idx}
                    onMouseEnter={() => setDisplayImage(c.colorImage)}
                    title={c.colorName}
                    style={{ 
                      width: '12px', height: '12px', borderRadius: '50%', 
                      border: displayImage === c.colorImage ? '1.5px solid #1a1a1a' : '1px solid #d0d0d0', 
                      backgroundColor: c.colorCode, 
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          
        </div>
        
      </div>
    </div>
  );
}

export default ProductCard;