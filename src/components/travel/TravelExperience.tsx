import { copy, type Language } from '../../lib/travel/locale';
import { ArrowUpRight, Check, Compass, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useTravelReady } from '../../lib/travel/useTravelReady';

const experiences = [
 { title: 'Candi, kota lama, dan batik.', category: 'Budaya & kriya', description: 'Menelusuri candi, kampung lama, dan proses di balik selembar batik. Beri ruang untuk mendengar, bukan sekadar singgah.', stops: ['Taman Sari', 'Prambanan', 'Workshop batik'], interest: 'budaya' },
 { title: 'Kuliner malam dan jelajah kota.', category: 'Kuliner & kota', description: 'Dari rasa malam di kota hingga gang-gang bersejarah. Perjalanan pendek dengan waktu yang cukup untuk menikmati.', stops: ['Kuliner malam', 'Kotagede', 'Taman Sari'], interest: 'kuliner' },
 { title: 'Bukit dan pantai selatan.', category: 'Alam & perjalanan pelan', description: 'Bukit, pesisir, lalu jeda di kota. Susun ritme perjalanan dengan mempertimbangkan jarak dan waktu istirahat.', stops: ['Nglanggeran', 'Pantai selatan', 'Kuliner malam'], interest: 'alam' },
];

export default function TravelExperience({ language = 'id' }: { language?: Language }) {
 const t = (text: string) => copy(language, text);
 useTravelReady('pengalaman');
 const [active, setActive] = useState(0);
 const selected = experiences[active];
 return (
  <section id="pengalaman" className="jk-section jk-experiences">
   <div className="jk-shell">
    <div className="jk-section-heading" data-reveal><p className="jk-kicker">{t("Pilihan minat perjalanan")}</p><h2>{t("Trip budaya, kuliner,")}<br /><em>{t("atau alam Jogja.")}</em></h2></div>
    <div className="experience-grid">
     <div className="experience-editorial" data-reveal>
      <div className="experience-photo"><img src="/prambanan-sunrise.webp" alt={t("Candi Prambanan, Sleman, saat matahari terbit")} loading="lazy" /><span><MapPin size={14} aria-hidden="true" />{t("Prambanan, Sleman")}</span></div>
      <div className="experience-photo-note"><Compass size={18} aria-hidden="true" /><p>{t("Tempat yang sama bisa terasa berbeda ketika kamu punya waktu untuk mengenalnya.")}</p></div>
     </div>
     <div className="experience-choices" data-reveal>
      {experiences.map((item, index) => <div key={item.interest} className={active === index ? 'experience-choice is-active' : 'experience-choice'}>
       <button type="button" aria-expanded={active === index} aria-controls={'experience-' + item.interest} onClick={() => setActive(index)}><span className="experience-number">0{index + 1}</span><span>{t(item.category)}</span><ArrowUpRight size={20} aria-hidden="true" /></button>
       {active === index && <div className="experience-content" id={'experience-' + item.interest}>
        <h3>{t(item.title)}</h3><p>{t(item.description)}</p><div className="experience-stops">{item.stops.map(stop => <span key={stop}><Check size={13} aria-hidden="true" />{t(stop)}</span>)}</div>
        <a href={'#rencana'} className="jk-text-link" onClick={() => window.dispatchEvent(new CustomEvent('jogjakarsa:interest', { detail: selected.interest }))}>{t("Coba rute ini")}<ArrowUpRight size={15} aria-hidden="true" /></a>
       </div>}
      </div>)}
      <p className="jk-note">{t("Inspirasi perjalanan dari katalog demo. Aktivitas dan ketersediaan perlu dikonfirmasi sebelum pemesanan.")}</p>
     </div>
    </div>
   </div>
  </section>
 );
}
