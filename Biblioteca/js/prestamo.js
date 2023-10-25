const slidePrestamo = document.querySelector(".modal-slide-form");
const slidePrestamoNext1 = document.querySelector(".icon-arrow-right.next1");
const slidePrestamoNext2 = document.querySelector(".icon-arrow-right.next2");
const slidePrestamoPrev1 = document.querySelector(".icon-arrow-left.previous1");
const slidePrestamoPrev2 = document.querySelector(".icon-arrow-left.previous2");

slidePrestamoNext1.addEventListener("click",()=>{
    slidePrestamo.style.left = "-100%";
});

slidePrestamoNext2.addEventListener("click",()=>{
    slidePrestamo.style.left = "-200%";
});

slidePrestamoPrev1.addEventListener("click",()=>{
    slidePrestamo.style.left = "0%";
});

slidePrestamoPrev2.addEventListener("click",()=>{
    slidePrestamo.style.left = "-100%";
});