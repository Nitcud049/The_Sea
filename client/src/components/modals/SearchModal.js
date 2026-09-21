import React, { useState, useEffect } from 'react';

const SearchModal = ({ showSearchModal, setShowSearchModal, products, setSelectedProduct }) => {
    const [localQuery, setLocalQuery] = useState("");
    const [activeTab, setActiveTab] = useState("products");
    const [randomSuggestions, setRandomSuggestions] = useState([]);
    
    // Khóa cuộn trang nền khi mở Modal
    useEffect(() => {
        if (showSearchModal) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [showSearchModal]);

    // Tự động lấy ngẫu nhiên 8 sản phẩm để làm đề xuất mỗi khi mở Modal
    useEffect(() => {
        if (showSearchModal && products.length > 0) {
            const shuffled = [...products].sort(() => 0.5 - Math.random());
            setRandomSuggestions(shuffled.slice(0, 8)); // Lấy 8 sản phẩm đầu tiên sau khi xáo trộn
        }
    }, [showSearchModal, products]);

    if (!showSearchModal) return null;

    // Danh sách từ khóa đề xuất
    const suggestedKeywords = ["Áo Sơ Mi", "Túi", "Nước Hoa", "Váy", "Speedy", "Nón/Mũ"];

    // Hàm bỏ dấu tiếng Việt để tìm kiếm
    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
    };

    // Lọc sản phẩm theo từ khóa khách hàng gõ
    const searchResults = products.filter(p => {
        if (!localQuery) return false;
        const productKeywords = removeAccents(p.name + " " + p.category);
        return productKeywords.includes(removeAccents(localQuery));
    });

    return (
        <div className="lv-modal-fade-in" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", backgroundColor: "#ffffff", zIndex: 9999, overflowY: "auto" }}>
            
            {/* Thanh Header của Modal Tìm kiếm */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px" }}>
                <h1 className="the-sea-logo" style={{ fontSize: "24px", margin: 0, cursor: "pointer" }} onClick={() => { setShowSearchModal(false); setLocalQuery(""); }}>
                    THE SEA
                </h1>
                <span onClick={() => { setShowSearchModal(false); setLocalQuery(""); }} style={{ cursor: "pointer", fontSize: "36px", fontWeight: "300", color: "#1a1a1a", lineHeight: "1" }} title="Đóng">
                    &times;
                </span>
            </div>

            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 40px" }}>
                
                {/* Ô Nhập Tìm Kiếm Khổng Lồ */}
                <div style={{ position: "relative", width: "100%", maxWidth: "800px", margin: "0 auto 40px auto" }}>
                    <input 
                        type="text" 
                        placeholder='Tìm "Túi xách", "Nước hoa"...' 
                        value={localQuery}
                        onChange={(e) => setLocalQuery(e.target.value)}
                        style={{ width: "100%", padding: "18px 50px 18px 25px", fontSize: "16px", borderRadius: "30px", border: "1px solid #1a1a1a", outline: "none", color: "#1a1a1a" }}
                        autoFocus
                    />
                    {localQuery && (
                        <span onClick={() => setLocalQuery("")} style={{ position: "absolute", right: "25px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", cursor: "pointer", color: "#666", fontWeight: "500" }}>
                            Xóa
                        </span>
                    )}
                </div>

                {/* NẾU CHƯA GÕ TÌM KIẾM -> HIỆN TỪ KHÓA VÀ SẢN PHẨM ĐỀ XUẤT */}
                {!localQuery ? (
                    <div className="lv-modal-fade-in">
                        
                        {/* 1. Các từ khóa phổ biến */}
                        <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "60px" }}>
                            <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", color: "#666", marginBottom: "25px" }}>
                                Các từ khóa phổ biến
                            </p>
                            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px" }}>
                                {suggestedKeywords.map((keyword, index) => (
                                    <span 
                                        key={index} 
                                        onClick={() => setLocalQuery(keyword)}
                                        style={{ padding: "10px 24px", borderRadius: "30px", border: "1px solid #eaeaea", fontSize: "14px", cursor: "pointer", transition: "all 0.3s" }}
                                        className="w3-hover-light-grey"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* 2. Sản phẩm đề xuất ngẫu nhiên (Lấp đầy khoảng trống) */}
                        <div style={{ borderTop: "1px solid #eaeaea", paddingTop: "40px" }}>
                            <p style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px", color: "#666", marginBottom: "30px" }}>
                                Gợi ý dành cho bạn
                            </p>
                            <div className="w3-row-padding" style={{ margin: "0 -20px" }}>
                                {randomSuggestions.map((product) => (
                                    <div className="w3-col l3 m4 s6" key={product._id} style={{ padding: "0 20px", marginBottom: "40px" }}>
                                        <div style={{ cursor: "pointer" }} onClick={() => { setSelectedProduct(product); setShowSearchModal(false); setLocalQuery(""); }}>
                                            <div style={{ backgroundColor: "#f6f5f3", overflow: "hidden", position: "relative" }}>
                                                <img src={product.image} alt={product.name} style={{ width: "100%", height: "350px", objectFit: "cover", transition: "transform 0.5s" }} className="w3-hover-opacity" />
                                                <i className="fa fa-heart-o" style={{ position: "absolute", top: "15px", right: "15px", fontSize: "18px", color: "#1a1a1a" }}></i>
                                            </div>
                                            <div style={{ textAlign: "center", marginTop: "15px" }}>
                                                <h3 style={{ fontSize: "14px", fontWeight: "400", margin: "0 0 5px 0" }}>{product.name}</h3>
                                                <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>${product.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* NẾU ĐÃ GÕ -> HIỆN KẾT QUẢ & TAB LỌC */
                    <div className="lv-modal-fade-in">
                        {/* Thanh Tabs & Filter */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eaeaea", paddingBottom: "15px", marginBottom: "30px" }}>
                            <div style={{ fontSize: "13px", color: "#666" }}>
                                {searchResults.length} kết quả tìm kiếm
                            </div>
                            
                            <div style={{ display: "flex", gap: "35px", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                                <span style={{ fontSize: "14px", fontWeight: activeTab === 'products' ? "600" : "400", borderBottom: activeTab === 'products' ? "2px solid #1a1a1a" : "none", paddingBottom: "15px", cursor: "pointer" }} onClick={() => setActiveTab('products')}>
                                    Sản phẩm ({searchResults.length})
                                </span>
                                <span style={{ fontSize: "14px", color: "#666", cursor: "pointer" }}>Tìm cửa hàng</span>
                                <span style={{ fontSize: "14px", color: "#666", cursor: "pointer" }}>Bài viết (0)</span>
                            </div>

                            <button style={{ background: "none", border: "1px solid #eaeaea", padding: "8px 18px", borderRadius: "20px", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }} className="w3-hover-light-grey">
                                Bộ lọc <i className="fa fa-sliders"></i>
                            </button>
                        </div>

                        {/* Lưới sản phẩm kết quả */}
                        <div className="w3-row-padding" style={{ margin: "0 -20px" }}>
                            {searchResults.length > 0 ? searchResults.map((product) => (
                                <div className="w3-col l3 m4 s6" key={product._id} style={{ padding: "0 20px", marginBottom: "40px" }}>
                                    <div style={{ cursor: "pointer" }} onClick={() => { setSelectedProduct(product); setShowSearchModal(false); setLocalQuery(""); }}>
                                        <div style={{ backgroundColor: "#f6f5f3", overflow: "hidden", position: "relative" }}>
                                            <img src={product.image} alt={product.name} style={{ width: "100%", height: "350px", objectFit: "cover", transition: "transform 0.5s" }} className="w3-hover-opacity" />
                                            <i className="fa fa-heart-o" style={{ position: "absolute", top: "15px", right: "15px", fontSize: "18px", color: "#1a1a1a" }}></i>
                                        </div>
                                        <div style={{ textAlign: "center", marginTop: "15px" }}>
                                            <h3 style={{ fontSize: "14px", fontWeight: "400", margin: "0 0 5px 0" }}>{product.name}</h3>
                                            <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>${product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div style={{ width: "100%", textAlign: "center", padding: "100px 0", color: "#666" }}>
                                    Không tìm thấy sản phẩm nào khớp với "{localQuery}".
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchModal;