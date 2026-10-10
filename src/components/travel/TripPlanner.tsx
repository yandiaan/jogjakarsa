import { ArrowDownToLine, Check, Clock, MapPin, Minus, Plus, RotateCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { createTrip } from '../../lib/travel/itinerary';
import { calculateQuote } from '../../lib/travel/pricing';
import { exchangeRate, formatMoney, internationalServices } from '../../lib/travel/international';
import { useTravelReady } from '../../lib/travel/useTravelReady';
import { useCurrency } from '../../lib/travel/useCurrency';
import type { Language } from '../../lib/travel/locale';

const styles = ['solo', 'couple', 'friends', 'family'];
const interests = ['budaya', 'kuliner', 'alam'];
const styleNames: Record<string, [string, string]> = { solo: ['Solo', 'Solo'], couple: ['Pasangan', 'Couple'], friends: ['Teman', 'Friends'], family: ['Keluarga', 'Family'] };
const interestNames: Record<string, [string, string]> = { budaya: ['Budaya & kriya', 'Culture & crafts'], kuliner: ['Kuliner & kota', 'Food & city walks'], alam: ['Alam & santai', 'Nature & slow travel'] };
const catalogueEn: Record<string, { name: string; description: string; duration: string }> = {
 'taman-sari': { name: 'Taman Sari walk', description: 'Explore the water palace and its stories with a local guide.', duration: '2 hours' },
 kotagede: { name: 'Kotagede heritage walk', description: 'Discover old neighbourhoods, architecture, and silver crafts.', duration: '3 hours' },
 batik: { name: 'Batik workshop', description: 'Learn the basics of batik at a local studio.', duration: '2.5 hours' },
 prambanan: { name: 'Afternoon at Prambanan', description: 'A temple visit with a relaxed pace and time to rest.', duration: '3 hours' },
 kuliner: { name: 'Jogja evening food tour', description: 'A small-group food route exploring local flavours.', duration: '3 hours' },
 nglanggeran: { name: 'Nglanggeran nature walk', description: 'A walk through the ancient volcanic landscape, with rest stops.', duration: '3 hours' },
 pantai: { name: 'Southern coast escape', description: 'A relaxed visit to the coast. The location depends on travel conditions.', duration: '3 hours' },
};
const storageKey = 'jogjakarsa:trip:v1';

export default function TripPlanner({ language = 'id' }: { language?: Language }) {
 useTravelReady('rencana');
 const en = language === 'en';
 const t = (id: string, english: string) => en ? english : id;
 const [style, setStyle] = useState('couple');
 const [interest, setInterest] = useState('budaya');
 const [travellers, setTravellers] = useState(2);
 const [duration, setDuration] = useState(3);
 const [visitor, setVisitor] = useState<'domestic' | 'international'>('domestic');
 const [guide, setGuide] = useState(false);
 const [englishDriver, setEnglishDriver] = useState(false);
 const [airport, setAirport] = useState(false);
 const [message, setMessage] = useState('');
 const [hasSaved, setHasSaved] = useState(false);
 const { currency, chooseCurrency } = useCurrency(language);
 const trip = useMemo(() => createTrip(interest, duration), [interest, duration]);
 const services = useMemo(() => internationalServices(trip.services, duration, { visitor, guide, englishDriver, airport }), [trip, duration, visitor, guide, englishDriver, airport]);
 const quote = useMemo(() => calculateQuote(services, travellers), [services, travellers]);
 const money = (amount: number) => formatMoney(amount, currency, language);
 const styleLabel = (value: string) => styleNames[value][en ? 1 : 0];
 const interestLabel = (value: string) => interestNames[value][en ? 1 : 0];
 const serviceName = (id: string, fallback: string) => {
  if (!en) return fallback;
  if (id === 'driver') return 'Private car and driver (' + duration + ' days)';
  if (id === 'english-guide') return 'English-speaking guide (' + duration + ' days)';
  if (id === 'english-driver') return 'English-speaking driver request (' + duration + ' days)';
  if (id === 'airport-transfer') return 'One-way YIA airport transfer';
  return catalogueEn[id]?.name ?? fallback;
 };
 useEffect(() => {
  try { setHasSaved(Boolean(localStorage.getItem(storageKey))); } catch {}
  const chooseInterest = (event: Event) => {
   const value = (event as CustomEvent).detail;
   if (interests.includes(value)) { setInterest(value); setMessage(''); }
  };
  window.addEventListener('jogjakarsa:interest', chooseInterest);
  return () => window.removeEventListener('jogjakarsa:interest', chooseInterest);
 }, []);
 const update = (action: () => void) => { action(); setMessage(''); };
 const save = () => {
  try {
   localStorage.setItem(storageKey, JSON.stringify({ style, interest, travellers, duration, visitor, guide, englishDriver, airport }));
   setHasSaved(true); setMessage(t('Draf dan kebutuhan layanan tersimpan di browser ini.', 'Your draft and service preferences are saved in this browser.'));
  } catch { setMessage(t('Penyimpanan tidak tersedia. Kamu tetap bisa mengunduh draf.', 'Browser storage is unavailable. You can still download your draft.')); }
 };
 const restore = () => {
  try {
   const data = JSON.parse(localStorage.getItem(storageKey) || 'null');
   if (!data || !styles.includes(data.style) || !interests.includes(data.interest) ||
    !Number.isInteger(data.travellers) || data.travellers < 1 || data.travellers > 6 || ![1, 2, 3].includes(data.duration) ||
    (data.visitor !== undefined && !['domestic', 'international'].includes(data.visitor)) ||
    ['guide', 'englishDriver', 'airport'].some(key => data[key] !== undefined && typeof data[key] !== 'boolean')) throw new Error('Invalid draft');
   setStyle(data.style); setInterest(data.interest); setTravellers(data.travellers); setDuration(data.duration);
   setVisitor(data.visitor ?? 'domestic'); setGuide(data.guide ?? false); setEnglishDriver(data.englishDriver ?? false); setAirport(data.airport ?? false);
   setMessage(t('Draf perjalananmu sudah dimuat.', 'Your saved draft has been restored.'));
  } catch { setMessage(t('Draf tidak dapat dimuat. Susun dan simpan rencana baru.', 'The draft could not be restored. Create and save a new plan.')); }
 };
 const rateNote = t('Kurs demo manual: USD 1 = IDR ', 'Manual demo rate: USD 1 = IDR ') + exchangeRate.idrPerUsd.toLocaleString('en-US') + ' · ' + exchangeRate.updatedAt;
 const exclusions = t('Harga simulasi, belum dikonfirmasi mitra. Belum termasuk penginapan, transportasi menuju Jogja, serta pengeluaran di luar aktivitas. Layanan berbahasa Inggris dan transfer perlu dikonfirmasi.', 'Demo prices, not confirmed by suppliers. Accommodation, travel to Yogyakarta, and expenses outside listed activities are excluded. English-speaking services and transfers require confirmation.');
 const download = () => {
  const text = ['JOGJAKARSA / ' + t('DRAF PERJALANAN', 'TRIP DRAFT'), t('Demonstrasi. Bukan booking atau penawaran final.', 'Demonstration only. Not a booking or final quote.'),
   duration + t(' hari / ', ' days / ') + travellers + t(' peserta / ', ' travellers / ') + styleLabel(style),
   t('Kategori tiket: ', 'Ticket category: ') + (visitor === 'international' ? t('Wisatawan internasional', 'International visitor') : t('Domestik', 'Domestic visitor')),
   ...trip.days.map((day: { id: string; name: string; area: string }, i: number) => t('Hari ', 'Day ') + (i + 1) + ': ' + serviceName(day.id, day.name) + ' / ' + (en && day.area === 'Kota Yogyakarta' ? 'Yogyakarta City' : day.area)),
   '', ...quote.items.map((item: { id: string; name: string; quantity: number; subtotal: number }) => serviceName(item.id, item.name) + ' × ' + item.quantity + ': ' + money(item.subtotal)),
   t('Biaya pengurusan: ', 'Coordination fee: ') + money(quote.serviceFee), t('Total estimasi: ', 'Estimated total: ') + money(quote.total),
   'IDR ' + quote.total.toLocaleString('en-US') + t(' / nilai dasar', ' / base amount'), rateNote,
   t('USD hanya konversi perkiraan; pembulatan tiap baris dapat berbeda dari total. Harga final dan kurs pembayaran perlu dikonfirmasi.', 'USD is an approximate display conversion; individually rounded lines may differ from the total. Final prices and payment rates require confirmation.'),
   '', exclusions].join('\n');
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'jogjakarsa-trip-draft.txt'; anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
 };
 return (
  <section id="rencana" className="jk-section jk-planner"><div className="jk-shell">
   <div className="jk-section-heading" data-reveal><p className="jk-kicker">{t('Demo planner perjalanan Jogja', 'Yogyakarta trip planning demo')}</p><h2>{t('Pilih gaya perjalanan.', 'Choose your travel style.')}<br /><em>{t('Dapatkan rute dan estimasi.', 'Get an itinerary and estimate.')}</em></h2><p>{t('Trip 1–3 hari untuk 1–6 peserta. Pilih aktivitas, kategori tiket, dan bantuan berbahasa Inggris, lalu simpan atau unduh rencananya.', 'Plan 1–3 days for 1–6 travellers. Choose experiences, your ticket category, and English-speaking support, then save or download your draft.')}</p></div>
   <div className="planner-workspace">
    <div className="planner-controls">
     <div className="planner-panel-heading"><span>{t('Preferensi perjalanan', 'Trip preferences')}</span><span className="jk-small-label">{t('Katalog demo', 'Demo catalogue')}</span></div>
     <fieldset><legend>{t('Pergi dengan siapa?', 'Who is travelling?')}</legend><div className="planner-options style-options">{styles.map(id => <button type="button" key={id} aria-pressed={style === id} onClick={() => update(() => { setStyle(id); if (id === 'solo') setTravellers(1); if (id === 'couple') setTravellers(2); })}>{styleLabel(id)}</button>)}</div></fieldset>
     <fieldset><legend>{t('Apa yang ingin kamu kenal?', 'What interests you?')}</legend><div className="planner-options">{interests.map(id => <button type="button" key={id} aria-pressed={interest === id} onClick={() => update(() => setInterest(id))}>{interestLabel(id)}</button>)}</div></fieldset>
     <div className="planner-counts"><fieldset><legend>{t('Durasi perjalanan', 'Trip duration')}</legend><div className="planner-options">{[1, 2, 3].map(day => <button type="button" key={day} aria-pressed={duration === day} onClick={() => update(() => setDuration(day))}>{day} {t('hari', day === 1 ? 'day' : 'days')}</button>)}</div></fieldset><div><p className="planner-legend" id="participants-label">{t('Jumlah peserta', 'Party size')}</p><div className="participant-counter" role="group" aria-labelledby="participants-label"><button type="button" disabled={travellers === 1} aria-label={t('Kurangi peserta', 'Remove a traveller')} onClick={() => update(() => setTravellers(count => count - 1))}><Minus size={15} /></button><output aria-live="polite" aria-label={t('Jumlah peserta', 'Party size')}>{travellers}</output><button type="button" disabled={travellers === 6} aria-label={t('Tambah peserta', 'Add a traveller')} onClick={() => update(() => setTravellers(count => count + 1))}><Plus size={15} /></button></div></div></div>
     <fieldset><legend>{t('Kategori tiket wisatawan', 'Visitor ticket category')}</legend><div className="planner-options">{(['domestic', 'international'] as const).map(value => <button type="button" key={value} aria-pressed={visitor === value} onClick={() => update(() => setVisitor(value))}>{value === 'domestic' ? t('Domestik', 'Domestic visitor') : t('Internasional', 'International visitor')}</button>)}</div><p className="jk-note intl-category-note">{t('Pilih sesuai ketentuan tiket, bukan bahasa atau mata uang. Tarif wisatawan asing pada demo belum diverifikasi.', 'Choose according to ticket eligibility, independently of language or currency. Foreign-visitor demo budgets have not been verified.')}</p></fieldset>
     <fieldset className="intl-support"><legend>{t('Bantuan selama di Jogja', 'Support during your trip')}</legend>
      {[{ id: 'english-guide', value: guide, set: setGuide, label: t('Guide berbahasa Inggris', 'English-speaking guide'), detail: money(500000) + t(' / grup / hari · demo', ' / group / day · demo') },
       { id: 'english-driver', value: englishDriver, set: setEnglishDriver, label: t('Minta pengemudi berbahasa Inggris', 'Request an English-speaking driver'), detail: money(150000) + t(' tambahan / mobil / hari · demo', ' supplement / car / day · demo') },
       { id: 'airport-transfer', value: airport, set: setAirport, label: t('Transfer bandara YIA satu arah', 'One-way YIA airport transfer'), detail: money(350000) + t(' / mobil, 1–6 peserta · demo', ' / car, 1–6 travellers · demo') }].map(option => <label key={option.id}><input type="checkbox" checked={option.value} onChange={event => update(() => option.set(event.target.checked))} /><span>{option.label}<small>{option.detail}</small></span></label>)}
      <p className="jk-note">{t('Permintaan layanan belum mengonfirmasi staf, jadwal, atau kendaraan. Guide dan pengemudi adalah peran berbeda.', 'Selecting a service does not confirm staff, schedules, or vehicles. A guide and a driver perform different roles.')}</p>
     </fieldset>
     <div className="planner-explainer"><MapPin size={20} aria-hidden="true" /><p>{t('Tanggal, aksesibilitas, kebutuhan anak, dan preferensi makan perlu dibahas dengan tim sebelum penawaran final.', 'Travel dates, accessibility, children’s needs, and dietary preferences must be reviewed with a person before the final quote.')}</p></div>
     {hasSaved && <button type="button" className="jk-text-link restore-button" onClick={restore}><RotateCcw size={14} aria-hidden="true" />{t('Muat draf tersimpan', 'Restore saved draft')}</button>}
    </div>
    <div className="planner-result">
     <div className="planner-panel-heading"><span>{t('Draf itinerary', 'Draft itinerary')}</span><label className="planner-currency"><span className="sr-only">{t('Mata uang estimasi', 'Estimate currency')}</span><select value={currency} onChange={event => chooseCurrency(event.target.value as 'IDR' | 'USD')}><option value="IDR">IDR</option><option value="USD">USD</option></select></label></div>
     <div className="itinerary-title"><h3>{duration} {t('hari, sesuai ritmemu.', duration === 1 ? 'day, at your pace.' : 'days, at your pace.')}</h3><p>{styleLabel(style)} · {travellers} {t('peserta', 'travellers')} · Yogyakarta</p></div>
     <ol className="itinerary-days">{trip.days.map((day: { id: string; name: string; area: string; duration: string; description: string }, index: number) => <li key={day.id}><span className="day-number">0{index + 1}</span><div><h4>{serviceName(day.id, day.name)}</h4><p>{en ? catalogueEn[day.id].description : day.description}</p><div className="itinerary-meta"><span><MapPin size={12} aria-hidden="true" />{en && day.area === 'Kota Yogyakarta' ? 'Yogyakarta City' : day.area}</span><span><Clock size={12} aria-hidden="true" />{en ? catalogueEn[day.id].duration : day.duration}</span></div></div></li>)}</ol>
     <details className="quote-breakdown"><summary>{t('Lihat rincian estimasi', 'View itemised estimate')}<Plus size={14} aria-hidden="true" /></summary><div>{quote.items.map((item: { id: string; name: string; quantity: number; subtotal: number }) => <p key={item.id}><span>{serviceName(item.id, item.name)}{item.quantity > 1 ? ' × ' + item.quantity : ''}</span><span>{money(item.subtotal)}</span></p>)}<p><span>{t('Biaya pengurusan', 'Coordination fee')}</span><span>{money(quote.serviceFee)}</span></p></div></details>
     <div className="quote-total"><div><span>{t('Estimasi perjalanan', 'Estimated trip total')}</span><small>{travellers} {t('peserta', 'travellers')} · {duration} {t('hari', 'days')}</small></div><strong key={quote.total + currency}>{money(quote.total)}</strong></div>
     <div className="intl-rate-note"><p>{rateNote}</p><p>{t('USD adalah konversi tampilan perkiraan. Harga dasar dalam IDR; kurs pembayaran final perlu dikonfirmasi.', 'USD is an approximate display conversion. Base prices are in IDR; the final payment rate must be confirmed.')}</p>{currency === 'USD' && <p>{t('Total dasar: ', 'Base total: ')}{formatMoney(quote.total, 'IDR', language)}</p>}</div>
     {currency === 'USD' && <p className="jk-note intl-rounding-note">{t('Pembulatan tiap baris USD dapat berbeda beberapa sen dari total yang dihitung dari nilai dasar IDR.', 'Individually rounded USD lines may differ by a few cents from the total converted from the IDR base amount.')}</p>}
     <div className="planner-save-actions"><button className="jk-button" type="button" onClick={save}>{t('Simpan draf', 'Save draft')}<Check size={16} aria-hidden="true" /></button><button className="download-button" type="button" onClick={download} aria-label={t('Unduh draf perjalanan', 'Download trip draft')}><ArrowDownToLine size={18} /></button></div>
     {message && <p className="planner-message" role="status">{message}</p>}
     <p className="jk-note">{exclusions}</p>
    </div>
   </div>
  </div></section>
 );
}
