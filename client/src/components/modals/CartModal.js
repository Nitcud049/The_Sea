import React, { useState, useEffect } from 'react';

const CartModal = ({ showCartModal, setShowCartModal, cart, decreaseQty, increaseQty, removeFromCart, currentUser, customerInfo, setCustomerInfo, handleCheckout, formatPrice }) => {
    const [paymentMethod, setPaymentMethod] = useState('deposit'); 
    const [selectedBank, setSelectedBank] = useState(''); 

    useEffect(() => {
        if (!showCartModal) {
            setSelectedBank('');
        }
    }, [showCartModal]);

    if (!showCartModal) return null;

    // =========================================================
    // PHẦN SỬA LỖI NaN: Tự tính lại tổng tiền gốc (dạng số nguyên)
    // =========================================================
    const rawTotalMoney = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
    
    const depositAmount = rawTotalMoney * 0.25;
    const remainingAmount = rawTotalMoney * 0.75;
    const finalAmountToPay = paymentMethod === 'deposit' ? depositAmount : rawTotalMoney;

    // Cấu hình danh sách dữ liệu tài khoản 4 ngân hàng
    const bankDetails = {
        techcombank: {
            name: "Techcombank (Ngân hàng Kỹ thương)",
            stk: "2304092005",
            holder: "CONG TY THE SEA LUXURY",
            qr: "/images/qr-techcombank.jpg"
        },
        tpbank: {
            name: "TPBank (Ngân hàng Tiên Phong)",
            stk: "00104092005",
            holder: "CONG TY THE SEA LUXURY",
            qr: "/images/qr-tpbank.jpg"
        },
        mb: {
            name: "MB Bank (Ngân hàng Quân Đội)",
            stk: "220409205",
            holder: "CONG TY THE SEA LUXURY",
            qr: "/images/qr-mb.jpg"
        },
        vcb: {
            name: "Vietcombank (Ngân hàng TMCP Ngoại Thương Việt Nam)",
            stk: "9877589808",
            holder: "CONG TY THE SEA LUXURY",
            qr: "/images/qr-vcb.jpg"
        }
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
                            {/* DANH SÁCH SẢN PHẨM TRONG GIỎ */}
                            <div style={{ marginBottom: "35px" }}>
                                {cart.map((item) => (
                                    <div key={item._id} style={{ display: "flex", marginBottom: "20px" }}>
                                        <img src={item.image} style={{ width: "70px", height: "90px", objectFit: "cover", backgroundColor: "#f6f5f3" }} alt={item.name}/>
                                        <div style={{ paddingLeft: "20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                            <div>
                                                <div style={{ fontSize: "14px", fontWeight: 500, marginBottom: "3px" }}>{item.name}</div>
                                                <div style={{ fontSize: "13px", color: "#666" }}>{formatPrice(item.price)} x {item.quantity}</div>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <div style={{ border: "1px solid #eaeaea", display: "inline-flex", borderRadius: "20px" }}>
                                                    <button onClick={() => decreaseQty(item._id)} style={{ padding: "3px 10px", background: "#fff", border: "none", cursor: "pointer" }}>-</button>
                                                    <span style={{ padding: "3px 8px", fontSize: "12px" }}>{item.quantity}</span>
                                                    <button onClick={() => increaseQty(item._id)} style={{ padding: "3px 10px", background: "#fff", border: "none", cursor: "pointer" }}>+</button>
                                                </div>
                                                <span onClick={() => removeFromCart(item._id)} style={{ fontSize: "12px", textDecoration: "underline", cursor: "pointer", color: "#999" }}>Xóa</span>
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
                                <input 
                                    type="email" 
                                    placeholder="Email nhận thông báo đơn hàng *" 
                                    value={customerInfo.email || ''} 
                                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})} 
                                    style={{ width: '100%', padding: '12px 15px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', outline: 'none' }} 
                                />
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

                            {/* MỤC CHỌN NGÂN HÀNG */}
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
                                            {bankKey === 'techcombank' ? 'Techcombank' : bankKey === 'tpbank' ? 'TP Bank' : bankKey === 'mb' ? 'MB Bank' : 'BIDV'}
                                        </div>
                                    ))}
                                </div>

                                {/* HIỂN THỊ QR */}
                                {selectedBank && (
                                    <div className="lv-modal-fade-in" style={{ background: "#f9f9f9", padding: "20px", borderRadius: "6px", border: "1px solid #eaeaea" }}>
                                        <div style={{ background: "#fff5f5", borderLeft: "4px solid #ff4d4d", padding: "12px", marginBottom: "20px", borderRadius: "2px" }}>
                                            <p style={{ margin: 0, fontSize: "13px", color: "#cc0000", fontWeight: "500", lineHeight: "1.5" }}>
                                                ⚠️ <strong>LƯU Ý QUAN TRỌNG:</strong> Vui lòng kiểm tra kỹ chính xác <strong>Số tài khoản</strong> và <strong>Tên tài khoản</strong> trước khi thực hiện giao dịch chuyển tiền.
                                            </p>
                                        </div>
                                        <div style={{ textAlign: "center", marginBottom: "20px" }}>
                                            <p style={{ fontSize: "12px", color: "#666", margin: "0 0 5px 0", textTransform: "uppercase" }}>Mã QR Chuyển Khoản</p>
                                            <div style={{ background: "#fff", padding: "10px", display: "inline-block", border: "1px solid #eaeaea", marginBottom: "15px" }}>
                                                <img 
                                                    src={bankDetails[selectedBank].qr} 
                                                    alt="Mã QR Thanh Toán" 
                                                    style={{ width: "180px", height: "180px", objectFit: "contain" }}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                                <div style={{ display: "none", width: "180px", height: "180px", backgroundColor: "#f1f1f1", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#666", flexDirection: "column", gap: "5px" }}>
                                                    <i className="fa fa-qrcode" style={{fontSize: "32px"}}></i>
                                                    [QR {bankDetails[selectedBank].name}]
                                                </div>
                                            </div>
                                            <div style={{ textAlign: "left", fontSize: "14px", background: "#fff", padding: "15px", borderRadius: "4px", border: "1px solid #eaeaea" }}>
                                                <div style={{ marginBottom: "8px" }}><span style={{ color: "#666" }}>Ngân hàng:</span> <strong>{bankDetails[selectedBank].name}</strong></div>
                                                <div style={{ marginBottom: "8px" }}><span style={{ color: "#666" }}>Số tài khoản:</span> <strong style={{ fontSize: "16px", color: "#1a1a1a", letterSpacing: "0.5px" }}>{bankDetails[selectedBank].stk}</strong></div>
                                                <div><span style={{ color: "#666" }}>Chủ tài khoản:</span> <strong>{bankDetails[selectedBank].holder}</strong></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
                
                {/* FOOTER: CẬP NHẬT LẠI BIẾN rawTotalMoney ĐỂ TÍNH TIỀN CHUẨN */}
                {cart.length > 0 && (
                    <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", padding: "20px 30px", background: "#fcfcfc", borderTop: "1px solid #eaeaea", boxShadow: "0 -4px 15px rgba(0,0,0,0.03)" }}>
                        {paymentMethod === 'deposit' ? (
                            <>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "13px", color: "#666" }}>
                                    <span>Tổng giá trị đơn hàng:</span>
                                    <span>{formatPrice(rawTotalMoney)}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "13px", color: "#666" }}>
                                    <span>Cần thanh toán khi nhận hàng (75%):</span>
                                    <span>{formatPrice(remainingAmount)}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "16px", fontWeight: "bold", color: "#1a1a1a" }}>
                                    <span>SỐ TIỀN CẦN CỌC TRƯỚC (25%):</span>
                                    <span>{formatPrice(depositAmount)}</span>
                                </div>
                            </>
                        ) : (
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "16px", fontWeight: "bold" }}>
                                <span>TỔNG TIỀN THANH TOÁN (100%):</span>
                                <span>{formatPrice(rawTotalMoney)}</span>
                            </div>
                        )}

                        <button 
                            onClick={() => handleCheckout(paymentMethod, finalAmountToPay, selectedBank ? bankDetails[selectedBank].name : null)} 
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