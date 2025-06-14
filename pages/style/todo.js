let RcoinV = localStorage.getItem('Rcoin');

document.getElementById('B-Value-1').innerText=RcoinV;
document.getElementById('B-Value-2').innerText=RcoinV;
document.getElementById('B-Value-3').innerText=RcoinV;
document.getElementById('B-Value-4').innerText=RcoinV;
document.getElementById('BackBtn').addEventListener('click',()=>{
    window.location.href="../index.html";
});

let G100 = localStorage.getItem('Gi100');

let Claim10 = document.getElementById('ClaimD-10');
let Claim100 = document.getElementById('ClaimD-100');
let Claim1000 = document.getElementById('ClaimD-1000');
let Claim5000 = document.getElementById('ClaimD-5000');


let pluser10 = parseInt(localStorage.getItem('Rcoin'));
console.log(localStorage.getItem('Rcoin'));
if(RcoinV >=100){
    document.getElementById('Changer10').innerHTML= `<input type="submit" id="G10" value="Claim" class="GreenBtn G1">`;
    
    document.getElementById('G10').addEventListener('click',()=>{
    document.getElementById('Changer10').innerHTML= `<input type="submit" id="G10" value="Claim" class="GrayBtn">`;
    localStorage.setItem('Button','true');
    pluser10 +=10;
    localStorage.setItem('Rcoin',pluser10);
    console.log(pluser10);
})
}
if (localStorage.getItem('Button')==='true'){
    document.getElementById('Changer10').innerHTML=`<input type="submit" id="G10" value="Claim" class="GrayBtn">`;
}

if(RcoinV >=1000){
    document.getElementById('Changer100').innerHTML= `<input type="submit" id="G100" value="Claim" class="GreenBtn G1">`;

    document.getElementById('G100').addEventListener('click',()=>{
        document.getElementById('Changer100').innerHTML= `<input type="submit" id="G10" value="Claim" class="GrayBtn">`;
        localStorage.setItem('Button2','true');
        pluser10 +=100;
        localStorage.setItem('Rcoin',pluser10);
        console.log(pluser10);
    })
}
if (localStorage.getItem('Button2')==='true'){
    document.getElementById('Changer100').innerHTML=`<input type="submit" id="G10" value="Claim" class="GrayBtn">`;
}

if(RcoinV >=10000){
    document.getElementById('Changer1K').innerHTML= `<input type="submit" id="G1000" value="Claim" class="GreenBtn G1">`;

    document.getElementById('G1000').addEventListener('click',()=>{
        document.getElementById('Changer1K').innerHTML= `<input type="submit" id="G10" value="Claim" class="GrayBtn">`;
        localStorage.setItem('Button3','true');
        pluser10 +=500;
        localStorage.setItem('Rcoin',pluser10);
        console.log(pluser10);
    })
}
if (localStorage.getItem('Button3')==='true'){
    document.getElementById('Changer1K').innerHTML=`<input type="submit" id="G10" value="Claim" class="GrayBtn">`;
}


if(RcoinV >=50000){
    document.getElementById('Changer50K').innerHTML= `<input type="submit" id="G50K" value="Claim" class="GreenBtn G1">`;

    document.getElementById('G50K').addEventListener('click',()=>{
        document.getElementById('Changer50K').innerHTML= `<input type="submit" id="G10" value="Claim" class="GrayBtn">`;
        localStorage.setItem('Button4','true');
        pluser10 +=5000;
        localStorage.setItem('Rcoin',pluser10);
        console.log(pluser10);
    })
}
if (localStorage.getItem('Button4')==='true'){
    document.getElementById('Changer50K').innerHTML=`<input type="submit" id="G10" value="Claim" class="GrayBtn">`;
}



