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

// Whack-a-Mole Game Logic
document.addEventListener('DOMContentLoaded', () => {
    const holes = document.querySelectorAll('.game-hole');
    const scoreBoard = document.querySelector('#game-score');
    const timeBoard = document.querySelector('#game-time');
    const startBtn = document.querySelector('#start-game');
    const gameSection = document.querySelector('.minigame-section');

    let lastHole;
    let timeUp = false;
    let score = 0;
    let countdown;
    let gameTimer;

    // Set idle state initially
    if (gameSection) gameSection.classList.add('idle');

    function randomTime(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function randomHole(holes) {
        const idx = Math.floor(Math.random() * holes.length);
        const hole = holes[idx];
        if (hole === lastHole) {
            return randomHole(holes);
        }
        lastHole = hole;
        return hole;
    }

    function peep() {
        const time = randomTime(600, 1200);
        const hole = randomHole(holes);
        const mole = hole.querySelector('.mole');
        mole.classList.add('up');

        setTimeout(() => {
            mole.classList.remove('up');
            if (!timeUp) peep();
        }, time);
    }

    function startGame() {
        // Reset Stats
        score = 0;
        scoreBoard.textContent = 0;
        timeUp = false;
        startBtn.disabled = true;
        startBtn.innerHTML = '<i data-lucide="refresh-cw"></i> Playing...';
        lucide.createIcons();

        // Remove idle state
        gameSection.classList.remove('idle');

        // Start Mole Peeping
        peep();

        // Timer Logic
        let timeLeft = 30;
        timeBoard.textContent = timeLeft;

        countdown = setInterval(() => {
            timeLeft--;
            timeBoard.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(countdown);
            }
        }, 1000);

        gameTimer = setTimeout(() => {
            timeUp = true;
            startBtn.disabled = false;
            startBtn.innerHTML = '<i data-lucide="play"></i> Play Again';
            lucide.createIcons();
            gameSection.classList.add('idle');
            alert(`Game Over! Your score: ${score}`);
        }, 30000);
    }

    holes.forEach(hole => {
        const mole = hole.querySelector('.mole');
        mole.addEventListener('click', (e) => {
            if (!e.isTrusted) return; // Cheater!
            if (mole.classList.contains('up')) {
                score++;
                mole.classList.remove('up');
                mole.classList.add('hit');
                setTimeout(() => mole.classList.remove('hit'), 200);
                scoreBoard.textContent = score;
            }
        });

        // Touch support
        mole.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (mole.classList.contains('up')) {
                score++;
                mole.classList.remove('up');
                mole.classList.add('hit');
                setTimeout(() => mole.classList.remove('hit'), 200);
                scoreBoard.textContent = score;
            }
        });
    });

    if (startBtn) {
        startBtn.addEventListener('click', startGame);
    }
});
