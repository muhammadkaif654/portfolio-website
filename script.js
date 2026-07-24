// Dynamic navbar opacity and backdrop blur on user scrolling
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(18, 18, 18, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.borderBottom = '1px solid #333';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
        navbar.style.borderBottom = 'none';
    }
});

// Contact Form AJAX Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Disable button and show sending state
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        
        // Gather Form Data
        const formData = new FormData(contactForm);
        
        // Convert to JSON
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        
        try {
            // Note: To receive emails, swap the URL below with your Web3Forms access key or Formspree endpoint.
            // Example Web3Forms endpoint: https://api.web3forms.com/submit
            // For Formspree: https://formspree.io/f/YOUR_FORM_ID
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });
            
            const result = await response.json();
            
            if (response.status === 200 || result.success) {
                alert('Thank you! Your message has been sent successfully.');
                contactForm.reset();
            } else {
                alert(result.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Unable to send message at the moment. Please try again later.');
        } finally {
            // Restore button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// Timeline scroll active card highlight using IntersectionObserver
const timelineNodes = document.querySelectorAll('.timeline-node');
if (timelineNodes.length > 0) {
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -35% 0px', // Trigger when card enters the viewport center
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    timelineNodes.forEach(node => observer.observe(node));
}

// Project Card click highlight activation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        projectCards.forEach(c => c.classList.remove('active-project'));
        card.classList.add('active-project');
    });
});