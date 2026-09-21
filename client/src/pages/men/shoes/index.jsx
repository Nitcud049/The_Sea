import React, { useState, useEffect } from 'react';
import ProductCard from '../../../components/ProductCard'; 
import { fallbackProducts } from '../../../data/mockProducts'; 

export default function MenShoesPage({ setSelectedProduct, addToCart, formatPrice, currentUser, setCurrentUser }) {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/products')
      .then(res => {
        if (!res.ok) throw new Error("Lỗi kết nối Server");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const filtered = data.filter(p => p.gender === 'men' && p.category === 'shoes');
          setProductsList(filtered);
        } else {
          const fallback = fallbackProducts.filter(p => p.gender === 'men' && p.category === 'shoes');
          setProductsList(fallback);
        }
      })
      .catch(err => {
        console.error("Lỗi lấy dữ liệu:", err);
        const fallback = fallbackProducts.filter(p => p.gender === 'men' && p.category === 'shoes');
        setProductsList(fallback);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "60px 40px", marginTop: "70px", minHeight: "100vh" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", borderBottom: "1px solid #1a1a1a", paddingBottom: "20px" }}>
            <span style={{ fontSize: "22px", textTransform: "uppercase", letterSpacing: '1px' }}>
                Giày Nam
            </span>
        </div>
        
        <div className="w3-row-padding" style={{ margin: "0 -20px" }}>
            {isLoading ? (
                <div style={{ textAlign: 'center', width: '100%', padding: '100px 0', color: '#666' }}>Đang tải bộ sưu tập...</div>
            ) : productsList.length > 0 ? (
                productsList.map((product) => ( 
                    <ProductCard key={product._id} product={product} setSelectedProduct={setSelectedProduct} addToCart={addToCart} formatPrice={formatPrice} currentUser={currentUser} 
        setCurrentUser={setCurrentUser} /> 
                ))
            ) : (
                <div style={{ textAlign: 'center', width: '100%', padding: '100px 0' }}><p style={{ color: '#666', fontSize: '15px' }}>Bộ sưu tập đang được cập nhật.</p></div>
            )}
        </div>
    </div>
  );
}