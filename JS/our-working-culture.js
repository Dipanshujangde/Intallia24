// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize counter animations
  initCounterAnimations();

  // Add hover effect to all cards
  initCardHoverEffects();

  // Add scroll animation for cards
  initScrollAnimations();
});

// Counter animation for stats - Mobile & Desktop compatible
function initCounterAnimations() {
  const counters = document.querySelectorAll(".culture-stat-count");
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

      let currentValue = easedPercentage * (end - start) + start;

      // Format numbers based on counter type
      if (counter.classList.contains("decimal-counter")) {
        // For decimal numbers like 2.5 and 4.8
        currentValue = parseFloat(currentValue.toFixed(1));
        counter.textContent = currentValue;
      } else if (counter.classList.contains("percent-counter")) {
        // For percentage numbers
        currentValue = Math.floor(currentValue);
        counter.textContent = currentValue;
      } else if (counter.classList.contains("hours-counter")) {
        // For hours
        currentValue = Math.floor(currentValue);
        counter.textContent = currentValue;
      } else {
        // For regular numbers
        currentValue = Math.floor(currentValue);
        counter.textContent = currentValue;
      }

      // Continue animation if not complete
      if (percentage < 1) {
        window.requestAnimationFrame(updateCounter);
      } else {
        // Ensure final value is correct
        if (counter.classList.contains("decimal-counter")) {
          counter.textContent = end;
        } else if (counter.classList.contains("percent-counter")) {
          counter.textContent = end;
        } else if (counter.classList.contains("hours-counter")) {
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

    // Mark counters with appropriate classes
    counters.forEach((counter, index) => {
      const target = parseFloat(counter.getAttribute("data-target"));

      // Add appropriate class based on counter type
      if (index === 0) {
        // 96% - Employee Satisfaction
        counter.classList.add("percent-counter");
      } else if (index === 1) {
        // 2.5x - Career Growth Rate
        counter.classList.add("decimal-counter");
      } else if (index === 2) {
        // 4.8/5 - Culture Rating
        counter.classList.add("decimal-counter");
      } else if (index === 3) {
        // 32hrs - Average Work Week
        counter.classList.add("hours-counter");
      }
    });

    // Start animations for all counters
    counters.forEach((counter) => {
      const target = parseFloat(counter.getAttribute("data-target"));
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
    const statsSection = document.querySelector(".culture-numbers-section");

    if (statsSection && isInViewport(statsSection) && !animationStarted) {
      startAllCounters();
      // Remove scroll listener once animation has started
      window.removeEventListener("scroll", checkCountersOnScroll);
      document.removeEventListener("touchmove", checkCountersOnScroll);
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

    const statsSection = document.querySelector(".culture-numbers-section");
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

  // Force animation after 3 seconds if not triggered (fallback)
  setTimeout(() => {
    if (!animationStarted) {
      const statsSection = document.querySelector(".culture-numbers-section");
      if (statsSection && isInViewport(statsSection)) {
        startAllCounters();
      }
    }
  }, 3000);
}

// Add hover effect to all cards
function initCardHoverEffects() {
  const cards = document.querySelectorAll(
    ".different-card, .culture-stat-card, .work-environment-card, .perk-card",
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
      ".different-card, .culture-stat-card, .work-environment-card, .perk-card, .section-header",
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
    ".different-card, .culture-stat-card, .work-environment-card, .perk-card",
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
      ".different-card, .culture-stat-card, .work-environment-card, .perk-card, .section-header",
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
        .different-card, .culture-stat-card, .work-environment-card, .perk-card,
        .section-header {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .different-card.animated, .culture-stat-card.animated, 
        .work-environment-card.animated, .perk-card.animated,
        .section-header.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Staggered animations */
        .different-cards .different-card:nth-child(1) { transition-delay: 0.1s; }
        .different-cards .different-card:nth-child(2) { transition-delay: 0.2s; }
        .different-cards .different-card:nth-child(3) { transition-delay: 0.3s; }
        .different-cards .different-card:nth-child(4) { transition-delay: 0.4s; }
        .different-cards .different-card:nth-child(5) { transition-delay: 0.5s; }
        .different-cards .different-card:nth-child(6) { transition-delay: 0.6s; }
        
        .culture-stats-cards .culture-stat-card:nth-child(1) { transition-delay: 0.1s; }
        .culture-stats-cards .culture-stat-card:nth-child(2) { transition-delay: 0.2s; }
        .culture-stats-cards .culture-stat-card:nth-child(3) { transition-delay: 0.3s; }
        .culture-stats-cards .culture-stat-card:nth-child(4) { transition-delay: 0.4s; }
        
        .work-environment-cards .work-environment-card:nth-child(1) { transition-delay: 0.1s; }
        .work-environment-cards .work-environment-card:nth-child(2) { transition-delay: 0.2s; }
        .work-environment-cards .work-environment-card:nth-child(3) { transition-delay: 0.3s; }
        .work-environment-cards .work-environment-card:nth-child(4) { transition-delay: 0.4s; }
        
        .perks-cards .perk-card:nth-child(1) { transition-delay: 0.1s; }
        .perks-cards .perk-card:nth-child(2) { transition-delay: 0.2s; }
        .perks-cards .perk-card:nth-child(3) { transition-delay: 0.3s; }
        .perks-cards .perk-card:nth-child(4) { transition-delay: 0.4s; }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            .different-card, .culture-stat-card, .work-environment-card, .perk-card,
            .section-header {
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            /* Reduce animation delays on mobile for better performance */
            .different-cards .different-card,
            .culture-stats-cards .culture-stat-card,
            .work-environment-cards .work-environment-card,
            .perks-cards .perk-card {
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
