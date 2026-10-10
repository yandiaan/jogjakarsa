// A manually maintained demonstration rate, not a live or settlement exchange rate.
export const exchangeRate = { idrPerUsd: 17000, updatedAt: '2026-10-10', kind: 'demo' };

export function convertIdr(amount, currency = 'IDR', rate = exchangeRate.idrPerUsd) {
 if (!Number.isFinite(amount) || amount < 0) throw new Error('Invalid amount.');
 if (!['IDR', 'USD'].includes(currency)) throw new Error('Unsupported currency.');
 if (!Number.isFinite(rate) || rate <= 0) throw new Error('Invalid exchange rate.');
 return currency === 'USD' ? Math.round(amount / rate * 100) / 100 : amount;
}

export function formatMoney(amount, currency = 'IDR', language = 'id') {
 return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'id-ID', {
  style: 'currency', currency, minimumFractionDigits: currency === 'USD' ? 2 : 0,
  maximumFractionDigits: currency === 'USD' ? 2 : 0,
 }).format(convertIdr(amount, currency));
}

export function internationalServices(services, duration, options = {}) {
 if (!Number.isInteger(duration) || duration < 1 || duration > 3) throw new Error('Invalid duration.');
 const { visitor = 'domestic', guide = false, englishDriver = false, airport = false } = options;
 if (!['domestic', 'international'].includes(visitor)) throw new Error('Invalid visitor category.');
 for (const value of [guide, englishDriver, airport]) {
  if (typeof value !== 'boolean') throw new Error('Invalid service option.');
 }
 // Sample foreign-visitor ticket budgets require supplier confirmation before sale.
 const foreignBudgets = { 'prambanan': 500000, 'taman-sari': 125000 };
 const items = services.map(item => ({ ...item,
  price: visitor === 'international' && foreignBudgets[item.id] ? foreignBudgets[item.id] : item.price,
 }));
 if (guide) items.push({ id: 'english-guide', name: 'Guide berbahasa Inggris', price: 500000 * duration, pricing: 'per_group' });
 if (englishDriver) items.push({ id: 'english-driver', name: 'Permintaan pengemudi berbahasa Inggris', price: 150000 * duration, pricing: 'per_vehicle' });
 if (airport) items.push({ id: 'airport-transfer', name: 'Transfer YIA satu arah', price: 350000, pricing: 'per_vehicle' });
 return items;
}
