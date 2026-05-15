export interface Pillar {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name or SVG path
  image: string; // Background image URL
}

export const tujuhPilar: Pillar[] = [
  {
    id: "pilar1",
    title: "Pilar 1: Arsitektur & Tata Ruang (Tatanan)",
    description: "Manifesto spasial dari Sumbu Filosofis, arsitektur keraton, hingga mahakarya litikum yang merefleksikan tatanan sosial dan kosmologi Jogja.",
    icon: "Map",
    image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "pilar2",
    title: "Pilar 2: Seni Pertunjukan & Bunyi (Gending & Beksa)",
    description: "Gerak tubuh klasik sebagai meditasi kinetik dan gamelan sebagai logika bunyi yang mengatur ritme semesta dan ketenangan jiwa.",
    icon: "Music",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "pilar3",
    title: "Pilar 3: Tata Busana & Kriya (Ageman & Kriya)",
    description: "Goresan motif batik, seni tempa keris, hingga filigree perak Kotagede yang menyimpan kode visual dan kedaulatan diri.",
    icon: "Shirt",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "pilar4",
    title: "Pilar 4: Bahasa & Aksara (Sastra & Wicara)",
    description: "Sistem komunikasi berlapis (Unggah-ungguh) dan sastra kuno sebagai cermin budi pekerti serta pelatih kerendahan hati.",
    icon: "BookOpen",
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "pilar5",
    title: "Pilar 5: Tradisi & Upacara (Paugeran)",
    description: "Diplomasi spiritual antara manusia dan alam, mulai dari Labuhan Merapi, Grebeg Sekaten, hingga ritual daur hidup.",
    icon: "Sun",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "pilar6",
    title: "Pilar 6: Etos & Perilaku Sosial (Manusia Jogja)",
    description: "Filosofi Hamemayu Hayuning Bawono, gotong royong, dan empati (Tepo Seliro) yang menjaga harmoni ekosistem komunal.",
    icon: "Users",
    image: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "pilar7",
    title: "Pilar 7: Seni Kontemporer & Kreatif (Evolusi)",
    description: "Ekosistem kreatif independen, dari seni jalanan mural, film indie, hingga intervensi cahaya digital pada arsitektur sejarah.",
    icon: "Palette",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=800",
  }
];
