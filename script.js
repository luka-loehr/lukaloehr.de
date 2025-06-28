// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('students-modal');
    const studentsBtn = document.getElementById('students-btn');
    const modalClose = document.getElementById('modal-close');
    
    // Open modal
    studentsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal
    modalClose.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Smooth scrolling for navigation links and buttons
    const scrollLinks = document.querySelectorAll('.nav-link:not(.students-link), .btn[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Dynamic Island navbar effect
    const navbar = document.querySelector('.navbar');
    const navContainer = document.querySelector('.nav-container');
    const navBrand = document.querySelector('.nav-brand');
    const navMenu = document.querySelector('.nav-menu');
    let lastScroll = 0;
    let isCompact = false;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        const heroHeight = document.querySelector('.hero').offsetHeight;
        const scrollThreshold = heroHeight * 0.6; // Trigger at 60% of hero section
        
        // Dynamic island transformation
        if (currentScroll > scrollThreshold && !isCompact) {
            isCompact = true;
            navbar.classList.add('compact');
            
            // Animate to compact state
            navbar.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            navContainer.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            navBrand.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            navMenu.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
        } else if (currentScroll <= scrollThreshold && isCompact) {
            isCompact = false;
            navbar.classList.remove('compact');
        }
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    

    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Don't observe again after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const animatedElements = document.querySelectorAll('.section, .project-card, .tech-item, .contact-card, .feature, .step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Rotating text effect for hero subtitle
    const rotatingText = document.querySelector('.rotating-text');
    if (rotatingText) {
        const titles = [
            'Software Developer',
            'AI Developer',
            'Digital Architect',
            'Full Stack Developer',
            'App Developer',
            'Tech Enthusiast'
        ];
        
        let currentIndex = 0;
        let currentText = '';
        let letterIndex = 0;
        let isDeleting = false;
        let isWaiting = false;
        
        function typeEffect() {
            const fullText = titles[currentIndex];
            
            if (!isDeleting && letterIndex < fullText.length) {
                // Typing
                currentText = fullText.substring(0, letterIndex + 1);
                letterIndex++;
                rotatingText.textContent = currentText;
                
                if (letterIndex === fullText.length) {
                    // Finished typing, wait before deleting
                    isWaiting = true;
                    setTimeout(() => {
                        isWaiting = false;
                        isDeleting = true;
                        typeEffect();
                    }, 2000); // Wait 2 seconds before deleting
                    return;
                }
            } else if (isDeleting && letterIndex > 0) {
                // Deleting
                currentText = fullText.substring(0, letterIndex - 1);
                letterIndex--;
                rotatingText.textContent = currentText || '\u200B'; // Zero-width space when empty
                
                if (letterIndex === 0) {
                    // Finished deleting, move to next title
                    isDeleting = false;
                    currentIndex = (currentIndex + 1) % titles.length;
                    setTimeout(typeEffect, 500); // Small pause before typing next word
                    return;
                }
            }
            
            // Continue typing/deleting
            const typingSpeed = isDeleting ? 50 : 100;
            setTimeout(typeEffect, typingSpeed);
        }
        
        // Start the effect
        setTimeout(typeEffect, 1000);
    }
    
    // Dynamic background gradients based on scroll position
    const updateBackgroundGradients = () => {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercentage = parseFloat((scrollPosition / (documentHeight - windowHeight)).toFixed(6));
        
        // Get all sections with their positions
        const sections = Array.from(document.querySelectorAll('.hero, .section[id]')).map(section => ({
            element: section,
            id: section.id || 'hero',
            top: section.offsetTop,
            bottom: section.offsetTop + section.offsetHeight
        }));
        
        // Define gradient configurations for each section
        const gradientConfigs = {
            hero: {
                gradient1: { x: 50, y: 0, opacity: 0.25 },
                gradient2: { x: 100, y: 100, opacity: 0.15 },
                gradient3: { x: 0, y: 100, opacity: 0.12 }
            },
            projekte: {
                gradient1: { x: 10, y: 30, opacity: 0.05 },
                gradient2: { x: 90, y: 20, opacity: 0.3 },
                gradient3: { x: 50, y: 90, opacity: 0.02 }
            },
            'tech-stack': {
                gradient1: { x: 80, y: 10, opacity: 0.02 },
                gradient2: { x: 20, y: 80, opacity: 0.05 },
                gradient3: { x: 95, y: 95, opacity: 0.35 }
            },
            about: {
                gradient1: { x: 5, y: 60, opacity: 0.2 },
                gradient2: { x: 95, y: 10, opacity: 0.03 },
                gradient3: { x: 50, y: 95, opacity: 0.15 }
            },
            kontakt: {
                gradient1: { x: 50, y: 10, opacity: 0.35 },
                gradient2: { x: 10, y: 90, opacity: 0.1 },
                gradient3: { x: 90, y: 50, opacity: 0.05 }
            }
        };
        
        // Helper function to interpolate between two values
        const lerp = (start, end, progress) => start + (end - start) * progress;
        
        // Find current and next section
        let currentSectionIndex = 0;
        let sectionProgress = 0;
        
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const scrollCenter = scrollPosition + windowHeight / 2;
            
            if (scrollCenter >= section.top && scrollCenter <= section.bottom) {
                currentSectionIndex = i;
                // Calculate progress within current section with high precision
                sectionProgress = (scrollCenter - section.top) / (section.bottom - section.top);
                sectionProgress = parseFloat(sectionProgress.toFixed(6));
                break;
            } else if (scrollCenter < section.top && i > 0) {
                // Between sections
                currentSectionIndex = i - 1;
                const prevSection = sections[i - 1];
                sectionProgress = (scrollCenter - prevSection.bottom) / (section.top - prevSection.bottom);
                sectionProgress = Math.max(0, Math.min(1, sectionProgress));
                sectionProgress = parseFloat(sectionProgress.toFixed(6));
                break;
            }
        }
        
        // Get configurations
        const currentSection = sections[currentSectionIndex];
        const nextSection = sections[Math.min(currentSectionIndex + 1, sections.length - 1)];
        const currentConfig = gradientConfigs[currentSection.id] || gradientConfigs.hero;
        const nextConfig = gradientConfigs[nextSection.id] || currentConfig;
        
        // Interpolate between configurations
        const interpolatedConfig = {
            gradient1: {
                x: lerp(currentConfig.gradient1.x, nextConfig.gradient1.x, sectionProgress),
                y: lerp(currentConfig.gradient1.y, nextConfig.gradient1.y, sectionProgress),
                opacity: lerp(currentConfig.gradient1.opacity, nextConfig.gradient1.opacity, sectionProgress)
            },
            gradient2: {
                x: lerp(currentConfig.gradient2.x, nextConfig.gradient2.x, sectionProgress),
                y: lerp(currentConfig.gradient2.y, nextConfig.gradient2.y, sectionProgress),
                opacity: lerp(currentConfig.gradient2.opacity, nextConfig.gradient2.opacity, sectionProgress)
            },
            gradient3: {
                x: lerp(currentConfig.gradient3.x, nextConfig.gradient3.x, sectionProgress),
                y: lerp(currentConfig.gradient3.y, nextConfig.gradient3.y, sectionProgress),
                opacity: lerp(currentConfig.gradient3.opacity, nextConfig.gradient3.opacity, sectionProgress)
            }
        };
        
        // Additional movement based on scroll - smaller values for smoother motion
        const movement = Math.sin(scrollPercentage * Math.PI * 2) * 10;
        const moveX = Math.cos(scrollPercentage * Math.PI * 3) * 8;
        
        // Apply interpolated values with movement - using higher precision
        const gradient1X = (interpolatedConfig.gradient1.x + moveX).toFixed(3);
        const gradient1Y = (interpolatedConfig.gradient1.y + movement).toFixed(3);
        const gradient2X = (interpolatedConfig.gradient2.x - moveX).toFixed(3);
        const gradient2Y = (interpolatedConfig.gradient2.y - movement).toFixed(3);
        const gradient3X = interpolatedConfig.gradient3.x.toFixed(3);
        const gradient3Y = (interpolatedConfig.gradient3.y + movement * 0.5).toFixed(3);
        
        const gradient1Pos = `${gradient1X}% ${gradient1Y}%`;
        const gradient2Pos = `${gradient2X}% ${gradient2Y}%`;
        const gradient3Pos = `${gradient3X}% ${gradient3Y}%`;
        
        // Apply opacity with higher precision
        const opacity1 = interpolatedConfig.gradient1.opacity.toFixed(4);
        const opacity2 = interpolatedConfig.gradient2.opacity.toFixed(4);
        const opacity3 = interpolatedConfig.gradient3.opacity.toFixed(4);
        
        document.documentElement.style.setProperty('--gradient1-pos', gradient1Pos);
        document.documentElement.style.setProperty('--gradient1-opacity', opacity1);
        document.documentElement.style.setProperty('--gradient2-pos', gradient2Pos);
        document.documentElement.style.setProperty('--gradient2-opacity', opacity2);
        document.documentElement.style.setProperty('--gradient3-pos', gradient3Pos);
        document.documentElement.style.setProperty('--gradient3-opacity', opacity3);
    };
    
    // Use requestAnimationFrame for smooth updates
    let animationFrameId = null;
    
    function smoothUpdate() {
        updateBackgroundGradients();
        animationFrameId = requestAnimationFrame(smoothUpdate);
    }
    
    // Start the animation loop
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            smoothUpdate();
        }
        
        // Stop animation after scrolling ends
        clearTimeout(window.scrollEndTimer);
        window.scrollEndTimer = setTimeout(() => {
            isScrolling = false;
            cancelAnimationFrame(animationFrameId);
        }, 150);
    });
    
    updateBackgroundGradients(); // Initial call
    
    // 3D hover effect for code window
    const codeWindow = document.querySelector('.code-window');
    if (codeWindow) {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = -0.3; // Start slightly to the left
        let currentY = 0.1; // Slight downward tilt
        let currentZ = 0; // For smooth Z animation
        let isHovering = false;
        
        // Set initial transform with slight left tilt
        const initialRotateY = -3; // Slight left rotation
        const initialRotateX = -1; // Slight upward tilt
        
        // Proximity-based hover effect
        let proximityFactor = 0;
        
        // Check if mouse is near the code window
        const checkProximity = (e) => {
            const rect = codeWindow.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate distance from mouse to center of code window
            const distanceX = Math.abs(e.clientX - centerX);
            const distanceY = Math.abs(e.clientY - centerY);
            
            // Calculate distance from edges
            const edgeDistanceX = Math.max(0, distanceX - rect.width / 2);
            const edgeDistanceY = Math.max(0, distanceY - rect.height / 2);
            const edgeDistance = Math.sqrt(edgeDistanceX * edgeDistanceX + edgeDistanceY * edgeDistanceY);
            
            // Calculate proximity factor (1 when on element, 0 when far away)
            const maxDistance = 150; // Maximum distance for effect (pixels)
            proximityFactor = Math.max(0, 1 - (edgeDistance / maxDistance));
            
            // Smooth the proximity factor with easing
            const easedProximity = proximityFactor * proximityFactor * (3 - 2 * proximityFactor); // smoothstep
            proximityFactor = easedProximity; // Store for use in animation
            
            // Update hovering state based on proximity
            isHovering = easedProximity > 0.01; // Very small threshold
            
            // Calculate mouse position relative to center
            const rawMouseX = (e.clientX - centerX) / (rect.width / 2);
            const rawMouseY = (e.clientY - centerY) / (rect.height / 2);
            
            // Apply proximity-based scaling to mouse influence
            mouseX = rawMouseX * easedProximity;
            mouseY = rawMouseY * easedProximity;
            
            // Limit maximum values to prevent extreme rotations
            const maxInfluence = 1.5;
            mouseX = Math.max(-maxInfluence, Math.min(maxInfluence, mouseX));
            mouseY = Math.max(-maxInfluence, Math.min(maxInfluence, mouseY));
        };
        
        // Global mouse tracking for proximity detection
        document.addEventListener('mousemove', checkProximity);
        
        // Smooth animation loop
        function animateCodeWindow() {
            if (isHovering) {
                // Smooth interpolation to mouse position
                currentX += (mouseX - currentX) * 0.08;
                currentY += (mouseY - currentY) * 0.08;
                // Z movement based on proximity factor for smooth fade
                const targetZ = 10 * proximityFactor;
                currentZ += (targetZ - currentZ) * 0.08;
            } else {
                // Smoothly return to initial tilted position
                currentX += (-0.3 - currentX) * 0.06;
                currentY += (0.1 - currentY) * 0.06;
                currentZ += (0 - currentZ) * 0.06; // Smooth Z movement back
            }
            
            // Always apply transform for smooth transitions
            const rotateY = initialRotateY + (currentX * 10); // Initial tilt plus dynamic rotation
            const rotateX = initialRotateX + (currentY * -10); // Initial tilt plus dynamic rotation
            const translateX = currentX * 5; // Slight horizontal movement
            const translateY = currentY * 5; // Slight vertical movement
            
            codeWindow.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateX(${translateX}px)
                translateY(${translateY}px)
                translateZ(${currentZ}px)
            `;
            
            requestAnimationFrame(animateCodeWindow);
        }
        
        animateCodeWindow();
    }
    
    // Subtle hover effect for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
            
            btn.style.transform = `translateX(${x * 0.2}px) translateY(${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateX(0) translateY(0)';
        });
    });
    
    // Active nav link highlighting
    const sections = document.querySelectorAll('.section[id]');
    const navItems = document.querySelectorAll('.nav-link:not(.students-link)');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navHeight = document.querySelector('.navbar').offsetHeight;
            
            if (pageYOffset >= sectionTop - navHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Add active nav link styles
    const activeStyle = document.createElement('style');
    activeStyle.textContent = `
        .nav-link.active {
            color: var(--primary-color) !important;
        }
        .nav-link.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(activeStyle);
    
    // Mobile menu toggle (for future implementation)
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
    mobileMenuBtn.style.display = 'none';
    
    // Add mobile menu button styles
    const mobileMenuStyle = document.createElement('style');
    mobileMenuStyle.textContent = `
        .mobile-menu-btn {
            display: none;
            flex-direction: column;
            gap: 4px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
        }
        
        .mobile-menu-btn span {
            display: block;
            width: 25px;
            height: 3px;
            background: var(--text-primary);
            border-radius: 2px;
            transition: all 0.3s ease;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: flex;
            }
        }
    `;
    document.head.appendChild(mobileMenuStyle);
    
    // Add mobile menu button to navigation
    const navContainerForMobile = document.querySelector('.nav-container');
    if (navContainerForMobile) {
        navContainerForMobile.appendChild(mobileMenuBtn);
    }
});
