const showRes = document.querySelector(".menu-item.show-reservas");
const showUser = document.querySelector(".menu-item.show-usuarios");

const frameRes = document.querySelector(".frame-reservas");
const frameUser = document.querySelector(".frame-usuarios");



showRes.addEventListener("click",()=>{
    frameUser.classList.remove('active');
    setTimeout(()=>{
        frameRes.classList.add('active');
    },250);
});

showUser.addEventListener("click",()=>{
    frameRes.classList.remove('active');
    setTimeout(()=>{
        frameUser.classList.add('active');
    },250);
});