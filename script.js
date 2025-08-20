// Mobile navigation toggle
const navToggler = document.getElementById('nav-toggler');
const aside = document.getElementById('aside');
const navLinks = document.querySelectorAll('.nav a');
const sections = document.querySelectorAll('.section');

// Toggle mobile menu
navToggler.addEventListener('click', () => {
  aside.classList.toggle('open');
});

// Section switching functionality
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Remove active class from all nav links
    navLinks.forEach(navLink => navLink.classList.remove('active'));
    
    // Add active class to clicked nav link
    link.classList.add('active');
    
    // Hide all sections
    sections.forEach(section => section.classList.remove('active'));
    
    // Show target section
    const targetSection = link.getAttribute('data-section');
    document.getElementById(targetSection).classList.add('active');
    
    // Close mobile menu after clicking
    aside.classList.remove('open');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!aside.contains(e.target) && !navToggler.contains(e.target)) {
    aside.classList.remove('open');
  }
});

// Smooth scrolling for hire me buttons
document.querySelectorAll('a[href="#contact"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Remove active class from all nav links
    navLinks.forEach(navLink => navLink.classList.remove('active'));
    
    // Add active class to contact nav link
    document.querySelector('a[data-section="contact"]').classList.add('active');
    
    // Hide all sections
    sections.forEach(section => section.classList.remove('active'));
    
    // Show contact section
    document.getElementById('contact').classList.add('active');
    
    // Close mobile menu
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

// Add intersection observer for animations
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

// Observe elements for animation
document.querySelectorAll('.timeline-item, .project-card, .skill-tags .tag').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});