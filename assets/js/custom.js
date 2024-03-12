  const lenis = new Lenis()

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0);

  /* header */
  
  /* ------------------------------------- */
  let scrollFlag = false;
  let lastScroll = 0;
  $(window).scroll(function(){
    let curr = $(this).scrollTop();
    if (curr >= 200) {
      $('.header').addClass('active')
      $('.btn-top').show();
    } else {
      $('.header').removeClass('active')
    }
    curr < 300 ? $('.btn-top').removeClass('on') : $('.btn-top').addClass('on');

    lastScroll = curr;
  })

  $(window).trigger('scroll');

  /* header start ----------------------------- */
  // pc header
  $('.menu-item').hover(function(){
    if ($('.sub').length > 0) {

      if (window.innerWidth < 1400) return;
      
      $('.header').addClass('active').css('--height', '310px');
      $('.sub').delay(2000).show();
      $(this).addClass('on');
      $('.banner').addClass('on');
      $('.deemd').addClass('on');
    }
  }, function(){
    if (window.innerWidth < 1400) return;

    $('.deemd').removeClass('on');
    $(this).removeClass('on');
    $('.banner').removeClass('on');
    $('.header').removeClass('active').css('--height', '0px');
    $('.sub').delay(2000).hide();
  })

  // mobile~tablet header
  $(document).on('click', '.mo-menu', function(e){
    if($(this).hasClass('on')) {
      e.preventDefault();
      
      $('.mo-menu').removeClass('on');
      $('.header').removeClass('mo');
      $('body').removeClass('hidden');
      $('.deemd').removeClass('on');
    } else {
      e.preventDefault();
      
      $('.mo-menu').addClass('on');
      $('.header').addClass('mo');
      $('body').addClass('hidden');
      $('.deemd').addClass('on');
    }
  });
  


  let $menuItem = $('.gnb .menu-item');
  let $menu = $('.gnb .menu-item a');
  $menu.click(function(e){
    if (window.innerWidth >= 1399) return;
    e.preventDefault();

    console.log('menu-item');
    // 펴져있는거 접히기
    if(this == e.target && $(this).parent().hasClass('on')) {
      $menuItem.removeClass('on');
      $(this).siblings('.sub').stop().slideUp();
      $(this).siblings('.sub').removeClass('on');
    } 
    // 접혀있는거 펴기
    else if(this == e.target && !$(this).parent().hasClass('on')) {
      if (window.innerWidth >= 1399) return;
      e.preventDefault();

      //다른거 접기
      $menuItem.removeClass('on');
      $menuItem.find('.sub').removeClass('on').stop().slideUp();
      //해당 메뉴 펼치기
      $(this).siblings('.sub').addClass('on').stop().slideDown();
      $(this).parent().addClass('on');
    }
  });


  /* header end ----------------------------- */


  /* sc-intro */
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 8,
    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 0,
      }
    },
  });


  const introVideo = $('.intro-video').get(0);
  const video = document.querySelector('#video');

  time =  video.duration;
  const barAni = gsap.to('.playing-bar',time,{
    repeat:-1,
    width:'100%',
    ease:"none",
    paused:true,
  })

  setTimeout(() => {
    introVideo.play();
    barAni.play();
  }, 300);


  $('.btn-control').on('click', function() {
    if ($(this).hasClass('play')) {
      introVideo.play();
      barAni.play();
    } else {
      introVideo.pause();
      barAni.pause();
    }

    $(this).toggleClass('play')
  });

  //intro
  const introAni = gsap.timeline();
  introAni.from("[data-motion='introText'] .text-area", 1.5, {
    autoAlpha: 0,
    yPercent: 100,
  })
  introAni.from(".intro-title > span:nth-child(1)", 1.5, {
    width: 0,
    autoAlpha: 0,
    delay: 1,
  })
  introAni.from(".intro-title > span:nth-child(2)", {
    width: 0,
    autoAlpha: 0,
  })
  

  /* sc-elevating */
  const t1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".sc-elevating",
      start: "0% 95%",
      end: "100% 100%",
      toggleActions:"play none none reset",
    },
  })
  t1.from($('.sc-elevating .swiper-slide'), 1, {
    dalay: 0.2,
    yPercent: 30, 
    autoAlpha: 0, 
    stagger: 0.1,
  })


  /* sc-solution */
  const t2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".solution-list",
      start: "0% 95%",
      end: "100% 100%",
      toggleActions:"play none none reset"
    },
  });
  t2.from($('.solution-item'), {
    yPercent: 30, 
    autoAlpha: 0, 
    stagger: 0.1,
  })

  
  /* sc-gnovia */
  gsap.set('.sc-gnovia .bg-box', {'background-position': '0% -50%'}, )

  const bgAni = gsap.timeline({
    scrollTrigger: {
      trigger: '.sc-gnovia', 
      start: "0% 100%",
      end: "100% 0%",
      scrub: 1,
    },
  })
  bgAni.to('.sc-gnovia .bg-box', {'background-position': '0% 50%', ease: "none"}, )


  /* sc-synergy */
  const synergyTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.sc-synergy', 
      start: "0% 70%",
      end: "100% 100%",
      toggleActions:"play none none reset",
    },
  })
  synergyTl.to('.sc-synergy .group-info', {
    ease: "power4.inOut",
    duration: 1.4, 
    '--width': '0%',
  })
  synergyTl.from('.sc-synergy .number-list', {
    autoAlpha: 0,
    yPercent: 10,
  }, 'a')


  const $countWrap = $('.sc-synergy').find('.digit');
  const count = [0,1,2,3,4,5,6,7,8,9];  
  let listHeight = $countWrap.outerHeight(); //100, 70, 58, 48
  // console.log(`listHeight: ${listHeight}`);

  $countWrap.each(function(idx, target){

    let ypx;
    if (window.innerWidth <= 768) {
      yPx = 56;
    } else if (window.innerWidth <= 1024) {
      yPx = 48;
    } else if (window.innerWidth <= 1400) {
      yPx = 70;
    } else {
      yPx = 100;
    }

    // currentCount: 보여줄 숫자
    // direction: 방향
    let currentCount = $(target).data('current');
    let direction = $(target).data('direction');

    if (direction == 'down') {
      html = '<ul>';
      for (let i=count.length-1; i > -1; i--) {
        html += '<li data-count="'+i+'">'+count[i]+'</li>';
      }
      $(this).html(html);
      html += '</ul>';

      const $transformWrap = $(this).find('ul'); // digit > ul
      const listLength = $(this).find("li").length; // 10

      synergyTl.fromTo($transformWrap, {
        y: -( (listLength-1) * listHeight ), // 9 * 100
      },
      {
        // current에 해당하는 요소까지 높이 구하기
        // 0은 -900, 1은 -800, 2는 -700, 3은 -600... 9는 -0
        // -( (x) -1) * 100 ) 
        // y:-( ( (listLength-1) - (count.length) - currentCount ) * listHeight ),
        y:-( ( (listLength-1) - currentCount ) * listHeight ),
        duration: 1.5,
      }, 'b')

    } else if (direction == 'up') {
      html = '<ul>';
      for (let i=0; i<count.length; i++) {
        html += '<li data-count="'+i+'">'+count[i]+'</li>';
      }
      $(this).html(html);
      html += '</ul>';

      const $transformWrap = $(this).find('ul'); // digit > ul
      const listLength = $(this).find("li").length;
      
      // 0 에서 current에 해당하는 숫자 길이만큼 이동
      synergyTl.fromTo($transformWrap, {
        y: 0,
      }, 
      {
        y: -( (listLength - (count.length) + currentCount ) * listHeight ),
        duration: 1.5,
      }, 'b')
    }
    
  })


  /* sc-project */
  const pSwiper = new Swiper('.p-Swiper', {
    spaceBetween: 8,
    slidesPerView: "auto",
    observer: true,
    observeParents: true,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".btn-next",
      prevEl: ".btn-prev",
    },
    breakpoints: {
      1024: {
        spaceBetween: 56,
      },
    },
  });

  ScrollTrigger.create({
    trigger: '.sc-project', 
    start: "0% 80%",
    end: "100% 100%",
    onEnter: function(){
      gsap.from('.sc-project .p-Swiper .swiper-slide', 1, {
        xPercent: 200,
        opacity: 0
      })
    }, 
  });


  /* text효과 */
  $("[data-motion='text']").each(function(i, el){
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: $(el),
        scrub: true,
        start: "0% 95%",
        end: "100% 100%",
        scrub: 1,
        onEnter: function(){
          $(el).addClass('on');
        },
        onLeaveBack: function(){
          $(el).removeClass('on');
        }
      },
    })
  })


  $(window).resize(function() {
    if ($(window).width() < 768) {
      document.location.reload();
    } else if ($(window).width() < 1024) {
      document.location.reload();
    } else if ($(window).width() < 1400) {
      document.location.reload();
    }
  });