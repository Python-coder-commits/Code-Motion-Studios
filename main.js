document.addEventListener('DOMContentLoaded', function() {
    // Get all necessary DOM elements once
    const hamburger = document.getElementById('hamburger');
    const navElements = document.getElementById('nav-elements');
    const body = document.body;
    const scrollToTop = document.getElementById('scrollToTop');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    const searchBtn = document.querySelector('.search-btn');
    const searchContainer = document.querySelector('.search-container');
    const serviceDropdown = document.querySelector('.services-dropdown');
    const contactForm = document.querySelector('.contact-form');

    // Menu handling
    function toggleMenu(show) {
        if (!hamburger || !navElements) return;
        const isActive = show ?? !hamburger.classList.contains('active');
        
        hamburger.classList.toggle('active', isActive);
        navElements.classList.toggle('active', isActive);
        body.classList.toggle('menu-open', isActive);
    }

    // Initialize event listeners
    if (hamburger && navElements) {
        // Toggle menu
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navElements.contains(e.target) && !hamburger.contains(e.target)) {
                toggleMenu(false);
            }
        });

        // Close menu when clicking links
        navElements.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                toggleMenu(false);
            }
        });
    }

    // Scroll to top
    if (scrollToTop) {
        window.addEventListener('scroll', () => {
            scrollToTop.classList.toggle('visible', window.scrollY > 300);
        });

        scrollToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Mobile viewport height fix
    function setVH() {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    }
    setVH();
    window.addEventListener('resize', setVH);

    // Form handling
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form submission logic here
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Mobile dropdown handling
    if (serviceDropdown) {
        serviceDropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                serviceDropdown.classList.toggle('active');
            }
        });
    }

    // Mobile search handling
    if (searchBtn && searchContainer) {
        searchBtn.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                searchContainer.classList.toggle('active');
            }
        });
    }

    // Remove any duplicate event listeners on cleanup
    return () => {
        document.removeEventListener('keydown');
        window.removeEventListener('resize', setVH);
    };
});
