// navbar toggle 열리고 닫히게하는 js
const toggleBtn = document.querySelector('.navbar_toogleBtn');
const menu = document.querySelector('.navbar_menu');
const signup_login = document.querySelector('.navbar_signup_login');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});