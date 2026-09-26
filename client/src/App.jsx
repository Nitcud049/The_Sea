import React, {
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate
} from 'react-router-dom';

import {
  authFetch,
  authJson,
  getToken,
  tokenExpiresAt,
  readSessionUser,
  clearSession,
  SESSION_EVENT
} from './utils/authApi';

import './App.css';

// ==========================================
// COMPONENT CHUNG
// ==========================================

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import Home from './pages/Home';
import AdminPanel from './pages/admin/AdminPanel';
import Contact from './pages/Contact';
import StoreAppointment from './pages/StoreAppointment/StoreAppointment';

import AuthModal from './components/modals/AuthModal';
import CartModal from './components/modals/CartModal';
import ProductModal from './components/modals/ProductModal';
import SearchModal from './components/modals/SearchModal';
import ProfileModal from './components/modals/ProfileModal';
import OrdersModal from './components/modals/OrdersModal';

import CategoryPage from './pages/CategoryPage';

// ==========================================
// TRANG SẢN PHẨM VÀ DỊCH VỤ
// ==========================================

import MenAccessoriesPage from './pages/men/accessories/index';
import MenClothingPage from './pages/men/clothing/index';
import MenJacketsPage from './pages/men/jackets/index';
import MenNewArrivalsPage from './pages/men/new-arrivals/index';
import MenShoesPage from './pages/men/shoes/index';
import MenBagsPage from './pages/men/bags/index';

import WomenBagsPage from './pages/women/bags/index';
import WomenClothingPage from './pages/women/clothing/index';
import WomenJewelryPage from './pages/women/jewelry/index';
import WomenNewArrivalsPage from './pages/women/new-arrivals/index';
import WomenShoesPage from './pages/women/shoes/index';

import TravelPage from './pages/TravelPage';
import ProductDetailPage from './pages/ProductDetailPage';
import UserReviewsPage from './pages/UserReviewsPage';
import WishlistPage from './pages/WishlistPage';
import ContactPage from './pages/contact/ContactPage';
import ContactMail from './pages/contact/ContactMail';
import ServicesPage from './pages/ServicesPage';

// ==========================================
// TRANG FOOTER
// ==========================================

import FAQPage from './pages/footerPages/FAQPage';
import ProductCarePage from './pages/footerPages/ProductCarePage';
import StoresPage from './pages/footerPages/StoresPage';
import RepairsPage from './pages/footerPages/RepairsPage';
import PersonalizationPage from './pages/footerPages/PersonalizationPage';
import GiftingPage from './pages/footerPages/GiftingPage';
import AppsPage from './pages/footerPages/AppsPage';
import FashionShowsPage from './pages/footerPages/FashionShowsPage';
import ArtsCulturePage from './pages/footerPages/ArtsCulturePage';
import LaMaisonPage from './pages/footerPages/LaMaisonPage';
import SustainabilityPage from './pages/footerPages/SustainabilityPage';
import NewsPage from './pages/footerPages/NewsPage';
import EthicsCompliancePage from './pages/footerPages/EthicsCompliancePage';
import CareersPage from './pages/footerPages/CareersPage';
import FoundationPage from './pages/footerPages/FoundationPage';
import NewsletterPage from './pages/footerPages/NewsletterPage';
import SitemapPage from './pages/footerPages/SitemapPage';
import LegalPrivacyPage from './pages/footerPages/LegalPrivacyPage';
import CookiesPage from './pages/footerPages/CookiesPage';

// ==========================================
// CUỘN LÊN ĐẦU TRANG
// ==========================================

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// ==========================================
// TRANG ĐẶT HÀNG THÀNH CÔNG
// ==========================================

function CheckoutSuccessPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: '150px 40px',
        textAlign: 'center',
        minHeight: '70vh',
        backgroundColor: '#fff'
      }}
    >
      <h2
        style={{
          fontSize: '28px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '20px',
          fontFamily: "'Playfair Display', serif"
        }}
      >
        Cảm ơn bạn đã đặt hàng!
      </h2>

      <p
        style={{
          color: '#666',
          marginBottom: '40px',
          fontSize: '15px'
        }}
      >
        Đơn hàng của bạn tại THE SEA đã được ghi nhận
        và đang trong quá trình xử lý.
        <br />
        Chúng tôi sẽ liên hệ với bạn trong thời gian
        sớm nhất để xác nhận giao hàng.
      </p>

      <button
        className="lv-btn-dark"
        onClick={() => navigate('/homepage')}
      >
        Tiếp tục khám phá
      </button>
    </div>
  );
}

// ==========================================
// NỘI DUNG ỨNG DỤNG
// ==========================================

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage =
    location.pathname === '/' ||
    location.pathname === '/homepage';

  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('the_sea_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(readSessionUser);
  const [sessionToken, setSessionToken] = useState(getToken);

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    email: ''
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    inputCurrency: 'VND',
    image: '',
    defaultColorName: '',
    defaultColorCode: '#ffffff',
    gender: 'women',
    category: 'bags',
    isNewProduct: false,
    isSale: false,
    description: '',
    colors: []
  });

  const [editingId, setEditingId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('list');
  const [users, setUsers] = useState([]);

  const [storeCurrency, setStoreCurrency] = useState('VND');
  const [exchangeRates, setExchangeRates] = useState(null);
  const [homepageConfig, setHomepageConfig] = useState(null);

  const checkoutInFlight = useRef(false);
  const orderUpdatesInFlight = useRef(new Set());

  // ==========================================
  // ĐỒNG BỘ PHIÊN ĐĂNG NHẬP
  // ==========================================

  useEffect(() => {
    const syncSession = event => {
      if (
        event?.type === 'storage' &&
        event.key !== null &&
        !['the_sea_token', 'the_sea_user'].includes(event.key)
      ) {
        return;
      }

      const user = readSessionUser();

      setCurrentUser(user);
      setSessionToken(getToken());
      setOrders([]);
      setUsers([]);

      if (!user) {
        setIsAdminMode(false);
        setShowProfileModal(false);
        setShowOrdersModal(false);

        if (event?.detail?.reason === 'expired') {
          setShowLoginModal(true);
        }
      }
    };

    window.addEventListener(SESSION_EVENT, syncSession);

    if (
      !readSessionUser() &&
      (getToken() || localStorage.getItem('the_sea_user'))
    ) {
      clearSession('invalid');
    }

    window.addEventListener('storage', syncSession);

    return () => {
      window.removeEventListener(SESSION_EVENT, syncSession);
      window.removeEventListener('storage', syncSession);
    };
  }, []);

  // Tự kết thúc phiên khi token hết hạn.
  useEffect(() => {
    if (!currentUser || !sessionToken) return;

    const delay = tokenExpiresAt(sessionToken) - Date.now();

    if (delay <= 0) {
      clearSession('expired');
      return;
    }

    const timer = window.setTimeout(() => {
      if (getToken() === sessionToken) {
        clearSession('expired');
      }
    }, Math.min(delay, 2147483647));

    return () => window.clearTimeout(timer);
  }, [currentUser, sessionToken]);

  // Lưu thông tin hồ sơ, không lưu mật khẩu.
  useEffect(() => {
    if (currentUser && getToken()) {
      const safeUser = { ...currentUser };

      delete safeUser.password;

      localStorage.setItem(
        'the_sea_user',
        JSON.stringify(safeUser)
      );
    }
  }, [currentUser]);

  const handleLogout = () => {
    clearSession('logout');

    setShowCartModal(false);

    setCustomerInfo({
      name: '',
      phone: '',
      address: '',
      email: ''
    });

    navigate('/homepage');
  };

  // ==========================================
  // TẢI TỶ GIÁ VÀ CẤU HÌNH CÔNG KHAI
  // ==========================================

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/currency')
      .then(res => res.json())
      .then(data => {
        if (data?.rates) {
          setExchangeRates(data.rates);
        }
      })
      .catch(error => {
        console.error('Không thể tải cấu hình tiền tệ:', error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'the_sea_cart',
      JSON.stringify(cart)
    );
  }, [cart]);

  // Quyền phía giao diện lấy từ role.
  // Server vẫn kiểm tra quyền độc lập ở từng API.
  useEffect(() => {
    if (
      currentUser?.role === 'admin' &&
      sessionToken &&
      tokenExpiresAt(sessionToken) > Date.now()
    ) {
      setIsAdminMode(true);
      setShowLoginModal(false);
    } else {
      setIsAdminMode(false);
    }
  }, [currentUser?.role, sessionToken]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/settings/homepage')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setHomepageConfig(data);
        }
      })
      .catch(error => {
        console.log('Chưa có cấu hình trang chủ:', error);
      });
  }, []);

  // ==========================================
  // HIỂN THỊ TIỀN TỆ TỪ GIÁ GỐC USD
  // ==========================================

  const formatPrice = basePrice => {
    const convertedPrice =
      (Number(basePrice) || 0) *
      (
        exchangeRates?.[storeCurrency] ||
        (storeCurrency === 'USD' ? 1 : 0)
      );

    if (storeCurrency === 'VND') {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(convertedPrice);
    }

    if (storeCurrency === 'EUR') {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
      }).format(convertedPrice);
    }

    if (storeCurrency === 'JPY') {
      return new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'JPY'
      }).format(convertedPrice);
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(convertedPrice);
  };

  // ==========================================
  // TẢI DỮ LIỆU
  // ==========================================

  const fetchProducts = () => {
    fetch('http://127.0.0.1:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(error => console.error(error));
  };

  const fetchOrders = useCallback(async () => {
    const data = await authJson('/orders');

    if (!Array.isArray(data)) {
      throw new Error('Danh sách đơn hàng không hợp lệ.');
    }

    setOrders(data);

    return data;
  }, []);

  const fetchUsers = useCallback(async () => {
    const data = await authJson('/users');

    if (!Array.isArray(data)) {
      throw new Error('Danh sách khách hàng không hợp lệ.');
    }

    setUsers(data);

    return data;
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!isAdminMode || !sessionToken) return;

    let active = true;

    Promise.all([
      fetchOrders(),
      fetchUsers()
    ]).catch(error => {
      if (!active) return;

      if (error.status === 403) {
        setIsAdminMode(false);
        setOrders([]);
        setUsers([]);
      }

      if (error.status !== 401) {
        window.alert(error.message);
      }
    });

    return () => {
      active = false;
    };
  }, [
    isAdminMode,
    sessionToken,
    fetchOrders,
    fetchUsers
  ]);

  // ==========================================
  // XÓA KHÁCH HÀNG / SẢN PHẨM
  // ==========================================

  const handleDeleteUser = async userOrId => {
    const id = typeof userOrId === 'object'
      ? userOrId?._id
      : userOrId;

    if (!id) return;

    // AdminPanel đã hỏi xác nhận trước khi gọi.
    try {
      await authJson(
        `/users/${encodeURIComponent(id)}`,
        { method: 'DELETE' }
      );

      await fetchUsers();
    } catch (error) {
      window.alert(error.message);
    }
  };

  const handleDeleteProduct = async id => {
    try {
      await authJson(
        `/products/${encodeURIComponent(id)}`,
        { method: 'DELETE' }
      );

      fetchProducts();
    } catch (error) {
      window.alert(error.message);
    }
  };

  // ==========================================
  // GIỎ HÀNG: PHÂN BIỆT MÀU SẢN PHẨM
  // ==========================================

  const addToCart = product => {
    const colorKey = product.selectedColor || 'Mặc định';

    const cartItemKey =
      product.cartItemKey ||
      `${product._id}-${product.selectedColorId || colorKey}`;

    const existingItem = cart.find(item => {
      const itemKey =
        item.cartItemKey ||
        `${item._id}-${item.selectedColorId || item.selectedColor || 'Mặc định'}`;

      return itemKey === cartItemKey;
    });

    if (existingItem) {
      setCart(
        cart.map(item => {
          const itemKey =
            item.cartItemKey ||
            `${item._id}-${item.selectedColorId || item.selectedColor || 'Mặc định'}`;

          return itemKey === cartItemKey
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        })
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          selectedColor: colorKey,
          cartItemKey,
          quantity: 1
        }
      ]);
    }
  };

  const increaseQty = (id, color, cartItemKey) => {
    const colorKey = color || 'Mặc định';

    setCart(
      cart.map(item => {
        const matched = cartItemKey
          ? item.cartItemKey === cartItemKey
          : item._id === id &&
            (item.selectedColor || 'Mặc định') === colorKey;

        return matched
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      })
    );
  };

  const decreaseQty = (id, color, cartItemKey) => {
    const colorKey = color || 'Mặc định';

    setCart(
      cart
        .map(item => {
          const matched = cartItemKey
            ? item.cartItemKey === cartItemKey
            : item._id === id &&
              (item.selectedColor || 'Mặc định') === colorKey;

          return matched
            ? { ...item, quantity: item.quantity - 1 }
            : item;
        })
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id, color, cartItemKey) => {
    const colorKey = color || 'Mặc định';

    setCart(
      cart.filter(item => {
        const matched = cartItemKey
          ? item.cartItemKey === cartItemKey
          : item._id === id &&
            (item.selectedColor || 'Mặc định') === colorKey;

        return !matched;
      })
    );
  };

  // ==========================================
  // LƯU SẢN PHẨM
  // ==========================================

  const handleSaveProduct = () => {
    let priceValue = Number(newProduct.price);

    if (newProduct.inputCurrency === 'VND') {
      if (!exchangeRates?.VND) {
        return alert('⚠️ Chưa tải được tỷ giá tiền tệ!');
      }

      priceValue = priceValue / exchangeRates.VND;
    }

    const formattedProduct = {
      ...newProduct,
      price: priceValue
    };

    if (!formattedProduct.name.trim()) {
      return alert('⚠️ Vui lòng điền tên sản phẩm!');
    }

    if (
      isNaN(formattedProduct.price) ||
      formattedProduct.price <= 0
    ) {
      return alert('⚠️ Giá tiền không hợp lệ!');
    }

    const url = editingId
      ? `/products/${encodeURIComponent(editingId)}`
      : '/products';

    authJson(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedProduct)
    })
      .then(() => {
        alert('✨ Thành công!');
        fetchProducts();

        setNewProduct({
          name: '',
          price: '',
          inputCurrency: 'VND',
          image: '',
          defaultColorName: '',
          defaultColorCode: '#ffffff',
          gender: 'women',
          category: 'bags',
          isNewProduct: false,
          isSale: false,
          description: '',
          colors: []
        });

        setEditingId(null);
        setActiveTab('list');
      })
      .catch(error => {
        alert(`⚠️ ${error.message}`);
      });
  };

  // ==========================================
  // KIỂM TRA THÔNG TIN GIAO HÀNG
  // ==========================================

  const validatePhoneAndEmail = (phoneStr, emailStr) => {
    const cleanPhone = phoneStr.trim().replace(/\s+/g, '');

    const exactVnRegex =
      /^(03[2-9]|05[25689]|07[06-9]|08[1-9]|09[0-46-9])[0-9]{7}$/;

    if (!exactVnRegex.test(cleanPhone)) {
      alert('❌ Số điện thoại không hợp lệ!');
      return false;
    }

    if (
      /(.)\1{5,}/.test(cleanPhone) ||
      cleanPhone.includes('123456')
    ) {
      alert('❌ Số điện thoại có dấu hiệu giả mạo!');
      return false;
    }

    if (emailStr) {
      const emailUser = emailStr.toLowerCase().trim();

      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailRegex.test(emailUser)) {
        alert('❌ Email sai cấu trúc!');
        return false;
      }
    }

    return true;
  };

  // ==========================================
  // CẬP NHẬT TRẠNG THÁI / XÁC NHẬN THANH TOÁN
  // ==========================================

  const handleUpdateOrderStatus = async (id, status) => {
    const key = String(id);

    if (orderUpdatesInFlight.current.has(key)) return;

    orderUpdatesInFlight.current.add(key);

    const requestToken = getToken();

    const sendUpdate = async (extra = {}) => {
      if (getToken() !== requestToken) {
        throw new Error('Phiên đăng nhập đã thay đổi.');
      }

      const response = await authFetch(
        `/orders/${encodeURIComponent(key)}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status,
            ...extra
          })
        }
      );

      const data = await response.json();

      if (getToken() !== requestToken) {
        throw new Error('Phiên đăng nhập đã thay đổi.');
      }

      return { response, data };
    };

    try {
      let question = 'Bạn muốn cập nhật trạng thái đơn hàng này?';

      if (status === 'confirmed') {
        question =
          'Chỉ tiếp tục khi cửa hàng đã kiểm tra và nhận đủ khoản thanh toán ban đầu của đơn ' +
          '(tiền cọc hoặc toàn bộ tiền theo phương án khách chọn).\n\n' +
          'Bạn xác nhận đã nhận đủ khoản tiền đó?';
      } else if (status === 'shipping') {
        question =
          'Bạn xác nhận bàn giao đơn hàng này để vận chuyển?';
      } else if (status === 'completed') {
        question =
          'Bạn xác nhận đơn hàng đã được giao thành công? ' +
          'Nếu còn tiền phải thu, hệ thống sẽ yêu cầu xác nhận riêng.';
      } else if (status === 'cancelled') {
        question =
          'Bạn muốn hủy đơn hàng này? ' +
          'Thao tác này không tự hoàn tiền hoặc xóa số tiền đã nhận.';
      }

      if (!window.confirm(question)) return;

      let result = await sendUpdate();

      // HTTP 409 này yêu cầu xác nhận riêng tiền còn lại.
      if (
        status === 'completed' &&
        result.response.status === 409 &&
        result.data?.code ===
          'REMAINING_PAYMENT_CONFIRMATION_REQUIRED'
      ) {
        const remainingUSD = result.data.remainingUSD;

        if (
          typeof remainingUSD !== 'number' ||
          !Number.isFinite(remainingUSD) ||
          remainingUSD <= 0
        ) {
          throw new Error(
            'Server trả về số tiền còn lại không hợp lệ. ' +
            'Hãy làm mới danh sách.'
          );
        }

        const amountText = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 6
        }).format(remainingUSD);

        const receivedRemaining = window.confirm(
          `Đơn còn phải thu ${amountText} (đơn vị gốc USD).\n\n` +
          'Bạn xác nhận cửa hàng đã nhận đủ khoản còn lại này? ' +
          'Chỉ chọn OK sau khi đã đối chiếu tiền thực nhận.'
        );

        if (!receivedRemaining) return;

        result = await sendUpdate({
          confirmRemainingPayment: true
        });
      }

      if (
        !result.response.ok ||
        result.data?.success === false
      ) {
        throw new Error(
          result.data?.message ||
          `Không thể cập nhật đơn hàng (HTTP ${result.response.status}).`
        );
      }

      const updatedOrder = result.data;

      if (
        !updatedOrder ||
        String(updatedOrder._id) !== key ||
        updatedOrder.status !== status
      ) {
        throw new Error(
          'Phản hồi không khớp đơn hàng hoặc trạng thái. ' +
          'Hãy làm mới danh sách để kiểm tra.'
        );
      }

      // Dùng dữ liệu thật từ server, gồm amountPaid.
      setOrders(previous =>
        previous.map(order =>
          String(order._id) === key
            ? updatedOrder
            : order
        )
      );

      window.alert(
        'Đã cập nhật trạng thái và dữ liệu thanh toán của đơn hàng.'
      );
    } catch (error) {
      window.alert(
        `${error.message || 'Không thể xác định kết quả cập nhật.'}\n` +
        'Nếu mất kết nối sau khi gửi, hãy làm mới danh sách trước khi thao tác lại.'
      );
    } finally {
      orderUpdatesInFlight.current.delete(key);
    }
  };

  // ==========================================
  // ĐẶT HÀNG
  // ==========================================

  const handleCheckout = (
    paymentMethod,
    bankName,
    idempotencyKey
  ) => {
    if (
      !currentUser ||
      !getToken() ||
      tokenExpiresAt() <= Date.now()
    ) {
      setShowCartModal(false);
      setShowLoginModal(true);

      return alert(
        'Vui lòng đăng nhập trước khi đặt hàng. Giỏ hàng vẫn được giữ lại.'
      );
    }

    const { name, phone, address, email } = customerInfo;

    if (!name || !phone || !address || !bankName) {
      return alert('⚠️ Vui lòng điền đủ thông tin giao hàng!');
    }

    const emailToCheck = email || currentUser.email || '';

    if (!validatePhoneAndEmail(phone, emailToCheck)) {
      return;
    }

    if (checkoutInFlight.current) return;

    checkoutInFlight.current = true;

    const orderData = {
      customer: {
        ...customerInfo,
        email: emailToCheck
      },
      items: cart,
      username: currentUser.username,
      displayCurrency: storeCurrency,
      idempotencyKey,
      paymentInfo: {
        method: paymentMethod,
        bank: bankName
      }
    };

    return authJson('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    })
      .then(() => {
        setCart([]);
        setShowCartModal(false);

        setCustomerInfo({
          name: '',
          phone: '',
          address: '',
          email: ''
        });

        navigate('/checkout/success');
      })
      .catch(error => {
        alert(`⚠️ ${error.message || 'Lỗi hệ thống đặt hàng!'}`);
      })
      .finally(() => {
        checkoutInFlight.current = false;
      });
  };

  return (
    <div>
      <ScrollToTop />

      <Header
        setSidebarOpen={setSidebarOpen}
        setIsAdminMode={setIsAdminMode}
        currentUser={currentUser}
        handleLogout={handleLogout}
        setShowLoginModal={setShowLoginModal}
        handleAdminClick={() => {
          if (
            currentUser?.role === 'admin' &&
            tokenExpiresAt() > Date.now()
          ) {
            setIsAdminMode(true);
            navigate('/admin');
          } else {
            setShowLoginModal(true);
          }
        }}
        isAdminMode={isAdminMode}
        setShowCartModal={setShowCartModal}
        totalCount={cart.reduce(
          (sum, item) => sum + item.quantity,
          0
        )}
        setShowSearchModal={setShowSearchModal}
        storeCurrency={storeCurrency}
        setStoreCurrency={setStoreCurrency}
        setShowProfileModal={setShowProfileModal}
        setShowOrdersModal={setShowOrdersModal}
      />

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main
        style={{
          minHeight: '100vh',
          paddingTop: isHomePage ? 0 : '75px'
        }}
      >
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/homepage" replace />}
          />

          <Route
            path="/homepage"
            element={
              <Home
                products={products}
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                formatPrice={formatPrice}
                homepageConfig={homepageConfig}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProductDetailPage
                products={products}
                addToCart={addToCart}
                formatPrice={formatPrice}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                fetchProducts={fetchProducts}
              />
            }
          />

          <Route
            path="/my-reviews"
            element={
              <UserReviewsPage
                products={products}
                currentUser={currentUser}
                fetchProducts={fetchProducts}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/services"
            element={<ServicesPage />}
          />

          <Route
            path="/book-appointment"
            element={
              <StoreAppointment
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/checkout/success"
            element={<CheckoutSuccessPage />}
          />

          <Route
            path="/contact"
            element={
              <Contact
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/contact-us"
            element={
              <ContactPage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/contact-mail"
            element={
              <ContactMail
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/travel"
            element={
              <TravelPage
                products={products}
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                formatPrice={formatPrice}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          {/* TRANG HỖ TRỢ */}
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/product-care" element={<ProductCarePage />} />
          <Route path="/services/care" element={<ProductCarePage />} />
          <Route path="/stores" element={<StoresPage />} />

          {/* TRANG DỊCH VỤ */}
          <Route path="/services/repairs" element={<RepairsPage />} />
          <Route path="/services/personalization" element={<PersonalizationPage />} />
          <Route path="/services/gifting" element={<GiftingPage />} />
          <Route path="/services/apps" element={<AppsPage />} />

          {/* GIỚI THIỆU */}
          <Route path="/about/fashion-shows" element={<FashionShowsPage />} />
          <Route path="/about/arts-culture" element={<ArtsCulturePage />} />
          <Route path="/about/la-maison" element={<LaMaisonPage />} />
          <Route path="/about/sustainability" element={<SustainabilityPage />} />
          <Route path="/about/news" element={<NewsPage />} />
          <Route path="/about/ethics-compliance" element={<EthicsCompliancePage />} />
          <Route path="/about/careers" element={<CareersPage />} />
          <Route path="/about/foundation" element={<FoundationPage />} />

          {/* FOOTER */}
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
          <Route path="/legal/privacy" element={<LegalPrivacyPage />} />
          <Route path="/legal/cookies" element={<CookiesPage />} />

          {/* SẢN PHẨM NAM */}
          <Route
            path="/men/accessories"
            element={
              <MenAccessoriesPage
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                formatPrice={formatPrice}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/men/clothing"
            element={
              <MenClothingPage
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                formatPrice={formatPrice}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/men/bags"
            element={
              <MenBagsPage
                products={products}
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                formatPrice={formatPrice}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/men/jackets"
            element={
              <MenJacketsPage
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                formatPrice={formatPrice}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/men/new-arrivals"
            element={
              <MenNewArrivalsPage
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                formatPrice={formatPrice}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/men/shoes"
            element={
              <MenShoesPage
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                formatPrice={formatPrice}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          {/* SẢN PHẨM NỮ */}
          <Route
            path="/women/bags"
            element={
              <WomenBagsPage
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                formatPrice={formatPrice}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/women/clothing"
            element={
              <WomenClothingPage
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                formatPrice={formatPrice}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/women/jewelry"
            element={
              <WomenJewelryPage
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                formatPrice={formatPrice}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/women/new-arrivals"
            element={
              <WomenNewArrivalsPage
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                formatPrice={formatPrice}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/women/shoes"
            element={
              <WomenShoesPage
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                formatPrice={formatPrice}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          {/* ROUTE DANH MỤC CHUNG */}
          <Route
            path="/:gender/:categoryId"
            element={
              <CategoryPage
                products={products}
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                formatPrice={formatPrice}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              isAdminMode &&
              currentUser?.role === 'admin' &&
              sessionToken ? (
                <AdminPanel
                  setIsAdminMode={setIsAdminMode}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  products={products}
                  handleEditClick={product => {
                    setNewProduct({
                      ...product,
                      price: exchangeRates?.VND
                        ? product.price * exchangeRates.VND
                        : product.price,
                      inputCurrency: 'VND',
                      defaultColorName: product.defaultColorName || '',
                      defaultColorCode: product.defaultColorCode || '#ffffff',
                      colors: product.colors || []
                    });

                    setEditingId(product._id);
                    setActiveTab('add');
                  }}
                  handleDeleteProduct={handleDeleteProduct}
                  newProduct={newProduct}
                  setNewProduct={setNewProduct}
                  resetForm={() => {
                    setNewProduct({
                      name: '',
                      price: '',
                      inputCurrency: 'VND',
                      image: '',
                      defaultColorName: '',
                      defaultColorCode: '#ffffff',
                      gender: 'women',
                      category: 'bags',
                      isNewProduct: false,
                      isSale: false,
                      description: '',
                      colors: []
                    });
                  }}
                  handleSaveProduct={handleSaveProduct}
                  editingId={editingId}
                  orders={orders}
                  users={users}
                  handleDeleteUser={handleDeleteUser}
                  formatPrice={formatPrice}
                  homepageConfig={homepageConfig}
                  setHomepageConfig={setHomepageConfig}
                  fetchProducts={fetchProducts}
                  exchangeRates={exchangeRates}
                  setOrders={setOrders}
                  fetchOrders={fetchOrders}
                  updateOrderStatus={handleUpdateOrderStatus}
                />
              ) : (
                <div
                  style={{
                    padding: '150px 40px',
                    textAlign: 'center',
                    minHeight: '60vh'
                  }}
                >
                  <h2
                    style={{
                      fontSize: '24px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Truy Cập Bị Từ Chối
                  </h2>

                  <p
                    style={{
                      color: '#666',
                      marginTop: '15px',
                      marginBottom: '30px'
                    }}
                  >
                    Khu vực này yêu cầu quyền Quản trị viên.
                    Vui lòng đăng nhập để tiếp tục.
                  </p>

                  <button
                    className="lv-btn-dark"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Đăng Nhập Admin
                  </button>
                </div>
              )
            }
          />

          <Route
            path="/wishlist"
            element={
              <WishlistPage
                products={products}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                formatPrice={formatPrice}
              />
            }
          />
        </Routes>
      </main>

      {!isAdminMode && <Footer />}

      <SearchModal
        showSearchModal={showSearchModal}
        setShowSearchModal={setShowSearchModal}
        products={products}
        setSelectedProduct={setSelectedProduct}
        formatPrice={formatPrice}
      />

      <AuthModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        setCurrentUser={setCurrentUser}
        validatePhoneAndEmail={validatePhoneAndEmail}
      />

      <CartModal
        showCartModal={showCartModal}
        setShowCartModal={setShowCartModal}
        cart={cart}
        decreaseQty={decreaseQty}
        increaseQty={increaseQty}
        removeFromCart={removeFromCart}
        currentUser={currentUser}
        customerInfo={customerInfo}
        setCustomerInfo={setCustomerInfo}
        formatPrice={formatPrice}
        handleCheckout={handleCheckout}
        storeCurrency={storeCurrency}
      />

      <ProductModal
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        handleBuyNow={product => {
          addToCart(product);
          setSelectedProduct(null);
          setShowCartModal(true);
        }}
        addToCart={addToCart}
        formatPrice={formatPrice}
      />

      {showProfileModal && currentUser && (
        <ProfileModal
          currentUser={currentUser}
          setShowProfileModal={setShowProfileModal}
          setCurrentUser={setCurrentUser}
        />
      )}

      <OrdersModal
        key={sessionToken || 'guest'}
        showOrdersModal={showOrdersModal}
        setShowOrdersModal={setShowOrdersModal}
        currentUser={currentUser}
        formatPrice={formatPrice}
      />
    </div>
  );
}

// ==========================================
// ROUTER
// ==========================================

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}