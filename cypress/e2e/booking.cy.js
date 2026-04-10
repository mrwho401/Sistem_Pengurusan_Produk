describe('Ujian Amali 2: Sistem Pengurusan Produk', () => {
  it('Menjalankan ujian penuh sistem', () => {
    // Robot buka fail index.html anda
    cy.visit('index.html'); 

    // Uji 1: Pastikan Tajuk Ada
    cy.get('h1').should('contain', 'SISTEM PENGURUSAN PRODUK');

    // Uji 2: Tambah Produk Baru
    cy.get('#productName').type('Laptop Kerja');
    cy.get('#productCategory').type('Elektronik');
    cy.get('#productPrice').type('2500');
    cy.get('#addBtn').click();
    
    // Pastikan produk muncul dalam jadual
    cy.get('#productBody').should('contain', 'Laptop Kerja');

    // Uji 3: Hapus Produk
    cy.get('.delete-btn').first().click();
  });
});