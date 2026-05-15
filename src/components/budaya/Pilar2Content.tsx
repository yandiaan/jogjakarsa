import { pilar2Data } from '../../data/pilar2';
import PilarPageShell from './PilarPageShell';

export default function Pilar2Content() {
  return (
    <PilarPageShell
      pilarNumber={2}
      titleLine1="Seni Pertunjukan &"
      titleLine2="Bunyi"
      description={pilar2Data.description}
      heroImage={pilar2Data.heroImage}
      heroAlt="Seni Pertunjukan Jogja"
      sections={pilar2Data.sections}
      prevPilar={{ href: '/budaya/pilar1', label: 'Pilar 1: Arsitektur & Tata Ruang' }}
    />
  );
}
