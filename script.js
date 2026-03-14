// Language Management
let currentLang = localStorage.getItem('selectedLang') || 'ur';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('selectedLang', lang);
    
    // Update HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ur' || lang === 'ar') ? 'rtl' : 'ltr';
    
    // Update Current Lang Label
    const labels = { en: 'English', ur: 'اردو', ar: 'العربية', fr: 'Français' };
    document.getElementById('current-lang-label').innerText = labels[lang];
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    // Refresh layout-sensitive components
    window.dispatchEvent(new Event('resize'));
}

// Preloader & Init
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.remove('loading');
            startCounters();
        }, 500);
    }, 1500);

    setLanguage(currentLang);
});

// Counter Animation
function startCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        
        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// Fatwa Form
const fatwaForm = document.getElementById('fatwaForm');
if (fatwaForm) {
    fatwaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = fatwaForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = currentLang === 'ur' ? 'جمع کیا جا رہا ہے...' : 'Submitting...';
        btn.disabled = true;

        setTimeout(() => {
            alert(currentLang === 'ur' ? 'آپ کا سوال موصول ہو گیا ہے۔ ہماری ٹیم جلد رابطہ کرے گی۔' : 'Your question has been received. Our team will contact you soon.');
            btn.innerText = originalText;
            btn.disabled = false;
            fatwaForm.reset();
        }, 2000);
    });
}

// Donation Logic
let selectedAmount = 1000;
function selectAmount(amt) {
    selectedAmount = amt;
    document.querySelectorAll('.opt').forEach(opt => opt.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('modal-amount-input').value = amt;
}

function openPaymentModal() {
    document.getElementById('paymentModal').classList.add('active');
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.remove('active');
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.background = 'white';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.background = 'rgba(255,255,255,0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Mobile Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.querySelector('i').classList.toggle('fa-bars');
        mobileToggle.querySelector('i').classList.toggle('fa-times');
    });
}

// FAQ Logic
document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
        const item = q.parentElement;
        item.classList.toggle('active');
    });
});

// Footer Year
document.getElementById('year').innerText = new Date().getFullYear();
