/* ========================================
   Robotics Corner - Interactive JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initCounterAnimation();
    initContactForm();
    initSlider();
    initLightbox();
    initSkillMatrix();
});

/* ========================================
   Navbar Scroll Effect
   ======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Add/remove scrolled class
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    });
}

/* ========================================
   Mobile Menu Toggle
   ======================================== */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

/* ========================================
   Smooth Scroll Navigation
   ======================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

    window.addEventListener('scroll', () => {
        let current = '';
        const navbarHeight = document.getElementById('navbar').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

/* ========================================
   Scroll Animations (Intersection Observer)
   ======================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/* ========================================
   Counter Animation
   ======================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-value[data-target]');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const easeOutQuad = t => t * (2 - t);

    const counter = setInterval(() => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        const currentValue = Math.round(target * progress);

        element.textContent = currentValue;

        if (frame === totalFrames) {
            clearInterval(counter);
            element.textContent = target + (target === 100 ? '%' : '+');
        }
    }, frameDuration);
}

/* ========================================
   Contact Form Handling
   ======================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = `
        <svg class="btn-icon" style="animation: spin 1s linear infinite;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
        Sending...
      `;
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success state
            submitBtn.innerHTML = `
        <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        Message Sent!
      `;
            submitBtn.style.background = '#4ade80';

            // Reset form after delay
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        });

        // Add focus styles
        form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('focus', () => {
                field.parentElement.classList.add('focused');
            });
            field.addEventListener('blur', () => {
                field.parentElement.classList.remove('focused');
            });
        });
    }
}

/* ========================================
   Slider Functionality
   ======================================== */
function initSlider() {
    const slider = document.querySelector('.slider');
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-arrow-prev');
    const nextBtn = document.querySelector('.slider-arrow-next');
    const dots = document.querySelectorAll('.slider-dot');
    const progressBar = document.querySelector('.slider-progress-bar');

    if (!slider || !track || slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;
    const autoAdvanceInterval = 6000; // 6 seconds
    let autoAdvanceTimer = null;
    let isPaused = false;

    // Touch/swipe state
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    function goToSlide(index) {
        // Wrap around
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;

        // Remove active from current slide
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        dots[currentSlide].setAttribute('aria-selected', 'false');

        // Update index
        currentSlide = index;

        // Move track
        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Activate new slide (small delay so transition looks right)
        setTimeout(() => {
            slides[currentSlide].classList.add('active');
        }, 100);

        // Update dots
        dots[currentSlide].classList.add('active');
        dots[currentSlide].setAttribute('aria-selected', 'true');

        // Restart progress bar
        restartProgress();

        // Reset auto-advance timer
        resetAutoAdvance();
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function restartProgress() {
        if (progressBar) {
            progressBar.style.animation = 'none';
            progressBar.offsetHeight; // Force reflow
            progressBar.style.animation = `sliderProgress ${autoAdvanceInterval}ms linear forwards`;
        }
    }

    function startAutoAdvance() {
        stopAutoAdvance();
        if (!isPaused) {
            autoAdvanceTimer = setInterval(() => {
                nextSlide();
            }, autoAdvanceInterval);
        }
    }

    function stopAutoAdvance() {
        if (autoAdvanceTimer) {
            clearInterval(autoAdvanceTimer);
            autoAdvanceTimer = null;
        }
    }

    function resetAutoAdvance() {
        stopAutoAdvance();
        startAutoAdvance();
    }

    // Arrow click handlers
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
        });
    }

    // Dot click handlers
    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });

    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        isPaused = true;
        stopAutoAdvance();
        if (progressBar) {
            progressBar.style.animationPlayState = 'paused';
        }
    });

    slider.addEventListener('mouseleave', () => {
        isPaused = false;
        startAutoAdvance();
        if (progressBar) {
            progressBar.style.animationPlayState = 'running';
        }
    });

    // Touch / Swipe support
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left = next
            } else {
                prevSlide(); // Swipe right = prev
            }
        }
    }, { passive: true });

    // Keyboard navigation
    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide();
        }
    });

    // Initialize: ensure first slide is active and start
    slides[0].classList.add('active');
    restartProgress();
    startAutoAdvance();
}

/* ========================================
   Utility: Add CSS for spinner animation
   ======================================== */
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

/* ========================================
   Optional: Parallax Effect for Hero
   ======================================== */
function initParallax() {
    const heroGrid = document.querySelector('.hero-grid');

    if (heroGrid) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            heroGrid.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    }
}

// Uncomment to enable parallax
// initParallax();

/* ========================================
   Optional: Typing Effect for Hero
   ======================================== */
function initTypingEffect() {
    const words = ['Autonomous Systems', 'Embedded Solutions', 'Robotics Innovation', 'Automotive Excellence'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.text-gradient');

    if (!typingElement) return;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(type, typingSpeed);
    }

    // Uncomment to enable typing effect
    // type();
}

/* ========================================
   Image Lightbox / Zoom
   ======================================== */
function initLightbox() {
    const overlay = document.getElementById('lightboxOverlay');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxClose');

    if (!overlay || !lightboxImg) return;

    // Find all content images (skip logo, icons, SVGs)
    const images = document.querySelectorAll(
        '.about-image img, .process-card img, .portfolio-image img'
    );

    images.forEach(img => {
        img.classList.add('zoomable-img');

        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || 'Zoomed image';
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        // Clear src after animation completes
        setTimeout(() => {
            if (!overlay.classList.contains('active')) {
                lightboxImg.src = '';
            }
        }, 450);
    }

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    // Click on backdrop (not the image itself)
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.classList.contains('lightbox-img-wrapper')) {
            closeLightbox();
        }
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeLightbox();
        }
    });
}

/* ========================================
   Interactive Skill Matrix Filtering & Search
   ======================================== */
function initSkillMatrix() {
    const searchInput = document.getElementById('skillSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.matrix-card');

    if (!searchInput && filterButtons.length === 0 && cards.length === 0) return;

    let activeFilter = 'all';
    let searchQuery = '';

    function filterSkills() {
        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            const title = card.querySelector('h3').textContent.toLowerCase();
            const tools = card.querySelector('.matrix-card-tools').textContent.toLowerCase();
            const categoryText = card.querySelector('.matrix-card-category').textContent.toLowerCase();
            
            // Gather all level descriptions
            let levelTexts = '';
            card.querySelectorAll('.level-text, .level-badge').forEach(el => {
                levelTexts += el.textContent.toLowerCase() + ' ';
            });

            const matchesCategory = activeFilter === 'all' || category === activeFilter;
            const matchesSearch = title.includes(searchQuery) || 
                                  tools.includes(searchQuery) || 
                                  categoryText.includes(searchQuery) ||
                                  levelTexts.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterSkills();
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add to current
            btn.classList.add('active');
            activeFilter = btn.getAttribute('data-filter');
            filterSkills();
        });
    });
}
