
//Theme toggle ;)

const html = document.documentElement;
const savedTheme = localStorage.getItem('theme');

    if(savedTheme){
        html.setAttribute('data-theme',savedTheme);
    }
//Main call function

function ThemeToggle(){
    const currentTheme = html.getAttribute('data-theme');

    if(currentTheme === 'light'){
        html.removeAttribute('data-theme');
        localStorage.removeItem('theme');
    }

    else{
        html.setAttribute('data-theme','light');
        localStorage.setItem('theme','light');
    }

}
//The end of the theme switch :)

//Header dynamic change '-'

const header = document.querySelector('nav');

window.addEventListener('scroll', ()=>{
    if(window.scrollY > 50){
        header.classList.add('scrolled');
    }
    else{
        header.classList.remove('scrolled');
    }
});
//End of header dynamic change WOAAAAH :)

const ticker = document.getElementById('ticker');
ticker.innerHTML += ticker.innerHTML;
//the login click click WOAAAHHHH

const loginOverlay = document.getElementById('login-overlay');

function LoginToggle(){
    console.log("Login CLicked !");
    loginOverlay.classList.add('active');
}

function LoginCancel(){
    loginOverlay.classList.remove('active');
}


//Show password

const showPassBtn = document.getElementsByClassName('show-password')[0];
const formInput = document.getElementById('password-input');

function ShowPassword() {
    formInput.type = formInput.type === 'password' ? 'text' : 'password';
}
//login register switch ya 5waty
document.getElementById('register-field').style.display = 'none';
function SwitchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');

  const isRegister = tab === 'register';
  document.getElementById('register-field').style.display = isRegister ? 'flex' : 'none';
  document.getElementById('forget-link').style.display = isRegister ? 'none' : 'block';
  document.getElementById('submit-btn').textContent = isRegister ? 'Register' : 'Login';
}