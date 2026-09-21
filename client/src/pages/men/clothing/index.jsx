import React, { useState, useEffect } from 'react';
import ProductCard from '../../../components/ProductCard'; // Lùi 3 cấp thư mục để lấy Component
import { fallbackProducts } from '../../../data/mockProducts'; // Lùi 3 cấp thư mục để lấy Data dự phòng

export default function MenClothingPage({ setSelectedProduct, addToCart, formatPrice, currentUser, setCurrentUser }) {
  // Trang tự quản lý State sản phẩm của riêng nó
  const [clothingProducts, setClothingProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Tự gọi API để lấy dữ liệu
    fetch('http://127.0.0.1:5000/api/products')
      .then(res => {
        if (!res.ok) throw new Error("Lỗi kết nối Server");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Lọc ĐÚNG sản phẩm của trang này: gender = 'men' VÀ category = 'clothes'
          const filtered = data.filter(p => p.gender === 'men' && p.category === 'clothes');
          setClothingProducts(filtered);
        } else {
          // Nếu DB rỗng, gọi dữ liệu dự phòng của Đồ Nam - Trang phục
          const fallback = fallbackProducts.filter(p => p.gender === 'men' && p.category === 'clothes');
          setClothingProducts(fallback);
        }
      })
      .catch(err => {
        console.error("Lỗi lấy dữ liệu Trang phục Nam:", err);
        // Mất kết nối DB thì dùng dữ liệu dự phòng
        const fallback = fallbackProducts.filter(p => p.gender === 'men' && p.category === 'clothes');
        setClothingProducts(fallback);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div id="men-clothing-section" style={{ padding: "60px 40px", marginTop: "70px", minHeight: "100vh" }}>
        
        {/* Tiêu đề & Banner có thể tùy biến 100% cho riêng Đồ Nam tại đây */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", borderBottom: "1px solid #1a1a1a", paddingBottom: "20px" }}>
            <span style={{ fontSize: "22px", textTransform: "uppercase", letterSpacing: '1px' }}>
                Trang Phục Nam
            </span>
        </div>
        
        {/* Lưới Sản Phẩm */}
        <div className="w3-row-padding" style={{ margin: "0 -20px" }}>
            {isLoading ? (
                <div style={{ textAlign: 'center', width: '100%', padding: '100px 0', color: '#666' }}>
                    Đang tải bộ sưu tập...
                </div>
            ) : clothingProducts.length > 0 ? (
                clothingProducts.map((product) => ( 
                    <ProductCard 
                        key={product._id} 
                        product={product} 
                        // Truyền các hàm quản lý giỏ hàng/modal từ App xuống để đồng bộ hệ thống
                        setSelectedProduct={setSelectedProduct} 
                        addToCart={addToCart} 
                        formatPrice={formatPrice} 
                        currentUser={currentUser} 
                        setCurrentUser={setCurrentUser}
                    /> 
                ))
            ) : (
                <div style={{ textAlign: 'center', width: '100%', padding: '100px 0' }}>
                    <p style={{ color: '#666', fontSize: '15px', letterSpacing: '0.5px' }}>
                        Bộ sưu tập Trang phục Nam đang được cập nhật.
                    </p>
                </div>
            )}
        </div>
    </div>
  );
}