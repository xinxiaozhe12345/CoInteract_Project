/**
 * CoInteract Project Page Interactive Script
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initBackground();
    initNavbar();
    initScrollAnimations();
    initLazyVideos();
    initParallaxHero();
    initLightbox();
});

/**
 * Dynamic Background Effect - Particle Grid
 */
function initBackground() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    let animationId;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }
    
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
    
    function getRandomColor() {
        const colors = [
            'rgba(0, 240, 255, 0.5)',
            'rgba(123, 47, 255, 0.5)',
            'rgba(255, 45, 106, 0.3)',
            'rgba(0, 255, 136, 0.4)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, index) => {
            // Mouse repulsion
            const dx_m = p.x - mouse.x;
            const dy_m = p.y - mouse.y;
            const dist_m = Math.sqrt(dx_m * dx_m + dy_m * dy_m);
            if (dist_m < 150) {
                const force = (150 - dist_m) / 150;
                p.vx += (dx_m / dist_m) * force * 0.3;
                p.vy += (dy_m / dist_m) * force * 0.3;
            }
            
            // Damping
            p.vx *= 0.98;
            p.vy *= 0.98;
            
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
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
    
    // Track mouse for interactive particles
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    resizeCanvas();
    drawParticles();
    window.addEventListener('resize', resizeCanvas);
}

/**
 * Navbar Interaction
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
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
 * Scroll Reveal Animations with stagger
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
    
    // Elements to animate on scroll
    const animTargets = document.querySelectorAll(
        '.feature-card, .demo-video-card, .arch-item, .paper-card, .team-card, ' +
        '.demo-subsection, .usecase-card, .comparison-table, .subsection-title'
    );
    
    animTargets.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${(i % 5) * 0.08}s, transform 0.6s ease ${(i % 5) * 0.08}s`;
        observer.observe(el);
    });
    
    // Section headers fade in
    document.querySelectorAll('.section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
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
 * Lazy Video Loading - only play videos when visible
 */
function initLazyVideos() {
    const videos = document.querySelectorAll('.demo-video-card video, .hero-video-wrapper video');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                if (video.paused && video.autoplay) {
                    video.play().catch(() => {});
                }
            } else {
                if (!video.paused && !video.controls) {
                    video.pause();
                }
            }
        });
    }, { threshold: 0.2 });
    
    videos.forEach(video => {
        videoObserver.observe(video);
    });
}

/**
 * Subtle parallax on hero section
 */
function initParallaxHero() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroHeight = hero.offsetHeight;
        if (scrolled < heroHeight) {
            const content = hero.querySelector('.hero-content-centered');
            const video = hero.querySelector('.hero-video-full');
            if (content) {
                content.style.transform = `translateY(${scrolled * 0.15}px)`;
                content.style.opacity = 1 - scrolled / heroHeight * 0.8;
            }
            if (video) {
                video.style.transform = `translateY(${scrolled * 0.08}px)`;
            }
        }
    });
}

/**
 * BibTeX Toggle & Copy
 */
function toggleBibtex() {
    const box = document.getElementById('bibtexBox');
    if (box) {
        box.style.display = box.style.display === 'none' ? 'block' : 'none';
    }
}

/**
 * Image Lightbox - Click to zoom reference images
 */
function initLightbox() {
    const overlay = document.getElementById('lightbox');
    if (!overlay) return;
    const lightboxImg = overlay.querySelector('.lightbox-img');
    const closeBtn = overlay.querySelector('.lightbox-close');

    // Attach click to all reference images
    document.querySelectorAll('.interact-img-wrap img, .compare-ref-img img').forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    overlay.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
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

/**
 * SOTA Comparison Carousel
 */
let compareIndex = 0;

function slideCompare(dir) {
    const track = document.querySelector('.carousel-track');
    const cases = track.querySelectorAll('.compare-case');
    compareIndex = (compareIndex + dir + cases.length) % cases.length;
    updateCarousel();
}

function goToCompare(idx) {
    compareIndex = idx;
    updateCarousel();
}

function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    track.style.transform = `translateX(-${compareIndex * 100}%)`;
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === compareIndex);
    });
}
