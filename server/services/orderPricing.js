const mongoose = require('mongoose');
const Product = require('../models/Product');
const {
    MONEY_VERSION,
    getRatesSnapshot,
    normalizeCurrency
} = require('../config/currency');

const PAYMENT_METHODS = new Set(['deposit', 'online']);

const isPositiveInteger = (value) => Number.isInteger(value) && value > 0;

const findSelectedColor = (product, item) => {
    const selectedColorId = item.selectedColorId ? String(item.selectedColorId) : '';
    const selectedColorName = item.selectedColor ? String(item.selectedColor) : '';
    const selectedColorCode = item.selectedColorCode ? String(item.selectedColorCode) : '';
    const colors = Array.isArray(product.colors) ? product.colors : [];

    if (!selectedColorId && !selectedColorName && !selectedColorCode) {
        if (product.defaultColorName || product.defaultColorCode) {
            return {
                name: product.defaultColorName || 'Mặc định',
                code: product.defaultColorCode || '',
                id: null,
                image: product.image
            };
        }
        if (colors.length === 1) {
            const color = colors[0];
            return { name: color.colorName || 'Mặc định', code: color.colorCode || '', id: color._id, image: color.colorImage || product.image };
        }
        return null;
    }

    const color = colors.find((candidate) => {
        const idMatches = selectedColorId && candidate._id && String(candidate._id) === selectedColorId;
        const nameMatches = selectedColorName && String(candidate.colorName || '') === selectedColorName;
        const codeMatches = selectedColorCode && String(candidate.colorCode || '') === selectedColorCode;
        return idMatches || (nameMatches && (!selectedColorCode || codeMatches));
    });

    if (color) {
        return { name: color.colorName || selectedColorName || 'Mặc định', code: color.colorCode || selectedColorCode, id: color._id, image: color.colorImage || product.image };
    }

    const isDefault = (!selectedColorId || selectedColorId === 'default')
        && (!selectedColorName || selectedColorName === product.defaultColorName || selectedColorName === 'Mặc định')
        && (!selectedColorCode || selectedColorCode === product.defaultColorCode);
    return isDefault && (product.defaultColorName || product.defaultColorCode)
        ? { name: product.defaultColorName || 'Mặc định', code: product.defaultColorCode || '', id: null, image: product.image }
        : null;
};

const buildOrderPricing = async ({ items, paymentMethod, displayCurrency, idempotencyKey }) => {
    if (!Array.isArray(items) || items.length === 0) {
        const error = new Error('Giỏ hàng không hợp lệ');
        error.statusCode = 400;
        throw error;
    }
    if (!PAYMENT_METHODS.has(paymentMethod)) {
        const error = new Error('Phương thức thanh toán không hợp lệ');
        error.statusCode = 400;
        throw error;
    }
    const normalizedCurrency = normalizeCurrency(displayCurrency);
    if (!normalizedCurrency) {
        const error = new Error('Tiền tệ hiển thị không được hỗ trợ');
        error.statusCode = 400;
        throw error;
    }

    const normalizedItems = [];
    let totalUSD = 0;
    for (const item of items) {
        const productId = item && (item._id || item.productId);
        const quantity = item && Number(item.quantity);
        if (!mongoose.Types.ObjectId.isValid(productId) || !isPositiveInteger(quantity)) {
            const error = new Error('Sản phẩm hoặc số lượng không hợp lệ');
            error.statusCode = 400;
            throw error;
        }
        const product = await Product.findById(productId);
        if (!product || !Number.isFinite(product.price) || product.price < 0) {
            const error = new Error('Sản phẩm không tồn tại hoặc giá không hợp lệ');
            error.statusCode = 400;
            throw error;
        }
        const selectedColor = findSelectedColor(product, item);
        if (!selectedColor) {
            const error = new Error(`Màu sản phẩm không hợp lệ: ${product.name}`);
            error.statusCode = 400;
            throw error;
        }

        totalUSD += product.price * quantity;
        normalizedItems.push({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: selectedColor.image,
            quantity,
            selectedColor: selectedColor.name,
            selectedColorCode: selectedColor.code,
            selectedColorId: selectedColor.id ? String(selectedColor.id) : null,
            cartItemKey: item.cartItemKey || `${product._id}-${selectedColor.id || selectedColor.name || 'default'}`
        });
    }

    const exchangeRates = getRatesSnapshot();
    const amountDue = paymentMethod === 'deposit' ? totalUSD * 0.25 : totalUSD;
    return {
        items: normalizedItems,
        total: totalUSD,
        amountDue,
        amountPaid: 0,
        currency: 'USD',
        moneyVersion: MONEY_VERSION,
        displayCurrency: normalizedCurrency,
        exchangeRates,
        qrAmountVND: Math.round(amountDue * exchangeRates.VND),
        paymentMethod: paymentMethod,
        paymentReference: idempotencyKey ? `THESEA-${String(idempotencyKey).slice(0, 12)}` : null
    };
};

module.exports = { buildOrderPricing, PAYMENT_METHODS };
