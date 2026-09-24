import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product, setSelectedProduct, addToCart, formatPrice, currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const [displayImage, setDisplayImage] = useState(product.image);
  const [isHovered, setIsHovered] = useState(false);

  // STATE MỚI: Theo dõi màu sắc thực tế đang được chọn (dựa trên ảnh đang hiển thị)
  const [selectedColorDetails, setSelectedColorDetails] = useState({
    name: product.defaultColorName || 'Mặc định',
    code: product.defaultColorCode || '',
    img: product.image
  });

  useEffect(() => {
    setDisplayImage(product.image);
    setSelectedColorDetails({
        name: product.defaultColorName || 'Mặc định',
        code: product.defaultColorCode || '',
        img: product.image
    });
  }, [product]);

  // Hàm xử lý khi người dùng rà chuột qua các chấm màu
  const handleColorHover = (colorName, colorCode, imageSrc) => {
    setDisplayImage(imageSrc);
    setSelectedColorDetails({
        name: colorName,
        code: colorCode,
        img: imageSrc
    });
  };

  // Hàm xử lý "Thêm vào giỏ"
  const handleAddToCart = (e) => {
      e.stopPropagation();
      // Ghi đè thông tin màu sắc vào payload product trước khi đẩy vào giỏ
      const cartItem = {
          ...product,
          selectedColor: selectedColorDetails.name,
          selectedColorCode: selectedColorDetails.code,
          image: selectedColorDetails.img
      };
      addToCart(cartItem);
  };

  // =======================================
  // LOGIC THẢ TIM (WISHLIST)
  // =======================================
  const productIdStr = String(product?._id || product?.id || '');
  const isLiked = Boolean(currentUser?.wishlist?.some(id => String(id) === productIdStr));

  const handleToggleHeart = async (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    
    if (!currentUser) {
      alert("Vui lòng đăng nhập để lưu sản phẩm vào danh sách Yêu thích!");
      return;
    }

    if (!currentUser._id) {
      alert("Không tìm thấy thông tin tài khoản!");
      return;
    }

    if (!productIdStr) {
      console.error("Không tìm thấy ID sản phẩm");
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
          setCurrentUser(prev => ({
            ...prev,
            wishlist: data.wishlist
          }));
        }
      } else {
        alert("⚠️ " + (data.message || "Không thể cập nhật danh sách yêu thích!"));
      }
    } catch (error) {
      console.error("Lỗi thả tim:", error);
    }
  };

  // Tạo Nhãn (Label) tinh tế giống LV
  let label = "";
  if (product.isNewProduct) label = "Mới - Có thể cá nhân hóa";
  if (product.isSale) label = "Đang giảm giá";
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
          <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2, padding: '4px', backgroundColor: '#fff', borderRadius: '2px', pointerEvents: 'none' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>

          {/* SỬA ĐỔI: Nút Trái tim (Góc phải) */}
          <button 
            type="button"
            onClick={handleToggleHeart}
            title={isLiked ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
            style={{ 
              position: 'absolute', top: '10px', right: '10px', zIndex: 10, 
              cursor: 'pointer', padding: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              transition: 'transform 0.2s ease, background-color 0.2s ease',
              outline: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {isLiked ? (
               <svg width="18" height="18" viewBox="0 0 24 24" fill="#e11d48" stroke="#e11d48" strokeWidth="1.2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
               </svg>
            ) : (
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.8">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
               </svg>
            )}
          </button>

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

          {/* SỬA ĐỔI: GỌI HÀM handleAddToCart */}
          <div style={{
            position: 'absolute', bottom: isHovered ? '15px' : '-10px', left: '50%',
            transform: 'translateX(-50%)', width: '85%', opacity: isHovered ? 1 : 0,
            visibility: isHovered ? 'visible' : 'hidden', transition: 'all 0.3s ease', zIndex: 2
          }}>
            <button 
              onClick={handleAddToCart}
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
          
          <div>
            <div style={{ fontSize: '11px', color: '#666', marginBottom: '5px', minHeight: '16px' }}>
              {displayLabel}
            </div>
            
            <h4 
              onClick={() => navigate(`/product/${product._id}`)} 
              style={{ 
                fontSize: '13px', margin: '0', fontWeight: '400', color: '#1a1a1a', lineHeight: '1.4', cursor: 'pointer',
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' 
              }}
            >
              {product.name}
            </h4>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
            
            <span style={{ fontSize: '13px', color: '#1a1a1a', fontWeight: '400' }}>
              {formatPrice(product.price)}
            </span>

            {/* SỬA ĐỔI: Gọi hàm handleColorHover thay vì setDisplayImage */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                
                <div 
                  onMouseEnter={() => handleColorHover(product.defaultColorName || "Mặc định", product.defaultColorCode, product.image)}
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
                    onMouseEnter={() => handleColorHover(c.colorName, c.colorCode, c.colorImage)}
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