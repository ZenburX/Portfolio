const menuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
            b.classList.remove('bg-primary', 'text-on-primary');
            b.classList.add('bg-surface-container', 'text-on-surface-variant');
        });
        btn.classList.add('bg-primary', 'text-on-primary');
        btn.classList.remove('bg-surface-container', 'text-on-surface-variant');

        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-primary', 'border-b-2', 'border-primary', 'pb-1');
        if (link.getAttribute('href') && link.getAttribute('href').includes(current) && current !== '') {
            link.classList.add('text-primary', 'border-b-2', 'border-primary', 'pb-1');
        }
    });
});

document.getElementById('contact-form').addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerText;

    btn.innerText = 'Sending...';
    btn.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' },
        });

        if (response.ok) {
            btn.innerText = 'Message Sent!';
            btn.classList.replace('bg-primary', 'bg-green-600');
            form.reset();
        } else {
            throw new Error();
        }
    } catch {
        btn.innerText = 'Failed to Send';
        btn.classList.replace('bg-primary', 'bg-red-600');
    }

    setTimeout(() => {
        btn.innerText = originalText;
        btn.disabled = false;
        btn.classList.remove('bg-green-600', 'bg-red-600');
        btn.classList.add('bg-primary');
    }, 3000);
});

document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('typewriter');
    if (!textElement) return;

    const phrases = [' Web Developer', ' IT Programmer'];
    let phraseIndex = 0;
    let charIndex = phrases[0].length; 
    let isDeleting = true; 

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            charIndex--;
            textElement.textContent = currentPhrase.substring(0, charIndex);
        } else {
            charIndex++;
            textElement.textContent = currentPhrase.substring(0, charIndex);
        }

        let typingSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 3000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 2000);
});

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('projects-grid');
    const inner = document.getElementById('projects-inner');
    const btnLeft = document.getElementById('slideLeft');
    const btnRight = document.getElementById('slideRight');

    if (!grid || !inner || !btnLeft || !btnRight) return;

    let currentIndex = 0;

    const getCardWidth = () => {
        const card = inner.querySelector('.project-card');
        if (!card) return grid.clientWidth;
        const gap = parseFloat(window.getComputedStyle(inner).columnGap) || 0;
        return card.offsetWidth + gap;
    };

    const getVisibleCount = () => {
        const card = inner.querySelector('.project-card');
        if (!card) return 1;
        return Math.round(grid.clientWidth / card.offsetWidth) || 1;
    };

    const getMaxIndex = () => {
        const cards = inner.querySelectorAll('.project-card');
        return Math.max(0, cards.length - getVisibleCount());
    };

    const updatePosition = () => {
        const cardWidth = getCardWidth();
        inner.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        btnLeft.disabled = currentIndex === 0;
        btnRight.disabled = currentIndex >= getMaxIndex();
    };

    const buttonClickAnimation = button => {
        button.classList.add('scale-90');
        setTimeout(() => {
            button.classList.remove('scale-90');
        }, 150);
    };

    btnLeft.addEventListener('click', () => {
        if (currentIndex <= 0) return;
        currentIndex--;
        buttonClickAnimation(btnLeft);
        updatePosition();
    });

    btnRight.addEventListener('click', () => {
        if (currentIndex >= getMaxIndex()) return;
        currentIndex++;
        buttonClickAnimation(btnRight);
        updatePosition();
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            currentIndex = Math.min(currentIndex, getMaxIndex());
            updatePosition();
        }, 150);
    });

    updatePosition();
});

document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('toggle-btn');
    const moreText = document.getElementById('more-text');
    const dots = document.getElementById('dots');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            if (moreText.classList.contains('hidden')) {
                moreText.classList.remove('hidden');
                dots.classList.add('hidden');
                toggleBtn.textContent = 'Less';
            } else {
                moreText.classList.add('hidden');
                dots.classList.remove('hidden');
                toggleBtn.textContent = 'More';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    function updateIcons() {
        if (document.documentElement.classList.contains('dark')) {
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        } else {
            darkIcon.classList.remove('hidden');
            lightIcon.classList.add('hidden');
        }
    }

    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    updateIcons();

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
            updateIcons();
        });
    }
});
