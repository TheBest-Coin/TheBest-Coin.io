let B = localStorage.getItem('Rcoin');
let pluserpar = document.getElementById('pluser-pareghraph');
let spanplusvale = document.getElementById('plus-s');
let plusValue = parseInt(localStorage.getItem('plusValue'))||0;

document.getElementById('BackBtn').addEventListener('click',()=>{
    window.location.href="../index.html";
});

let BtnShoed = document.getElementById('Pluser')
let chargVal = localStorage.getItem('plusValue')
pluserpar.innerText=chargVal;

BtnShoed?.addEventListener('click', ()=>{
    // window.TelegramAdsController.triggerNativeNotification().then((result) =>{
    B++;
    LocalR = localStorage.setItem("Rcoin",B);
    plusValue += 15;
    localStorage.setItem('plusValue',plusValue);
    pluserpar.innerText=plusValue;
    // }).catch((result)=>{
    // });
});
