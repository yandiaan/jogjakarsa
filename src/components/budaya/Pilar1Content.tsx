import { pilar1Data } from '../../data/pilar1';
import PilarPageShell from './PilarPageShell';

export default function Pilar1Content() {
  return (
    <PilarPageShell
      pilarNumber={1}
      titleLine1="Arsitektur &"
      titleLine2="Tata Ruang"
      description={pilar1Data.description}
      heroImage="https://images.unsplash.com/photo-1583095340628-8d29b20e0600?auto=format&fit=crop&q=80&w=2000"
      heroAlt="Arsitektur Jogja"
      sections={pilar1Data.sections}
      nextPilar={{ href: '/budaya/pilar2', label: 'Pilar 2: Seni Pertunjukan & Bunyi' }}
    />
  );
}
