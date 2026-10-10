import { pilar1Data } from '../../data/pilar1';
import PilarPageShell from './PilarPageShell';

export default function Pilar1Content() {
  return (
    <PilarPageShell
      pilarNumber={1}
      titleLine1="Arsitektur &"
      titleLine2="Tata Ruang"
      description={pilar1Data.description}
      heroImage="/prambanan-sunrise.webp"
      heroAlt="Arsitektur Candi Prambanan saat matahari terbit"
      sections={pilar1Data.sections}
      nextPilar={{ href: '/budaya/pilar2', label: 'Pilar 2: Seni Pertunjukan & Bunyi' }}
    />
  );
}
