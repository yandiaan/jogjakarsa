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
    title: "Arsitektur & Tata Ruang",
    description: "Kenali Sumbu Filosofis, arsitektur keraton, dan tata ruang Jogja sebelum memilih tempat yang ingin dikunjungi.",
    icon: "Map",
    image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "pilar2",
    title: "Seni Pertunjukan & Bunyi",
    description: "Kenali tari klasik, gamelan, dan seni pertunjukan Jogja sebagai inspirasi pengalaman budaya selama perjalanan.",
    icon: "Music",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "pilar3",
    title: "Tata Busana & Kriya",
    description: "Kenali batik, keris, dan kerajinan perak Kotagede untuk memahami karya serta proses pembuatannya.",
    icon: "Shirt",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "pilar4",
    title: "Bahasa & Aksara",
    description: "Kenali bahasa Jawa, unggah-ungguh, dan aksara sebagai bekal berinteraksi dengan masyarakat lokal.",
    icon: "BookOpen",
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "pilar5",
    title: "Tradisi & Upacara",
    description: "Kenali tradisi serta upacara Jogja, termasuk Labuhan dan Grebeg. Jadwal serta akses kunjungan perlu diperiksa sebelum berangkat.",
    icon: "Sun",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "pilar6",
    title: "Etos & Perilaku Sosial",
    description: "Kenali gotong royong, tepo seliro, dan kebiasaan sosial untuk berkunjung dengan lebih menghargai kehidupan lokal.",
    icon: "Users",
    image: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "pilar7",
    title: "Seni Kontemporer & Kreatif",
    description: "Kenali mural, film, dan seni kontemporer yang menjadi bagian dari kehidupan kreatif Jogja.",
    icon: "Palette",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=800",
  }
];
