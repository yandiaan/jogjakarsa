import { pilar4Data } from '../../data/pilar4';
import PilarPageShell from './PilarPageShell';

export default function Pilar4Content() {
  return (
    <PilarPageShell
      pilarNumber={4}
      titleLine1="Bahasa &"
      titleLine2="Aksara"
      description={pilar4Data.description}
      heroImage={pilar4Data.heroImage}
      heroAlt="Bahasa & Aksara Jogja"
      sections={pilar4Data.sections}
      prevPilar={{ href: '/budaya/pilar3', label: 'Pilar 3: Tata Busana & Kriya' }}
      nextPilar={{ href: '/budaya/pilar5', label: 'Pilar 5: Tradisi & Upacara' }}
    />
  );
}
