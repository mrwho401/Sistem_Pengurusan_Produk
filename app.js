/**
 * Fail: js/app.js
 * Tugasan: Ujian Amali 2 - Sistem Pengurusan Produk
 * Fungsi: Menguruskan operasi CRUD (Create, Read, Delete) menggunakan Fetch API.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Deklarasi pembolehubah untuk elemen DOM
    const productBody = document.getElementById('productBody');
    const productForm = document.getElementById('productForm');

    /**
     * FUNGSI: Ambil Data Produk (Fetch API)
     * Mengambil 10 data produk daripada API luar (DummyJSON).
     */
    const ambilDataProduk = async () => {
        try {
            // Memanggil API menggunakan Fetch
            const respons = await fetch('https://dummyjson.com/products?limit=10');
            
            // Semak jika respons berjaya
            if (!respon.ok) throw new Error('Gagal mengambil data daripada API');

            const data = await respons.json();

            // Masukkan setiap produk ke dalam jadual
            data.products.forEach(produk => {
                tambahBarisJadual(produk.title, produk.category, produk.price);
            });
            
            console.log('10 Produk pertama berjaya dimuatkan dari API.');
        } catch (ralat) {
            console.error('Ralat:', ralat);
            // Paparkan mesej ralat jika API gagal
            productBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:red;">Gagal memuatkan data produk.</td></tr>`;
        }
    };

    /**
     * FUNGSI: Tambah Baris ke Jadual
     * Mencipta elemen baris (TR) dan sel (TD) secara dinamik.
     */
    const tambahBarisJadual = (nama, kategori, harga, prepend = false) => {
        const tr = document.createElement('tr');

        // Struktur kandungan baris
        tr.innerHTML = `
            <td>${nama}</td>
            <td>${kategori}</td>
            <td>RM ${parseFloat(harga).toFixed(2)}</td>
            <td><button class="delete-btn">Hapus</button></td>
        `;

        // Logik Butang Hapus: Menghapuskan baris daripada paparan (UI)
        tr.querySelector('.delete-btn').addEventListener('click', () => {
            // Pengesahan sebelum hapus
            const sahkan = confirm(`Adakah anda pasti ingin menghapuskan produk "${nama}"?`);
            if (sahkan) {
                tr.remove();
                console.log(`Produk "${nama}" telah dihapuskan.`);
            }
        });

        // Masukkan baris ke dalam badan jadual
        if (prepend) {
            // Produk baru dari borang akan muncul di atas sekali
            productBody.prepend(tr);
        } else {
            // Produk dari API akan muncul mengikut turutan
            productBody.appendChild(tr);
        }
    };

    /**
     * EVENT LISTENER: Borang Tambah Produk
     * Menangkap data daripada input pengguna apabila butang hantar diklik.
     */
    productForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Menghalang halaman daripada segar semula (refresh)

        // Ambil nilai daripada input borang
        const namaProduk = document.getElementById('productName').value;
        const kategoriProduk = document.getElementById('productCategory').value;
        const hargaProduk = document.getElementById('productPrice').value;

        // Validasi ringkas untuk memastikan semua kotak diisi
        if (namaProduk && kategoriProduk && hargaProduk) {
            // Panggil fungsi tambah baris (set prepend ke true)
            tambahBarisJadual(namaProduk, kategoriProduk, hargaProduk, true);
            
            // Bersihkan borang selepas berjaya ditambah
            productForm.reset();
            alert('Produk berjaya ditambah ke dalam senarai!');
        } else {
            alert('Sila isi semua maklumat produk.');
        }
    });

    // 2. Jalankan fungsi pengambilan data sebaik sahaja aplikasi dimuatkan
    ambilDataProduk();
});