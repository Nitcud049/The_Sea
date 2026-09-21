import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function CategoryPage({ products, setSelectedProduct, addToCart, formatPrice, currentUser, setCurrentUser }) {
  const { gender, categoryId } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [gender, categoryId]);

  // ==========================================
  // BỘ LỌC TINH GỌN (CHẠY CHUẨN THEO DB CỦA BẠN)
  // ==========================================
  // Sửa dòng cũ thành dòng này:
const filteredProducts = (products || []).filter(p => {
      const pGender = p.gender || '';
      const pCat = p.category || '';

      // 1. Chuẩn hóa URL (Đồng bộ link trên web với chữ trong Database)
      const urlGender = (gender === 'category') ? null : gender;
      let urlCat = categoryId || '';
      
      if (urlCat === 'leather-goods') urlCat = 'leather_goods';
      if (urlCat === 'clothing') urlCat = 'clothes';

      // 2. Lọc Giới tính (Tự động gom Unisex vào Nam và Nữ)
      let matchGender = false;
      if (!urlGender) {
          matchGender = true; // Nếu URL là /category/... thì lấy tất cả giới tính
      } else if (urlGender === 'women' || urlGender === 'men') {
          matchGender = (pGender === urlGender || pGender === 'unisex');
      } else {
          matchGender = (pGender === urlGender);
      }
      
      // 3. Lọc Danh mục
      let matchCategory = false;
      if (urlCat === 'new-arrivals') {
          matchCategory = p.isNewProduct === true;
      } else {
          matchCategory = (pCat === urlCat);
      }

      return matchGender && matchCategory;
  });

  // ==========================================
  // XỬ LÝ TIÊU ĐỀ HIỂN THỊ
  // ==========================================
  const categoryTitles = {
    perfume: "Nước Hoa Phân Khúc Cao Cấp",
    hats: "Nón & Mũ Hàng Hiệu",
    jackets: "Áo Khoác & Áo Lạnh",
    accessories: "Phụ Kiện Thời Trang",
    bags: "Túi Xách THE SEA",
    shoes: "Giày Thể Thao & Giày Da",
    jewelry: "Trang Sức Tuyệt Đỉnh",
    "leather-goods": "Ví & Đồ Da Chế Tác",
    "leather_goods": "Ví & Đồ Da Chế Tác", // Phòng hờ URL dùng dấu gạch dưới
    travel: "Bộ Sưu Tập Du Lịch",
    clothing: "Trang Phục Theo Mùa",
    "new-arrivals": "Bộ Sưu Tập Mới Nhất"
  };

  const genderTitles = {
    
    other: "Phiên Bản Đặc Biệt",
    unisex: "Unisex"
  };

  let pageTitle = categoryTitles[categoryId] || "Danh Mục Sản Phẩm";
  if (gender && gender !== 'category' && genderTitles[gender]) {
      pageTitle = `${pageTitle} ${genderTitles[gender]}`;
  }

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingTop: '110px', paddingBottom: '80px' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '50px', padding: '40px 20px', backgroundColor: '#f9f9f9', borderBottom: '1px solid #eee' }}>
         <h1 style={{ fontSize: '32px', fontFamily: "'Playfair Display', serif", fontWeight: '400', margin: '0 0 15px 0', letterSpacing: '1px' }}>
            {pageTitle}
         </h1>
         <p style={{ color: '#666', fontSize: '15px' }}>
            Khám phá {filteredProducts.length} tuyệt tác đang được trưng bày.
         </p>
      </div>

      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 40px' }}>
        {filteredProducts.length > 0 ? (
          <div className="w3-row-padding" style={{ margin: "0 -20px" }}>
            {filteredProducts.map(product => (
              <ProductCard 
                key={product._id} 
                product={product} 
                setSelectedProduct={setSelectedProduct} 
                addToCart={addToCart} 
                formatPrice={formatPrice} 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" style={{ marginBottom: '20px' }}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
            <h3 style={{ fontSize: '20px', color: '#1a1a1a', fontWeight: '500', marginBottom: '15px' }}>Chưa có sản phẩm nào</h3>
            <p style={{ color: '#666', marginBottom: '10px' }}>THE SEA đang cập nhật những tuyệt tác mới nhất cho danh mục này.</p>
            
            {/* MÁY QUÉT LỖI URL HIỂN THỊ TRỰC TIẾP CHO BẠN XEM */}
            <div style={{ backgroundColor: '#fff5f5', border: '1px dashed #ff4d4d', padding: '15px', display: 'inline-block', borderRadius: '4px', marginTop: '10px' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#cc0000', fontWeight: 'bold' }}>🔍 Thông tin Debug (Dành cho Admin):</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#333' }}>
                    Trang web đang cố tìm sản phẩm có Giới tính = <strong>"{gender}"</strong> và Danh mục = <strong>"{categoryId}"</strong>
                </p>
            </div>
            
            <br/><br/>
            <button onClick={() => navigate('/homepage')} style={{ padding: '12px 30px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '30px', fontWeight: 'bold' }}>Quay lại Trang chủ</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;