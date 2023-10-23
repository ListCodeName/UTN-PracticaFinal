modalAddLibroClose = document.querySelector(".close-modal-add-libro");
modalAddLibroCancel = document.querySelector(".cancel-modal-add-libro");
modalAddLibro = document.querySelector(".modal-add-libro");
modalAddLibroOpen = document.querySelector(".add-new-libro");

modalEditLibroClose = document.querySelector(".close-modal-edit-libro");
modalEditLibroCancel = document.querySelector(".cancel-modal-edit-libro");
modalEditLibro = document.querySelector(".modal-frame.modal-edit-libro");
modalEditLibroOpen = document.querySelectorAll(".edit-libro");

modalPedidoLibroClose = document.querySelector(".close-modal-edit-libro-pedido");
modalPedidolibroCancel = document.querySelector(".cancel-modal-edit-libro-pedido");
modalPedidoLibro = document.querySelector(".modal-edit-libro-pedido");
modalPedidoLibroOpen = document.querySelectorAll(".edit-libro-pedido");

modalDelLibroClose = document.querySelector(".close-modal-del-libro");
modalDelLibroCancel = document.querySelector(".cancel-modal-del-libro");
modalDelLibro = document.querySelector(".modal-del-libro");
modalDelLibroOpen = document.querySelectorAll(".del-libro");


modalEditLibroClose.addEventListener("click", ()=>{
    modalEditLibro.classList.remove('active');
});

modalEditLibroCancel.addEventListener("click", ()=>{
    modalEditLibro.classList.remove('active');
});


modalPedidoLibroClose.addEventListener("click", ()=>{
    modalPedidoLibro.classList.remove('active');
});

modalPedidolibroCancel.addEventListener("click", ()=>{
    modalPedidoLibro.classList.remove('active');
});


modalDelLibroClose.addEventListener("click", ()=>{
    modalDelLibro.classList.remove('active');
});

modalDelLibroCancel.addEventListener("click", ()=>{
    modalDelLibro.classList.remove('active');
});


for (var i = 0; i < modalDelLibroOpen.length; i++) {
    
    modalEditLibroOpen[i].addEventListener("click",()=>{
        modalEditLibro.classList.add('active');
    });
    
    
    modalPedidoLibroOpen[i].addEventListener("click",()=>{
        modalPedidoLibro.classList.add('active');
    });
    
    
    modalDelLibroOpen[i].addEventListener("click",()=>{
        modalDelLibro.classList.add('active');
    });
    
}


modalAddLibroClose.addEventListener("click", ()=>{
    modalAddLibro.classList.remove('active');
});

modalAddLibroCancel.addEventListener("click", ()=>{
    modalAddLibro.classList.remove('active');
});

modalAddLibroOpen.addEventListener("click",()=>{
    modalAddLibro.classList.add('active');
});