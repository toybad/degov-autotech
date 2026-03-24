// ============================================================
// DeGov Autotech — script.js
//
// TABLE OF CONTENTS:
// 1. Announcement Bar Close Button
// 2. Navbar — Scroll Shadow & Offset
// 3. Navbar — Hamburger Mobile Menu
// 4. Navbar — Active Link Highlight on Scroll
// 5. FAQ Accordion Toggle
// 6. Contact Form Submission Handler
// 7. Scroll Reveal Animation (Intersection Observer)
// 8. Back to Top Button
// 9. Footer Year Auto-Update
// 10. Page Load Entry Animations
// ============================================================


// ============================================================
// 1. ANNOUNCEMENT BAR CLOSE
// Hides the announcement bar when the user clicks the X button.
// Also adjusts the navbar top position so it snaps to the top.
// ============================================================
function closeAnnouncement() {
  const bar = document.getElementById('announcementBar');
  const navbar = document.getElementById('navbar');

  if (bar) {
    // Smoothly hide the bar
    bar.style.maxHeight = bar.offsetHeight + 'px';
    bar.style.overflow = 'hidden';
    bar.style.transition = 'max-height 0.4s ease, opacity 0.4s ease';
    setTimeout(() => {
      bar.style.maxHeight = '0';
      bar.style.opacity = '0';
    }, 10);
    setTimeout(() => {
      bar.style.display = 'none';
      // Move navbar to top now that bar is gone
      if (navbar) navbar.classList.add('no-announcement');
    }, 400);
  }
}


// ============================================================
// 2. NAVBAR — SCROLL SHADOW & SHRINK
// Adds/removes a shadow class as user scrolls.
// This gives depth without hiding the navbar.
// ============================================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (!navbar) return;
  // Add .scrolled class if scrolled more than 60px
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ============================================================
// 3. NAVBAR — HAMBURGER MENU (MOBILE)
// Toggles the .open class on the nav links and the hamburger icon.
// Clicking any nav link also closes the menu automatically.
// ============================================================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  // Toggle menu when hamburger is clicked
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');

    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close menu when any nav link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = ''; // Restore scroll
    });
  });
}


// ============================================================
// 4. NAVBAR — ACTIVE LINK HIGHLIGHT ON SCROLL
// As the user scrolls, the nav link that matches the current
// visible section gets the .active class (adds green underline).
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let currentSection = '';

  sections.forEach(section => {
    // Check if section top is within the viewport
    if (window.scrollY >= section.offsetTop - 120) {
      currentSection = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    // If the link href matches the current section ID, activate it
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}, { passive: true }); // passive: true improves scroll performance


// ============================================================
// 5. FAQ ACCORDION TOGGLE
// Called via onclick="toggleFaq(this)" on each question button.
// Only one FAQ can be open at a time.
// ============================================================
function toggleFaq(clickedBtn) {
  const clickedAnswer = clickedBtn.nextElementSibling; // The .faq-answer div
  const isAlreadyOpen = clickedAnswer.classList.contains('open');

  // Step 1: Close ALL open FAQs
  document.querySelectorAll('.faq-answer.open').forEach(ans => {
    ans.classList.remove('open');
  });
  document.querySelectorAll('.faq-question.open').forEach(btn => {
    btn.classList.remove('open');
  });

  // Step 2: If the clicked one was closed, open it now
  // (If it was already open, clicking again just closes it — handled by Step 1)
  if (!isAlreadyOpen) {
    clickedAnswer.classList.add('open');
    clickedBtn.classList.add('open');
  }
}


// ============================================================
// 6. CONTACT FORM SUBMISSION HANDLER
// Prevents actual form submission (no backend needed).
// Shows a success message instead.
// To connect to a real backend: replace the contents of this
// function with your fetch/AJAX call.
// ============================================================
function handleSubmit(event) {
  event.preventDefault(); // Stop page from refreshing

  const successMsg = document.getElementById('formSuccess');
  const submitBtn  = event.target.querySelector('[type="submit"]');

  // Disable button and show loading state
  if (submitBtn) {
    submitBtn.textContent  = 'Sending...';
    submitBtn.disabled     = true;
    submitBtn.style.opacity = '0.7';
  }

  // Simulate a network delay (replace this with a real API call)
  setTimeout(() => {
    // Reset the form fields
    event.target.reset();

    // Show success message
    if (successMsg) {
      successMsg.style.display = 'block';
    }

    // Restore button
    if (submitBtn) {
      submitBtn.textContent   = 'Send Message 🚀';
      submitBtn.disabled      = false;
      submitBtn.style.opacity = '1';
    }

    // Hide success message after 6 seconds
    setTimeout(() => {
      if (successMsg) successMsg.style.display = 'none';
    }, 6000);
  }, 1200); // 1.2 second fake delay
}


// ============================================================
// 7. SCROLL REVEAL ANIMATION
// Uses the Intersection Observer API to detect when elements
// enter the viewport. When they do, adds the .animated class
// which triggers the CSS fade-up transition.
//
// Elements must have: data-animate="fadeUp"
// Optional delay:     data-delay="200" (milliseconds)
//
// To animate a new element: add data-animate="fadeUp" to it in HTML.
// ============================================================
const animatedElements = document.querySelectorAll('[data-animate]');

if (animatedElements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Read optional delay from data-delay attribute
        const delay = parseInt(entry.target.getAttribute('data-delay')) || 0;

        setTimeout(() => {
          entry.target.classList.add('animated');
        }, delay);

        // Once animated, stop observing this element
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,    // Trigger when 12% of element is visible
    rootMargin: '0px'   // No offset — trigger exactly at viewport edge
  });

  animatedElements.forEach(el => observer.observe(el));
}


// ============================================================
// 8. BACK TO TOP BUTTON
// Shows/hides the back-to-top button based on scroll position.
// scrollToTop() is called from onclick in HTML.
// ============================================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (!backToTopBtn) return;
  // Show button after scrolling 400px
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}, { passive: true });

// Called by onclick="scrollToTop()" on the button
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ============================================================
// 9. FOOTER YEAR AUTO-UPDATE
// Automatically updates the copyright year so you never
// need to manually edit it each year.
// ============================================================
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}


// ============================================================
// 10. PAGE LOAD ENTRY ANIMATIONS
// Triggers the hero content to animate in when the page loads.
// CSS handles the actual animation; JS just adds the class.
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  // Slight delay to allow CSS to render first
  setTimeout(() => {
    // Hero content fades up on load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.animation = 'fadeUp 0.8s ease both';
    }

    // Stats card slides in from right
    const heroRight = document.querySelector('.hero-right');
    if (heroRight) {
      heroRight.style.animation = 'slideInRight 0.9s ease 0.2s both';
    }
  }, 100);
});


// ============================================================
// ── HELPER: Smooth scroll for any internal anchor link ──
// This ensures all <a href="#section"> links animate smoothly.
// (Most modern browsers handle this with CSS scroll-behavior,
//  but this adds extra compatibility.)
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return; // Skip empty # links

    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const targetPos = targetEl.offsetTop - navHeight - 10;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});
