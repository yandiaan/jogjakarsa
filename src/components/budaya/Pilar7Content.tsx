import { pilar7Data } from '../../data/pilar7';
import PilarPageShell from './PilarPageShell';

export default function Pilar7Content() {
  return (
    <PilarPageShell
      pilarNumber={7}
      titleLine1="Seni Kontemporer &"
      titleLine2="Kreatif"
      description={pilar7Data.description}
      heroImage={pilar7Data.heroImage}
      heroAlt="Seni Kontemporer & Kreatif Jogja"
      sections={pilar7Data.sections}
      prevPilar={{ href: '/budaya/pilar6', label: 'Pilar 6: Etos & Perilaku Sosial' }}
    />
  );
}
