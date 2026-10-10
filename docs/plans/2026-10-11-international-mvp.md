# Jogjakarsa international MVP

Target: wisatawan Indonesia dan internasional yang bepergian di DIY. Cakupan destinasi tetap Jogja, bukan paket ke Eropa atau Jepang.

## Sudah diimplementasikan

- Homepage dan planner memakai komponen bersama dengan terjemahan manual Indonesia/Inggris.
- Rute Indonesia tetap di `/`; rute Inggris di `/en/`, termasuk index budaya dan tujuh visitor overviews. Konten Inggris adalah ringkasan editorial untuk pengunjung, bukan terjemahan lengkap seluruh arsip budaya panjang.
- Tombol bahasa berpindah ke topik halaman yang sama. Bahasa dokumen, metadata, dan alternate language links mengikuti rute.
- Pilihan IDR/USD terpisah dari bahasa dan tersimpan di browser. Header dan planner berbagi pilihan mata uang.
- Harga dasar tetap IDR. Kurs manual demonstrasi: USD 1 = IDR 17.000, dicatat 10 Oktober 2026. Ini bukan JISDOR, kurs live, atau kurs pembayaran yang dijamin. Nilai dan tanggal dikelola di `src/lib/travel/international.js`.
- Kategori tiket domestik/internasional merupakan pilihan eksplisit. Budget tiket asing pada katalog adalah simulasi, belum diverifikasi mitra.
- Opsi guide berbahasa Inggris: budget simulasi IDR500.000/grup/hari.
- Permintaan pengemudi berbahasa Inggris: tambahan simulasi IDR150.000/mobil/hari di atas mobil/pengemudi dasar.
- Transfer YIA: budget simulasi IDR350.000/mobil/satu arah, untuk 1–6 peserta.
- Biaya tambahan masuk rincian quote; pilihan tersimpan bersama draf dan muncul pada unduhan dalam bahasa/mata uang yang dipilih.
- Guide, pengemudi, ketersediaan, penerbangan, dan booking belum dikonfirmasi oleh demo.

USD dihitung dari nilai IDR dengan pembulatan dua desimal. Jumlah baris yang sudah dibulatkan bisa berbeda beberapa sen dari total yang dikonversi langsung; UI dan unduhan menjelaskan ini.

## Status AI dan langkah berikutnya

AI generatif belum terhubung. Planner saat ini memakai katalog dan aturan; tersedia tanpa API Claude maupun penyedia lain.

Produk AI yang masuk akal adalah asisten perencanaan, dengan alur:

1. Pengguna menulis kebutuhan dalam Indonesia/Inggris: tanggal, durasi, budget, peserta, minat, kebutuhan bahasa, serta titik kedatangan.
2. Model merangkum brief menjadi data terstruktur dan menanyakan detail yang kurang.
3. Model memilih hanya ID aktivitas dari katalog yang dikelola tim. Lokasi, harga, jam, dan kemampuan bahasa mitra berasal dari data terverifikasi.
4. Fungsi itinerary dan pricing menghitung rute serta quote secara deterministik. Model tidak menetapkan harga sendiri atau menjamin ketersediaan.
5. Pengguna merevisi itinerary lewat percakapan; sistem menyimpan versi draf dan menampilkan perubahan biaya.
6. Tim meninjau jadwal, harga, kebutuhan khusus, dan mitra sebelum menerbitkan penawaran final. Booking membutuhkan persetujuan pengguna dan konfirmasi operasional.

Implementasi AI nanti memerlukan endpoint server/backend, validasi input/output, batas biaya penggunaan, dan adapter penyedia yang dapat diganti. Kunci API berada di server. Deployment sekarang statis dan belum memiliki backend AI, database mitra, atau pembayaran.

Sebelum menerima pemesanan: validasi katalog, supplier dan kemampuan bahasa, tarif tiket berdasarkan kategori peserta, rincian kendaraan, kurs dan metode pembayaran, serta kebijakan layanan dengan tim operasional. Kredit startup adalah bonus pembiayaan pengembangan, bukan dasar kelayakan bisnis.

## Acuan

- [JNTO: booking a certified tour guide](https://www.japan.travel/en/plan/how-to-book-a-certified-tour-guide/): layanan pendamping bahasa dijelaskan sebagai produk konkret. Ini referensi cara menjelaskan peran guide, bukan klaim bahwa mitra Jogjakarsa sudah tersedia.
- [Bank Indonesia: JISDOR](https://www.bi.go.id/en/statistik/informasi-kurs/transaksi-bi/jisdor/default.aspx): kandidat acuan kurs saat tahap operasional. Angka demo aplikasi tidak disalin dari halaman ini.
