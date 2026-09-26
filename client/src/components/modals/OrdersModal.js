import React, { useState, useEffect } from 'react';
import { authJson } from '../../utils/authApi';

function OrdersModal({
  showOrdersModal,
  setShowOrdersModal,
  currentUser,
  formatPrice
}) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  const userId = currentUser?._id;

  // ==========================================
  // TẢI ĐƠN HÀNG CỦA TÀI KHOẢN ĐANG ĐĂNG NHẬP
  // ==========================================

  useEffect(() => {
    setOrders([]);
    setError('');

    if (!showOrdersModal) {
      setLoading(false);
      return;
    }

    if (!userId) {
      setLoading(false);
      setError('Vui lòng đăng nhập để xem đơn hàng của bạn.');
      return;
    }

    const controller = new AbortController();
    let active = true;

    setLoading(true);

    // Server xác định chủ đơn từ token.
    // Không gửi username trên URL.
    authJson('/orders/my-orders', {
      signal: controller.signal
    })
      .then(data => {
        if (!active) return;

        if (!Array.isArray(data)) {
          throw new Error('Danh sách đơn hàng không hợp lệ.');
        }

        setOrders(data);
      })
      .catch(err => {
        if (!active || err.name === 'AbortError') return;

        setError(
          err.message ||
          'Không tải được đơn hàng. Vui lòng thử lại.'
        );
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    // Hủy yêu cầu khi đóng modal hoặc đổi tài khoản.
    return () => {
      active = false;
      controller.abort();
    };
  }, [showOrdersModal, userId, reloadKey]);

  if (!showOrdersModal) return null;

  // ==========================================
  // TRẠNG THÁI ĐƠN HÀNG
  // ==========================================

  const getStatusBadge = status => {
    switch (status) {
      case 'completed':
        return {
          label: 'Đã hoàn thành',
          bg: '#e6f7ed',
          color: '#12b76a'
        };

      case 'confirmed':
        return {
          label: 'Đã xác nhận',
          bg: '#e0e7ff',
          color: '#4338ca'
        };

      case 'shipping':
        return {
          label: 'Đang giao hàng',
          bg: '#e0f2fe',
          color: '#0284c7'
        };

      case 'cancelled':
        return {
          label: 'Đã hủy',
          bg: '#fee2e2',
          color: '#ef4444'
        };

      case 'pending':
      case 'processing':
      case 'Chờ xử lý':
        return {
          label: 'Đang xử lý',
          bg: '#fef3c7',
          color: '#d97706'
        };

      default:
        return {
          label: 'Chưa xác định',
          bg: '#f3f4f6',
          color: '#6b7280'
        };
    }
  };

  // ==========================================
  // HIỂN THỊ TIỀN
  // ==========================================

  const isUsdOrder = order =>
    order.currency === 'USD' ||
    (
      !order.currency &&
      order.moneyVersion === 'usd-base-v1'
    );

  const readAmount = value => {
    if (
      value === null ||
      value === undefined ||
      (
        typeof value !== 'number' &&
        typeof value !== 'string'
      ) ||
      (
        typeof value === 'string' &&
        !value.trim()
      )
    ) {
      return null;
    }

    const number = Number(value);

    return Number.isFinite(number) && number >= 0
      ? number
      : null;
  };

  const formatOrderAmount = (order, amount) => {
    // Không đoán đơn vị tiền của đơn cũ dựa trên độ lớn.
    if (!isUsdOrder(order)) {
      return 'Cần xác minh đơn vị tiền';
    }

    const value = readAmount(amount);

    if (value === null) {
      return 'Chưa có dữ liệu';
    }

    // Giá gốc USD chỉ được quy đổi một lần qua formatPrice.
    return typeof formatPrice === 'function'
      ? formatPrice(value)
      : new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
  };

  const paymentLabel = order => {
    const method = String(
      order.paymentInfo?.method ||
      order.paymentMethod ||
      ''
    ).toLowerCase();

    if (method === 'deposit') {
      return 'Đặt cọc';
    }

    if (method === 'full') {
      return 'Thanh toán toàn bộ';
    }

    return 'Chưa xác định';
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(6px)',
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={() => setShowOrdersModal(false)}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '650px',
          maxHeight: '85vh',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          animation: 'fadeInScale 0.25s ease-out'
        }}
        onClick={event => event.stopPropagation()}
      >
        {/* HEADER */}
        <div
          style={{
            padding: '22px 28px',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background:
              'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: '600',
                letterSpacing: '0.5px',
                color: '#111'
              }}
            >
              Đơn hàng của tôi
            </h3>

            <p
              style={{
                margin: '4px 0 0',
                fontSize: '13px',
                color: '#777'
              }}
            >
              Theo dõi tình trạng các đơn hàng bạn đã đặt
            </p>
          </div>

          <button
            onClick={() => setShowOrdersModal(false)}
            style={{
              background: '#f3f4f6',
              border: 'none',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              color: '#555',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={event => {
              event.currentTarget.style.backgroundColor = '#e5e7eb';
            }}
            onMouseLeave={event => {
              event.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
          >
            ✕
          </button>
        </div>

        {/* NỘI DUNG */}
        <div
          style={{
            padding: '24px 28px',
            overflowY: 'auto',
            flex: 1
          }}
        >
          {loading ? (
            <div
              style={{
                textAlign: 'center',
                padding: '50px 0',
                color: '#888'
              }}
            >
              <div
                style={{
                  fontSize: '24px',
                  marginBottom: '10px'
                }}
              >
                ⏳
              </div>

              <p style={{ fontSize: '14px' }}>
                Đang tải danh sách đơn hàng...
              </p>
            </div>
          ) : error ? (
            <div
              role="alert"
              style={{
                textAlign: 'center',
                padding: '35px 0',
                color: '#b42318'
              }}
            >
              <p>{error}</p>

              {userId && (
                <button
                  type="button"
                  onClick={() => {
                    setReloadKey(value => value + 1);
                  }}
                >
                  Thử lại
                </button>
              )}
            </div>
          ) : orders.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '50px 20px',
                color: '#777'
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  marginBottom: '16px'
                }}
              >
                🛍️
              </div>

              <h4
                style={{
                  margin: '0 0 8px',
                  color: '#222',
                  fontSize: '16px'
                }}
              >
                Bạn chưa có đơn hàng nào
              </h4>

              <p
                style={{
                  margin: 0,
                  fontSize: '13px',
                  color: '#888'
                }}
              >
                Khám phá các bộ sưu tập thời trang mới nhất
                và đặt hàng ngay hôm nay!
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              {orders.map((order, index) => {
                const badge = getStatusBadge(order.status);

                const orderDate = order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString(
                      'vi-VN',
                      {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }
                    )
                  : 'N/A';

                return (
                  <div
                    key={order._id || index}
                    style={{
                      border: '1px solid #eaeaea',
                      borderRadius: '12px',
                      padding: '18px 20px',
                      backgroundColor: '#fff',
                      transition:
                        'border-color 0.2s ease, box-shadow 0.2s ease',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                    }}
                  >
                    {/* MÃ ĐƠN VÀ TRẠNG THÁI */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px'
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#888',
                            letterSpacing: '0.5px'
                          }}
                        >
                          MÃ ĐƠN: #
                          {String(order._id).slice(-6).toUpperCase()}
                        </span>

                        <div
                          style={{
                            fontSize: '12px',
                            color: '#999',
                            marginTop: '2px'
                          }}
                        >
                          {orderDate}
                        </div>
                      </div>

                      <span
                        style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: badge.bg,
                          color: badge.color
                        }}
                      >
                        {badge.label}
                      </span>
                    </div>

                    {/* SẢN PHẨM */}
                    <div
                      style={{
                        borderTop: '1px dashed #f0f0f0',
                        borderBottom: '1px dashed #f0f0f0',
                        padding: '12px 0',
                        margin: '10px 0'
                      }}
                    >
                      {Array.isArray(order.items) &&
                        order.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginBottom:
                                itemIndex < order.items.length - 1
                                  ? '8px'
                                  : 0
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                              }}
                            >
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  style={{
                                    width: '42px',
                                    height: '42px',
                                    objectFit: 'cover',
                                    borderRadius: '6px',
                                    border: '1px solid #f0f0f0'
                                  }}
                                />
                              )}

                              <div>
                                <div
                                  style={{
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    color: '#222'
                                  }}
                                >
                                  {item.name}
                                </div>

                                <div
                                  style={{
                                    fontSize: '12px',
                                    color: '#777'
                                  }}
                                >
                                  Số lượng: x{item.quantity}
                                </div>

                                {(item.selectedColor || item.color) && (
                                  <div
                                    style={{
                                      fontSize: '12px',
                                      color: '#777'
                                    }}
                                  >
                                    Màu: {item.selectedColor || item.color}
                                  </div>
                                )}
                              </div>
                            </div>

                            <span
                              style={{
                                fontSize: '13px',
                                fontWeight: '600',
                                color: '#111'
                              }}
                            >
                              {formatOrderAmount(
                                order,
                                readAmount(item.price) !== null &&
                                readAmount(item.quantity) !== null
                                  ? Number(item.price) *
                                    Number(item.quantity)
                                  : null
                              )}
                            </span>
                          </div>
                        ))}
                    </div>

                    {/* SỐ TIỀN THỰC TẾ ĐÃ GHI NHẬN */}
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#666',
                        marginBottom: '10px'
                      }}
                    >
                      Đã ghi nhận thanh toán:{' '}
                      <strong>
                        {formatOrderAmount(
                          order,
                          order.paymentInfo?.amountPaid
                        )}
                      </strong>
                    </div>

                    {/* PHƯƠNG ÁN VÀ TỔNG ĐƠN */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '4px'
                      }}
                    >
                      <span
                        style={{
                          fontSize: '13px',
                          color: '#666'
                        }}
                      >
                        Phương án:{' '}
                        <strong style={{ color: '#333' }}>
                          {paymentLabel(order)}
                        </strong>
                      </span>

                      <div style={{ textAlign: 'right' }}>
                        <span
                          style={{
                            fontSize: '12px',
                            color: '#888',
                            marginRight: '6px'
                          }}
                        >
                          Tổng đơn hàng:
                        </span>

                        <span
                          style={{
                            fontSize: '15px',
                            fontWeight: '700',
                            color: '#111'
                          }}
                        >
                          {formatOrderAmount(order, order.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersModal;