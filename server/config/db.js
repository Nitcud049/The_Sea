const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');

const seedData = async () => {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            console.log("Đang khởi tạo dữ liệu mẫu...");
            await Product.insertMany([
                { name: "Quần Jean Ống Rộng", price: 23.99, image: "/images/quan-jean.jpg", category: "clothing", gender: "men", isNewProduct: false, isSale: true, description: "Phong cách bụi bặm." },
                { name: "Quần Jean Thường", price: 19.99, image: "/images/quan-jean1.jpg", category: "clothing", gender: "men", isNewProduct: true, isSale: false, description: "Thoải mái, hack dáng." },
                { name: "Quần Jean Washed", price: 20.50, image: "/images/quan-jean2.jpg", category: "clothing", gender: "men", isNewProduct: false, isSale: false, description: "Màu wash cổ điển." },
                { name: "Quần Jean Cổ Điển", price: 14.99, image: "/images/quan-jean3.jpg", category: "clothing", gender: "men", isNewProduct: false, isSale: true, description: "Dáng basic." },
                { name: "Áo Sơ LV Họa Tiết", price: 15.50, image: "/images/so-mi.jpg", category: "clothing", gender: "men", isNewProduct: false, isSale: false, description: "Vải lụa mềm mại." },
                { name: "Áo Sơ Mi LV Họa Tiết", price: 18.99, image: "/images/so-mi1.jpg", category: "clothing", gender: "men", isNewProduct: true, isSale: false, description: "Họa tiết monogram sang trọng." },
                { name: "Áo Sơ Mi LV Denim", price: 19.50, image: "/images/so-mi2.jpg", category: "clothing", gender: "men", isNewProduct: false, isSale: false, description: "Chất denim bụi bặm." },
                { name: "Áo Sơ Mi LV", price: 12.50, image: "/images/so-mi3.jpg", category: "clothing", gender: "men", isNewProduct: false, isSale: true, description: "Kẻ caro trẻ trung." },
                { name: "Sơ Mi Xám Trơn", price: 14.00, image: "/images/so-mi4.jpg", category: "clothing", gender: "men", isNewProduct: false, isSale: false, description: "Đơn giản tinh tế." },
                { name: "Sơ Mi Kẻ Sọc", price: 16.00, image: "/images/so-mi5.jpg", category: "clothing", gender: "men", isNewProduct: false, isSale: false, description: "Tôn dáng người mặc." },
                { name: "Sơ Mi Họa Tiết Summer", price: 22.00, image: "/images/so-mi6.jpg", category: "clothing", gender: "men", isNewProduct: true, isSale: false, description: "Nổi bật giữa đám đông." },
                { name: "Sơ Mi Nâu", price: 13.50, image: "/images/so-mi7.jpg", category: "clothing", gender: "men", isNewProduct: true, isSale: false, description: "Mát mẻ ngày hè." },
                { name: "Áo Khoác Da Bomber", price: 45.00, image: "/images/ao-khoac.jpg", category: "jackets", gender: "men", isNewProduct: true, isSale: false, description: "Bomber da cực chất." },
                { name: "Áo Khoác Da Biker", price: 80.00, image: "/images/ao-khoac1.jpg", category: "jackets", gender: "men", isNewProduct: false, isSale: true, description: "Da thật 100%." },
                { name: "Áo Khoác Da Bóng", price: 30.00, image: "/images/ao-khoac2.jpg", category: "jackets", gender: "men", isNewProduct: false, isSale: false, description: "Chống nước nhẹ." },
                { name: "Áo Khoác Da Vân", price: 60.00, image: "/images/ao-khoac3.jpg", category: "jackets", gender: "men", isNewProduct: false, isSale: false, description: "Giữ ấm tuyệt đối." },
                { name: "Áo Khoác Da", price: 35.00, image: "/images/ao-khoac4.jpg", category: "jackets", gender: "men", isNewProduct: false, isSale: false, description: "Nhẹ nhàng, lãng tử." },
                { name: "Áo Khoác Da Ôm Gọn", price: 55.00, image: "/images/ao-khoac5.jpg", category: "jackets", gender: "men", isNewProduct: true, isSale: false, description: "Lịch lãm công sở." },
                { name: "Váy Dạ Hội", price: 55.00, image: "/images/vay.jpg", category: "clothing", gender: "women", isNewProduct: true, isSale: false, description: "Quyến rũ và sang trọng." },
                { name: "Váy Mùa Hè", price: 35.00, image: "/images/vay1.jpg", category: "clothing", gender: "women", isNewProduct: false, isSale: false, description: "Chất voan nhẹ nhàng." },
                { name: "Váy Xếp Ly", price: 28.00, image: "/images/vay2.jpg", category: "clothing", gender: "women", isNewProduct: false, isSale: false, description: "Năng động, trẻ trung." },
                { name: "Váy  Xếp Ly", price: 45.00, image: "/images/vay3.jpg", category: "clothing", gender: "women", isNewProduct: false, isSale: true, description: "Tinh khôi, sang chảnh." },
                { name: "Váy Ngắn Đen", price: 26.00, image: "/images/vay4.jpg", category: "clothing", gender: "women", isNewProduct: false, isSale: false, description: "Vintage cổ điển." },
                { name: "Váy Kẻ Sọc", price: 23.25, image: "/images/vay5.jpg", category: "clothing", gender: "women", isNewProduct: true, isSale: false, description: "Dễ phối đồ." },
                { name: "Váy Tiệc Trắng", price: 25.75, image: "/images/vay6.jpg", category: "clothing", gender: "women", isNewProduct: true, isSale: false, description: "Tôn dáng." },
                { name: "Váy Birthday", price: 27.65, image: "/images/vay7.jpg", category: "clothing", gender: "women", isNewProduct: false, isSale: false, description: "Xòe bồng bềnh." },
                { name: "Nón/Mũ Bucket Trắng", price: 31.96, image: "/images/mu1.jpg", category: "accessories", gender: "men", isNewProduct: false, isSale: false, description: "MLB White Bucket." },
                { name: "Nón/Mũ Kết Đen", price: 29.60, image: "/images/mu2.jpg", category: "accessories", gender: "men", isNewProduct: false, isSale: false, description: "Basic Black Cap." },
                { name: "Nón/Mũ Bucket Đen", price: 35.60, image: "/images/mu3.jpg", category: "accessories", gender: "men", isNewProduct: false, isSale: false, description: "MLB Black Bucket." },
                { name: "Nón/Mũ Bucket Họa Tiết", price: 48.00, image: "/images/mu4.jpg", category: "accessories", gender: "men", isNewProduct: true, isSale: false, description: "Monogram thời thượng." },
                { name: "Nón/Mũ Kết Nhung Đỏ", price: 41.48, image: "/images/mu5.jpg", category: "accessories", gender: "men", isNewProduct: true, isSale: false, description: "Nhung tăm nổi bật." },
                { name: "Nón/Mũ Kết Xám NY", price: 35.20, image: "/images/mu6.jpg", category: "accessories", gender: "men", isNewProduct: false, isSale: false, description: "Màu xám dễ phối." },
                { name: "Nước Hoa Dior Sauvage", price: 280.50, image: "/images/nuoc-hoa1.jpg", category: "jewelry", gender: "women", isNewProduct: false, isSale: false, description: "Nam tính, mạnh mẽ." },
                { name: "Nước Hoa Dior Homme", price: 103.60, image: "/images/nuoc-hoa3.jpg", category: "jewelry", gender: "women", isNewProduct: false, isSale: true, description: "Huyền thoại phái nữ." },
                { name: "Nước Hoa Chanel No.5", price: 197.50, image: "/images/nuoc-hoa4.jpg", category: "jewelry", gender: "women", isNewProduct: true, isSale: false, description: "Mùi hương tự do." },
                { name: "Nước Hoa Bleu De Chanel", price: 119.20, image: "/images/nuoc-hoa5.jpg", category: "jewelry", gender: "women", isNewProduct: true, isSale: false, description: "Quyến rũ." },
                { name: "Nước Hoa Allure Chanel", price: 156.50, image: "/images/nuoc-hoa7.jpg", category: "jewelry", gender: "women", isNewProduct: true, isSale: false, description: "Ngọt ngào." },
                { name: "Nước Hoa Versace", price: 50.00, image: "/images/nuoc-hoa8.jpg", category: "jewelry", gender: "women", isNewProduct: false, isSale: false, description: "Dạng chiết tiện lợi." },
                { name: "Dior Miss Dior", price: 195.50, image: "/images/nuochoa2.jpg", category: "jewelry", gender: "women", isNewProduct: false, isSale: false, description: "Lịch lãm." },
                { name: "Túi LV Nâu", price: 3420.00, image: "/images/tui1.jpg", category: "bags", gender: "women", isNewProduct: true, isSale: false, description: "Sang chảnh." },
                { name: "Túi Cầm Tay Đen", price: 2220.00, image: "/images/tui2.jpg", category: "bags", gender: "women", isNewProduct: false, isSale: false, description: "Da thật." },
                { name: "Ví LV Ngắn", price: 740.00, image: "/images/tui3.jpg", category: "bags", gender: "women", isNewProduct: false, isSale: false, description: "Nhỏ gọn." },
                { name: "Túi LV Trắng", price: 4200.00, image: "/images/tui4.jpg", category: "bags", gender: "women", isNewProduct: true, isSale: false, description: "Thiết kế mới nhất." }
            ]);
            console.log("Đã khởi tạo dữ liệu thành công!");
        } else {
            // Tự động bổ sung trường gender nếu chưa có
            await Product.updateMany({ gender: { $exists: false } }, { $set: { gender: "women" } });
        }

        const adminUser = await User.findOne({ username: "admin" });
        if (!adminUser) {
            await new User({ username: "admin", password: "123456", name: "Administrator", phone: "0900000000", address: "Trụ sở chính" }).save();
            console.log("Đã tạo tài khoản Admin thành công!");
        }
    } catch (error) { console.error("Lỗi seedData:", error); }
};

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/shop_quanao');
        console.log("MongoDB Connected Chuẩn MVC!");
        await seedData();
    } catch (err) {
        console.error("Lỗi kết nối DB:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;