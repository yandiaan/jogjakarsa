import LocaleControls from './LocaleControls';
import { copy, localHref, type Language } from '../../lib/travel/locale';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TravelHeader({ language = 'id', pathname = '/' }: { language?: Language; pathname?: string }) {
 const t = (text: string) => copy(language, text);
 const [open, setOpen] = useState(false);
 useEffect(() => {
  const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
  window.addEventListener('keydown', handleKey);
  return () => window.removeEventListener('keydown', handleKey);
 }, []);
 return (
  <header className="jk-header">
   <div className="jk-shell jk-nav">
    <a href={localHref(language, "/#top")} className="jk-brand" aria-label={t("Jogjakarsa beranda")}><span className="jk-brand-mark" aria-hidden="true">j.</span>jogjakarsa<span className="brand-period">.</span></a>
    <nav className="jk-desktop-nav" aria-label={t("Navigasi utama")}><a href={localHref(language, "/#layanan")}>{t("Layanan")}</a><a href={localHref(language, "/#pengalaman")}>{t("Pilihan trip")}</a><a href={localHref(language, "/#cara-kerja")}>{t("Cara kerja")}</a><a href={localHref(language, "/budaya")}>{t("Panduan budaya")}</a></nav>
    <LocaleControls language={language} pathname={pathname} />
    <a className="jk-nav-cta" href={localHref(language, "/#rencana")}>{t("Coba planner")}<ArrowUpRight size={15} aria-hidden="true" /></a>
    <button className="jk-menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="jk-mobile-nav" aria-label={t(open ? 'Tutup navigasi' : 'Buka navigasi')}>{open ? <X size={21} /> : <Menu size={21} />}</button>
   </div>
   {open && <nav id="jk-mobile-nav" className="jk-mobile-nav" aria-label={t("Navigasi ponsel")}>{[['Layanan perjalanan', '/#layanan'], ['Pilihan trip', '/#pengalaman'], ['Cara kerja', '/#cara-kerja'], ['Panduan budaya', '/budaya'], ['Coba planner', '/#rencana']].map(([label, href]) => <a key={href} href={localHref(language, href)} onClick={() => setOpen(false)}>{t(label)}<ArrowUpRight size={20} aria-hidden="true" /></a>)}</nav>}
  </header>
 );
}
