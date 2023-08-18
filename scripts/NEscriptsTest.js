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
    speed: 300,
    prevArrow: '<button type="button" class="slick-prev"><img src="Design/arrow-left.png" alt="Previous"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="Design/arrow-right.png" alt="Next"></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false, // Disable center mode for smaller screens
          centerPadding: '0' // Remove any padding
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

$(document).ready(function() {
    // Initially make the first button active
    $('.slide-icon-nav img').first().addClass('active');

    // Button click to change slide
    $('.slide-icon-nav img').on('click', function() {
        let slideTo = $(this).data('slide-to');
        $('.carousel').slick('slickGoTo', slideTo);
    });
    
    // Update active state when slide changes
    $('.carousel').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      $('.slide-icon-nav img').removeClass('active'); // Remove active class from all
      $(`.slide-icon-nav img[data-slide-to=${nextSlide}]`).addClass('active'); // Add active class to the relevant image immediately
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const videoContainer = document.getElementById("video-container");
  const conceptTrailerBg = document.getElementById("concept-trailer-bg");
  const conceptTrailer = document.getElementById("concept-trailer");

  let isVideoInView = false;

  function handleScroll() {
      let topOfVideo = videoContainer.offsetTop;
      let bottomOfVideo = topOfVideo + videoContainer.offsetHeight;
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      let windowHeight = window.innerHeight;

      if (scrollTop + windowHeight >= topOfVideo && scrollTop <= bottomOfVideo) {
          if (!isVideoInView) {
              conceptTrailerBg.play();
              conceptTrailer.play();

              // Adjust the style for slide and fade-in effect
              conceptTrailer.style.opacity = "1";
              conceptTrailer.style.transform = "translate(-50%, -50%) translateY(0)";
              conceptTrailer.style.filter = "blur(0px)";
          }
          isVideoInView = true;
      } else if(isVideoInView) {  // Only update styles if video was previously in view
          // Adjust the style when video scrolls out of view
          conceptTrailer.style.opacity = "0";
          conceptTrailer.style.transform = "translate(-50%, -50%) translateY(50px)";
          conceptTrailer.style.filter = "blur(10px)";
          isVideoInView = false;
      }
  }

  window.addEventListener('scroll', handleScroll);
});

window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
      document.body.classList.remove('mobile-menu-open');  // Close the mobile menu
      document.body.classList.remove('no-scroll');  // Allow scrolling
      
      // Reset the hamburger icon to its original state
      const hamburger = document.querySelector('.hamburger');
      hamburger.classList.remove('hamburger-active');
      
      // ... any other logic for closing the menu ...
  }
});