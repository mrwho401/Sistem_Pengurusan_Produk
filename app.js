document.addEventListener('DOMContentLoaded', () => {
    const productBody = document.getElementById('productBody');
    const productForm = document.getElementById('productForm');

    // 1. Ambil 10 data daripada DummyJSON menggunakan Fetch API
    const fetchProducts = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products?limit=10');
            const data = await response.json();
            displayProducts(data.products);
        } catch (error) {
            console.error('Ralat mengambil data:', error);
        }
    };

    // 2. Fungsi untuk memaparkan data ke dalam jadual
    const displayProducts = (products) => {
        products.forEach(product => {
            const row = createRow(product.title, product.category, product.price);
            productBody.appendChild(row);
        });
    };

    // 3. Fungsi mencipta baris jadual (Helper)
    const createRow = (name, category, price) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${name}</td>
            <td>${category}</td>
            <td>${price}</td>
            <td><button class="delete-btn">Hapus</button></td>
        `;

        // Fungsi Hapus Rekod
        tr.querySelector('.delete-btn').addEventListener('click', () => {
            tr.remove();
        });

        return tr;
    };

    //borang tambah produk
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('productName').value;
        const category = document.getElementById('productCategory').value;
        const price = document.getElementById('productPrice').value;

        // tambah at ui (simulasi) dan log ke console
        const newRow = createRow(name, category, price);
        productBody.prepend(newRow); // Masukkan di atas sekali
        
        console.log('Produk Baharu Ditambah:', { name, category, price });
        
        // Reset borang
        productForm.reset();
    });

    // Jalankan pengambilan data semasa halaman dimuatkan
    fetchProducts();
});