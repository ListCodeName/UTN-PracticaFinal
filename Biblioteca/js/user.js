const modalAddUserClose = document.querySelector("#close-modal-add-user");
const modalAddUserCancel = document.querySelector("#cancel-modal-add-user");
const modalAddUser = document.querySelector(".modal-frame.modal-add-user");
const modalAddUserOpen = document.querySelector(".add-new-user");

const modalEditUserClose = document.querySelector("#close-modal-edit-user");
const modalEditUserCancel = document.querySelector("#cancel-modal-edit-user");
const modalEditUser = document.querySelector(".modal-frame.modal-edit-user");
const modalEditUserOpen = document.querySelector(".icon-pencil.edit-user");


modalAddUserClose.addEventListener("click", ()=>{
    modalAddUser.classList.remove('active');
});

modalAddUserCancel.addEventListener("click", ()=>{
    modalAddUser.classList.remove('active');
});

modalAddUserOpen.addEventListener("click",()=>{
    modalAddUser.classList.add('active');
});


modalEditUserClose.addEventListener("click", ()=>{
    modalEditUser.classList.remove('active');
});

modalEditUserCancel.addEventListener("click", ()=>{
    modalEditUser.classList.remove('active');
});

modalEditUserOpen.addEventListener("click",()=>{
    modalEditUser.classList.add('active');
});