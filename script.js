// ========== SMOOTH SCROLL FOR NAVIGATION LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply observer to all tech-cards and project items
document.querySelectorAll('.tech-card, .project-item, .competition-card, .edu-item').forEach(el => {
    observer.observe(el);
});

// ========== ACTIVE NAVIGATION LINK HIGHLIGHT ==========
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    const _highlight = getComputedStyle(document.documentElement).getPropertyValue('--emerald').trim();
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = _highlight;
        }
    });
});

// ========== PARALLAX EFFECT FOR HERO SECTION ==========
const hero = document.getElementById('hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        hero.style.backgroundPosition = `0 ${scroll * 0.5}px`;
    });
}

// ========== LAZY LOAD IMAGES ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== MOBILE MENU TOGGLE (Optional) ==========
function setupMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '60px';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(15, 23, 42, 0.95)';
            navLinks.style.flexDirection = 'column';
            navLinks.style.padding = '1rem';
        });
    }
}

setupMobileMenu();

// ========== COPY EMAIL TO CLIPBOARD ==========
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const email = this.getAttribute('href').replace('mailto:', '');
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                // Optional: Show feedback
                const originalText = this.textContent;
                this.textContent = 'Email Copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        }
    });
});

// ========== DARK MODE TOGGLE (Optional) ==========
function setupDarkModeToggle() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.style.filter = document.body.style.filter === 'invert(1)' ? 'none' : 'invert(1)';
            localStorage.setItem('darkMode', document.body.style.filter === 'invert(1)' ? 'true' : 'false');
        });
        
        // Restore previous setting
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.style.filter = 'invert(1)';
        }
    }
}

setupDarkModeToggle();

// ========== TYPING EFFECT FOR HERO TITLE (Optional) ==========
function typeEffect(element, text, speed = 100) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Usage: uncomment if you want typing effect on hero title
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//     typeEffect(heroTitle, 'Hardware Meets Intelligence', 50);
// }

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce function for scroll events
function debounce(func, wait) {
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

// ========== PAGE LOAD ANIMATION ==========
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    console.log('Portfolio loaded successfully! 🚀');
});