import { CalendarDays, Check, ChevronRight, MapPin, Users } from 'lucide-react';
import { useMemo, useState } from 'react';

import { travelCatalog, tripTemplates } from '../../data/travel-catalog';
import { calculateQuote } from '../../lib/travel/pricing';

const travelStyles = [
	{ id: 'solo', label: 'Solo' },
	{ id: 'couple', label: 'Pasangan' },
	{ id: 'friends', label: 'Teman' },
	{ id: 'family', label: 'Keluarga' },
];

const interests = [
	{ id: 'budaya', label: 'Budaya' },
	{ id: 'kuliner', label: 'Kuliner' },
	{ id: 'alam', label: 'Alam' },
];

const formatRupiah = (amount: number) =>
	new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);

export default function TripPlanner() {
	const [travelStyle, setTravelStyle] = useState('couple');
	const [interest, setInterest] = useState('budaya');
	const [travellers, setTravellers] = useState(2);
	const [submitted, setSubmitted] = useState(false);

	const selectedItems = useMemo(() => {
		const ids = tripTemplates[interest as keyof typeof tripTemplates];
		return ids.map((id) => travelCatalog.find((item) => item.id === id)!).concat(travelCatalog.find((item) => item.id === 'driver')!);
	}, [interest]);

	const quote = useMemo(() => calculateQuote(selectedItems, travellers), [selectedItems, travellers]);
	const days = selectedItems.filter((item) => item.id !== 'driver').slice(0, 3);

	return (
		<section id="rencana" className="scroll-mt-10 bg-mist px-6 py-20 text-ink md:px-10 lg:px-16 lg:py-28">
			<div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,1.1fr)] lg:gap-20">
				<div>
					<p className="text-xs font-bold uppercase tracking-[0.22em] text-clay">Mulai dari kebutuhanmu</p>
					<h2 className="mt-4 max-w-xl font-display text-5xl leading-[0.9] sm:text-6xl">Susun perjalanan Jogja yang terasa pas.</h2>
					<p className="mt-6 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg">
						Pilih gambaran perjalananmu. Versi ini menyusun contoh rute dari katalog demonstrasi; tim Jogjakarsa memeriksa harga dan ketersediaan sebelum penawaran final.
					</p>

					<fieldset className="mt-10">
						<legend className="text-sm font-bold">Pergi dengan siapa?</legend>
						<div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
							{travelStyles.map((style) => (
								<button key={style.id} type="button" onClick={() => setTravelStyle(style.id)} aria-pressed={travelStyle === style.id} className={`rounded-lg border px-3 py-3 text-sm transition-colors ${travelStyle === style.id ? 'border-ink bg-ink text-mist' : 'border-ink/15 bg-transparent hover:border-ink/50'}`}>
									{style.label}
								</button>
							))}
						</div>
					</fieldset>

					<fieldset className="mt-7">
						<legend className="text-sm font-bold">Apa yang ingin kamu rasakan?</legend>
						<div className="mt-3 flex flex-wrap gap-2">
							{interests.map((item) => (
								<button key={item.id} type="button" onClick={() => setInterest(item.id)} aria-pressed={interest === item.id} className={`rounded-lg border px-4 py-2.5 text-sm transition-colors ${interest === item.id ? 'border-clay bg-clay text-mist' : 'border-ink/15 bg-transparent hover:border-ink/50'}`}>
									{item.label}
								</button>
							))}
						</div>
					</fieldset>

					<p className="mt-7 text-sm font-bold" id="travellers-label">Jumlah peserta</p>
					<div className="mt-3 flex w-fit items-center border border-ink/15" aria-labelledby="travellers-label">
						<button type="button" onClick={() => setTravellers((count) => Math.max(1, count - 1))} className="px-4 py-3 text-lg hover:bg-ink/5" aria-label="Kurangi peserta">−</button>
						<output className="min-w-12 text-center text-base font-bold" aria-live="polite" aria-label="Jumlah peserta">{travellers}</output>
						<button type="button" onClick={() => setTravellers((count) => Math.min(6, count + 1))} className="px-4 py-3 text-lg hover:bg-ink/5" aria-label="Tambah peserta">+</button>
					</div>
					<p className="mt-2 text-sm text-ink/55">Untuk grup lebih dari 6 orang, tim akan menyusun opsi kendaraan terpisah.</p>
				</div>

				<div className="border border-ink/15 bg-white p-5 sm:p-8">
					<div className="flex items-start justify-between gap-5">
						<div>
							<p className="text-xs font-bold uppercase tracking-[0.22em] text-clay">Draf perjalanan</p>
							<h3 className="mt-2 font-display text-3xl">3 hari untuk {travelStyles.find((style) => style.id === travelStyle)?.label.toLowerCase()}</h3>
						</div>
						<Users className="h-5 w-5 text-ink/45" aria-hidden="true" />
					</div>

					<ol className="mt-7 space-y-5">
						{days.map((item, index) => (
							<li key={item.id} className="border-l border-clay pl-4">
								<p className="text-xs font-bold uppercase tracking-[0.18em] text-clay">Hari {index + 1} · {item.area}</p>
								<p className="mt-1 font-display text-2xl">{item.name}</p>
								<p className="mt-1 text-sm leading-relaxed text-ink/62">{item.description}</p>
							</li>
						))}
					</ol>

					<div className="mt-7 border-t border-ink/10 pt-5">
						<div className="flex items-center justify-between text-sm text-ink/62"><span>Estimasi layanan</span><span>{formatRupiah(quote.subtotal)}</span></div>
						<div className="mt-2 flex items-center justify-between text-sm text-ink/62"><span>Biaya pengurusan</span><span>{formatRupiah(quote.serviceFee)}</span></div>
						<div className="mt-4 flex items-end justify-between gap-4"><span className="text-sm font-bold">Estimasi total</span><span className="font-display text-3xl">{formatRupiah(quote.total)}</span></div>
					</div>

					<button type="button" onClick={() => setSubmitted(true)} className="mt-7 flex w-full items-center justify-center gap-2 bg-ink px-5 py-4 text-sm font-bold text-mist transition-colors hover:bg-clay">
						{submitted ? <Check className="h-4 w-4" aria-hidden="true" /> : <ChevronRight className="h-4 w-4" aria-hidden="true" />}
						{submitted ? 'Contoh penawaran tersimpan' : 'Simpan contoh penawaran'}
					</button>
					{submitted && <p className="mt-3 text-sm text-ink/62" role="status">Contoh ini tersimpan di halamanmu. Pada layanan aktif, tim akan menghubungi untuk melengkapi tanggal dan konfirmasi ketersediaan.</p>}
					<p className="mt-4 flex gap-2 text-xs leading-relaxed text-ink/50"><CalendarDays className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />Harga dan aktivitas di atas merupakan data demonstrasi, bukan booking atau harga mitra yang dikonfirmasi.</p>
					<p className="mt-2 flex gap-2 text-xs leading-relaxed text-ink/50"><MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />Cakupan awal: Kota Jogja, Sleman, Bantul, Kulon Progo, dan Gunungkidul.</p>
				</div>
			</div>
		</section>
	);
}
