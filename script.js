document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            const icon = menuToggle.querySelector('.material-symbols-outlined');
            if (icon) icon.textContent = isOpen ? 'close' : 'menu';
        });

        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('.material-symbols-outlined');
                if (icon) icon.textContent = 'menu';
            });
        });
    }

    // Nav scroll effect
    const mainNav = document.getElementById('main-nav');
    if (mainNav) {
        window.addEventListener('scroll', () => {
            mainNav.classList.toggle('nav-scrolled', window.scrollY > 40);
        }, { passive: true });
    }

    // Footer year
    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    // Seamless Marquee (JS-driven)
    const track = document.querySelector('.marquee-track');
    if (track) {
        const contents = track.querySelectorAll('.marquee-content');
        const speed = 0.5;
        let pos = 0;

        function loop() {
            pos -= speed;
            const w = contents[0].offsetWidth;
            if (Math.abs(pos) >= w) pos += w;
            track.style.transform = 'translateX(' + pos + 'px)';
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }

    // Active nav section highlighting
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
            link.classList.remove('active');
            if (link.classList.contains('nav-link') && link.getAttribute('href') && link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async e => {
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
    }

    // Typewriter
    const textElement = document.getElementById('typewriter');
    if (textElement) {
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
    }

    // Projects carousel
    const grid = document.getElementById('projects-grid');
    const inner = document.getElementById('projects-inner');
    const btnLeft = document.getElementById('slideLeft');
    const btnRight = document.getElementById('slideRight');

    if (grid && inner && btnLeft && btnRight) {
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
            inner.style.transform = 'translateX(-' + (currentIndex * cardWidth) + 'px)';
            btnLeft.disabled = currentIndex === 0;
            btnRight.disabled = currentIndex >= getMaxIndex();
        };

        const buttonClickAnimation = button => {
            button.classList.add('scale-90');
            setTimeout(() => button.classList.remove('scale-90'), 150);
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
    }

    // Experience toggle (More/Less)
    const toggleBtn = document.getElementById('toggle-btn');
    const moreText = document.getElementById('more-text');
    const dots = document.getElementById('dots');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
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

    // Scroll reveal + stagger grids
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    document.querySelectorAll('.stagger-grid').forEach(grid => observer.observe(grid));

    // Count up stats
    const countUp = el => {
        const target = parseInt(el.dataset.count, 10);
        if (isNaN(target)) return;
        const duration = 1200;
        const start = performance.now();
        const step = now => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased) + '+';
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target + '+';
        };
        requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

    // Theme toggle
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

    if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
    }

    if (darkIcon && lightIcon) updateIcons();

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

    // Unified smooth scroll with custom easing (back-to-top style)
    const smoothScrollTo = y => {
        const duration = 800;
        const start = window.scrollY;
        const startTime = performance.now();
        const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

        const step = currentTime => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            window.scrollTo(0, start + (y - start) * easeOutCubic(progress));
            if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    };

    // Smooth scroll for all in-page section anchors (nav, hero, footer)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        const hash = link.getAttribute('href');
        if (!hash || hash === '#') return;
        const target = document.getElementById(hash.substring(1));
        if (!target) return;
        link.addEventListener('click', e => {
            e.preventDefault();
            smoothScrollTo(target.offsetTop);
        });
    });

    // Scroll progress + back to top
    const progressBar = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');
    let wasVisible = false;

    const updateScrollUI = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (progressBar) progressBar.style.width = progress + '%';

        if (backToTop) {
            if (scrollTop > 400 && !wasVisible) {
                wasVisible = true;
                backToTop.classList.remove('opacity-0', 'pointer-events-none', 'hiding');
                backToTop.classList.add('visible', 'pointer-events-auto');
            } else if (scrollTop <= 400 && wasVisible) {
                wasVisible = false;
                backToTop.classList.remove('visible');
                backToTop.classList.add('hiding');
                const onEnd = () => {
                    backToTop.classList.remove('hiding');
                    backToTop.classList.add('opacity-0', 'pointer-events-none');
                    backToTop.removeEventListener('animationend', onEnd);
                };
                backToTop.addEventListener('animationend', onEnd);
            }
        }
    };

    window.addEventListener('scroll', updateScrollUI, { passive: true });
    updateScrollUI();

    if (backToTop) {
        backToTop.addEventListener('click', () => smoothScrollTo(0));
    }

    // Certificate lightbox
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lbImage = document.getElementById('lb-image');
        const lbCounter = document.getElementById('lb-counter');
        const lbClose = document.getElementById('lb-close');
        const lbPrev = document.getElementById('lb-prev');
        const lbNext = document.getElementById('lb-next');
        const certImages = Array.from(document.querySelectorAll('#training .project-card img'));
        let currentIndex = 0;

        const show = index => {
            if (index < 0) index = certImages.length - 1;
            if (index >= certImages.length) index = 0;
            currentIndex = index;
            lbImage.src = certImages[currentIndex].getAttribute('src');
            lbImage.alt = certImages[currentIndex].getAttribute('alt') || 'Certificate';
            lbCounter.textContent = (currentIndex + 1) + ' / ' + certImages.length;
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(() => lightbox.classList.add('open'));
        };

        const close = () => {
            lightbox.classList.remove('open');
            setTimeout(() => {
                lightbox.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        };

        certImages.forEach((img, i) => {
            img.addEventListener('click', () => {
                lightbox.classList.remove('hidden');
                show(i);
            });
        });

        lbClose.addEventListener('click', close);
        lbPrev.addEventListener('click', e => {
            e.stopPropagation();
            show(currentIndex - 1);
        });
        lbNext.addEventListener('click', e => {
            e.stopPropagation();
            show(currentIndex + 1);
        });

        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) close();
        });

        document.addEventListener('keydown', e => {
            if (lightbox.classList.contains('open')) {
                if (e.key === 'Escape') close();
                if (e.key === 'ArrowLeft') show(currentIndex - 1);
                if (e.key === 'ArrowRight') show(currentIndex + 1);
            }
        });
    }
});
