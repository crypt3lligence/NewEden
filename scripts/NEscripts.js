$(document).ready(function(){

  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mainLinks = mobileMenu.querySelectorAll('a:not(.dropdown-content a)');
  const dropdownLinks = mobileMenu.querySelectorAll('.dropdown-content a');
  const dropdownToggle = mobileMenu.querySelector('.dropdown > a');
  const menuIcon = mobileMenu.querySelector('.menu-icon');
  
  let touchDetected = false;
  
  function init() {
      mainLinks.forEach(link => {
          link.style.opacity = '0';
          link.style.transform = 'translateX(100%)';
      });
      dropdownLinks.forEach(link => {
          link.style.opacity = '0';
          link.style.transform = 'translateY(-100%)';
      });
      menuIcon.style.opacity = '0';
  }
  init();
  
  function animateMainLinks() {
      mainLinks.forEach((link, index) => {
          setTimeout(() => {
              link.style.opacity = '1';
              link.style.transform = 'none';
          }, index * 100);
      });
  }
  
  function animateDropdownLinks() {
      dropdownLinks.forEach((link, index) => {
          setTimeout(() => {
              link.style.opacity = '1';
              link.style.transform = 'none';
          }, index * 100);
      });
  }
  
  function toggleMenu() {
    document.body.classList.toggle('mobile-menu-open');

    if (document.body.classList.contains('mobile-menu-open')) {
        document.body.classList.add('no-scroll'); 
        setTimeout(() => {
            animateMainLinks();

            setTimeout(() => {
                menuIcon.style.opacity = '1';
            }, mainLinks.length * 100);
        }, 50);
    } else {
        document.body.classList.remove('no-scroll'); 
        mainLinks.forEach(link => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(100%)';
        });
        dropdownLinks.forEach(link => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(-100%)';
        });
        menuIcon.style.opacity = '0';
    }

    hamburger.classList.toggle('hamburger-active');
}

  
  hamburger.addEventListener('click', function() {
      if (!touchDetected) {
          toggleMenu();
      }
  });
  
  hamburger.addEventListener('touchend', function(event) {
      event.preventDefault();
      touchDetected = true;
      toggleMenu();
  
      setTimeout(() => {
          touchDetected = false;
      }, 300);
  });
  
  // Dropdown logic
  dropdownToggle.addEventListener('click', function(event) {
      event.preventDefault();
      const dropdownContent = mobileMenu.querySelector('.dropdown-content');
  
      if (getComputedStyle(dropdownContent).display === 'none') {
          dropdownContent.style.display = 'flex';
          setTimeout(() => {
              animateDropdownLinks();
          }, 50);
      } else {
          dropdownLinks.forEach(link => {
              link.style.opacity = '0';
              link.style.transform = 'translateY(-100%)';
          });
  
          setTimeout(() => {
              dropdownContent.style.display = 'none';
          }, 500);
      }
  });
  
  


  

  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    
    if(window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  let carousel = $('.carousel').slick({
    centerPadding: '100px',
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 400,
    prevArrow: '<button type="button" class="slick-prev"><img src="Design/arrow-left.png" alt="Previous"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="Design/arrow-right.png" alt="Next"></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
      
  carousel.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    let nextIndex = currentSlide + 1; 
    if(currentSlide - 1 == nextSlide || (nextSlide + 1 == slick.slideCount && currentSlide < nextSlide)) {
      nextIndex = currentSlide - 1; 
    }
    $(`[data-slick-index="${nextIndex}"]`).addClass('slick-target');

    
    $(`.slick-slide[data-slick-index="${currentSlide}"] .class-name`).css({
      'opacity': '0',
      'transition': 'opacity 0.5s'
    });

    
    $(`.slick-slide[data-slick-index="${nextSlide}"] .class-name`).css({
      'opacity': '1',
      'transition': 'opacity 0.5s' 
    });
  });

  
  carousel.on('afterChange', function(event, slick, currentSlide) {
    $('.slick-slide').removeClass('slick-target');
    $(`.slick-slide[data-slick-index="${currentSlide}"]`).addClass('slick-center'); 
    
    $('.slick-slide').not(`[data-slick-index="${currentSlide}"]`).find('.class-name').css('transition', '');
  });
});

