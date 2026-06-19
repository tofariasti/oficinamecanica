document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });

  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      
      const spans = menuToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de agendar um serviço:\n\n• Veículo (marca/modelo):\n• Serviço desejado:\n• Data preferencial:\n• Telefone para contato:`
  );
  const whatsappNumber = '5551999999999';
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  document.querySelectorAll('#whatsapp-float, #hero-cta, #cta-button').forEach(btn => {
    if (btn) {
      btn.setAttribute('href', whatsappURL);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    }
  });

  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 16);
  }

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        const target = parseInt(entry.target.getAttribute('data-count'));
        animateCounter(entry.target, target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-count]').forEach(counter => {
    counterObserver.observe(counter);
  });

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  let lastScroll = 0;
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    } else {
      header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
    
    lastScroll = currentScroll;
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.borderLeft = '4px solid var(--primary)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.borderLeft = '';
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.service-card, .feature-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  const whatsappFloat = document.getElementById('whatsapp-float');
  if (whatsappFloat) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        whatsappFloat.style.opacity = '1';
        whatsappFloat.style.pointerEvents = 'auto';
      } else {
        whatsappFloat.style.opacity = '0';
        whatsappFloat.style.pointerEvents = 'none';
      }
    });
    
    whatsappFloat.style.opacity = '0';
    whatsappFloat.style.pointerEvents = 'none';
    whatsappFloat.style.transition = 'opacity 0.3s ease';
  }

  console.log('%c🚗 MecânicaPro', 'font-size: 24px; color: #F97316; font-weight: bold;');
  console.log('%cSite desenvolvido por Tiago Farias', 'font-size: 14px; color: #6B7280;');
  console.log('%chttps://tofariasti.github.io/', 'font-size: 12px; color: #1E40AF;');
});
