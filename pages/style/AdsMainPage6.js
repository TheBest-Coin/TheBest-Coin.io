// let BcoinBalance = localStorage.getItem("BestCoinBalance");
let Charg = parseInt(localStorage.getItem("Charg")) || 0;
let Rcoin = parseInt(localStorage.getItem("Rcoin")) || 0;


let MenuDisplay = document.getElementById("dis-none");
let styleBtn = document.getElementById("claim-btn-green");
let NextPage = document.getElementById('NextPage');


const button = document.getElementById('ad-button')
button?.addEventListener('click', () => {
    // window.TelegramAdsController.triggerNativeNotification().then((result) => {

        Charg +=20;
        Rcoin +=1;

        localStorage.setItem("Charg",Charg);
        localStorage.setItem("Rcoin",Rcoin);
        console.log(Rcoin);

        styleBtn.className ="GreenClaimButton";
        NextPage.addEventListener("click", () =>{
            window.location.href = "./tv-page7.html";
        });
        styleBtn.addEventListener('click',()=>{
            console.log("Claim Btn was Click");
            window.location.href = "../index.html";
        });


    // }).catch((result) => {

        MenuDisplay.style.display="flex";

    // });
});

function refreshAdpage(){
    window.location.href ="../index.html";

};
