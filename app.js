/**
 * Fail: js/app.js
 * Fungsi: Menguruskan paparan produk, Fetch API, Tambah dan Hapus.
 */

document.addEventListener('DOMContentLoaded', () => {
    const productBody = document.getElementById('productBody');
    const productForm = document.getElementById('productForm');

    // 1. Fungsi Ambil Data daripada API (DummyJSON)
    const ambilDataProduk = async () => {
        try {
            const respon = await fetch('https://dummyjson.com/products?limit=10');
            
            if (!respon.ok) throw new Error('Ralat rangkaian');

            const data = await respon.json();

            // Kosongkan mesej ralat jika ada sebelum masukkan data
            productBody.innerHTML = '';

            data.products.forEach(produk => {
                tambahBarisKeJadual(produk.title, produk.category, produk.price);
            });
            
            console.log('Data API berjaya dimuatkan.');
        } catch (ralat) {
            console.error('Ralat API:', ralat);
            productBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:red;">Gagal memuatkan data produk. Sila periksa sambungan internet.</td></tr>`;
        }
    };

    // 2. Fungsi untuk menambah baris ke dalam jadual
    const tambahBarisKeJadual = (nama, kategori, harga, diAtas = false) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${nama}</td>
            <td>${kategori}</td>
            <td>RM ${parseFloat(harga).toFixed(2)}</td>
            <td><button class="delete-btn">Hapus</button></td>
        `;

        // Fungsi Butang Hapus
        tr.querySelector('.delete-btn').addEventListener('click', () => {
            if (confirm(`Hapus produk ${nama}?`)) {
                tr.remove();
            }
        });

        if (diAtas) {
            productBody.prepend(tr);
        } else {
            productBody.appendChild(tr);
        }
    };

    // 3. Event Listener untuk Borang Tambah Produk
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nama = document.getElementById('productName').value;
        const kategori = document.getElementById('productCategory').value;
        const harga = document.getElementById('productPrice').value;

        if (nama && kategori && harga) {
            tambahBarisKeJadual(nama, kategori, harga, true);
            productForm.reset();
        }
    });

    // Jalankan fungsi fetch bila halaman dibuka
    ambilDataProduk();
});