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

for (var i = 0; i < modalPedidoLibroOpen.length; i++) {
    
    modalPedidoLibroOpen[i].addEventListener("click",()=>{
        modalPedidoLibro.classList.add('active');
    });
    
}

for (var i = 0; i < modalDelLibroOpen.length; i++) {
    
    modalEditLibroOpen[i].addEventListener("click",()=>{
        modalEditLibro.classList.add('active');
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