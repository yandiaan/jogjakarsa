import test from 'node:test';
import assert from 'node:assert/strict';
import { convertIdr, internationalServices } from '../../src/lib/travel/international.js';
import { createTrip } from '../../src/lib/travel/itinerary.js';
import { calculateQuote } from '../../src/lib/travel/pricing.js';

test('USD conversion preserves the canonical IDR amount and rounds to cents', () => {
 assert.equal(convertIdr(170000, 'USD'), 10);
 assert.equal(convertIdr(900000, 'USD'), 52.94);
 assert.equal(convertIdr(900000, 'IDR'), 900000);
 assert.throws(() => convertIdr(100, 'USD', 0), /rate/);
 assert.throws(() => convertIdr(100, 'EUR'), /currency/);
});

test('international ticket category changes ticket budgets, independently of currency', () => {
 const trip = createTrip('budaya', 2);
 const local = calculateQuote(internationalServices(trip.services, 2), 2);
 const foreign = calculateQuote(internationalServices(trip.services, 2, { visitor: 'international' }), 2);
 assert.equal(foreign.total - local.total, (500000 - 150000 + 125000 - 75000) * 2);
 assert.equal(trip.services.find(item => item.id === 'prambanan').price, 150000);
});

test('guide and driver supplements are per group/day and airport transfer is once per vehicle', () => {
 const trip = createTrip('alam', 3);
 const quote = calculateQuote(internationalServices(trip.services, 3, { guide: true, englishDriver: true, airport: true }), 6);
 assert.equal(quote.items.find(item => item.id === 'english-guide').subtotal, 1500000);
 assert.equal(quote.items.find(item => item.id === 'english-driver').subtotal, 450000);
 assert.equal(quote.items.find(item => item.id === 'airport-transfer').subtotal, 350000);
 assert.throws(() => internationalServices(trip.services, 3, { guide: 'yes' }), /option/);
});
