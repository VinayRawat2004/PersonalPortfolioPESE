document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const starsBgContainer = document.getElementById('stars-bg-container');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const navBar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    // --- Theme Management ---
    function applyTheme(theme) {
        if (theme === 'classic') {
            body.classList.add('classic-theme');
            themeToggle.textContent = '🌞'; // Sun icon for classic theme
            themeToggle.title = 'Switch to Galaxy Mode';
            if (starsBgContainer) starsBgContainer.style.display = 'none';
            if (scrollToTopBtn) scrollToTopBtn.textContent = '⬆️'; 
        } else { // Galaxy theme
            body.classList.remove('classic-theme');
            themeToggle.textContent = '🌌'; // Galaxy icon for galaxy theme
            themeToggle.title = 'Switch to Classic Mode';
            if (starsBgContainer) starsBgContainer.style.display = 'block';
            if (scrollToTopBtn) scrollToTopBtn.textContent = '🚀';
        }
        // Update nav logo color based on theme, if it needs specific override
        // const navLogo = document.querySelector('.nav-logo');
        // if (navLogo) navLogo.style.color = theme === 'classic' ? 'var(--classic-accent)' : 'var(--galaxy-accent)';
    }

    function toggleTheme() {
        const newTheme = body.classList.contains('classic-theme') ? 'galaxy' : 'classic';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // Load saved theme or default to galaxy
    const savedTheme = localStorage.getItem('theme') || 'galaxy';
    applyTheme(savedTheme);
    themeToggle.addEventListener('click', toggleTheme);


    // --- Star Background Generation ---
    function createStars() {
        if (!starsBgContainer) return;
        const numStars = 120; // Increased star count
        starsBgContainer.innerHTML = ''; // Clear existing stars if any
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            const size = Math.random() * 2.2 + 0.3; // Stars between 0.3px and 2.5px
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDelay = `${Math.random() * 3}s`; // Randomize start
            star.style.animationDuration = `${Math.random() * 2.5 + 2}s`; // Vary twinkle speed
            starsBgContainer.appendChild(star);
        }
    }
    if (savedTheme === 'galaxy') { // Only create stars if galaxy theme is active initially
        createStars();
    }
    // Recreate stars if theme is switched to galaxy and starsBgContainer becomes visible
    new MutationObserver((mutationsList) => {
        for(const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                if (starsBgContainer.style.display === 'block' && starsBgContainer.children.length === 0) {
                    createStars();
                }
            }
        }
    }).observe(starsBgContainer, { attributes: true });


    // --- Mobile Navigation Toggle ---
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });

        // Close mobile menu when a link is clicked or when clicking outside
        document.querySelectorAll('#navLinks a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
        document.addEventListener('click', (event) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }


    // --- Scroll to Top Button ---
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
                scrollToTopBtn.style.display = "flex";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        });
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Navbar Scroll Effect ---
    if (navBar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navBar.classList.add('scrolled');
            } else {
                navBar.classList.remove('scrolled');
            }
        });
    }

    // --- Animate on Scroll ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.1 }); 

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // --- Update Current Year in Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Active Nav Link Highlighting ---
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    if (sections.length > 0 && navItems.length > 0) {
        window.addEventListener('scroll', () => {
            let currentSectionId = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                // A bit more offset to activate link slightly before section top reaches viewport top
                if (pageYOffset >= (sectionTop - sectionHeight / 2.5)) { 
                    currentSectionId = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').substring(1) === currentSectionId) {
                    item.classList.add('active');
                }
            });
        });
    }
});