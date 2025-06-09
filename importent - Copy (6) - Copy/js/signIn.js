var typed4 = new Typed('#email', {
    strings: ['|', '|'],
    typeSpeed: 50,
    backSpeed: 0,
    attr: 'placeholder',
    bindInputFocusEvents: true,
    loop: true

});
var typed4 = new Typed('#password', {
    strings: ['123456789', '54862542@', 'jyts@45896', 'cv897888', 'a56@85ty', 'bvsds56245', 'jhh@tdsf'],
    typeSpeed: 100,
    backSpeed: 0,
    attr: 'placeholder',
    bindInputFocusEvents: true,
    loop: true
});

const supabase = window.supabase.createClient(
'https://nomuylulsjtwjoinrxmr.supabase.co',
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vbXV5bHVsc2p0d2pvaW5yeG1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NzgwOTgsImV4cCI6MjA2MTI1NDA5OH0.9Vgp9y1EQkbH2GooJgUmXjW4NEA-WY8keL4P5S1tiIc'
);

document.getElementById("loginBtn").addEventListener("click", async () => {
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const errorDiv = document.getElementById("error");

const { data, error } = await supabase.auth.signInWithPassword({
email,
password
});

if (error) {
Swal.fire({
  icon: "error",
  title: "Ooops",
  text:"The email or password you entered is incorrect!",
  footer: '<a href="./index.html" style="color: rgb(0, 185, 241);">Create an acount</a>'
});



} else {
// If user x add the user
const { data: existingUser, error: selectError } = await supabase
  .from('usersinfo')
  .select('*')
  .eq('email', email)
  .single();

if (!existingUser) {
  await supabase.from('usersinfo').insert([{ email }]);
}

window.location.href = "main.html"; // هدایت به صفحه اصلی
}
}
);