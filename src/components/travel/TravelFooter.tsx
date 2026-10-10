import { copy, localHref, type Language } from '../../lib/travel/locale';
import { ArrowUpRight } from 'lucide-react';
export default function TravelFooter({ language = 'id' }: { language?: Language }) {
 const t = (text: string) => copy(language, text);
 return (
  <footer className="jk-footer">
   <div className="jk-shell">
    <div className="footer-invite" data-reveal><h2>{t("Trip Jogja sesuai kebutuhanmu.")}<br /><em>{t("Mulai dengan draf rute.")}</em></h2><a href={localHref(language, "/#rencana")} className="jk-button">{t("Coba planner perjalanan")}<ArrowUpRight size={17} aria-hidden="true" /></a></div>
    <a className="footer-wordmark" href={localHref(language, "/#top")} aria-label={t("Jogjakarsa beranda")}><img src="/brand/jogjakarsa-logo.svg?v=3" width="430" height="156" alt="" loading="lazy" /></a>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} Jogjakarsa · {t("Travel agency untuk perjalanan custom di DIY")}</p><nav aria-label={t("Navigasi footer")}><a href={localHref(language, "/budaya")}>{t("Budaya Jogja")}</a><a href={localHref(language, "/#faq")}>{t("Pertanyaan umum")}</a><a href={localHref(language, "/#tentang")}>{t("Tentang")}</a></nav><span>{t("Demo produk · Booking belum aktif")}</span></div>
   </div>
  </footer>
 );
}
