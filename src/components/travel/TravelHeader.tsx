import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TravelHeader() {
 const [open, setOpen] = useState(false);
 useEffect(() => {
  const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
  window.addEventListener('keydown', handleKey);
  return () => window.removeEventListener('keydown', handleKey);
 }, []);
 return (
  <header className="jk-header">
   <div className="jk-shell jk-nav">
    <a href="#top" className="jk-brand" aria-label="Jogjakarsa beranda"><span className="jk-brand-mark" aria-hidden="true">j.</span>jogjakarsa<span className="brand-period">.</span></a>
    <nav className="jk-desktop-nav" aria-label="Navigasi utama"><a href="#pengalaman">Pengalaman</a><a href="#cara-kerja">Cara kerja</a><a href="#tentang">Tentang kami</a></nav>
    <a className="jk-nav-cta" href="#rencana">Mulai merencanakan <ArrowUpRight size={15} aria-hidden="true" /></a>
    <button className="jk-menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="jk-mobile-nav" aria-label={open ? 'Tutup navigasi' : 'Buka navigasi'}>{open ? <X size={21} /> : <Menu size={21} />}</button>
   </div>
   {open && <nav id="jk-mobile-nav" className="jk-mobile-nav" aria-label="Navigasi ponsel">{[['Pengalaman', '#pengalaman'], ['Cara kerja', '#cara-kerja'], ['Tentang kami', '#tentang'], ['Rancang perjalanan', '#rencana']].map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={20} aria-hidden="true" /></a>)}</nav>}
  </header>
 );
}
