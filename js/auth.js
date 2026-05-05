
function LoginToggle() {
    const overlay = document.getElementById('login-overlay');
    if (overlay) overlay.classList.add('active');
}

function LoginCancel() {
    const overlay = document.getElementById('login-overlay');
    if (overlay) overlay.classList.remove('active');
}

function ShowPassword() {
    const input = document.getElementById('password-input');
    if (input) input.type = input.type === 'password' ? 'text' : 'password';
}

function ShowConfirmPassword() {
    const input = document.getElementById('confirm-password-input');
    if (input) input.type = input.type === 'password' ? 'text' : 'password';
}

let currentTab = 'login';

function SwitchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById('tab-' + tab);
    if (activeBtn) activeBtn.classList.add('active');

    const registerField = document.getElementById('register-field');
    const forgetLink    = document.getElementById('forget-link');
    const submitBtn     = document.getElementById('submit-btn');
    const isRegister    = tab === 'register';

    if (registerField) registerField.style.display = isRegister ? 'flex'  : 'none';
    if (forgetLink)    forgetLink.style.display     = isRegister ? 'none'  : 'block';
    if (submitBtn)     submitBtn.textContent         = isRegister ? 'Register' : 'Login';
}

function HandleSubmit() {
    const email    = document.getElementById('email-input').value.trim();
    const password = document.getElementById('password-input').value;

    if (!email || !password) { alert('Please fill in all fields.'); return; }

    if (currentTab === 'register') {
        const name    = document.getElementById('name-input').value.trim();
        const confirm = document.getElementById('confirm-password-input').value;
        if (!name)                { alert('Please enter your full name.');          return; }
        if (password !== confirm) { alert('Passwords do not match.');               return; }
        if (localStorage.getItem('user_' + email + '_password')) {
            alert('Email already exists.'); return;
        }
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
    applyLoginState();   
}

function applyLoginState() {
    const email = localStorage.getItem('loggedInEmail');
    const btn   = document.getElementById('login/register');
    if (!btn) return;

    if (email) {
        const name      = localStorage.getItem('user_' + email + '_name') || email;
        const firstName = name.split(' ')[0];
        btn.textContent = 'Hello, ' + firstName + '!';
        btn.onclick     = Logout;
        btn.style.cursor = 'pointer';
    } else {
        // Restore default state when logged out
        btn.textContent = 'Login / Register';
        btn.onclick     = LoginToggle;
        btn.style.cursor = 'pointer';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const registerField = document.getElementById('register-field');
    if (registerField) registerField.style.display = 'none';

    applyLoginState();
});

window.LoginToggle         = LoginToggle;
window.LoginCancel         = LoginCancel;
window.ShowPassword        = ShowPassword;
window.ShowConfirmPassword = ShowConfirmPassword;
window.SwitchTab           = SwitchTab;
window.HandleSubmit        = HandleSubmit;
window.Logout              = Logout;
window.applyLoginState     = applyLoginState;