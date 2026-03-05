// ========================================
// ECOS - Viaje Sensorial
// JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // Respect user's reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // ========================================
    // Particles Background
    // ========================================
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        // Reduce visual noise for users who prefer less motion
        const particleCount = prefersReducedMotion ? 0 : 50;
        if (particleCount === 0) return;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    createParticles();
    
    // ========================================
    // Scroll Effects (navbar, progress, parallax)
    // ========================================
    const navbar = document.querySelector('.navbar');
    const heroBg = document.querySelector('.hero-bg img');
    let progressBar = null;
    let scrollTicking = false;
    
    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    function openMenu() {
        if (!menuToggle || !navLinks) return;
        menuToggle.classList.add('active');
        navLinks.classList.add('active');
        document.body.classList.add('menu-open');
        menuToggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        if (!menuToggle || !navLinks) return;
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = navLinks.classList.contains('active');
            isOpen ? closeMenu() : openMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.classList.contains('active')) return;
            const clickedInsideNav = navLinks.contains(e.target) || menuToggle.contains(e.target);
            if (!clickedInsideNav) closeMenu();
        });

        // Close menu if we resize to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) closeMenu();
        });
    }
    
    // ========================================
    // FAQ Accordion
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // ========================================
    // Scroll Reveal Animation (IntersectionObserver)
    // ========================================
    document.querySelectorAll('.section-title, .section-title-large, .work-item, .service-item, .testimonial-card, .blog-card').forEach(el => {
        el.classList.add('reveal');
    });
    
    // ========================================
    // Smooth Scroll for Navigation Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMenu();
            }
        });
    });
    
    // ========================================
    // Work Items Hover Effect
    // ========================================
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            workItems.forEach(i => {
                if (i !== item) {
                    i.style.opacity = '0.5';
                }
            });
        });
        
        item.addEventListener('mouseleave', function() {
            workItems.forEach(i => {
                i.style.opacity = '1';
            });
        });
    });
    
    // ========================================
    // Service Items Image Preview
    // ========================================
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        const image = item.querySelector('.service-image');
        
        item.addEventListener('mouseenter', function() {
            if (image) {
                image.style.opacity = '1';
                image.style.transform = 'translateX(0)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (image) {
                image.style.opacity = '0';
                image.style.transform = 'translateX(20px)';
            }
        });
    });
    
    // ========================================
    // Contact Form
    // ========================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const type = document.getElementById('type').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email) {
                alert('Por favor completa los campos obligatorios.');
                return;
            }
            
            // Show success message
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // ========================================
    // Scroll Progress Indicator
    // ========================================
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 2px;
            background: var(--color-accent);
            z-index: 10000;
            transition: width 0.1s;
        `;
        document.body.appendChild(progressBar);

        return progressBar;
    }
    progressBar = createScrollProgress();
    
    // ========================================
    // Intersection Observer for Animations
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // ========================================
    // Single rAF-throttled scroll handler
    // ========================================
    function updateOnScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;

        // Navbar
        if (navbar) {
            navbar.classList.toggle('scrolled', scrollTop > 100);
        }

        // Scroll progress
        if (progressBar) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = scrollPercent + '%';
        }

        // Hero parallax (disable for reduced motion)
        if (heroBg && !prefersReducedMotion) {
            const rate = scrollTop * 0.25;
            heroBg.style.transform = `translate3d(0, ${rate}px, 0)`;
        }

        scrollTicking = false;
    }

    function onScroll() {
        if (scrollTicking) return;
        scrollTicking = true;
        window.requestAnimationFrame(updateOnScroll);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    updateOnScroll();
    
    // ========================================
    // Typing Effect for Hero Subtitle
    // ========================================
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Apply typing effect to hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 80);
        }, 800);
    }
    
    // ========================================
    // Cursor Effect (Desktop Only)
    // ========================================
    if (window.matchMedia('(pointer: fine)').matches) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: none;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s, width 0.2s, height 0.2s;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(cursor);
        
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        cursorDot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--color-accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(cursorDot);
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            /*cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';*/
        });
        
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Hover effects
        document.querySelectorAll('a, button, .work-item, .service-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                /*cursor.style.borderColor = 'var(--color-accent)';*/
                cursor.style.backgroundColor = 'rgba(234, 234, 234, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                /*cursor.style.borderColor = 'rgba(234, 234, 234, 0.2)';*/
                cursor.style.backgroundColor = 'rgba(234, 234, 234, 0.1)';
            });
        });
    }
    
    // ========================================
    // Keyboard Navigation
    // ========================================
    document.addEventListener('keydown', function(e) {
        // ESC to close FAQ
        if (e.key === 'Escape') {
            faqItems.forEach(item => item.classList.remove('active'));
            closeMenu();
        }
    });
    
    // ========================================
    // Performance: Pause animations when tab is hidden
    // ========================================
    document.addEventListener('visibilitychange', function() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(p => {
            p.style.animationPlayState = document.hidden ? 'paused' : 'running';
        });
    });
    
    console.log('🌿 ECOS - Viaje Sensorial loaded successfully');
});
