// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Element Selections ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const orb = document.getElementById('spaceship-orb');

    // --- Orb Parallax Scroll Handler ---
    const handleOrbScroll = () => {
        // Only run the parallax effect if the orb is visible (i.e., in space theme)
        if (body.classList.contains('space-theme')) {
            const scrollY = window.scrollY;
            // Move orb up at half the scroll speed for a parallax effect
            orb.style.transform = `translateX(+150%) translateY(${scrollY * -0.5}px)`;
        }
    };
    
    // --- Theme Management ---
    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.remove('space-theme');
            themeToggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
            window.removeEventListener('scroll', handleOrbScroll); // Disable parallax
        } else {
            body.classList.add('space-theme');
            themeToggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
            window.addEventListener('scroll', handleOrbScroll); // Enable parallax
        }
    };

    themeToggleButton.addEventListener('click', () => {
        const newTheme = body.classList.contains('space-theme') ? 'light' : 'space';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
    
    // Load saved theme on initial page load
    const savedTheme = localStorage.getItem('theme') || 'space'; // Default to space
    applyTheme(savedTheme);


    // --- Mobile Menu Toggler ---
    const menuToggleButton = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    menuToggleButton.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggleButton.querySelector('i');
        icon.classList.toggle('fa-bars'); icon.classList.toggle('fa-times');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggleButton.querySelector('i').classList.add('fa-bars');
                menuToggleButton.querySelector('i').classList.remove('fa-times');
            }
        });
    });

    // --- Scroll-based Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    
    // --- Active Navigation Link Highlighting ---
    const sections = document.querySelectorAll('section[id]');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.nav-link.active').forEach(link => link.classList.remove('active'));
                const navLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if(navLink) navLink.classList.add('active');
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });
    sections.forEach(section => navObserver.observe(section));
    const quotes = [
        {
        text: "七転び八起き (Nanakorobi yaoki) – Fall down seven times, stand up eight.",
        author: "Japanese Proverb"
        // Meaning: Never give up, no matter how many times life knocks you down.
    },

    // Sanskrit Quote
    {
        text: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्। आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
        author: "Bhagavad Gita 6.5",
        Meaning: "Lift yourself by yourself. Do not let yourself fall. You are your own best friend, and your own worst enemy."
    },
       { text: "Believe you can and you’re halfway there.", author: "Theodore Roosevelt",
         text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Strive for progress, not perfection.", author: "Personal Belief" ,
     text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
    
];

    const quoteTextElem = document.getElementById('quote-text');
    const quoteAuthorElem = document.getElementById('quote-author');
    const quoteCardElem = document.querySelector('.quote-card');
    let currentQuoteIndex = 0;

    function updateQuote() {
        if (!quoteTextElem || !quoteAuthorElem || !quoteCardElem) return;

        // Fade out
        quoteCardElem.classList.add('fade');

        setTimeout(() => {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            quoteTextElem.textContent = `“${quotes[currentQuoteIndex].text}”`;
            quoteAuthorElem.textContent = `— ${quotes[currentQuoteIndex].author}`;
            // Fade in
            quoteCardElem.classList.remove('fade');
        }, 500); // This timeout should match the CSS transition duration
    }

    // Initial quote
    updateQuote(); 

    // Rotate quote every 5 seconds
    setInterval(updateQuote, 5000);

});