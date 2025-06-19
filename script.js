// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Test button functionality
    const testButton = document.getElementById('testButton');
    const message = document.getElementById('message');
    
    testButton.addEventListener('click', function() {
        message.textContent = 'JavaScript is working! Button clicked at ' + new Date().toLocaleTimeString();
        
        // Add some animation
        message.style.opacity = '0';
        setTimeout(() => {
            message.style.opacity = '1';
        }, 100);
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const messageText = contactForm.querySelector('textarea').value;
        
        if (name && email && messageText) {
            alert(`Thank you ${name}! Your message has been received. We'll contact you at ${email}.`);
            contactForm.reset();
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add some dynamic content
    console.log('Basic test website loaded successfully!');
    
    // Change page title every 5 seconds
    const titles = [
        'Basic Test Website',
        'Testing HTML',
        'Testing CSS',
        'Testing JavaScript',
        'All Systems Working!'
    ];
    
    let titleIndex = 0;
    setInterval(() => {
        titleIndex = (titleIndex + 1) % titles.length;
        document.title = titles[titleIndex];
    }, 5000);
}); 