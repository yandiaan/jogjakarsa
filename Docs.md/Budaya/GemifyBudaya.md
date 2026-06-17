# GAMIFICATION BLUEPRINT: BUDAYA JOGJA (CULTURAL DECODING ENGINE)

Dokumen ini mendefinisikan interaksi mikro (gamifikasi ringan) untuk menu **Budaya**. Fokus utama adalah interaksi sederhana yang hemat sumber daya (low-cost rendering), mudah dieksekusi dengan React/Next.js dan Tailwind CSS, namun tetap memberikan efek "Wow" bagi juri.

---

## 1. Konsep Utama: The Cultural Decryptor
Kebudayaan Jogja (seperti Aksara dan Batik) diposisikan sebagai "Kode Etik" atau algoritma purba yang harus dipecahkan oleh pengguna. 

**Metrik Keberhasilan (Cultural Resonance Score - CRS):**
Alih-alih skor kompleks, sistem hanya membaca "Passed" (Lolos) atau "Locked" (Terkunci). Pengguna harus menyelesaikan interaksi pendek untuk membuka paragraf materi selanjutnya.

---

## 2. Mekanik Game 1: Aksara Memory Matrix (Flip Card)
*   **Target Materi:** Pengenalan Aksara Jawa Dasar (Hanacaraka).
*   **Konsep Sistem:** *Data Matching Protocol*. Pengguna disajikan 6 kartu tertutup di layar. Di balik kartu terdapat 3 pasang data (3 suku kata Latin dan 3 karakter Aksara Jawa).
*   **Cara Main:**
    *   Pengguna mengeklik kartu untuk membaliknya (animasi 3D flip menggunakan CSS `transform: rotateY(180deg)`).
    *   Pengguna harus mencari pasangan yang tepat (Misal: Kartu "Ha" dicocokkan dengan kartu karakter "ꦲ").
*   **Dampak Mekanis:** 
    *   Jika salah, kartu menutup kembali dengan efek getar kecil (*CSS shake*).
    *   Jika 3 pasang kartu berhasil dicocokkan, sebuah gembok visual terbuka, dan teks deskripsi filosofi "Hanacaraka" muncul dari bawah (*fade in up*).
*   **Catatan Engineer:** Sangat mudah dieksekusi. Hanya butuh satu *state array* di React untuk melacak index kartu yang sedang terbuka (maksimal 2 kartu terbuka bersamaan) dan mengecek `id` yang sama.

---

## 3. Mekanik Game 2: Motif Recognition (Batik Slider)
*   **Target Materi:** Filosofi Motif Batik Jogja (Misal: Kawung dan Parang).
*   **Konsep Sistem:** *Visual Pattern Alignment*.
*   **Cara Main:** 
    *   Sebuah gambar motif Batik Parang ditampilkan acak atau terpecah menjadi 3 baris horizontal. 
    *   Pengguna hanya perlu menggeser (*slider input* atau *swipe*) baris tengah agar pola garis miring motif Parang tersambung sempurna dari atas ke bawah.
*   **Dampak Mekanis:**
    *   Saat pola tersambung mulus (titik koordinat X sejajar), gambar akan menyala (efek filter *brightness* atau *drop-shadow* emas di Tailwind).
    *   Teks filosofi muncul: *"Pola tersambung. Batik Parang melambangkan ombak laut yang konsisten dan tidak pernah menyerah."*
*   **Catatan Engineer:** Beban kerjanya sangat ringan. Cukup gunakan input tipe `range` yang diikat ke nilai translasi sumbu X (`translateX`) pada elemen gambar.

---

## 4. Efek Penyelesaian (The Output)
Karena ini *micro-interaction*, tidak perlu *dashboard* skor di akhir halaman. Cukup berikan **"Cultural Decryptor Badge"** kecil berbentuk ikon gunungan wayang yang tersemat di navigasi atas (Navbar) saat pengguna berhasil menyelesaikan kedua mini-game tersebut. Ini memberi kepuasan psikologis tanpa harus membangun sistem database *user* yang rumit.