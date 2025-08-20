// Mobile navigation toggle
const navToggler = document.getElementById('nav-toggler');
const aside = document.getElementById('aside');
const navLinks = document.querySelectorAll('.nav a');

// Toggle mobile menu
navToggler.addEventListener('click', () => {
  aside.classList.toggle('open');
});

// Smooth scrolling for all nav links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href'); // e.g. "#about"
    
    if (targetId.startsWith('#')) {
      e.preventDefault();

      // Remove active class from all nav links
      navLinks.forEach(navLink => navLink.classList.remove('active'));

      // Add active class to clicked nav link
      link.classList.add('active');

      // Smooth scroll to target section
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      // Close mobile menu after clicking
      aside.classList.remove('open');
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!aside.contains(e.target) && !navToggler.contains(e.target)) {
    aside.classList.remove('open');
  }
});

// Smooth scrolling for "Hire Me" buttons
document.querySelectorAll('a[href="#contact"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    navLinks.forEach(navLink => navLink.classList.remove('active'));
    document.querySelector('a[href="#contact"]').classList.add('active');

    document.querySelector('#contact').scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    aside.classList.remove('open');
  });
});

// Typing animation effect
const typingTexts = ['Web Developer', 'MERN Stack Developer', 'Frontend Developer', 'Problem Solver'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeWriter() {
  const currentText = typingTexts[textIndex];

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeWriter, pauseTime);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
    setTimeout(typeWriter, 500);
  } else {
    setTimeout(typeWriter, isDeleting ? deletingSpeed : typingSpeed);
  }
}

// Start typing animation
typeWriter();

// Intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.timeline-item, .project-card, .skill-tags .tag').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
