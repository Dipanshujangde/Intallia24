// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize FAQ functionality
  initProcessFAQ();

  // Add hover effect to all cards
  initCardHoverEffects();

  // Add scroll animation for cards
  initScrollAnimations();
});

// Process FAQ toggle functionality
function initProcessFAQ() {
  const faqItems = document.querySelectorAll(".process-faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".process-faq-question");

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

// Add hover effect to all cards
function initCardHoverEffects() {
  const cards = document.querySelectorAll(
    ".principle-card, .journey-card, .collaborative-card, .dev-process-card"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// Initialize scroll animations for cards
function initScrollAnimations() {
  // Create Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
      }
    });
  }, observerOptions);

  // Observe all cards for animation
  const cards = document.querySelectorAll(
    ".principle-card, .journey-card, .collaborative-card, .dev-process-card"
  );
  cards.forEach((card) => {
    observer.observe(card);
  });
}

// Add CSS for animations (injected dynamically)
function addAnimationStyles() {
  const style = document.createElement("style");
  style.textContent = `
        .principle-card, .journey-card, .collaborative-card, .dev-process-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .principle-card.animated, .journey-card.animated, 
        .collaborative-card.animated, .dev-process-card.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Staggered animations */
        .principles-cards .principle-card:nth-child(1) { transition-delay: 0.1s; }
        .principles-cards .principle-card:nth-child(2) { transition-delay: 0.2s; }
        .principles-cards .principle-card:nth-child(3) { transition-delay: 0.3s; }
        .principles-cards .principle-card:nth-child(4) { transition-delay: 0.4s; }
        
        .journey-cards .journey-card:nth-child(1) { transition-delay: 0.1s; }
        .journey-cards .journey-card:nth-child(2) { transition-delay: 0.2s; }
        .journey-cards .journey-card:nth-child(3) { transition-delay: 0.3s; }
        .journey-cards .journey-card:nth-child(4) { transition-delay: 0.4s; }
        .journey-cards .journey-card:nth-child(5) { transition-delay: 0.5s; }
        .journey-cards .journey-card:nth-child(6) { transition-delay: 0.6s; }
        
        .collaborative-cards .collaborative-card:nth-child(1) { transition-delay: 0.1s; }
        .collaborative-cards .collaborative-card:nth-child(2) { transition-delay: 0.2s; }
        .collaborative-cards .collaborative-card:nth-child(3) { transition-delay: 0.3s; }
        .collaborative-cards .collaborative-card:nth-child(4) { transition-delay: 0.4s; }
        
        .dev-process-cards .dev-process-card:nth-child(1) { transition-delay: 0.1s; }
        .dev-process-cards .dev-process-card:nth-child(2) { transition-delay: 0.2s; }
        .dev-process-cards .dev-process-card:nth-child(3) { transition-delay: 0.3s; }
    `;
  document.head.appendChild(style);
}

// Call the function to add animation styles
addAnimationStyles();
