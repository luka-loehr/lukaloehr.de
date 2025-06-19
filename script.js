// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Create loader
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="loader-text">Loading...</div>';
    document.body.appendChild(loader);
    
    // Loading animation
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.add('loaded');
            
            // Initialize everything after load
            initializeAnimations();
            initializeCursor();
            initializeParticles();
            initializeScrollEffects();
            initializeInteractions();
        }, 800);
    });

    // Custom cursor
    function initializeCursor() {
        if (window.innerWidth > 768) {
            const cursor = document.createElement('div');
            const cursorDot = document.createElement('div');
            cursor.className = 'cursor';
            cursorDot.className = 'cursor-dot';
            document.body.appendChild(cursor);
            document.body.appendChild(cursorDot);

            let mouseX = 0;
            let mouseY = 0;
            let cursorX = 0;
            let cursorY = 0;
            let dotX = 0;
            let dotY = 0;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            // Smooth cursor animation
            function animateCursor() {
                const speed = 0.15;
                const dotSpeed = 0.8;
                
                cursorX += (mouseX - cursorX) * speed;
                cursorY += (mouseY - cursorY) * speed;
                cursor.style.left = cursorX + 'px';
                cursor.style.top = cursorY + 'px';
                
                dotX += (mouseX - dotX) * dotSpeed;
                dotY += (mouseY - dotY) * dotSpeed;
                cursorDot.style.left = dotX + 'px';
                cursorDot.style.top = dotY + 'px';
                
                requestAnimationFrame(animateCursor);
            }
            animateCursor();

            // Cursor hover effects
            const hoverElements = document.querySelectorAll('a, button, .tech-icon, .skill-tag, .project-card, .contact-card');
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
            });
        }
    }

    // Floating particles
    function initializeParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.querySelector('.hero').appendChild(particlesContainer);

        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            createParticle(particlesContainer, i);
        }
    }

    function createParticle(container, index) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = (index * 0.4) + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }

    // Initialize animations
    function initializeAnimations() {
        // Animate hero elements with stagger
        const profileSection = document.querySelector('.profile-section');
        const techIcons = document.querySelectorAll('.tech-icon');
        const heroIntro = document.querySelector('.hero-intro');
        const statusBadge = document.querySelector('.status-badge');

        // Stagger tech icons animation
        techIcons.forEach((icon, index) => {
            icon.style.animationDelay = `${0.1 + index * 0.05}s`;
        });

        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Advanced scroll effects
    function initializeScrollEffects() {
        let scrollY = 0;
        let ticking = false;

        function updateScrollEffects() {
            scrollY = window.scrollY;

            // Navbar effect
            const navbar = document.querySelector('.navbar');
            if (scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Parallax for hero background
            const heroBackground = document.querySelector('.hero::before');
            if (heroBackground && scrollY < window.innerHeight) {
                const speed = 0.5;
                const yPos = -(scrollY * speed);
                document.documentElement.style.setProperty('--hero-bg-offset', `${yPos}px`);
            }

            // Update active nav
            updateActiveNav();

            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick);

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Active navigation
        function updateActiveNav() {
            const sections = document.querySelectorAll('section');
            const navItems = document.querySelectorAll('.nav-link');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === `#${sectionId}`) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        }
    }

    // Initialize interactions
    function initializeInteractions() {
        // Advanced Intersection Observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        // Fade in elements
        const fadeElements = document.querySelectorAll('.section-title, .about-text, .project-showcase, .project-card, .skill-group, .setup-card, .contact-card');
        
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 50);
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => {
            el.classList.add('fade-in');
            fadeObserver.observe(el);
        });

        // Scale in elements
        const scaleElements = document.querySelectorAll('.tech-icon, .skill-tag');
        
        const scaleObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 30);
                    scaleObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        scaleElements.forEach(el => {
            el.classList.add('scale-in');
            scaleObserver.observe(el);
        });

        // Phone mockup parallax
        const phones = document.querySelectorAll('.phone-mockup');
        
        window.addEventListener('scroll', () => {
            if (!window.requestAnimationFrame) return;
            
            window.requestAnimationFrame(() => {
                phones.forEach((phone, index) => {
                    const rect = phone.getBoundingClientRect();
                    const speed = index % 2 === 0 ? 0.08 : -0.08;
                    
                    if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                        const yPos = rect.top * speed;
                        phone.style.transform = `translateY(${yPos}px) rotateY(${index % 2 === 0 ? -15 : 15}deg) rotateZ(${index % 2 === 0 ? -5 : 5}deg)`;
                    }
                });
            });
        });

        // Magnetic effect for interactive elements
        const magneticElements = document.querySelectorAll('.tech-icon, .contact-card, .project-card');
        
        magneticElements.forEach(elem => {
            let bound = elem.getBoundingClientRect();
            
            elem.addEventListener('mouseenter', () => {
                bound = elem.getBoundingClientRect();
            });
            
            elem.addEventListener('mousemove', (e) => {
                const x = e.clientX - bound.left - bound.width / 2;
                const y = e.clientY - bound.top - bound.height / 2;
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = Math.max(bound.width, bound.height);
                
                if (distance < maxDistance) {
                    const strength = (maxDistance - distance) / maxDistance;
                    const moveX = x * strength * 0.1;
                    const moveY = y * strength * 0.1;
                    
                    elem.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }
            });
            
            elem.addEventListener('mouseleave', () => {
                elem.style.transform = '';
            });
        });

        // Smooth hover for skill tags
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    background: rgba(0, 132, 255, 0.3);
                    border-radius: 50%;
                    pointer-events: none;
                    width: 0;
                    height: 0;
                    top: ${y}px;
                    left: ${x}px;
                    transform: translate(-50%, -50%);
                    animation: rippleEffect 0.8s ease-out;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 800);
            });
        });

        // Project card tilt effect
        const projectCards = document.querySelectorAll('.project-card, .setup-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // Dynamic year in footer
    const year = new Date().getFullYear();
    const footerText = document.querySelector('.footer p');
    if (footerText) {
        footerText.textContent = `Luka Löhr © ${year}`;
    }

    // Console Easter egg
    const styles = [
        'background: linear-gradient(135deg, #0084ff, #00d4aa)',
        'color: white',
        'font-size: 16px',
        'padding: 10px 20px',
        'border-radius: 8px',
        'font-weight: bold',
        'text-shadow: 0 2px 10px rgba(0, 132, 255, 0.5)'
    ].join(';');
    
    console.log('%c👋 Hey! Willkommen in meiner Code-Welt!', styles);
    console.log(
        '%c🚀 Ich bin immer offen für spannende Projekte und neue Herausforderungen!',
        'font-size: 14px; color: #00d4aa; font-weight: 500;'
    );
    console.log(
        '%c📧 kontakt@lukaloehr.de',
        'font-size: 14px; color: #7c3aed; font-weight: 500;'
    );

    // Smooth page transitions
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (link.href && !link.href.startsWith('#') && !link.target && link.hostname === window.location.hostname) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const destination = link.href;
                
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = destination;
                }, 300);
            });
        }
    });

    // Add ripple animation styles
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes rippleEffect {
                to {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
            
            .hero::before {
                transform: translateY(var(--hero-bg-offset, 0));
            }
        `;
        document.head.appendChild(style);
    }
}); 