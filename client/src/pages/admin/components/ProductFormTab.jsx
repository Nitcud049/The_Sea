import React from 'react';

function ProductFormTab({ newProduct, setNewProduct, editingId, handleSaveProduct }) {
  
  // 1. Xử lý thay đổi đối tượng (Đồ Nữ, Đồ Nam, Unisex, Khác) & Tự động gán danh mục mặc định
  const handleGenderChange = (e) => { 
    const selectedGender = e.target.value; 
    let defaultCategory = 'bags'; 
    if (selectedGender === 'men') defaultCategory = 'bags'; 
    if (selectedGender === 'other') defaultCategory = 'perfume'; 
    setNewProduct({ ...newProduct, gender: selectedGender, category: defaultCategory }); 
  };

  // 2. Xử lý thêm một biến thể màu sắc mới
  const handleAddColor = () => {
    setNewProduct({ 
      ...newProduct, 
      colors: [...(newProduct.colors || []), { colorName: '', colorCode: '#ffffff', colorImage: '' }] 
    });
  };

  // 3. Cập nhật thông tin chi tiết từng biến thể màu
  const handleColorChange = (index, field, value) => { 
    const updatedColors = [...(newProduct.colors || [])]; 
    updatedColors[index][field] = value; 
    setNewProduct({ ...newProduct, colors: updatedColors }); 
  };

  // 4. Xóa một biến thể màu khỏi danh sách
  const handleRemoveColor = (index) => { 
    const updatedColors = [...(newProduct.colors || [])]; 
    updatedColors.splice(index, 1); 
    setNewProduct({ ...newProduct, colors: updatedColors }); 
  };

  // Kiểm tra mã HEX hợp lệ để tránh lỗi hiển thị ô màu HTML5
  const isValidHex = (hex) => /^#[0-9A-F]{6}$/i.test(hex);

  return (
    <div style={{ ...cardStyle, maxWidth: '850px', margin: '0 auto' }}>
      <h3 style={{ marginBottom: '25px', fontSize: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
        {editingId ? '✏️ Cập nhật thông tin sản phẩm' : '➕ Thêm sản phẩm mới'}
      </h3>

      {/* TÊN SẢN PHẨM */}
      <div style={inputGroupStyle}>
        <label style={labelStyle}>Tên sản phẩm *</label>
        <input 
          type="text" 
          value={newProduct.name || ''} 
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
          style={inputStyle} 
          placeholder="Nhập tên sản phẩm..."
        />
      </div>

      {/* GIÁ TIỀN (VNĐ / USD) & LINK HÌNH ẢNH MẶC ĐỊNH */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ ...inputGroupStyle, flex: 1 }}>
          <label style={labelStyle}>Giá tiền *</label>
          <div style={{ display: 'flex', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
            <input 
              type="number" 
              value={newProduct.price || ''} 
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
              style={{ ...inputStyle, border: 'none', borderRadius: 0, flex: 1 }}
              placeholder="0"
            />
            <select 
              value={newProduct.inputCurrency || 'VND'} 
              onChange={(e) => { 
                const newCurrency = e.target.value; 
                let currentPrice = Number(newProduct.price) || 0; 
                if (newCurrency === 'VND' && newProduct.inputCurrency === 'USD') { 
                  currentPrice = Math.round(currentPrice * 25400); 
                } else if (newCurrency === 'USD' && newProduct.inputCurrency === 'VND') { 
                  currentPrice = +(currentPrice / 25400).toFixed(2); 
                } 
                setNewProduct({ ...newProduct, inputCurrency: newCurrency, price: currentPrice }); 
              }} 
              style={{ padding: '0 15px', border: 'none', borderLeft: '1px solid #ccc', backgroundColor: '#f5f5f5', outline: 'none', cursor: 'pointer' }}
            >
              <option value="VND">VNĐ</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>

        <div style={{ ...inputGroupStyle, flex: 1 }}>
          <label style={labelStyle}>Link Hình ảnh Mặc định *</label>
          <input 
            type="text" 
            value={newProduct.image || ''} 
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} 
            style={inputStyle} 
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      {/* CÀI ĐẶT MÀU MẶC ĐỊNH (TÊN MÀU + BỘ CHỌN MÃ HEX) */}
      <div style={{ display: 'flex', gap: '20px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '6px', border: '1px dashed #ccc', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Tên màu mặc định *</label>
          <input 
            type="text" 
            value={newProduct.defaultColorName || ''} 
            onChange={(e) => setNewProduct({ ...newProduct, defaultColorName: e.target.value })} 
            style={inputStyle} 
            placeholder="VD: Đen, Trắng, Xanh lá..."
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Mã màu mặc định *</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input 
              type="text" 
              value={newProduct.defaultColorCode || ''} 
              onChange={(e) => setNewProduct({ ...newProduct, defaultColorCode: e.target.value })} 
              style={inputStyle} 
              placeholder="#000000"
            />
            <input 
              type="color" 
              value={isValidHex(newProduct.defaultColorCode) ? newProduct.defaultColorCode : '#ffffff'} 
              onChange={(e) => setNewProduct({ ...newProduct, defaultColorCode: e.target.value })} 
              style={colorPickerStyle} 
              title="Chọn màu trực tiếp"
            />
          </div>
        </div>
      </div>

      {/* ĐỐI TƯỢNG & PHÂN LOẠI ĐỘNG */}
      <div style={{ display: 'flex', gap: '20px', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', marginBottom: '25px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>1. Đối tượng *</label>
          <select value={newProduct.gender || 'women'} onChange={handleGenderChange} style={selectStyle}>
            <option value="women">Đồ Nữ</option>
            <option value="men">Đồ Nam</option>
            <option value="unisex">Unisex (Cả Nam & Nữ)</option>
            <option value="other">Mục Khác</option>
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label style={labelStyle}>2. Phân loại sản phẩm *</label>
          <select value={newProduct.category || ''} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} style={selectStyle}>
            {newProduct.gender === 'men' ? (
              <>
                <option value="bags">Túi</option>
                <option value="jackets">Áo khoác</option>
                <option value="leather_goods">Ví đa năng</option>
                <option value="clothes">Trang phục</option>
                <option value="accessories">Phụ kiện</option>
                <option value="travel">Du lịch</option>
                <option value="shoes">Giày</option>
              </>
            ) : newProduct.gender === 'women' ? (
              <>
                <option value="bags">Túi</option>
                <option value="leather_goods">Ví đa năng</option>
                <option value="travel">Du lịch</option>
                <option value="jewelry">Trang sức</option>
                <option value="clothes">Trang phục</option>
                <option value="shoes">Giày</option>
              </>
            ) : newProduct.gender === 'other' ? (
              <>
                <option value="perfume">Nước hoa</option>
                <option value="hats">Nón/Mũ</option>
                <option value="jackets">Áo khoác</option>
                <option value="accessories">Phụ kiện</option>
              </>
            ) : (
              <>
                <option value="bags">Túi</option>
                <option value="jackets">Áo khoác</option>
                <option value="leather_goods">Ví đa năng</option>
                <option value="clothes">Trang phục</option>
                <option value="accessories">Phụ kiện</option>
                <option value="jewelry">Trang sức</option>
                <option value="travel">Du lịch</option>
                <option value="shoes">Giày</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* CÀI ĐẶT CÁC MÀU SẮC BIẾN THỂ BỔ SUNG */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #d0d0d0', padding: '20px', borderRadius: '8px', marginBottom: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <div>
            <label style={{ ...labelStyle, marginBottom: 0 }}>🎨 Cài đặt Màu sắc Biến thể thêm</label>
          </div>
          <button 
            type="button" 
            onClick={handleAddColor} 
            style={{ padding: '8px 15px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            + Thêm màu biến thể
          </button>
        </div>

        {(newProduct.colors || []).map((c, index) => (
          <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '4px', border: '1px solid #eee' }}>
            <input 
              type="text" 
              placeholder="Tên màu (VD: Đỏ Rubby)..." 
              value={c.colorName || ''} 
              onChange={(e) => handleColorChange(index, 'colorName', e.target.value)} 
              style={{ ...inputStyle, flex: 1.2 }} 
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flex: 1.5 }}>
              <input 
                type="text" 
                placeholder="Mã HEX (#ff0000)" 
                value={c.colorCode || ''} 
                onChange={(e) => handleColorChange(index, 'colorCode', e.target.value)} 
                style={{ ...inputStyle, flex: 1 }} 
              />
              <input 
                type="color" 
                value={isValidHex(c.colorCode) ? c.colorCode : '#ffffff'} 
                onChange={(e) => handleColorChange(index, 'colorCode', e.target.value)} 
                style={colorPickerStyle} 
                title="Chọn màu"
              />
            </div>
            <input 
              type="text" 
              placeholder="Link ảnh biến thể màu..." 
              value={c.colorImage || ''} 
              onChange={(e) => handleColorChange(index, 'colorImage', e.target.value)} 
              style={{ ...inputStyle, flex: 2 }} 
            />
            <button 
              type="button" 
              onClick={() => handleRemoveColor(index)} 
              style={{ padding: '10px 12px', backgroundColor: '#ff4757', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              title="Xóa màu này"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* MÔ TẢ CHI TIẾT */}
      <div style={inputGroupStyle}>
        <label style={labelStyle}>Mô tả chi tiết</label>
        <textarea 
          value={newProduct.description || ''} 
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} 
          style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} 
          placeholder="Nhập chất liệu, kích thước, đặc điểm sản phẩm..."
        />
      </div>

      {/* CHECKBOX TRẠNG THÁI */}
      <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px' }}>
          <input 
            type="checkbox" 
            checked={!!newProduct.isNewProduct} 
            onChange={(e) => setNewProduct({ ...newProduct, isNewProduct: e.target.checked })} 
          />
          Gắn nhãn "Sản phẩm mới"
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px' }}>
          <input 
            type="checkbox" 
            checked={!!newProduct.isSale} 
            onChange={(e) => setNewProduct({ ...newProduct, isSale: e.target.checked })} 
          />
          Đang giảm giá
        </label>
      </div>

      {/* NÚT LƯU SẢN PHẨM */}
      <button 
        onClick={handleSaveProduct} 
        style={{ width: '100%', padding: '16px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
      >
        {editingId ? '💾 Lưu Cập Nhật' : '➕ Tạo Sản Phẩm Mới'}
      </button>
    </div>
  );
}

// Inline Styles chuyên biệt cho Form
const cardStyle = { backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', border: '1px solid #eaeaea' };
const inputGroupStyle = { marginBottom: '20px' };
const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold', color: '#555' };
const inputStyle = { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none', boxSizing: 'border-box', backgroundColor: '#fff', fontSize: '14px' };
const selectStyle = { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#fff', cursor: 'pointer', outline: 'none', fontSize: '14px' };
const colorPickerStyle = { width: '42px', height: '42px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', padding: 0, flexShrink: 0 };

export default ProductFormTab;