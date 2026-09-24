const test = require('node:test');
const assert = require('node:assert/strict');
const { EXCHANGE_RATES, convertFromUSD, formatCurrency } = require('../config/currency');
const { calculatePaymentDetails } = require('../services/orderEmail');

test('uses one backend rate table for display conversions', () => {
    assert.equal(convertFromUSD(100, 'USD'), 100);
    assert.equal(convertFromUSD(100, 'VND'), 2540000);
    assert.equal(convertFromUSD(100, 'EUR'), 92);
    assert.equal(convertFromUSD(100, 'JPY'), 15100);
    assert.equal(EXCHANGE_RATES.VND, 25400);
});

test('rounds only QR VND at the payment boundary', () => {
    const amountDueUSD = 100 * 0.25;
    assert.equal(Math.round(amountDueUSD * EXCHANGE_RATES.VND), 635000);
    assert.equal(Math.round(100 * EXCHANGE_RATES.VND), 2540000);
    assert.equal(1000000 * EXCHANGE_RATES.USD, 1000000);
});

test('does not infer currency from the size of a USD value', () => {
    assert.equal(formatCurrency(convertFromUSD(100001, 'USD'), 'USD'), '$100,001.00');
});

test('new orders start with zero received payment', () => {
    const details = calculatePaymentDetails({
        currency: 'USD',
        moneyVersion: 'usd-base-v1',
        total: 100,
        paymentInfo: { method: 'deposit', amountDue: 25, amountPaid: 0 },
        displayCurrency: 'VND',
        exchangeRates: EXCHANGE_RATES,
        items: [{ price: 100, quantity: 1 }]
    });
    assert.equal(details.valid, true);
    assert.equal(details.amountDue, 25);
    assert.equal(details.paidAmount, 0);
    assert.equal(details.remainingAmount, 100);
});

test('calculates confirmed received payment as USD without clamping', () => {
    const details = calculatePaymentDetails({
        currency: 'USD',
        moneyVersion: 'usd-base-v1',
        total: 100,
        paymentInfo: { method: 'deposit', amountDue: 25, amountPaid: 25 },
        displayCurrency: 'EUR',
        exchangeRates: EXCHANGE_RATES,
        items: [{ price: 100, quantity: 1 }]
    });
    assert.equal(details.valid, true);
    assert.equal(details.paidAmount / details.total * 100, 25);
    assert.equal(details.remainingAmount, 75);
});

test('marks legacy or incomplete money data for review', () => {
    const details = calculatePaymentDetails({ total: 2540000, paymentInfo: { method: 'deposit' } });
    assert.equal(details.valid, false);
});
