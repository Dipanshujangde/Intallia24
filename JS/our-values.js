// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize FAQ functionality
  initValuesFAQ();

  // Initialize counter animations
  initCounterAnimations();

  // Add hover effect to all cards
  initCardHoverEffects();

  // Add scroll animation for cards
  initScrollAnimations();
});

// Values FAQ toggle functionality
function initValuesFAQ() {
  const faqItems = document.querySelectorAll(".values-faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".values-faq-question");

    question.addEventListener("click", () => {
      // Close other open items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      item.classList.toggle("active");
    });
  });
}

// Counter animation for stats - Mobile & Desktop compatible
function initCounterAnimations() {
  const counters = document.querySelectorAll(".values-stat-count");
  let animationStarted = false;

  // Function to animate a single counter
  function animateCounter(counter, start, end, duration) {
    let startTime = null;

    function updateCounter(timestamp) {
      if (!startTime) startTime = timestamp;

      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function for smoother animation
      const easeOutQuad = (percentage) => percentage * (2 - percentage);
      const easedPercentage = easeOutQuad(percentage);

      const currentValue = Math.floor(easedPercentage * (end - start) + start);

      // Update the counter text
      counter.textContent = currentValue;

      // Check if we need to add % symbol
      if (counter.classList.contains("percent-counter")) {
        counter.textContent = currentValue;
      }

      // Continue animation if not complete
      if (percentage < 1) {
        window.requestAnimationFrame(updateCounter);
      } else {
        // Ensure final value is correct
        if (counter.classList.contains("percent-counter")) {
          counter.textContent = end;
        } else {
          counter.textContent = end;
        }
      }
    }

    // Start the animation
    window.requestAnimationFrame(updateCounter);
  }

  // Function to start all counters
  function startAllCounters() {
    if (animationStarted) return;
    animationStarted = true;

    // Mark which counters need % symbol
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      if (counter.textContent.includes("") || target === 98 || target === 95) {
        counter.classList.add("percent-counter");
      }
    });

    // Start animations for all counters
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      animateCounter(counter, 0, target, 2000); // 2000ms duration
    });
  }

  // Check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }

  // Function to check and trigger counters on scroll
  function checkCountersOnScroll() {
    const statsSection = document.querySelector(".values-action-section");

    if (statsSection && isInViewport(statsSection) && !animationStarted) {
      startAllCounters();
      // Remove scroll listener once animation has started
      window.removeEventListener("scroll", checkCountersOnScroll);
    }
  }

  // Use Intersection Observer if supported, otherwise fallback to scroll event
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationStarted) {
            // Small delay to ensure the element is fully in view
            setTimeout(() => {
              startAllCounters();
              observer.unobserve(entry.target);
            }, 300);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px",
      },
    );

    const statsSection = document.querySelector(".values-action-section");
    if (statsSection) {
      observer.observe(statsSection);
    }
  } else {
    // Fallback for older browsers - check on scroll
    window.addEventListener("scroll", checkCountersOnScroll);
    // Also check on initial load
    setTimeout(checkCountersOnScroll, 500);
  }

  // Also trigger on touch events for mobile
  document.addEventListener("touchmove", checkCountersOnScroll);
  document.addEventListener("touchend", checkCountersOnScroll);
}

// Add hover effect to all cards
function initCardHoverEffects() {
  const cards = document.querySelectorAll(
    ".pillar-card, .values-stat-card, .culture-card, .belief-card",
  );

  // Only add hover effects for non-touch devices
  if (!("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    cards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
      });
    });
  }
}

// Initialize scroll animations for cards
function initScrollAnimations() {
  // Check if IntersectionObserver is supported
  if (!("IntersectionObserver" in window)) {
    // Fallback for older browsers - just show all elements
    const elements = document.querySelectorAll(
      ".pillar-card, .values-stat-card, .culture-card, .belief-card, .section-header",
    );
    elements.forEach((el) => {
      el.classList.add("animated");
    });
    return;
  }

  // Create Intersection Observer for fade-in animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          // Unobserve after animation is triggered to improve performance
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    },
  );

  // Observe all cards for animation
  const cards = document.querySelectorAll(
    ".pillar-card, .values-stat-card, .culture-card, .belief-card",
  );
  cards.forEach((card) => {
    observer.observe(card);
  });

  // Observe section headers for animation
  const headers = document.querySelectorAll(".section-header");
  headers.forEach((header) => {
    observer.observe(header);
  });

  // Fallback for mobile - trigger animations on scroll
  function checkAnimationsOnScroll() {
    const elements = document.querySelectorAll(
      ".pillar-card, .values-stat-card, .culture-card, .belief-card, .section-header",
    );

    elements.forEach((el) => {
      if (isElementInViewport(el) && !el.classList.contains("animated")) {
        el.classList.add("animated");
      }
    });
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
      rect.bottom >= 0
    );
  }

  // Add scroll listener for mobile fallback
  window.addEventListener("scroll", checkAnimationsOnScroll);
  // Trigger once on load
  setTimeout(checkAnimationsOnScroll, 500);
}

// Add CSS for animations (injected dynamically)
function addAnimationStyles() {
  const style = document.createElement("style");
  style.textContent = `
        .pillar-card, .values-stat-card, .culture-card, .belief-card,
        .section-header {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .pillar-card.animated, .values-stat-card.animated, 
        .culture-card.animated, .belief-card.animated,
        .section-header.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Staggered animations */
        .pillars-cards .pillar-card:nth-child(1) { transition-delay: 0.1s; }
        .pillars-cards .pillar-card:nth-child(2) { transition-delay: 0.2s; }
        .pillars-cards .pillar-card:nth-child(3) { transition-delay: 0.3s; }
        .pillars-cards .pillar-card:nth-child(4) { transition-delay: 0.4s; }
        .pillars-cards .pillar-card:nth-child(5) { transition-delay: 0.5s; }
        .pillars-cards .pillar-card:nth-child(6) { transition-delay: 0.6s; }
        
        .values-stats-cards .values-stat-card:nth-child(1) { transition-delay: 0.1s; }
        .values-stats-cards .values-stat-card:nth-child(2) { transition-delay: 0.2s; }
        .values-stats-cards .values-stat-card:nth-child(3) { transition-delay: 0.3s; }
        .values-stats-cards .values-stat-card:nth-child(4) { transition-delay: 0.4s; }
        
        .culture-cards .culture-card:nth-child(1) { transition-delay: 0.1s; }
        .culture-cards .culture-card:nth-child(2) { transition-delay: 0.2s; }
        .culture-cards .culture-card:nth-child(3) { transition-delay: 0.3s; }
        .culture-cards .culture-card:nth-child(4) { transition-delay: 0.4s; }
        
        .beliefs-cards .belief-card:nth-child(1) { transition-delay: 0.1s; }
        .beliefs-cards .belief-card:nth-child(2) { transition-delay: 0.2s; }
        .beliefs-cards .belief-card:nth-child(3) { transition-delay: 0.3s; }
        .beliefs-cards .belief-card:nth-child(4) { transition-delay: 0.4s; }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            .pillar-card, .values-stat-card, .culture-card, .belief-card,
            .section-header {
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            /* Reduce animation delays on mobile for better performance */
            .pillars-cards .pillar-card,
            .values-stats-cards .values-stat-card,
            .culture-cards .culture-card,
            .beliefs-cards .belief-card {
                transition-delay: 0.1s !important;
            }
        }
    `;
  document.head.appendChild(style);
}

// Call the function to add animation styles
addAnimationStyles();

// Add a small fix for iOS Safari
if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
  // Fix for iOS Safari
  document.addEventListener("touchstart", function () {}, { passive: true });
}
