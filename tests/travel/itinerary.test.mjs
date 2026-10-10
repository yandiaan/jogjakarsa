import test from 'node:test';
import assert from 'node:assert/strict';
import { createTrip } from '../../src/lib/travel/itinerary.js';
import { calculateQuote } from '../../src/lib/travel/pricing.js';

test('quotes exactly the activities shown and transport for all selected days', () => {
 const trip = createTrip('budaya', 3);
 assert.equal(trip.days.length, 3);
 assert.deepEqual(trip.services.slice(0, -1).map(item => item.id), trip.days.map(item => item.id));
 assert.equal(trip.services.at(-1).price, 1950000);
 assert.equal(calculateQuote(trip.services, 2).total, 2800000);
});

test('short nature trip uses a nature activity and a single day of transport', () => {
 const trip = createTrip('alam', 1);
 assert.equal(trip.days[0].category, 'Alam');
 assert.equal(trip.services.at(-1).price, 650000);
});

test('rejects unknown interests and unsupported durations', () => {
 assert.throws(() => createTrip('unknown', 1), /Unknown/);
 for (const duration of [0, 4, 1.5]) assert.throws(() => createTrip('budaya', duration), /one to three/);
});
