// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        });
    });

    // Smooth Scrolling for Navigation Links - FIXED
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 70; // navbar height
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link immediately
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Active Navigation Link Highlighting on Scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in animation to elements
    // Add section-specific scroll animations
// Add section-specific scroll animations with stagger
function addScrollAnimations() {
  const sections = {
    '.skill-category': 'slide-in-left',
    '.education-card': 'slide-in-right',
    '.contact-content': 'fade-in-up'
  };

  // Handle skills, education, contact with stagger
  Object.entries(sections).forEach(([selector, animation]) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add(animation);
      el.style.transitionDelay = `${i * 0.1}s`;
      observer.observe(el);
    });
  });

  // Handle project cards separately (featured flips immediately)
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((el, i) => {
    el.classList.add('flip-in');
    el.style.transitionDelay = i === 0 ? '0s' : `${i * 0.15}s`; // Featured = instant
    observer.observe(el);
  });
}



    // Navbar Background on Scroll
    function handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(59, 130, 246, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    // Parallax Effect for Hero Section
   // Parallax Effect for Hero Background
function handleParallax() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;

    if (hero) {
        // Move only the background, not the content
        hero.style.backgroundPositionY = `${scrolled * 0.4}px`;
    }
}


    // Typing Animation for Hero Title
    function initTypingAnimation() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;
        
        const originalText = heroTitle.textContent;
        
        // Only run animation if placeholder text is present
        if (originalText.includes('[Your Name]')) {
            heroTitle.textContent = '';
            let index = 0;
            
            function typeWriter() {
                if (index < originalText.length) {
                    heroTitle.textContent += originalText.charAt(index);
                    index++;
                    setTimeout(typeWriter, 100);
                }
            }
            
            setTimeout(typeWriter, 1000);
        }
    }

    // Skill Tags Animation
    function initSkillTagsAnimation() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach((tag, index) => {
            tag.style.animationDelay = `${index * 0.1}s`;
            
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) rotate(2deg)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }

    // Project Card Tilt Effect
    function initProjectCardTilt() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
    }

    // Button Click Effects
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Don't add ripple to navigation buttons
                if (this.closest('.navbar')) return;
                
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.remove();
                    }
                }, 600);
            });
        });
    }

    // Social Links Hover Effect
    function initSocialLinksEffect() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.1)';
                this.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.4)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    }
    function initHeroAnimations() {
  // Typed.js subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
     new Typed('.hero-subtitle', {
         strings: ['Data Science Enthusiast', 'Machine Learning Explorer', 'AI Innovator'],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true,
        showCursor: false
     });
    }
  // Staggered reveal for title, description & buttons
  const elements = document.querySelectorAll('.hero-title, .hero-description, .hero-buttons');
  elements.forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
      el.style.transition = 'all 0.6s ease';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, 500 + i * 300);
  });
}


    // Scroll to Top Functionality
    function initScrollToTop() {
        // Create scroll to top button
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        `;
        
        document.body.appendChild(scrollToTopBtn);
        
        // Show/hide scroll to top button
        function toggleScrollToTop() {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        }
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        scrollToTopBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.background = '#2563eb';
        });
        
        scrollToTopBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = '#3b82f6';
        });
        
        window.addEventListener('scroll', toggleScrollToTop);
    }

    // Initialize all functions
    addScrollAnimations();
    initHeroAnimations();
    initSkillTagsAnimation();
    initProjectCardTilt();
    initButtonEffects();
    initSocialLinksEffect();
    initScrollToTop();
      const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      status.textContent = "Sending...";
      status.style.color = "var(--color-primary)";
      status.classList.add("visible");

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: new FormData(form),
          headers: { "Accept": "application/json" },
        });

        if (response.ok) {
          status.textContent = "✅ Thanks! Your message has been sent.";
          status.style.color = "limegreen";
          status.classList.add("visible");
          form.reset();
        } else {
          status.textContent =
            "❌ Oops! Something went wrong. Please try again.";
          status.style.color = "red";
          status.classList.add("visible");
        }
      } catch (error) {
        status.textContent = "⚠️ Network error. Please try again later.";
        status.style.color = "orange";
        status.classList.add("visible");
      }

      // 🔹 Auto-hide after 5 seconds
      setTimeout(() => {
        status.classList.remove("visible");
        status.textContent = "";
      }, 5000);
    });
  }

    particlesJS.load('particles-js', 'particles.json', function() {
  console.log('Particles.js loaded');
});


    // Set initial active nav link
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .scroll-to-top:hover {
            transform: scale(1.1) !important;
        }
        
        .skill-tag {
            transition: all 0.3s ease;
        }
        
        .project-card {
            transition: transform 0.3s ease;
        }
        
        .social-link {
            transition: all 0.3s ease;
        }
        
        .nav-link {
            transition: all 0.3s ease;
        }
        
        .fade-in-up {
            transition: all 0.8s ease;
        }
    `;
    document.head.appendChild(style);
        // 🌙☀️ Theme Toggle
    const themeToggle = document.getElementById("theme-toggle");

    // Set default theme if none
    if (!document.documentElement.getAttribute("data-color-scheme")) {
      document.documentElement.setAttribute("data-color-scheme", "dark");
      themeToggle.textContent = "🌙";
    }

    // Toggle theme + update icon
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-color-scheme");

      if (current === "dark") {
        document.documentElement.setAttribute("data-color-scheme", "light");
        themeToggle.textContent = "☀️"; // switch to sun
      } else {
        document.documentElement.setAttribute("data-color-scheme", "dark");
        themeToggle.textContent = "🌙"; // switch to moon
      }
    });


    // Performance optimization for scroll events
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    function updateScrollEffects() {
        updateActiveNavLink();
        handleNavbarScroll();
        handleParallax();
        ticking = false;
    }
    
    // Optimized scroll event listener
    window.addEventListener('scroll', requestTick, { passive: true });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger hero animations after load
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons');
            heroElements.forEach((element, index) => {
                if (element) {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            });
        }, 100);
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        }
    });

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #3b82f6';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

});

// External link handling
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('target') === '_blank') {
        // Add analytics or tracking code here if needed
        console.log('External link clicked:', e.target.href);
    }
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create a placeholder div instead of hiding the image
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: rgba(59, 130, 246, 0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #3b82f6;
                font-size: 1rem;
                text-align: center;
            `;
            placeholder.textContent = 'Image placeholder';
            
            this.parentNode.replaceChild(placeholder, this);
        });
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});