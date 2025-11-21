const supabase = window.supabase.createClient(
  'https://nomuylulsjtwjoinrxmr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vbXV5bHVsc2p0d2pvaW5yeG1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NzgwOTgsImV4cCI6MjA2MTI1NDA5OH0.9Vgp9y1EQkbH2GooJgUmXjW4NEA-WY8keL4P5S1tiIc'
);
const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe?.user;

if (!user) {
  window.location.href = "https://t.me/TheFreePayBot?start=true";
}



const a = user.id;
// const a = "6413998670";

async function telebot() {

  const { data2, error2 } = await supabase
    .from('telusersinfo')
    .upsert({
      id: user.id,
      name: user.first_name,
      username: user.username,
      premium: user.is_premium,

    },
      { onConflict: ['id'] }
    )
    .select()

  let BackRef = document.getElementById('BackFer');
  BackRef.addEventListener('click', () => {
    document.getElementById('RefPage').style.display = 'none';
  });
  let { data: telusersinfo, error } = await supabase
    .from('telusersinfo')
    .select('*')
    .eq('id', a)
    .single();

  // console.log(telusersinfo.reffrall);
  const reffrall = telusersinfo.reffrall;
  let points1 = telusersinfo.point;
  let fixedPoint = points1.toFixed(1);

  let UserFind = telusersinfo;
  if (UserFind.id) {
    document.getElementById('loadingPage').style.display = 'none';
  };


  if (telusersinfo.HalowGift == false) {

    document.getElementById('HalowinMedal').className = "HalowMedalOff";
    document.getElementById('HallowGift').className = "GifClaimed";
    // document.getElementById('ShopAlertIcon').style.display = "none";
    document.getElementById('AlertGifHallowin').style.display = "none";
  } else if (telusersinfo.HalowGift == true) {
    // document.getElementById('ShopAlertIcon').style.display = "none";
    document.getElementById('AlertGifHallowin').style.display = "none";
    document.getElementById('HalowinMedal').className = "HalowMedalOn";
    document.getElementById('HallowGift').className = "GifClaimed";

  }



  // ...........................Point Updating ...................
  setInterval(() => {
    async function PointUpdating() {
      let { data: telusersinfo, error1 } = await supabase
        .from('telusersinfo')
        .select('*')
        .eq('id', a)
        .single();

      let info = telusersinfo;
      let points = info.point;
      let fixedPoint = points.toFixed(1);


      document.getElementById('pointvalue').textContent = `${fixedPoint}`;
      document.getElementById('pointvalue2').textContent = `${fixedPoint}`;
      document.getElementById('pointvalue3').textContent = `${fixedPoint}`;
    } PointUpdating();
  }, 2500)

  // ................info...........
  let info = telusersinfo;
  document.getElementById('pointvalue').innerText = `${fixedPoint}`;
  document.getElementById('emailpp').innerText = `FP: ${info.id}`;
  document.getElementById('Userp').innerText = `Name : ${info.name}`;
  document.getElementById('Ranks').innerText = ` ${info.rank}`;
  document.getElementById('Levelpp').innerText = `Level : ${info.level}`;
  document.getElementById('Pointsp').innerText = `Points : ${fixedPoint}`;
  document.getElementById('RedId').innerText = `${info.id}`;
  document.getElementById('RefCount').innerText = `Referral : ${info.reffrallCount}`
  document.getElementById('RefCopyId').addEventListener('click', () => {
    window.location.href = `https://t.me/share/url?text=Hey%20my%20friend!%F0%9F%8E%AE%0AJoin%20the%20game%20with%20my%20invite%20link%20and%20get%20extra%20coins%20%F0%9F%AA%99%0AReferral%20Code%3A%0A${info.id}%0AStart%20now!%F0%9F%91%87%0Ahttps%3A%2F%2Ft.me%2FTheFreePayBot%2FFreePayShop`;
  });


  // ChannelCard

  document.getElementById('ChannelAds').onclick = function () {
    const ChannelName = document.getElementById("ChannelName");
    const ChannelLink = document.getElementById("ChannelLink");
    const ChannelAmount = document.getElementById("ChannelAmount");
    const BuyChannelAd = document.getElementById("subshopbtn2");
    const ChannelPNeedP = document.getElementById("ChannelPNeedP");

    setInterval(() => {


      const ChannelAmountInput = ChannelAmount.value;
      const PneedZOK = ChannelAmountInput * 3;
      ChannelPNeedP.innerText = `${PneedZOK} Points`;
      ChannelAmount.value = ChannelAmount.value.replace(/\D/g, "").slice(0, 6);
      ChannelPNeedP.style.color = "yellow";

      if (fixedPoint <= PneedZOK) {
        ChannelPNeedP.style.color = "Orange";
        BuyChannelAd.style.pointerEvents = "none";
        BuyChannelAd.style.backgroundColor = "rgb(172, 127, 134)";
        BuyChannelAd.style.boxShadow = "0rem 0rem 0.8rem rgb(172, 127, 134)";



      } else if (fixedPoint >= PneedZOK && ChannelAmountInput >= 1 && ChannelName.value.length >= 3 && ChannelLink.value.length >= 3) {
        ChannelPNeedP.style.color = "yellow";
        BuyChannelAd.style.pointerEvents = "all";
        BuyChannelAd.style.backgroundColor = "#1eff00";
        BuyChannelAd.style.boxShadow = "0rem 0rem 0.8rem #1eff00";

        BuyChannelAd.onclick = function () {

          BuyChannelAd.style.display = "none";
          console.log(ChannelName.value);
          console.log(ChannelLink.value);
          console.log(ChannelAmount.value);

          async function AdInserting() {
            let { data: telusersinfo2, error3 } = await supabase
              .from('telusersinfo')
              .select('*')
              .eq('id', a)
              .single();

            const pointMforAd = telusersinfo2.point -= PneedZOK;
            const { data2, error2 } = await supabase.from("telusersinfo")
              .update({ point: pointMforAd })
              .eq('id', a)






          } AdInserting().then(() => {

            async function AdsOk() {
              const { data, error } = await supabase
                .from('advertisingtable')
                .insert([
                  {
                    channelname: `${ChannelName.value}`,
                    channellink: `${ChannelLink.value}`,
                    channelamountmaxamount: `${ChannelAmount.value}`,
                    owner: `${a}`,
                  },
                ])
                .select()
            } AdsOk().then(() => {
              BuyChannelAd.style.display = "flex";

              Swal.fire({
                title: "success",
                icon: "success",
                draggable: true
              });
            });
          })

        }




      }
      // const PLenth = ChannelPNeedP.length;
      // if (PLenth>=6) {
      //   console.log('llllllll');

      // }

    }, 200);


    document.getElementById('ChannelCardImg').src = "https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/Advertising.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9BZHZlcnRpc2luZy5qcGciLCJpYXQiOjE3NjMxMzE2OTksImV4cCI6MzE3MDkxNTk1Njk5fQ.9WqNWKl_Cziw0hiIX5WT3mSLpbO1ZqtVNihuhCTBn9g";
    document.getElementById('FormSec2').className = 'FormDiv';


  };





  const ClaimRefBtn = document.getElementById('ClaimRef');
  const ReffValue = document.getElementById('FriendRef');
  function ReffCan() {
    // if (fixedPoint >= '20') {
    //   console.log('Ref Can');
    // }
    if (reffrall <= "1" && points1 >= 5.1) {
      ClaimRefBtn.style.backgroundColor = 'Green';
      ClaimRefBtn.addEventListener('click', () => {
        ClaimRefBtn.style.pointerEvents = 'none';
        // console.log("Ok");
        // console.log(ReffValue.value);
        const FriendFind = ReffValue.value;
        async function ReffOkRun() {
          let { data: FindFriend, error } = await supabase
            .from('telusersinfo')
            .select('*')
            .eq('id', FriendFind)
            .single();


          let FriendPoint = FindFriend.point += 10;
          let FriendreffrallCount = FindFriend.reffrallCount += 1;

          let MyPointReff = points1 += 10;
          console.log(FriendreffrallCount);
          async function FriendRewardedOk() {
            // my Friend reward Referral

            const { data1, error1 } = await supabase.from("telusersinfo")
              .update({ point: FriendPoint, reffrallCount: FriendreffrallCount })
              .eq('id', FriendFind)

            // my reward Referral
            const { data2, error2 } = await supabase.from("telusersinfo")
              .update({ point: MyPointReff })
              .eq('id', a)
            // my Ref Change
            const { data3, error3 } = await supabase.from("telusersinfo")
              .update({ reffrall: FriendFind })
              .eq('id', a)

            setTimeout(() => {
              window.location.reload();
            }, 2000)
          } FriendRewardedOk();

          // console.log(FindFriend);


        } ReffOkRun();


      });
    } else {
      if (reffrall >= "1") {
        // console.log(reffrall);
        document.getElementById('ClaimRef').style.display = 'none';
        document.getElementById('FriendRef').style.borderRadius = ' 0.5rem 0.5rem 0.5rem 0.5rem';
        document.getElementById('FriendRef').value = `${reffrall}`;
        document.getElementById('FriendRef').style.pointerEvents = 'none';
      }


      console.log('Ref Cant');
    }

  } ReffCan();



  if (info.name <= '') {
    console.log('aazzzzz');
    document.getElementById('Userp').style.display = 'none';
  }
  if (info.name.length >= 8) {

    let short_name = info.name.substring(0, 7);
    document.getElementById('Userp').innerText = `Name : ${short_name}...`;
  }

  // ..................Rank Mode ...............
  if (info.rank == "Silver") {

    document.getElementById('Ranks').style.color = "#c7c7c7";


    // ................SilverRank..................
    async function ShopSilverRank() {
      const { data: SilverRank, error } = await supabase
        .from('SilverRank')
        .select('*')


      if (error) {
        console.log('error :', error);
      }
      const SilverPack = SilverRank;
      GemSilverPack110 = SilverPack.find(item => item.PackName === '100 Gem Free Fire').PNeed;
      // console.log(GemSilverPack110);

      document.getElementById('Gem110').innerText = `${SilverPack.find(item => item.PackName === '100 Gem Free Fire').PNeed}`;
      document.getElementById('FreeDiv110').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/FreeFire.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9GcmVlRmlyZS5wbmciLCJpYXQiOjE3NTIzOTU4NzgsImV4cCI6MjgzOTk5MjM5NTg3OH0.NRDOZvqIRJGmU3hJ_MRPQlUXCSCpNgttLvhw1pIM6CM';
        document.getElementById('pUpderid').innerText = 'Free Fire id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your Free Fire id ';
        document.getElementById('P').innerText = `${SilverPack.find(item => item.PackName === '100 Gem Free Fire').PackName}`;
        document.getElementById('PNeedP').innerText = `Price : ${SilverPack.find(item => item.PackName === '100 Gem Free Fire').PNeed}`;
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop110() {
            // PNeed110Gem = info.point;
            GemSilverPack110 = SilverPack.find(item => item.PackName === '100 Gem Free Fire').PNeed;
            // console.log(PNeed110Gem, GemSilverPack110);
            if (Name110.value.length > 1 && Email110.value.length > 4 && Id110.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop110Gem() {
                const user_Point = parseInt(info.point);
                const PNeed110Gem = parseInt(GemSilverPack110);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 1;

                if (user_Point >= PNeed110Gem) {
                  const UShop110Gem = user_Point - PNeed110Gem;
                  console.log(UShop110Gem);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop110Gem, level: userLevelUpdate })
                    .eq('id', a)

                  if (error) {
                    console.error('Please Charg your Account', error);

                  } else {
                    // shop 110Gem FreeFire Ok 
                    document.getElementById('FormSec').className = 'formHiden';
                    const { data110, error110 } = await supabase
                      .from('ShopFactor')
                      .insert([
                        {
                          PackName: SilverPack.find(item => item.PackName === '100 Gem Free Fire').PackName,
                          User_Name: Name110.value,
                          Gmail: Email110.value,
                          id_Uid_address: Id110.value,
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // free220
      document.getElementById('Gem200').innerText = `${SilverPack.find(item => item.PackName === '210 Gem Free Fire').PNeed}`;
      document.getElementById('FreeDiv221').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/FreeFire.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9GcmVlRmlyZS5wbmciLCJpYXQiOjE3NTIzOTU4NzgsImV4cCI6MjgzOTk5MjM5NTg3OH0.NRDOZvqIRJGmU3hJ_MRPQlUXCSCpNgttLvhw1pIM6CM';
        document.getElementById('pUpderid').innerText = 'Free Fire id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your Free Fire id ';
        document.getElementById('P').innerText = `${SilverPack.find(item => item.PackName === '210 Gem Free Fire').PackName}`;
        document.getElementById('PNeedP').innerText = `Price : ${SilverPack.find(item => item.PackName === '210 Gem Free Fire').PNeed}`;
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop221() {
            GemGolden221 = SilverPack.find(item => item.PackName === '210 Gem Free Fire').PNeed;
            if (Name221.value.length > 1 && Email221.value.length > 4 && Id221.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop221Gem() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(GemGolden221);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 2;

                if (user_Point >= PNeedGem) {
                  const UShop221Gem = user_Point - PNeedGem;
                  console.log(UShop221Gem);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop221Gem, level: userLevelUpdate })
                    .eq('id', a)

                  if (error) {
                    console.error('Please Charg your Account', error);

                  } else {
                    // shop 110Gem FreeFire Ok 
                    document.getElementById('FormSec').className = 'formHiden';
                    const { data221, error221 } = await supabase
                      .from('ShopFactor')
                      .insert([
                        {
                          PackName: SilverPack.find(item => item.PackName === '210 Gem Free Fire').PackName,
                          User_Name: Name221.value,
                          Gmail: Email221.value,
                          id_Uid_address: Id221.value,
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // free530
      document.getElementById('Gem500').innerText = `${SilverPack.find(item => item.PackName === '530 Gem Free Fire').PNeed}`;
      document.getElementById('FreeDiv530').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/FreeFire.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9GcmVlRmlyZS5wbmciLCJpYXQiOjE3NTIzOTU4NzgsImV4cCI6MjgzOTk5MjM5NTg3OH0.NRDOZvqIRJGmU3hJ_MRPQlUXCSCpNgttLvhw1pIM6CM';
        document.getElementById('pUpderid').innerText = 'Free Fire id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your Free Fire id ';
        document.getElementById('P').innerText = `${SilverPack.find(item => item.PackName === '530 Gem Free Fire').PackName}`;
        document.getElementById('PNeedP').innerText = `Price : ${SilverPack.find(item => item.PackName === '530 Gem Free Fire').PNeed}`;
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop530() {
            GemGolden530 = SilverPack.find(item => item.PackName === '530 Gem Free Fire').PNeed;
            if (Name530.value.length > 1 && Email530.value.length > 4 && Id530.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop530Gem() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(GemGolden530);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 5;

                if (user_Point >= PNeedGem) {
                  const UShop530Gem = user_Point - PNeedGem;
                  console.log(UShop530Gem);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop530Gem, level: userLevelUpdate })
                    .eq('id', a)

                  if (error) {
                    console.error('Please Charg your Account', error);

                  } else {
                    // shop 110Gem FreeFire Ok 
                    document.getElementById('FormSec').className = 'formHiden';
                    const { data530, error530 } = await supabase
                      .from('ShopFactor')
                      .insert([
                        {
                          PackName: SilverPack.find(item => item.PackName === '530 Gem Free Fire').PackName,
                          User_Name: Name530.value,
                          Gmail: Email530.value,
                          id_Uid_address: Id530.value,
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // free1080
      document.getElementById('Gem1080').innerText = `${SilverPack.find(item => item.PackName === '1060 Gem Free Fire').PNeed}`;
      document.getElementById('FreeDiv1188').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/FreeFire.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9GcmVlRmlyZS5wbmciLCJpYXQiOjE3NTIzOTU4NzgsImV4cCI6MjgzOTk5MjM5NTg3OH0.NRDOZvqIRJGmU3hJ_MRPQlUXCSCpNgttLvhw1pIM6CM';
        document.getElementById('pUpderid').innerText = 'Free Fire id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your Free Fire id ';
        document.getElementById('P').innerText = `${SilverPack.find(item => item.PackName === '1060 Gem Free Fire').PackName}`;
        document.getElementById('PNeedP').innerText = `Price : ${SilverPack.find(item => item.PackName === '1060 Gem Free Fire').PNeed}`;
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop1188() {
            GemGolden1188 = SilverPack.find(item => item.PackName === '1060 Gem Free Fire').PNeed;
            if (Name1188.value.length > 1 && Email1188.value.length > 4 && Id1188.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop1188Gem() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(GemGolden1188);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 10;

                if (user_Point >= PNeedGem) {
                  const UShop1188Gem = user_Point - PNeedGem;
                  console.log(UShop1188Gem);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop1188Gem, level: userLevelUpdate })
                    .eq('id', a)

                  if (error) {
                    console.error('Please Charg your Account', error);

                  } else {
                    // shop 110Gem FreeFire Ok 
                    document.getElementById('FormSec').className = 'formHiden';
                    const { data1188, error1188 } = await supabase
                      .from('ShopFactor')
                      .insert([
                        {
                          PackName: SilverPack.find(item => item.PackName === '1060 Gem Free Fire').PackName,
                          User_Name: Name1188.value,
                          Gmail: Email1188.value,
                          id_Uid_address: Id1188.value,
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // free2200
      document.getElementById('Gem2200').innerText = `${SilverPack.find(item => item.PackName === 'Weekly Membership for Free Fire').PNeed}`;
      document.getElementById('FreeDiv2200').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/FreeFire.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9GcmVlRmlyZS5wbmciLCJpYXQiOjE3NTIzOTU4NzgsImV4cCI6MjgzOTk5MjM5NTg3OH0.NRDOZvqIRJGmU3hJ_MRPQlUXCSCpNgttLvhw1pIM6CM';
        document.getElementById('pUpderid').innerText = 'Free Fire id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your Free Fire id ';
        document.getElementById('P').innerText = `${SilverPack.find(item => item.PackName === 'Weekly Membership for Free Fire').PackName}`;
        document.getElementById('PNeedP').innerText = `Price : ${SilverPack.find(item => item.PackName === 'Weekly Membership for Free Fire').PNeed}`;
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop2200() {
            GemGolden2200 = SilverPack.find(item => item.PackName === 'Weekly Membership for Free Fire').PNeed;
            if (Name2200.value.length > 1 && Email2200.value.length > 4 && Id2200.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop2200Gem() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(GemGolden2200);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 20;

                if (user_Point >= PNeedGem) {
                  const UShop2200Gem = user_Point - PNeedGem;
                  console.log(UShop2200Gem);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop2200Gem, level: userLevelUpdate })
                    .eq('id', a)

                  if (error) {
                    // console.error('Please Charg your Account', error);

                  } else {
                    // shop 110Gem FreeFire Ok 
                    document.getElementById('FormSec').className = 'formHiden';
                    const { data2200, error2200 } = await supabase
                      .from('ShopFactor')
                      .insert([
                        {
                          PackName: SilverPack.find(item => item.PackName === 'Weekly Membership for Free Fire').PackName,
                          User_Name: Name2200.value,
                          Gmail: Email2200.value,
                          id_Uid_address: Id2200.value,
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // 60UC
      document.getElementById('UC60').innerText = `${SilverPack.find(item => item.PackName === '60 UC PUBG').PNeed}`;
      document.getElementById('PUBG60UC').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('pUpderid').innerText = 'PUBG id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your PUBG id ';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/PUBG.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9QVUJHLnBuZyIsImlhdCI6MTc1MjM5NjAwMywiZXhwIjoyODM5OTkyMzk2MDAzfQ.lFASuf_1wQt00RjIwUQFdL5wDhqKaF1kH2ftxb95ix4';
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


        document.getElementById('subshopbtn').onclick = function () {
          async function ShopUC60() {
            GoldenUC60 = SilverPack.find(item => item.PackName === '60 UC PUBG').PNeed;
            if (NameUC60.value.length > 1 && EmailUC60.value.length > 4 && IdUC60.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function ShopUC60() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(GoldenUC60);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 1;

                if (user_Point >= PNeedGem) {
                  const UShopUC60 = user_Point - PNeedGem;
                  console.log(UShopUC60);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShopUC60, level: userLevelUpdate })
                    .eq('id', a)

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
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // 325UC
      document.getElementById('UC300').innerText = `${SilverPack.find(item => item.PackName === '300+25 UC PUBG').PNeed}`;
      document.getElementById('PUBG325UC').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('pUpderid').innerText = 'PUBG id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your PUBG id ';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/PUBG.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9QVUJHLnBuZyIsImlhdCI6MTc1MjM5NjAwMywiZXhwIjoyODM5OTkyMzk2MDAzfQ.lFASuf_1wQt00RjIwUQFdL5wDhqKaF1kH2ftxb95ix4';
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop325UC() {
            Golden325UC = SilverPack.find(item => item.PackName === '300+25 UC PUBG').PNeed;
            if (Name325UC.value.length > 1 && Email325UC.value.length > 4 && Id325UC.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop325UC() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(Golden325UC);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 3;

                if (user_Point >= PNeedGem) {
                  const UShop325UC = user_Point - PNeedGem;
                  console.log(UShop325UC);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop325UC, level: userLevelUpdate })
                    .eq('id', a)

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
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // 660UC
      document.getElementById('UC600').innerText = `${SilverPack.find(item => item.PackName === '600+60 UC PUBG').PNeed}`;
      document.getElementById('PUBG660UC').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('pUpderid').innerText = 'PUBG id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your PUBG id ';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/PUBG.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9QVUJHLnBuZyIsImlhdCI6MTc1MjM5NjAwMywiZXhwIjoyODM5OTkyMzk2MDAzfQ.lFASuf_1wQt00RjIwUQFdL5wDhqKaF1kH2ftxb95ix4';
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop660UC() {
            Golden660UC = SilverPack.find(item => item.PackName === '600+60 UC PUBG').PNeed;
            if (Name660UC.value.length > 1 && Email660UC.value.length > 4 && Id660UC.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop660UC() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(Golden660UC);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 6;

                if (user_Point >= PNeedGem) {
                  const UShop660UC = user_Point - PNeedGem;
                  console.log(UShop660UC);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop660UC, level: userLevelUpdate })
                    .eq('id', a)

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
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // FreePayGolden
      document.getElementById('GoldenRank').innerText = `${SilverPack.find(item => item.PackName === 'Golden Account FreePay').PNeed}`;
      document.getElementById('DivGoldendAccount').onclick = function () {
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/FreePayAcount.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9GcmVlUGF5QWNvdW50LmpwZyIsImlhdCI6MTc1MjM5NjExNCwiZXhwIjoyODM5OTkyMzk2MTE0fQ.Dfafwuv3IYR2Y_BrfEb8SzZIPjyxqjii_LuP4NEnCBo';
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


        document.getElementById('subshopbtn').onclick = function () {
          async function ShopSilverAccount() {
            SilverGoldenAccount = SilverPack.find(item => item.PackName === 'Golden Account FreePay').PNeed;
            if (NameDiamondAccount.value.length > 1 && EmailDiamondAccount.value.length > 4) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function ShopSilverAccount() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(SilverGoldenAccount);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 10;

                if (user_Point >= PNeedGem) {
                  const UShopDiamondAccount = user_Point - PNeedGem;
                  console.log(UShopDiamondAccount);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShopDiamondAccount, level: userLevelUpdate, rank: 'Golden' })
                    .eq('id', a)

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
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // FreePayDaimond
      document.getElementById('DiamondRank').innerText = `${SilverPack.find(item => item.PackName === ' Diamond Account FreePay').PNeed}`;
      document.getElementById('DivDiamondAccount').onclick = function () {
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/FreePayAcount.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9GcmVlUGF5QWNvdW50LmpwZyIsImlhdCI6MTc1MjM5NjExNCwiZXhwIjoyODM5OTkyMzk2MTE0fQ.Dfafwuv3IYR2Y_BrfEb8SzZIPjyxqjii_LuP4NEnCBo';
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


        document.getElementById('subshopbtn').onclick = function () {
          async function ShopSilverAccount() {
            SilverGoldenAccount = SilverPack.find(item => item.PackName === ' Diamond Account FreePay').PNeed;
            if (NameDiamondAccount.value.length > 1 && EmailDiamondAccount.value.length > 4) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function ShopSilverAccount() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(SilverDiamondAccount);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 10;

                if (user_Point >= PNeedGem) {
                  const UShopDiamondAccount = user_Point - PNeedGem;
                  console.log(UShopDiamondAccount);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShopDiamondAccount, level: userLevelUpdate, Rank: 'Diamond' })
                    .eq('id', a)

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
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // 15$
      document.getElementById('Tether15Value').innerText = `${SilverPack.find(item => item.PackName === '15$ tether trc20').PNeed}`;
      document.getElementById('DivTether15Trc20').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('pUpderid').innerText = 'Tether USDT (TRC20) Address:';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'TGKuY87SlkccqHzASJircuxHQLTi2MJRg8';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/TETHERtrc20.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9URVRIRVJ0cmMyMC5qcGciLCJpYXQiOjE3NTIzOTYwNTAsImV4cCI6MjgzOTk5MjM5NjA1MH0.ZzgQQI4c8U2brT2-hYLwyAL090lpwcyGPppJr519ca4';
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop15TRC20() {
            Golden15TRC20 = SilverPack.find(item => item.PackName === '15$ tether trc20').PNeed;
            if (Name15TRC20.value.length > 1 && Email15TRC20.value.length > 4 && Id15TRC20.value.length > 30) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop15TRC20() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(Golden15TRC20);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 15;

                if (user_Point >= PNeedGem) {
                  const UShop15TRC20 = user_Point - PNeedGem;
                  console.log(UShop15TRC20);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop15TRC20, level: userLevelUpdate })
                    .eq('id', a)

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
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };

      // 50$
      document.getElementById('Tether50Value').innerText = `${SilverPack.find(item => item.PackName === '50$ tether trc20').PNeed}`;
      document.getElementById('DivTether50Trc20').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('pUpderid').innerText = 'Tether USDT (TRC20) Address:';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'TGKuY87SlkccqHzASJircuxHQLTi2MJRg8';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/TETHERtrc20.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9URVRIRVJ0cmMyMC5qcGciLCJpYXQiOjE3NTIzOTYwNTAsImV4cCI6MjgzOTk5MjM5NjA1MH0.ZzgQQI4c8U2brT2-hYLwyAL090lpwcyGPppJr519ca4';
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop50TRC20() {
            Golden50TRC20 = SilverPack.find(item => item.PackName === '50$ tether trc20').PNeed;
            if (Name50TRC20.value.length > 1 && Email50TRC20.value.length > 4 && Id50TRC20.value.length > 30) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop50TRC20() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(Golden50TRC20);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 50;

                if (user_Point >= PNeedGem) {
                  const UShop50TRC20 = user_Point - PNeedGem;
                  console.log(UShop50TRC20);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop50TRC20, level: userLevelUpdate })
                    .eq('id', a)

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
                          Player_Rank: info.rank,
                          userTelid: info.id,

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

        }

      }

    } ShopSilverRank();




  } else if (info.rank == "Golden") {

    //.................. Golden Rank ................
    // console.log('Rank is Golden');
    document.getElementById('Ranks').style.color = "#ffee00";

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
      document.getElementById('Gem110').innerText = `${GoldenPack.find(item => item.PackName === '100 Gem Free Fire').PNeed}`;
      document.getElementById('FreeDiv110').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/FreeFire.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9GcmVlRmlyZS5wbmciLCJpYXQiOjE3NTIzOTU4NzgsImV4cCI6MjgzOTk5MjM5NTg3OH0.NRDOZvqIRJGmU3hJ_MRPQlUXCSCpNgttLvhw1pIM6CM';
        document.getElementById('pUpderid').innerText = 'Free Fire id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your Free Fire id ';
        document.getElementById('P').innerText = `${GoldenPack.find(item => item.PackName === '100 Gem Free Fire').PackName}`;
        document.getElementById('PNeedP').innerText = `Price : ${GoldenPack.find(item => item.PackName === '100 Gem Free Fire').PNeed}`;
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop110() {
            // PNeed110Gem = info.point;
            GemGolden110 = GoldenPack.find(item => item.PackName === '100 Gem Free Fire').PNeed;
            // console.log(PNeed110Gem, GemGolden110);
            if (Name110.value.length > 1 && Email110.value.length > 4 && Id110.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop110Gem() {
                const user_Point = parseInt(info.point);
                const PNeed110Gem = parseInt(GemGolden110);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 1;

                if (user_Point >= PNeed110Gem) {
                  const UShop110Gem = user_Point - PNeed110Gem;
                  console.log(UShop110Gem);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop110Gem, level: userLevelUpdate })
                    .eq('id', a)

                  if (error) {
                    console.error('Please Charg your Account', error);

                  } else {
                    // shop 110Gem FreeFire Ok 
                    document.getElementById('FormSec').className = 'formHiden';
                    const { data110, error110 } = await supabase
                      .from('ShopFactor')
                      .insert([
                        {
                          PackName: GoldenPack.find(item => item.PackName === '100 Gem Free Fire').PackName,
                          User_Name: Name110.value,
                          Gmail: Email110.value,
                          id_Uid_address: Id110.value,
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // free220
      document.getElementById('Gem200').innerText = `${GoldenPack.find(item => item.PackName === '210 Gem Free Fire').PNeed}`;
      document.getElementById('FreeDiv221').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/FreeFire.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9GcmVlRmlyZS5wbmciLCJpYXQiOjE3NTIzOTU4NzgsImV4cCI6MjgzOTk5MjM5NTg3OH0.NRDOZvqIRJGmU3hJ_MRPQlUXCSCpNgttLvhw1pIM6CM';
        document.getElementById('pUpderid').innerText = 'Free Fire id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your Free Fire id ';
        document.getElementById('P').innerText = `${GoldenPack.find(item => item.PackName === '210 Gem Free Fire').PackName}`;
        document.getElementById('PNeedP').innerText = `Price : ${GoldenPack.find(item => item.PackName === '210 Gem Free Fire').PNeed}`;
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop221() {
            GemGolden221 = GoldenPack.find(item => item.PackName === '210 Gem Free Fire').PNeed;
            if (Name221.value.length > 1 && Email221.value.length > 4 && Id221.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop221Gem() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(GemGolden221);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 2;

                if (user_Point >= PNeedGem) {
                  const UShop221Gem = user_Point - PNeedGem;
                  console.log(UShop221Gem);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop221Gem, level: userLevelUpdate })
                    .eq('id', a)

                  if (error) {
                    console.error('Please Charg your Account', error);

                  } else {
                    // shop 110Gem FreeFire Ok 
                    document.getElementById('FormSec').className = 'formHiden';
                    const { data221, error221 } = await supabase
                      .from('ShopFactor')
                      .insert([
                        {
                          PackName: GoldenPack.find(item => item.PackName === '210 Gem Free Fire').PackName,
                          User_Name: Name221.value,
                          Gmail: Email221.value,
                          id_Uid_address: Id221.value,
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // free530
      document.getElementById('Gem500').innerText = `${GoldenPack.find(item => item.PackName === '530 Gem Free Fire').PNeed}`;
      document.getElementById('FreeDiv530').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/FreeFire.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9GcmVlRmlyZS5wbmciLCJpYXQiOjE3NTIzOTU4NzgsImV4cCI6MjgzOTk5MjM5NTg3OH0.NRDOZvqIRJGmU3hJ_MRPQlUXCSCpNgttLvhw1pIM6CM';
        document.getElementById('pUpderid').innerText = 'Free Fire id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your Free Fire id ';
        document.getElementById('P').innerText = `${GoldenPack.find(item => item.PackName === '530 Gem Free Fire').PackName}`;
        document.getElementById('PNeedP').innerText = `Price : ${GoldenPack.find(item => item.PackName === '530 Gem Free Fire').PNeed}`;
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop530() {
            GemGolden530 = GoldenPack.find(item => item.PackName === '530 Gem Free Fire').PNeed;
            if (Name530.value.length > 1 && Email530.value.length > 4 && Id530.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop530Gem() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(GemGolden530);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 5;

                if (user_Point >= PNeedGem) {
                  const UShop530Gem = user_Point - PNeedGem;
                  console.log(UShop530Gem);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop530Gem, level: userLevelUpdate })
                    .eq('id', a)

                  if (error) {
                    console.error('Please Charg your Account', error);

                  } else {
                    // shop 110Gem FreeFire Ok 
                    document.getElementById('FormSec').className = 'formHiden';
                    const { data530, error530 } = await supabase
                      .from('ShopFactor')
                      .insert([
                        {
                          PackName: GoldenPack.find(item => item.PackName === '530 Gem Free Fire').PackName,
                          User_Name: Name530.value,
                          Gmail: Email530.value,
                          id_Uid_address: Id530.value,
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // free1080
      document.getElementById('Gem1080').innerText = `${GoldenPack.find(item => item.PackName === '1060 Gem Free Fire').PNeed}`;
      document.getElementById('FreeDiv1188').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/FreeFire.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9GcmVlRmlyZS5wbmciLCJpYXQiOjE3NTIzOTU4NzgsImV4cCI6MjgzOTk5MjM5NTg3OH0.NRDOZvqIRJGmU3hJ_MRPQlUXCSCpNgttLvhw1pIM6CM';
        document.getElementById('pUpderid').innerText = 'Free Fire id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your Free Fire id ';
        document.getElementById('P').innerText = `${GoldenPack.find(item => item.PackName === '1060 Gem Free Fire').PackName}`;
        document.getElementById('PNeedP').innerText = `Price : ${GoldenPack.find(item => item.PackName === '1060 Gem Free Fire').PNeed}`;
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop1188() {
            GemGolden1188 = GoldenPack.find(item => item.PackName === '1060 Gem Free Fire').PNeed;
            if (Name1188.value.length > 1 && Email1188.value.length > 4 && Id1188.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop1188Gem() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(GemGolden1188);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 10;

                if (user_Point >= PNeedGem) {
                  const UShop1188Gem = user_Point - PNeedGem;
                  console.log(UShop1188Gem);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop1188Gem, level: userLevelUpdate })
                    .eq('id', a)

                  if (error) {
                    console.error('Please Charg your Account', error);

                  } else {
                    // shop 110Gem FreeFire Ok 
                    document.getElementById('FormSec').className = 'formHiden';
                    const { data1188, error1188 } = await supabase
                      .from('ShopFactor')
                      .insert([
                        {
                          PackName: GoldenPack.find(item => item.PackName === '1060 Gem Free Fire').PackName,
                          User_Name: Name1188.value,
                          Gmail: Email1188.value,
                          id_Uid_address: Id1188.value,
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // free2200
      document.getElementById('Gem2200').innerText = `${GoldenPack.find(item => item.PackName === 'Weekly Membership for Free Fire').PNeed}`;
      document.getElementById('FreeDiv2200').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/FreeFire.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9GcmVlRmlyZS5wbmciLCJpYXQiOjE3NTIzOTU4NzgsImV4cCI6MjgzOTk5MjM5NTg3OH0.NRDOZvqIRJGmU3hJ_MRPQlUXCSCpNgttLvhw1pIM6CM';
        document.getElementById('pUpderid').innerText = 'Free Fire id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your Free Fire id ';
        document.getElementById('P').innerText = `${GoldenPack.find(item => item.PackName === 'Weekly Membership for Free Fire').PackName}`;
        document.getElementById('PNeedP').innerText = `Price : ${GoldenPack.find(item => item.PackName === 'Weekly Membership for Free Fire').PNeed}`;
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop2200() {
            GemGolden2200 = GoldenPack.find(item => item.PackName === 'Weekly Membership for Free Fire').PNeed;
            if (Name2200.value.length > 1 && Email2200.value.length > 4 && Id2200.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop2200Gem() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(GemGolden2200);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 20;

                if (user_Point >= PNeedGem) {
                  const UShop2200Gem = user_Point - PNeedGem;
                  console.log(UShop2200Gem);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop2200Gem, level: userLevelUpdate })
                    .eq('id', a)

                  if (error) {
                    // console.error('Please Charg your Account', error);

                  } else {
                    // shop 110Gem FreeFire Ok 
                    document.getElementById('FormSec').className = 'formHiden';
                    const { data2200, error2200 } = await supabase
                      .from('ShopFactor')
                      .insert([
                        {
                          PackName: GoldenPack.find(item => item.PackName === 'Weekly Membership for Free Fire').PackName,
                          User_Name: Name2200.value,
                          Gmail: Email2200.value,
                          id_Uid_address: Id2200.value,
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };

      // 60UC
      document.getElementById('UC60').innerText = `${GoldenPack.find(item => item.PackName === '60 UC PUBG').PNeed}`;
      document.getElementById('PUBG60UC').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('pUpderid').innerText = 'PUBG id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your PUBG id ';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/PUBG.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9QVUJHLnBuZyIsImlhdCI6MTc1MjM5NjAwMywiZXhwIjoyODM5OTkyMzk2MDAzfQ.lFASuf_1wQt00RjIwUQFdL5wDhqKaF1kH2ftxb95ix4';
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


        document.getElementById('subshopbtn').onclick = function () {
          async function ShopUC60() {
            GoldenUC60 = GoldenPack.find(item => item.PackName === '60 UC PUBG').PNeed;
            if (NameUC60.value.length > 1 && EmailUC60.value.length > 4 && IdUC60.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function ShopUC60() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(GoldenUC60);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 1;

                if (user_Point >= PNeedGem) {
                  const UShopUC60 = user_Point - PNeedGem;
                  console.log(UShopUC60);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShopUC60, level: userLevelUpdate })
                    .eq('id', a)

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
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // 325UC
      document.getElementById('UC300').innerText = `${GoldenPack.find(item => item.PackName === '300+25 UC PUBG').PNeed}`;
      document.getElementById('PUBG325UC').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('pUpderid').innerText = 'PUBG id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your PUBG id ';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/PUBG.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9QVUJHLnBuZyIsImlhdCI6MTc1MjM5NjAwMywiZXhwIjoyODM5OTkyMzk2MDAzfQ.lFASuf_1wQt00RjIwUQFdL5wDhqKaF1kH2ftxb95ix4';
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop325UC() {
            Golden325UC = GoldenPack.find(item => item.PackName === '300+25 UC PUBG').PNeed;
            if (Name325UC.value.length > 1 && Email325UC.value.length > 4 && Id325UC.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop325UC() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(Golden325UC);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 3;

                if (user_Point >= PNeedGem) {
                  const UShop325UC = user_Point - PNeedGem;
                  console.log(UShop325UC);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop325UC, level: userLevelUpdate })
                    .eq('id', a)

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
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // 660UC
      document.getElementById('UC600').innerText = `${GoldenPack.find(item => item.PackName === '600+60 UC PUBG').PNeed}`;
      document.getElementById('PUBG660UC').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('pUpderid').innerText = 'PUBG id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your PUBG id ';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/PUBG.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9QVUJHLnBuZyIsImlhdCI6MTc1MjM5NjAwMywiZXhwIjoyODM5OTkyMzk2MDAzfQ.lFASuf_1wQt00RjIwUQFdL5wDhqKaF1kH2ftxb95ix4';
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop660UC() {
            Golden660UC = GoldenPack.find(item => item.PackName === '600+60 UC PUBG').PNeed;
            if (Name660UC.value.length > 1 && Email660UC.value.length > 4 && Id660UC.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop660UC() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(Golden660UC);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 6;

                if (user_Point >= PNeedGem) {
                  const UShop660UC = user_Point - PNeedGem;
                  console.log(UShop660UC);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop660UC, level: userLevelUpdate })
                    .eq('id', a)

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
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // FreePayGolden
      document.getElementById('GoldenRank').innerText = `${GoldenPack.find(item => item.PackName === 'Golden Account FreePay').PNeed}`;
      document.getElementById('DivGoldendAccount').onclick = function () {
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
          title: `your account :${info.rank}`
        });
      };
      // FreePayDaimond 
      document.getElementById('DiamondRank').innerText = `${GoldenPack.find(item => item.PackName === ' Diamond Account FreePay').PNeed}`;
      document.getElementById('DivDiamondAccount').onclick = function () {
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/FreePayAcount.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9GcmVlUGF5QWNvdW50LmpwZyIsImlhdCI6MTc1MjM5NjExNCwiZXhwIjoyODM5OTkyMzk2MTE0fQ.Dfafwuv3IYR2Y_BrfEb8SzZIPjyxqjii_LuP4NEnCBo';
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


        document.getElementById('subshopbtn').onclick = function () {
          async function ShopDiamondAccount() {
            GoldenDiamondAccount = GoldenPack.find(item => item.PackName === ' Diamond Account FreePay').PNeed;
            if (NameDiamondAccount.value.length > 1 && EmailDiamondAccount.value.length > 4) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function ShopDiamondAccount() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(GoldenDiamondAccount);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 10;

                if (user_Point >= PNeedGem) {
                  const UShopDiamondAccount = user_Point - PNeedGem;
                  console.log(UShopDiamondAccount);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShopDiamondAccount, level: userLevelUpdate, rank: 'Diamond' })
                    .eq('id', a)

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
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // 15$
      document.getElementById('Tether15Value').innerText = `${GoldenPack.find(item => item.PackName === '15$ tether trc20').PNeed}`;
      document.getElementById('DivTether15Trc20').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('pUpderid').innerText = 'Tether USDT (TRC20) Address:';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'TGKuY87SlkccqHzASJircuxHQLTi2MJRg8';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/TETHERtrc20.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9URVRIRVJ0cmMyMC5qcGciLCJpYXQiOjE3NTIzOTYwNTAsImV4cCI6MjgzOTk5MjM5NjA1MH0.ZzgQQI4c8U2brT2-hYLwyAL090lpwcyGPppJr519ca4';
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop15TRC20() {
            Golden15TRC20 = GoldenPack.find(item => item.PackName === '15$ tether trc20').PNeed;
            if (Name15TRC20.value.length > 1 && Email15TRC20.value.length > 4 && Id15TRC20.value.length > 30) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop15TRC20() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(Golden15TRC20);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 15;

                if (user_Point >= PNeedGem) {
                  const UShop15TRC20 = user_Point - PNeedGem;
                  console.log(UShop15TRC20);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop15TRC20, level: userLevelUpdate })
                    .eq('id', a)

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
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // 50$
      document.getElementById('Tether50Value').innerText = `${GoldenPack.find(item => item.PackName === '50$ tether trc20').PNeed}`;
      document.getElementById('DivTether50Trc20').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('pUpderid').innerText = 'Tether USDT (TRC20) Address:';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'TGKuY87SlkccqHzASJircuxHQLTi2MJRg8';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/TETHERtrc20.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9URVRIRVJ0cmMyMC5qcGciLCJpYXQiOjE3NTIzOTYwNTAsImV4cCI6MjgzOTk5MjM5NjA1MH0.ZzgQQI4c8U2brT2-hYLwyAL090lpwcyGPppJr519ca4';
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop50TRC20() {
            Golden50TRC20 = GoldenPack.find(item => item.PackName === '50$ tether trc20').PNeed;
            if (Name50TRC20.value.length > 1 && Email50TRC20.value.length > 4 && Id50TRC20.value.length > 30) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop50TRC20() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(Golden50TRC20);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 50;

                if (user_Point >= PNeedGem) {
                  const UShop50TRC20 = user_Point - PNeedGem;
                  console.log(UShop50TRC20);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop50TRC20, level: userLevelUpdate })
                    .eq('id', a)

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
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
    } ShopGoldenRank();

  } else if (info.rank == "Diamond") {
    // ...................DiamondRankMod..............
    document.getElementById('Ranks').style.color = "#00d9ff";

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

      document.getElementById('Gem110').innerText = `${DiamondPack.find(item => item.PackName === '100 Gem Free Fire').PNeed}`;
      document.getElementById('FreeDiv110').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/FreeFire.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9GcmVlRmlyZS5wbmciLCJpYXQiOjE3NTIzOTU4NzgsImV4cCI6MjgzOTk5MjM5NTg3OH0.NRDOZvqIRJGmU3hJ_MRPQlUXCSCpNgttLvhw1pIM6CM';
        document.getElementById('pUpderid').innerText = 'Free Fire id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your Free Fire id ';
        document.getElementById('P').innerText = `${DiamondPack.find(item => item.PackName === '100 Gem Free Fire').PackName}`;
        document.getElementById('PNeedP').innerText = `Price : ${DiamondPack.find(item => item.PackName === '100 Gem Free Fire').PNeed}`;
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop110() {
            // PNeed110Gem = info.point;
            GemGolden110 = DiamondPack.find(item => item.PackName === '100 Gem Free Fire').PNeed;
            // console.log(PNeed110Gem, GemGolden110);
            if (Name110.value.length > 1 && Email110.value.length > 4 && Id110.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop110Gem() {
                const user_Point = parseInt(info.point);
                const PNeed110Gem = parseInt(GemGolden110);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 1;

                if (user_Point >= PNeed110Gem) {
                  const UShop110Gem = user_Point - PNeed110Gem;
                  console.log(UShop110Gem);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop110Gem, level: userLevelUpdate })
                    .eq('id', a)

                  if (error) {
                    console.error('Please Charg your Account', error);

                  } else {
                    // shop 110Gem FreeFire Ok 
                    document.getElementById('FormSec').className = 'formHiden';
                    const { data110, error110 } = await supabase
                      .from('ShopFactor')
                      .insert([
                        {
                          PackName: DiamondPack.find(item => item.PackName === '100 Gem Free Fire').PackName,
                          User_Name: Name110.value,
                          Gmail: Email110.value,
                          id_Uid_address: Id110.value,
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // free220
      document.getElementById('Gem200').innerText = `${DiamondPack.find(item => item.PackName === '210 Gem Free Fire').PNeed}`;
      document.getElementById('FreeDiv221').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/FreeFire.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9GcmVlRmlyZS5wbmciLCJpYXQiOjE3NTIzOTU4NzgsImV4cCI6MjgzOTk5MjM5NTg3OH0.NRDOZvqIRJGmU3hJ_MRPQlUXCSCpNgttLvhw1pIM6CM';
        document.getElementById('pUpderid').innerText = 'Free Fire id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your Free Fire id ';
        document.getElementById('P').innerText = `${DiamondPack.find(item => item.PackName === '210 Gem Free Fire').PackName}`;
        document.getElementById('PNeedP').innerText = `Price : ${DiamondPack.find(item => item.PackName === '210 Gem Free Fire').PNeed}`;
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop221() {
            GemGolden221 = DiamondPack.find(item => item.PackName === '210 Gem Free Fire').PNeed;
            if (Name221.value.length > 1 && Email221.value.length > 4 && Id221.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop221Gem() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(GemGolden221);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 2;

                if (user_Point >= PNeedGem) {
                  const UShop221Gem = user_Point - PNeedGem;
                  console.log(UShop221Gem);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop221Gem, level: userLevelUpdate })
                    .eq('id', a)

                  if (error) {
                    console.error('Please Charg your Account', error);

                  } else {
                    // shop 110Gem FreeFire Ok 
                    document.getElementById('FormSec').className = 'formHiden';
                    const { data221, error221 } = await supabase
                      .from('ShopFactor')
                      .insert([
                        {
                          PackName: DiamondPack.find(item => item.PackName === '210 Gem Free Fire').PackName,
                          User_Name: Name221.value,
                          Gmail: Email221.value,
                          id_Uid_address: Id221.value,
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // free530
      document.getElementById('Gem500').innerText = `${DiamondPack.find(item => item.PackName === '530 Gem Free Fire').PNeed}`;
      document.getElementById('FreeDiv530').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/FreeFire.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9GcmVlRmlyZS5wbmciLCJpYXQiOjE3NTIzOTU4NzgsImV4cCI6MjgzOTk5MjM5NTg3OH0.NRDOZvqIRJGmU3hJ_MRPQlUXCSCpNgttLvhw1pIM6CM';
        document.getElementById('pUpderid').innerText = 'Free Fire id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your Free Fire id ';
        document.getElementById('P').innerText = `${DiamondPack.find(item => item.PackName === '530 Gem Free Fire').PackName}`;
        document.getElementById('PNeedP').innerText = `Price : ${DiamondPack.find(item => item.PackName === '530 Gem Free Fire').PNeed}`;
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop530() {
            GemGolden530 = DiamondPack.find(item => item.PackName === '530 Gem Free Fire').PNeed;
            if (Name530.value.length > 1 && Email530.value.length > 4 && Id530.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop530Gem() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(GemGolden530);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 5;

                if (user_Point >= PNeedGem) {
                  const UShop530Gem = user_Point - PNeedGem;
                  console.log(UShop530Gem);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop530Gem, level: userLevelUpdate })
                    .eq('id', a)

                  if (error) {
                    console.error('Please Charg your Account', error);

                  } else {
                    // shop 110Gem FreeFire Ok 
                    document.getElementById('FormSec').className = 'formHiden';
                    const { data530, error530 } = await supabase
                      .from('ShopFactor')
                      .insert([
                        {
                          PackName: DiamondPack.find(item => item.PackName === '530 Gem Free Fire').PackName,
                          User_Name: Name530.value,
                          Gmail: Email530.value,
                          id_Uid_address: Id530.value,
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // free1080
      document.getElementById('Gem1080').innerText = `${DiamondPack.find(item => item.PackName === '1060 Gem Free Fire').PNeed}`;
      document.getElementById('FreeDiv1188').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/FreeFire.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9GcmVlRmlyZS5wbmciLCJpYXQiOjE3NTIzOTU4NzgsImV4cCI6MjgzOTk5MjM5NTg3OH0.NRDOZvqIRJGmU3hJ_MRPQlUXCSCpNgttLvhw1pIM6CM';
        document.getElementById('pUpderid').innerText = 'Free Fire id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your Free Fire id ';
        document.getElementById('P').innerText = `${DiamondPack.find(item => item.PackName === '1060 Gem Free Fire').PackName}`;
        document.getElementById('PNeedP').innerText = `Price : ${DiamondPack.find(item => item.PackName === '1060 Gem Free Fire').PNeed}`;
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop1188() {
            GemGolden1188 = DiamondPack.find(item => item.PackName === '1060 Gem Free Fire').PNeed;
            if (Name1188.value.length > 1 && Email1188.value.length > 4 && Id1188.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop1188Gem() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(GemGolden1188);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 10;

                if (user_Point >= PNeedGem) {
                  const UShop1188Gem = user_Point - PNeedGem;
                  console.log(UShop1188Gem);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop1188Gem, level: userLevelUpdate })
                    .eq('id', a)

                  if (error) {
                    console.error('Please Charg your Account', error);

                  } else {
                    // shop 110Gem FreeFire Ok 
                    document.getElementById('FormSec').className = 'formHiden';
                    const { data1188, error1188 } = await supabase
                      .from('ShopFactor')
                      .insert([
                        {
                          PackName: DiamondPack.find(item => item.PackName === '1060 Gem Free Fire').PackName,
                          User_Name: Name1188.value,
                          Gmail: Email1188.value,
                          id_Uid_address: Id1188.value,
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // free2200
      document.getElementById('Gem2200').innerText = `${DiamondPack.find(item => item.PackName === 'Weekly Membership for Free Fire').PNeed}`;
      document.getElementById('FreeDiv2200').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/FreeFire.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9GcmVlRmlyZS5wbmciLCJpYXQiOjE3NTIzOTU4NzgsImV4cCI6MjgzOTk5MjM5NTg3OH0.NRDOZvqIRJGmU3hJ_MRPQlUXCSCpNgttLvhw1pIM6CM';
        document.getElementById('pUpderid').innerText = 'Free Fire id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your Free Fire id ';
        document.getElementById('P').innerText = `${DiamondPack.find(item => item.PackName === 'Weekly Membership for Free Fire').PackName}`;
        document.getElementById('PNeedP').innerText = `Price : ${DiamondPack.find(item => item.PackName === 'Weekly Membership for Free Fire').PNeed}`;
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop2200() {
            GemGolden2200 = DiamondPack.find(item => item.PackName === 'Weekly Membership for Free Fire').PNeed;
            if (Name2200.value.length > 1 && Email2200.value.length > 4 && Id2200.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop2200Gem() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(GemGolden2200);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 20;

                if (user_Point >= PNeedGem) {
                  const UShop2200Gem = user_Point - PNeedGem;
                  console.log(UShop2200Gem);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop2200Gem, level: userLevelUpdate })
                    .eq('id', a)

                  if (error) {
                    // console.error('Please Charg your Account', error);

                  } else {
                    // shop 110Gem FreeFire Ok 
                    document.getElementById('FormSec').className = 'formHiden';
                    const { data2200, error2200 } = await supabase
                      .from('ShopFactor')
                      .insert([
                        {
                          PackName: DiamondPack.find(item => item.PackName === 'Weekly Membership for Free Fire').PackName,
                          User_Name: Name2200.value,
                          Gmail: Email2200.value,
                          id_Uid_address: Id2200.value,
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };

      // 60UC
      document.getElementById('UC60').innerText = `${DiamondPack.find(item => item.PackName === '60 UC PUBG').PNeed}`;
      document.getElementById('PUBG60UC').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('pUpderid').innerText = 'PUBG id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your PUBG id ';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/PUBG.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9QVUJHLnBuZyIsImlhdCI6MTc1MjM5NjAwMywiZXhwIjoyODM5OTkyMzk2MDAzfQ.lFASuf_1wQt00RjIwUQFdL5wDhqKaF1kH2ftxb95ix4';
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


        document.getElementById('subshopbtn').onclick = function () {
          async function ShopUC60() {
            GoldenUC60 = DiamondPack.find(item => item.PackName === '60 UC PUBG').PNeed;
            if (NameUC60.value.length > 1 && EmailUC60.value.length > 4 && IdUC60.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function ShopUC60() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(GoldenUC60);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 1;

                if (user_Point >= PNeedGem) {
                  const UShopUC60 = user_Point - PNeedGem;
                  console.log(UShopUC60);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShopUC60, level: userLevelUpdate })
                    .eq('id', a)

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
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // 325UC
      document.getElementById('UC300').innerText = `${DiamondPack.find(item => item.PackName === '300+25 UC PUBG').PNeed}`;
      document.getElementById('PUBG325UC').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('pUpderid').innerText = 'PUBG id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your PUBG id ';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/PUBG.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9QVUJHLnBuZyIsImlhdCI6MTc1MjM5NjAwMywiZXhwIjoyODM5OTkyMzk2MDAzfQ.lFASuf_1wQt00RjIwUQFdL5wDhqKaF1kH2ftxb95ix4';
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop325UC() {
            Golden325UC = DiamondPack.find(item => item.PackName === '300+25 UC PUBG').PNeed;
            if (Name325UC.value.length > 1 && Email325UC.value.length > 4 && Id325UC.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop325UC() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(Golden325UC);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 3;

                if (user_Point >= PNeedGem) {
                  const UShop325UC = user_Point - PNeedGem;
                  console.log(UShop325UC);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop325UC, level: userLevelUpdate })
                    .eq('id', a)

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
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // 660UC
      document.getElementById('UC600').innerText = `${DiamondPack.find(item => item.PackName === '600+60 UC PUBG').PNeed}`;
      document.getElementById('PUBG660UC').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('pUpderid').innerText = 'PUBG id :';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'input your PUBG id ';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/PUBG.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9QVUJHLnBuZyIsImlhdCI6MTc1MjM5NjAwMywiZXhwIjoyODM5OTkyMzk2MDAzfQ.lFASuf_1wQt00RjIwUQFdL5wDhqKaF1kH2ftxb95ix4';
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop660UC() {
            Golden660UC = DiamondPack.find(item => item.PackName === '600+60 UC PUBG').PNeed;
            if (Name660UC.value.length > 1 && Email660UC.value.length > 4 && Id660UC.value.length > 5) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop660UC() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(Golden660UC);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 6;

                if (user_Point >= PNeedGem) {
                  const UShop660UC = user_Point - PNeedGem;
                  console.log(UShop660UC);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop660UC, level: userLevelUpdate })
                    .eq('id', a)

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
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // FreePayGolden
      document.getElementById('GoldenRank').innerText = `${DiamondPack.find(item => item.PackName === 'Golden Account FreePay').PNeed}`;
      document.getElementById('DivGoldendAccount').onclick = function () {
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
          title: `your account :${info.rank}`
        });
      };
      // FreePayDaimond
      document.getElementById('DiamondRank').innerText = `${DiamondPack.find(item => item.PackName === ' Diamond Account FreePay').PNeed}`;
      document.getElementById('DivDiamondAccount').onclick = function () {
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
          title: `your account :${info.rank}`
        });
      };
      // 15$
      document.getElementById('Tether15Value').innerText = `${DiamondPack.find(item => item.PackName === '15$ tether trc20').PNeed}`;
      document.getElementById('DivTether15Trc20').onclick = function () {
        document.getElementById('id').value = '';
        document.getElementById('pUpderid').innerText = 'Tether USDT (TRC20) Address:';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'TGKuY87SlkccqHzASJircuxHQLTi2MJRg8';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/TETHERtrc20.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9URVRIRVJ0cmMyMC5qcGciLCJpYXQiOjE3NTIzOTYwNTAsImV4cCI6MjgzOTk5MjM5NjA1MH0.ZzgQQI4c8U2brT2-hYLwyAL090lpwcyGPppJr519ca4';
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop15TRC20() {
            Golden15TRC20 = DiamondPack.find(item => item.PackName === '15$ tether trc20').PNeed;
            if (Name15TRC20.value.length > 1 && Email15TRC20.value.length > 4 && Id15TRC20.value.length > 30) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop15TRC20() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(Golden15TRC20);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 15;

                if (user_Point >= PNeedGem) {
                  const UShop15TRC20 = user_Point - PNeedGem;
                  console.log(UShop15TRC20);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop15TRC20, level: userLevelUpdate })
                    .eq('id', a)

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
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };
      // 50$
      document.getElementById('Tether50Value').innerText = `${DiamondPack.find(item => item.PackName === '50$ tether trc20').PNeed}`;
      document.getElementById('DivTether50Trc20').onclick = function () {

        document.getElementById('id').value = '';
        document.getElementById('pUpderid').innerText = 'Tether USDT (TRC20) Address:';
        document.getElementById('pUpderid').style.backgroundColor = 'pink';
        document.getElementById('id').style.pointerEvents = 'all';
        document.getElementById('id').style.backgroundColor = 'pink';
        document.getElementById('id').placeholder = 'TGKuY87SlkccqHzASJircuxHQLTi2MJRg8';
        document.getElementById('Cardimage').src = 'https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/TETHERtrc20.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9URVRIRVJ0cmMyMC5qcGciLCJpYXQiOjE3NTIzOTYwNTAsImV4cCI6MjgzOTk5MjM5NjA1MH0.ZzgQQI4c8U2brT2-hYLwyAL090lpwcyGPppJr519ca4';
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


        document.getElementById('subshopbtn').onclick = function () {
          async function Shop50TRC20() {
            Golden50TRC20 = DiamondPack.find(item => item.PackName === '50$ tether trc20').PNeed;
            if (Name50TRC20.value.length > 1 && Email50TRC20.value.length > 4 && Id50TRC20.value.length > 30) {
              document.getElementById('subshopbtn').style.pointerEvents = 'none';
              document.getElementById('subshopbtn').style.backgroundColor = 'gray';
              document.getElementById('subshopbtn').style.boxShadow = '0rem 0rem 0.8rem gray';

              async function Shop50TRC20() {
                const user_Point = parseInt(info.point);
                const PNeedGem = parseInt(Golden50TRC20);
                const userLevel = parseInt(info.level);
                const userLevelUpdate = userLevel + 50;

                if (user_Point >= PNeedGem) {
                  const UShop50TRC20 = user_Point - PNeedGem;
                  console.log(UShop50TRC20);
                  const { data, error } = await supabase.from("telusersinfo")
                    .update({ point: UShop50TRC20, level: userLevelUpdate })
                    .eq('id', a)

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
                          Player_Rank: info.rank,
                          userTelid: info.id,

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
        };
      };

    } ShopDiamondRank()
  };
















  // ......................POOP GAME SEC JS.................
  async function userifoo() {
    let { data: telusersinfo, error1 } = await supabase
      .from('telusersinfo')
      .select('*')
      .eq('id', a)
      .single();

    let info = telusersinfo;
    let points = info.point;

    let X1 = document.getElementById('X1');
    let X2 = document.getElementById('X2');
    let X3 = document.getElementById('X3');
    let X4 = document.getElementById('X4');
    let Zarib4 = document.getElementById('Zarib4');
    let Zarib3 = document.getElementById('Zarib3');
    let Zarib2 = document.getElementById('Zarib2');
    let Zarib1 = document.getElementById('Zarib1');
    let CoinStartBtn = document.getElementById('CoinStart');
    let AMStart = document.getElementById('AMStart');
    let popdivscon1 = document.getElementById('popdivcon1');
    let xdivs1 = document.getElementById('xdivs1');

    let popdivscon2 = document.getElementById('popdivscon2');
    let xdivs2 = document.getElementById('xdivs3');

    let popdivscon3 = document.getElementById('popdivscon3');
    let xdivs3 = document.getElementById('xdivs2');

    let popdivscon4 = document.getElementById('popdivscon4');
    let xdivs4 = document.getElementById('xdivs4');

    const playalert = document.getElementById('playing');

    const p1As = document.getElementById('p1As');
    const PopLose = document.getElementById('PopLose');


    // gerd 
    let fixedPoint = points.toFixed(1);
    CoinStartBtn.value = 'Start (-5)';
    AMStart.value = 'Start (show ad)';
    document.getElementById('pointvalue2').textContent = `${fixedPoint}`;
    document.getElementById('pointvalue3').textContent = `${fixedPoint}`;

    // ...........................Point Updating ...................
    async function PointUpdating() {
      let { data: telusersinfo, error1 } = await supabase
        .from('telusersinfo')
        .select('*')
        .eq('id', a)
        .single();

      let info = telusersinfo;
      let points = info.point;
      let fixedPoint = points.toFixed(1);
      document.getElementById('pointvalue2').textContent = `${fixedPoint}`;
      document.getElementById('pointvalue3').textContent = `${fixedPoint}`;

    };


    X2.className = 'Xinput';
    X3.className = 'Xinput';
    X4.className = 'Xinput';

    X1.addEventListener('click', () => {
      X1.className = 'ClickedZ';
      X2.className = 'Xinput';
      X3.className = 'Xinput';
      X4.className = 'Xinput';

      CoinStartBtn.value = 'Start (-5)';
      AMStart.style.pointerEvents = 'All';
      AMStart.value = 'Start (show ad)';
      AMStart.className = 'AMStartBTN';
      Zarib4.textContent = 'x1';
      Zarib3.textContent = 'x1';
      Zarib2.textContent = 'x1';
      Zarib1.textContent = 'x1';

      console.log('X1');
    })
    X2.addEventListener('click', () => {
      X2.className = 'ClickedZ';
      X1.className = 'Xinput';
      X3.className = 'Xinput';
      X4.className = 'Xinput';

      CoinStartBtn.value = 'Start (-10)';
      AMStart.style.pointerEvents = 'none';
      AMStart.value = 'Only for (x1)';
      AMStart.className = 'AMStartBTNCant';
      Zarib4.textContent = 'x2';
      Zarib3.textContent = 'x2';
      Zarib2.textContent = 'x2';
      Zarib1.textContent = 'x2';
      console.log('X2');
    })
    X3.addEventListener('click', () => {
      X3.className = 'ClickedZ';
      X2.className = 'Xinput';
      X1.className = 'Xinput';
      X4.className = 'Xinput';

      CoinStartBtn.value = 'Start (-20)';
      AMStart.style.pointerEvents = 'none';
      AMStart.value = 'Only for (x1)';
      AMStart.className = 'AMStartBTNCant';
      Zarib4.textContent = 'x4';
      Zarib3.textContent = 'x4';
      Zarib2.textContent = 'x4';
      Zarib1.textContent = 'x4';
      console.log('X3');

    })
    X4.addEventListener('click', () => {
      X4.className = 'ClickedZ';
      X2.className = 'Xinput';
      X3.className = 'Xinput';
      X1.className = 'Xinput';

      CoinStartBtn.value = 'Start (-50)';
      AMStart.style.pointerEvents = 'none';
      AMStart.value = 'Only for (x1)';
      AMStart.className = 'AMStartBTNCant';
      Zarib4.textContent = 'x16';
      Zarib3.textContent = 'x16';
      Zarib2.textContent = 'x16';
      Zarib1.textContent = 'x16';
      console.log('X4');
    })

    // .............p1...................
    const p11 = document.getElementById('Poop11');
    const p12 = document.getElementById('Poop12');
    const p13 = document.getElementById('Poop13');
    const p14 = document.getElementById('Poop14');
    // ................p2..................
    const p21 = document.getElementById('Poop21');
    const p22 = document.getElementById('Poop22');
    const p23 = document.getElementById('Poop23');
    const p24 = document.getElementById('Poop24');
    // ...............p13.ATTRIBUTE_NODE..........
    const p31 = document.getElementById('Poop31');
    const p32 = document.getElementById('Poop32');
    const p33 = document.getElementById('Poop33');
    const p34 = document.getElementById('Poop34');


    // .............p4...................
    const p41 = document.getElementById('Poop41');
    const p42 = document.getElementById('Poop42');
    const p43 = document.getElementById('Poop43');
    const p44 = document.getElementById('Poop44');

    // .............p1...................


    // ......................p2.........



    // .............p4...................
    p41.addEventListener('click', () => {
      const p1Numbs = ["💩", "💩", "💩", "💩", "💩", "💩", "💩", "💩", "💩", "💩"];
      function createArrayForP1() {
        return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
      }
      function LogRandomElementP1() {
        const arr1 = createArrayForP1();
        let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
        p41.style.backgroundImage = 'none';

        if (p1chose == "💩") {
          p41.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

          PopLose.style.pointerEvents = 'none';
          p42.style.pointerEvents = 'none';
          p43.style.pointerEvents = 'none';
          p44.style.pointerEvents = 'none';

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
            title: "Ooh you lose!!"
          });
          playalert.innerText = 'Ooh you lose';
          p3As.style.pointerEvents = 'none';


        };
      } LogRandomElementP1();
      console.log("p41");
    })
    p42.addEventListener('click', () => {
      const p1Numbs = ["💩", "💩", "💩", "💩", "💩", "💩", "💩", "💩", "💩", "💩"];
      function createArrayForP1() {
        return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
      }
      function LogRandomElementP1() {
        const arr1 = createArrayForP1();
        let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
        p42.style.backgroundImage = 'none';

        if (p1chose == "💩") {
          p42.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;
          p41.style.pointerEvents = 'none';
          p43.style.pointerEvents = 'none';
          p44.style.pointerEvents = 'none';

          PopLose.style.pointerEvents = 'none';
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
            title: "Ooh you lose!!"
          });


          playalert.innerText = 'Ooh you lose';
          p3As.style.pointerEvents = 'none';


        };
      } LogRandomElementP1();
      console.log("p42");
    })
    p43.addEventListener('click', () => {
      const p1Numbs = ["💩", "💩", "💩", "💩", "💩", "💩", "💩", "💩", "💩", "💩"];
      function createArrayForP1() {
        return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
      }
      function LogRandomElementP1() {
        const arr1 = createArrayForP1();
        let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
        p43.style.backgroundImage = 'none';

        if (p1chose == "💩") {
          p43.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;
          p41.style.pointerEvents = 'none';
          p42.style.pointerEvents = 'none';
          p44.style.pointerEvents = 'none';

          PopLose.style.pointerEvents = 'none';

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
            title: "Ooh you lose!!"
          });
          playalert.innerText = 'Ooh you lose';
          p3As.style.pointerEvents = 'none';


        };
      } LogRandomElementP1();
      console.log("p43");
    })
    p44.addEventListener('click', () => {
      const p1Numbs = ["💩", "💩", "💩", "💩", "💩", "💩", "💩", "💩", "💩", "💩"];
      function createArrayForP1() {
        return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
      }
      function LogRandomElementP1() {
        const arr1 = createArrayForP1();
        let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
        p44.style.backgroundImage = 'none';

        if (p1chose == "💩") {
          p44.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;
          p41.style.pointerEvents = 'none';
          p42.style.pointerEvents = 'none';
          p43.style.pointerEvents = 'none';

          PopLose.style.pointerEvents = 'none';

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
            title: "Ooh you lose!!"
          });
          playalert.innerText = 'Ooh you lose';
          p3As.style.pointerEvents = 'none';


        };
      } LogRandomElementP1();
      console.log("p44");
    })
    function StartTimer() {
      let counter = 12;
      const timerElement = document.getElementById('TimerId');
      const totalWidth = timerElement.offsetWidth;

      const interval = setInterval(() => {
        counter--;
        const widthPercent = (counter / 12) * 100;
        timerElement.style.width = `${widthPercent}%`;
        timerElement.textContent = counter > 0 ? counter : '0';

        if (counter <= 0) {
          clearInterval(interval);
          timerElement.style.width = '0%';
          console.log('ok');
          playalert.style.pointerEvents = 'all';
          PopLose.style.pointerEvents = 'none';
          playalert.innerText = 'Refresh to Play Again';
          p11.style.pointerEvents = 'none';
          p12.style.pointerEvents = 'none';
          p13.style.pointerEvents = 'none';
          p14.style.pointerEvents = 'none';
          p21.style.pointerEvents = 'none';
          p22.style.pointerEvents = 'none';
          p23.style.pointerEvents = 'none';
          p24.style.pointerEvents = 'none';
          p31.style.pointerEvents = 'none';
          p32.style.pointerEvents = 'none';
          p33.style.pointerEvents = 'none';
          p34.style.pointerEvents = 'none';
          p41.style.pointerEvents = 'none';
          p42.style.pointerEvents = 'none';
          p43.style.pointerEvents = 'none';
          p44.style.pointerEvents = 'none';
          window.TelegramAdsController.triggerInterstitialBanner().then((result) => {
            // alert(result);
          }).catch((result) => {
            // alert(result);
          });

          PointUpdating();
        }
      }, 1000);
    };





    CoinStartBtn.addEventListener('click', () => {
      playalert.style.pointerEvents = 'none';
      console.log('CoinBtn');
      X1.style.pointerEvents = 'none';
      X2.style.pointerEvents = 'none';
      X3.style.pointerEvents = 'none';
      X4.style.pointerEvents = 'none';

      if (X1.className == "ClickedZ") {
        // .............x1 on X1 .............
        console.log(`your point = ${points}`);
        if (points >= 5) {
          StartTimer();

          CoinStartBtn.value = 'Ready!!';
          CoinStartBtn.style.pointerEvents = 'none';
          AMStart.style.pointerEvents = 'none';
          AMStart.className = 'AMStartBTNCant';

          playalert.style.display = 'flex';
          CoinStartBtn.style.display = 'none';
          AMStart.style.display = 'none';

          popdivscon1.className = 'PoopDivCon1Off';
          xdivs1.className = 'XDivOff';
          popdivscon2.className = 'PoopDivConOff';
          xdivs2.className = 'XDivOff';
          popdivscon3.className = 'PoopDivConOff';
          xdivs3.className = 'XDivOff';
          popdivscon4.style.pointerEvents = 'all';
          xdivs3.style.pointerEvents = 'all';

          // start round one
          p11.addEventListener('click', () => {
            points -= 5;
            console.log(points);

            // console.log("p11");
            // after DTB Ok!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            playalert.style.pointerEvents = 'all';


            const p1Numbs = [1.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat(1);
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p11.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p11.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';






              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();

                p11.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p1chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim (${p1chose})`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDivOff';
                // popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDiv';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p1As.style.pointerEvents = 'none';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon4').style.zIndex = '5';




                console.log("you win");







              }

            } LogRandomElementP1();

          });
          // ......................P12
          p12.addEventListener('click', () => {
            points -= 5;
            console.log(points);

            const p1Numbs = [1.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat(1);
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p12.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p12.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;
                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p12.innerHTML = `<span
                                style="color: Black; font-weight:bold;">${p1chose}</span>
                              <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                                  class="bi bii bi-coin" viewBox="0 0 16 16">
                                  <path
                                    d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                  <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                                </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDivOff';
                // popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDiv';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p1As.style.pointerEvents = 'none';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon4').style.zIndex = '5';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p12");
          });
          // ...........................p13
          p13.addEventListener('click', () => {
            points -= 5;
            console.log(points);

            const p1Numbs = [1.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat(1);
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p13.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p13.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;
                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();

                p13.innerHTML = `<span
                                style="color: Black; font-weight:bold;">${p1chose}</span>
                              <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                                  class="bi bii bi-coin" viewBox="0 0 16 16">
                                  <path
                                    d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                  <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                                </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDivOff';
                // popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDiv';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p1As.style.pointerEvents = 'none';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon4').style.zIndex = '5';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p13");
          })
          // ..............................p14
          p14.addEventListener('click', () => {
            points -= 5;
            console.log(points);

            const p1Numbs = [1.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat(1);
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p14.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p14.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;
                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();

                p14.innerHTML = `<span
                                style="color: Black; font-weight:bold;">${p1chose}</span>
                              <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                                  class="bi bii bi-coin" viewBox="0 0 16 16">
                                  <path
                                    d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                  <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                                </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDivOff';
                // popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDiv';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p1As.style.pointerEvents = 'none';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon4').style.zIndex = '5';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p14");
          });



          // ...................................P21 Start
          // ...................p2.........
          p21.addEventListener('click', () => {
            const p2Numbs = [3.01, 3.02, 3.02, 3.03, 3.04, 3.05, 3.06, 3.07, 3.08, 3.09];
            function createArrayForP2() {
              return [0, 1, 2].map(() => p2Numbs[Math.floor(Math.random() * p2Numbs.length)]).concat("💩");
            }
            function LogRandomElementP2() {
              const arr2 = createArrayForP2();
              let p2chose = (arr2[Math.floor(Math.random() * arr2.length)]);
              p21.style.backgroundImage = 'none';

              if (p2chose == "💩") {

                p21.innerHTML = `<span style="color: Black; font-weight:bold;">${p2chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p2chose;
                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();

                p21.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p2chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs3.className = 'XDiv';
                xdivs2.className = 'XDivOff';
                popdivscon2.className = 'PoopDivCon';
                popdivscon3.className = 'PoopDivConOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p2As.style.pointerEvents = 'none';
                p3As.style.pointerEvents = 'all';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon3').style.zIndex = '6';





                console.log("you win");
              }
            } LogRandomElementP2();
            console.log("p21");

          })
          p22.addEventListener('click', () => {
            const p2Numbs = [3.01, 3.02, 3.02, 3.03, 3.04, 3.05, 3.06, 3.07, 3.08, 3.09];
            function createArrayForP2() {
              return [0, 1, 2].map(() => p2Numbs[Math.floor(Math.random() * p2Numbs.length)]).concat("💩");
            }
            function LogRandomElementP2() {
              const arr2 = createArrayForP2();
              let p2chose = (arr2[Math.floor(Math.random() * arr2.length)]);
              p22.style.backgroundImage = 'none';

              if (p2chose == "💩") {
                p22.innerHTML = `<span style="color: Black; font-weight:bold;">${p2chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p2chose;
                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();

                p22.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p2chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs3.className = 'XDiv';
                xdivs2.className = 'XDivOff';
                popdivscon2.className = 'PoopDivCon';
                popdivscon3.className = 'PoopDivConOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p2As.style.pointerEvents = 'none';
                p3As.style.pointerEvents = 'all';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon3').style.zIndex = '6';





                console.log("you win");
              }
            } LogRandomElementP2();
            console.log("p22");
          })
          p23.addEventListener('click', () => {
            const p2Numbs = [3.01, 3.02, 3.02, 3.03, 3.04, 3.05, 3.06, 3.07, 3.08, 3.09];
            function createArrayForP2() {
              return [0, 1, 2].map(() => p2Numbs[Math.floor(Math.random() * p2Numbs.length)]).concat("💩");
            }
            function LogRandomElementP2() {
              const arr2 = createArrayForP2();
              let p2chose = (arr2[Math.floor(Math.random() * arr2.length)]);
              p23.style.backgroundImage = 'none';

              if (p2chose == "💩") {
                p23.innerHTML = `<span style="color: Black; font-weight:bold;">${p2chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p2chose;
                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();

                p23.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p2chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs3.className = 'XDiv';
                xdivs2.className = 'XDivOff';
                popdivscon2.className = 'PoopDivCon';
                popdivscon3.className = 'PoopDivConOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p2As.style.pointerEvents = 'none';
                p3As.style.pointerEvents = 'all';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon3').style.zIndex = '6';





                console.log("you win");
              }
            } LogRandomElementP2();
            console.log("p23");
          })
          p24.addEventListener('click', () => {
            const p2Numbs = [3.01, 3.02, 3.02, 3.03, 3.04, 3.05, 3.06, 3.07, 3.08, 3.09];
            function createArrayForP2() {
              return [0, 1, 2].map(() => p2Numbs[Math.floor(Math.random() * p2Numbs.length)]).concat("💩");
            }
            function LogRandomElementP2() {
              const arr2 = createArrayForP2();
              let p2chose = (arr2[Math.floor(Math.random() * arr2.length)]);
              p24.style.backgroundImage = 'none';

              if (p2chose == "💩") {
                p24.innerHTML = `<span style="color: Black; font-weight:bold;">${p2chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p2chose;
                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();

                p24.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p2chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs3.className = 'XDiv';
                xdivs2.className = 'XDivOff';
                popdivscon2.className = 'PoopDivCon';
                popdivscon3.className = 'PoopDivConOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p2As.style.pointerEvents = 'none';
                p3As.style.pointerEvents = 'all';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon3').style.zIndex = '6';





                console.log("you win");
              }
            } LogRandomElementP2();
            console.log("p24");
          })


          // .......................p3..........
          p31.addEventListener('click', () => {
            const p1Numbs = [2, "💩", 2.2, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p31.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p31.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p3As.style.pointerEvents = 'none';


              } else {
                let points3 = points += p1chose;
                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points3 })
                    .eq('id', a)
                } P1RewardedGiven();

                p31.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p1chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivConOff';
                xdivs1.className = 'XDivOff';
                xdivs3.className = 'XDivOff';
                popdivscon2.className = 'PoopDivConOff';
                xdivs2.className = 'XDivOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p3As.style.pointerEvents = 'none';
                popdivscon1.className = 'PoopDivCon1';
                xdivs1.className = 'XDiv';
                popdivscon1.style.pointerEvents = 'all';
                document.getElementById('popdivscon2').style.zIndex = '7';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p31");
          })
          p32.addEventListener('click', () => {
            const p1Numbs = [2, "💩", 2.2, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p32.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p32.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p3As.style.pointerEvents = 'none';


              } else {
                let points3 = points += p1chose;
                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points3 })
                    .eq('id', a)
                } P1RewardedGiven();

                p32.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p1chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivConOff';
                xdivs1.className = 'XDivOff';
                xdivs3.className = 'XDivOff';
                popdivscon2.className = 'PoopDivConOff';
                xdivs2.className = 'XDivOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p3As.style.pointerEvents = 'none';
                popdivscon1.className = 'PoopDivCon1';
                xdivs1.className = 'XDiv';
                popdivscon1.style.pointerEvents = 'all';
                document.getElementById('popdivscon2').style.zIndex = '7';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p32");
          })
          p33.addEventListener('click', () => {
            const p1Numbs = [2, "💩", 2.2, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p33.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p33.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p3As.style.pointerEvents = 'none';


              } else {
                let points3 = points += p1chose;
                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points3 })
                    .eq('id', a)
                } P1RewardedGiven();

                p33.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p1chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivConOff';
                xdivs1.className = 'XDivOff';
                xdivs3.className = 'XDivOff';
                popdivscon2.className = 'PoopDivConOff';
                xdivs2.className = 'XDivOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p3As.style.pointerEvents = 'none';
                popdivscon1.className = 'PoopDivCon1';
                xdivs1.className = 'XDiv';
                popdivscon1.style.pointerEvents = 'all';
                document.getElementById('popdivscon2').style.zIndex = '7';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p33");
          })
          p34.addEventListener('click', () => {
            const p1Numbs = [2, "💩", 2.2, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p34.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p34.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p3As.style.pointerEvents = 'none';


              } else {
                let points3 = points += p1chose;
                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points3 })
                    .eq('id', a)
                } P1RewardedGiven();

                p34.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p1chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivConOff';
                xdivs1.className = 'XDivOff';
                xdivs3.className = 'XDivOff';
                popdivscon2.className = 'PoopDivConOff';
                xdivs2.className = 'XDivOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p3As.style.pointerEvents = 'none';
                popdivscon1.className = 'PoopDivCon1';
                xdivs1.className = 'XDiv';
                popdivscon1.style.pointerEvents = 'all';
                document.getElementById('popdivscon2').style.zIndex = '7';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p34");
          })



        } else {
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
            title: "You need more points!!"
          });

        }
        console.log("x1");

      } else if (X2.className == "ClickedZ") {
        // .............x1 on X1 .............

        console.log(`your point = ${points}`);
        if (points >= 10) {

          StartTimer();
          CoinStartBtn.value = 'Ready!!';
          CoinStartBtn.style.pointerEvents = 'none';
          AMStart.style.pointerEvents = 'none';
          AMStart.className = 'AMStartBTNCant';

          playalert.style.display = 'flex';
          CoinStartBtn.style.display = 'none';
          AMStart.style.display = 'none';

          popdivscon1.className = 'PoopDivCon1Off';
          xdivs1.className = 'XDivOff';
          popdivscon2.className = 'PoopDivConOff';
          xdivs2.className = 'XDivOff';
          popdivscon3.className = 'PoopDivConOff';
          xdivs3.className = 'XDivOff';
          popdivscon4.style.pointerEvents = 'all';
          xdivs3.style.pointerEvents = 'all';

          // start round ZX2
          p11.addEventListener('click', () => {
            points -= 10;
            // console.log("p11");
            // after DTB Ok!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            playalert.style.pointerEvents = 'all';


            const p1Numbs = [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p11.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p11.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p11.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p1chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim (${p1chose})`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDivOff';
                // popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDiv';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p1As.style.pointerEvents = 'none';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon4').style.zIndex = '5';




                console.log("you win");







              }
            } LogRandomElementP1();

          });
          // ......................P2
          p12.addEventListener('click', () => {
            points -= 10;
            const p1Numbs = [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p12.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p12.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p12.innerHTML = `<span
                                style="color: Black; font-weight:bold;">${p1chose}</span>
                              <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                                  class="bi bii bi-coin" viewBox="0 0 16 16">
                                  <path
                                    d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                  <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                                </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDivOff';
                // popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDiv';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p1As.style.pointerEvents = 'none';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon4').style.zIndex = '5';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p12");
          });
          // ...........................p13
          p13.addEventListener('click', () => {
            points -= 10;
            const p1Numbs = [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p13.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p13.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p13.innerHTML = `<span
                                style="color: Black; font-weight:bold;">${p1chose}</span>
                              <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                                  class="bi bii bi-coin" viewBox="0 0 16 16">
                                  <path
                                    d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                  <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                                </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDivOff';
                // popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDiv';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p1As.style.pointerEvents = 'none';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon4').style.zIndex = '5';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p13");
          })
          // ..............................p14
          p14.addEventListener('click', () => {
            points -= 10;
            const p1Numbs = [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p14.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p14.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p14.innerHTML = `<span
                                style="color: Black; font-weight:bold;">${p1chose}</span>
                              <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                                  class="bi bii bi-coin" viewBox="0 0 16 16">
                                  <path
                                    d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                  <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                                </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDivOff';
                // popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDiv';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p1As.style.pointerEvents = 'none';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon4').style.zIndex = '5';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p14");
          });

          // .................................p2.......
          p21.addEventListener('click', () => {
            const p2Numbs = [6.01, 6.02, 6.02, 6.03, 6.04, 6.05, 6.06, 6.07, 6.08, 6.09];
            function createArrayForP2() {
              return [0, 1, 2].map(() => p2Numbs[Math.floor(Math.random() * p2Numbs.length)]).concat("💩");
            }
            function LogRandomElementP2() {
              const arr2 = createArrayForP2();
              let p2chose = (arr2[Math.floor(Math.random() * arr2.length)]);
              p21.style.backgroundImage = 'none';

              if (p2chose == "💩") {
                p21.innerHTML = `<span style="color: Black; font-weight:bold;">${p2chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p2chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p21.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p2chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs3.className = 'XDiv';
                xdivs2.className = 'XDivOff';
                popdivscon2.className = 'PoopDivCon';
                popdivscon3.className = 'PoopDivConOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p2As.style.pointerEvents = 'none';
                p3As.style.pointerEvents = 'all';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon3').style.zIndex = '6';





                console.log("you win");
              }
            } LogRandomElementP2();
            console.log("p21");

          })
          p22.addEventListener('click', () => {
            const p2Numbs = [6.01, 6.02, 6.02, 6.03, 6.04, 6.05, 6.06, 6.07, 6.08, 6.09];
            function createArrayForP2() {
              return [0, 1, 2].map(() => p2Numbs[Math.floor(Math.random() * p2Numbs.length)]).concat("💩");
            }
            function LogRandomElementP2() {
              const arr2 = createArrayForP2();
              let p2chose = (arr2[Math.floor(Math.random() * arr2.length)]);
              p22.style.backgroundImage = 'none';

              if (p2chose == "💩") {
                p22.innerHTML = `<span style="color: Black; font-weight:bold;">${p2chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p2chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p22.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p2chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs3.className = 'XDiv';
                xdivs2.className = 'XDivOff';
                popdivscon2.className = 'PoopDivCon';
                popdivscon3.className = 'PoopDivConOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p2As.style.pointerEvents = 'none';
                p3As.style.pointerEvents = 'all';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon3').style.zIndex = '6';





                console.log("you win");
              }
            } LogRandomElementP2();
            console.log("p22");
          })
          p23.addEventListener('click', () => {
            const p2Numbs = [6.01, 6.02, 6.02, 6.03, 6.04, 6.05, 6.06, 6.07, 6.08, 6.09];
            function createArrayForP2() {
              return [0, 1, 2].map(() => p2Numbs[Math.floor(Math.random() * p2Numbs.length)]).concat("💩");
            }
            function LogRandomElementP2() {
              const arr2 = createArrayForP2();
              let p2chose = (arr2[Math.floor(Math.random() * arr2.length)]);
              p23.style.backgroundImage = 'none';

              if (p2chose == "💩") {
                p23.innerHTML = `<span style="color: Black; font-weight:bold;">${p2chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p2chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p23.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p2chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs3.className = 'XDiv';
                xdivs2.className = 'XDivOff';
                popdivscon2.className = 'PoopDivCon';
                popdivscon3.className = 'PoopDivConOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p2As.style.pointerEvents = 'none';
                p3As.style.pointerEvents = 'all';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon3').style.zIndex = '6';





                console.log("you win");
              }
            } LogRandomElementP2();
            console.log("p23");
          })
          p24.addEventListener('click', () => {
            const p2Numbs = [6.01, 6.02, 6.02, 6.03, 6.04, 6.05, 6.06, 6.07, 6.08, 6.09];
            function createArrayForP2() {
              return [0, 1, 2].map(() => p2Numbs[Math.floor(Math.random() * p2Numbs.length)]).concat("💩");
            }
            function LogRandomElementP2() {
              const arr2 = createArrayForP2();
              let p2chose = (arr2[Math.floor(Math.random() * arr2.length)]);
              p24.style.backgroundImage = 'none';

              if (p2chose == "💩") {
                p24.innerHTML = `<span style="color: Black; font-weight:bold;">${p2chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p2chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p24.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p2chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs3.className = 'XDiv';
                xdivs2.className = 'XDivOff';
                popdivscon2.className = 'PoopDivCon';
                popdivscon3.className = 'PoopDivConOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p2As.style.pointerEvents = 'none';
                p3As.style.pointerEvents = 'all';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon3').style.zIndex = '6';





                console.log("you win");
              }
            } LogRandomElementP2();
            console.log("p24");
          })

          // .......................p3..........
          p31.addEventListener('click', () => {
            const p1Numbs = ["💩", 3.09, 3.08, 3.07, 3.06, 3.05, 3.04, 3.03];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p31.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p31.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p3As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p31.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p1chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivConOff';
                xdivs1.className = 'XDivOff';
                xdivs3.className = 'XDivOff';
                popdivscon2.className = 'PoopDivConOff';
                xdivs2.className = 'XDivOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p3As.style.pointerEvents = 'none';
                popdivscon1.className = 'PoopDivCon1';
                xdivs1.className = 'XDiv';
                popdivscon1.style.pointerEvents = 'all';
                document.getElementById('popdivscon2').style.zIndex = '7';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p31");
          })
          p32.addEventListener('click', () => {
            const p1Numbs = ["💩", 3.09, 3.08, 3.07, 3.06, 3.05, 3.04, 3.03];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p32.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p32.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p3As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p32.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p1chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivConOff';
                xdivs1.className = 'XDivOff';
                xdivs3.className = 'XDivOff';
                popdivscon2.className = 'PoopDivConOff';
                xdivs2.className = 'XDivOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p3As.style.pointerEvents = 'none';
                popdivscon1.className = 'PoopDivCon1';
                xdivs1.className = 'XDiv';
                popdivscon1.style.pointerEvents = 'all';
                document.getElementById('popdivscon2').style.zIndex = '7';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p32");
          })
          p33.addEventListener('click', () => {
            const p1Numbs = ["💩", 3.09, 3.08, 3.07, 3.06, 3.05, 3.04, 3.03];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p33.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p33.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p3As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p33.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p1chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivConOff';
                xdivs1.className = 'XDivOff';
                xdivs3.className = 'XDivOff';
                popdivscon2.className = 'PoopDivConOff';
                xdivs2.className = 'XDivOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p3As.style.pointerEvents = 'none';
                popdivscon1.className = 'PoopDivCon1';
                xdivs1.className = 'XDiv';
                popdivscon1.style.pointerEvents = 'all';
                document.getElementById('popdivscon2').style.zIndex = '7';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p33");
          })
          p34.addEventListener('click', () => {
            const p1Numbs = ["💩", 3.09, 3.08, 3.07, 3.06, 3.05, 3.04, 3.03];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p34.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p34.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p3As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p34.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p1chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivConOff';
                xdivs1.className = 'XDivOff';
                xdivs3.className = 'XDivOff';
                popdivscon2.className = 'PoopDivConOff';
                xdivs2.className = 'XDivOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p3As.style.pointerEvents = 'none';
                popdivscon1.className = 'PoopDivCon1';
                xdivs1.className = 'XDiv';
                popdivscon1.style.pointerEvents = 'all';
                document.getElementById('popdivscon2').style.zIndex = '7';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p34");
          })

        } else {
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
            title: "You need more points!!"
          });

        }
        console.log("x1");

        console.log('X2');
      } else if (X3.className == "ClickedZ") {

        if (points >= 20) {
          StartTimer();
          CoinStartBtn.value = 'Ready!!';
          CoinStartBtn.style.pointerEvents = 'none';
          AMStart.style.pointerEvents = 'none';
          AMStart.className = 'AMStartBTNCant';

          playalert.style.display = 'flex';
          CoinStartBtn.style.display = 'none';
          AMStart.style.display = 'none';

          popdivscon1.className = 'PoopDivCon1Off';
          xdivs1.className = 'XDivOff';
          popdivscon2.className = 'PoopDivConOff';
          xdivs2.className = 'XDivOff';
          popdivscon3.className = 'PoopDivConOff';
          xdivs3.className = 'XDivOff';
          popdivscon4.style.pointerEvents = 'all';
          xdivs3.style.pointerEvents = 'all';

          StartTimer();
          CoinStartBtn.value = 'Ready!!';
          CoinStartBtn.style.pointerEvents = 'none';
          AMStart.style.pointerEvents = 'none';
          AMStart.className = 'AMStartBTNCant';

          playalert.style.display = 'flex';
          CoinStartBtn.style.display = 'none';
          AMStart.style.display = 'none';

          popdivscon1.className = 'PoopDivCon1Off';
          xdivs1.className = 'XDivOff';
          popdivscon2.className = 'PoopDivConOff';
          xdivs2.className = 'XDivOff';
          popdivscon3.className = 'PoopDivConOff';
          xdivs3.className = 'XDivOff';
          popdivscon4.style.pointerEvents = 'all';
          xdivs3.style.pointerEvents = 'all';
          // start round ZX4
          p11.addEventListener('click', () => {
            // console.log("p11");
            // after DTB Ok!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            playalert.style.pointerEvents = 'all';
            points -= 20;



            const p1Numbs = [4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p11.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p11.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                p11.innerHTML = `<span
                style="color: Black; font-weight:bold;">${p1chose}</span>
              <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                  class="bi bii bi-coin" viewBox="0 0 16 16">
                  <path
                    d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                </svg></i>`;
                playalert.innerText = `Claim (${p1chose})`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDivOff';
                // popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDiv';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p1As.style.pointerEvents = 'none';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon4').style.zIndex = '5';




                console.log("you win");







              }

            } LogRandomElementP1();


          });
          // ......................P2
          p12.addEventListener('click', () => {
            points -= 20;

            const p1Numbs = [4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p12.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p12.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p12.innerHTML = `<span
                            style="color: Black; font-weight:bold;">${p1chose}</span>
                          <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                              class="bi bii bi-coin" viewBox="0 0 16 16">
                              <path
                                d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                              <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                            </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDivOff';
                // popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDiv';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p1As.style.pointerEvents = 'none';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon4').style.zIndex = '5';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p12");
          });
          // ...........................p13
          p13.addEventListener('click', () => {
            points -= 20;

            const p1Numbs = [4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p13.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p13.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p13.innerHTML = `<span
                            style="color: Black; font-weight:bold;">${p1chose}</span>
                          <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                              class="bi bii bi-coin" viewBox="0 0 16 16">
                              <path
                                d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                              <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                            </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDivOff';
                // popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDiv';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p1As.style.pointerEvents = 'none';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon4').style.zIndex = '5';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p13");
          })
          // ..............................p14 x4
          p14.addEventListener('click', () => {

            points -= 20;
            const p1Numbs = [4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p14.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p14.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p14.innerHTML = `<span
                            style="color: Black; font-weight:bold;">${p1chose}</span>
                          <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                              class="bi bii bi-coin" viewBox="0 0 16 16">
                              <path
                                d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                              <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                            </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDivOff';
                // popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDiv';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p1As.style.pointerEvents = 'none';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon4').style.zIndex = '5';




                console.log("you win");







              }
            } LogRandomElementP1();
          });

          // .................................p2.......
          p21.addEventListener('click', () => {

            const p2Numbs = [10.1, 10.2, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9];
            function createArrayForP2() {
              return [0, 1, 2].map(() => p2Numbs[Math.floor(Math.random() * p2Numbs.length)]).concat("💩");
            }
            function LogRandomElementP2() {
              const arr2 = createArrayForP2();
              let p2chose = (arr2[Math.floor(Math.random() * arr2.length)]);
              p21.style.backgroundImage = 'none';

              if (p2chose == "💩") {
                p21.innerHTML = `<span style="color: Black; font-weight:bold;">${p2chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p2chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p21.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p2chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs3.className = 'XDiv';
                xdivs2.className = 'XDivOff';
                popdivscon2.className = 'PoopDivCon';
                popdivscon3.className = 'PoopDivConOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p2As.style.pointerEvents = 'none';
                p3As.style.pointerEvents = 'all';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon3').style.zIndex = '6';





                console.log("you win");
              }
            } LogRandomElementP2();
            console.log("p21");

          })
          p22.addEventListener('click', () => {
            const p2Numbs = [10.1, 10.2, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9];
            function createArrayForP2() {
              return [0, 1, 2].map(() => p2Numbs[Math.floor(Math.random() * p2Numbs.length)]).concat("💩");
            }
            function LogRandomElementP2() {
              const arr2 = createArrayForP2();
              let p2chose = (arr2[Math.floor(Math.random() * arr2.length)]);
              p22.style.backgroundImage = 'none';

              if (p2chose == "💩") {
                p22.innerHTML = `<span style="color: Black; font-weight:bold;">${p2chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p2chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p22.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p2chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs3.className = 'XDiv';
                xdivs2.className = 'XDivOff';
                popdivscon2.className = 'PoopDivCon';
                popdivscon3.className = 'PoopDivConOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p2As.style.pointerEvents = 'none';
                p3As.style.pointerEvents = 'all';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon3').style.zIndex = '6';





                console.log("you win");
              }
            } LogRandomElementP2();
            console.log("p22");
          })
          p23.addEventListener('click', () => {
            const p2Numbs = [10.1, 10.2, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9];
            function createArrayForP2() {
              return [0, 1, 2].map(() => p2Numbs[Math.floor(Math.random() * p2Numbs.length)]).concat("💩");
            }
            function LogRandomElementP2() {
              const arr2 = createArrayForP2();
              let p2chose = (arr2[Math.floor(Math.random() * arr2.length)]);
              p23.style.backgroundImage = 'none';

              if (p2chose == "💩") {
                p23.innerHTML = `<span style="color: Black; font-weight:bold;">${p2chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p2chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p23.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p2chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs3.className = 'XDiv';
                xdivs2.className = 'XDivOff';
                popdivscon2.className = 'PoopDivCon';
                popdivscon3.className = 'PoopDivConOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p2As.style.pointerEvents = 'none';
                p3As.style.pointerEvents = 'all';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon3').style.zIndex = '6';





                console.log("you win");
              }
            } LogRandomElementP2();
            console.log("p23");
          })
          p24.addEventListener('click', () => {
            const p2Numbs = [10.1, 10.2, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9];
            function createArrayForP2() {
              return [0, 1, 2].map(() => p2Numbs[Math.floor(Math.random() * p2Numbs.length)]).concat("💩");
            }
            function LogRandomElementP2() {
              const arr2 = createArrayForP2();
              let p2chose = (arr2[Math.floor(Math.random() * arr2.length)]);
              p24.style.backgroundImage = 'none';

              if (p2chose == "💩") {
                p24.innerHTML = `<span style="color: Black; font-weight:bold;">${p2chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p2chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p24.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p2chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs3.className = 'XDiv';
                xdivs2.className = 'XDivOff';
                popdivscon2.className = 'PoopDivCon';
                popdivscon3.className = 'PoopDivConOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p2As.style.pointerEvents = 'none';
                p3As.style.pointerEvents = 'all';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon3').style.zIndex = '6';





                console.log("you win");
              }
            } LogRandomElementP2();
            console.log("p24");
          })


          // .......................p3..........
          p31.addEventListener('click', () => {
            const p1Numbs = [10.01, "💩", 10.02, 10.03, 10.04, 10.05, 10.06, 10.07, 10.08];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p31.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p31.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p3As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p31.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p1chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivConOff';
                xdivs1.className = 'XDivOff';
                xdivs3.className = 'XDivOff';
                popdivscon2.className = 'PoopDivConOff';
                xdivs2.className = 'XDivOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p3As.style.pointerEvents = 'none';
                popdivscon1.className = 'PoopDivCon1';
                xdivs1.className = 'XDiv';
                popdivscon1.style.pointerEvents = 'all';
                document.getElementById('popdivscon2').style.zIndex = '7';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p31");
          })
          p32.addEventListener('click', () => {
            const p1Numbs = [10.01, "💩", 10.02, 10.03, 10.04, 10.05, 10.06, 10.07, 10.08];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p32.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p32.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p3As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p32.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p1chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivConOff';
                xdivs1.className = 'XDivOff';
                xdivs3.className = 'XDivOff';
                popdivscon2.className = 'PoopDivConOff';
                xdivs2.className = 'XDivOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p3As.style.pointerEvents = 'none';
                popdivscon1.className = 'PoopDivCon1';
                xdivs1.className = 'XDiv';
                popdivscon1.style.pointerEvents = 'all';
                document.getElementById('popdivscon2').style.zIndex = '7';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p32");
          })
          p33.addEventListener('click', () => {
            const p1Numbs = [10.01, "💩", 10.02, 10.03, 10.04, 10.05, 10.06, 10.07, 10.08];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p33.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p33.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p3As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p33.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p1chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivConOff';
                xdivs1.className = 'XDivOff';
                xdivs3.className = 'XDivOff';
                popdivscon2.className = 'PoopDivConOff';
                xdivs2.className = 'XDivOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p3As.style.pointerEvents = 'none';
                popdivscon1.className = 'PoopDivCon1';
                xdivs1.className = 'XDiv';
                popdivscon1.style.pointerEvents = 'all';
                document.getElementById('popdivscon2').style.zIndex = '7';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p33");
          })
          p34.addEventListener('click', () => {
            const p1Numbs = [10.01, "💩", 10.02, 10.03, 10.04, 10.05, 10.06, 10.07, 10.08];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p34.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p34.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p3As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p34.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p1chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivConOff';
                xdivs1.className = 'XDivOff';
                xdivs3.className = 'XDivOff';
                popdivscon2.className = 'PoopDivConOff';
                xdivs2.className = 'XDivOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p3As.style.pointerEvents = 'none';
                popdivscon1.className = 'PoopDivCon1';
                xdivs1.className = 'XDiv';
                popdivscon1.style.pointerEvents = 'all';
                document.getElementById('popdivscon2').style.zIndex = '7';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p34");
          })
        } else {
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
            title: "You need more points!!"
          });

        }

        console.log('X4');
      } else if (X4.className == "ClickedZ") {

        console.log(`your point = ${points}`);
        if (points >= 50) {
          StartTimer();
          CoinStartBtn.value = 'Ready!!';
          CoinStartBtn.style.pointerEvents = 'none';
          AMStart.style.pointerEvents = 'none';
          AMStart.className = 'AMStartBTNCant';

          playalert.style.display = 'flex';
          CoinStartBtn.style.display = 'none';
          AMStart.style.display = 'none';

          popdivscon1.className = 'PoopDivCon1Off';
          xdivs1.className = 'XDivOff';
          popdivscon2.className = 'PoopDivConOff';
          xdivs2.className = 'XDivOff';
          popdivscon3.className = 'PoopDivConOff';
          xdivs3.className = 'XDivOff';
          popdivscon4.style.pointerEvents = 'all';
          xdivs3.style.pointerEvents = 'all';

          // start round ZX2
          p11.addEventListener('click', () => {
            points -= 50;
            // console.log("p11");
            // after DTB Ok!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            playalert.style.pointerEvents = 'all';


            const p1Numbs = [20.1, 20.2, 20.3, 20.4, 20.5, 20.6, 20.7, 20.8, 20.9,];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p11.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p11.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p11.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p1chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim (${p1chose})`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDivOff';
                // popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDiv';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p1As.style.pointerEvents = 'none';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon4').style.zIndex = '5';




                console.log("you win");







              }
            } LogRandomElementP1();

          });
          // ......................P2
          p12.addEventListener('click', () => {
            points -= 50;
            const p1Numbs = [20.1, 20.2, 20.3, 20.4, 20.5, 20.6, 20.7, 20.8, 20.9];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p12.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p12.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p12.innerHTML = `<span
                                style="color: Black; font-weight:bold;">${p1chose}</span>
                              <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                                  class="bi bii bi-coin" viewBox="0 0 16 16">
                                  <path
                                    d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                  <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                                </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDivOff';
                // popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDiv';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p1As.style.pointerEvents = 'none';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon4').style.zIndex = '5';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p12");
          });
          // ...........................p13
          p13.addEventListener('click', () => {
            points -= 50;
            const p1Numbs = [20.1, 20.2, 20.3, 20.4, 20.5, 20.6, 20.7, 20.8, 20.9];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p13.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p13.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p13.innerHTML = `<span
                                style="color: Black; font-weight:bold;">${p1chose}</span>
                              <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                                  class="bi bii bi-coin" viewBox="0 0 16 16">
                                  <path
                                    d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                  <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                                </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDivOff';
                // popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDiv';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p1As.style.pointerEvents = 'none';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon4').style.zIndex = '5';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p13");
          })
          // ..............................p14
          p14.addEventListener('click', () => {
            points -= 50;
            const p1Numbs = [20.1, 20.2, 20.3, 20.4, 20.5, 20.6, 20.7, 20.8, 20.9];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p14.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p14.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p14.innerHTML = `<span
                                style="color: Black; font-weight:bold;">${p1chose}</span>
                              <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                                  class="bi bii bi-coin" viewBox="0 0 16 16">
                                  <path
                                    d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                  <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                                </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDivOff';
                // popdivscon3.className = 'PoopDivCon';
                xdivs2.className = 'XDiv';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p1As.style.pointerEvents = 'none';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon4').style.zIndex = '5';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p14");
          });

          // .................................p2.......
          p21.addEventListener('click', () => {

            const p2Numbs = [23.1, 23.2, 23.3, 23.4, 23.5];
            function createArrayForP2() {
              return [0, 1, 2].map(() => p2Numbs[Math.floor(Math.random() * p2Numbs.length)]).concat("💩");
            }
            function LogRandomElementP2() {
              const arr2 = createArrayForP2();
              let p2chose = (arr2[Math.floor(Math.random() * arr2.length)]);
              p21.style.backgroundImage = 'none';

              if (p2chose == "💩") {
                p21.innerHTML = `<span style="color: Black; font-weight:bold;">${p2chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p2chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p21.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p2chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs3.className = 'XDiv';
                xdivs2.className = 'XDivOff';
                popdivscon2.className = 'PoopDivCon';
                popdivscon3.className = 'PoopDivConOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p2As.style.pointerEvents = 'none';
                p3As.style.pointerEvents = 'all';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon3').style.zIndex = '6';





                console.log("you win");
              }
            } LogRandomElementP2();
            console.log("p21");

          })
          p22.addEventListener('click', () => {
            const p2Numbs = [23.1, 23.2, 23.3, 23.4, 23.5];
            function createArrayForP2() {
              return [0, 1, 2].map(() => p2Numbs[Math.floor(Math.random() * p2Numbs.length)]).concat("💩");
            }
            function LogRandomElementP2() {
              const arr2 = createArrayForP2();
              let p2chose = (arr2[Math.floor(Math.random() * arr2.length)]);
              p22.style.backgroundImage = 'none';

              if (p2chose == "💩") {
                p22.innerHTML = `<span style="color: Black; font-weight:bold;">${p2chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p2chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p22.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p2chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs3.className = 'XDiv';
                xdivs2.className = 'XDivOff';
                popdivscon2.className = 'PoopDivCon';
                popdivscon3.className = 'PoopDivConOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p2As.style.pointerEvents = 'none';
                p3As.style.pointerEvents = 'all';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon3').style.zIndex = '6';





                console.log("you win");
              }
            } LogRandomElementP2();
            console.log("p22");
          })
          p23.addEventListener('click', () => {
            const p2Numbs = [23.1, 23.2, 23.3, 23.4, 23.5];
            function createArrayForP2() {
              return [0, 1, 2].map(() => p2Numbs[Math.floor(Math.random() * p2Numbs.length)]).concat("💩");
            }
            function LogRandomElementP2() {
              const arr2 = createArrayForP2();
              let p2chose = (arr2[Math.floor(Math.random() * arr2.length)]);
              p23.style.backgroundImage = 'none';

              if (p2chose == "💩") {
                p23.innerHTML = `<span style="color: Black; font-weight:bold;">${p2chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p2chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p23.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p2chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs3.className = 'XDiv';
                xdivs2.className = 'XDivOff';
                popdivscon2.className = 'PoopDivCon';
                popdivscon3.className = 'PoopDivConOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p2As.style.pointerEvents = 'none';
                p3As.style.pointerEvents = 'all';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon3').style.zIndex = '6';





                console.log("you win");
              }
            } LogRandomElementP2();
            console.log("p23");
          })
          p24.addEventListener('click', () => {
            const p2Numbs = [23.1, 23.2, 23.3, 23.4, 23.5];
            function createArrayForP2() {
              return [0, 1, 2].map(() => p2Numbs[Math.floor(Math.random() * p2Numbs.length)]).concat("💩");
            }
            function LogRandomElementP2() {
              const arr2 = createArrayForP2();
              let p2chose = (arr2[Math.floor(Math.random() * arr2.length)]);
              p24.style.backgroundImage = 'none';

              if (p2chose == "💩") {
                p24.innerHTML = `<span style="color: Black; font-weight:bold;">${p2chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p1As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p2chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p24.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p2chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs3.className = 'XDiv';
                xdivs2.className = 'XDivOff';
                popdivscon2.className = 'PoopDivCon';
                popdivscon3.className = 'PoopDivConOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p2As.style.pointerEvents = 'none';
                p3As.style.pointerEvents = 'all';
                popdivscon3.style.pointerEvents = 'all';
                document.getElementById('popdivscon3').style.zIndex = '6';





                console.log("you win");
              }
            } LogRandomElementP2();
            console.log("p24");
          })


          // .......................p3..........
          p31.addEventListener('click', () => {
            const p1Numbs = [10, "💩", 10.01, 10.02, 10.03, 10.04, 10.05, 10.06];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p31.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p31.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p3As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p31.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p1chose}</span>

                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivConOff';
                xdivs1.className = 'XDivOff';
                xdivs3.className = 'XDivOff';
                popdivscon2.className = 'PoopDivConOff';
                xdivs2.className = 'XDivOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p3As.style.pointerEvents = 'none';
                popdivscon1.className = 'PoopDivCon1';
                xdivs1.className = 'XDiv';
                popdivscon1.style.pointerEvents = 'all';
                document.getElementById('popdivscon2').style.zIndex = '7';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p31");
          })
          p32.addEventListener('click', () => {
            const p1Numbs = [10, "💩", 10.01, 10.02, 10.03, 10.04, 10.05, 10.06];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p32.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p32.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p3As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p32.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p1chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivConOff';
                xdivs1.className = 'XDivOff';
                xdivs3.className = 'XDivOff';
                popdivscon2.className = 'PoopDivConOff';
                xdivs2.className = 'XDivOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p3As.style.pointerEvents = 'none';
                popdivscon1.className = 'PoopDivCon1';
                xdivs1.className = 'XDiv';
                popdivscon1.style.pointerEvents = 'all';
                document.getElementById('popdivscon2').style.zIndex = '7';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p32");
          })
          p33.addEventListener('click', () => {
            const p1Numbs = [10, "💩", 10.01, 10.02, 10.03, 10.04, 10.05, 10.06];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p33.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p33.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p3As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p33.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p1chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivConOff';
                xdivs1.className = 'XDivOff';
                xdivs3.className = 'XDivOff';
                popdivscon2.className = 'PoopDivConOff';
                xdivs2.className = 'XDivOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p3As.style.pointerEvents = 'none';
                popdivscon1.className = 'PoopDivCon1';
                xdivs1.className = 'XDiv';
                popdivscon1.style.pointerEvents = 'all';
                document.getElementById('popdivscon2').style.zIndex = '7';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p33");
          })
          p34.addEventListener('click', () => {
            const p1Numbs = [10, "💩", 10.01, 10.02, 10.03, 10.04, 10.05, 10.06];
            function createArrayForP1() {
              return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
            }
            function LogRandomElementP1() {
              const arr1 = createArrayForP1();
              let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
              p34.style.backgroundImage = 'none';

              if (p1chose == "💩") {
                p34.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                PopLose.style.pointerEvents = 'none';

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
                  title: "Ooh you lose"
                });
                playalert.innerText = 'Ooh you lose';
                p3As.style.pointerEvents = 'none';


              } else {
                let points1 = points += p1chose;

                async function P1RewardedGiven() {
                  const { data1, error1 } = await supabase.from("telusersinfo")
                    .update({ point: points1 })
                    .eq('id', a)
                } P1RewardedGiven();
                p34.innerHTML = `<span
                    style="color: Black; font-weight:bold;">${p1chose}</span>
                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                      class="bi bii bi-coin" viewBox="0 0 16 16">
                      <path
                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg></i>`;
                playalert.innerText = `Claim`;
                document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                popdivscon1.className = 'PoopDivCon1Off';
                xdivs1.className = 'XDivOff';
                popdivscon3.className = 'PoopDivConOff';
                xdivs1.className = 'XDivOff';
                xdivs3.className = 'XDivOff';
                popdivscon2.className = 'PoopDivConOff';
                xdivs2.className = 'XDivOff';
                popdivscon4.className = 'PoopDivConOff';
                xdivs4.className = 'XDivOff';
                p3As.style.pointerEvents = 'none';
                popdivscon1.className = 'PoopDivCon1';
                xdivs1.className = 'XDiv';
                popdivscon1.style.pointerEvents = 'all';
                document.getElementById('popdivscon2').style.zIndex = '7';




                console.log("you win");







              }
            } LogRandomElementP1();
            console.log("p34");
          })

        } else {
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
            title: "You need more points!!"
          });

        }

        console.log('X16');
      }

    })


    let adon = true;
    AMStart.addEventListener('click', () => {
      AMStart.style.pointerEvents = 'none';
      AMStart.style.backgroundColor = 'Gray';
      if (adon == true) {
        adon = true;
        console.log(adon);

      }
      AMStart.value = '👇 Click the ad 👇';


      const adsNotFoundCallback = () => {
        adon = true;
        AMStart.value = 'Start (show ad)';
        AMStart.style.backgroundColor = 'Greenyellow';
        alert('Please try again a few minutes later or change your IP to 🇩🇪,🇬🇧 or 🇺🇲');
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });

        Toast.fire({
          icon: "error",
          title: "Please try again a few minutes later or change your IP to 🇩🇪,🇬🇧 or 🇺🇲"
        });
        AMStart.style.pointerEvents = 'all';
        // Write your code here in case we couldn't display ad
      };

      // Callback for REWARDED format
      const onClickRewardCallback = (adId) => {
        adon = false;
        AMStart.style.pointerEvents = 'all';
        AMStart.value = 'Click to Play !';
        AMStart.style.backgroundColor = 'Greenyellow';

        function StartTimer() {
          let counter = 12;
          const timerElement = document.getElementById('TimerId');
          const totalWidth = timerElement.offsetWidth;

          const interval = setInterval(() => {
            counter--;
            const widthPercent = (counter / 12) * 100;
            timerElement.style.width = `${widthPercent}%`;
            timerElement.textContent = counter > 0 ? counter : '0';

            if (counter <= 0) {
              clearInterval(interval);
              timerElement.style.width = '0%';
              console.log('ok');
              playalert.style.pointerEvents = 'all';
              PopLose.style.pointerEvents = 'none';
              playalert.innerText = 'Refresh to Play Again';
              p11.style.pointerEvents = 'none';
              p12.style.pointerEvents = 'none';
              p13.style.pointerEvents = 'none';
              p14.style.pointerEvents = 'none';
              p21.style.pointerEvents = 'none';
              p22.style.pointerEvents = 'none';
              p23.style.pointerEvents = 'none';
              p24.style.pointerEvents = 'none';
              p31.style.pointerEvents = 'none';
              p32.style.pointerEvents = 'none';
              p33.style.pointerEvents = 'none';
              p34.style.pointerEvents = 'none';
              p41.style.pointerEvents = 'none';
              p42.style.pointerEvents = 'none';
              p43.style.pointerEvents = 'none';
              p44.style.pointerEvents = 'none';


              PointUpdating();
            }
          }, 1000);
        };

        AMStart.addEventListener('click', () => {
          AMStart.style.pointerEvents = 'none';


          playalert.style.pointerEvents = 'none';
          X1.style.pointerEvents = 'none';
          X2.style.pointerEvents = 'none';
          X3.style.pointerEvents = 'none';
          X4.style.pointerEvents = 'none';

          if (X1.className == "ClickedZ") {
            // .............x1 on X1 .............

            if (AMStart.value == '👇 Click the ad 👇') {
              StartTimer();


              AMStart.style.pointerEvents = 'none';

              playalert.style.display = 'flex';
              CoinStartBtn.style.display = 'none';
              AMStart.style.display = 'none';

              popdivscon1.className = 'PoopDivCon1Off';
              xdivs1.className = 'XDivOff';
              popdivscon2.className = 'PoopDivConOff';
              xdivs2.className = 'XDivOff';
              popdivscon3.className = 'PoopDivConOff';
              xdivs3.className = 'XDivOff';
              popdivscon4.style.pointerEvents = 'all';
              xdivs3.style.pointerEvents = 'all';




              p11.addEventListener('click', () => {


                // console.log("p11");
                // after DTB Ok!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                playalert.style.pointerEvents = 'all';


                const p1Numbs = [1.3, 1.4, 1.5, 1.6, 1.2, 1.1];
                function createArrayForP1() {
                  return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat(1);
                }
                function LogRandomElementP1() {
                  const arr1 = createArrayForP1();
                  let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
                  p11.style.backgroundImage = 'none';

                  if (p1chose == "💩") {
                    p11.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                    PopLose.style.pointerEvents = 'none';

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
                      title: "Ooh you lose"
                    });
                    playalert.innerText = 'Ooh you lose';
                    p1As.style.pointerEvents = 'none';






                  } else {
                    let points1 = points += p1chose;

                    async function P1RewardedGiven() {
                      const { data1, error1 } = await supabase.from("telusersinfo")
                        .update({ point: points1 })
                        .eq('id', a)
                    } P1RewardedGiven();

                    p11.innerHTML = `<span
                        style="color: Black; font-weight:bold;">${p1chose}</span>
                      <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                          class="bi bii bi-coin" viewBox="0 0 16 16">
                          <path
                            d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                        </svg></i>`;
                    playalert.innerText = `Claim (${p1chose})`;
                    document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                    popdivscon1.className = 'PoopDivCon1Off';
                    xdivs1.className = 'XDivOff';
                    popdivscon3.className = 'PoopDivCon';
                    xdivs2.className = 'XDivOff';
                    // popdivscon3.className = 'PoopDivCon';
                    xdivs2.className = 'XDiv';
                    popdivscon4.className = 'PoopDivConOff';
                    xdivs4.className = 'XDivOff';
                    p1As.style.pointerEvents = 'none';
                    popdivscon3.style.pointerEvents = 'all';
                    document.getElementById('popdivscon4').style.zIndex = '5';




                    console.log("you win");







                  }

                } LogRandomElementP1();

              });
              // ......................P12
              p12.addEventListener('click', () => {


                const p1Numbs = [1.3, 1.4, 1.5, 1.6, 1.2, 1.1];
                function createArrayForP1() {
                  return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat(1);
                }
                function LogRandomElementP1() {
                  const arr1 = createArrayForP1();
                  let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
                  p12.style.backgroundImage = 'none';

                  if (p1chose == "💩") {
                    p12.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                    PopLose.style.pointerEvents = 'none';

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
                      title: "Ooh you lose"
                    });
                    playalert.innerText = 'Ooh you lose';
                    p1As.style.pointerEvents = 'none';


                  } else {
                    let points1 = points += p1chose;
                    async function P1RewardedGiven() {
                      const { data1, error1 } = await supabase.from("telusersinfo")
                        .update({ point: points1 })
                        .eq('id', a)
                    } P1RewardedGiven();
                    p12.innerHTML = `<span
                                    style="color: Black; font-weight:bold;">${p1chose}</span>
                                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                                      class="bi bii bi-coin" viewBox="0 0 16 16">
                                      <path
                                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                                    </svg></i>`;
                    playalert.innerText = `Claim`;
                    document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                    popdivscon1.className = 'PoopDivCon1Off';
                    xdivs1.className = 'XDivOff';
                    popdivscon3.className = 'PoopDivCon';
                    xdivs2.className = 'XDivOff';
                    // popdivscon3.className = 'PoopDivCon';
                    xdivs2.className = 'XDiv';
                    popdivscon4.className = 'PoopDivConOff';
                    xdivs4.className = 'XDivOff';
                    p1As.style.pointerEvents = 'none';
                    popdivscon3.style.pointerEvents = 'all';
                    document.getElementById('popdivscon4').style.zIndex = '5';




                    console.log("you win");







                  }
                } LogRandomElementP1();
                console.log("p12");
              });
              // ...........................p13
              p13.addEventListener('click', () => {


                const p1Numbs = [1.3, 1.4, 1.5, 1.6, 1.2, 1.1];
                function createArrayForP1() {
                  return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat(1);
                }
                function LogRandomElementP1() {
                  const arr1 = createArrayForP1();
                  let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
                  p13.style.backgroundImage = 'none';

                  if (p1chose == "💩") {
                    p13.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                    PopLose.style.pointerEvents = 'none';

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
                      title: "Ooh you lose"
                    });
                    playalert.innerText = 'Ooh you lose';
                    p1As.style.pointerEvents = 'none';


                  } else {
                    let points1 = points += p1chose;
                    async function P1RewardedGiven() {
                      const { data1, error1 } = await supabase.from("telusersinfo")
                        .update({ point: points1 })
                        .eq('id', a)
                    } P1RewardedGiven();

                    p13.innerHTML = `<span
                                    style="color: Black; font-weight:bold;">${p1chose}</span>
                                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                                      class="bi bii bi-coin" viewBox="0 0 16 16">
                                      <path
                                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                                    </svg></i>`;
                    playalert.innerText = `Claim`;
                    document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                    popdivscon1.className = 'PoopDivCon1Off';
                    xdivs1.className = 'XDivOff';
                    popdivscon3.className = 'PoopDivCon';
                    xdivs2.className = 'XDivOff';
                    // popdivscon3.className = 'PoopDivCon';
                    xdivs2.className = 'XDiv';
                    popdivscon4.className = 'PoopDivConOff';
                    xdivs4.className = 'XDivOff';
                    p1As.style.pointerEvents = 'none';
                    popdivscon3.style.pointerEvents = 'all';
                    document.getElementById('popdivscon4').style.zIndex = '5';




                    console.log("you win");







                  }
                } LogRandomElementP1();
                console.log("p13");
              })
              // ..............................p14
              p14.addEventListener('click', () => {


                const p1Numbs = [1.3, 1.4, 1.5, 1.6, 1.2, 1.1];
                function createArrayForP1() {
                  return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat(1);
                }
                function LogRandomElementP1() {
                  const arr1 = createArrayForP1();
                  let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
                  p14.style.backgroundImage = 'none';

                  if (p1chose == "💩") {
                    p14.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                    PopLose.style.pointerEvents = 'none';

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
                      title: "Ooh you lose"
                    });
                    playalert.innerText = 'Ooh you lose';
                    p1As.style.pointerEvents = 'none';


                  } else {
                    let points1 = points += p1chose;
                    async function P1RewardedGiven() {
                      const { data1, error1 } = await supabase.from("telusersinfo")
                        .update({ point: points1 })
                        .eq('id', a)
                    } P1RewardedGiven();

                    p14.innerHTML = `<span
                                    style="color: Black; font-weight:bold;">${p1chose}</span>
                                  <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                                      class="bi bii bi-coin" viewBox="0 0 16 16">
                                      <path
                                        d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                                    </svg></i>`;
                    playalert.innerText = `Claim`;
                    document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                    popdivscon1.className = 'PoopDivCon1Off';
                    xdivs1.className = 'XDivOff';
                    popdivscon3.className = 'PoopDivCon';
                    xdivs2.className = 'XDivOff';
                    // popdivscon3.className = 'PoopDivCon';
                    xdivs2.className = 'XDiv';
                    popdivscon4.className = 'PoopDivConOff';
                    xdivs4.className = 'XDivOff';
                    p1As.style.pointerEvents = 'none';
                    popdivscon3.style.pointerEvents = 'all';
                    document.getElementById('popdivscon4').style.zIndex = '5';




                    console.log("you win");







                  }
                } LogRandomElementP1();
                console.log("p14");
              });

              // ...................p2.........
              p21.addEventListener('click', () => {
                const p2Numbs = [0.3, 0.4, 0.5, 0.6, "💩", 0.2, 0.1];
                function createArrayForP2() {
                  return [0, 1, 2].map(() => p2Numbs[Math.floor(Math.random() * p2Numbs.length)]).concat("💩");
                }
                function LogRandomElementP2() {
                  const arr2 = createArrayForP2();
                  let p2chose = (arr2[Math.floor(Math.random() * arr2.length)]);
                  p21.style.backgroundImage = 'none';

                  if (p2chose == "💩") {

                    p21.innerHTML = `<span style="color: Black; font-weight:bold;">${p2chose}</span>`;

                    PopLose.style.pointerEvents = 'none';

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
                      title: "Ooh you lose"
                    });
                    playalert.innerText = 'Ooh you lose';
                    p1As.style.pointerEvents = 'none';


                  } else {
                    let points1 = points += p2chose;
                    async function P1RewardedGiven() {
                      const { data1, error1 } = await supabase.from("telusersinfo")
                        .update({ point: points1 })
                        .eq('id', a)
                    } P1RewardedGiven();

                    p21.innerHTML = `<span
                        style="color: Black; font-weight:bold;">${p2chose}</span>
                      <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                          class="bi bii bi-coin" viewBox="0 0 16 16">
                          <path
                            d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                        </svg></i>`;
                    playalert.innerText = `Claim`;
                    document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                    popdivscon1.className = 'PoopDivCon1Off';
                    xdivs3.className = 'XDiv';
                    xdivs2.className = 'XDivOff';
                    popdivscon2.className = 'PoopDivCon';
                    popdivscon3.className = 'PoopDivConOff';
                    popdivscon4.className = 'PoopDivConOff';
                    xdivs4.className = 'XDivOff';
                    p2As.style.pointerEvents = 'none';
                    p3As.style.pointerEvents = 'all';
                    popdivscon3.style.pointerEvents = 'all';
                    document.getElementById('popdivscon3').style.zIndex = '6';





                    console.log("you win");
                  }
                } LogRandomElementP2();
                console.log("p21");

              })
              p22.addEventListener('click', () => {
                const p2Numbs = [0.3, 0.4, 0.5, 0.6, "💩", 0.2, 0.1];
                function createArrayForP2() {
                  return [0, 1, 2].map(() => p2Numbs[Math.floor(Math.random() * p2Numbs.length)]).concat("💩");
                }
                function LogRandomElementP2() {
                  const arr2 = createArrayForP2();
                  let p2chose = (arr2[Math.floor(Math.random() * arr2.length)]);
                  p22.style.backgroundImage = 'none';

                  if (p2chose == "💩") {
                    p22.innerHTML = `<span style="color: Black; font-weight:bold;">${p2chose}</span>`;

                    PopLose.style.pointerEvents = 'none';

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
                      title: "Ooh you lose"
                    });
                    playalert.innerText = 'Ooh you lose';
                    p1As.style.pointerEvents = 'none';


                  } else {
                    let points1 = points += p2chose;
                    async function P1RewardedGiven() {
                      const { data1, error1 } = await supabase.from("telusersinfo")
                        .update({ point: points1 })
                        .eq('id', a)
                    } P1RewardedGiven();

                    p22.innerHTML = `<span
                        style="color: Black; font-weight:bold;">${p2chose}</span>
                      <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                          class="bi bii bi-coin" viewBox="0 0 16 16">
                          <path
                            d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                        </svg></i>`;
                    playalert.innerText = `Claim`;
                    document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                    popdivscon1.className = 'PoopDivCon1Off';
                    xdivs3.className = 'XDiv';
                    xdivs2.className = 'XDivOff';
                    popdivscon2.className = 'PoopDivCon';
                    popdivscon3.className = 'PoopDivConOff';
                    popdivscon4.className = 'PoopDivConOff';
                    xdivs4.className = 'XDivOff';
                    p2As.style.pointerEvents = 'none';
                    p3As.style.pointerEvents = 'all';
                    popdivscon3.style.pointerEvents = 'all';
                    document.getElementById('popdivscon3').style.zIndex = '6';





                    console.log("you win");
                  }
                } LogRandomElementP2();
                console.log("p22");
              })
              p23.addEventListener('click', () => {
                const p2Numbs = [0.3, 0.4, 0.5, 0.6, "💩", 0.2, 0.1];
                function createArrayForP2() {
                  return [0, 1, 2].map(() => p2Numbs[Math.floor(Math.random() * p2Numbs.length)]).concat("💩");
                }
                function LogRandomElementP2() {
                  const arr2 = createArrayForP2();
                  let p2chose = (arr2[Math.floor(Math.random() * arr2.length)]);
                  p23.style.backgroundImage = 'none';

                  if (p2chose == "💩") {
                    p23.innerHTML = `<span style="color: Black; font-weight:bold;">${p2chose}</span>`;

                    PopLose.style.pointerEvents = 'none';

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
                      title: "Ooh you lose"
                    });
                    playalert.innerText = 'Ooh you lose';
                    p1As.style.pointerEvents = 'none';


                  } else {
                    let points1 = points += p2chose;
                    async function P1RewardedGiven() {
                      const { data1, error1 } = await supabase.from("telusersinfo")
                        .update({ point: points1 })
                        .eq('id', a)
                    } P1RewardedGiven();

                    p23.innerHTML = `<span
                        style="color: Black; font-weight:bold;">${p2chose}</span>
                      <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                          class="bi bii bi-coin" viewBox="0 0 16 16">
                          <path
                            d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                        </svg></i>`;
                    playalert.innerText = `Claim`;
                    document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                    popdivscon1.className = 'PoopDivCon1Off';
                    xdivs3.className = 'XDiv';
                    xdivs2.className = 'XDivOff';
                    popdivscon2.className = 'PoopDivCon';
                    popdivscon3.className = 'PoopDivConOff';
                    popdivscon4.className = 'PoopDivConOff';
                    xdivs4.className = 'XDivOff';
                    p2As.style.pointerEvents = 'none';
                    p3As.style.pointerEvents = 'all';
                    popdivscon3.style.pointerEvents = 'all';
                    document.getElementById('popdivscon3').style.zIndex = '6';





                    console.log("you win");
                  }
                } LogRandomElementP2();
                console.log("p23");
              })
              p24.addEventListener('click', () => {
                const p2Numbs = [0.3, 0.4, 0.5, 0.6, "💩", 0.2, 0.1];
                function createArrayForP2() {
                  return [0, 1, 2].map(() => p2Numbs[Math.floor(Math.random() * p2Numbs.length)]).concat("💩");
                }
                function LogRandomElementP2() {
                  const arr2 = createArrayForP2();
                  let p2chose = (arr2[Math.floor(Math.random() * arr2.length)]);
                  p24.style.backgroundImage = 'none';

                  if (p2chose == "💩") {
                    p24.innerHTML = `<span style="color: Black; font-weight:bold;">${p2chose}</span>`;

                    PopLose.style.pointerEvents = 'none';

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
                      title: "Ooh you lose"
                    });
                    playalert.innerText = 'Ooh you lose';
                    p1As.style.pointerEvents = 'none';


                  } else {
                    let points1 = points += p2chose;
                    async function P1RewardedGiven() {
                      const { data1, error1 } = await supabase.from("telusersinfo")
                        .update({ point: points1 })
                        .eq('id', a)
                    } P1RewardedGiven();

                    p24.innerHTML = `<span
                        style="color: Black; font-weight:bold;">${p2chose}</span>
                      <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                          class="bi bii bi-coin" viewBox="0 0 16 16">
                          <path
                            d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                        </svg></i>`;
                    playalert.innerText = `Claim`;
                    document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                    popdivscon1.className = 'PoopDivCon1Off';
                    xdivs3.className = 'XDiv';
                    xdivs2.className = 'XDivOff';
                    popdivscon2.className = 'PoopDivCon';
                    popdivscon3.className = 'PoopDivConOff';
                    popdivscon4.className = 'PoopDivConOff';
                    xdivs4.className = 'XDivOff';
                    p2As.style.pointerEvents = 'none';
                    p3As.style.pointerEvents = 'all';
                    popdivscon3.style.pointerEvents = 'all';
                    document.getElementById('popdivscon3').style.zIndex = '6';





                    console.log("you win");
                  }
                } LogRandomElementP2();
                console.log("p24");
              })


              // .......................p3..........
              p31.addEventListener('click', () => {
                const p1Numbs = [0.3, 0.4, 0.5, 0.6, "💩"];
                function createArrayForP1() {
                  return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
                }
                function LogRandomElementP1() {
                  const arr1 = createArrayForP1();
                  let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
                  p31.style.backgroundImage = 'none';

                  if (p1chose == "💩") {
                    p31.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                    PopLose.style.pointerEvents = 'none';

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
                      title: "Ooh you lose"
                    });
                    playalert.innerText = 'Ooh you lose';
                    p3As.style.pointerEvents = 'none';


                  } else {
                    let points3 = points += p1chose;
                    async function P1RewardedGiven() {
                      const { data1, error1 } = await supabase.from("telusersinfo")
                        .update({ point: points3 })
                        .eq('id', a)
                    } P1RewardedGiven();

                    p31.innerHTML = `<span
                        style="color: Black; font-weight:bold;">${p1chose}</span>
                      <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                          class="bi bii bi-coin" viewBox="0 0 16 16">
                          <path
                            d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                        </svg></i>`;
                    playalert.innerText = `Claim`;
                    document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                    popdivscon1.className = 'PoopDivCon1Off';
                    xdivs1.className = 'XDivOff';
                    popdivscon3.className = 'PoopDivConOff';
                    xdivs1.className = 'XDivOff';
                    xdivs3.className = 'XDivOff';
                    popdivscon2.className = 'PoopDivConOff';
                    xdivs2.className = 'XDivOff';
                    popdivscon4.className = 'PoopDivConOff';
                    xdivs4.className = 'XDivOff';
                    p3As.style.pointerEvents = 'none';
                    popdivscon1.className = 'PoopDivCon1';
                    xdivs1.className = 'XDiv';
                    popdivscon1.style.pointerEvents = 'all';
                    document.getElementById('popdivscon2').style.zIndex = '7';




                    console.log("you win");







                  }
                } LogRandomElementP1();
                console.log("p31");
              })
              p32.addEventListener('click', () => {
                const p1Numbs = [0.3, 0.4, 0.5, 0.6, "💩"];
                function createArrayForP1() {
                  return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
                }
                function LogRandomElementP1() {
                  const arr1 = createArrayForP1();
                  let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
                  p32.style.backgroundImage = 'none';

                  if (p1chose == "💩") {
                    p32.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                    PopLose.style.pointerEvents = 'none';

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
                      title: "Ooh you lose"
                    });
                    playalert.innerText = 'Ooh you lose';
                    p3As.style.pointerEvents = 'none';


                  } else {
                    let points3 = points += p1chose;
                    async function P1RewardedGiven() {
                      const { data1, error1 } = await supabase.from("telusersinfo")
                        .update({ point: points3 })
                        .eq('id', a)
                    } P1RewardedGiven();

                    p32.innerHTML = `<span
                        style="color: Black; font-weight:bold;">${p1chose}</span>
                      <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                          class="bi bii bi-coin" viewBox="0 0 16 16">
                          <path
                            d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                        </svg></i>`;
                    playalert.innerText = `Claim`;
                    document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                    popdivscon1.className = 'PoopDivCon1Off';
                    xdivs1.className = 'XDivOff';
                    popdivscon3.className = 'PoopDivConOff';
                    xdivs1.className = 'XDivOff';
                    xdivs3.className = 'XDivOff';
                    popdivscon2.className = 'PoopDivConOff';
                    xdivs2.className = 'XDivOff';
                    popdivscon4.className = 'PoopDivConOff';
                    xdivs4.className = 'XDivOff';
                    p3As.style.pointerEvents = 'none';
                    popdivscon1.className = 'PoopDivCon1';
                    xdivs1.className = 'XDiv';
                    popdivscon1.style.pointerEvents = 'all';
                    document.getElementById('popdivscon2').style.zIndex = '7';




                    console.log("you win");







                  }
                } LogRandomElementP1();
                console.log("p32");
              })
              p33.addEventListener('click', () => {
                const p1Numbs = [0.3, 0.4, 0.5, 0.6, "💩"];
                function createArrayForP1() {
                  return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
                }
                function LogRandomElementP1() {
                  const arr1 = createArrayForP1();
                  let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
                  p33.style.backgroundImage = 'none';

                  if (p1chose == "💩") {
                    p33.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                    PopLose.style.pointerEvents = 'none';

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
                      title: "Ooh you lose"
                    });
                    playalert.innerText = 'Ooh you lose';
                    p3As.style.pointerEvents = 'none';


                  } else {
                    let points3 = points += p1chose;
                    async function P1RewardedGiven() {
                      const { data1, error1 } = await supabase.from("telusersinfo")
                        .update({ point: points3 })
                        .eq('id', a)
                    } P1RewardedGiven();

                    p33.innerHTML = `<span
                        style="color: Black; font-weight:bold;">${p1chose}</span>
                      <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                          class="bi bii bi-coin" viewBox="0 0 16 16">
                          <path
                            d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                        </svg></i>`;
                    playalert.innerText = `Claim`;
                    document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                    popdivscon1.className = 'PoopDivCon1Off';
                    xdivs1.className = 'XDivOff';
                    popdivscon3.className = 'PoopDivConOff';
                    xdivs1.className = 'XDivOff';
                    xdivs3.className = 'XDivOff';
                    popdivscon2.className = 'PoopDivConOff';
                    xdivs2.className = 'XDivOff';
                    popdivscon4.className = 'PoopDivConOff';
                    xdivs4.className = 'XDivOff';
                    p3As.style.pointerEvents = 'none';
                    popdivscon1.className = 'PoopDivCon1';
                    xdivs1.className = 'XDiv';
                    popdivscon1.style.pointerEvents = 'all';
                    document.getElementById('popdivscon2').style.zIndex = '7';




                    console.log("you win");







                  }
                } LogRandomElementP1();
                console.log("p33");
              })
              p34.addEventListener('click', () => {
                const p1Numbs = [0.3, 0.4, 0.5, 0.6, "💩"];
                function createArrayForP1() {
                  return [0, 1, 2].map(() => p1Numbs[Math.floor(Math.random() * p1Numbs.length)]).concat("💩");
                }
                function LogRandomElementP1() {
                  const arr1 = createArrayForP1();
                  let p1chose = (arr1[Math.floor(Math.random() * arr1.length)]);
                  p34.style.backgroundImage = 'none';

                  if (p1chose == "💩") {
                    p34.innerHTML = `<span style="color: Black; font-weight:bold;">${p1chose}</span>`;

                    PopLose.style.pointerEvents = 'none';

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
                      title: "Ooh you lose"
                    });
                    playalert.innerText = 'Ooh you lose';
                    p3As.style.pointerEvents = 'none';


                  } else {
                    let points3 = points += p1chose;
                    async function P1RewardedGiven() {
                      const { data1, error1 } = await supabase.from("telusersinfo")
                        .update({ point: points3 })
                        .eq('id', a)
                    } P1RewardedGiven();

                    p34.innerHTML = `<span
                        style="color: Black; font-weight:bold;">${p1chose}</span>
                      <i><svg id="Pointp" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                          class="bi bii bi-coin" viewBox="0 0 16 16">
                          <path
                            d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                        </svg></i>`;
                    playalert.innerText = `Claim`;
                    document.getElementById('bginputs').style.backgroundColor = 'greenyellow';
                    popdivscon1.className = 'PoopDivCon1Off';
                    xdivs1.className = 'XDivOff';
                    popdivscon3.className = 'PoopDivConOff';
                    xdivs1.className = 'XDivOff';
                    xdivs3.className = 'XDivOff';
                    popdivscon2.className = 'PoopDivConOff';
                    xdivs2.className = 'XDivOff';
                    popdivscon4.className = 'PoopDivConOff';
                    xdivs4.className = 'XDivOff';
                    p3As.style.pointerEvents = 'none';
                    popdivscon1.className = 'PoopDivCon1';
                    xdivs1.className = 'XDiv';
                    popdivscon1.style.pointerEvents = 'all';
                    document.getElementById('popdivscon2').style.zIndex = '7';




                    console.log("you win");







                  }
                } LogRandomElementP1();
                console.log("p34");
              })
            }
          }

        });

      };



      if (adon == true) {

        const adController = window.tads.init({
          widgetId: 599,
          type: 'static',
          debug: false, // Use 'true' for development and 'false' for production
          onClickReward: onClickRewardCallback,
          onAdsNotFound: adsNotFoundCallback
        });
        adController.loadAd()
          .then(() => adController.showAd())
          .catch((err) => {
            alert(err);
            adsNotFoundCallback();
          });
      }

    });

    playalert.addEventListener('click', () => {
      window.location.reload();
    })











    // Neon Crash Mini Game
    // --- Canvas and UI Setup ---
    const canvas = document.getElementById('crashCanvas');
    const ctx = canvas.getContext('2d');
    const multiplierDisplay = document.getElementById('multiplierDisplay');
    const betButton = document.getElementById('betButton');
    const demoButton = document.getElementById('demoButton');
    const cashOutButton = document.getElementById('cashOutButton');
    const messageDisplay = document.getElementById('message');
    const crashContainer = document.querySelector('.crash-container');

    const CANVAS_WIDTH = 300;
    const CANVAS_HEIGHT = 200;

    // Adjust canvas size for mobile responsiveness
    function resizeCanvas() {
      const containerWidth = crashContainer.clientWidth - 40; // Subtract padding
      canvas.width = containerWidth;
      canvas.height = containerWidth * (2 / 3); // Maintain 3:2 aspect ratio
      drawGraph();
    }
    window.addEventListener('resize', resizeCanvas);

    // --- Game Constants and Variables ---
    const START_COLOR = '#00ff80';
    const RISING_COLOR = '#00ffff';
    const CRASH_COLOR = '#ff004c';
    const WARNING_ORANGE = '#ff9900';
    const BG_GRID_COLOR = '#222';
    const NEON_BET_YELLOW = '#ffcc00';

    const WARNING_THRESHOLD = 0.35;
    const FINAL_MAX_CRASH = 3.00;

    const NEON_PULSE_COLORS = ['#e000ff', '#0099ff', RISING_COLOR, START_COLOR, NEON_BET_YELLOW];
    const DEFAULT_DISPLAY_COLOR = 'white';
    const DEFAULT_DISPLAY_SHADOW = '0 0 10px #00ff80';

    let gameState = 'waiting';
    let currentMultiplier = 0.00;
    let crashPoint = 0;
    let betPlaced = false;
    let isDemoMode = false;
    let cashedOut = false;
    let animationFrameId = null;
    let startTime = 0;

    let graphPoints = [];
    let scaleFactor = 1.0;
    let isFlashing = false;
    let breathingBlur = 10;
    let cashOutPoint = null;
    let pulsingIntervalId = null;
    let colorCycleIntervalId = null;
    let pulseColor = '';
    let colorIndex = 0;
    let brightnessPhase = 0;

    // --- Main Functions ---

    /**
     * New function: Transition to pending_start state after ad completion.
     * (Call this function in the successful ad completion callback from your Ad SDK)
     */

    function onAdCompleted2() {
      // Hide initial buttons
      betButton.style.display = 'none';
      demoButton.style.display = 'none';

      // Show the Claim/CashOut button as the final START button
      cashOutButton.style.display = 'block';
      cashOutButton.textContent = 'START';
      cashOutButton.classList.remove('delay-disabled');
      cashOutButton.classList.remove('loading-ad'); // Remove loading state
      cashOutButton.disabled = false;

      messageDisplay.textContent = 'Ready for takeoff. Click START!';
      messageDisplay.style.color = NEON_BET_YELLOW;

      gameState = 'pending_start';
    }
    function onAdCompleted2() {
      // Hide initial buttons
      betButton.style.display = 'none';
      demoButton.style.display = 'none';

      // Show the Claim/CashOut button as the final START button
      cashOutButton.style.display = 'block';
      cashOutButton.textContent = 'START';
      cashOutButton.classList.remove('delay-disabled');
      cashOutButton.classList.remove('loading-ad'); // Remove loading state
      cashOutButton.disabled = false;

      messageDisplay.textContent = 'Ready for takeoff. Click START!';
      messageDisplay.style.color = NEON_BET_YELLOW;

      gameState = 'pending_start';
    }

    /**
     * Ad display simulation function (2 seconds).
     * In a real application, you would remove this and replace it with your Ad SDK logic.
     */
    function simulateAd() {
      messageDisplay.textContent = 'Loading The Game ...';
      messageDisplay.style.color = 'var(--ad-loading)';

      betButton.classList.add('loading-ad');
      betButton.textContent = 'Loading Ad...';
      betButton.disabled = true;
      demoButton.disabled = true;

      setTimeout(() => {
        betButton.classList.remove('loading-ad');
        // Call onAdCompleted after successful ad display
        onAdCompleted2();
      }, 7000);
    }

    function startRound() {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      stopPulsingEffect();
      startPulsingEffect(null, 'waiting');

      // Determine random crash point
      const R = Math.max(0.001, Math.random());
      let rawCrash;
      if (R < 0.6) {
        rawCrash = 1.50 + Math.random() * 1.0;
      } else {
        rawCrash = 2.50 + Math.random() * 1.5;
      }
      crashPoint = Math.min(rawCrash, FINAL_MAX_CRASH);
      crashPoint = parseFloat(crashPoint.toFixed(2));


      currentMultiplier = 0.00;
      betPlaced = false;
      isDemoMode = false;
      cashedOut = false;
      gameState = 'betting';
      startTime = 0;
      scaleFactor = 1.0;
      isFlashing = false;
      cashOutPoint = null;
      graphPoints = [{ x: 0, y: CANVAS_HEIGHT }];

      multiplierDisplay.textContent = 'X 0.00';
      multiplierDisplay.style.color = DEFAULT_DISPLAY_COLOR;
      multiplierDisplay.style.textShadow = DEFAULT_DISPLAY_SHADOW;
      multiplierDisplay.style.transform = 'translate(0, 0)';

      messageDisplay.textContent = '';

      // Set initial buttons for selection
      betButton.disabled = false;
      betButton.textContent = 'Start Game (Ad)'; // UPDATED TEXT HERE
      betButton.classList.remove('disabled-button', 'delay-disabled', 'loading-ad');
      betButton.style.display = 'block';
      betButton.classList.add('breathing-neon');

      demoButton.disabled = false;
      demoButton.textContent = 'Demo Play (Free)';
      demoButton.classList.remove('disabled-button');
      demoButton.style.display = 'block';

      cashOutButton.style.display = 'none';
      cashOutButton.textContent = 'Claim';

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGraph();
    }

    // isDemoMode
    function startDemoRound() {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      stopPulsingEffect();
      startPulsingEffect(null, 'waiting');

      // Determine random crash point
      const R = Math.max(0.001, Math.random());
      let rawCrash;
      if (R < 0.6) {
        rawCrash = 1.50 + Math.random() * 1.0;
      } else {
        rawCrash = 2.50 + Math.random() * 1.5;
      }
      crashPoint = Math.min(rawCrash, FINAL_MAX_CRASH);
      crashPoint = parseFloat(crashPoint.toFixed(2));


      currentMultiplier = 0.00;
      betPlaced = false;
      isDemoMode = false;
      cashedOut = false;
      gameState = 'betting';
      startTime = 0;
      scaleFactor = 1.0;
      isFlashing = false;
      cashOutPoint = null;
      graphPoints = [{ x: 0, y: CANVAS_HEIGHT }];

      multiplierDisplay.textContent = 'X 0.00';
      multiplierDisplay.style.color = DEFAULT_DISPLAY_COLOR;
      multiplierDisplay.style.textShadow = DEFAULT_DISPLAY_SHADOW;
      multiplierDisplay.style.transform = 'translate(0, 0)';

      messageDisplay.textContent = '';

      // Set initial buttons for selection
      betButton.disabled = false;
      betButton.textContent = 'Start Game (Ad)'; // UPDATED TEXT HERE
      betButton.classList.remove('disabled-button', 'delay-disabled', 'loading-ad');
      betButton.style.display = 'block';
      betButton.classList.add('breathing-neon');

      demoButton.disabled = false;
      demoButton.textContent = 'Demo Play (Free)';
      demoButton.classList.remove('disabled-button');
      demoButton.style.display = 'block';

      cashOutButton.style.display = 'none';
      cashOutButton.textContent = 'Claim';

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGraph();
    }

    // Handle Claim/START button click
    function handleClaimClick() {
      if (gameState === 'pending_start' && cashOutButton.textContent.toUpperCase() === 'START') {
        beginRising();
        return;
      }


      // Normal Cash Out logic
      cashOut();
    }
    function handleClaimClick2() {
      if (gameState === 'pending_start' && cashOutButton.textContent.toUpperCase() === 'START') {
        beginRising();
        return;
      }


      // Normal Cash Out logic
      cashOut2();
    }

    function beginRising() {
      if (gameState !== 'betting' && gameState !== 'pending_start') return;

      gameState = 'rising';
      startTime = Date.now();
      messageDisplay.textContent = 'Flight started! Claim at any multiplier!';
      messageDisplay.style.color = START_COLOR;

      // Set up Claim button
      cashOutButton.style.backgroundColor = 'var(--neon-start)';
      cashOutButton.style.boxShadow = '0 0 15px var(--neon-start)';
      cashOutButton.textContent = 'Claim';
      cashOutButton.disabled = false;

      // Disable initial buttons
      betButton.classList.add('disabled-button');
      betButton.disabled = true;
      demoButton.classList.add('disabled-button');
      demoButton.disabled = true;

      cashOutButton.style.display = 'block';

      stopPulsingEffect();
      animate();
    }
    function beginRising2() {
      if (gameState !== 'betting' && gameState !== 'pending_start') return;

      gameState = 'rising';
      startTime = Date.now();
      messageDisplay.textContent = 'Flight started! Claim at any multiplier!';
      messageDisplay.style.color = START_COLOR;

      // Set up Claim button
      cashOutButton.style.backgroundColor = 'var(--neon-start)';
      cashOutButton.style.boxShadow = '0 0 15px var(--neon-start)';
      cashOutButton.textContent = 'Claim';
      cashOutButton.disabled = false;

      // Disable initial buttons
      betButton.classList.add('disabled-button');
      betButton.disabled = true;
      demoButton.classList.add('disabled-button');
      demoButton.disabled = true;

      cashOutButton.style.display = 'block';

      stopPulsingEffect();
      animate();
    }

    function activateResetButtonAfterDelay() {
      // Show the restart button
      betButton.style.display = 'block';
      betButton.textContent = 'Restart Round';

      // Apply disabled/gray state for one second
      betButton.classList.add('delay-disabled');
      betButton.classList.remove('disabled-button');
      betButton.disabled = true;

      setTimeout(() => {
        // Re-enable the button
        betButton.classList.remove('delay-disabled');
        betButton.disabled = false;
        betButton.classList.add('breathing-neon');
      }, 1000);
    }


    function cashOut() {


      if (gameState !== 'rising' || cashedOut) return;

      if (currentMultiplier <= 0.00) {
        messageDisplay.textContent = '⚠️ Wait! Multiplier must be above 0.00.';
        messageDisplay.style.color = CRASH_COLOR;
        return;
      }
      cashedOut = true;

      // Record the exact Cash Out point on the graph
      cashOutPoint = graphPoints[graphPoints.length - 1];

      const cashOutMultiplier = currentMultiplier.toFixed(2);


      messageDisplay.textContent = ` 🎉 CLAIMED at X${cashOutMultiplier} 🎉`;

      async function NeonPointsUpdate() {
        let { data: telusersinfo, error } = await supabase
          .from('telusersinfo')
          .select('*')
          .eq('id', a)
          .single();

        let userpointforCrash = telusersinfo.point;

        let SumPoints = Number(cashOutMultiplier) + Number(userpointforCrash);
        const SumPoints2 = SumPoints.toFixed(2);




        const { data1, error1 } = await supabase.from("telusersinfo")
          .update({ point: SumPoints })
          .eq('id', a)


      } NeonPointsUpdate();



      messageDisplay.style.color = START_COLOR;

      // Visually disable the Claim button
      cashOutButton.disabled = true;
      cashOutButton.style.backgroundColor = '#222';
      cashOutButton.style.boxShadow = 'none';
      cashOutButton.textContent = `PAID X${cashOutMultiplier}`;
    }


    function cashOut2() {


      if (gameState !== 'rising' || cashedOut) return;

      if (currentMultiplier <= 0.00) {
        messageDisplay.textContent = '⚠️ Wait! Multiplier must be above 0.00.';
        messageDisplay.style.color = CRASH_COLOR;
        return;
      }
      cashedOut = true;

      // Record the exact Cash Out point on the graph
      cashOutPoint = graphPoints[graphPoints.length - 1];

      const cashOutMultiplier = currentMultiplier.toFixed(2);


      messageDisplay.textContent = ` 🎉 DEMO CLAIMED at X${cashOutMultiplier}. !No coins won!`;



      messageDisplay.style.color = START_COLOR;

      // Visually disable the Claim button
      cashOutButton.disabled = true;
      cashOutButton.style.backgroundColor = '#222';
      cashOutButton.style.boxShadow = 'none';
      cashOutButton.textContent = `PAID X${cashOutMultiplier}`;
    }

    function endRound(isManualCashOut) {
      cancelAnimationFrame(animationFrameId);
      gameState = 'crashed';
      isFlashing = false;

      multiplierDisplay.style.transform = 'translate(0, 0)';

      if (!cashedOut) {
        multiplierDisplay.textContent = `X ${crashPoint.toFixed(2)}`;
        multiplierDisplay.style.color = CRASH_COLOR;
        console.log(crashPoint.toFixed(2));




        if (isDemoMode) {
          messageDisplay.textContent = ` 💥 Demo CRASHED at X${crashPoint.toFixed(2)}. Start a new round!`;
          messageDisplay.style.color = WARNING_ORANGE;
        }

        // Crash explosion effect
        if (graphPoints.length > 0) {
          const finalPoint = graphPoints[graphPoints.length - 1];
          ctx.fillStyle = CRASH_COLOR;

          for (let r = 0; r < 50; r += 10) {
            ctx.globalAlpha = 1 - (r / 50);
            ctx.beginPath();
            const explosionX = finalPoint.x / scaleFactor;
            const explosionY = finalPoint.y / scaleFactor;
            ctx.arc(explosionX, explosionY, r / scaleFactor, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.globalAlpha = 1.0;
        }
      }

      cashOutButton.style.display = 'none';
      demoButton.style.display = 'none';

      const pulseColor = (cashedOut) ? START_COLOR : CRASH_COLOR;
      startPulsingEffect(pulseColor, 'result');

      activateResetButtonAfterDelay();
    }

    // --- Core Animation Function ---
    function animate() {
      if (gameState !== 'rising') return;

      const now = Date.now();
      const elapsedTime = (now - startTime) / 1000;

      // Multiplier calculation logic (based on elapsed time)
      breathingBlur = 10 + Math.sin(now / 200) * 3;
      const C = 0.05;
      const T_POWER = 1.2;
      const effectiveTime = Math.pow(elapsedTime, T_POWER);
      let baseMultiplier = (Math.expm1(effectiveTime * C) * 3);

      const DIP_AMPLITUDE = 0.10;
      const sinePhase = (baseMultiplier / 0.5) * Math.PI;
      const sineWave = Math.sin(sinePhase);
      let dipValue = (baseMultiplier > 0.10) ? (sineWave * DIP_AMPLITUDE * Math.min(1.0, baseMultiplier / 2.0)) : 0;

      currentMultiplier = Math.floor((baseMultiplier + dipValue) * 100) / 100;
      currentMultiplier = Math.max(0.00, currentMultiplier);

      const distanceToCrash = crashPoint - currentMultiplier;

      // --- Crash Warning Section ---
      // If the multiplier is within 0.35 of the crash point, start flashing
      if (distanceToCrash <= WARNING_THRESHOLD && distanceToCrash > 0.01 && !cashedOut) {
        isFlashing = true;
        if (Math.floor(now / 150) % 2 === 0) {
          cashOutButton.style.backgroundColor = CRASH_COLOR;
          cashOutButton.style.boxShadow = ` 0 0 15px ${CRASH_COLOR}`;
        } else {
          cashOutButton.style.backgroundColor = WARNING_ORANGE;
          cashOutButton.style.boxShadow = ` 0 0 15px ${WARNING_ORANGE}`;
        }
        messageDisplay.textContent = '🚨 CRASH Danger! Claim quickly! 🚨';
        messageDisplay.style.color = WARNING_ORANGE;
        messageDisplay.textShadow = ` 0 0 5px ${CRASH_COLOR}`;
      } else if (!cashedOut) {
        isFlashing = false;
        cashOutButton.style.backgroundColor = 'var(--neon-start)';
        cashOutButton.style.boxShadow = '0 0 15px var(--neon-start)';
        messageDisplay.textContent = 'Flight started! Claim at any multiplier!';
        messageDisplay.style.color = 'var(--neon-start)';
        messageDisplay.textShadow = '0 0 5px var(--neon-start)';
      }

      // --- Multiplier Jitter and Color ---
      if (currentMultiplier > 1.5) {
        const jitter = Math.min(5, (currentMultiplier - 1.0) * 0.5);
        const randomX = (Math.random() - 0.5) * jitter;
        const randomY = (Math.random() - 0.5) * jitter;
        multiplierDisplay.style.transform = ` translate(${randomX}px, ${randomY}px)`;

        const hue = 120 - Math.min(120, currentMultiplier * 10);
        multiplierDisplay.style.color = ` hsl(${hue}, 100%, 70%)`;
        multiplierDisplay.style.textShadow = ` 0 0 ${Math.min(20, currentMultiplier * 3)}px hsl(${hue}, 100%, 50%)`;
      } else {
        multiplierDisplay.style.transform = `translate(0, 0)`;
        multiplierDisplay.style.color = DEFAULT_DISPLAY_COLOR;
        multiplierDisplay.style.textShadow = DEFAULT_DISPLAY_SHADOW;
      }

      // Scaling logic and record new point
      const X_PACE = canvas.width / 10;
      const X_LIMIT_PERCENTAGE = 0.85;

      const totalX = elapsedTime * X_PACE * 1.5;
      const newY = getGraphY(currentMultiplier);

      const maxX = totalX;
      const maxY = canvas.height - newY;

      const MAX_ALLOWED_X = canvas.width * X_LIMIT_PERCENTAGE;

      let requiredScaleX = MAX_ALLOWED_X / maxX;
      let requiredScaleY = canvas.height / maxY;

      scaleFactor = Math.min(1.0, requiredScaleX, requiredScaleY);
      if (scaleFactor < 0.01) scaleFactor = 0.01;

      graphPoints.push({ x: totalX, y: newY });

      drawGraph();

      multiplierDisplay.textContent = `X ${currentMultiplier.toFixed(2)}`;

      // Update Claim button text
      if (!cashedOut && cashOutButton.textContent.toUpperCase() !== 'START') {
        cashOutButton.textContent = isDemoMode ? `Claim (Demo - X${currentMultiplier.toFixed(2)})` : `Claim (X${currentMultiplier.toFixed(2)})`;
      }

      if (currentMultiplier >= crashPoint) {
        endRound(false);
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    // --- Canvas Helper Functions ---

    const getGraphY = (multiplier) => {
      const adjustedMultiplier = Math.max(1.01, multiplier + 1.0);
      const yOffset = (Math.log10(adjustedMultiplier) * 60);
      return canvas.height - Math.min(yOffset * 2.5, canvas.height);
    };

    function drawGraph() {
      ctx.fillStyle = 'rgba(17, 17, 17, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(0, canvas.height);
      ctx.scale(scaleFactor, scaleFactor);
      ctx.translate(0, -canvas.height);

      ctx.strokeStyle = BG_GRID_COLOR;
      ctx.lineWidth = 1 / scaleFactor;

      const horizontalStep = 40;
      const verticalStep = 30;

      const maxGridX = canvas.width / scaleFactor;
      const maxGridY = canvas.height / scaleFactor;

      // Draw grid lines
      for (let y = -horizontalStep * 2; y <= maxGridY + horizontalStep * 2; y += horizontalStep) {
        ctx.beginPath();
        ctx.moveTo(-verticalStep * 2, y);
        ctx.lineTo(maxGridX + verticalStep * 2, y);
        ctx.stroke();
      }
      for (let x = -verticalStep * 2; x <= maxGridX + verticalStep * 2; x += verticalStep) {
        ctx.beginPath();
        ctx.moveTo(x, -horizontalStep * 2);
        ctx.lineTo(x, maxGridY + horizontalStep * 2);
        ctx.stroke();
      }

      if (graphPoints.length < 2) {
        ctx.fillStyle = START_COLOR;
        ctx.beginPath();
        ctx.arc(0, canvas.height, 4 / scaleFactor, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return;
      }

      // Draw graph line
      let lineColor = RISING_COLOR;
      let shadowBlur = breathingBlur;

      if (isFlashing) {
        lineColor = (Math.floor(Date.now() / 100) % 2 === 0) ? CRASH_COLOR : WARNING_ORANGE;
        shadowBlur = 15;
      }

      ctx.strokeStyle = lineColor;
      ctx.shadowColor = lineColor;
      ctx.shadowBlur = shadowBlur / scaleFactor;
      ctx.lineWidth = 3 / scaleFactor;

      ctx.beginPath();
      ctx.moveTo(graphPoints[0].x, graphPoints[0].y);

      for (let i = 1; i < graphPoints.length; i++) {
        ctx.lineTo(graphPoints[i].x, graphPoints[i].y);
      }

      ctx.stroke();

      // Draw current point (tip of the graph)
      const lastPoint = graphPoints[graphPoints.length - 1];
      ctx.fillStyle = lineColor;
      ctx.beginPath();
      ctx.arc(lastPoint.x, lastPoint.y, 4 / scaleFactor, 0, Math.PI * 2);
      ctx.fill();

      // Draw Cashout Point marker
      if (cashOutPoint) {
        ctx.shadowBlur = 10 / scaleFactor;
        ctx.shadowColor = START_COLOR;
        ctx.fillStyle = START_COLOR;

        ctx.beginPath();
        const cashoutX = cashOutPoint.x;
        const cashoutY = cashOutPoint.y;
        ctx.arc(cashoutX, cashoutY, 6 / scaleFactor, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(cashoutX, cashoutY, 2 / scaleFactor, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.restore();
    }

    // --- Pulse Effect Functions ---
    function startPulsingEffect(color, mode = 'result') {
      stopPulsingEffect();
      pulseColor = color;
      brightnessPhase = 0;

      if (mode === 'waiting') {
        colorIndex = 0;
        colorCycleIntervalId = setInterval(() => {
          colorIndex = (colorIndex + 1) % NEON_PULSE_COLORS.length;
          crashContainer.style.borderColor = NEON_PULSE_COLORS[colorIndex];
        }, 500);
      }

      pulsingIntervalId = setInterval(() => {

        brightnessPhase += 0.1;
        const shadowStrength = 10 + Math.sin(brightnessPhase) * 5;

        let currentEffectColor = pulseColor;

        if (mode === 'waiting') {
          currentEffectColor = NEON_PULSE_COLORS[colorIndex];

          multiplierDisplay.style.color = DEFAULT_DISPLAY_COLOR;
          multiplierDisplay.style.textShadow = DEFAULT_DISPLAY_SHADOW;
        } else {
          multiplierDisplay.style.color = currentEffectColor;
          multiplierDisplay.style.textShadow = ` 0 0 ${10 + Math.sin(brightnessPhase) * 3}px ${currentEffectColor}`;
        }

        crashContainer.style.boxShadow = `0 0 ${25 + shadowStrength}px ${currentEffectColor}`;

      }, 100);
    }

    function stopPulsingEffect() {
      if (pulsingIntervalId) {
        clearInterval(pulsingIntervalId);
        pulsingIntervalId = null;
      }
      if (colorCycleIntervalId) {
        clearInterval(colorCycleIntervalId);
        colorCycleIntervalId = null;
      }
      crashContainer.style.boxShadow = '0 0 25px var(--neon-bet)';
      crashContainer.style.borderColor = 'var(--neon-bet)';
    }

    function handleBetStart(isDemo) {

      messageDisplay.style.display = 'all';
      messageDisplay.textContent = '👇 Click the ad to start 👇';

      if (betButton.textContent == "Start Game (Ad)") {
        document.getElementById('tads-container-894').style.display = "flex";
        betButton.style.pointerEvents = "none";
        const adsNotFoundCallback = () => {
          document.getElementById('tads-container-894').style.display = "none";
          // messageDisplay.textContent = 'Please try again a few minutes later or change your IP to 🇩🇪,🇬🇧 or 🇺🇲';
          




          // --------------------------FreePay Ads Loading
          const AdPageLoading = document.getElementById('FreePayLoadingAds');
          AdPageLoading.style.display = 'Flex';
          async function FreePayAds() {

            // -----------------Onclick on FreePay Ads
            function OnClickRewardFreePay() {
              AdPageLoading.style.display = 'none';

              betButton.style.pointerEvents = "all";

              cashOutButton.style.backgroundColor = 'aqua';

              // Initial selection logic
              if (gameState === 'betting' || gameState === 'waiting') {

                betPlaced = !isDemo;
                isDemoMode = isDemo;

                betButton.classList.remove('breathing-neon');

                if (isDemo) {
                  //     //   // Demo Mode: Immediate start
                  demoButton.textContent = `Round in progress...`;
                  betButton.style.display = 'none';
                  beginRising();

                } else {
                  //     // Ad/Real Mode: Start ad process
                  simulateAd();
                }
              } else if (gameState === 'crashed' || gameState === 'cashedOut') {
                //   startRound();
              }


            };

            let { data: adsinfo, error1 } = await supabase
              .from('advertisingtable')
              .select('id')
              .eq("Mode", "On")




            let { data: AdViewer, error } = await supabase
              .from('AdViewer')
              .select('AdId')
              .eq("LastViewer", a)

            // console.log(adsinfo);
            // console.log(AdViewer);



            // Del Ads On AdsTable for last Viewer
            const AllAds = adsinfo;
            const AdViewed = AdViewer;
            const AdsShowded = AdViewed.map(item => item.AdId);
            const AdsOkToShow = AllAds.filter(item => !AdsShowded.includes(item.id));
            const AdReady = AdsOkToShow[0];

            if (!AdReady) {
              // console.log('Ads Cant Found');
              betButton.style.pointerEvents = "all";

              AdPageLoading.innerHTML = `
                <div style="display: flex;flex-direction: row;align-items: center;width: 90%;border-radius: 0.5rem;">
                  <div  style="display: flex;flex-direction: column;width: 100%;height: auto;">
                  <p class="LoadingAdP" id="LinkName2" style="Font-Size:large" >Please turn back later</p>  
                  </div>
                </div>
                <p class="LoadingAdPGolden" style="background-color: #fff;padding: 0.5rem;border-radius: 0.5rem;">Ads By FreePay</p>
              `;
              setTimeout(() => {
                AdPageLoading.style.display = 'none';
              }, 3000)

            } else if (AdReady) {
              const ADNumberId = AdReady.id;

              async function AdsLoading() {
                let { data: AdsLoading, error3 } = await supabase
                  .from('advertisingtable')
                  .select('*')
                  .eq("id", ADNumberId)
                  .single();
                // console.log(AdsLoading);

                const ADInfo = AdsLoading;

                AdPageLoading.innerHTML = `
                <div style="display: flex;flex-direction: row;align-items: center;background-color: black;width: 90%;border-radius: 0.5rem;">
                  <img style="width: 5.5rem;height: 5.5rem;border-radius: 0.5rem 0rem 0rem 0.5rem;" src="https://nomuylulsjtwjoinrxmr.supabase.co/storage/v1/object/sign/picsbucketshop/Adsicon.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YTYzZmZiNS02NDZkLTRlYzAtOTJmMC02YWFlZTE2MmNkOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaWNzYnVja2V0c2hvcC9BZHNpY29uLmpwZyIsImlhdCI6MTc2MzY1NjIxMiwiZXhwIjozMTU1MzMyMTIwMjEyfQ.d9p74qgt6g6zyX2OygemieMz2sRW_SEkJqV7cG15I70" alt="">
                  <div  style="display: flex;flex-direction: column;background-color: black;width: 100%;height: auto;">
                    <p class="LoadingAdP" id="LinkName" >${ADInfo.channelname}</p>
                    <button id="OpenAdLink" style="color:white; background-color: #EE00ff;width: 100%;height: 2.5rem;">Click Now</button>
                  </div>
                </div>
                <p class="LoadingAdPGolden" style="background-color: #fff;padding: 0.5rem;border-radius: 0.5rem;">Ads By FreePay</p>
              `;
                const ChannelAmountPluser = AdsLoading.channelamount += 1;
                const ChannelMaxAmount = AdsLoading.channelamountmaxamount;

                // console.log(ChannelAmountPluser);


                document.getElementById('OpenAdLink').onclick = function () {
                  async function ClickedOnAd() {

                    const { data, error } = await supabase
                      .from('AdViewer')
                      .insert([
                        {
                          ChannelName: ADInfo.channelname,
                          ChannelLink: ADInfo.channellink,
                          LastViewer: a,
                          AdId: AdReady.id

                        },
                      ])





                    document.getElementById("OpenAdLink").style.pointerEvents = "none";
                    if (ChannelMaxAmount == ChannelAmountPluser) {


                      const { data, error } = await supabase
                        .from('advertisingtable')
                        .update({ channelamount: ChannelAmountPluser, Mode: 'Off' })
                        .eq('id', ADNumberId)
                        .select();

                    } else if (ChannelMaxAmount > ChannelAmountPluser) {

                      const { data, error } = await supabase
                        .from('advertisingtable')
                        .update({ channelamount: ChannelAmountPluser, })
                        .eq('id', ADNumberId)
                        .select();
                    }
                    window.open(ADInfo.channellink, "_blank");



                  } ClickedOnAd().then(() => {
                    setTimeout(() => {
                      OnClickRewardFreePay();





                    }, 5000)
                  })

                };




              } AdsLoading();

            }





            // console.log(NotShoedAdId);
            // const OnModeAds = adsinfo.find(item => item.Mode === 'On');
            // console.log(OnModeAds);
            // document.getElementById('tads-container-894').innerHTML="<p>hii</p>";
            // document.getElementById("LinkName").innerText = `${OnModeAds.channelname}`;


            // document.getElementById("OpenAdLink").onclick = function () {
            // const adUrl = OnModeAds.channellink;
            // function LinkLoad() {
            //   window.open(adUrl, "_blank");

            // } LinkLoad().then(console.log("lll"));
            // };
          } FreePayAds();

          // Write your code here in case we couldn't display ad
        };

        // Callback for REWARDED format
        const onClickRewardCallback = (adId) => {
          document.getElementById('tads-container-894').style.display = "none";
          betButton.style.pointerEvents = "all";

          cashOutButton.style.backgroundColor = 'aqua';

          // Initial selection logic
          if (gameState === 'betting' || gameState === 'waiting') {

            betPlaced = !isDemo;
            isDemoMode = isDemo;

            betButton.classList.remove('breathing-neon');

            if (isDemo) {
              //     //   // Demo Mode: Immediate start
              demoButton.textContent = `Round in progress...`;
              betButton.style.display = 'none';
              beginRising();

            } else {
              //     // Ad/Real Mode: Start ad process
              simulateAd();
            }
          } else if (gameState === 'crashed' || gameState === 'cashedOut') {
            //   startRound();
          }
        };

        const adController = window.tads.init({
          widgetId: 894,
          type: 'static',
          debug: false, // Use 'true' for development and 'false' for production
          onClickReward: onClickRewardCallback,
          onAdsNotFound: adsNotFoundCallback
        });
        adController.loadAd()
          .then(() => adController.showAd())
          .catch((err) => {
            alert(err);
            adsNotFoundCallback();
          });


      }
      // If the button is a restart button, restart the round
      if (betButton.textContent === 'Restart Round' && !isDemo) {
        if (!betButton.disabled) {
          startRound();
        }
        return;
      }




      cashOutButton.onclick = function () {

        handleClaimClick();
      };
    }
    function handleDemoStart() {

      messageDisplay.style.display = 'all';
      cashOutButton.style.backgroundColor = "silver";
      messageDisplay.textContent = ` 💥 CRASHED at X${crashPoint.toFixed(2)}. No coins won.`;
      messageDisplay.style.color = CRASH_COLOR;
      // messageDisplay.textContent = "Demo Mode!!";



      // cashOutButton.style.backgroundColor = 'aqua';

      // Initial selection logic
      // if (gameState === 'betting' || gameState === 'waiting') {

      // betPlaced = !isDemo;
      // isDemoMode = isDemo;

      // betButton.classList.remove('breathing-neon');


      // Ad/Real Mode: Start ad process
      // messageDisplay.textContent = 'Loading The Game ...';
      // messageDisplay.style.color = 'var(--ad-loading)';

      betButton.style.display = 'none';
      betButton.disabled = true;
      demoButton.disabled = true;

      // setTimeout(() => {
      betButton.classList.remove('loading-ad');
      // Call onAdCompleted after successful ad display
      // onAdCompleted2();
      beginRising2();

      cashOutButton.onclick = function () {

        handleClaimClick2();
      };




    }



    // --- Event Listeners ---
    function setupEventListeners() {
      betButton.onclick = function () { handleBetStart() };
      demoButton.onclick = function () { handleDemoStart() };


    };

    function OnloadNeonClash() {
      resizeCanvas(); // Initial canvas size setup
      startRound();
      setupEventListeners();
    } OnloadNeonClash();

    document.getElementById('ComBackHomeNeon').addEventListener('click', () => {
      document.getElementById('NoeonPage').style.display = 'none';
    });
  } userifoo();
  // --- Initial Start ---
} telebot();












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
// ....Go BAck to Homee
document.getElementById('ComBackHome').addEventListener("click", () => {
  document.getElementById('earnsec322').style.display = 'none';
})
// PooP Main Go......
document.getElementById('PooPGameShow').addEventListener("click", () => {
  document.getElementById('earnsec322').style.display = 'flex';
})
// Neon Crash
document.getElementById('CrashId').addEventListener("click", () => {
  document.getElementById('NoeonPage').style.display = 'flex';
});

function sendEmail() {
  document.getElementById('RefPage').style.display = 'flex';
};

document.getElementById('ReffCodeInfo').addEventListener('click', () => {
  document.getElementById('RefPage4').style.display = 'flex';
});
document.getElementById('BackFer4').addEventListener('click', () => {
  document.getElementById('RefPage4').style.display = 'none';
});

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

document.getElementById('Noshopbtn').onclick = function () {
  document.getElementById('FormSec').className = 'formHiden';
};
document.getElementById('Noshopbtn2').onclick = function () {
  document.getElementById('FormSec2').className = 'formHiden';
};





















