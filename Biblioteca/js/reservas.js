const modalResClose = document.querySelector("#close-modal-res");
const modalResCancel = document.querySelector("#cancel-modal-res");
const modalRes = document.querySelector(".modal-frame.modal-reserva");
const modalResOpen = document.querySelector(".icon-plus.open-modal-res");


modalResClose.addEventListener("click", ()=>{
    modalRes.classList.remove('active');
});

modalResCancel.addEventListener("click", ()=>{
    modalRes.classList.remove('active');
});


modalResOpen.addEventListener("click",()=>{
    modalRes.classList.add('active');
});