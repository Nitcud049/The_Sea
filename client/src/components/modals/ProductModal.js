import React, { useState, useEffect } from 'react';

function ProductModal({ selectedProduct, setSelectedProduct, handleBuyNow, addToCart, formatPrice, currentUser, setCurrentUser }) {
  const [modalImage, setModalImage] = useState('');
  const [selectedColorName, setSelectedColorName] = useState('');
  const [selectedColorCode, setSelectedColorCode] = useState('');

  useEffect(() => {
    if (selectedProduct) {
      setModalImage(selectedProduct.image);
      setSelectedColorName(selectedProduct.defaultColorName || 'Mặc định');
      setSelectedColorCode(selectedProduct.defaultColorCode || '');
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  // Cập nhật hàm xử lý chọn màu để nhận thêm mã màu (code)
  const handleSelectColor = (name, code, img) => {
    setSelectedColorName(name);
    setSelectedColorCode(code);
    setModalImage(img);
  };

  const handleAddToCartWithColor = () => {
    const finalProduct = {
      ...selectedProduct,
      // Không ghi đè tên sản phẩm nữa, gửi kèm các trường màu sắc riêng biệt
      selectedColor: selectedColorName,
      selectedColorCode: selectedColorCode,
      image: modalImage
    };
    addToCart(finalProduct);
    setSelectedProduct(null);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 99999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '900px', borderRadius: '8px', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'row', maxHeight: '90vh', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
        
        <button onClick={() => setSelectedProduct(null)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', zIndex: 10, color: '#1a1a1a' }}>&times;</button>
        
        <div style={{ flex: 1, backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px', borderRight: '1px solid #eee' }}>
          <img src={modalImage} alt={selectedProduct.name} style={{ width: '100%', maxHeight: '420px', objectFit: 'contain' }} />
        </div>

        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '22px', margin: '0 0 10px 0', color: '#1a1a1a', fontWeight: '600' }}>{selectedProduct.name}</h2>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '25px' }}>{formatPrice(selectedProduct.price)}</p>
          
          <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', marginBottom: '25px' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#666', fontWeight: '600', textTransform: 'uppercase' }}>Mô tả sản phẩm</p>
            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.6', margin: 0 }}>{selectedProduct.description || "Hành trang thời trang đẳng cấp từ bộ sưu tập cao cấp của THE SEA."}</p>
          </div>

          <div style={{ marginBottom: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#1a1a1a' }}>
              Màu sắc: <span style={{ fontWeight: 'bold', marginLeft: '5px', color: '#1a1a1a' }}>{selectedColorName}</span>
            </p>
            
            {selectedProduct.colors && selectedProduct.colors.length > 0 ? (
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                
                {/* Ô TRÒN MÀU GỐC MẶC ĐỊNH */}
                <div 
                  onClick={() => handleSelectColor(selectedProduct.defaultColorName || 'Mặc định', selectedProduct.defaultColorCode, selectedProduct.image)}
                  title={selectedProduct.defaultColorName || "Mặc định"}
                  style={{
                    width: '28px', height: '28px', borderRadius: '50%', 
                    backgroundColor: selectedProduct.defaultColorCode || '#ffffff', 
                    cursor: 'pointer', transition: 'all 0.2s',
                    border: selectedColorName === (selectedProduct.defaultColorName || 'Mặc định') ? '2px solid #1a1a1a' : '1px solid #ddd',
                    boxShadow: selectedColorName === (selectedProduct.defaultColorName || 'Mặc định') ? '0 0 0 2px #fff, 0 0 0 3px #1a1a1a' : 'none'
                  }}
                />

                {/* Các ô màu biến thể thêm khác */}
                {selectedProduct.colors.map((c, idx) => (
                  <div 
                    key={idx}
                    onClick={() => handleSelectColor(c.colorName, c.colorCode, c.colorImage)}
                    title={c.colorName}
                    style={{
                      width: '28px', height: '28px', borderRadius: '50%', 
                      backgroundColor: c.colorCode, 
                      cursor: 'pointer', transition: 'all 0.2s',
                      border: selectedColorName === c.colorName ? '2px solid #1a1a1a' : '1px solid #ddd',
                      boxShadow: selectedColorName === c.colorName ? '0 0 0 2px #fff, 0 0 0 3px #1a1a1a' : 'none'
                    }}
                  />
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '13px', color: '#888', fontStyle: 'italic', margin: 0 }}>Sản phẩm này không có biến thể màu sắc khác.</p>
            )}
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', gap: '15px' }}>
            <button 
              onClick={handleAddToCartWithColor}
              style={{ flex: 1, padding: '14px', backgroundColor: '#fff', color: '#1a1a1a', border: '1px solid #1a1a1a', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
            >
              Thêm vào giỏ
            </button>
            <button 
              onClick={() => {
                handleBuyNow({
                  ...selectedProduct,
                  selectedColor: selectedColorName,
                  selectedColorCode: selectedColorCode,
                  image: modalImage
                });
                setSelectedProduct(null);
              }}
              style={{ flex: 1, padding: '14px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
            >
              Mua ngay
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductModal;