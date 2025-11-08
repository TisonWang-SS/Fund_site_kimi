// ========================================
// Prosper Hills Capital - JavaScript
// Production-ready with performance optimizations
// ========================================

// DOM Ready
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initNavbar();
    initScrollAnimations();
    initHamburgerMenu();
    initChartAnimations();
    initSmoothScrolling();
});

// ========================================
// Navbar scroll effect
// ========================================
function initNavbar() {
    const navbar = document.getElementById('navbar');

    // Throttled scroll handler
    let ticking = false;

    function updateNavbar() {
        const scrolled = window.scrollY > 50;
        navbar.classList.toggle('scrolled', scrolled);
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
}

// ========================================
// Scroll animations using Intersection Observer
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in, .chart-bar').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// Hamburger menu for mobile
// ========================================
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// ========================================
// Chart animations on scroll
// ========================================
function initChartAnimations() {
    const chartBars = document.querySelectorAll('.chart-bar');

    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.width || '50';
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
                chartObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    chartBars.forEach(bar => {
        chartObserver.observe(bar);
    });
}

// ========================================
// Smooth scrolling for anchor links
// ========================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Form handling with validation
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            // Optional: Add custom validation before submission
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff4444';
                } else {
                    field.style.borderColor = 'rgba(184, 134, 11, 0.2)';
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    }
});

// ========================================
// Debounce utility for performance
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// Resize handler with debounce
// ========================================
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}, 250));

// ========================================
// Performance monitoring
// ========================================
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}