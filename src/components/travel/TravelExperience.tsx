import { ArrowUpRight, Check, Compass, MapPin } from 'lucide-react';
import { useState } from 'react';

const experiences = [
 { title: 'Cerita yang masih hidup.', category: 'Budaya & kriya', description: 'Menelusuri candi, kampung lama, dan proses di balik selembar batik. Beri ruang untuk mendengar, bukan sekadar singgah.', stops: ['Taman Sari', 'Prambanan', 'Workshop batik'], interest: 'budaya' },
 { title: 'Kenal Jogja lewat rasanya.', category: 'Kuliner & kota', description: 'Dari rasa malam di kota hingga gang-gang bersejarah. Perjalanan pendek dengan waktu yang cukup untuk menikmati.', stops: ['Kuliner malam', 'Kotagede', 'Taman Sari'], interest: 'kuliner' },
 { title: 'Ruang untuk menarik napas.', category: 'Alam & perjalanan pelan', description: 'Bukit, pesisir, lalu jeda di kota. Susun ritme perjalanan dengan mempertimbangkan jarak dan waktu istirahat.', stops: ['Nglanggeran', 'Pantai selatan', 'Kuliner malam'], interest: 'alam' },
];

export default function TravelExperience() {
 const [active, setActive] = useState(0);
 const selected = experiences[active];
 return (
  <section id="pengalaman" className="jk-section jk-experiences">
   <div className="jk-shell">
    <div className="jk-section-heading" data-reveal><p className="jk-kicker">Mulai dari rasa ingin tahu</p><h2>Satu Jogja.<br /><em>Banyak cara mengenalnya.</em></h2></div>
    <div className="experience-grid">
     <div className="experience-editorial" data-reveal>
      <div className="experience-photo"><img src="/prambanan-sunrise.webp" alt="Candi Prambanan, Sleman, saat matahari terbit" loading="lazy" /><span><MapPin size={14} aria-hidden="true" /> Prambanan, Sleman</span></div>
      <div className="experience-photo-note"><Compass size={18} aria-hidden="true" /><p>Tempat yang sama bisa terasa berbeda ketika kamu punya waktu untuk mengenalnya.</p></div>
     </div>
     <div className="experience-choices" data-reveal>
      {experiences.map((item, index) => <div key={item.interest} className={active === index ? 'experience-choice is-active' : 'experience-choice'}>
       <button type="button" aria-expanded={active === index} aria-controls={'experience-' + item.interest} onClick={() => setActive(index)}><span className="experience-number">0{index + 1}</span><span>{item.category}</span><ArrowUpRight size={20} aria-hidden="true" /></button>
       {active === index && <div className="experience-content" id={'experience-' + item.interest}>
        <h3>{item.title}</h3><p>{item.description}</p><div className="experience-stops">{item.stops.map(stop => <span key={stop}><Check size={13} aria-hidden="true" />{stop}</span>)}</div>
        <a href={'#rencana'} className="jk-text-link" onClick={() => window.dispatchEvent(new CustomEvent('jogjakarsa:interest', { detail: selected.interest }))}>Coba rute ini <ArrowUpRight size={15} aria-hidden="true" /></a>
       </div>}
      </div>)}
      <p className="jk-note">Inspirasi perjalanan dari katalog demo. Aktivitas dan ketersediaan perlu dikonfirmasi sebelum pemesanan.</p>
     </div>
    </div>
   </div>
  </section>
 );
}
