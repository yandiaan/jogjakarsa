import { useEffect, useState } from 'react';
import type { Language } from './locale';
export type Currency = 'IDR' | 'USD';
export function useCurrency(language: Language) {
 const [currency, setCurrency] = useState<Currency>(language === 'en' ? 'USD' : 'IDR');
 useEffect(() => {
  try { const saved = localStorage.getItem('jogjakarsa:currency'); if (saved === 'IDR' || saved === 'USD') setCurrency(saved); } catch {}
  const change = (event: Event) => { const value = (event as CustomEvent).detail; if (value === 'IDR' || value === 'USD') setCurrency(value); };
  window.addEventListener('jogjakarsa:currency', change);
  return () => window.removeEventListener('jogjakarsa:currency', change);
 }, []);
 const chooseCurrency = (value: Currency) => {
  setCurrency(value);
  try { localStorage.setItem('jogjakarsa:currency', value); } catch {}
  window.dispatchEvent(new CustomEvent('jogjakarsa:currency', { detail: value }));
 };
 return { currency, chooseCurrency };
}
