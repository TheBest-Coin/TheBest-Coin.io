
        // var typed = new Typed('#EmailP', {
        //     strings: ['input your email:'],
        //     typeSpeed: 50,
        // });
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

        document.getElementById("signupBtn").addEventListener("click", async () => {
            const email = document.getElementById("email");
            const password = document.getElementById("password");
            const errorDiv = document.getElementById("error");


            // بررسی وجود ایمیل در جدول usersinfo
            const { data: existingUsers, error: selectError } = await supabase
                .from('usersinfo')
                .select('email')
                .eq('email', email.value);

            if (existingUsers.length > 0) {
                Swal.fire({
                    icon: "warning",
                    title: "you already have account",
                    text: "Please log in to your account",
                    footer: '<a href="./log.html" style="color: orange;">Click here</a>'
                });
                return;
            } else {
                if (email.value.length < 7) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops!!",
                        text: "Please enter your email",
                    });
                    return;


                } else {

                    let { data, error } = await supabase.auth.signUp({
                        email: email.value,
                        password: password.value,
                        options: {
                            emailRedirectTo: 'http://127.0.0.1:5500/log.html' // آدرس باز شدن بعد از تأیید ایمیل
                        }

                    })
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Check your Email inbox"
                    });
                }

            }






        });