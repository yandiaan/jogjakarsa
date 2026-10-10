import { ArrowUpRight } from 'lucide-react';
export default function TravelFooter() {
 return (
  <footer className="jk-footer">
   <div className="jk-shell">
    <div className="footer-invite" data-reveal><h2>Jogja menunggu.<br /><em>Mulai dari rencanamu.</em></h2><a href="#rencana" className="jk-button">Rancang perjalanan <ArrowUpRight size={17} aria-hidden="true" /></a></div>
    <div className="footer-wordmark" aria-hidden="true">jogjakarsa.</div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} Jogjakarsa · Perjalanan personal di DIY</p><nav aria-label="Navigasi footer"><a href="/budaya">Budaya Jogja</a><a href="#faq">Pertanyaan umum</a><a href="#tentang">Tentang</a></nav><span>Demo produk · Booking belum aktif</span></div>
   </div>
  </footer>
 );
}
