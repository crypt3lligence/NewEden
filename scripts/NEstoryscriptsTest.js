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
});


window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
      document.body.classList.remove('mobile-menu-open');  // Close the mobile menu
      document.body.classList.remove('no-scroll');  // Allow scrolling
      
      // Reset the hamburger icon to its original state
      const hamburger = document.querySelector('.hamburger');
      hamburger.classList.remove('hamburger-active');
  }
});