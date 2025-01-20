let a = document.getElementById('coinImage');
let r = document.getElementById('tokenCount');
let RcoinP = document.getElementById('Rcoin-Pargraph');

let Rcoin = localStorage.getItem("Rcoin");
RcoinP.innerText = Rcoin;

let b = localStorage.getItem('Vcoin');
r.innerText = b;
a.addEventListener('click' , () =>{
    b ++;
    r.innerText = b;
    // console.log(b);
    localStorage.setItem('Vcoin',b);


});
// a.addEventListener('click', ()=>{

//     if(b > 90){

//         console.log(b+" > 90");
    
//     } else if(b == 90){
//         console.log(b+" = 90");
    
//     }else{
//         console.log(b+" < 90");
    
//     };
// });