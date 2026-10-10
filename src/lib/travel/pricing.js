const SERVICE_FEE = 150000;

export function calculateQuote(items, travellers) {
	if (!Number.isInteger(travellers) || travellers < 1) {
		throw new Error('A quote needs at least one traveller.');
	}

	const quotedItems = items.map((item) => {
		const quantity = item.pricing === 'per_person' ? travellers : 1;
		return {
			id: item.id,
			name: item.name,
			quantity,
			subtotal: item.price * quantity,
		};
	});

	const subtotal = quotedItems.reduce((total, item) => total + item.subtotal, 0);

	return {
		items: quotedItems,
		subtotal,
		serviceFee: SERVICE_FEE,
		total: subtotal + SERVICE_FEE,
	};
}
