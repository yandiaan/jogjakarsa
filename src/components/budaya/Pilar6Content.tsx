import { pilar6Data } from '../../data/pilar6';
import PilarPageShell from './PilarPageShell';

export default function Pilar6Content() {
  return (
    <PilarPageShell
      pilarNumber={6}
      titleLine1="Etos &"
      titleLine2="Perilaku Sosial"
      description={pilar6Data.description}
      heroImage={pilar6Data.heroImage}
      heroAlt="Etos & Perilaku Sosial Manusia Jogja"
      sections={pilar6Data.sections}
      prevPilar={{ href: '/budaya/pilar5', label: 'Pilar 5: Tradisi & Upacara' }}
      nextPilar={{ href: '/budaya/pilar7', label: 'Pilar 7: Seni Kontemporer & Kreatif' }}
    />
  );
}
