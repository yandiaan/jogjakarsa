import { useEffect } from 'react';

export function useTravelReady(id: string) {
 useEffect(() => {
  const section = document.getElementById(id);
  if (!section) return;
  section.setAttribute('data-travel-ready', 'true');
  window.dispatchEvent(new Event('jogjakarsa:ready'));
  return () => { section.removeAttribute('data-travel-ready'); };
 }, [id]);
}
