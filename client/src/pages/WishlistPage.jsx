import React from 'react';
import ProductCard from '../components/ProductCard'; // Đảm bảo đường dẫn này đúng với dự án của bạn

function WishlistPage({ products, currentUser, setCurrentUser, setSelectedProduct, addToCart, formatPrice }) {
    // 🧠 LOGIC CỐT LÕI: Bộ lọc ma thuật
    // Hệ thống sẽ dò trong toàn bộ kho hàng (products), 
    // Nếu ID của sản phẩm nào nằm trong danh sách "wishlist" của user thì mới lấy ra để hiển thị.
    const wishlistedProducts = (products || []).filter(product => 
        currentUser?.wishlist?.some(id => String(id) === String(product._id || product.id))
    );

    return (
        <div style={{ padding: '80px 20px 40px', minHeight: '70vh', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '40px', fontFamily: '"Playfair Display", serif', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Sản phẩm yêu thích
            </h2>

            {/* KIỂM TRA TRẠNG THÁI HIỂN THỊ */}
            {!currentUser ? (
                <div style={{ textAlign: 'center', color: '#666', padding: '50px 0' }}>
                    <p style={{ fontSize: '16px' }}>Vui lòng đăng nhập để xem danh sách sản phẩm yêu thích của riêng bạn.</p>
                </div>
            ) : wishlistedProducts.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#666', padding: '50px 0' }}>
                    <p style={{ fontSize: '16px' }}>Bạn chưa lưu sản phẩm nào vào danh sách yêu thích.</p>
                    <p style={{ fontSize: '14px', marginTop: '10px' }}>Hãy thả tim (❤️) những sản phẩm bạn ưng ý để dễ dàng mua sắm sau nhé!</p>
                </div>
            ) : (
                <div className="w3-row-padding">
                    {/* VÒNG LẶP CHỈ VẼ RA CÁC SẢN PHẨM ĐÃ ĐƯỢC THẢ TIM */}
                    {wishlistedProducts.map(product => (
                        <ProductCard 
                            key={product._id} 
                            product={product} 
                            currentUser={currentUser} 
                            setCurrentUser={setCurrentUser} 
                            setSelectedProduct={setSelectedProduct} 
                            addToCart={addToCart} 
                            formatPrice={formatPrice} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default WishlistPage;