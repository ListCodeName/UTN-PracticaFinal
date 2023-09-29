document.getElementById("close-login").addEventListener('click', ()=>{
    document.getElementById("login-cont").style.opacity = "0";
    setTimeout(()=>{
        document.getElementById("login").style.position = "absolute";
        document.getElementById("login").style.right = "-50%";
    
    },250);
});

document.getElementById("open-login").addEventListener('click', ()=>{
    document.getElementById("login").style.position = "fixed";
    document.getElementById("login").style.right = "0px";
    setTimeout(()=>{
        document.getElementById("login-cont").style.opacity = "1";
    },300);
});
