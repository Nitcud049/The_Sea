const EXCHANGE_RATES = Object.freeze({
    USD: 1,
    VND: 25400,
    EUR: 0.92,
    JPY: 151
});

const SUPPORTED_CURRENCIES = Object.freeze(Object.keys(EXCHANGE_RATES));
const MONEY_VERSION = 'usd-base-v1';

const getRatesSnapshot = () => ({ ...EXCHANGE_RATES });

const normalizeCurrency = (currency) => {
    const normalized = String(currency || 'USD').toUpperCase();
    return SUPPORTED_CURRENCIES.includes(normalized) ? normalized : null;
};

const convertFromUSD = (amountUSD, currency) => {
    const normalized = normalizeCurrency(currency);
    if (!normalized) throw new Error('Unsupported display currency');
    return Number(amountUSD) * EXCHANGE_RATES[normalized];
};

const formatCurrency = (amount, currency) => {
    const normalized = normalizeCurrency(currency);
    if (!normalized) throw new Error('Unsupported display currency');
    const locale = normalized === 'VND' ? 'vi-VN' : normalized === 'EUR' ? 'de-DE' : normalized === 'JPY' ? 'ja-JP' : 'en-US';
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: normalized
    }).format(Number(amount) || 0);
};

module.exports = {
    EXCHANGE_RATES,
    SUPPORTED_CURRENCIES,
    MONEY_VERSION,
    getRatesSnapshot,
    normalizeCurrency,
    convertFromUSD,
    formatCurrency
};
