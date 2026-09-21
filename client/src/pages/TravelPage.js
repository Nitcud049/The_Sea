import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';

function TravelPage({ products, setSelectedProduct, addToCart, formatPrice, currentUser, setCurrentUser }) {
 
  // Tự động cuộn lên đầu trang khi khách hàng click vào trang này
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lọc lấy các sản phẩm thuộc danh mục 'travel'
  const travelProducts = products ? products.filter(p => p.category === 'travel') : [];

  return (
    <div style={{ marginTop: "75px", minHeight: "100vh" }}>
      
      {/* PHẦN 1: DANH SÁCH SẢN PHẨM */}
      <div style={{ padding: "40px 40px 80px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", borderBottom: "1px solid #1a1a1a", paddingBottom: "20px" }}>
            <span style={{ fontSize: "22px", textTransform: "uppercase", letterSpacing: '1px' }}>Dòng Sản Phẩm Du Lịch</span>
        </div>
        <div className="w3-row-padding" style={{ margin: "0 -20px" }}>
            {travelProducts.length > 0 ? (
                travelProducts.map((product) => ( 
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
                <p style={{textAlign: 'center', width: '100%', color: '#666'}}>Chưa có sản phẩm du lịch nào.</p>
            )}
        </div>
      </div>

      {/* PHẦN 2: BANNER LẤP KHOẢNG TRỐNG Ở CUỐI TRANG */}
      <div style={{ position: 'relative', width: '100%', height: '70vh', backgroundColor: '#000' }}>
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80" 
            alt="Art of Travel" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} 
          />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff', width: '100%' }}>
              <p style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '15px' }}>Khám Phá Thế Giới</p>
              <h2 style={{ fontSize: '46px', margin: '0', fontFamily: "'Playfair Display', serif", fontWeight: '400' }}>Nghệ Thuật Viễn Du</h2>
          </div>
      </div>

    </div>
  );
}

export default TravelPage;