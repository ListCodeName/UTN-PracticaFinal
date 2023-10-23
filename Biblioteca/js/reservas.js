const modalResClose = document.querySelector("#close-modal-res");
const modalResCancel = document.querySelector("#cancel-modal-res");
const modalRes = document.querySelectorAll(".modal-frame.modal-reserva");
const modalResOpen = document.querySelectorAll(".icon-plus.open-modal-res");


modalResClose.addEventListener("click", ()=>{
    modalRes.classList.remove('active');
});

for (var i = 0; i < modalDelUserOpen.length; i++) {
    modalResCancel.addEventListener("click", ()=>{
        modalRes.classList.remove('active');
    });
}

modalResOpen.addEventListener("click",()=>{
    modalRes.classList.add('active');
});

