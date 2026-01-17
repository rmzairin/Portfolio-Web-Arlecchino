// script.js

// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const body = document.body;

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
});

// Close menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = 'auto';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = 'auto';
    }
});

// Active Navigation on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Create Floating Particles
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 1;
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        
        // Random color between red variants
        const colors = [
            'rgba(220, 20, 60, ',
            'rgba(139, 0, 0, ',
            'rgba(255, 68, 68, ',
            'rgba(178, 34, 34, '
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const opacity = Math.random() * 0.6 + 0.3;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color}${opacity});
            border-radius: 50%;
            left: ${startX}px;
            top: ${startY}px;
            animation: float ${duration}s ${delay}s infinite;
            box-shadow: 0 0 ${size * 3}px ${color}0.8);
            filter: blur(${Math.random() * 1}px);
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add blood orbs
    createBloodOrbs();
}

// Create Blood Orbs (larger glowing particles)
function createBloodOrbs() {
    const particlesContainer = document.querySelector('.particles');
    const orbCount = 10;
    
    for (let i = 0; i < orbCount; i++) {
        const orb = document.createElement('div');
        
        const size = Math.random() * 15 + 10;
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        
        orb.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle,
                rgba(255, 68, 68, 0.8),
                rgba(220, 20, 60, 0.6),
                rgba(139, 0, 0, 0.4)
            );
            border-radius: 50%;
            left: ${startX}px;
            top: ${startY}px;
            animation: float ${duration}s ${delay}s infinite, orbPulse 2s ease-in-out infinite;
            box-shadow: 
                0 0 ${size * 2}px rgba(220, 20, 60, 0.8),
                0 0 ${size * 4}px rgba(220, 20, 60, 0.4),
                inset 0 0 ${size / 2}px rgba(255, 255, 255, 0.3);
            filter: blur(1px);
        `;
        
        particlesContainer.appendChild(orb);
    }
}

// Add orb pulse animation
const orbStyle = document.createElement('style');
orbStyle.textContent = `
    @keyframes orbPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
    }
`;
document.head.appendChild(orbStyle);

// Create Flames with realistic movement
function createFlames() {
    const flamesContainer = document.querySelector('.flames-container');
    const flameCount = 40;
    
    for (let i = 0; i < flameCount; i++) {
        const flame = document.createElement('div');
        flame.className = 'flame';
        
        const left = (i / flameCount) * 100 + (Math.random() * 2 - 1);
        const height = Math.random() * 60 + 60;
        const width = Math.random() * 20 + 25;
        const delay = Math.random() * 2;
        const duration = Math.random() * 0.8 + 1.2;
        const skew = Math.random() * 10 - 5;
        
        flame.style.cssText = `
            left: ${left}%;
            height: ${height}px;
            width: ${width}px;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            transform: skewX(${skew}deg);
        `;
        
        // Add flickering effect
        setInterval(() => {
            const newSkew = Math.random() * 15 - 7.5;
            flame.style.transform = `skewX(${newSkew}deg)`;
        }, 200 + Math.random() * 300);
        
        flamesContainer.appendChild(flame);
    }
    
    // Add ember particles and smoke
    createEmbers();
    createSmoke();
}

// Create floating embers
function createEmbers() {
    const flamesContainer = document.querySelector('.flames-container');
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            const ember = document.createElement('div');
            ember.className = 'ember';
            
            const startX = Math.random() * 100;
            const size = Math.random() * 4 + 2;
            const duration = Math.random() * 3 + 2;
            const drift = Math.random() * 100 - 50;
            
            ember.style.cssText = `
                position: absolute;
                bottom: 0;
                left: ${startX}%;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, 
                    rgba(255, 140, 0, 1) 0%,
                    rgba(220, 20, 60, 0.8) 50%,
                    transparent 100%);
                border-radius: 50%;
                animation: emberFloat ${duration}s ease-out forwards;
                box-shadow: 0 0 10px rgba(255, 140, 0, 0.8);
                pointer-events: none;
            `;
            
            // Create unique animation for each ember
            const animName = 'emberFloat' + Date.now() + Math.random();
            const keyframes = `
                @keyframes ${animName} {
                    0% {
                        transform: translate(0, 0) scale(1) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(${drift}px, -200px) scale(0.3) rotate(${Math.random() * 360}deg);
                        opacity: 0;
                    }
                }
            `;
            
            const style = document.createElement('style');
            style.textContent = keyframes;
            document.head.appendChild(style);
            ember.style.animation = `${animName} ${duration}s ease-out forwards`;
            
            flamesContainer.appendChild(ember);
            
            setTimeout(() => {
                ember.remove();
                style.remove();
            }, duration * 1000);
        }
    }, 100);
}

// Create smoke effect
function createSmoke() {
    const flamesContainer = document.querySelector('.flames-container');
    
    setInterval(() => {
        if (Math.random() > 0.8) {
            const smoke = document.createElement('div');
            smoke.className = 'smoke';
            
            const startX = Math.random() * 100;
            const size = Math.random() * 30 + 40;
            const duration = Math.random() * 2 + 3;
            const drift = Math.random() * 80 - 40;
            
            smoke.style.cssText = `
                position: absolute;
                bottom: 50px;
                left: ${startX}%;
                width: ${size}px;
                height: ${size}px;
            `;
            
            // Create unique animation for each smoke particle
            const animName = 'smokeRise' + Date.now() + Math.random();
            const keyframes = `
                @keyframes ${animName} {
                    0% {
                        transform: translate(0, 0) scale(1) rotate(0deg);
                        opacity: 0.6;
                    }
                    100% {
                        transform: translate(${drift}px, -150px) scale(2.5) rotate(${Math.random() * 180}deg);
                        opacity: 0;
                    }
                }
            `;
            
            const style = document.createElement('style');
            style.textContent = keyframes;
            document.head.appendChild(style);
            smoke.style.animation = `${animName} ${duration}s ease-out forwards`;
            
            flamesContainer.appendChild(smoke);
            
            setTimeout(() => {
                smoke.remove();
                style.remove();
            }, duration * 1000);
        }
    }, 300);
}

// Add floating animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, -100vh);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles and flames
createParticles();
createFlames();
createBloodVeins();
createBloodSplatters();

// Create Blood Veins Effect
function createBloodVeins() {
    const veinCount = 15;
    
    for (let i = 0; i < veinCount; i++) {
        const vein = document.createElement('div');
        vein.className = 'blood-vein';
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const height = Math.random() * 300 + 200;
        const rotation = Math.random() * 360;
        const delay = Math.random() * 3;
        
        vein.style.cssText = `
            left: ${left}%;
            top: ${top}%;
            height: ${height}px;
            transform: rotate(${rotation}deg);
            animation-delay: ${delay}s;
        `;
        
        document.body.appendChild(vein);
    }
}

// Create Blood Splatters
function createBloodSplatters() {
    setInterval(() => {
        if (Math.random() > 0.95) {
            const splatter = document.createElement('div');
            splatter.className = 'blood-splatter';
            
            const size = Math.random() * 100 + 50;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            
            splatter.style.cssText = `
                left: ${left}%;
                top: ${top}%;
                width: ${size}px;
                height: ${size}px;
            `;
            
            document.body.appendChild(splatter);
            
            setTimeout(() => splatter.remove(), 2000);
        }
    }, 500);
}

// Create Blood Lightning Effect
function createBloodLightning() {
    const lightning = document.createElement('div');
    lightning.className = 'blood-lightning';
    
    const left = Math.random() * 100;
    const top = Math.random() * 50;
    const height = Math.random() * 200 + 100;
    const rotation = Math.random() * 30 - 15;
    
    lightning.style.cssText = `
        left: ${left}%;
        top: ${top}%;
        height: ${height}px;
        transform: rotate(${rotation}deg);
    `;
    
    document.body.appendChild(lightning);
    
    setTimeout(() => lightning.remove(), 100);
}

// Trigger lightning randomly
setInterval(() => {
    if (Math.random() > 0.98) {
        createBloodLightning();
        // Create multiple lightning strikes
        setTimeout(() => createBloodLightning(), 50);
        setTimeout(() => createBloodLightning(), 100);
    }
}, 1000);

// Enhanced Blood Rain Effect
function createBloodRain() {
    setInterval(() => {
        if (Math.random() > 0.8) {
            const rain = document.createElement('div');
            
            const left = Math.random() * 100;
            const size = Math.random() * 2 + 1;
            const duration = Math.random() * 1 + 1;
            const delay = Math.random() * 0.5;
            
            rain.style.cssText = `
                position: fixed;
                left: ${left}%;
                top: -10px;
                width: ${size}px;
                height: ${size * 20}px;
                background: linear-gradient(to bottom,
                    transparent,
                    rgba(220, 20, 60, 0.8),
                    rgba(139, 0, 0, 0.6)
                );
                z-index: 1;
                pointer-events: none;
                animation: rainFall ${duration}s linear forwards;
                animation-delay: ${delay}s;
                filter: blur(1px);
                box-shadow: 0 0 5px rgba(220, 20, 60, 0.6);
            `;
            
            document.body.appendChild(rain);
            
            setTimeout(() => rain.remove(), (duration + delay) * 1000);
        }
    }, 50);
}

// Add rain animation
const rainStyle = document.createElement('style');
rainStyle.textContent = `
    @keyframes rainFall {
        to {
            transform: translateY(100vh);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rainStyle);

createBloodRain();

// Blood Pulse on Scroll
let bloodPulseTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(bloodPulseTimeout);
    
    // Create blood pulse effect
    const pulse = document.createElement('div');
    pulse.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        border: 3px solid rgba(220, 20, 60, 0.8);
        border-radius: 50%;
        z-index: 9999;
        pointer-events: none;
        animation: pulseExpand 0.6s ease-out forwards;
        box-shadow: 0 0 20px rgba(220, 20, 60, 0.8),
                    inset 0 0 20px rgba(220, 20, 60, 0.4);
    `;
    
    document.body.appendChild(pulse);
    
    bloodPulseTimeout = setTimeout(() => pulse.remove(), 600);
});

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulseExpand {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(pulseStyle);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Show success message (you can customize this)
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Add hover effect to cards
const cards = document.querySelectorAll('.about-card, .exp-card, .project-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Blood Moon parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const bloodMoon = document.querySelector('.blood-moon');
    const moonGlow = document.querySelector('.moon-glow');
    
    if (bloodMoon && moonGlow) {
        bloodMoon.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0001})`;
        moonGlow.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0001})`;
    }
});

// Add typing effect to home section
const glitchText = document.querySelector('.glitch');
if (glitchText) {
    const originalText = glitchText.textContent;
    glitchText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < originalText.length) {
            glitchText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing after page load
    setTimeout(typeWriter, 500);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and timeline items
const observeElements = document.querySelectorAll('.about-card, .timeline-item, .exp-card, .project-card');
observeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add blood drip effect on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const st = window.scrollY;
    
    if (st > lastScrollTop) {
        // Scrolling down
        createBloodDrip();
    }
    
    lastScrollTop = st <= 0 ? 0 : st;
}, false);

function createBloodDrip() {
    if (Math.random() > 0.95) { // 5% chance per scroll
        const drip = document.createElement('div');
        drip.style.cssText = `
            position: fixed;
            top: 0;
            left: ${Math.random() * 100}%;
            width: 2px;
            height: 0;
            background: linear-gradient(to bottom, transparent, rgba(220, 20, 60, 0.8));
            z-index: 9999;
            pointer-events: none;
            animation: drip 1s ease-out forwards;
        `;
        
        document.body.appendChild(drip);
        
        setTimeout(() => drip.remove(), 1000);
    }
}

// Add drip animation
const dripStyle = document.createElement('style');
dripStyle.textContent = `
    @keyframes drip {
        to {
            height: 100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(dripStyle);

// Add glow effect to buttons on mouse move
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--mouse-x', `${x}px`);
        button.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Image hover effects with particles
const images = document.querySelectorAll('.hero-image, .about-image');
images.forEach(image => {
    image.addEventListener('mouseenter', function() {
        createImageParticles(this);
    });
});

function createImageParticles(image) {
    const rect = image.getBoundingClientRect();
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        
        const size = Math.random() * 6 + 3;
        const startX = rect.left + Math.random() * rect.width;
        const startY = rect.top + Math.random() * rect.height;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        
        particle.style.cssText = `
            position: fixed;
            left: ${startX}px;
            top: ${startY}px;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle,
                rgba(255, 68, 68, 1),
                rgba(220, 20, 60, 0.8),
                transparent
            );
            border-radius: 50%;
            z-index: 9999;
            pointer-events: none;
            animation: particleExplode 1s ease-out forwards;
            box-shadow: 0 0 10px rgba(220, 20, 60, 0.8);
        `;
        
        const endX = startX + Math.cos(angle) * distance;
        const endY = startY + Math.sin(angle) * distance;
        
        const animName = 'particleExplode' + Date.now() + i;
        const keyframes = `
            @keyframes ${animName} {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(${endX - startX}px, ${endY - startY}px) scale(0);
                    opacity: 0;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
        particle.style.animation = `${animName} 1s ease-out forwards`;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
            style.remove();
        }, 1000);
    }
}

// Stats counter animation
const stats = document.querySelectorAll('.stat-number');
const observerStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target;
            const text = stat.textContent;
            const hasPlus = text.includes('+');
            const hasPercent = text.includes('%');
            const number = parseInt(text.replace(/\D/g, ''));
            
            let current = 0;
            const increment = number / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
            }, 30);
            
            observerStats.unobserve(stat);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => observerStats.observe(stat));

// Add cursor trail effect
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.7) { // Create trail 30% of the time
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 5px;
            height: 5px;
            background: radial-gradient(circle, rgba(220, 20, 60, 0.6), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            animation: fadeTrail 0.5s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        cursorTrail.push(trail);
        
        if (cursorTrail.length > maxTrailLength) {
            const oldTrail = cursorTrail.shift();
            oldTrail.remove();
        }
        
        setTimeout(() => trail.remove(), 500);
    }
});

const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes fadeTrail {
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(trailStyle);

// Console easter egg
console.log('%c🌙 Welcome to Blood Moon Portfolio', 'color: #DC143C; font-size: 20px; font-weight: bold;');
console.log('%cUnder the crimson sky, elegance meets darkness', 'color: #8B0000; font-size: 14px;');

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-heavy functions
const throttledScroll = throttle(() => {
    // Add any additional scroll effects here
}, 100);