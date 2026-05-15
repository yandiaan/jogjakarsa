export interface SubPoint {
  title: string;
  description: string;
  image: string;
}

export interface SubSection {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  quote: string;
  points: SubPoint[];
}

export const pilar1Data = {
  title: "Pilar 1: Arsitektur & Tata Ruang",
  subtitle: "Tatanan",
  description: "Manifesto spasial dari Sumbu Filosofis, arsitektur keraton, hingga mahakarya litikum yang merefleksikan tatanan sosial dan kosmologi Jogja.",
  sections: [
    {
      id: "sumbu-filosofis",
      number: 1,
      title: "Sumbu Filosofis",
      subtitle: "Garis Imajiner",
      quote: "Garis imajiner yang menghubungkan Gunung Merapi, Keraton, dan Laut Selatan. Sebuah manifesto spasial karya Sultan HB I yang melambangkan siklus hidup manusia, Sangkan Paraning Dumadi, dan kini telah ditetapkan sebagai Warisan Dunia oleh UNESCO.",
      points: [
        {
          title: "Dualitas Kosmologis (Lingga-Yoni)",
          description: "Garis ini menghubungkan Gunung Merapi (elemen api/maskulin) di utara dengan Laut Selatan (elemen air/feminin) di selatan. Keraton Yogyakarta sengaja dibangun tepat di tengah sebagai titik keseimbangan (center of balance) untuk mengharmonisasikan kekuatan makrokosmos tersebut.",
          image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Siklus Sangkan Paraning Dumadi",
          description: "Hubungan fisik ini adalah peta spiritual. Perjalanan dari selatan (Panggung Krapyak) ke Keraton melambangkan Sangkan (asal muasal kelahiran manusia), sementara dari utara (Tugu) ke Keraton melambangkan Paran (tujuan akhir atau kembalinya jiwa menuju Sang Pencipta).",
          image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Poros Meditasi dan Otoritas",
          description: "Garis lurus dari Tugu ke Keraton berfungsi sebagai fokus meditasi Sultan. Saat duduk di Bangsal Manguntur Tangkil, pandangan Sultan yang lurus ke arah Tugu melambangkan Manunggaling Kawula Gusti—penyatuan antara rakyat dengan pemimpin, serta manusia dengan Tuhan dalam satu garis ketaatan yang tak terputus.",
          image: "https://images.unsplash.com/photo-1596404841571-085e6835a8bc?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Diplomasi Budaya Global",
          description: "Pengakuan UNESCO menegaskan bahwa tata kota ini memiliki \"Nilai Universal Luar Biasa\" (Outstanding Universal Value), menjadikannya standar arsitektur filosofis yang tidak dimiliki kota lain di dunia.",
          image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=800"
        }
      ]
    },
    {
      id: "struktur-rumah-jawa",
      number: 2,
      title: "Struktur Rumah Jawa",
      subtitle: "Omah",
      quote: "Hierarki hunian Jawa yang merefleksikan tatanan sosial dan kosmologi. Dari kesahajaan rakyat hingga kemegahan takhta raja, setiap struktur adalah simbol derajat dan fungsi hidup.",
      points: [
        {
          title: "Bangsal Kencono (Kediaman Raja)",
          description: "Didirikan tahun 1756, bangunan ini adalah jantung otoritas spiritual dan politik Jogja. Secara filosofis, ketiadaan dinding masif melambangkan watak raja yang harus transparan dan menyatu dengan rakyat (Manunggaling Kawula Gusti). Ia berfungsi sebagai panggung suci tempat ritual kenegaraan digelar.",
          image: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Rumah Joglo (Bangsawan)",
          description: "Identitas aristokrasi yang menonjolkan empat tiang utama (Soko Guru) sebagai simbol stabilitas empat penjuru mata angin. Joglo bukan sekadar tempat tinggal, melainkan ruang pamer martabat dan keramahan pemiliknya.",
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Rumah Limasan (Menengah)",
          description: "Hunian yang melambangkan kesetimbangan ekonomi dan etos kerja kelas menengah. Bentuk atapnya yang kokoh mencerminkan nilai keteguhan hati dan kemapanan keluarga.",
          image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Rumah Kampung (Rakyat)",
          description: "Representasi kejujuran dan efisiensi hidup rakyat jelata. Arsitekturnya yang bersahaja dengan dua sisi atap melambangkan filosofi nrimo ing pandum (menerima anugerah Tuhan apa adanya).",
          image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Rumah Panggang-Pe (Dasar)",
          description: "Struktur tertua yang menjadi akar arsitektur Jawa, melambangkan kedekatan primordial manusia dengan alam. Fungsinya sebagai gudang hasil bumi menunjukkan betapa agrarisnya budaya leluhur kita.",
          image: "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?auto=format&fit=crop&q=80&w=800"
        }
      ]
    },
    {
      id: "arsitektur-air",
      number: 3,
      title: "Arsitektur Air",
      subtitle: "Water Castle",
      quote: "Rekayasa hidrolik kuno yang memadukan estetika dan pertahanan. Manifestasi penguasaan elemen air sebagai sumber kehidupan sekaligus benteng rahasia kerajaan Yogyakarta.",
      points: [
        {
          title: "Tamansari (Istana Air)",
          description: "Sebuah \"Taman Firdaus\" yang dibangun Sultan HB I pada 1758 untuk merefleksikan kemegahan batin dan tempat bersantai raja. Di balik keindahan kolamnya, terdapat fungsi pertahanan militer rahasia. Tamansari adalah simbol dualitas karakter Jawa: lembut di luar namun sangat waspada di dalam.",
          image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Pesanggrahan Warungboto",
          description: "Situs peristirahatan yang mengangkat kesucian mata air alami sebagai media penyucian jiwa keluarga kerajaan. Bangunan ini menonjolkan hubungan manusia dengan elemen air yang dianggap sebagai sumber kebijakan.",
          image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Sumur Gumuling (Masjid Bawah Air)",
          description: "Ruang ibadah bawah tanah yang unik dengan arsitektur akustik melingkar tanpa pengeras suara. Masjid ini melambangkan perjalanan batin menuju titik nol (Tuhan) dalam keheningan total.",
          image: "https://images.unsplash.com/photo-1590076215667-875d4ef2d7de?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Kali Larangan (Irigasi Kuno)",
          description: "Bukan sekadar saluran air, melainkan urat nadi peradaban yang menjaga kedaulatan pangan dan kebersihan kota. \"Larangan\" menandakan bahwa air adalah aset suci milik negara yang harus dilindungi.",
          image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&q=80&w=800"
        }
      ]
    },
    {
      id: "gapura-benteng",
      number: 4,
      title: "Gapura & Benteng",
      subtitle: "The Wall",
      quote: "Sistem pertahanan lapis ganda yang menjaga marwah keraton. Batas fisik antara ruang sakral 'njeron beteng' dengan dunia luar, saksi bisu perjuangan kedaulatan Mataram.",
      points: [
        {
          title: "Plengkung Nirbaya (Gading)",
          description: "Gerbang selatan yang menyimpan nilai sakralitas kematian. Ada pantangan budaya bagi Sultan yang sedang bertahta untuk melewati gerbang ini, karena ia berfungsi sebagai jalur terakhir bagi jenazah raja menuju pemakaman Imogiri.",
          image: "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Pojok Beteng (Bastion)",
          description: "Empat titik pertahanan di sudut benteng yang melambangkan kewaspadaan terhadap ancaman dari segala penjuru. Pojok Beteng menegaskan batas kedaulatan tradisi Yogyakarta.",
          image: "https://images.unsplash.com/photo-1597074866923-dc0589150458?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Benteng Baluwerti",
          description: "Tembok raksasa yang memisahkan kawasan Njeron Beteng dengan dunia luar, menciptakan ruang privat bagi pelestarian budaya. Keberadaannya membentuk identitas sosial masyarakat njeron beteng yang sangat kental memegang teguh tata krama.",
          image: "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?auto=format&fit=crop&q=80&w=800"
        }
      ]
    },
    {
      id: "mahakarya-litikum",
      number: 5,
      title: "Mahakarya Litikum",
      subtitle: "Arsitektur Peradaban Batu",
      quote: "Keajaiban teknik batu purba yang menentang zaman. Bukti kecanggihan astronomi, matematika, dan seni pahat yang membentuk fondasi peradaban besar di tanah Mataram.",
      points: [
        {
          title: "Candi Prambanan (Mahakarya Hindu)",
          description: "Monumen pemujaan Dewa Siwa ini adalah puncak estetika arsitektur batu di Jawa. Melalui relief Roro Jonggrang, ia bukan hanya tempat ibadah, melainkan media penyampai legenda lokal yang melekat sebagai identitas budaya Jogja.",
          image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Candi Sambisari (Candi Bawah Tanah)",
          description: "Penemuannya yang terkubur 6,5 meter menunjukkan hubungan tragis antara peradaban manusia dengan keganasan alam (Merapi). Sambisari adalah simbol ketabahan dan pengingat bahwa Yogyakarta dibangun di atas lapisan-lapisan peradaban yang selalu bangkit.",
          image: "https://images.unsplash.com/photo-1586861256696-78da2a1de952?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Situs Ratu Boko (Istana di Atas Bukit)",
          description: "Ratu Boko memberikan gambaran gaya hidup mewah bangsawan masa lalu di atas perbukitan. Situs ini membuktikan bahwa sejak era klasik, Yogyakarta sudah memiliki konsep pemukiman elit yang menggabungkan hunian dengan panorama alam.",
          image: "https://images.unsplash.com/photo-1592364395653-83e648b20cc2?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Candi Ijo (Puncak Tertinggi)",
          description: "Terletak di titik tertinggi Yogyakarta, candi ini berfungsi sebagai pusat pengamatan astronomi agraris leluhur. Ia melambangkan kerendahan hati manusia yang selalu menengadah ke langit untuk mencari petunjuk Tuhan.",
          image: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&q=80&w=800"
        }
      ]
    }
  ] as SubSection[]
};
