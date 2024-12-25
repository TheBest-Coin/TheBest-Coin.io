window.addEventListener('load', function() {
    // زمانی که تمام محتوا بارگذاری شد
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');

    // مخفی کردن صفحه لودینگ و نمایش محتوای اصلی
    loadingScreen.style.display = 'none';
    mainContent.style.display = 'block';
});
