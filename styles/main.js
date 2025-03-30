let a = document.getElementById('coinImage');
let r = document.getElementById('tokenCount');
let RcoinP = document.getElementById('Rcoin-Pargraph');

let pval = localStorage.getItem('plusValue');
let ps = document.getElementById('plus-s');
ps.innerText=pval;
let Rcoin = localStorage.getItem("Rcoin");
RcoinP.innerText = Rcoin;

let plusNum = localStorage.getItem('plusValue');
let SpanViewPlus = document.getElementById('plus-s');
let b = localStorage.getItem('Vcoin');
r.innerText = b;
a.addEventListener('click' , () =>{
    let Cb = localStorage.getItem('plusValue');

    if (Cb >= 1){
        b ++;
    r.innerText = b;
    localStorage.setItem('Vcoin',b);
    plusValue --;
    SpanViewPlus.innerHTML = plusValue;
    localStorage.setItem ('plusValue', plusValue);

    }else{
        window.location.href = "./pages/charg.html";
    }


});

document.getElementById('wallet').addEventListener('click',()=>{
    window.location.href = "./pages/wallet-page.html";
})
document.getElementById('friend').addEventListener('click',()=>{
    window.location.href = "./pages/friend-page.html";
})
document.getElementById('Charg').addEventListener('click',()=>{
    window.location.href = "./pages/charg.html";
})
document.getElementById('todo').addEventListener('click',()=>{
    window.location.href = "./pages/todo.html";
})
