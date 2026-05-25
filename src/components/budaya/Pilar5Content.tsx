import { pilar5Data } from '../../data/pilar5';
import PilarPageShell from './PilarPageShell';

export default function Pilar5Content() {
  return (
    <PilarPageShell
      pilarNumber={5}
      titleLine1="Tradisi &"
      titleLine2="Upacara"
      description={pilar5Data.description}
      heroImage={pilar5Data.heroImage}
      heroAlt="Tradisi & Upacara Jogja"
      sections={pilar5Data.sections}
      prevPilar={{ href: '/budaya/pilar4', label: 'Pilar 4: Bahasa & Aksara' }}
      nextPilar={{ href: '/budaya/pilar6', label: 'Pilar 6: Etos & Perilaku Sosial' }}
    />
  );
}
