/**
 * High-Tech Project Page Interactive Script
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initBackground();
    initNavbar();
    
    initScrollAnimations();
});

/**
 * Dynamic Background Effect - Particle Grid
 */
function initBackground() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }
    
    // Initialize particles
    function initParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                color: getRandomColor()
            });
        }
    }
    
    // Get random tech-style color
    function getRandomColor() {
        const colors = [
            'rgba(0, 240, 255, 0.5)',   // Cyan
            'rgba(123, 47, 255, 0.5)',  // Purple
            'rgba(255, 45, 106, 0.3)',  // Pink
            'rgba(0, 255, 136, 0.4)'    // Green
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Draw particles
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw particles
        particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            
            // Boundary detection
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Draw connections
            particles.slice(index + 1).forEach(p2 => {
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - distance / 150)})`;
                    ctx.stroke();
                }
            });
        });
        
        animationId = requestAnimationFrame(drawParticles);
    }
    
    // Initialize
    resizeCanvas();
    drawParticles();
    
    // Resize on window change
    window.addEventListener('resize', function() {
        resizeCanvas();
    });
}

/**
 * Navbar Interaction
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // Change navbar style on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll to anchor
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that need animation
    document.querySelectorAll('.feature-card, .demo-video-card, .arch-item, .paper-card, .team-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Video Placeholder Click Events (Optional)
 * Replace placeholders when videos are ready
 */
function setupVideoPlaceholders() {
    const placeholders = document.querySelectorAll('.video-placeholder');
    
    placeholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            console.log('Placeholder clicked - add video replacement logic here');
            // Example: replace with actual video
            // this.innerHTML = '<video src="your-video.mp4" controls autoplay></video>';
        });
    });
}

// Set up video placeholders after page load
document.addEventListener('DOMContentLoaded', setupVideoPlaceholders);

/**
 * BibTeX Toggle & Copy
 */
function toggleBibtex() {
    const box = document.getElementById('bibtexBox');
    if (box) {
        box.style.display = box.style.display === 'none' ? 'block' : 'none';
    }
}

function copyBibtex() {
    const code = document.querySelector('#bibtexBox code');
    if (code) {
        navigator.clipboard.writeText(code.textContent).then(() => {
            const btn = document.querySelector('.copy-bibtex');
            const original = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => { btn.textContent = original; }, 2000);
        });
    }
}