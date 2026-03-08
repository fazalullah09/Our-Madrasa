// Current Year for Footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Header Scroll Effect & scroll progress
const header = document.querySelector('.main-header');
const progressBar = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    // Header shadow
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Progress bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
});

// Mobile Menu
const menuBtn = document.querySelector('.menu-btn');
const mainNav = document.querySelector('.main-nav');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('show');
        const icon = menuBtn.querySelector('i');
        if (mainNav.classList.contains('show')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (mainNav.classList.contains('show')) {
            mainNav.classList.remove('show');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Smooth Scroll for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Reveal Animations using Intersection Observer
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Particle.js Configuration
if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": ["#d4af37", "#1b8a6a", "#ffffff"] },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 3, "random": true, "anim": { "enable": false } },
            "line_linked": { "enable": true, "distance": 150, "color": "#d4af37", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });
}

// ======== DONATION MODAL LOGIC ========
const modal = document.getElementById('donationModal');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const paymentGatewayTitle = document.getElementById('paymentGatewayName');
const paymentNumberDisplay = document.getElementById('paymentNumber');
const donationForm = document.getElementById('proDonationForm');

let currentNumber = "";

function processDonation(gateway, number) {
    currentNumber = number;
    paymentGatewayTitle.textContent = gateway + " Secure Payment";

    // Format number logically
    if (number.length === 11) {
        paymentNumberDisplay.textContent = number.substring(0, 4) + " " + number.substring(4, 7) + " " + number.substring(7, 11);
    } else {
        paymentNumberDisplay.textContent = number;
    }

    // Reset Modal State
    step1.classList.remove('hidden');
    step2.classList.add('hidden');
    donationForm.reset();

    // Show Modal
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => {
        step1.classList.remove('hidden');
        step2.classList.add('hidden');
    }, 400); // Wait for transition
}

// Copy to Clipboard feature
function copyNumber() {
    navigator.clipboard.writeText(currentNumber).then(() => {
        const tooltip = document.getElementById('copiedTooltip');
        tooltip.classList.add('show');
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 2000);
    }).catch(err => {
        console.error('Copy failed', err);
    });
}

// Handle Form Submit
if (donationForm) {
    donationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Change Modal UI to success
        step1.classList.add('hidden');
        step2.classList.remove('hidden');
    });
}

// Close Modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
