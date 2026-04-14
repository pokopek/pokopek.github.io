// Data produk dengan link gambar real (sama seperti sebelumnya)
// Data produk dengan link gambar real
const products = [
    {
        id: 1,
        name: "Laptop Gaming Pro",
        price: 15999000,
        category: "elektronik",
        rating: 4.8,
        image: "images/1.jpg",
        description: "Laptop gaming dengan spesifikasi tinggi, processor Intel i7 generasi terbaru, RAM 16GB, dan GPU RTX 3060. Cocok untuk gaming dan editing video profesional."
    },
    {
        id: 2,
        name: "Smartphone X1",
        price: 8999000,
        category: "elektronik",
        rating: 4.6,
        image: "images/2.jpg",
        description: "Smartphone flagship dengan kamera 108MP, baterai 5000mAh, dan layar AMOLED 120Hz. Desain premium dan performa kencang."
    },
    {
        id: 3,
        name: "Kaos Polos Premium",
        price: 150000,
        category: "pakaian",
        rating: 4.9,
        image: "images/3.jpg",
        description: "Kaos polos berbahan cotton combed 30s yang nyaman dipakai sehari-hari. Tersedia berbagai ukuran dan warna."
    },
    {
        id: 4,
        name: "Jam Tangan Sport",
        price: 450000,
        category: "aksesoris",
        rating: 4.7,
        image: "images/4.jpg",
        description: "Jam tangan sport dengan fitur heart rate monitor, GPS tracking, dan waterproof 50m. Desain sporty dan elegan."
    },
    {
        id: 5,
        name: "Sepatu Running",
        price: 750000,
        category: "olahraga",
        rating: 4.5,
        image: "images/5.jpg",
        description: "Sepatu running dengan teknologi cushioning untuk kenyamanan maksimal. Ringan dan breathable untuk latihan intens."
    },
    {
        id: 6,
        name: "Headphone Wireless",
        price: 1250000,
        category: "elektronik",
        rating: 4.4,
        image: "images/6.jpg",
        description: "Headphone wireless dengan noise cancellation aktif dan baterai tahan 30 jam. Kualitas suara studio grade."
    },
    {
        id: 7,
        name: "Jaket Hoodie",
        price: 350000,
        category: "pakaian",
        rating: 4.8,
        image: "images/putih1.jpg",
        description: "Jaket hoodie premium dengan bahan fleece yang hangat dan nyaman. Cocok untuk cuaca dingin atau casual style."
    },
    {
        id: 8,
        name: "Tas Ransel Multifungsi",
        price: 280000,
        category: "aksesoris",
        rating: 4.6,
        image: "images/putih2.jpg",
        description: "Tas ransel multifungsi dengan banyak kompartemen. Cocok untuk kerja, kuliah, atau traveling."
    }
];

let filteredProducts = [...products];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const categoryFilter = document.getElementById('categoryFilter');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const productModal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(filteredProducts);
    setupEventListeners();
    
    // Smooth scrolling untuk nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

function setupEventListeners() {
    // Category filter
    categoryFilter.addEventListener('change', filterProducts);
    
    // Search
    searchInput.addEventListener('input', filterProducts);
    
    // Sort
    sortSelect.addEventListener('change', sortProducts);
    
    // Category cards filter
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            categoryFilter.value = category;
            filterProducts();
            // Scroll to products
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function renderProducts(productsToRender) {
    productsGrid.innerHTML = productsToRender.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">Rp ${formatRupiah(product.price)}</div>
                <div class="product-rating">
                    ${getStarRating(product.rating)}
                    <span>(${product.rating})</span>
                </div>
                <button class="product-btn" onclick="openModal(${product.id})">
                    <i class="fas fa-eye"></i> Lihat Detail
                </button>
            </div>
        </div>
    `).join('');
}

function filterProducts() {
    const category = categoryFilter.value;
    const searchTerm = searchInput.value.toLowerCase();
    
    filteredProducts = products.filter(product => {
        const matchesCategory = category === 'all' || product.category === category;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                             product.description.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });
    
    sortProducts();
}

function sortProducts() {
    const sortValue = sortSelect.value;
    
    filteredProducts.sort((a, b) => {
        if (sortValue === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortValue === 'price-asc') {
            return a.price - b.price;
        } else if (sortValue === 'price-desc') {
            return b.price - a.price;
        }
        return 0;
    });
    
    renderProducts(filteredProducts);
}

function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        modalBody.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="modal-product-image">
            <div class="modal-product-info">
                <h2 class="modal-product-title">${product.name}</h2>
                <div class="modal-product-price">Rp ${formatRupiah(product.price)}</div>
                <div class="product-rating">
                    ${getStarRating(product.rating)}
                    <span>(${product.rating})</span>
                </div>
                <div class="modal-product-description">${product.description}</div>
                <div style="margin-top: 2rem;">
                    <button class="product-btn" style="width: 100%; padding: 15px; font-size: 1.1rem;">
                        <i class="fas fa-whatsapp"></i> Pesan via WhatsApp
                    </button>
                </div>
            </div>
        `;
        productModal.style.display = 'block';
    }
}

function closeModalFunc() {
    productModal.style.display = 'none';
}

function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID').format(number);
}

function getStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Modal event listeners
closeModal.addEventListener('click', closeModalFunc);
window.addEventListener('click', function(event) {
    if (event.target === productModal) {
        closeModalFunc();
    }
});

// Mobile menu toggle
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Lazy loading images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Sisanya sama persis dengan script.js sebelumnya, hanya tambahkan:
document.querySelector('.hamburger').addEventListener('click', function() {
    const navMenu = document.querySelector('nav');
    navMenu.classList.toggle('flex');
    navMenu.classList.toggle('flex-col');
    navMenu.classList.toggle('absolute');
    navMenu.classList.toggle('top-full');
    navMenu.classList.toggle('left-0');
    navMenu.classList.toggle('w-full');
    navMenu.classList.toggle('bg-gradient-to-r');
    navMenu.classList.toggle('from-indigo-500');
    navMenu.classList.toggle('to-purple-600');
    navMenu.classList.toggle('p-6');
    navMenu.classList.toggle('space-y-4');
    navMenu.classList.toggle('md:hidden');
});