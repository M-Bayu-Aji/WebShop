// Modern Interactive Web Shop JavaScript
// Bays Shop - Interactive Features

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 BaysShop Interactive Features Loaded');
    
    // Initialize all features
    initializeHeader();
    initializeHero();
    initializeProductFilters();
    initializeProductCards();
    initializeContactForm();
    initializeNewsletter();
    initializeSmoothScrolling();
    initializeScrollAnimations();
    initializeShoppingCart();
});

// Header Functions
function initializeHeader() {
    const header = document.querySelector('.modern-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    // Scroll effect for header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Search functionality
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                searchProducts(query);
            }
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    searchProducts(query);
                }
            }
        });
    }
    
    // Active nav link based on scroll position
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Hero Animations
function initializeHero() {
    const heroElements = document.querySelectorAll('.hero-text > *, .hero-visual > *');
    
    // Stagger animation for hero elements
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Floating animation for hero icons
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach(icon => {
        setInterval(() => {
            icon.style.transform += ' translateY(-5px)';
            setTimeout(() => {
                icon.style.transform = icon.style.transform.replace(' translateY(-5px)', '');
            }, 1000);
        }, 3000 + Math.random() * 2000);
    });
}

// Product Filter System
function initializeProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            productCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                
                if (filter === 'all' || category.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Product Card Interactions
function initializeProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    const quickBtns = document.querySelectorAll('.quick-btn');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    
    // Quick action buttons
    quickBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const action = btn.getAttribute('title');
            
            // Add visual feedback
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
            
            // Handle different actions
            switch(action) {
                case 'Tambah ke Favorit':
                    toggleFavorite(btn);
                    break;
                case 'Quick View':
                    openQuickView(btn);
                    break;
                case 'Bandingkan':
                    addToCompare(btn);
                    break;
            }
        });
    });
    
    // Add to cart functionality
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart(btn);
        });
    });
    
    // Product card hover effects
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Shopping Cart Functions
function initializeShoppingCart() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Update cart count
    updateCartCount();
    
    function updateCartCount() {
        if (cartCount) {
            cartCount.textContent = cartItems.length;
        }
    }
    
    window.addToCart = function(btn) {
        const productCard = btn.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        const productPrice = productCard.querySelector('.current-price').textContent;
        const productImage = productCard.querySelector('.product-image').src;
        
        const product = {
            id: Date.now(),
            title: productTitle,
            price: productPrice,
            image: productImage,
            quantity: 1
        };
        
        cartItems.push(product);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
        
        // Visual feedback
        showNotification('Produk berhasil ditambahkan ke keranjang!', 'success');
        
        // Animate cart button
        if (cartBtn) {
            cartBtn.classList.add('bounce');
            setTimeout(() => cartBtn.classList.remove('bounce'), 600);
        }
    };
}

// Contact Form Functions
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form .form');
    const inputs = document.querySelectorAll('.form-input');
    
    // Add floating label effect
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateContactForm(data)) {
                submitContactForm(data);
            }
        });
    }
}

// Newsletter Functions
function initializeNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                subscribeNewsletter(email);
            } else {
                showNotification('Email tidak valid!', 'error');
            }
        });
    }
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.modern-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .product-card, .contact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Utility Functions
function searchProducts(query) {
    console.log('Searching for:', query);
    showNotification(`Mencari produk: "${query}"`, 'info');
    
    // Here you would implement actual search functionality
    // For now, we'll just scroll to products section
    document.querySelector('#produts').scrollIntoView({ behavior: 'smooth' });
}

function toggleFavorite(btn) {
    const icon = btn.querySelector('.material-symbols-outlined');
    
    if (icon.textContent === 'favorite_border') {
        icon.textContent = 'favorite';
        btn.style.color = '#e53e3e';
        showNotification('Ditambahkan ke favorit!', 'success');
    } else {
        icon.textContent = 'favorite_border';
        btn.style.color = '';
        showNotification('Dihapus dari favorit!', 'info');
    }
}

function openQuickView(btn) {
    const productCard = btn.closest('.product-card');
    const productTitle = productCard.querySelector('.product-title').textContent;
    
    showNotification(`Quick view: ${productTitle}`, 'info');
    // Here you would open a modal with product details
}

function addToCompare(btn) {
    const productCard = btn.closest('.product-card');
    const productTitle = productCard.querySelector('.product-title').textContent;
    
    showNotification(`${productTitle} ditambahkan ke perbandingan`, 'info');
    // Here you would add to comparison list
}

function validateContactForm(data) {
    const required = ['nama', 'email', 'phone', 'message'];
    
    for (let field of required) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Field ${field} harus diisi!`, 'error');
            return false;
        }
    }
    
    if (!validateEmail(data.email)) {
        showNotification('Format email tidak valid!', 'error');
        return false;
    }
    
    return true;
}

function submitContactForm(data) {
    // Simulate form submission
    showNotification('Mengirim pesan...', 'info');
    
    setTimeout(() => {
        showNotification('Pesan berhasil dikirim! Kami akan merespons dalam 24 jam.', 'success');
        document.querySelector('.contact-form .form').reset();
    }, 2000);
}

function subscribeNewsletter(email) {
    showNotification('Mendaftarkan email...', 'info');
    
    setTimeout(() => {
        showNotification('Terima kasih! Anda telah berlangganan newsletter kami.', 'success');
        document.querySelector('.newsletter-form input').value = '';
    }, 1500);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        zIndex: '10000',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        color: 'white',
        fontSize: '0.9rem',
        fontWeight: '600',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease',
        maxWidth: '350px',
        background: getNotificationColor(type)
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
        info: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
    };
    return colors[type] || colors.info;
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .cart-btn.bounce {
        animation: bounce 0.6s ease;
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .input-group.focused {
        border-color: #6ee7b7 !important;
        box-shadow: 0 0 0 3px rgba(110, 231, 183, 0.1) !important;
    }
    
    .main-nav.active {
        display: block !important;
    }
    
    .menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

console.log('✨ BaysShop JavaScript Initialized Successfully!');