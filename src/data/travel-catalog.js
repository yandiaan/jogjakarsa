export const travelCatalog = [
 {
  id: 'nglanggeran', name: 'Jelajah Nglanggeran', area: 'Gunungkidul', duration: '3 jam', category: 'Alam',
  price: 100000, pricing: 'per_person', description: 'Jalan kaki di kawasan gunung api purba dengan waktu istirahat.'
 },
 {
  id: 'pantai', name: 'Jeda di pantai selatan', area: 'Gunungkidul', duration: '3 jam', category: 'Alam',
  price: 75000, pricing: 'per_person', description: 'Menikmati pesisir dengan ritme santai. Lokasi disesuaikan kondisi perjalanan.'
 },
	{
		id: 'taman-sari',
		name: 'Jelajah Taman Sari',
		area: 'Kota Yogyakarta',
		duration: '2 jam',
		category: 'Budaya',
		price: 75000,
		pricing: 'per_person',
		description: 'Jelajah ruang air dan cerita kota bersama pemandu lokal.',
	},
	{
		id: 'kotagede',
		name: 'Jejak Kotagede',
		area: 'Kota Yogyakarta',
		duration: '3 jam',
		category: 'Budaya',
		price: 100000,
		pricing: 'per_person',
		description: 'Menyusuri kampung lama, arsitektur, dan pengrajin perak.',
	},
	{
		id: 'batik',
		name: 'Workshop batik',
		area: 'Bantul',
		duration: '2,5 jam',
		category: 'Kriya',
		price: 125000,
		pricing: 'per_person',
		description: 'Belajar dasar membatik bersama studio lokal.',
	},
	{
		id: 'prambanan',
		name: 'Sore di Prambanan',
		area: 'Sleman',
		duration: '3 jam',
		category: 'Budaya',
		price: 150000,
		pricing: 'per_person',
		description: 'Kunjungan candi dengan ritme santai dan waktu istirahat.',
	},
	{
		id: 'kuliner',
		name: 'Rasa malam Jogja',
		area: 'Kota Yogyakarta',
		duration: '3 jam',
		category: 'Kuliner',
		price: 175000,
		pricing: 'per_person',
		description: 'Rute kuliner skala kecil untuk mengenal rasa lokal.',
	},
	{
		id: 'driver',
		name: 'Mobil dan pengemudi',
		area: 'DIY',
		duration: '8 jam',
		category: 'Transportasi',
		price: 650000,
		pricing: 'per_vehicle',
		description: 'Kapasitas maksimal enam peserta untuk satu hari perjalanan.',
	},
];

export const tripTemplates = {
 budaya: ['taman-sari', 'prambanan', 'batik'],
 kuliner: ['kuliner', 'kotagede', 'taman-sari'],
 alam: ['nglanggeran', 'pantai', 'kuliner'],
};
