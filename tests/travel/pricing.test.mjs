import test from 'node:test';
import assert from 'node:assert/strict';

import { calculateQuote } from '../../src/lib/travel/pricing.js';

test('calculates person, vehicle, and group fees without multiplying fixed services', () => {
	const quote = calculateQuote(
		[
			{ id: 'batik', name: 'Workshop batik', price: 125000, pricing: 'per_person' },
			{ id: 'driver', name: 'Mobil dan pengemudi', price: 650000, pricing: 'per_vehicle' },
			{ id: 'guide', name: 'Pemandu kawasan', price: 300000, pricing: 'per_group' },
		],
		4,
	);

	assert.deepEqual(quote, {
		items: [
			{ id: 'batik', name: 'Workshop batik', quantity: 4, subtotal: 500000 },
			{ id: 'driver', name: 'Mobil dan pengemudi', quantity: 1, subtotal: 650000 },
			{ id: 'guide', name: 'Pemandu kawasan', quantity: 1, subtotal: 300000 },
		],
		subtotal: 1450000,
		serviceFee: 150000,
		total: 1600000,
	});
});

test('rejects zero travellers because a per-person quote would be misleading', () => {
	assert.throws(
		() => calculateQuote([{ id: 'batik', name: 'Workshop batik', price: 125000, pricing: 'per_person' }], 0),
		/at least one traveller/i,
	);
});
