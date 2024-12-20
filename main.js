// شناسه کاربر
const userId = 'user1234'; // شناسه منحصر به فرد کاربر

// تابع برای ذخیره موجودی سکه
function setCoins(userId, coins) {
    localStorage.setItem(userId, coins);
}

// تابع برای دریافت موجودی سکه
function getCoins(userId) {
    return parseInt(localStorage.getItem(userId)) || 0; // اگر موجودی وجود نداشت، 0 برگردانید
}

// تابع برای تولید لینک رفرال
function generateReferralLink() {
    const referralLink = `https://thebest-coin.github.io/TheBest-Coin.io?ref=${userId}`;
    document.getElementById('referralLink').value = referralLink;
    document.getElementById('referralLinkContainer').style.display = 'block';
}

// تابع برای بررسی لینک رفرال
function checkReferral() {
    const urlParams = new URLSearchParams(window.location.search);
    const refId = urlParams.get('ref'); // دریافت شناسه رفرال

    if (refId) {
        const currentCoins = getCoins(refId);
        setCoins(refId, currentCoins + 1); // اضافه کردن 1 سکه به موجودی کاربر رفرال
        alert(`به کاربر ${refId} 1 سکه اضافه شد!`);
    }
}

// نمایش موجودی سکه
function displayCoins() {
    const coins = getCoins(userId);
    document.getElementById('coinCount').innerText = coins;
}

// فراخوانی توابع
document.getElementById('generateLink').addEventListener('click', generateReferralLink);
checkReferral();
displayCoins();
