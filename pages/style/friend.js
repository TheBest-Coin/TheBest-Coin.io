

document.getElementById("ref-Gen").addEventListener('click',function(){
  // const randomid = Math.random().toString(36).substring(2,15);
  const referralLink = `https://t.me/share/url?url=https://t.me/TheBestCoinBot/?start=true`;
  window.location.href= `${referralLink} `;
  document.getElementById('pic-par').className ='FP2';

});
document.getElementById("BackBtn").addEventListener('click',() =>{
  window.location.href="../index.html";
});

