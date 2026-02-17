// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize counter animations
  initWebCounterAnimations();

  // Initialize FAQ functionality
  initWebFAQ();

  // Add scroll animations
  initWebScrollAnimations();

  // Add hover effects
  initWebHoverEffects();
});

// Counter animation for stats
function initWebCounterAnimations() {
  const counters = document.querySelectorAll(".web-counter");
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
      if (counter.classList.contains("web-percent-counter")) {
        // For percentage numbers like 98%
        currentValue = Math.floor(currentValue);
        counter.textContent = currentValue;
      } else if (counter.classList.contains("web-decimal-counter")) {
        // For decimal numbers like 2.5
        currentValue = parseFloat(currentValue.toFixed(1));
        counter.textContent = currentValue;
      } else if (counter.classList.contains("web-websites-counter")) {
        // For number of websites
        currentValue = Math.floor(currentValue);
        counter.textContent = currentValue;
      } else if (counter.classList.contains("web-uptime-counter")) {
        // For uptime percentage
        currentValue = parseFloat(currentValue.toFixed(1));
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
        if (counter.classList.contains("web-percent-counter")) {
          counter.textContent = end;
        } else if (counter.classList.contains("web-decimal-counter")) {
          counter.textContent = end;
        } else if (counter.classList.contains("web-websites-counter")) {
          counter.textContent = end;
        } else if (counter.classList.contains("web-uptime-counter")) {
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
        // 150 - Websites Built
        counter.classList.add("web-websites-counter");
      } else if (index === 1) {
        // 98% - Client Satisfaction
        counter.classList.add("web-percent-counter");
      } else if (index === 2) {
        // 2.5 Sec Load Time
        counter.classList.add("web-decimal-counter");
      } else if (index === 3) {
        // 99.9% Uptime
        counter.classList.add("web-uptime-counter");
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
    const heroSection = document.querySelector(".web-hero-section");

    if (heroSection && isInViewport(heroSection) && !animationStarted) {
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

    const heroSection = document.querySelector(".web-hero-section");
    if (heroSection) {
      observer.observe(heroSection);
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
      const heroSection = document.querySelector(".web-hero-section");
      if (heroSection && isInViewport(heroSection)) {
        startAllCounters();
      }
    }
  }, 3000);
}

// FAQ functionality
function initWebFAQ() {
  const faqItems = document.querySelectorAll(".web-faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".web-faq-question");

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

// Initialize scroll animations for cards
function initWebScrollAnimations() {
  // Check if IntersectionObserver is supported
  if (!("IntersectionObserver" in window)) {
    // Fallback for older browsers - just show all elements
    const elements = document.querySelectorAll(
      ".web-service-card, .web-tech-card, .web-process-card, .web-results-card, .web-testimonial-card, .web-strategy-card, .web-platform-card, .web-excellence-item, .web-feature-card",
    );
    elements.forEach((el) => {
      el.classList.add("web-animated");
    });
    return;
  }

  // Create Intersection Observer for fade-in animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("web-animated");
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
    ".web-service-card, .web-tech-card, .web-process-card, .web-results-card, .web-testimonial-card, .web-strategy-card, .web-platform-card, .web-excellence-item, .web-feature-card",
  );
  cards.forEach((card) => {
    observer.observe(card);
  });

  // Fallback for mobile - trigger animations on scroll
  function checkAnimationsOnScroll() {
    const elements = document.querySelectorAll(
      ".web-service-card, .web-tech-card, .web-process-card, .web-results-card, .web-testimonial-card, .web-strategy-card, .web-platform-card, .web-excellence-item, .web-feature-card",
    );

    elements.forEach((el) => {
      if (isElementInViewport(el) && !el.classList.contains("web-animated")) {
        el.classList.add("web-animated");
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

// Add hover effect to all cards
function initWebHoverEffects() {
  const cards = document.querySelectorAll(
    ".web-service-card, .web-tech-card, .web-process-card, .web-results-card, .web-testimonial-card, .web-strategy-card, .web-platform-card, .web-feature-card, .web-stat-item",
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

// Add CSS for animations (injected dynamically)
function addWebAnimationStyles() {
  const style = document.createElement("style");
  style.textContent = `
        .web-service-card, .web-tech-card, .web-process-card, .web-results-card,
        .web-testimonial-card, .web-strategy-card, .web-platform-card,
        .web-excellence-item, .web-feature-card, .web-stat-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .web-service-card.web-animated, .web-tech-card.web-animated,
        .web-process-card.web-animated, .web-results-card.web-animated,
        .web-testimonial-card.web-animated, .web-strategy-card.web-animated,
        .web-platform-card.web-animated, .web-excellence-item.web-animated,
        .web-feature-card.web-animated, .web-stat-item.web-animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Staggered animations */
        .web-services-cards .web-service-card:nth-child(1) { transition-delay: 0.1s; }
        .web-services-cards .web-service-card:nth-child(2) { transition-delay: 0.2s; }
        .web-services-cards .web-service-card:nth-child(3) { transition-delay: 0.3s; }
        .web-services-cards .web-service-card:nth-child(4) { transition-delay: 0.4s; }
        .web-services-cards .web-service-card:nth-child(5) { transition-delay: 0.5s; }
        
        .web-tech-cards .web-tech-card:nth-child(1) { transition-delay: 0.1s; }
        .web-tech-cards .web-tech-card:nth-child(2) { transition-delay: 0.2s; }
        .web-tech-cards .web-tech-card:nth-child(3) { transition-delay: 0.3s; }
        .web-tech-cards .web-tech-card:nth-child(4) { transition-delay: 0.4s; }
        
        .web-process-cards .web-process-card:nth-child(1) { transition-delay: 0.1s; }
        .web-process-cards .web-process-card:nth-child(2) { transition-delay: 0.2s; }
        .web-process-cards .web-process-card:nth-child(3) { transition-delay: 0.3s; }
        .web-process-cards .web-process-card:nth-child(4) { transition-delay: 0.4s; }
        
        .web-results-cards .web-results-card:nth-child(1) { transition-delay: 0.1s; }
        .web-results-cards .web-results-card:nth-child(2) { transition-delay: 0.2s; }
        .web-results-cards .web-results-card:nth-child(3) { transition-delay: 0.3s; }
        
        .web-testimonial-cards .web-testimonial-card:nth-child(1) { transition-delay: 0.1s; }
        .web-testimonial-cards .web-testimonial-card:nth-child(2) { transition-delay: 0.2s; }
        .web-testimonial-cards .web-testimonial-card:nth-child(3) { transition-delay: 0.3s; }
        
        .web-strategy-cards .web-strategy-card:nth-child(1) { transition-delay: 0.1s; }
        .web-strategy-cards .web-strategy-card:nth-child(2) { transition-delay: 0.2s; }
        .web-strategy-cards .web-strategy-card:nth-child(3) { transition-delay: 0.3s; }
        
        .web-feature-cards .web-feature-card:nth-child(1) { transition-delay: 0.1s; }
        .web-feature-cards .web-feature-card:nth-child(2) { transition-delay: 0.2s; }
        .web-feature-cards .web-feature-card:nth-child(3) { transition-delay: 0.3s; }
        .web-feature-cards .web-feature-card:nth-child(4) { transition-delay: 0.4s; }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            .web-service-card, .web-tech-card, .web-process-card, .web-results-card,
            .web-testimonial-card, .web-strategy-card, .web-platform-card,
            .web-excellence-item, .web-feature-card, .web-stat-item {
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            /* Reduce animation delays on mobile for better performance */
            .web-services-cards .web-service-card,
            .web-tech-cards .web-tech-card,
            .web-process-cards .web-process-card,
            .web-results-cards .web-results-card,
            .web-testimonial-cards .web-testimonial-card,
            .web-strategy-cards .web-strategy-card,
            .web-feature-cards .web-feature-card {
                transition-delay: 0.1s !important;
            }
        }
    `;
  document.head.appendChild(style);
}

// Call the function to add animation styles
addWebAnimationStyles();

// Add a small fix for iOS Safari
if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
  // Fix for iOS Safari
  document.addEventListener("touchstart", function () {}, { passive: true });
}
