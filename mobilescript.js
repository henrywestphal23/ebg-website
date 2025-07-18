document.addEventListener("DOMContentLoaded", function() {
  document.body.classList.add("fade-in");
  
  // Hamburger menu functionality
  const nav = document.querySelector('nav');
  const navLinks = document.querySelector('.nav-links');
  
  // Create hamburger button
  const navToggle = document.createElement('button');
  navToggle.className = 'nav-toggle';
  navToggle.setAttribute('aria-label', 'Toggle navigation');
  navToggle.innerHTML = '<span></span><span></span><span></span>';
  
  nav.appendChild(navToggle);
  
  // Toggle mobile menu
  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navLinks.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });
  
  // Close menu when clicking nav links
  const navLinkItems = document.querySelectorAll('.nav-links a');
  navLinkItems.forEach(link => {
    link.addEventListener('click', function() {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideNav = nav.contains(event.target);
    if (!isClickInsideNav && navLinks.classList.contains('active')) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
  
  // Close menu with escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && navLinks.classList.contains('active')) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
  
  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Staggered animation for officer cards
  const officerCards = document.querySelectorAll('.officer-card');
  officerCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
  
  // Apply button loading effect
  const applyButtons = document.querySelectorAll('.apply-button');
  applyButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (!this.hasAttribute('target') || this.getAttribute('target') !== '_blank') {
        const originalText = this.innerHTML;
        this.innerHTML = '<span class="loading"></span>Loading...';
        
        setTimeout(() => {
          this.innerHTML = originalText;
        }, 2000);
      }
    });
  });
  
  // Intersection Observer for animations
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'slideUp 0.8s ease-out forwards';
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
  }
  
  // Header scroll effect
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.backdropFilter = 'blur(10px)';
    } else {
      header.style.background = '#ffffff';
      header.style.backdropFilter = 'none';
    }
    
    lastScrollY = currentScrollY;
  });
  
  // Close mobile menu on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
  
  // Touch swipe to close menu
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (diff < -swipeThreshold && navLinks.classList.contains('active')) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }
});