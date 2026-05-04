const html = document.documentElement;
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
}

// Theme toggle
function ThemeToggle() {
    const currentTheme = html.getAttribute('data-theme');
    if (currentTheme === 'light') {
        html.removeAttribute('data-theme');
        localStorage.removeItem('theme');
    } else {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// Header dynamic change on scroll
const header = document.querySelector('nav');
if (header) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Ticker — only run if element exists
const ticker = document.getElementById('ticker');
if (ticker) {
    ticker.innerHTML += ticker.innerHTML;
}

// Login overlay — only run if element exists
const loginOverlay = document.getElementById('login-overlay');

function LoginToggle() {
    if (loginOverlay) {
        loginOverlay.classList.add('active');
    }
}

function LoginCancel() {
    if (loginOverlay) {
        loginOverlay.classList.remove('active');
    }
}

// Show password
const showPassBtn = document.getElementsByClassName('show-password')[0];
const formInput = document.getElementById('password-input');

function ShowPassword() {
    if (formInput) {
        formInput.type = formInput.type === 'password' ? 'text' : 'password';
    }
}

// Login/register tab switch
const registerField = document.getElementById('register-field');
if (registerField) {
    registerField.style.display = 'none';
}

function SwitchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    const tabEl = document.getElementById('tab-' + tab);
    if (tabEl) tabEl.classList.add('active');

    const isRegister = tab === 'register';
    if (registerField) registerField.style.display = isRegister ? 'flex' : 'none';

    const forgetLink = document.getElementById('forget-link');
    if (forgetLink) forgetLink.style.display = isRegister ? 'none' : 'block';

    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) submitBtn.textContent = isRegister ? 'Register' : 'Login';
}

// Back button
function BackToggle() {
    window.history.back();
}
