const showRes = document.querySelector(".menu-item.show-reservas");
const showUser = document.querySelector(".menu-item.show-usuarios");
const showLibro = document.querySelector(".menu-item.show-libros");

const frameRes = document.querySelector(".frame-reservas");
const frameUser = document.querySelector(".frame-usuarios");
const frameLibro = document.querySelector(".frame-libros");



showRes.addEventListener("click",()=>{
    frameUser.classList.remove('active');
    frameLibro.classList.remove('active');
    setTimeout(()=>{
        frameRes.classList.add('active');
    },250);
});

showUser.addEventListener("click",()=>{
    frameRes.classList.remove('active');
    frameLibro.classList.remove('active');
    setTimeout(()=>{
        frameUser.classList.add('active');
    },250);
});

showLibro.addEventListener("click",()=>{
    frameUser.classList.remove('active');
    frameRes.classList.remove('active');
    setTimeout(()=>{
        frameLibro.classList.add('active');
    },250);
});