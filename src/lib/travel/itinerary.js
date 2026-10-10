import { travelCatalog, tripTemplates } from '../../data/travel-catalog.js';

export function createTrip(interest, duration) {
 if (!Object.hasOwn(tripTemplates, interest)) throw new Error('Unknown travel interest.');
 if (!Number.isInteger(duration) || duration < 1 || duration > 3) throw new Error('Choose one to three days.');
 const days = tripTemplates[interest].slice(0, duration).map(id => travelCatalog.find(item => item.id === id));
 const driver = travelCatalog.find(item => item.id === 'driver');
 return {
  days,
  services: [...days, { ...driver, name: 'Mobil dan pengemudi (' + duration + ' hari)', price: driver.price * duration }],
 };
}
