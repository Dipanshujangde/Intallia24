// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize counter animations
  initAICounterAnimations();

  // Initialize FAQ functionality
  initAIFAQ();

  // Add scroll animations
  initAIScrollAnimations();

  // Add hover effects
  initAIHoverEffects();
});

// Counter animation for stats
function initAICounterAnimations() {
  const counters = document.querySelectorAll(".ai-counter");
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
      if (counter.classList.contains("ai-percent-counter")) {
        // For percentage numbers like 96%
        currentValue = Math.floor(currentValue);
        counter.textContent = currentValue;
      } else if (counter.classList.contains("ai-decimal-counter")) {
        // For decimal numbers
        currentValue = parseFloat(currentValue.toFixed(1));
        counter.textContent = currentValue;
      } else if (counter.classList.contains("ai-tb-counter")) {
        // For TB numbers
        currentValue = Math.floor(currentValue);
        counter.textContent = currentValue;
      } else if (counter.classList.contains("ai-efficiency-counter")) {
        // For efficiency percentage
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
        if (counter.classList.contains("ai-percent-counter")) {
          counter.textContent = end;
        } else if (counter.classList.contains("ai-decimal-counter")) {
          counter.textContent = end;
        } else if (counter.classList.contains("ai-tb-counter")) {
          counter.textContent = end;
        } else if (counter.classList.contains("ai-efficiency-counter")) {
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
        // 35 - AI Projects
        // Regular number, no special class needed
      } else if (index === 1) {
        // 96% - Model Accuracy
        counter.classList.add("ai-percent-counter");
      } else if (index === 2) {
        // 15 TB Data Processed
        counter.classList.add("ai-tb-counter");
      } else if (index === 3) {
        // 45% Efficiency Gain
        counter.classList.add("ai-efficiency-counter");
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
    const heroSection = document.querySelector(".ai-hero-section");

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

    const heroSection = document.querySelector(".ai-hero-section");
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
      const heroSection = document.querySelector(".ai-hero-section");
      if (heroSection && isInViewport(heroSection)) {
        startAllCounters();
      }
    }
  }, 3000);
}

// FAQ functionality
function initAIFAQ() {
  const faqItems = document.querySelectorAll(".ai-faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".ai-faq-question");

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
function initAIScrollAnimations() {
  // Check if IntersectionObserver is supported
  if (!("IntersectionObserver" in window)) {
    // Fallback for older browsers - just show all elements
    const elements = document.querySelectorAll(
      ".ai-service-card, .ai-tech-card, .ai-process-card, .ai-impact-card, .ai-testimonial-card, .ai-strategy-card, .ai-solution-card, .ai-excellence-item, .ai-feature-card",
    );
    elements.forEach((el) => {
      el.classList.add("ai-animated");
    });
    return;
  }

  // Create Intersection Observer for fade-in animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("ai-animated");
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
    ".ai-service-card, .ai-tech-card, .ai-process-card, .ai-impact-card, .ai-testimonial-card, .ai-strategy-card, .ai-solution-card, .ai-excellence-item, .ai-feature-card",
  );
  cards.forEach((card) => {
    observer.observe(card);
  });

  // Fallback for mobile - trigger animations on scroll
  function checkAnimationsOnScroll() {
    const elements = document.querySelectorAll(
      ".ai-service-card, .ai-tech-card, .ai-process-card, .ai-impact-card, .ai-testimonial-card, .ai-strategy-card, .ai-solution-card, .ai-excellence-item, .ai-feature-card",
    );

    elements.forEach((el) => {
      if (isElementInViewport(el) && !el.classList.contains("ai-animated")) {
        el.classList.add("ai-animated");
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
function initAIHoverEffects() {
  const cards = document.querySelectorAll(
    ".ai-service-card, .ai-tech-card, .ai-process-card, .ai-impact-card, .ai-testimonial-card, .ai-strategy-card, .ai-solution-card, .ai-feature-card, .ai-stat-item",
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
function addAIAnimationStyles() {
  const style = document.createElement("style");
  style.textContent = `
        .ai-service-card, .ai-tech-card, .ai-process-card, .ai-impact-card,
        .ai-testimonial-card, .ai-strategy-card, .ai-solution-card,
        .ai-excellence-item, .ai-feature-card, .ai-stat-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .ai-service-card.ai-animated, .ai-tech-card.ai-animated,
        .ai-process-card.ai-animated, .ai-impact-card.ai-animated,
        .ai-testimonial-card.ai-animated, .ai-strategy-card.ai-animated,
        .ai-solution-card.ai-animated, .ai-excellence-item.ai-animated,
        .ai-feature-card.ai-animated, .ai-stat-item.ai-animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Staggered animations */
        .ai-services-cards .ai-service-card:nth-child(1) { transition-delay: 0.1s; }
        .ai-services-cards .ai-service-card:nth-child(2) { transition-delay: 0.2s; }
        .ai-services-cards .ai-service-card:nth-child(3) { transition-delay: 0.3s; }
        .ai-services-cards .ai-service-card:nth-child(4) { transition-delay: 0.4s; }
        .ai-services-cards .ai-service-card:nth-child(5) { transition-delay: 0.5s; }
        
        .ai-tech-cards .ai-tech-card:nth-child(1) { transition-delay: 0.1s; }
        .ai-tech-cards .ai-tech-card:nth-child(2) { transition-delay: 0.2s; }
        .ai-tech-cards .ai-tech-card:nth-child(3) { transition-delay: 0.3s; }
        .ai-tech-cards .ai-tech-card:nth-child(4) { transition-delay: 0.4s; }
        
        .ai-process-cards .ai-process-card:nth-child(1) { transition-delay: 0.1s; }
        .ai-process-cards .ai-process-card:nth-child(2) { transition-delay: 0.2s; }
        .ai-process-cards .ai-process-card:nth-child(3) { transition-delay: 0.3s; }
        .ai-process-cards .ai-process-card:nth-child(4) { transition-delay: 0.4s; }
        
        .ai-impact-cards .ai-impact-card:nth-child(1) { transition-delay: 0.1s; }
        .ai-impact-cards .ai-impact-card:nth-child(2) { transition-delay: 0.2s; }
        .ai-impact-cards .ai-impact-card:nth-child(3) { transition-delay: 0.3s; }
        
        .ai-testimonial-cards .ai-testimonial-card:nth-child(1) { transition-delay: 0.1s; }
        .ai-testimonial-cards .ai-testimonial-card:nth-child(2) { transition-delay: 0.2s; }
        .ai-testimonial-cards .ai-testimonial-card:nth-child(3) { transition-delay: 0.3s; }
        
        .ai-strategy-cards .ai-strategy-card:nth-child(1) { transition-delay: 0.1s; }
        .ai-strategy-cards .ai-strategy-card:nth-child(2) { transition-delay: 0.2s; }
        .ai-strategy-cards .ai-strategy-card:nth-child(3) { transition-delay: 0.3s; }
        
        .ai-feature-cards .ai-feature-card:nth-child(1) { transition-delay: 0.1s; }
        .ai-feature-cards .ai-feature-card:nth-child(2) { transition-delay: 0.2s; }
        .ai-feature-cards .ai-feature-card:nth-child(3) { transition-delay: 0.3s; }
        .ai-feature-cards .ai-feature-card:nth-child(4) { transition-delay: 0.4s; }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            .ai-service-card, .ai-tech-card, .ai-process-card, .ai-impact-card,
            .ai-testimonial-card, .ai-strategy-card, .ai-solution-card,
            .ai-excellence-item, .ai-feature-card, .ai-stat-item {
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            /* Reduce animation delays on mobile for better performance */
            .ai-services-cards .ai-service-card,
            .ai-tech-cards .ai-tech-card,
            .ai-process-cards .ai-process-card,
            .ai-impact-cards .ai-impact-card,
            .ai-testimonial-cards .ai-testimonial-card,
            .ai-strategy-cards .ai-strategy-card,
            .ai-feature-cards .ai-feature-card {
                transition-delay: 0.1s !important;
            }
        }
    `;
  document.head.appendChild(style);
}

// Call the function to add animation styles
addAIAnimationStyles();

// Add a small fix for iOS Safari
if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
  // Fix for iOS Safari
  document.addEventListener("touchstart", function () {}, { passive: true });
}
