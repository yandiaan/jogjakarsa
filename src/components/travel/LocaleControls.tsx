import type { Language } from '../../lib/travel/locale';
import { useCurrency, type Currency } from '../../lib/travel/useCurrency';
export default function LocaleControls({ language, pathname }: { language: Language; pathname: string }) {
 const { currency, chooseCurrency } = useCurrency(language);
 const otherPath = language === 'en' ? (pathname.replace(/^\/en(?=\/|$)/, '') || '/') : '/en' + (pathname === '/' ? '/' : pathname);
 return <div className="jk-locale-controls"><a href={otherPath} hrefLang={language === 'en' ? 'id' : 'en'} aria-label={language === 'en' ? 'Read in Indonesian' : 'Read in English'}>{language === 'en' ? 'ID' : 'EN'}</a><label><span className="sr-only">{language === 'en' ? 'Display currency' : 'Mata uang tampilan'}</span><select value={currency} onChange={event => chooseCurrency(event.target.value as Currency)}><option value="IDR">IDR</option><option value="USD">USD</option></select></label></div>;
}
