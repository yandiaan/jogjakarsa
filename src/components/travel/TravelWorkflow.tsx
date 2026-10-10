import { copy, type Language } from '../../lib/travel/locale';
import { ArrowRight, Check, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useTravelReady } from '../../lib/travel/useTravelReady';
import BrandMark from './BrandMark';

const steps = [
 { title: 'Ceritakan perjalananmu.', text: 'Pilih teman perjalanan, minat, jumlah peserta, dan durasi. Mulai dari kebutuhanmu sendiri.' },
 { title: 'Lihat rute yang masuk akal.', text: 'Katalog lokal menjadi dasar draf itinerary. Kamu bisa membandingkan pengalaman dan melihat estimasi biaya.' },
 { title: 'Sempurnakan bersama manusia.', text: 'Pada layanan aktif, tim lokal memeriksa rute, kebutuhan khusus, harga, dan ketersediaan sebelum penawaran final.' },
];

export default function TravelWorkflow({ language = 'id' }: { language?: Language }) {
 const t = (text: string) => copy(language, text);
 useTravelReady('cara-kerja');
 const [active, setActive] = useState(0);
 return (
  <section id="cara-kerja" className="jk-section workflow-section">
   <div className="jk-shell">
    <div className="jk-section-heading" data-reveal><p className="jk-kicker">{t("Dari ide menjadi perjalanan")}</p><h2>{t("Dari kebutuhanmu")}<br /><em>{t("ke rute dan rincian biaya.")}</em></h2></div>
    <div className="workflow-grid">
     <div className="workflow-steps" data-reveal>{steps.map((step, index) => <button key={t(step.title)} type="button" className={active === index ? 'workflow-step is-active' : 'workflow-step'} onClick={() => setActive(index)} aria-pressed={active === index}><span className="workflow-index">0{index + 1}</span><span><strong>{t(step.title)}</strong><span>{t(step.text)}</span></span><ArrowRight size={18} aria-hidden="true" /></button>)}</div>
     <div className="workflow-demo" data-reveal aria-live="polite">
      <div className="demo-toolbar"><BrandMark width={26} height={31} /><span>{t("Jogjakarsa / perjalanan custom")}</span><span>{t("Contoh alur")}</span></div>
      <div className="demo-stage" key={active}>
       {active === 0 && <><p className="demo-label">{t("Brief perjalanan")}</p><h3>{t("Jogja, tanpa terburu-buru.")}</h3><p className="demo-request">{t("“Kami berdua mau 3 hari di Jogja. Suka budaya, ingin mencoba batik, dan tetap punya waktu santai.”")}</p><div className="demo-chips"><span>{t("Pasangan")}</span><span>{t("3 hari")}</span><span>{t("Budaya")}</span></div><p className="demo-footnote"><Check size={15} aria-hidden="true" />{t("Preferensi menjadi dasar rute")}</p></>}
       {active === 1 && <><p className="demo-label">{t("Draf dari katalog lokal")}</p><h3>{t("Ada cerita di setiap hari.")}</h3><ol className="demo-route">{['Taman Sari · Kota Yogyakarta', 'Prambanan · Sleman', 'Workshop batik · Bantul'].map((place, index) => <li key={place}><span>0{index + 1}</span><MapPin size={15} aria-hidden="true" /><span>{t(place)}</span><Check size={14} aria-hidden="true" /></li>)}</ol><p className="demo-footnote">{t("Rute dan harga memakai data demonstrasi.")}</p></>}
       {active === 2 && <><p className="demo-label">{t("Tahap layanan yang direncanakan")}</p><h3>{t("Keputusan akhir tetap manusia.")}</h3><div className="review-sheet">{['Periksa waktu dan jarak', 'Konfirmasi harga dan ketersediaan', 'Sesuaikan kebutuhan perjalanan'].map(item => <p key={item}><span className="review-checkbox" /><span>{t(item)}</span><span>{t("Perlu ditinjau")}</span></p>)}</div><p className="demo-footnote">{t("Belum terhubung ke tim atau mitra. Tidak ada booking otomatis.")}</p></>}
      </div>
     </div>
    </div>
   </div>
  </section>
 );
}
