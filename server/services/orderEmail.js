const nodemailer = require('nodemailer');

// 1. CẤU HÌNH NODE MAILER GỬI MAIL
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vietnam.contact.thesea@gmail.com',
        pass: 'ytnkjvhqugmsaqat' // Mật khẩu ứng dụng Gmail
    }
});

// 2. HÀM CHUẨN HÓA ĐƯỜNG DẪN ẢNH (Khắc phục hoàn toàn lỗi vỡ ảnh trên Gmail)
const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/150?text=No+Image';
    
    // Nếu là link online công khai (Cloudinary, Unsplash, HTTPS...) thì giữ nguyên
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }
    
    // Nếu là đường dẫn nội bộ (ví dụ /images/sp1.jpg):
    // Ưu tiên lấy từ biến môi trường BACKEND_URL, nếu chưa cấu hình sẽ mặc định dùng localhost:5000
    const baseUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const formattedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    
    return `${baseUrl}${formattedPath}`;
};

// 3. HÀM FORMAT TIỀN TỆ (USD)
const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
    }).format(amount || 0);
};

// 4. HÀM TÍNH TOÁN TIỀN CỌC & TIỀN CÒN LẠI
const calculatePaymentDetails = (order) => {
    let paidAmount = order.total;

    if (order.paymentInfo) {
        if (typeof order.paymentInfo.amountPaid === 'number' && order.paymentInfo.amountPaid > 0) {
            paidAmount = order.paymentInfo.amountPaid;
        } else if (String(order.paymentInfo.method).toLowerCase() === 'deposit') {
            paidAmount = (order.total * 25) / 100;
        }
    } else if (typeof order.paidAmount === 'number' && order.paidAmount > 0 && order.paidAmount <= order.total) {
        paidAmount = order.paidAmount;
    } else {
        const opt = String(
            order.depositPercent || order.paymentPercent || order.paymentOption || order.depositOption || order.paymentType || ''
        ).toLowerCase();
        if (opt.includes('25') || opt.includes('deposit') || opt.includes('coc') || order.isDeposit === true) {
            paidAmount = (order.total * 25) / 100;
        } else if (opt.includes('50')) {
            paidAmount = (order.total * 50) / 100;
        }
    }

    const remainingAmount = order.total - paidAmount;
    return { paidAmount, remainingAmount };
};

// 5. HÀM RENDER BẢNG DANH SÁCH SẢN PHẨM HÓA ĐƠN
const renderInvoiceItems = (items) => {
    if (!items || items.length === 0) return '';
    
    return items.map((item) => {
        const itemTotal = (item.price || 0) * (item.quantity || 1);
        const validImageUrl = getImageUrl(item.image); // Tự động xử lý link ảnh

        return `
            <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 8px; width: 60px;">
                    <img src="${validImageUrl}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; border: 1px solid #eee;" />
                </td>
                <td style="padding: 12px 8px; vertical-align: middle;">
                    <strong style="font-size: 13px; color: #111; display: block;">${item.name}</strong>
                    ${item.size ? `<span style="font-size: 11px; color: #777;">Size: ${item.size}</span>` : ''}
                </td>
                <td align="center" style="padding: 12px 8px; vertical-align: middle; font-size: 13px; color: #333;">
                    ${item.quantity || 1}
                </td>
                <td align="right" style="padding: 12px 8px; vertical-align: middle; font-size: 13px; color: #333;">
                    ${formatPrice(item.price)}
                </td>
                <td align="right" style="padding: 12px 8px; vertical-align: middle; font-size: 13px; font-weight: bold; color: #111;">
                    ${formatPrice(itemTotal)}
                </td>
            </tr>
        `;
    }).join('');
};

// 6. HÀM CHÍNH: GỬI EMAIL HÓA ĐƠN ĐIỆN TỬ
const sendOrderStatusEmail = async (order, status) => {
    if (!order || !order.customer || !order.customer.email) return;

    const shortOrderId = order._id.toString().substring(0, 8).toUpperCase();
    const createdDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN');
    const { paidAmount, remainingAmount } = calculatePaymentDetails(order);
    const itemsHtml = renderInvoiceItems(order.items);

    const customerName = order.customer.name || order.username || 'Khách hàng';
    const customerPhone = order.customer.phone || order.phone || 'Chưa cung cấp';
    const customerAddress = order.customer.address || order.address || 'Giao tại cửa hàng';

    try {
        if (status === 'confirmed') {
            const mailOptions = {
                from: '"THE SEA" <vietnam.contact.thesea@gmail.com>',
                to: order.customer.email,
                subject: `[HÓA ĐƠN ĐIỆN TỬ] XÁC NHẬN ĐƠN HÀNG #${shortOrderId} - THE SEA`,
                html: `
                    <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f4f4; padding: 20px 10px;">
                        <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
                            
                            <!-- HEADER HÓA ĐƠN -->
                            <div style="background-color: #0f172a; color: #ffffff; padding: 25px 30px;">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <h1 style="margin: 0; font-size: 22px; letter-spacing: 3px; font-weight: 800;">THE SEA</h1>
                                            <p style="margin: 4px 0 0 0; font-size: 12px; color: #94a3b8; text-transform: uppercase;">Hóa Đơn Bán Hàng / E-Receipt</p>
                                        </td>
                                        <td align="right">
                                            <span style="background-color: #22c55e; color: #ffffff; font-size: 11px; font-weight: bold; padding: 6px 12px; border-radius: 20px; text-transform: uppercase;">
                                                Đã xác nhận
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <!-- THÔNG TIN KHÁCH HÀNG & ĐƠN HÀNG -->
                            <div style="padding: 25px 30px; background-color: #f8fafc; border-bottom: 1px dashed #cbd5e1;">
                                <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; color: #334155; line-height: 1.6;">
                                    <tr>
                                        <td width="50%" style="vertical-align: top; padding-right: 15px;">
                                            <strong style="color: #0f172a; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; display: block; margin-bottom: 6px;">Thông tin khách hàng:</strong>
                                            <div style="font-weight: bold; color: #0f172a; font-size: 14px;">${customerName}</div>
                                            <div>SĐT: ${customerPhone}</div>
                                            <div>Địa chỉ: ${customerAddress}</div>
                                        </td>
                                        <td width="50%" style="vertical-align: top; padding-left: 15px; border-left: 1px solid #e2e8f0;">
                                            <strong style="color: #0f172a; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; display: block; margin-bottom: 6px;">Chi tiết hóa đơn:</strong>
                                            <div>Mã đơn hàng: <strong style="color: #2563eb;">#${shortOrderId}</strong></div>
                                            <div>Ngày lập: ${createdDate}</div>
                                            <div>Hình thức: ${paidAmount < order.total ? 'Đặt cọc online + COD' : 'Thanh toán 100%'}</div>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <!-- BẢNG DANH SÁCH SẢN PHẨM -->
                            <div style="padding: 25px 30px;">
                                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                                    <thead>
                                        <tr style="border-bottom: 2px solid #0f172a; font-size: 11px; text-transform: uppercase; color: #64748b;">
                                            <th align="left" colSpan="2" style="padding-bottom: 8px;">Sản phẩm</th>
                                            <th align="center" style="padding-bottom: 8px;">SL</th>
                                            <th align="right" style="padding-bottom: 8px;">Đơn giá</th>
                                            <th align="right" style="padding-bottom: 8px;">Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${itemsHtml}
                                    </tbody>
                                </table>

                                <!-- TỔNG KẾT THANH TOÁN -->
                                <div style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #0f172a;">
                                    <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; line-height: 2;">
                                        <tr>
                                            <td style="color: #64748b;">Tổng giá trị sản phẩm:</td>
                                            <td align="right" style="font-weight: bold; color: #0f172a;">${formatPrice(order.total)}</td>
                                        </tr>
                                        <tr>
                                            <td style="color: #16a34a; font-weight: 500;">Đã thanh toán (Tiền cọc):</td>
                                            <td align="right" style="color: #16a34a; font-weight: bold;">- ${formatPrice(paidAmount)}</td>
                                        </tr>
                                        <tr style="border-top: 1px solid #e2e8f0;">
                                            <td style="padding-top: 8px; font-size: 14px; font-weight: bold; color: #0f172a;">CẦN THANH TOÁN KHI NHẬN HÀNG:</td>
                                            <td align="right" style="padding-top: 8px; font-size: 18px; font-weight: 800; color: #dc2626;">${formatPrice(remainingAmount)}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>

                            <!-- FOOTER HÓA ĐƠN -->
                            <div style="background-color: #f8fafc; padding: 20px 30px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #64748b; line-height: 1.6;">
                                <p style="margin: 0; font-weight: bold; color: #0f172a;">Cảm ơn bạn đã mua sắm tại THE SEA!</p>
                                <p style="margin: 4px 0 0 0;">Email này có giá trị như hóa đơn mua hàng điện tử. Vui lòng kiểm tra kỹ sản phẩm khi nhận hàng.</p>
                                <p style="margin: 8px 0 0 0; font-size: 11px; color: #94a3b8;">Hotline hỗ trợ: 1900 xxxx | Website: thesea.vn</p>
                            </div>

                        </div>
                    </div>
                `
            };
            await transporter.sendMail(mailOptions);
            console.log(`✉️ Hóa đơn điện tử đã gửi tới email: ${order.customer.email}`);
        }
    } catch (error) {
        console.error("🔥 Lỗi khi gửi email hóa đơn:", error);
    }
};

module.exports = { sendOrderStatusEmail };