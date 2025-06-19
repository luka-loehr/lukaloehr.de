// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Animate hero elements after load
        animateHeroElements();
    });

    // Animate hero elements with stagger
    function animateHeroElements() {
        const profileSection = document.querySelector('.profile-section');
        const techIcons = document.querySelectorAll('.tech-icon');
        const heroIntro = document.querySelector('.hero-intro');
        const statusBadge = document.querySelector('.status-badge');
        
        // These are already animated via CSS, just ensure they're visible
        setTimeout(() => {
            if (profileSection) profileSection.style.opacity = '1';
            if (heroIntro) heroIntro.style.opacity = '1';
            if (statusBadge) statusBadge.style.opacity = '1';
        }, 100);
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

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

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
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

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // Advanced Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for elements
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe different elements with initial styles
    const animatedElements = document.querySelectorAll(
        '.project-showcase, .project-card, .skill-group, .setup-card, .contact-card, .about-text, .section-title'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Special observer for skill tags with stagger
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        
        const tagObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 30);
                    tagObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        tagObserver.observe(tag);
    });

    // Parallax effect for phone mockups
    let ticking = false;
    function updateParallax() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const phones = document.querySelectorAll('.phone-mockup');
                
                phones.forEach((phone, index) => {
                    const rect = phone.getBoundingClientRect();
                    const speed = index % 2 === 0 ? 0.5 : -0.5;
                    const yPos = -(rect.top * speed * 0.1);
                    
                    if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                        phone.style.transform = `translateY(${yPos}px) rotate(${index % 2 === 0 ? -5 : 5}deg)`;
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', updateParallax);

    // Enhanced hover effects for tech icons
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function(e) {
            // Add ripple effect
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                pointer-events: none;
                width: 0;
                height: 0;
                top: ${y}px;
                left: ${x}px;
                transform: translate(-50%, -50%);
                animation: rippleEffect 0.6s ease-out;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Create ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Smooth reveal for project cards on hover
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Magnetic hover effect for buttons
    const magneticElements = document.querySelectorAll('.btn, .contact-card, .tech-icon');
    
    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        elem.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Dynamic year in footer
    const year = new Date().getFullYear();
    const footerText = document.querySelector('.footer p');
    if (footerText) {
        footerText.textContent = `Luka Löhr © ${year}`;
    }

    // Console Easter egg with animation
    console.log(
        '%c👋 Hey! Schön, dass du dir den Code anschaust!',
        'font-size: 16px; color: #0084ff; font-weight: bold; text-shadow: 2px 2px 0 rgba(0,132,255,0.2);'
    );
    console.log(
        '%c🚀 Ich bin immer offen für spannende Projekte!',
        'font-size: 14px; color: #00d4aa; font-weight: 500;'
    );
    console.log(
        '%c📧 kontakt@lukaloehr.de',
        'font-size: 14px; color: #7c3aed; font-weight: 500;'
    );

    // Performance optimization - Throttle scroll events
    let scrollTimer;
    window.addEventListener('scroll', () => {
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(() => {
            updateActiveNav();
        }, 10);
    });

    // Add smooth page transitions
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href && !link.href.startsWith('#') && !link.target) {
            e.preventDefault();
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = link.href;
            }, 300);
        }
    });
}); 