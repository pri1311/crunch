var chatMessages = [{
    name: "ms1",
    msg: "You guys watched the match yesterday?",
    delay: 10,
    align: "right",
    showTime: true,
    time: "19:58"
  },
  {
    name: "ms2",
    msg: "<strong class='c-1'>Jeremy:</strong> Yeah dude, that goal from Salah was top-class!! ⚽⚽⚽",
    delay: 600,
    align: "left",
    showTime: true,
    time: "19:58"
  },
  {
    name: "ms5",
    msg: "watch the highlights here <br> http://www.youtube.com/Ysn83bd",
    delay: 700,
    align: "right",
    showTime: true,
    time: "19:58"
  },
  {
    name: "ms7",
    msg: "<strong class='c-3'>Melissa:</strong> eh please. all your teams doing better cuz the club has money to buy players. Chelsea’s transfer ban has been lifted OK.",
    delay: 1200,
    align: "left",
    showTime: false,
    time: "19:58"
  },
  {
    name: "ms9",
    msg: "<strong class='c-1'>Jeremy: </strong>We'll see! 💪",
    delay: 1200,
    align: "left",
    showTime: true,
    time: "19:58"
  },
  {
    name: "ms10",
    msg: "<img src='https://images.unsplash.com/photo-1469598614039-ccfeb0a21111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=60' class='c-img-responsive'>",
    delay: 1200,
    align: "right",
    showTime: true,
    time: "19:58"
  },
  {
    name: "ms12",
    msg: "<strong class='c-2'>Suresh: </strong>We'll WILL see!",
    delay: 500,
    align: "left",
    showTime: true,
    time: "19:58"
  }
  ];
  
  var chatDelay = 0;
  
  function onRowAdded() {
    $('.chat-container').animate({
      scrollTop: $('.chat-container').prop('scrollHeight')
    });
  };
  
  var scroll = true;
  
  $(window).load(function(){
      for (var i = 0; i < 20; i++){
        $.each(chatMessages, function(index, obj) {
            chatDelay = chatDelay + 1000;
            chatDelay2 = chatDelay + obj.delay;
            chatDelay3 = chatDelay2 + 10;
            scrollDelay = chatDelay;
            chatTimeString = " ";
            msgname = "." + obj.name;
            msginner = ".messageinner-" + obj.name;
            spinner = ".sp-" + obj.name;
            if (obj.showTime == true) {
              chatTimeString = "<span class='message-time'>" + obj.time + "</span>";
            }
      
            $(".chat-message-list").append("<li class='message-" + obj.align + " " + obj.name + "' hidden><div class='sp-" + obj.name + "'><span class='spinme-" + obj.align + "'><div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></span></div><div class='messageinner-" + obj.name + "' hidden><span class='message-text'>" + obj.msg + "</span>" + chatTimeString + "</div></li>");
      
            $(msgname).delay(chatDelay).fadeIn();
            $(spinner).delay(chatDelay2).hide(1);
            $(msginner).delay(chatDelay3).fadeIn();
            setTimeout(onRowAdded, chatDelay);
            setTimeout(onRowAdded, chatDelay3);
            chatDelay = chatDelay3;
          });
      }
    // if(scroll)
    // {
    //   $.each(chatMessages, function(index, obj) {
    //     chatDelay = chatDelay + 1000;
    //     chatDelay2 = chatDelay + obj.delay;
    //     chatDelay3 = chatDelay2 + 10;
    //     scrollDelay = chatDelay;
    //     chatTimeString = " ";
    //     msgname = "." + obj.name;
    //     msginner = ".messageinner-" + obj.name;
    //     spinner = ".sp-" + obj.name;
    //     if (obj.showTime == true) {
    //       chatTimeString = "<span class='message-time'>" + obj.time + "</span>";
    //     }
  
    //     $(".chat-message-list").append("<li class='message-" + obj.align + " " + obj.name + "' hidden><div class='sp-" + obj.name + "'><span class='spinme-" + obj.align + "'><div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></span></div><div class='messageinner-" + obj.name + "' hidden><span class='message-text'>" + obj.msg + "</span>" + chatTimeString + "</div></li>");
  
    //     $(msgname).delay(chatDelay).fadeIn();
    //     $(spinner).delay(chatDelay2).hide(1);
    //     $(msginner).delay(chatDelay3).fadeIn();
    //     setTimeout(onRowAdded, chatDelay);
    //     setTimeout(onRowAdded, chatDelay3);
    //     chatDelay = chatDelay3;
    //   });
    //   chatreveal();
    // }
    
    // scroll = false;
  });

  function chatreveal(){
    $.each(chatMessages, function(index, obj) {
        chatDelay = chatDelay + 1000;
        chatDelay2 = chatDelay + obj.delay;
        chatDelay3 = chatDelay2 + 10;
        scrollDelay = chatDelay;
        chatTimeString = " ";
        msgname = "." + obj.name;
        msginner = ".messageinner-" + obj.name;
        spinner = ".sp-" + obj.name;
        if (obj.showTime == true) {
          chatTimeString = "<span class='message-time'>" + obj.time + "</span>";
        }
  
        $(".chat-message-list").append("<li class='message-" + obj.align + " " + obj.name + "' hidden><div class='sp-" + obj.name + "'><span class='spinme-" + obj.align + "'><div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></span></div><div class='messageinner-" + obj.name + "' hidden><span class='message-text'>" + obj.msg + "</span>" + chatTimeString + "</div></li>");
  
        $(msgname).delay(chatDelay).fadeIn();
        $(spinner).delay(chatDelay2).hide(1);
        $(msginner).delay(chatDelay3).fadeIn();
        setTimeout(onRowAdded, chatDelay);
        setTimeout(onRowAdded, chatDelay3);
        chatDelay = chatDelay3;
      });
  }

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]')

window.addEventListener('scroll', scrollActive)

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
})

/*SCROLL HOME*/
sr.reveal('.heading', {interval: 200})
sr.reveal('.chat', {delay: 200})

/*SCROLL ABOUT*/
sr.reveal('.section-title', {delay: 200})
sr.reveal('.about-img', {delay: 500})
sr.reveal('.about__details', {delay: 800})




