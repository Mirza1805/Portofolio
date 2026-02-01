document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const icon = navLinks.classList.contains('open') ? 'x' : 'menu';
        mobileBtn.innerHTML = `<i data-lucide="${icon}"></i>`;
        lucide.createIcons();
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            mobileBtn.innerHTML = `<i data-lucide="menu"></i>`;
            lucide.createIcons();
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
});

// Cursor Glow Effect
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Check if cursorGlow exists before trying to style it
    if (cursorGlow) {
        cursorGlow.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.15), transparent 80%)`;
    }
});

// Featured Project Slider
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.featured-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slider-slide');
    const indicators = slider.querySelectorAll('.indicator');
    const prevBtn = slider.querySelector('.slider-nav.prev');
    const nextBtn = slider.querySelector('.slider-nav.next');

    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        // Handle wrap around
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 1;

        currentSlide = index;

        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });

        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentSlide);
        });
    }

    // Arrow navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    }

    // Indicator clicks
    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => showSlide(i));
    });

    // Keyboard navigation
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') showSlide(currentSlide - 1);
        if (e.key === 'ArrowRight') showSlide(currentSlide + 1);
    });

    // Optional: Auto-play slider
    // setInterval(() => showSlide(currentSlide + 1), 5000);
});
