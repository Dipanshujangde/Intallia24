// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize counter animations
  initDSCounterAnimations();

  // Initialize FAQ functionality
  initDSFAQ();

  // Add scroll animations
  initDSScrollAnimations();

  // Add hover effects
  initDSHoverEffects();
});

// Counter animation for stats
function initDSCounterAnimations() {
  const counters = document.querySelectorAll(".ds-counter");
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
      if (counter.classList.contains("ds-percent-counter")) {
        // For percentage numbers like 95%
        currentValue = Math.floor(currentValue);
        counter.textContent = currentValue;
      } else if (counter.classList.contains("ds-decimal-counter")) {
        // For decimal numbers
        currentValue = parseFloat(currentValue.toFixed(1));
        counter.textContent = currentValue;
      } else if (counter.classList.contains("ds-tb-counter")) {
        // For TB numbers
        currentValue = Math.floor(currentValue);
        counter.textContent = currentValue;
      } else if (counter.classList.contains("ds-cost-counter")) {
        // For cost reduction percentage
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
        if (counter.classList.contains("ds-percent-counter")) {
          counter.textContent = end;
        } else if (counter.classList.contains("ds-decimal-counter")) {
          counter.textContent = end;
        } else if (counter.classList.contains("ds-tb-counter")) {
          counter.textContent = end;
        } else if (counter.classList.contains("ds-cost-counter")) {
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
        // 50 - Data Projects
        // Regular number, no special class needed
      } else if (index === 1) {
        // 95% - Model Accuracy
        counter.classList.add("ds-percent-counter");
      } else if (index === 2) {
        // 12 TB Processed
        counter.classList.add("ds-tb-counter");
      } else if (index === 3) {
        // 40% Cost Reduction
        counter.classList.add("ds-cost-counter");
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
    const heroSection = document.querySelector(".ds-hero-section");

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

    const heroSection = document.querySelector(".ds-hero-section");
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
      const heroSection = document.querySelector(".ds-hero-section");
      if (heroSection && isInViewport(heroSection)) {
        startAllCounters();
      }
    }
  }, 3000);
}

// FAQ functionality
function initDSFAQ() {
  const faqItems = document.querySelectorAll(".ds-faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".ds-faq-question");

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
function initDSScrollAnimations() {
  // Check if IntersectionObserver is supported
  if (!("IntersectionObserver" in window)) {
    // Fallback for older browsers - just show all elements
    const elements = document.querySelectorAll(
      ".ds-service-card, .ds-tech-card, .ds-process-card, .ds-impact-card, .ds-testimonial-card, .ds-strategy-card, .ds-solution-card, .ds-excellence-item, .ds-feature-card",
    );
    elements.forEach((el) => {
      el.classList.add("ds-animated");
    });
    return;
  }

  // Create Intersection Observer for fade-in animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("ds-animated");
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
    ".ds-service-card, .ds-tech-card, .ds-process-card, .ds-impact-card, .ds-testimonial-card, .ds-strategy-card, .ds-solution-card, .ds-excellence-item, .ds-feature-card",
  );
  cards.forEach((card) => {
    observer.observe(card);
  });

  // Fallback for mobile - trigger animations on scroll
  function checkAnimationsOnScroll() {
    const elements = document.querySelectorAll(
      ".ds-service-card, .ds-tech-card, .ds-process-card, .ds-impact-card, .ds-testimonial-card, .ds-strategy-card, .ds-solution-card, .ds-excellence-item, .ds-feature-card",
    );

    elements.forEach((el) => {
      if (isElementInViewport(el) && !el.classList.contains("ds-animated")) {
        el.classList.add("ds-animated");
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
function initDSHoverEffects() {
  const cards = document.querySelectorAll(
    ".ds-service-card, .ds-tech-card, .ds-process-card, .ds-impact-card, .ds-testimonial-card, .ds-strategy-card, .ds-solution-card, .ds-feature-card, .ds-stat-item",
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
function addDSAnimationStyles() {
  const style = document.createElement("style");
  style.textContent = `
        .ds-service-card, .ds-tech-card, .ds-process-card, .ds-impact-card,
        .ds-testimonial-card, .ds-strategy-card, .ds-solution-card,
        .ds-excellence-item, .ds-feature-card, .ds-stat-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .ds-service-card.ds-animated, .ds-tech-card.ds-animated,
        .ds-process-card.ds-animated, .ds-impact-card.ds-animated,
        .ds-testimonial-card.ds-animated, .ds-strategy-card.ds-animated,
        .ds-solution-card.ds-animated, .ds-excellence-item.ds-animated,
        .ds-feature-card.ds-animated, .ds-stat-item.ds-animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Staggered animations */
        .ds-services-cards .ds-service-card:nth-child(1) { transition-delay: 0.1s; }
        .ds-services-cards .ds-service-card:nth-child(2) { transition-delay: 0.2s; }
        .ds-services-cards .ds-service-card:nth-child(3) { transition-delay: 0.3s; }
        .ds-services-cards .ds-service-card:nth-child(4) { transition-delay: 0.4s; }
        .ds-services-cards .ds-service-card:nth-child(5) { transition-delay: 0.5s; }
        
        .ds-tech-cards .ds-tech-card:nth-child(1) { transition-delay: 0.1s; }
        .ds-tech-cards .ds-tech-card:nth-child(2) { transition-delay: 0.2s; }
        .ds-tech-cards .ds-tech-card:nth-child(3) { transition-delay: 0.3s; }
        .ds-tech-cards .ds-tech-card:nth-child(4) { transition-delay: 0.4s; }
        
        .ds-process-cards .ds-process-card:nth-child(1) { transition-delay: 0.1s; }
        .ds-process-cards .ds-process-card:nth-child(2) { transition-delay: 0.2s; }
        .ds-process-cards .ds-process-card:nth-child(3) { transition-delay: 0.3s; }
        .ds-process-cards .ds-process-card:nth-child(4) { transition-delay: 0.4s; }
        
        .ds-impact-cards .ds-impact-card:nth-child(1) { transition-delay: 0.1s; }
        .ds-impact-cards .ds-impact-card:nth-child(2) { transition-delay: 0.2s; }
        .ds-impact-cards .ds-impact-card:nth-child(3) { transition-delay: 0.3s; }
        
        .ds-testimonial-cards .ds-testimonial-card:nth-child(1) { transition-delay: 0.1s; }
        .ds-testimonial-cards .ds-testimonial-card:nth-child(2) { transition-delay: 0.2s; }
        .ds-testimonial-cards .ds-testimonial-card:nth-child(3) { transition-delay: 0.3s; }
        
        .ds-strategy-cards .ds-strategy-card:nth-child(1) { transition-delay: 0.1s; }
        .ds-strategy-cards .ds-strategy-card:nth-child(2) { transition-delay: 0.2s; }
        .ds-strategy-cards .ds-strategy-card:nth-child(3) { transition-delay: 0.3s; }
        
        .ds-feature-cards .ds-feature-card:nth-child(1) { transition-delay: 0.1s; }
        .ds-feature-cards .ds-feature-card:nth-child(2) { transition-delay: 0.2s; }
        .ds-feature-cards .ds-feature-card:nth-child(3) { transition-delay: 0.3s; }
        .ds-feature-cards .ds-feature-card:nth-child(4) { transition-delay: 0.4s; }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            .ds-service-card, .ds-tech-card, .ds-process-card, .ds-impact-card,
            .ds-testimonial-card, .ds-strategy-card, .ds-solution-card,
            .ds-excellence-item, .ds-feature-card, .ds-stat-item {
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            /* Reduce animation delays on mobile for better performance */
            .ds-services-cards .ds-service-card,
            .ds-tech-cards .ds-tech-card,
            .ds-process-cards .ds-process-card,
            .ds-impact-cards .ds-impact-card,
            .ds-testimonial-cards .ds-testimonial-card,
            .ds-strategy-cards .ds-strategy-card,
            .ds-feature-cards .ds-feature-card {
                transition-delay: 0.1s !important;
            }
        }
    `;
  document.head.appendChild(style);
}

// Call the function to add animation styles
addDSAnimationStyles();

// Add a small fix for iOS Safari
if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
  // Fix for iOS Safari
  document.addEventListener("touchstart", function () {}, { passive: true });
}
