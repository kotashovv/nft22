window.addEventListener('load', ()=>{


    const animItems = document.querySelectorAll('._anim-items');

    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);
        function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 4;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;

                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('_active');
                } else {
                    if (!animItem.classList.contains('_anim-no-hide')) {
                        animItem.classList.remove('_active');
                    }
                }
            }
        }
        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {
                top: rect.top + scrollTop, left: rect.left + scrollLeft
            }
        }
    }

    if (animItems.length > 0) {
        setTimeout(() => {
                animOnScroll();
            }, 500);
    }


    //парралакс эффект
    window.addEventListener('scroll', throttle(parallax, 14));

    function throttle(fn, wait) {
    var time = Date.now();
    return function() {
    if ((time + wait - Date.now()) < 0) {
        fn();
        time = Date.now();
    }
    }
    };

    function parallax() {
    var scrolled = window.pageYOffset;
    var parallax = document.querySelectorAll(".parallax");
    // You can adjust the 0.4 to change the speed
    var coords = (scrolled * -0.3) + 'px'
    if (parallax.length != 0) {
    parallax.forEach(function(item) {
        item.style.transform = 'translateY(' + coords + ')';
        })
    }
    };

    // скролл из меню
    const menuLinks = document.querySelectorAll('.link[data-goto]')
    if (menuLinks.length > 0) {
        menuLinks.forEach(menuLinks => {
            menuLinks.addEventListener('click', onMenuLinkClick);
        });

        function onMenuLinkClick(e) {
            const menuLink = e.target;
            if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
                closeMenu();
                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: 'smooth'
                });
                e.preventDefault();
            }
        }
    }

    let gallerySlider = new Swiper('.gallery__slider-wrap', { 
        loop: true,
        slidesPerView: 2,
        centeredSlides: true,
        spaceBetween: 30,
        speed: 3500,
        autoplay: {
            delay: 0,
          },
        freeMode: true,
        breakpoints: {
            767: {
                slidesPerView: 3,
            },
            1024: {
                centeredSlides: true,
                slidesPerView: 5,
            }
        }
    })


    var limits = 10.0;

$(".card").mousemove(function (e) {
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left; //x position within the element.
  var y = e.clientY - rect.top; //y position within the element.
  var offsetX = x / rect.width;
  var offsetY = y / rect.height;

  var rotateY = (offsetX) * (limits * 2) - limits;
  var rotateX = (offsetY) * (limits * 2) - limits;

  var shadowOffsetX = (offsetX) * 32 - 16;
  var shadowOffsetY = (offsetY) * 32 - 16;

  $(this).css({
    "box-shadow": (1 / 6) * -shadowOffsetX + "px " + (1 / 6) * -shadowOffsetY + "px 3px rgba(0, 0, 0, 0.051), " +
      (2 / 6) * -shadowOffsetX + "px " + (2 / 6) * -shadowOffsetY + "px 7.2px rgba(0, 0, 0, 0.073), " +
      (3 / 6) * -shadowOffsetX + "px " + (3 / 6) * -shadowOffsetY + "px 13.6px rgba(0, 0, 0, 0.09), " +
      (4 / 6) * -shadowOffsetX + "px " + (4 / 6) * -shadowOffsetY + "px 24.3px rgba(0, 0, 0, 0.107), " +
      (5 / 6) * -shadowOffsetX + "px " + (5 / 6) * -shadowOffsetY + "px 45.5px rgba(0, 0, 0, 0.129), " +
      -shadowOffsetX + "px " + -shadowOffsetY + "px 109px rgba(0, 0, 0, 0.18)",
    transform: "perspective(1000px) rotateX(" + -rotateX + "deg) rotateY(" + rotateY + "deg)"
  });

  var glarePos = rotateX + rotateY + 90;
  $(this)
    .children()
    .children()
    .css("left", glarePos + "%");
});

$(".card").mouseleave(function (e) {
  $(".card").css({"box-shadow": "0px 0px 3px rgba(0, 0, 0, 0.051), 0px 0px 7.2px rgba(0, 0, 0, 0.073), 0px 0px 13.6px rgba(0, 0, 0, 0.09), 0px 0px 24.3px rgba(0, 0, 0, 0.107), 0px 0px 45.5px rgba(0, 0, 0, 0.129), 0px 0px 109px rgba(0, 0, 0, 0.18)", "transform": "scale(1.0)"});
  $(".glare").css("left", "100%");
});

let burgerBtn = document.querySelector('.burger-btn');
let menuList =  document.querySelector('.mobile-list')

if (burgerBtn) {
    burgerBtn.addEventListener('click', (e)=> {
        if (burgerBtn.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    })
}

function openMenu() {
    burgerBtn.classList.add('active');
    menuList.classList.add('active');
}

function closeMenu() {
    burgerBtn.classList.remove('active');
    menuList.classList.remove('active');
}

})