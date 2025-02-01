let RcoinBalance = document.getElementById("Rcoin-Pargraph");
let B = localStorage.getItem('Rcoin');
let BtnShoed = document.getElementById("Plus-Rcoin");
let spanplusvale = document.getElementById('plus-s');
let plusValue = parseInt(localStorage.getItem('plusValue'))||0;
document.getElementById('plus-s').innerHTML = plusValue;

BtnShoed?.addEventListener('click', ()=>{
    window.TelegramAdsController.triggerNativeNotification().then((result) =>{
    B++;
    RcoinBalance.innerText=B;
    LocalR = localStorage.setItem("Rcoin",B);
    plusValue += 15;
    document.getElementById('plus-s').innerHTML = plusValue;
    localStorage.setItem('plusValue',plusValue);
    }).catch((result)=>{

    });
});

















