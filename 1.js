const menuBar = document.querySelector(".burger");
const menuNav = document.querySelector(".menu");

menuBar.addEventListener('click', () => {
    menuNav.classList.toggle('menu-active');
})

const navbar = document.querySelector(".navbar");

window.addEventListener('scroll', () => {
    console.log(window.scrollY)
    const windowposition = window.scrollY > 0;
    navbar.classList.toggle("scrolling-active", windowposition  ) 
})