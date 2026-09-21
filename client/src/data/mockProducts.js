// Dữ liệu sẽ tự động kích hoạt khi MongoDB hoặc Backend (Flask/Node) bị tắt
export const fallbackProducts = [
  // ============================
  // TÚI XÁCH NỮ (/women/bags)
  // ============================
  {
    _id: "mock_bag_001",
    name: "Phụ Kiện Treo Túi Vivienne Fashionista Cheerleader",
    price: 8500, // USD
    image: "/images/Túi Side Trunk MM East West.jpg",
    gender: "women",
    category: "bags",
    isNewProduct: true 
  },
  {
    _id: "mock_bag_002",
    name: "Phụ Kiện Treo Túi Vivienne Fashionista Surf",
    price: 3200,
    image: "/images/Túi Wallet On Chain Ivy.jpg",
    gender: "women",
    category: "bags",
    isNewProduct: false
  },
  {
    _id: "mock_bag_003",
    name: "Phụ Kiện Treo Túi Vivienne Fashionista Yoga",
    price: 2100,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
    gender: "women",
    category: "bags",
    isNewProduct: false
  },
  {
    _id: "mock_bag_004",
    name: "Phụ Kiện Treo Túi Vivienne Fashionista Golf",
    price: 4400,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80",
    gender: "women",
    category: "bags",
    isNewProduct: true
  },

  // ============================
  // GIÀY NAM (/men/shoes)
  // ============================
  {
    _id: "mock_shoe_001",
    name: "Giày Sneaker LV Trainer",
    price: 1350,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80",
    gender: "men",
    category: "shoes",
    isNewProduct: true
  },

  // ============================
  // DU LỊCH (/travel)
  // ============================
  {
    _id: "mock_travel_001",
    name: "Vali Horizon 55 Chống Xước",
    price: 3400,
    image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=500&q=80",
    gender: "other",
    category: "travel",
    isNewProduct: false
  }
];