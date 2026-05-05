const html = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) html.setAttribute('data-theme', savedTheme);

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

const header = document.querySelector('nav');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

document.addEventListener('DOMContentLoaded', () => {

    const ticker = document.getElementById('ticker');
    if (ticker) ticker.innerHTML += ticker.innerHTML;

    const loginOverlay = document.getElementById('login-overlay');
    function LoginToggle() { loginOverlay.classList.add('active'); }
    function LoginCancel() { loginOverlay.classList.remove('active'); }

    function ShowPassword() {
        const input = document.getElementById('password-input');
        input.type = input.type === 'password' ? 'text' : 'password';
    }

    function ShowConfirmPassword() {
        const input = document.getElementById('confirm-password-input');
        input.type = input.type === 'password' ? 'text' : 'password';
    }

    let currentTab = 'login';
    const registerField = document.getElementById('register-field');
    if (registerField) registerField.style.display = 'none';

    function SwitchTab(tab) {
        currentTab = tab;
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById('tab-' + tab).classList.add('active');
        const isRegister = tab === 'register';
        registerField.style.display = isRegister ? 'flex' : 'none';
        document.getElementById('forget-link').style.display = isRegister ? 'none' : 'block';
        document.getElementById('submit-btn').textContent = isRegister ? 'Register' : 'Login';
    }

    function HandleSubmit() {
        const email    = document.getElementById('email-input').value.trim();
        const password = document.getElementById('password-input').value;

        if (!email || !password) { alert('Please fill in all fields.'); return; }

        if (currentTab === 'register') {
            const name    = document.getElementById('name-input').value.trim();
            const confirm = document.getElementById('confirm-password-input').value;
            if (!name)                { alert('Please enter your full name.');                      return; }
            if (password !== confirm) { alert('Passwords do not match.');                           return; }
            if (localStorage.getItem('user_' + email + '_password')) { alert('Email already exists.'); return; }
            localStorage.setItem('user_' + email + '_name',     name);
            localStorage.setItem('user_' + email + '_password', password);
            localStorage.setItem('loggedInEmail', email);
        } else {
            const storedPass = localStorage.getItem('user_' + email + '_password');
            if (!storedPass)             { alert('No account found. Please register first.'); return; }
            if (storedPass !== password) { alert('Incorrect password.');                      return; }
            localStorage.setItem('loggedInEmail', email);
        }

        LoginCancel();
        applyLoginState();
    }

    function Logout() {
        localStorage.removeItem('loggedInEmail');
        location.reload();
    }

    function applyLoginState() {
        const email = localStorage.getItem('loggedInEmail');
        if (!email) return;
        const name      = localStorage.getItem('user_' + email + '_name');
        const firstName = name.split(' ')[0];
        const btn       = document.getElementById('login/register');
        if (!btn) return;
        btn.textContent  = 'Hello, ' + firstName + '!';
        btn.onclick      = Logout;
        btn.style.cursor = 'pointer';
    }

    window.LoginToggle       = LoginToggle;
    window.LoginCancel       = LoginCancel;
    window.ShowPassword      = ShowPassword;
    window.ShowConfirmPassword = ShowConfirmPassword;
    window.SwitchTab         = SwitchTab;
    window.HandleSubmit      = HandleSubmit;

    applyLoginState();
});
// Back button
function BackToggle() {
    window.history.back();
}