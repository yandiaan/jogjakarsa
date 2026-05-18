import { pilar3Data } from '../../data/pilar3';
import PilarPageShell from './PilarPageShell';

export default function Pilar3Content() {
  return (
    <PilarPageShell
      pilarNumber={3}
      titleLine1="Tata Busana &"
      titleLine2="Kriya"
      description={pilar3Data.description}
      heroImage={pilar3Data.heroImage}
      heroAlt="Tata Busana & Kriya Jogja"
      sections={pilar3Data.sections}
      prevPilar={{ href: '/budaya/pilar2', label: 'Pilar 2: Seni Pertunjukan & Bunyi' }}
      nextPilar={{ href: '/budaya/pilar4', label: 'Pilar 4: Bahasa & Aksara' }}
    />
  );
}
