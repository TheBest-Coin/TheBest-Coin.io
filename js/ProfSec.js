const supabase = window.supabase.createClient(
    'https://nomuylulsjtwjoinrxmr.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vbXV5bHVsc2p0d2pvaW5yeG1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NzgwOTgsImV4cCI6MjA2MTI1NDA5OH0.9Vgp9y1EQkbH2GooJgUmXjW4NEA-WY8keL4P5S1tiIc'
  );

  const username = document.getElementById('Userp');
  const Rank = document.getElementById('Ranks');
  const level = document.getElementById('Levelp');
  const Points = document.getElementById('Pointsp');
  const headerPoint = document.getElementById('pointvalue');
  const emailbox = document.getElementById('emailpp');
  const robo = document.getElementById('robotz');
  const robohiden = document.getElementById('robozhiden');


  if (localStorage.getItem('robotz')) {
    robohiden.className = 'robotZnone';
  }
  document.getElementById('notrobot').addEventListener('click', () => {
    localStorage.setItem('robotz', 'true')
    robohiden.className = 'robotZnone';
    location.reload();
  })

  async function checkAndInsertUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      // importt
      // alert("you cant log!");
      window.location.href = "log.html";
      return;
    }

    const { data: existingUser, error } = await supabase
      .from('usersinfo')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (existingUser) {

      console.log("کاربر قبلاً ثبت شده:");

      //h2 viewer
      // console.log(existingUser)
      username.innerText = `Username: ${existingUser.name}`;
      Rank.innerText = `${existingUser.Rank}`;
      level.innerText = ` ${existingUser.Level}`;
      Points.innerText = `Points: ${existingUser.Points}`;
      headerPoint.innerText = ` ${existingUser.Points}`;
      emailbox.innerText = ` ${existingUser.email}`;

      console.log(Rank.innerText);
      if (Rank.innerText == 'Silver') {
        Rank.className = 'SilverRank';

      } else if (Rank.innerText == 'Golden') {
        Rank.className = 'GoldenRank';
      } else if (Rank.innerText == 'Diamond') {
        Rank.className = 'DiamondRank';

      }


        // clg info
      // console.log(existingUser); 
    } else {
      const email = user.email;
      const username = email.split('@')[0];

      const { error: insertError } = await supabase.from('usersinfo').insert([{
        user_id: user.id,
        name: username,
        email: email,
        Points: 5,
        is_active: true,
        created_at: new Date().toISOString(),
      }]);

      if (insertError) {
        console.error("Error to add user:", insertError.message);
      } else {
        console.log("User Add");
      }
    }

  }
  checkAndInsertUser();
  // logOut
  document.getElementById('LogOutbtn').addEventListener('click', () => {
    async function logOut() {
      const { error } = await supabase.auth.signOut()
    } logOut();
    setTimeout(function () {
      location.reload();

    }, 1000);
    localStorage.removeItem('robotz')
  })

  function sendEmail() {
    const email = 'blackalpha85a@gmail.com';
    window.location.href = `mailto:${email}`;
  };



  // 3 foter btn
  // <input type="button" id="Profileinput" class="textshadowbtn" value="Profile">
  //   <input type="button" id="Shopinput" value="Shop">
  //   <input type="button" id="Earninput" value="Earn">

  const Profbtn = document.getElementById('Profileinput');
  const shopbtn = document.getElementById('Shopinput');
  const earnbtn = document.getElementById('Earninput');

  

  Profbtn.addEventListener('click', () => {
    Profbtn.className = 'textshadowbtn';
    shopbtn.className = '';
    earnbtn.className = '';
    document.getElementById('earnsec').style.display='none';
    document.getElementById('profsec').style.display='flex';
    document.getElementById('shopsec').style.display='none';
  });
  shopbtn.addEventListener('click', () => {
    Profbtn.className = '';
    shopbtn.className = 'textshadowbtn';
    earnbtn.className = '';
    document.getElementById('profsec').style.display='none';
    document.getElementById('shopsec').style.display='flex';
    document.getElementById('earnsec').style.display='none';

  });
  earnbtn.addEventListener('click', () => {
    Profbtn.className = '';
    shopbtn.className = '';
    earnbtn.className = 'textshadowbtn';
    document.getElementById('profsec').style.display='none';
    document.getElementById('earnsec').style.display='flex';
    document.getElementById('shopsec').style.display='none';
  })