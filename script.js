document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    
    // Main animated background functionality
    const animatedBg = document.querySelector('.animated-background');
    
    // Enhanced background animation on mouse move
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Move gradients based on mouse position for a more interactive feel
        if (animatedBg) {
            animatedBg.style.backgroundPosition = `${mouseX * 100}% ${mouseY * 100}%`;
            
            // Calculate transform values for pseudo-elements (before & after)
            const moveX1 = (mouseX - 0.5) * 5;
            const moveY1 = (mouseY - 0.5) * 5;
            const moveX2 = (0.5 - mouseX) * 5;
            const moveY2 = (0.5 - mouseY) * 5;
            
            // Add custom property to allow targeting in CSS
            animatedBg.style.setProperty('--moveX1', `${moveX1}%`);
            animatedBg.style.setProperty('--moveY1', `${moveY1}%`);
            animatedBg.style.setProperty('--moveX2', `${moveX2}%`);
            animatedBg.style.setProperty('--moveY2', `${moveY2}%`);
        }
    });
    
    // Create custom scroll manager to simulate SPA behavior
    class ScrollManager {
        constructor() {
            this.sections = document.querySelectorAll('section');
            this.currentSection = 0;
            this.isScrolling = false;
            this.touchStartY = 0;
            this.initEvents();
            this.updateActiveSection();
        }
        
        initEvents() {
            // Listen for wheel events
            window.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
            
            // Listen for touch events (mobile)
            document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
            document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
            
            // Listen for keyboard events
            document.addEventListener('keydown', this.handleKeydown.bind(this));
            
            // Listen for navigation clicks
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', this.handleNavClick.bind(this));
            });
            
            // Update on resize
            window.addEventListener('resize', this.updateActiveSection.bind(this));
        }
        
        handleWheel(e) {
            // Only handle wheel events when not already scrolling
            if (this.isScrolling) return;
            
            // Calculate scroll direction
            const direction = e.deltaY > 0 ? 1 : -1;
            this.scrollToSection(this.currentSection + direction);
        }
        
        handleTouchStart(e) {
            this.touchStartY = e.touches[0].clientY;
        }
        
        handleTouchMove(e) {
            if (this.isScrolling) return;
            
            const touchY = e.touches[0].clientY;
            const diff = this.touchStartY - touchY;
            
            // Only trigger if significant swipe
            if (Math.abs(diff) > 50) {
                const direction = diff > 0 ? 1 : -1;
                this.scrollToSection(this.currentSection + direction);
                this.touchStartY = touchY; // Reset to prevent multiple triggers
            }
        }
        
        handleKeydown(e) {
            if (this.isScrolling) return;
            
            // Arrow keys and Page Up/Down
            switch(e.key) {
                case 'ArrowDown':
                case 'PageDown':
                    this.scrollToSection(this.currentSection + 1);
                    break;
                case 'ArrowUp':
                case 'PageUp':
                    this.scrollToSection(this.currentSection - 1);
                    break;
            }
        }
        
        handleNavClick(e) {
            e.preventDefault();
            
            const targetId = e.currentTarget.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const index = Array.from(this.sections).indexOf(targetSection);
                if (index !== -1) {
                    this.scrollToSection(index);
                }
            }
        }
        
        scrollToSection(index) {
            // Validate section index
            if (index < 0 || index >= this.sections.length || this.isScrolling) return;
            
            this.isScrolling = true;
            this.currentSection = index;
            
            // Scroll to section
            const targetSection = this.sections[index];
            
            // Get position with header offset
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            // Animated scroll
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active section in menu
            this.updateActiveNav();
            
            // Reset scrolling flag after animation completes
            setTimeout(() => {
                this.isScrolling = false;
            }, 1000);
        }
        
        updateActiveSection() {
            if (this.isScrolling) return;
            
            const scrollPosition = window.scrollY + window.innerHeight / 3;
            
            this.sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    this.currentSection = index;
                    this.updateActiveNav();
                }
            });
        }
        
        updateActiveNav() {
            const sectionId = this.sections[this.currentSection].id;
            
            // Remove active class from all links
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section link
            const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }
    
    // Initialize enhanced scroll manager (but allow regular scrolling as fallback)
    const scrollManager = new ScrollManager();
    
    // Update section visibility on scroll for regular scrolling
    window.addEventListener('scroll', () => {
        // Update section animations and parallax effects
        const scrollY = window.scrollY;
        
        // Animate sections as they come into view
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY > sectionTop - window.innerHeight * 0.75 && 
                scrollY < sectionTop + sectionHeight) {
                section.classList.add('in-view');
                
                // Add parallax effect to section background
                const speed = 0.15;
                const yPos = -(scrollY - sectionTop) * speed;
                section.style.backgroundPosition = `center ${yPos}px`;
            }
        });
        
        // Header effect
        if (scrollY > 50) {
            header.classList.add('scrolled');
            header.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.3)';
            header.style.padding = '0.7rem 0';
        } else {
            header.classList.remove('scrolled');
            header.style.boxShadow = 'none';
            header.style.padding = '1rem 0';
        }
    });
    
    // Mobile Navigation Toggle
    mobileNavToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        // Change icon based on menu state
        const icon = mobileNavToggle.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const icon = mobileNavToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Enhanced Scroll Reveal Animation with staggered timing
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        revealElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                const delay = element.dataset.delay || (index % 3) * 100;
                setTimeout(() => {
                    element.classList.add('active');
                }, delay);
            }
        });
    };
    
    // Initial check on page load
    revealOnScroll();
    
    // Check on scroll with throttling for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                revealOnScroll();
                scrollTimeout = null;
            }, 10);
        }
    });
    
    // Contact Form Submission Handler
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            console.log('Form Data:', formData);
            
            // Show success message
            const formButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = formButton.innerHTML;
            
            formButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            formButton.classList.add('success');
            formButton.disabled = true;
            
            // Reset form and button after delay
            setTimeout(() => {
                contactForm.reset();
                formButton.innerHTML = originalButtonText;
                formButton.classList.remove('success');
                formButton.disabled = false;
            }, 3000);
        });
    }
    
    // Add glowing effect to tech items on hover
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.boxShadow = '0 0 25px rgba(62, 142, 247, 0.3)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.boxShadow = '';
        });
    });
}); 