let RcoinBalance = document.getElementById("Rcoin-Pargraph");
let B = localStorage.getItem('Rcoin');
let BtnShoed = document.getElementById("Plus-Rcoin");





BtnShoed?.addEventListener('click', ()=>{
    window.TelegramAdsController.triggerNativeNotification().then((result) =>{
    B++;
    RcoinBalance.innerText=B;
    LocalR = localStorage.setItem("Rcoin",B);
    }).catch((result)=>{

    });
});