import React, { useState, useEffect } from 'react';

const CartModal = ({ 
    showCartModal, 
    setShowCartModal, 
    cart, 
    decreaseQty, 
    increaseQty, 
    removeFromCart, 
    customerInfo, 
    setCustomerInfo, 
    handleCheckout, 
    formatPrice,
    // Prop nhận diện tiền tệ hiện tại khách đang chọn (VD: 'USD', 'EUR', 'VND')
    currentCurrency = 'USD' 
}) => {
    const [paymentMethod, setPaymentMethod] = useState('deposit'); 
    const [selectedBank, setSelectedBank] = useState(''); 

    useEffect(() => {
        if (!showCartModal) setSelectedBank('');
    }, [showCartModal]);

    if (!showCartModal) return null;

    // =========================================================
    // 1. BỘ CHUYỂN ĐỔI TIỀN TỆ TRUNG TÂM (CURRENCY TO VND CONVERTER)
    // =========================================================
    // Tỷ giá quy đổi cố định từ ngoại tệ sang VNĐ (Bạn có thể cập nhật tỷ giá thực tế tại đây)
    const EXCHANGE_RATES = {
        USD: 25400,
        EUR: 27500,
        JPY: 170,
        VND: 1
    };

    // Hàm nhận diện và ép mọi giá trị về chuẩn VNĐ
    const convertToVND = (rawPrice, currencyType) => {
        const price = Number(rawPrice) || 0;
        
        // Nếu giá trị truyền vào đã là tiền Việt (số lớn > 100.000) thì giữ nguyên
        if (price > 100000) return price;

        // Nếu giá trị là ngoại tệ (số nhỏ), tiến hành nhân với tỷ giá tương ứng
        const rate = EXCHANGE_RATES[currencyType.toUpperCase()] || EXCHANGE_RATES.USD; 
        return Math.round(price * rate);
    };

    // =========================================================
    // 2. TÍNH TOÁN TỔNG TIỀN VNĐ
    // =========================================================
    // Duyệt qua giỏ hàng, đưa từng sản phẩm qua bộ chuyển đổi để tính tổng VNĐ
    const totalMoneyVND = cart.reduce((sum, item) => {
        const itemPriceVND = convertToVND(item.price, currentCurrency);
        return sum + (itemPriceVND * item.quantity);
    }, 0);
    
    // Tính tiền cọc 25% và số tiền COD còn lại (Đơn vị: VNĐ)
    const depositAmountVND = Math.round(totalMoneyVND * 0.25);
    const remainingAmountVND = totalMoneyVND - depositAmountVND;
    
    // Chốt số tiền cuối cùng cần chuyển khoản qua QR (VNĐ)
    const finalAmountToPayVND = paymentMethod === 'deposit' ? depositAmountVND : totalMoneyVND;

    // =========================================================
    // 3. CẤU HÌNH NGÂN HÀNG & MÃ QR
    // =========================================================
    const bankDetails = {
        techcombank: { name: "Techcombank", bankId: "TCB", stk: "2304092005", holder: "CONG TY THE SEA LUXURY" },
        tpbank: { name: "TPBank", bankId: "TPB", stk: "00104092005", holder: "CONG TY THE SEA LUXURY" },
        mb: { name: "MB Bank", bankId: "MB", stk: "220409205", holder: "CONG TY THE SEA LUXURY" },
        vcb: { name: "Vietcombank", bankId: "VCB", stk: "9877589808", holder: "CONG TY THE SEA LUXURY" }
    };

    const generateDynamicQR = (bankId, stk, amount, accountName) => {
        if (!amount || amount <= 0) return "";
        return `https://img.vietqr.io/image/${bankId}-${stk}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent("Thanh toan don hang")}&accountName=${encodeURIComponent(accountName)}`;
    };

    const formatVNDText = (amount) => {
        return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
    };

    return (
        <div className="w3-modal lv-modal-fade-in" style={{ display: "block", background: "rgba(0,0,0,0.5)", zIndex: 1200 }}>
            <div className="w3-modal-content" style={{ maxWidth: "550px", margin: "0 0 0 auto", height: "100vh", position: "relative", animation: "slideRight 0.4s", backgroundColor: "#fff" }}>
                
                {/* HEADER */}
                <header style={{ padding: "25px 30px", borderBottom: "1px solid #eaeaea", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={{ fontSize: "16px", margin: 0, textTransform: "uppercase", letterSpacing: "1px" }}>Thanh Toán</h2>
                    <span onClick={() => setShowCartModal(false)} style={{ cursor: "pointer", fontSize: "28px", color: "#1a1a1a", lineHeight: 1 }}>&times;</span>
                </header>
                
                {/* BODY */}
                <div style={{ padding: "30px", height: "calc(100vh - 240px)", overflowY: "auto", paddingBottom: "180px" }}>
                    {cart.length === 0 ? (
                        <p style={{ textAlign: "center", marginTop: "50px", color: "#999" }}>Giỏ hàng của bạn đang trống.</p>
                    ) : (
                        <>
                            {/* DANH SÁCH SẢN PHẨM */}
                            <div style={{ marginBottom: "35px" }}>
                                {cart.map((item) => (
                                    <div key={`${item._id}-${item.selectedColor || 'default'}`} style={{ display: "flex", marginBottom: "20px" }}>
                                        <img src={item.image} style={{ width: "70px", height: "90px", objectFit: "cover", backgroundColor: "#f6f5f3" }} alt={item.name}/>
                                        <div style={{ paddingLeft: "20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                            <div>
                                                <div style={{ fontSize: "14px", fontWeight: 500, marginBottom: "3px" }}>{item.name}</div>
                                                <div style={{ fontSize: "12px", color: "#888", marginBottom: "3px" }}>Màu sắc: {item.selectedColor || 'Mặc định'}</div>
                                                <div style={{ fontSize: "13px", color: "#666" }}>{formatPrice(item.price)} x {item.quantity}</div>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <div style={{ border: "1px solid #eaeaea", display: "inline-flex", borderRadius: "20px" }}>
                                                    <button onClick={() => decreaseQty(item._id, item.selectedColor)} style={{ padding: "3px 10px", background: "#fff", border: "none", cursor: "pointer" }}>-</button>
                                                    <span style={{ padding: "3px 8px", fontSize: "12px" }}>{item.quantity}</span>
                                                    <button onClick={() => increaseQty(item._id, item.selectedColor)} style={{ padding: "3px 10px", background: "#fff", border: "none", cursor: "pointer" }}>+</button>
                                                </div>
                                                <span onClick={() => removeFromCart(item._id, item.selectedColor)} style={{ fontSize: "12px", textDecoration: "underline", cursor: "pointer", color: "#999" }}>Xóa</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* THÔNG TIN GIAO HÀNG */}
                            <div style={{ marginBottom: "35px" }}>
                                <p style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "15px", letterSpacing: "1px" }}>Thông tin giao hàng</p>
                                <input type="text" placeholder="Họ Tên người nhận *" style={{ width: "100%", padding: "12px 15px", marginBottom: "15px", border: "1px solid #eaeaea", borderRadius: "4px", outline: "none", fontSize: "14px" }} value={customerInfo.name} onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})} />
                                <input type="text" placeholder="Số điện thoại *" style={{ width: "100%", padding: "12px 15px", marginBottom: "15px", border: "1px solid #eaeaea", borderRadius: "4px", outline: "none", fontSize: "14px" }} value={customerInfo.phone} onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})} />
                                <input type="text" placeholder="Địa chỉ nhận hàng *" style={{ width: "100%", padding: "12px 15px", border: "1px solid #eaeaea", borderRadius: "4px", outline: "none", fontSize: "14px" }} value={customerInfo.address} onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})} />
                            </div>

                            {/* PHƯƠNG THỨC THANH TOÁN */}
                            <div style={{ marginBottom: "35px" }}>
                                <p style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "15px", letterSpacing: "1px" }}>Phương thức thanh toán</p>
                                
                                <div onClick={() => setPaymentMethod('deposit')} style={{ border: paymentMethod === 'deposit' ? "1px solid #1a1a1a" : "1px solid #eaeaea", padding: "15px", marginBottom: "15px", cursor: "pointer", display: "flex", gap: "15px", backgroundColor: paymentMethod === 'deposit' ? "#fcfcfc" : "#fff" }}>
                                    <input type="radio" checked={paymentMethod === 'deposit'} readOnly style={{ accentColor: "#1a1a1a" }} />
                                    <div>
                                        <div style={{ fontSize: "14px", fontWeight: paymentMethod === 'deposit' ? "600" : "400" }}>Thanh toán một phần (Cọc trước 25%)</div>
                                        <div style={{ fontSize: "12px", color: "#666", marginTop: "3px" }}>Chuyển khoản cọc trước 25%. Phần còn lại thanh toán COD khi nhận hàng.</div>
                                    </div>
                                </div>

                                <div onClick={() => setPaymentMethod('online')} style={{ border: paymentMethod === 'online' ? "1px solid #1a1a1a" : "1px solid #eaeaea", padding: "15px", cursor: "pointer", display: "flex", gap: "15px", backgroundColor: paymentMethod === 'online' ? "#fcfcfc" : "#fff" }}>
                                    <input type="radio" checked={paymentMethod === 'online'} readOnly style={{ accentColor: "#1a1a1a" }} />
                                    <div>
                                        <div style={{ fontSize: "14px", fontWeight: paymentMethod === 'online' ? "600" : "400" }}>Thanh toán trực tuyến trực tiếp (100%)</div>
                                        <div style={{ fontSize: "12px", color: "#666", marginTop: "3px" }}>Thanh toán toàn bộ giá trị đơn hàng thông qua chuyển khoản ngân hàng.</div>
                                    </div>
                                </div>
                            </div>

                            {/* CHỌN NGÂN HÀNG & MÃ QR */}
                            <div style={{ borderTop: "1px solid #eaeaea", paddingTop: "25px" }}>
                                <p style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "15px", letterSpacing: "1px" }}>Chọn ngân hàng thanh toán</p>
                                
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "25px" }}>
                                    {['techcombank', 'tpbank', 'mb', 'vcb'].map((bankKey) => (
                                        <div 
                                            key={bankKey} 
                                            onClick={() => setSelectedBank(bankKey)}
                                            style={{ 
                                                border: selectedBank === bankKey ? "2px solid #1a1a1a" : "1px solid #eaeaea", 
                                                padding: "12px", 
                                                textAlign: "center", 
                                                cursor: "pointer", 
                                                fontSize: "14px", 
                                                fontWeight: selectedBank === bankKey ? "bold" : "normal",
                                                textTransform: "uppercase",
                                                backgroundColor: selectedBank === bankKey ? "#f9f9f9" : "#fff",
                                                borderRadius: "4px"
                                            }}
                                        >
                                            {bankDetails[bankKey].name.split(' ')[0]}
                                        </div>
                                    ))}
                                </div>

                                {selectedBank && (
                                    <div className="lv-modal-fade-in" style={{ background: "#f9f9f9", padding: "20px", borderRadius: "6px", border: "1px solid #eaeaea" }}>
                                        <div style={{ textAlign: "center", marginBottom: "20px" }}>
                                            <p style={{ fontSize: "12px", color: "#666", margin: "0 0 10px 0", textTransform: "uppercase", fontWeight: "bold" }}>Mã QR Chuyển Khoản Tự Động (VNĐ)</p>
                                            <div style={{ background: "#fff", padding: "10px", display: "inline-block", border: "1px solid #eaeaea", marginBottom: "15px" }}>
                                                <img 
                                                    src={generateDynamicQR(bankDetails[selectedBank].bankId, bankDetails[selectedBank].stk, finalAmountToPayVND, bankDetails[selectedBank].holder)} 
                                                    alt="Mã QR Thanh Toán" 
                                                    style={{ width: "220px", height: "220px", objectFit: "contain" }}
                                                />
                                            </div>
                                            <div style={{ textAlign: "left", fontSize: "14px", background: "#fff", padding: "15px", borderRadius: "4px", border: "1px solid #eaeaea" }}>
                                                <div style={{ marginBottom: "8px" }}><span style={{ color: "#666" }}>Ngân hàng:</span> <strong>{bankDetails[selectedBank].name}</strong></div>
                                                <div style={{ marginBottom: "8px" }}><span style={{ color: "#666" }}>Số tài khoản:</span> <strong style={{ fontSize: "16px", color: "#1a1a1a" }}>{bankDetails[selectedBank].stk}</strong></div>
                                                <div style={{ marginBottom: "8px" }}><span style={{ color: "#666" }}>Chủ tài khoản:</span> <strong>{bankDetails[selectedBank].holder}</strong></div>
                                                <div><span style={{ color: "#666" }}>Số tiền cần chuyển:</span> <strong style={{ color: "#cc0000", fontSize: "16px" }}>{formatVNDText(finalAmountToPayVND)}</strong></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
                
                {/* FOOTER */}
                {cart.length > 0 && (
                    <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", padding: "20px 30px", background: "#fcfcfc", borderTop: "1px solid #eaeaea", boxShadow: "0 -4px 15px rgba(0,0,0,0.03)" }}>
                        {paymentMethod === 'deposit' ? (
                            <>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "13px", color: "#666" }}>
                                    <span>Tổng giá trị (Quy đổi VNĐ):</span>
                                    <span>{formatVNDText(totalMoneyVND)}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "13px", color: "#666" }}>
                                    <span>Thanh toán COD khi nhận hàng:</span>
                                    <span>{formatVNDText(remainingAmountVND)}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "15px", fontWeight: "bold", color: "#1a1a1a" }}>
                                    <span>CẦN CỌC TRƯỚC (25%):</span>
                                    <span style={{ color: "#cc0000" }}>{formatVNDText(depositAmountVND)}</span>
                                </div>
                            </>
                        ) : (
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "15px", fontWeight: "bold" }}>
                                <span>TỔNG TIỀN THANH TOÁN (100%):</span>
                                <span style={{ color: "#cc0000" }}>{formatVNDText(totalMoneyVND)}</span>
                            </div>
                        )}

                        <button 
                            onClick={() => handleCheckout(paymentMethod, finalAmountToPayVND, selectedBank ? bankDetails[selectedBank].name : null)} 
                            className="lv-btn-dark" 
                            style={{ width: "100%", padding: "15px", fontSize: "14px", letterSpacing: "1px", backgroundColor: "#1a1a1a", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold" }}
                        >
                            XÁC NHẬN ĐẶT ĐƠN HÀNG
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartModal;