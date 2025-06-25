
const supabase = window.supabase.createClient(
  'https://nomuylulsjtwjoinrxmr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vbXV5bHVsc2p0d2pvaW5yeG1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NzgwOTgsImV4cCI6MjA2MTI1NDA5OH0.9Vgp9y1EQkbH2GooJgUmXjW4NEA-WY8keL4P5S1tiIc'
);
// .............Refresh page
window.addEventListener('load', () => {
  Profbtn.className = 'textshadowbtn';
  document.getElementById('earnsec').style.display = 'none';
  document.getElementById('profsec').style.display = 'flex';
  document.getElementById('shopsec').style.display = 'none';
});
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

    console.log("User add");

    //h2 viewer
    // console.log(existingUser)
    username.innerText = `Username: ${existingUser.name}`;
    Rank.innerText = `${existingUser.Rank}`;
    level.innerText = ` ${existingUser.Level}`;
    Points.innerText = `Points: ${existingUser.Points}`;
    headerPoint.innerText = ` ${existingUser.Points}`;
    emailbox.innerText = ` ${existingUser.email}`;

    // console.log(Rank.innerText);



    // ..................shop sec.............................. 
    if (Rank.innerText == 'Silver') {

      Rank.className = 'SilverRank';
      // console.log('Silver Rank');
      async function ShopSilverRank() {
        const { data: SilverRank, error } = await supabase
          .from('SilverRank')
          .select('*')
        if (error) {
          console.log('error :', error);
        } else {
          // console.log('data :',SilverRank);
        }

        const SilverPack = SilverRank;
        // free110
        document.getElementById('Gem110').innerText = `${SilverPack.find(item => item.PackName === '100+10 Gem Free Fire').PNeed}`;
        document.getElementById('FreeDiv110').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('Cardimage').src = './pics/1748258785830.png';
          document.getElementById('pUpderid').innerText = 'Free Fire id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your Free Fire id ';
          document.getElementById('P').innerText = `${SilverPack.find(item => item.PackName === '100+10 Gem Free Fire').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${SilverPack.find(item => item.PackName === '100+10 Gem Free Fire').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop110Gem
          let Name110 = document.getElementById('Name');
          let Email110 = document.getElementById('Email');
          let Id110 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop110() {
              // PNeed110Gem = existingUser.Points;
              GemSilverPack110 = SilverPack.find(item => item.PackName === '100+10 Gem Free Fire').PNeed;
              // console.log(PNeed110Gem, GemSilverPack110);
              if (Name110.value.length > 1 && Email110.value.length > 4 && Id110.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop110Gem() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeed110Gem = parseInt(GemSilverPack110);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 1;

                  if (user_Point >= PNeed110Gem) {
                    const UShop110Gem = user_Point - PNeed110Gem;
                    console.log(UShop110Gem);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop110Gem, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      console.error('Please Charg your Account', error);

                    } else {
                      // shop 110Gem FreeFire Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data110, error110 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: SilverPack.find(item => item.PackName === '100+10 Gem Free Fire').PackName,
                            User_Name: Name110.value,
                            Gmail: Email110.value,
                            id_Uid_address: Id110.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name110.value = '';
                      Email110.value = '';
                      Id110.value = '';

                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop110Gem();


              } else {
                if (Name110.value.length > 1 && Email110.value.length > 4 && Id110.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }


            } Shop110();
          });
        });
        // free220
        document.getElementById('Gem200').innerText = `${SilverPack.find(item => item.PackName === '210+21 Gem Free Fire').PNeed}`;
        document.getElementById('FreeDiv221').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('Cardimage').src = './pics/1748258785830.png';
          document.getElementById('pUpderid').innerText = 'Free Fire id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your Free Fire id ';
          document.getElementById('P').innerText = `${SilverPack.find(item => item.PackName === '210+21 Gem Free Fire').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${SilverPack.find(item => item.PackName === '210+21 Gem Free Fire').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop221Gem
          let Name221 = document.getElementById('Name');
          let Email221 = document.getElementById('Email');
          let Id221 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop221() {
              GemGolden221 = SilverPack.find(item => item.PackName === '210+21 Gem Free Fire').PNeed;
              if (Name221.value.length > 1 && Email221.value.length > 4 && Id221.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop221Gem() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(GemGolden221);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 2;

                  if (user_Point >= PNeedGem) {
                    const UShop221Gem = user_Point - PNeedGem;
                    console.log(UShop221Gem);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop221Gem, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      console.error('Please Charg your Account', error);

                    } else {
                      // shop 110Gem FreeFire Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data221, error221 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: SilverPack.find(item => item.PackName === '210+21 Gem Free Fire').PackName,
                            User_Name: Name221.value,
                            Gmail: Email221.value,
                            id_Uid_address: Id221.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name221.value = '';
                      Email221.value = '';
                      Id221.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop221Gem();


              } else {
                if (Name221.value.length > 1 && Email221.value.length > 4 && Id221.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }
              // else if(Name110.value.length <1 && Email110.value.length < 4 && Id110.value.length < 5 ){
              //   console.log('cant');
              // }



              // console.log(`data${data110}`);
              // console.log(`error${error110}`);

            } Shop221();
          });
        });
        // free530
        document.getElementById('Gem500').innerText = `${SilverPack.find(item => item.PackName === '530+53 Gem Free Fire').PNeed}`;
        document.getElementById('FreeDiv530').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('Cardimage').src = './pics/1748258785830.png';
          document.getElementById('pUpderid').innerText = 'Free Fire id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your Free Fire id ';
          document.getElementById('P').innerText = `${SilverPack.find(item => item.PackName === '530+53 Gem Free Fire').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${SilverPack.find(item => item.PackName === '530+53 Gem Free Fire').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop530Gem
          let Name530 = document.getElementById('Name');
          let Email530 = document.getElementById('Email');
          let Id530 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop530() {
              GemGolden530 = SilverPack.find(item => item.PackName === '530+53 Gem Free Fire').PNeed;
              if (Name530.value.length > 1 && Email530.value.length > 4 && Id530.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop530Gem() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(GemGolden530);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 5;

                  if (user_Point >= PNeedGem) {
                    const UShop530Gem = user_Point - PNeedGem;
                    console.log(UShop530Gem);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop530Gem, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      console.error('Please Charg your Account', error);

                    } else {
                      // shop 110Gem FreeFire Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data530, error530 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: SilverPack.find(item => item.PackName === '530+53 Gem Free Fire').PackName,
                            User_Name: Name530.value,
                            Gmail: Email530.value,
                            id_Uid_address: Id530.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name530.value = '';
                      Email530.value = '';
                      Id530.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop530Gem();


              } else {
                if (Name530.value.length > 1 && Email530.value.length > 4 && Id530.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }

            } Shop530();
          });
        });
        // free1080
        document.getElementById('Gem1080').innerText = `${SilverPack.find(item => item.PackName === '1080+108 Gem Free Fire').PNeed}`;
        document.getElementById('FreeDiv1188').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('Cardimage').src = './pics/1748258785830.png';
          document.getElementById('pUpderid').innerText = 'Free Fire id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your Free Fire id ';
          document.getElementById('P').innerText = `${SilverPack.find(item => item.PackName === '1080+108 Gem Free Fire').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${SilverPack.find(item => item.PackName === '1080+108 Gem Free Fire').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop1188Gem
          let Name1188 = document.getElementById('Name');
          let Email1188 = document.getElementById('Email');
          let Id1188 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop1188() {
              GemGolden1188 = SilverPack.find(item => item.PackName === '1080+108 Gem Free Fire').PNeed;
              if (Name1188.value.length > 1 && Email1188.value.length > 4 && Id1188.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop1188Gem() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(GemGolden1188);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 10;

                  if (user_Point >= PNeedGem) {
                    const UShop1188Gem = user_Point - PNeedGem;
                    console.log(UShop1188Gem);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop1188Gem, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      console.error('Please Charg your Account', error);

                    } else {
                      // shop 110Gem FreeFire Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data1188, error1188 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: SilverPack.find(item => item.PackName === '1080+108 Gem Free Fire').PackName,
                            User_Name: Name1188.value,
                            Gmail: Email1188.value,
                            id_Uid_address: Id1188.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name1188.value = '';
                      Email1188.value = '';
                      Id1188.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop1188Gem();


              } else {
                if (Name1188.value.length > 1 && Email1188.value.length > 4 && Id1188.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }

            } Shop1188();
          });
        });
        // free2200
        document.getElementById('Gem2200').innerText = `${SilverPack.find(item => item.PackName === '2200+220 Gem Free Fire').PNeed}`;
        document.getElementById('FreeDiv2200').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('Cardimage').src = './pics/1748258785830.png';
          document.getElementById('pUpderid').innerText = 'Free Fire id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your Free Fire id ';
          document.getElementById('P').innerText = `${SilverPack.find(item => item.PackName === '2200+220 Gem Free Fire').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${SilverPack.find(item => item.PackName === '2200+220 Gem Free Fire').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop1188Gem
          let Name2200 = document.getElementById('Name');
          let Email2200 = document.getElementById('Email');
          let Id2200 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop2200() {
              GemGolden2200 = SilverPack.find(item => item.PackName === '2200+220 Gem Free Fire').PNeed;
              if (Name2200.value.length > 1 && Email2200.value.length > 4 && Id2200.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop2200Gem() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(GemGolden2200);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 20;

                  if (user_Point >= PNeedGem) {
                    const UShop2200Gem = user_Point - PNeedGem;
                    console.log(UShop2200Gem);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop2200Gem, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      // console.error('Please Charg your Account', error);

                    } else {
                      // shop 110Gem FreeFire Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data2200, error2200 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: SilverPack.find(item => item.PackName === '2200+220 Gem Free Fire').PackName,
                            User_Name: Name2200.value,
                            Gmail: Email2200.value,
                            id_Uid_address: Id2200.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name2200.value = '';
                      Email2200.value = '';
                      Id2200.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop2200Gem();


              } else {
                if (Name2200.value.length > 1 && Email2200.value.length > 4 && Id2200.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }

            } Shop2200();
          });
        });



        // 60UC
        document.getElementById('UC60').innerText = `${SilverPack.find(item => item.PackName === '60 UC PUBG').PNeed}`;
        document.getElementById('PUBG60UC').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('pUpderid').innerText = 'PUBG id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your PUBG id ';
          document.getElementById('Cardimage').src = './pics/1748258785792.png';
          document.getElementById('P').innerText = `${SilverPack.find(item => item.PackName === '60 UC PUBG').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${SilverPack.find(item => item.PackName === '60 UC PUBG').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shopUC60
          let NameUC60 = document.getElementById('Name');
          let EmailUC60 = document.getElementById('Email');
          let IdUC60 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function ShopUC60() {
              GoldenUC60 = SilverPack.find(item => item.PackName === '60 UC PUBG').PNeed;
              if (NameUC60.value.length > 1 && EmailUC60.value.length > 4 && IdUC60.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function ShopUC60() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(GoldenUC60);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 1;

                  if (user_Point >= PNeedGem) {
                    const UShopUC60 = user_Point - PNeedGem;
                    console.log(UShopUC60);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShopUC60, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      // console.error('Please Charg your Account', error);

                    } else {
                      // shop UC60 PUBG Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { dataUC60, errorUC60 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: SilverPack.find(item => item.PackName === '60 UC PUBG').PackName,
                            User_Name: NameUC60.value,
                            Gmail: EmailUC60.value,
                            id_Uid_address: IdUC60.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      NameUC60.value = '';
                      EmailUC60.value = '';
                      IdUC60.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } ShopUC60();


              } else {
                if (NameUC60.value.length > 1 && EmailUC60.value.length > 4 && IdUC60.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }

            } ShopUC60();
          });
        });
        // 325UC
        document.getElementById('UC300').innerText = `${SilverPack.find(item => item.PackName === '300+25 UC PUBG').PNeed}`;
        document.getElementById('PUBG325UC').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('pUpderid').innerText = 'PUBG id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your PUBG id ';
          document.getElementById('Cardimage').src = './pics/1748258785792.png';
          document.getElementById('P').innerText = `${SilverPack.find(item => item.PackName === '300+25 UC PUBG').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${SilverPack.find(item => item.PackName === '300+25 UC PUBG').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shopUC325
          let Name325UC = document.getElementById('Name');
          let Email325UC = document.getElementById('Email');
          let Id325UC = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop325UC() {
              Golden325UC = SilverPack.find(item => item.PackName === '300+25 UC PUBG').PNeed;
              if (Name325UC.value.length > 1 && Email325UC.value.length > 4 && Id325UC.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop325UC() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(Golden325UC);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 3;

                  if (user_Point >= PNeedGem) {
                    const UShop325UC = user_Point - PNeedGem;
                    console.log(UShop325UC);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop325UC, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      // console.error('Please Charg your Account', error);

                    } else {
                      // shop UC60 PUBG Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data325UC, error325UC } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: SilverPack.find(item => item.PackName === '300+25 UC PUBG').PackName,
                            User_Name: Name325UC.value,
                            Gmail: Email325UC.value,
                            id_Uid_address: Id325UC.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name325UC.value = '';
                      Email325UC.value = '';
                      Id325UC.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop325UC();


              } else {
                if (Name325UC.value.length > 1 && Email325UC.value.length > 4 && Id325UC.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }

            } Shop325UC();
          });
        });
        // 660UC
        document.getElementById('UC600').innerText = `${SilverPack.find(item => item.PackName === '600+60 UC PUBG').PNeed}`;
        document.getElementById('PUBG660UC').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('pUpderid').innerText = 'PUBG id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your PUBG id ';
          document.getElementById('Cardimage').src = './pics/1748258785792.png';
          document.getElementById('P').innerText = `${SilverPack.find(item => item.PackName === '600+60 UC PUBG').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${SilverPack.find(item => item.PackName === '600+60 UC PUBG').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop660UC
          let Name660UC = document.getElementById('Name');
          let Email660UC = document.getElementById('Email');
          let Id660UC = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop660UC() {
              Golden660UC = SilverPack.find(item => item.PackName === '600+60 UC PUBG').PNeed;
              if (Name660UC.value.length > 1 && Email660UC.value.length > 4 && Id660UC.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop660UC() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(Golden660UC);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 6;

                  if (user_Point >= PNeedGem) {
                    const UShop660UC = user_Point - PNeedGem;
                    console.log(UShop660UC);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop660UC, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      // console.error('Please Charg your Account', error);

                    } else {
                      // shop UC60 PUBG Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data660UC, error660UC } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: SilverPack.find(item => item.PackName === '600+60 UC PUBG').PackName,
                            User_Name: Name660UC.value,
                            Gmail: Email660UC.value,
                            id_Uid_address: Id660UC.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name660UC.value = '';
                      Email660UC.value = '';
                      Id660UC.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop660UC();


              } else {
                if (Name660UC.value.length > 1 && Email660UC.value.length > 4 && Id660UC.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }

            } Shop660UC();
          });
        });
        // FreePayGolden
        document.getElementById('GoldenRank').innerText = `${SilverPack.find(item => item.PackName === 'Golden Account FreePay').PNeed}`;
        document.getElementById('DivGoldendAccount').addEventListener('click', () => {
          document.getElementById('Cardimage').src = './pics/1749484908306.jpg';
          Swal.fire({
            title: " Golden Rank:",
            text: `${SilverPack.find(item => item.PackName === 'Golden Account FreePay').description}`,
            icon: "question"
          });

          document.getElementById('P').innerText = `${SilverPack.find(item => item.PackName === 'Golden Account FreePay').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${SilverPack.find(item => item.PackName === 'Golden Account FreePay').PNeed}`;
          document.getElementById('pUpderid').innerText = 'Account Rank Up';
          document.getElementById('pUpderid').style.backgroundColor = 'rgba(255, 192, 203, 0.275)';
          document.getElementById('id').style.pointerEvents = 'none';
          document.getElementById('id').style.backgroundColor = 'rgba(255, 192, 203, 0.275)';
          document.getElementById('id').value = ' This Account';
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shopDiamondAccount
          let NameDiamondAccount = document.getElementById('Name');
          let EmailDiamondAccount = document.getElementById('Email');
          // let IdDiamondAccount = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function ShopSilverAccount() {
              SilverGoldenAccount = SilverPack.find(item => item.PackName === 'Golden Account FreePay').PNeed;
              if (NameDiamondAccount.value.length > 1 && EmailDiamondAccount.value.length > 4) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function ShopSilverAccount() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(SilverGoldenAccount);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 10;

                  if (user_Point >= PNeedGem) {
                    const UShopDiamondAccount = user_Point - PNeedGem;
                    console.log(UShopDiamondAccount);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShopDiamondAccount, Level: userLevelUpdate, Rank: 'Golden' })
                      .eq('user_id', user.id)

                    if (error) {
                      // console.error('Please Charg your Account', error);

                    } else {
                      // shop DiamondAccount Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { dataDiamondAccount, errorDiamondAccount } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: SilverPack.find(item => item.PackName === 'Golden Account FreePay').PackName,
                            User_Name: NameDiamondAccount.value,
                            Gmail: EmailDiamondAccount.value,
                            Mode: 'Ok',
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      NameDiamondAccount.value = '';
                      EmailDiamondAccount.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } ShopSilverAccount();


              } else {
                if (NameDiamondAccount.value.length > 1 && EmailDiamondAccount.value.length > 4) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }

            } ShopSilverAccount();
          });
        });
        // FreePayDaimond
        document.getElementById('DiamondRank').innerText = `${SilverPack.find(item => item.PackName === ' Diamond Account FreePay').PNeed}`;
        document.getElementById('DivDiamondAccount').addEventListener('click', () => {
          document.getElementById('Cardimage').src = './pics/1749484908306.jpg';
          Swal.fire({
            title: " Diamond Rank:",
            text: `${SilverPack.find(item => item.PackName === ' Diamond Account FreePay').description}`,
            icon: "question"
          });

          document.getElementById('P').innerText = `${SilverPack.find(item => item.PackName === ' Diamond Account FreePay').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${SilverPack.find(item => item.PackName === ' Diamond Account FreePay').PNeed}`;
          document.getElementById('pUpderid').innerText = 'Account Rank Up';
          document.getElementById('pUpderid').style.backgroundColor = 'rgba(255, 192, 203, 0.275)';
          document.getElementById('id').style.pointerEvents = 'none';
          document.getElementById('id').style.backgroundColor = 'rgba(255, 192, 203, 0.275)';
          document.getElementById('id').value = ' This Account';
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shopDiamondAccount
          let NameDiamondAccount = document.getElementById('Name');
          let EmailDiamondAccount = document.getElementById('Email');
          // let IdDiamondAccount = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function ShopSilverAccount() {
              SilverGoldenAccount = SilverPack.find(item => item.PackName === ' Diamond Account FreePay').PNeed;
              if (NameDiamondAccount.value.length > 1 && EmailDiamondAccount.value.length > 4) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function ShopSilverAccount() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(SilverDiamondAccount);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 10;

                  if (user_Point >= PNeedGem) {
                    const UShopDiamondAccount = user_Point - PNeedGem;
                    console.log(UShopDiamondAccount);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShopDiamondAccount, Level: userLevelUpdate, Rank: 'Diamond' })
                      .eq('user_id', user.id)

                    if (error) {
                      // console.error('Please Charg your Account', error);

                    } else {
                      // shop DiamondAccount Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { dataDiamondAccount, errorDiamondAccount } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: SilverPack.find(item => item.PackName === ' Diamond Account FreePay').PackName,
                            User_Name: NameDiamondAccount.value,
                            Gmail: EmailDiamondAccount.value,
                            Mode: 'Ok',
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      NameDiamondAccount.value = '';
                      EmailDiamondAccount.value = '';
                      // Id660UC.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } ShopSilverAccount();


              } else {
                if (NameDiamondAccount.value.length > 1 && EmailDiamondAccount.value.length > 4) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }

            } ShopSilverAccount();
          });
        });
        // 15$
        document.getElementById('Tether15Value').innerText = `${SilverPack.find(item => item.PackName === '15$ tether trc20').PNeed}`;
        document.getElementById('DivTether15Trc20').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('pUpderid').innerText = 'Tether USDT (TRC20) Address:';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'TGKuY87SlkccqHzASJircuxHQLTi2MJRg8';
          document.getElementById('Cardimage').src = './pics/1749484596491.jpg';
          document.getElementById('P').innerText = `${SilverPack.find(item => item.PackName === '15$ tether trc20').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${SilverPack.find(item => item.PackName === '15$ tether trc20').PNeed}`;
          Swal.fire({
            title: " 15$ USDT ",
            text: `${SilverPack.find(item => item.PackName === '15$ tether trc20').description}`,
            icon: "warning"
          });
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop15TRC20
          let Name15TRC20 = document.getElementById('Name');
          let Email15TRC20 = document.getElementById('Email');
          let Id15TRC20 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop15TRC20() {
              Golden15TRC20 = SilverPack.find(item => item.PackName === '15$ tether trc20').PNeed;
              if (Name15TRC20.value.length > 1 && Email15TRC20.value.length > 4 && Id15TRC20.value.length > 30) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop15TRC20() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(Golden15TRC20);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 15;

                  if (user_Point >= PNeedGem) {
                    const UShop15TRC20 = user_Point - PNeedGem;
                    console.log(UShop15TRC20);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop15TRC20, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      // console.error('Please Charg your Account', error);

                    } else {
                      // shop 15TRC20 Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data15TRC20, error15TRC20 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: SilverPack.find(item => item.PackName === '15$ tether trc20').PackName,
                            User_Name: Name15TRC20.value,
                            Gmail: Email15TRC20.value,
                            id_Uid_address: Id15TRC20.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name15TRC20.value = '';
                      Email15TRC20.value = '';
                      Id15TRC20.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop15TRC20();


              } else {
                if (Name15TRC20.value.length > 1 && Email15TRC20.value.length > 4 && Id15TRC20.value.length > 30) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields or Check your wallet address",
                  icon: "warning",
                  draggable: true
                });
              }

            } Shop15TRC20();
          });
        });
        
        // 50$
        document.getElementById('Tether50Value').innerText = `${SilverPack.find(item => item.PackName === '50$ tether trc20').PNeed}`;
        document.getElementById('DivTether50Trc20').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('pUpderid').innerText = 'Tether USDT (TRC20) Address:';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'TGKuY87SlkccqHzASJircuxHQLTi2MJRg8';
          document.getElementById('Cardimage').src = './pics/1749484596491.jpg';
          document.getElementById('P').innerText = `${SilverPack.find(item => item.PackName === '50$ tether trc20').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${SilverPack.find(item => item.PackName === '50$ tether trc20').PNeed}`;
          Swal.fire({
            title: " 50$ USDT ",
            text: `${SilverPack.find(item => item.PackName === '50$ tether trc20').description}`,
            icon: "warning"
          });
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop50TRC20
          let Name50TRC20 = document.getElementById('Name');
          let Email50TRC20 = document.getElementById('Email');
          let Id50TRC20 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop50TRC20() {
              Golden50TRC20 = SilverPack.find(item => item.PackName === '50$ tether trc20').PNeed;
              if (Name50TRC20.value.length > 1 && Email50TRC20.value.length > 4 && Id50TRC20.value.length > 30) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop50TRC20() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(Golden50TRC20);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 50;

                  if (user_Point >= PNeedGem) {
                    const UShop50TRC20 = user_Point - PNeedGem;
                    console.log(UShop50TRC20);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop50TRC20, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      // console.error('Please Charg your Account', error);

                    } else {
                      // shop 50TRC20 Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data50TRC20, error50TRC20 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: SilverPack.find(item => item.PackName === '50$ tether trc20').PackName,
                            User_Name: Name50TRC20.value,
                            Gmail: Email50TRC20.value,
                            id_Uid_address: Id50TRC20.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name50TRC20.value = '';
                      Email50TRC20.value = '';
                      Id50TRC20.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop50TRC20();


              } else {
                if (Name50TRC20.value.length > 1 && Email50TRC20.value.length > 4 && Id50TRC20.value.length > 30) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields or Check your wallet address",
                  icon: "warning",
                  draggable: true
                });
              }

            } Shop50TRC20();
          });
        });

      } ShopSilverRank();

    } else if (Rank.innerText == 'Golden') {
      Rank.className = 'GoldenRank';

      async function ShopGoldenRank() {
        const { data: GoldenRank, error } = await supabase
          .from('GoldenRank')
          .select('*')
        if (error) {
          console.log('error :', error);
        } else {
          // console.log('data :',GoldenRank);
        }

        const GoldenPack = GoldenRank;
        // free110
        document.getElementById('Gem110').innerText = `${GoldenPack.find(item => item.PackName === '100+10 Gem Free Fire').PNeed}`;
        document.getElementById('FreeDiv110').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('Cardimage').src = './pics/1748258785830.png';
          document.getElementById('pUpderid').innerText = 'Free Fire id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your Free Fire id ';
          document.getElementById('P').innerText = `${GoldenPack.find(item => item.PackName === '100+10 Gem Free Fire').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${GoldenPack.find(item => item.PackName === '100+10 Gem Free Fire').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop110Gem
          let Name110 = document.getElementById('Name');
          let Email110 = document.getElementById('Email');
          let Id110 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop110() {
              // PNeed110Gem = existingUser.Points;
              GemGolden110 = GoldenPack.find(item => item.PackName === '100+10 Gem Free Fire').PNeed;
              // console.log(PNeed110Gem, GemGolden110);
              if (Name110.value.length > 1 && Email110.value.length > 4 && Id110.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop110Gem() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeed110Gem = parseInt(GemGolden110);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 1;

                  if (user_Point >= PNeed110Gem) {
                    const UShop110Gem = user_Point - PNeed110Gem;
                    console.log(UShop110Gem);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop110Gem, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      console.error('Please Charg your Account', error);

                    } else {
                      // shop 110Gem FreeFire Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data110, error110 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: GoldenPack.find(item => item.PackName === '100+10 Gem Free Fire').PackName,
                            User_Name: Name110.value,
                            Gmail: Email110.value,
                            id_Uid_address: Id110.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name110.value = '';
                      Email110.value = '';
                      Id110.value = '';

                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop110Gem();


              } else {
                if (Name110.value.length > 1 && Email110.value.length > 4 && Id110.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }


            } Shop110();
          });
        });
        // free220
        document.getElementById('Gem200').innerText = `${GoldenPack.find(item => item.PackName === '210+21 Gem Free Fire').PNeed}`;
        document.getElementById('FreeDiv221').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('Cardimage').src = './pics/1748258785830.png';
          document.getElementById('pUpderid').innerText = 'Free Fire id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your Free Fire id ';
          document.getElementById('P').innerText = `${GoldenPack.find(item => item.PackName === '210+21 Gem Free Fire').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${GoldenPack.find(item => item.PackName === '210+21 Gem Free Fire').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop221Gem
          let Name221 = document.getElementById('Name');
          let Email221 = document.getElementById('Email');
          let Id221 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop221() {
              GemGolden221 = GoldenPack.find(item => item.PackName === '210+21 Gem Free Fire').PNeed;
              if (Name221.value.length > 1 && Email221.value.length > 4 && Id221.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop221Gem() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(GemGolden221);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 2;

                  if (user_Point >= PNeedGem) {
                    const UShop221Gem = user_Point - PNeedGem;
                    console.log(UShop221Gem);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop221Gem, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      console.error('Please Charg your Account', error);

                    } else {
                      // shop 110Gem FreeFire Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data221, error221 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: GoldenPack.find(item => item.PackName === '210+21 Gem Free Fire').PackName,
                            User_Name: Name221.value,
                            Gmail: Email221.value,
                            id_Uid_address: Id221.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name221.value = '';
                      Email221.value = '';
                      Id221.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop221Gem();


              } else {
                if (Name221.value.length > 1 && Email221.value.length > 4 && Id221.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }
              // else if(Name110.value.length <1 && Email110.value.length < 4 && Id110.value.length < 5 ){
              //   console.log('cant');
              // }



              // console.log(`data${data110}`);
              // console.log(`error${error110}`);

            } Shop221();
          });
        });
        // free530
        document.getElementById('Gem500').innerText = `${GoldenPack.find(item => item.PackName === '530+53 Gem Free Fire').PNeed}`;
        document.getElementById('FreeDiv530').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('Cardimage').src = './pics/1748258785830.png';
          document.getElementById('pUpderid').innerText = 'Free Fire id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your Free Fire id ';
          document.getElementById('P').innerText = `${GoldenPack.find(item => item.PackName === '530+53 Gem Free Fire').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${GoldenPack.find(item => item.PackName === '530+53 Gem Free Fire').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop530Gem
          let Name530 = document.getElementById('Name');
          let Email530 = document.getElementById('Email');
          let Id530 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop530() {
              GemGolden530 = GoldenPack.find(item => item.PackName === '530+53 Gem Free Fire').PNeed;
              if (Name530.value.length > 1 && Email530.value.length > 4 && Id530.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop530Gem() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(GemGolden530);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 5;

                  if (user_Point >= PNeedGem) {
                    const UShop530Gem = user_Point - PNeedGem;
                    console.log(UShop530Gem);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop530Gem, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      console.error('Please Charg your Account', error);

                    } else {
                      // shop 110Gem FreeFire Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data530, error530 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: GoldenPack.find(item => item.PackName === '530+53 Gem Free Fire').PackName,
                            User_Name: Name530.value,
                            Gmail: Email530.value,
                            id_Uid_address: Id530.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name530.value = '';
                      Email530.value = '';
                      Id530.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop530Gem();


              } else {
                if (Name530.value.length > 1 && Email530.value.length > 4 && Id530.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }

            } Shop530();
          });
        });
        // free1080
        document.getElementById('Gem1080').innerText = `${GoldenPack.find(item => item.PackName === '1080+108 Gem Free Fire').PNeed}`;
        document.getElementById('FreeDiv1188').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('Cardimage').src = './pics/1748258785830.png';
          document.getElementById('pUpderid').innerText = 'Free Fire id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your Free Fire id ';
          document.getElementById('P').innerText = `${GoldenPack.find(item => item.PackName === '1080+108 Gem Free Fire').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${GoldenPack.find(item => item.PackName === '1080+108 Gem Free Fire').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop1188Gem
          let Name1188 = document.getElementById('Name');
          let Email1188 = document.getElementById('Email');
          let Id1188 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop1188() {
              GemGolden1188 = GoldenPack.find(item => item.PackName === '1080+108 Gem Free Fire').PNeed;
              if (Name1188.value.length > 1 && Email1188.value.length > 4 && Id1188.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop1188Gem() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(GemGolden1188);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 10;

                  if (user_Point >= PNeedGem) {
                    const UShop1188Gem = user_Point - PNeedGem;
                    console.log(UShop1188Gem);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop1188Gem, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      console.error('Please Charg your Account', error);

                    } else {
                      // shop 110Gem FreeFire Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data1188, error1188 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: GoldenPack.find(item => item.PackName === '1080+108 Gem Free Fire').PackName,
                            User_Name: Name1188.value,
                            Gmail: Email1188.value,
                            id_Uid_address: Id1188.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name1188.value = '';
                      Email1188.value = '';
                      Id1188.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop1188Gem();


              } else {
                if (Name1188.value.length > 1 && Email1188.value.length > 4 && Id1188.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }

            } Shop1188();
          });
        });
        // free2200
        document.getElementById('Gem2200').innerText = `${GoldenPack.find(item => item.PackName === '2200+220 Gem Free Fire').PNeed}`;
        document.getElementById('FreeDiv2200').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('Cardimage').src = './pics/1748258785830.png';
          document.getElementById('pUpderid').innerText = 'Free Fire id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your Free Fire id ';
          document.getElementById('P').innerText = `${GoldenPack.find(item => item.PackName === '2200+220 Gem Free Fire').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${GoldenPack.find(item => item.PackName === '2200+220 Gem Free Fire').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop1188Gem
          let Name2200 = document.getElementById('Name');
          let Email2200 = document.getElementById('Email');
          let Id2200 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop2200() {
              GemGolden2200 = GoldenPack.find(item => item.PackName === '2200+220 Gem Free Fire').PNeed;
              if (Name2200.value.length > 1 && Email2200.value.length > 4 && Id2200.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop2200Gem() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(GemGolden2200);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 20;

                  if (user_Point >= PNeedGem) {
                    const UShop2200Gem = user_Point - PNeedGem;
                    console.log(UShop2200Gem);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop2200Gem, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      // console.error('Please Charg your Account', error);

                    } else {
                      // shop 110Gem FreeFire Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data2200, error2200 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: GoldenPack.find(item => item.PackName === '2200+220 Gem Free Fire').PackName,
                            User_Name: Name2200.value,
                            Gmail: Email2200.value,
                            id_Uid_address: Id2200.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name2200.value = '';
                      Email2200.value = '';
                      Id2200.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop2200Gem();


              } else {
                if (Name2200.value.length > 1 && Email2200.value.length > 4 && Id2200.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }

            } Shop2200();
          });
        });



        // 60UC
        document.getElementById('UC60').innerText = `${GoldenPack.find(item => item.PackName === '60 UC PUBG').PNeed}`;
        document.getElementById('PUBG60UC').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('pUpderid').innerText = 'PUBG id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your PUBG id ';
          document.getElementById('Cardimage').src = './pics/1748258785792.png';
          document.getElementById('P').innerText = `${GoldenPack.find(item => item.PackName === '60 UC PUBG').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${GoldenPack.find(item => item.PackName === '60 UC PUBG').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shopUC60
          let NameUC60 = document.getElementById('Name');
          let EmailUC60 = document.getElementById('Email');
          let IdUC60 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function ShopUC60() {
              GoldenUC60 = GoldenPack.find(item => item.PackName === '60 UC PUBG').PNeed;
              if (NameUC60.value.length > 1 && EmailUC60.value.length > 4 && IdUC60.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function ShopUC60() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(GoldenUC60);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 1;

                  if (user_Point >= PNeedGem) {
                    const UShopUC60 = user_Point - PNeedGem;
                    console.log(UShopUC60);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShopUC60, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      // console.error('Please Charg your Account', error);

                    } else {
                      // shop UC60 PUBG Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { dataUC60, errorUC60 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: GoldenPack.find(item => item.PackName === '60 UC PUBG').PackName,
                            User_Name: NameUC60.value,
                            Gmail: EmailUC60.value,
                            id_Uid_address: IdUC60.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      NameUC60.value = '';
                      EmailUC60.value = '';
                      IdUC60.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } ShopUC60();


              } else {
                if (NameUC60.value.length > 1 && EmailUC60.value.length > 4 && IdUC60.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }

            } ShopUC60();
          });
        });
        // 325UC
        document.getElementById('UC300').innerText = `${GoldenPack.find(item => item.PackName === '300+25 UC PUBG').PNeed}`;
        document.getElementById('PUBG325UC').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('pUpderid').innerText = 'PUBG id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your PUBG id ';
          document.getElementById('Cardimage').src = './pics/1748258785792.png';
          document.getElementById('P').innerText = `${GoldenPack.find(item => item.PackName === '300+25 UC PUBG').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${GoldenPack.find(item => item.PackName === '300+25 UC PUBG').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shopUC325
          let Name325UC = document.getElementById('Name');
          let Email325UC = document.getElementById('Email');
          let Id325UC = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop325UC() {
              Golden325UC = GoldenPack.find(item => item.PackName === '300+25 UC PUBG').PNeed;
              if (Name325UC.value.length > 1 && Email325UC.value.length > 4 && Id325UC.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop325UC() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(Golden325UC);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 3;

                  if (user_Point >= PNeedGem) {
                    const UShop325UC = user_Point - PNeedGem;
                    console.log(UShop325UC);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop325UC, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      // console.error('Please Charg your Account', error);

                    } else {
                      // shop UC60 PUBG Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data325UC, error325UC } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: GoldenPack.find(item => item.PackName === '300+25 UC PUBG').PackName,
                            User_Name: Name325UC.value,
                            Gmail: Email325UC.value,
                            id_Uid_address: Id325UC.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name325UC.value = '';
                      Email325UC.value = '';
                      Id325UC.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop325UC();


              } else {
                if (Name325UC.value.length > 1 && Email325UC.value.length > 4 && Id325UC.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }

            } Shop325UC();
          });
        });
        // 660UC
        document.getElementById('UC600').innerText = `${GoldenPack.find(item => item.PackName === '600+60 UC PUBG').PNeed}`;
        document.getElementById('PUBG660UC').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('pUpderid').innerText = 'PUBG id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your PUBG id ';
          document.getElementById('Cardimage').src = './pics/1748258785792.png';
          document.getElementById('P').innerText = `${GoldenPack.find(item => item.PackName === '600+60 UC PUBG').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${GoldenPack.find(item => item.PackName === '600+60 UC PUBG').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop660UC
          let Name660UC = document.getElementById('Name');
          let Email660UC = document.getElementById('Email');
          let Id660UC = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop660UC() {
              Golden660UC = GoldenPack.find(item => item.PackName === '600+60 UC PUBG').PNeed;
              if (Name660UC.value.length > 1 && Email660UC.value.length > 4 && Id660UC.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop660UC() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(Golden660UC);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 6;

                  if (user_Point >= PNeedGem) {
                    const UShop660UC = user_Point - PNeedGem;
                    console.log(UShop660UC);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop660UC, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      // console.error('Please Charg your Account', error);

                    } else {
                      // shop UC60 PUBG Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data660UC, error660UC } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: GoldenPack.find(item => item.PackName === '600+60 UC PUBG').PackName,
                            User_Name: Name660UC.value,
                            Gmail: Email660UC.value,
                            id_Uid_address: Id660UC.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name660UC.value = '';
                      Email660UC.value = '';
                      Id660UC.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop660UC();


              } else {
                if (Name660UC.value.length > 1 && Email660UC.value.length > 4 && Id660UC.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }

            } Shop660UC();
          });
        });
        // FreePayGolden
        document.getElementById('GoldenRank').innerText = `${GoldenPack.find(item => item.PackName === 'Golden Account FreePay').PNeed}`;
        document.getElementById('DivGoldendAccount').addEventListener('click', () => {
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
            icon: "warning",
            title: `your account :${existingUser.Rank}`
          });
        });
        // FreePayDaimond 
        document.getElementById('DiamondRank').innerText = `${GoldenPack.find(item => item.PackName === ' Diamond Account FreePay').PNeed}`;
        document.getElementById('DivDiamondAccount').addEventListener('click', () => {
          document.getElementById('Cardimage').src = './pics/1749484908306.jpg';
          Swal.fire({
            title: " Diamond Rank:",
            text: `${GoldenPack.find(item => item.PackName === ' Diamond Account FreePay').description}`,
            icon: "question"
          });

          document.getElementById('P').innerText = `${GoldenPack.find(item => item.PackName === ' Diamond Account FreePay').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${GoldenPack.find(item => item.PackName === ' Diamond Account FreePay').PNeed}`;
          document.getElementById('pUpderid').innerText = 'Account Rank Up';
          document.getElementById('pUpderid').style.backgroundColor = 'rgba(255, 192, 203, 0.275)';
          document.getElementById('id').style.pointerEvents = 'none';
          document.getElementById('id').style.backgroundColor = 'rgba(255, 192, 203, 0.275)';
          document.getElementById('id').value = ' This Account';
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shopDiamondAccount
          let NameDiamondAccount = document.getElementById('Name');
          let EmailDiamondAccount = document.getElementById('Email');
          // let IdDiamondAccount = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function ShopDiamondAccount() {
              GoldenDiamondAccount = GoldenPack.find(item => item.PackName === ' Diamond Account FreePay').PNeed;
              if (NameDiamondAccount.value.length > 1 && EmailDiamondAccount.value.length > 4) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function ShopDiamondAccount() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(GoldenDiamondAccount);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 10;

                  if (user_Point >= PNeedGem) {
                    const UShopDiamondAccount = user_Point - PNeedGem;
                    console.log(UShopDiamondAccount);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShopDiamondAccount, Level: userLevelUpdate, Rank: 'Diamond' })
                      .eq('user_id', user.id)

                    if (error) {
                      // console.error('Please Charg your Account', error);

                    } else {
                      // shop DiamondAccount Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { dataDiamondAccount, errorDiamondAccount } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: GoldenPack.find(item => item.PackName === ' Diamond Account FreePay').PackName,
                            User_Name: NameDiamondAccount.value,
                            Gmail: EmailDiamondAccount.value,
                            Mode: 'Ok',
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      NameDiamondAccount.value = '';
                      EmailDiamondAccount.value = '';
                      // Id660UC.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } ShopDiamondAccount();


              } else {
                if (NameDiamondAccount.value.length > 1 && EmailDiamondAccount.value.length > 4) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }

            } ShopDiamondAccount();
          });
        });
        // 15$
        document.getElementById('Tether15Value').innerText = `${GoldenPack.find(item => item.PackName === '15$ tether trc20').PNeed}`;
        document.getElementById('DivTether15Trc20').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('pUpderid').innerText = 'Tether USDT (TRC20) Address:';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'TGKuY87SlkccqHzASJircuxHQLTi2MJRg8';
          document.getElementById('Cardimage').src = './pics/1749484596491.jpg';
          document.getElementById('P').innerText = `${GoldenPack.find(item => item.PackName === '15$ tether trc20').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${GoldenPack.find(item => item.PackName === '15$ tether trc20').PNeed}`;
          Swal.fire({
            title: " 15$ USDT ",
            text: `${GoldenPack.find(item => item.PackName === '15$ tether trc20').description}`,
            icon: "warning"
          });
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop15TRC20
          let Name15TRC20 = document.getElementById('Name');
          let Email15TRC20 = document.getElementById('Email');
          let Id15TRC20 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop15TRC20() {
              Golden15TRC20 = GoldenPack.find(item => item.PackName === '15$ tether trc20').PNeed;
              if (Name15TRC20.value.length > 1 && Email15TRC20.value.length > 4 && Id15TRC20.value.length > 30) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop15TRC20() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(Golden15TRC20);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 15;

                  if (user_Point >= PNeedGem) {
                    const UShop15TRC20 = user_Point - PNeedGem;
                    console.log(UShop15TRC20);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop15TRC20, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      // console.error('Please Charg your Account', error);

                    } else {
                      // shop 15TRC20 Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data15TRC20, error15TRC20 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: GoldenPack.find(item => item.PackName === '15$ tether trc20').PackName,
                            User_Name: Name15TRC20.value,
                            Gmail: Email15TRC20.value,
                            id_Uid_address: Id15TRC20.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name15TRC20.value = '';
                      Email15TRC20.value = '';
                      Id15TRC20.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop15TRC20();


              } else {
                if (Name15TRC20.value.length > 1 && Email15TRC20.value.length > 4 && Id15TRC20.value.length > 30) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields or Check your wallet address",
                  icon: "warning",
                  draggable: true
                });
              }

            } Shop15TRC20();
          });
        });
        // 50$
        document.getElementById('Tether50Value').innerText = `${GoldenPack.find(item => item.PackName === '50$ tether trc20').PNeed}`;
        document.getElementById('DivTether50Trc20').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('pUpderid').innerText = 'Tether USDT (TRC20) Address:';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'TGKuY87SlkccqHzASJircuxHQLTi2MJRg8';
          document.getElementById('Cardimage').src = './pics/1749484596491.jpg';
          document.getElementById('P').innerText = `${GoldenPack.find(item => item.PackName === '50$ tether trc20').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${GoldenPack.find(item => item.PackName === '50$ tether trc20').PNeed}`;
          Swal.fire({
            title: " 50$ USDT ",
            text: `${GoldenPack.find(item => item.PackName === '50$ tether trc20').description}`,
            icon: "warning"
          });
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop50TRC20
          let Name50TRC20 = document.getElementById('Name');
          let Email50TRC20 = document.getElementById('Email');
          let Id50TRC20 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop50TRC20() {
              Golden50TRC20 = GoldenPack.find(item => item.PackName === '50$ tether trc20').PNeed;
              if (Name50TRC20.value.length > 1 && Email50TRC20.value.length > 4 && Id50TRC20.value.length > 30) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop50TRC20() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(Golden50TRC20);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 50;

                  if (user_Point >= PNeedGem) {
                    const UShop50TRC20 = user_Point - PNeedGem;
                    console.log(UShop50TRC20);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop50TRC20, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      // console.error('Please Charg your Account', error);

                    } else {
                      // shop 50TRC20 Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data50TRC20, error50TRC20 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: GoldenPack.find(item => item.PackName === '50$ tether trc20').PackName,
                            User_Name: Name50TRC20.value,
                            Gmail: Email50TRC20.value,
                            id_Uid_address: Id50TRC20.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name50TRC20.value = '';
                      Email50TRC20.value = '';
                      Id50TRC20.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop50TRC20();


              } else {
                if (Name50TRC20.value.length > 1 && Email50TRC20.value.length > 4 && Id50TRC20.value.length > 30) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields or Check your wallet address",
                  icon: "warning",
                  draggable: true
                });
              }

            } Shop50TRC20();
          });
        });

      } ShopGoldenRank();
    } else if (Rank.innerText == 'Diamond') {
      Rank.className = 'DiamondRank';
      async function ShopDiamondRank() {
        const { data: DiamondRank, error } = await supabase
          .from('DiamondRank')
          .select('*')
        if (error) {
          console.log('error :', error);
        } else {
          // console.log('data :',DiamondRankRank);
        }

        const DiamondPack = DiamondRank;
        // free110
        document.getElementById('Gem110').innerText = `${DiamondPack.find(item => item.PackName === '100+10 Gem Free Fire').PNeed}`;
        document.getElementById('FreeDiv110').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('Cardimage').src = './pics/1748258785830.png';
          document.getElementById('pUpderid').innerText = 'Free Fire id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your Free Fire id ';
          document.getElementById('P').innerText = `${DiamondPack.find(item => item.PackName === '100+10 Gem Free Fire').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${DiamondPack.find(item => item.PackName === '100+10 Gem Free Fire').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop110Gem
          let Name110 = document.getElementById('Name');
          let Email110 = document.getElementById('Email');
          let Id110 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop110() {
              // PNeed110Gem = existingUser.Points;
              GemGolden110 = DiamondPack.find(item => item.PackName === '100+10 Gem Free Fire').PNeed;
              // console.log(PNeed110Gem, GemGolden110);
              if (Name110.value.length > 1 && Email110.value.length > 4 && Id110.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop110Gem() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeed110Gem = parseInt(GemGolden110);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 1;

                  if (user_Point >= PNeed110Gem) {
                    const UShop110Gem = user_Point - PNeed110Gem;
                    console.log(UShop110Gem);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop110Gem, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      console.error('Please Charg your Account', error);

                    } else {
                      // shop 110Gem FreeFire Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data110, error110 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: DiamondPack.find(item => item.PackName === '100+10 Gem Free Fire').PackName,
                            User_Name: Name110.value,
                            Gmail: Email110.value,
                            id_Uid_address: Id110.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name110.value = '';
                      Email110.value = '';
                      Id110.value = '';

                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop110Gem();


              } else {
                if (Name110.value.length > 1 && Email110.value.length > 4 && Id110.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }


            } Shop110();
          });
        });
        // free220
        document.getElementById('Gem200').innerText = `${DiamondPack.find(item => item.PackName === '210+21 Gem Free Fire').PNeed}`;
        document.getElementById('FreeDiv221').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('Cardimage').src = './pics/1748258785830.png';
          document.getElementById('pUpderid').innerText = 'Free Fire id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your Free Fire id ';
          document.getElementById('P').innerText = `${DiamondPack.find(item => item.PackName === '210+21 Gem Free Fire').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${DiamondPack.find(item => item.PackName === '210+21 Gem Free Fire').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop221Gem
          let Name221 = document.getElementById('Name');
          let Email221 = document.getElementById('Email');
          let Id221 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop221() {
              GemGolden221 = DiamondPack.find(item => item.PackName === '210+21 Gem Free Fire').PNeed;
              if (Name221.value.length > 1 && Email221.value.length > 4 && Id221.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop221Gem() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(GemGolden221);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 2;

                  if (user_Point >= PNeedGem) {
                    const UShop221Gem = user_Point - PNeedGem;
                    console.log(UShop221Gem);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop221Gem, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      console.error('Please Charg your Account', error);

                    } else {
                      // shop 110Gem FreeFire Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data221, error221 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: DiamondPack.find(item => item.PackName === '210+21 Gem Free Fire').PackName,
                            User_Name: Name221.value,
                            Gmail: Email221.value,
                            id_Uid_address: Id221.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name221.value = '';
                      Email221.value = '';
                      Id221.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop221Gem();


              } else {
                if (Name221.value.length > 1 && Email221.value.length > 4 && Id221.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }
              // else if(Name110.value.length <1 && Email110.value.length < 4 && Id110.value.length < 5 ){
              //   console.log('cant');
              // }



              // console.log(`data${data110}`);
              // console.log(`error${error110}`);

            } Shop221();
          });
        });
        // free530
        document.getElementById('Gem500').innerText = `${DiamondPack.find(item => item.PackName === '530+53 Gem Free Fire').PNeed}`;
        document.getElementById('FreeDiv530').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('Cardimage').src = './pics/1748258785830.png';
          document.getElementById('pUpderid').innerText = 'Free Fire id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your Free Fire id ';
          document.getElementById('P').innerText = `${DiamondPack.find(item => item.PackName === '530+53 Gem Free Fire').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${DiamondPack.find(item => item.PackName === '530+53 Gem Free Fire').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop530Gem
          let Name530 = document.getElementById('Name');
          let Email530 = document.getElementById('Email');
          let Id530 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop530() {
              GemGolden530 = DiamondPack.find(item => item.PackName === '530+53 Gem Free Fire').PNeed;
              if (Name530.value.length > 1 && Email530.value.length > 4 && Id530.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop530Gem() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(GemGolden530);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 5;

                  if (user_Point >= PNeedGem) {
                    const UShop530Gem = user_Point - PNeedGem;
                    console.log(UShop530Gem);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop530Gem, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      console.error('Please Charg your Account', error);

                    } else {
                      // shop 110Gem FreeFire Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data530, error530 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: DiamondPack.find(item => item.PackName === '530+53 Gem Free Fire').PackName,
                            User_Name: Name530.value,
                            Gmail: Email530.value,
                            id_Uid_address: Id530.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name530.value = '';
                      Email530.value = '';
                      Id530.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop530Gem();


              } else {
                if (Name530.value.length > 1 && Email530.value.length > 4 && Id530.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }

            } Shop530();
          });
        });
        // free1080
        document.getElementById('Gem1080').innerText = `${DiamondPack.find(item => item.PackName === '1080+108 Gem Free Fire').PNeed}`;
        document.getElementById('FreeDiv1188').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('Cardimage').src = './pics/1748258785830.png';
          document.getElementById('pUpderid').innerText = 'Free Fire id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your Free Fire id ';
          document.getElementById('P').innerText = `${DiamondPack.find(item => item.PackName === '1080+108 Gem Free Fire').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${DiamondPack.find(item => item.PackName === '1080+108 Gem Free Fire').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop1188Gem
          let Name1188 = document.getElementById('Name');
          let Email1188 = document.getElementById('Email');
          let Id1188 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop1188() {
              GemGolden1188 = DiamondPack.find(item => item.PackName === '1080+108 Gem Free Fire').PNeed;
              if (Name1188.value.length > 1 && Email1188.value.length > 4 && Id1188.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop1188Gem() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(GemGolden1188);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 10;

                  if (user_Point >= PNeedGem) {
                    const UShop1188Gem = user_Point - PNeedGem;
                    console.log(UShop1188Gem);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop1188Gem, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      console.error('Please Charg your Account', error);

                    } else {
                      // shop 110Gem FreeFire Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data1188, error1188 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: DiamondPack.find(item => item.PackName === '1080+108 Gem Free Fire').PackName,
                            User_Name: Name1188.value,
                            Gmail: Email1188.value,
                            id_Uid_address: Id1188.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name1188.value = '';
                      Email1188.value = '';
                      Id1188.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop1188Gem();


              } else {
                if (Name1188.value.length > 1 && Email1188.value.length > 4 && Id1188.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }

            } Shop1188();
          });
        });
        // free2200
        document.getElementById('Gem2200').innerText = `${DiamondPack.find(item => item.PackName === '2200+220 Gem Free Fire').PNeed}`;
        document.getElementById('FreeDiv2200').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('Cardimage').src = './pics/1748258785830.png';
          document.getElementById('pUpderid').innerText = 'Free Fire id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your Free Fire id ';
          document.getElementById('P').innerText = `${DiamondPack.find(item => item.PackName === '2200+220 Gem Free Fire').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${DiamondPack.find(item => item.PackName === '2200+220 Gem Free Fire').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop1188Gem
          let Name2200 = document.getElementById('Name');
          let Email2200 = document.getElementById('Email');
          let Id2200 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop2200() {
              GemGolden2200 = DiamondPack.find(item => item.PackName === '2200+220 Gem Free Fire').PNeed;
              if (Name2200.value.length > 1 && Email2200.value.length > 4 && Id2200.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop2200Gem() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(GemGolden2200);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 20;

                  if (user_Point >= PNeedGem) {
                    const UShop2200Gem = user_Point - PNeedGem;
                    console.log(UShop2200Gem);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop2200Gem, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      // console.error('Please Charg your Account', error);

                    } else {
                      // shop 110Gem FreeFire Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data2200, error2200 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: DiamondPack.find(item => item.PackName === '2200+220 Gem Free Fire').PackName,
                            User_Name: Name2200.value,
                            Gmail: Email2200.value,
                            id_Uid_address: Id2200.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name2200.value = '';
                      Email2200.value = '';
                      Id2200.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop2200Gem();


              } else {
                if (Name2200.value.length > 1 && Email2200.value.length > 4 && Id2200.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }

            } Shop2200();
          });
        });

        // 60UC
        document.getElementById('UC60').innerText = `${DiamondPack.find(item => item.PackName === '60 UC PUBG').PNeed}`;
        document.getElementById('PUBG60UC').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('pUpderid').innerText = 'PUBG id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your PUBG id ';
          document.getElementById('Cardimage').src = './pics/1748258785792.png';
          document.getElementById('P').innerText = `${DiamondPack.find(item => item.PackName === '60 UC PUBG').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${DiamondPack.find(item => item.PackName === '60 UC PUBG').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shopUC60
          let NameUC60 = document.getElementById('Name');
          let EmailUC60 = document.getElementById('Email');
          let IdUC60 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function ShopUC60() {
              GoldenUC60 = DiamondPack.find(item => item.PackName === '60 UC PUBG').PNeed;
              if (NameUC60.value.length > 1 && EmailUC60.value.length > 4 && IdUC60.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function ShopUC60() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(GoldenUC60);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 1;

                  if (user_Point >= PNeedGem) {
                    const UShopUC60 = user_Point - PNeedGem;
                    console.log(UShopUC60);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShopUC60, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      // console.error('Please Charg your Account', error);

                    } else {
                      // shop UC60 PUBG Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { dataUC60, errorUC60 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: DiamondPack.find(item => item.PackName === '60 UC PUBG').PackName,
                            User_Name: NameUC60.value,
                            Gmail: EmailUC60.value,
                            id_Uid_address: IdUC60.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      NameUC60.value = '';
                      EmailUC60.value = '';
                      IdUC60.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } ShopUC60();


              } else {
                if (NameUC60.value.length > 1 && EmailUC60.value.length > 4 && IdUC60.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }

            } ShopUC60();
          });
        });
        // 325UC
        document.getElementById('UC300').innerText = `${DiamondPack.find(item => item.PackName === '300+25 UC PUBG').PNeed}`;
        document.getElementById('PUBG325UC').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('pUpderid').innerText = 'PUBG id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your PUBG id ';
          document.getElementById('Cardimage').src = './pics/1748258785792.png';
          document.getElementById('P').innerText = `${DiamondPack.find(item => item.PackName === '300+25 UC PUBG').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${DiamondPack.find(item => item.PackName === '300+25 UC PUBG').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shopUC325
          let Name325UC = document.getElementById('Name');
          let Email325UC = document.getElementById('Email');
          let Id325UC = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop325UC() {
              Golden325UC = DiamondPack.find(item => item.PackName === '300+25 UC PUBG').PNeed;
              if (Name325UC.value.length > 1 && Email325UC.value.length > 4 && Id325UC.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop325UC() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(Golden325UC);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 3;

                  if (user_Point >= PNeedGem) {
                    const UShop325UC = user_Point - PNeedGem;
                    console.log(UShop325UC);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop325UC, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      // console.error('Please Charg your Account', error);

                    } else {
                      // shop UC60 PUBG Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data325UC, error325UC } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: DiamondPack.find(item => item.PackName === '300+25 UC PUBG').PackName,
                            User_Name: Name325UC.value,
                            Gmail: Email325UC.value,
                            id_Uid_address: Id325UC.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name325UC.value = '';
                      Email325UC.value = '';
                      Id325UC.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop325UC();


              } else {
                if (Name325UC.value.length > 1 && Email325UC.value.length > 4 && Id325UC.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }

            } Shop325UC();
          });
        });
        // 660UC
        document.getElementById('UC600').innerText = `${DiamondPack.find(item => item.PackName === '600+60 UC PUBG').PNeed}`;
        document.getElementById('PUBG660UC').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('pUpderid').innerText = 'PUBG id :';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'input your PUBG id ';
          document.getElementById('Cardimage').src = './pics/1748258785792.png';
          document.getElementById('P').innerText = `${DiamondPack.find(item => item.PackName === '600+60 UC PUBG').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${DiamondPack.find(item => item.PackName === '600+60 UC PUBG').PNeed}`;
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop660UC
          let Name660UC = document.getElementById('Name');
          let Email660UC = document.getElementById('Email');
          let Id660UC = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop660UC() {
              Golden660UC = DiamondPack.find(item => item.PackName === '600+60 UC PUBG').PNeed;
              if (Name660UC.value.length > 1 && Email660UC.value.length > 4 && Id660UC.value.length > 5) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop660UC() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(Golden660UC);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 6;

                  if (user_Point >= PNeedGem) {
                    const UShop660UC = user_Point - PNeedGem;
                    console.log(UShop660UC);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop660UC, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      // console.error('Please Charg your Account', error);

                    } else {
                      // shop UC60 PUBG Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data660UC, error660UC } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: DiamondPack.find(item => item.PackName === '600+60 UC PUBG').PackName,
                            User_Name: Name660UC.value,
                            Gmail: Email660UC.value,
                            id_Uid_address: Id660UC.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name660UC.value = '';
                      Email660UC.value = '';
                      Id660UC.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop660UC();


              } else {
                if (Name660UC.value.length > 1 && Email660UC.value.length > 4 && Id660UC.value.length > 5) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields!",
                  icon: "warning",
                  draggable: true
                });
              }

            } Shop660UC();
          });
        });
        // FreePayGolden
        document.getElementById('GoldenRank').innerText = `${DiamondPack.find(item => item.PackName === 'Golden Account FreePay').PNeed}`;
        document.getElementById('DivGoldendAccount').addEventListener('click', () => {
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
            icon: "warning",
            title: `your account :${existingUser.Rank}`
          });
        });
        // FreePayDaimond
        document.getElementById('DiamondRank').innerText = `${DiamondPack.find(item => item.PackName === ' Diamond Account FreePay').PNeed}`;
        document.getElementById('DivDiamondAccount').addEventListener('click', () => {
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
            icon: "warning",
            title: `your account :${existingUser.Rank}`
          });
        });
        // 15$
        document.getElementById('Tether15Value').innerText = `${DiamondPack.find(item => item.PackName === '15$ tether trc20').PNeed}`;
        document.getElementById('DivTether15Trc20').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('pUpderid').innerText = 'Tether USDT (TRC20) Address:';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'TGKuY87SlkccqHzASJircuxHQLTi2MJRg8';
          document.getElementById('Cardimage').src = './pics/1749484596491.jpg';
          document.getElementById('P').innerText = `${DiamondPack.find(item => item.PackName === '15$ tether trc20').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${DiamondPack.find(item => item.PackName === '15$ tether trc20').PNeed}`;
          Swal.fire({
            title: " 15$ USDT ",
            text: `${DiamondPack.find(item => item.PackName === '15$ tether trc20').description}`,
            icon: "warning"
          });
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop15TRC20
          let Name15TRC20 = document.getElementById('Name');
          let Email15TRC20 = document.getElementById('Email');
          let Id15TRC20 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop15TRC20() {
              Golden15TRC20 = DiamondPack.find(item => item.PackName === '15$ tether trc20').PNeed;
              if (Name15TRC20.value.length > 1 && Email15TRC20.value.length > 4 && Id15TRC20.value.length > 30) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop15TRC20() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(Golden15TRC20);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 15;

                  if (user_Point >= PNeedGem) {
                    const UShop15TRC20 = user_Point - PNeedGem;
                    console.log(UShop15TRC20);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop15TRC20, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      // console.error('Please Charg your Account', error);

                    } else {
                      // shop 15TRC20 Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data15TRC20, error15TRC20 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: DiamondPack.find(item => item.PackName === '15$ tether trc20').PackName,
                            User_Name: Name15TRC20.value,
                            Gmail: Email15TRC20.value,
                            id_Uid_address: Id15TRC20.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name15TRC20.value = '';
                      Email15TRC20.value = '';
                      Id15TRC20.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop15TRC20();


              } else {
                if (Name15TRC20.value.length > 1 && Email15TRC20.value.length > 4 && Id15TRC20.value.length > 30) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields or Check your wallet address",
                  icon: "warning",
                  draggable: true
                });
              }

            } Shop15TRC20();
          });
        });
        // 50$
        document.getElementById('Tether50Value').innerText = `${DiamondPack.find(item => item.PackName === '50$ tether trc20').PNeed}`;
        document.getElementById('DivTether50Trc20').addEventListener('click', () => {
          document.getElementById('id').value = '';
          document.getElementById('pUpderid').innerText = 'Tether USDT (TRC20) Address:';
          document.getElementById('pUpderid').style.backgroundColor = 'pink';
          document.getElementById('id').style.pointerEvents = 'all';
          document.getElementById('id').style.backgroundColor = 'pink';
          document.getElementById('id').placeholder = 'TGKuY87SlkccqHzASJircuxHQLTi2MJRg8';
          document.getElementById('Cardimage').src = './pics/1749484596491.jpg';
          document.getElementById('P').innerText = `${DiamondPack.find(item => item.PackName === '50$ tether trc20').PackName}`;
          document.getElementById('PNeedP').innerText = `Price : ${DiamondPack.find(item => item.PackName === '50$ tether trc20').PNeed}`;
          Swal.fire({
            title: " 50$ USDT ",
            text: `${DiamondPack.find(item => item.PackName === '50$ tether trc20').description}`,
            icon: "warning"
          });
          let hidenform = document.getElementById('FormSec');
          if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          } else if (hidenform.className = "formHiden") {
            hidenform.className = "formsec";
          }
          // ......................shop50TRC20
          let Name50TRC20 = document.getElementById('Name');
          let Email50TRC20 = document.getElementById('Email');
          let Id50TRC20 = document.getElementById('id');


          document.getElementById('subshopbtn').addEventListener('click', () => {
            async function Shop50TRC20() {
              Golden50TRC20 = DiamondPack.find(item => item.PackName === '50$ tether trc20').PNeed;
              if (Name50TRC20.value.length > 1 && Email50TRC20.value.length > 4 && Id50TRC20.value.length > 30) {
                document.getElementById('subshopbtn').style.pointerEvents = 'none';
                document.getElementById('subshopbtn').style.backgroundColor = 'gray';
                document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

                async function Shop50TRC20() {
                  const user_Point = parseInt(existingUser.Points);
                  const PNeedGem = parseInt(Golden50TRC20);
                  const userLevel = parseInt(existingUser.Level);
                  const userLevelUpdate = userLevel + 50;

                  if (user_Point >= PNeedGem) {
                    const UShop50TRC20 = user_Point - PNeedGem;
                    console.log(UShop50TRC20);
                    const { data, error } = await supabase.from("usersinfo")
                      .update({ Points: UShop50TRC20, Level: userLevelUpdate })
                      .eq('user_id', user.id)

                    if (error) {
                      // console.error('Please Charg your Account', error);

                    } else {
                      // shop 50TRC20 Ok 
                      document.getElementById('FormSec').className = 'formHiden';
                      const { data50TRC20, error50TRC20 } = await supabase
                        .from('ShopFactor')
                        .insert([
                          {
                            PackName: DiamondPack.find(item => item.PackName === '50$ tether trc20').PackName,
                            User_Name: Name50TRC20.value,
                            Gmail: Email50TRC20.value,
                            id_Uid_address: Id50TRC20.value,
                            Player_Rank: existingUser.Rank,

                          },
                        ])
                      Swal.fire({
                        title: "Success!!",
                        icon: "success",
                        draggable: true
                      });
                      Name50TRC20.value = '';
                      Email50TRC20.value = '';
                      Id50TRC20.value = '';
                      window.location.reload();

                    }

                  } else {
                    Swal.fire({
                      title: "you need more points!",
                      icon: "warning",
                      draggable: true
                    });
                    document.getElementById('subshopbtn').style.pointerEvents = 'all';
                    document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                    document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem #1eff00';

                  }
                } Shop50TRC20();


              } else {
                if (Name50TRC20.value.length > 1 && Email50TRC20.value.length > 4 && Id50TRC20.value.length > 30) {
                  document.getElementById('subshopbtn').style.pointerEvents = 'all';
                  document.getElementById('subshopbtn').style.backgroundColor = '#1eff00';
                  document.getElementById('subshopbtn').style.boxShadow = "0rem 0rem 0.8rem #1eff00";
                }
                Swal.fire({
                  title: "Please Complete all fields or Check your wallet address",
                  icon: "warning",
                  draggable: true
                });
              }

            } Shop50TRC20();
          });
        });

      } ShopDiamondRank();
      // console.log('Diamond Rank');


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
  document.getElementById('earnsec').style.display = 'none';
  document.getElementById('profsec').style.display = 'flex';
  document.getElementById('shopsec').style.display = 'none';
});
shopbtn.addEventListener('click', () => {
  Profbtn.className = '';
  shopbtn.className = 'textshadowbtn';
  earnbtn.className = '';
  document.getElementById('profsec').style.display = 'none';
  document.getElementById('shopsec').style.display = 'flex';
  document.getElementById('earnsec').style.display = 'none';

});
earnbtn.addEventListener('click', () => {
  Profbtn.className = '';
  shopbtn.className = '';
  earnbtn.className = 'textshadowbtn';
  document.getElementById('profsec').style.display = 'none';
  document.getElementById('earnsec').style.display = 'flex';
  document.getElementById('shopsec').style.display = 'none';
})




// ...............shop sec............... !!

document.getElementById('Noshopbtn').addEventListener('click', () => {
  document.getElementById('FormSec').className = 'formHiden';
});
