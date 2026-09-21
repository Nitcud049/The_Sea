import React, { useEffect } from 'react';
// Chú ý đường dẫn import ProductCard, lùi về 3 cấp thư mục vì file này nằm sâu trong /pages/men/bags/
import ProductCard from '../../../components/ProductCard'; 

function MenBagsPage({ products, setSelectedProduct, addToCart, formatPrice, currentUser, setCurrentUser }) {
  
  // Tự động cuộn lên đầu trang khi khách hàng click vào trang này
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Bảo vệ biến products tránh lỗi undefined
  const allProducts = products || [];

  // LOGIC LỌC SẢN PHẨM: Lấy Đồ Nam (gender === 'men') VÀ Túi (category === 'bags')
  const menBags = allProducts.filter(p => p.gender === 'men' && p.category === 'bags');

  return (
    <div style={{ padding: "60px 40px", marginTop: "70px", minHeight: "100vh" }}>
      
      {/* TIÊU ĐỀ TRANG */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", borderBottom: "1px solid #1a1a1a", paddingBottom: "20px" }}>
          <span style={{ fontSize: "22px", textTransform: "uppercase", letterSpacing: '1px' }}>Túi Xách Nam</span>
      </div>
      
      {/* KHU VỰC HIỂN THỊ SẢN PHẨM */}
      <div className="w3-row-padding" style={{ margin: "0 -20px" }}>
          {menBags.length > 0 ? (
              menBags.map((product) => (
                  <ProductCard 
                      key={product._id} 
                      product={product} 
                      setSelectedProduct={setSelectedProduct} 
                      addToCart={addToCart} 
                      formatPrice={formatPrice} 
                      currentUser={currentUser} 
                        setCurrentUser={setCurrentUser}
                  />
              ))
          ) : (
              <p style={{ textAlign: 'center', width: '100%', color: '#666', marginTop: '50px', fontStyle: 'italic' }}>
                  Hiện tại chưa có sản phẩm túi xách nam nào.
              </p>
          )}
      </div>

    </div>
  );
}

// ĐÂY LÀ DÒNG LỆNH QUAN TRỌNG NHẤT ĐỂ SỬA LỖI ĐỎ MÀN HÌNH:
export default MenBagsPage;