import { ArrowDownToLine, ArrowUpRight, Check, Clock, MapPin, Minus, Plus, RotateCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { createTrip } from '../../lib/travel/itinerary';
import { calculateQuote } from '../../lib/travel/pricing';

const styles = [{ id: 'solo', label: 'Solo' }, { id: 'couple', label: 'Pasangan' }, { id: 'friends', label: 'Teman' }, { id: 'family', label: 'Keluarga' }];
const interests = [{ id: 'budaya', label: 'Budaya & kriya' }, { id: 'kuliner', label: 'Kuliner & kota' }, { id: 'alam', label: 'Alam & santai' }];
const rupiah = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
const storageKey = 'jogjakarsa:trip:v1';

export default function TripPlanner() {
 const [style, setStyle] = useState('couple');
 const [interest, setInterest] = useState('budaya');
 const [travellers, setTravellers] = useState(2);
 const [duration, setDuration] = useState(3);
 const [message, setMessage] = useState('');
 const [hasSaved, setHasSaved] = useState(false);
 const trip = useMemo(() => createTrip(interest, duration), [interest, duration]);
 const quote = useMemo(() => calculateQuote(trip.services, travellers), [trip, travellers]);

 useEffect(() => {
  try { setHasSaved(Boolean(localStorage.getItem(storageKey))); } catch { /* Browser storage may be unavailable. */ }
  const chooseInterest = (event: Event) => {
   const value = (event as CustomEvent).detail;
   if (interests.some(item => item.id === value)) { setInterest(value); setMessage(''); }
  };
  window.addEventListener('jogjakarsa:interest', chooseInterest);
  return () => window.removeEventListener('jogjakarsa:interest', chooseInterest);
 }, []);
 const update = (action: () => void) => { action(); setMessage(''); };
 const save = () => {
  try {
   localStorage.setItem(storageKey, JSON.stringify({ style, interest, travellers, duration }));
   setHasSaved(true); setMessage('Draf tersimpan di browser ini. Kamu bisa memuatnya kembali, termasuk setelah refresh.');
  } catch { setMessage('Browser tidak mengizinkan penyimpanan. Kamu tetap bisa mengunduh draf perjalanan.'); }
 };
 const restore = () => {
  try {
   const data = JSON.parse(localStorage.getItem(storageKey) || 'null');
   if (!data || !styles.some(item => item.id === data.style) || !interests.some(item => item.id === data.interest) ||
    !Number.isInteger(data.travellers) || data.travellers < 1 || data.travellers > 6 || ![1, 2, 3].includes(data.duration)) throw new Error('Invalid saved draft');
   setStyle(data.style); setInterest(data.interest); setTravellers(data.travellers); setDuration(data.duration);
   setMessage('Draf perjalananmu sudah dimuat.');
  } catch { setMessage('Draf belum bisa dimuat. Susun dan simpan perjalanan baru.'); }
 };
 const download = () => {
  const text = ['JOGJAKARSA — DRAF PERJALANAN', 'Data demonstrasi. Bukan booking atau penawaran final.',
   duration + ' hari / ' + travellers + ' peserta / ' + styles.find(item => item.id === style)?.label,
   ...trip.days.map((day: { name: string; area: string }, i: number) => 'Hari ' + (i + 1) + ': ' + day.name + ' — ' + day.area),
   '', ...quote.items.map((item: { name: string; quantity: number; subtotal: number }) => item.name + ' × ' + item.quantity + ': ' + rupiah(item.subtotal)),
   'Biaya pengurusan: ' + rupiah(quote.serviceFee), 'Total estimasi: ' + rupiah(quote.total),
   '', 'Belum termasuk penginapan, transportasi menuju Jogja, dan pengeluaran di luar aktivitas. Harga dan ketersediaan perlu dikonfirmasi.'].join('\n');
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'jogjakarsa-draf-perjalanan.txt'; anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
 };
 return (
  <section id="rencana" className="jk-section jk-planner">
   <div className="jk-shell">
    <div className="jk-section-heading" data-reveal><p className="jk-kicker">Travel studio / coba langsung</p><h2>Rencana pertama,<br /><em>dimulai dari kamu.</em></h2><p>Pilih gambaran perjalananmu. Lihat rute dan biaya berubah saat kamu menyesuaikannya.</p></div>
    <div className="planner-workspace">
     <div className="planner-controls">
      <div className="planner-panel-heading"><span>Preferensi perjalanan</span><span className="jk-small-label">Katalog demo</span></div>
      <fieldset><legend>Pergi dengan siapa?</legend><div className="planner-options style-options">{styles.map(item => <button type="button" key={item.id} aria-pressed={style === item.id} onClick={() => update(() => { setStyle(item.id); if (item.id === 'solo') setTravellers(1); if (item.id === 'couple') setTravellers(2); })}>{item.label}</button>)}</div></fieldset>
      <fieldset><legend>Apa yang ingin kamu kenal?</legend><div className="planner-options">{interests.map(item => <button type="button" key={item.id} aria-pressed={interest === item.id} onClick={() => update(() => setInterest(item.id))}>{item.label}</button>)}</div></fieldset>
      <div className="planner-counts"><fieldset><legend>Durasi perjalanan</legend><div className="planner-options">{[1, 2, 3].map(day => <button type="button" key={day} aria-pressed={duration === day} onClick={() => update(() => setDuration(day))}>{day} hari</button>)}</div></fieldset><div><p className="planner-legend" id="participants-label">Jumlah peserta</p><div className="participant-counter" role="group" aria-labelledby="participants-label"><button type="button" disabled={travellers === 1} aria-label="Kurangi peserta" onClick={() => update(() => setTravellers(count => count - 1))}><Minus size={15} /></button><output aria-live="polite" aria-label="Jumlah peserta">{travellers}</output><button type="button" disabled={travellers === 6} aria-label="Tambah peserta" onClick={() => update(() => setTravellers(count => count + 1))}><Plus size={15} /></button></div></div></div>
      <div className="planner-explainer"><CompassMark /><p>Ini titik awal perjalananmu. Tanggal, aksesibilitas, kebutuhan anak, dan preferensi khusus dibahas pada tahap peninjauan.</p></div>
      {hasSaved && <button type="button" className="jk-text-link restore-button" onClick={restore}><RotateCcw size={14} aria-hidden="true" /> Muat draf tersimpan</button>}
     </div>
     <div className="planner-result">
      <div className="planner-panel-heading"><span>Draf itinerary</span><span className="jk-small-label">Estimasi demo</span></div>
      <div className="itinerary-title"><h3>{duration} hari, sesuai ritmemu.</h3><p>{styles.find(item => item.id === style)?.label} <span>·</span> {travellers} peserta <span>·</span> DIY</p></div>
      <ol className="itinerary-days">{trip.days.map((day: { id: string; name: string; area: string; duration: string; description: string }, index: number) => <li key={day.id}><span className="day-number">0{index + 1}</span><div><h4>{day.name}</h4><p>{day.description}</p><div className="itinerary-meta"><span><MapPin size={12} aria-hidden="true" />{day.area}</span><span><Clock size={12} aria-hidden="true" />{day.duration}</span></div></div></li>)}</ol>
      <details className="quote-breakdown"><summary>Lihat rincian estimasi <Plus size={14} aria-hidden="true" /></summary><div>{quote.items.map((item: { id: string; name: string; quantity: number; subtotal: number }) => <p key={item.id}><span>{item.name}{item.quantity > 1 ? ' × ' + item.quantity : ''}</span><span>{rupiah(item.subtotal)}</span></p>)}<p><span>Biaya pengurusan</span><span>{rupiah(quote.serviceFee)}</span></p></div></details>
      <div className="quote-total"><div><span>Estimasi perjalanan</span><small>Untuk {travellers} peserta · {duration} hari</small></div><strong key={quote.total}>{rupiah(quote.total)}</strong></div>
      <div className="planner-save-actions"><button className="jk-button" type="button" onClick={save}>Simpan draf <Check size={16} aria-hidden="true" /></button><button className="download-button" type="button" onClick={download} aria-label="Unduh draf perjalanan"><ArrowDownToLine size={18} /></button></div>
      {message && <p className="planner-message" role="status">{message}</p>}
      <p className="jk-note">Harga simulasi, belum dikonfirmasi mitra. Belum termasuk penginapan, transportasi ke Jogja, dan pengeluaran di luar aktivitas.</p>
     </div>
    </div>
   </div>
  </section>
 );
}
function CompassMark() { return <ArrowUpRight size={22} aria-hidden="true" />; }
