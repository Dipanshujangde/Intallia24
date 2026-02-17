// Add interactive features for the project section
document.addEventListener("DOMContentLoaded", function () {
  // Button click animations
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;

      this.appendChild(ripple);

      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);

      // Add click tracking (for analytics)
      const buttonText = this.textContent.trim();
      console.log(`Button clicked: ${buttonText}`);

      // You can add analytics tracking here
      // Example: trackEvent('cta_click', buttonText);
    });
  });

  // Feature cards hover enhancement
  const featureCards = document.querySelectorAll(".feature-card");

  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".feature-icon");
      icon.style.animation = "iconSpin 0.5s ease";

      // Add subtle scale effect to entire card
      this.style.zIndex = "10";
    });

    card.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".feature-icon");
      icon.style.animation = "";

      // Reset z-index
      this.style.zIndex = "";
    });
  });

  // Animate numbers in trust indicators on scroll
  const indicators = document.querySelectorAll(".indicator-number");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const number = entry.target;
          const targetValue = parseInt(number.textContent);
          const hasPlus = number.textContent.includes("+");
          const hasPercent = number.textContent.includes("%");

          animateCounter(number, targetValue, hasPlus, hasPercent);
          observer.unobserve(number);
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  indicators.forEach((indicator) => {
    observer.observe(indicator);
  });

  // Counter animation function
  function animateCounter(element, target, hasPlus, hasPercent) {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      let displayValue = Math.floor(current);
      if (hasPlus) displayValue += "+";
      if (hasPercent) displayValue += "%";

      element.textContent = displayValue;
    }, duration / steps);
  }

  // Add CSS for animations
  const style = document.createElement("style");
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes iconSpin {
            0% {
                transform: scale(1) rotate(0deg);
            }
            50% {
                transform: scale(1.2) rotate(180deg);
            }
            100% {
                transform: scale(1.1) rotate(360deg);
            }
        }
    `;
  document.head.appendChild(style);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href !== "#") {
        e.preventDefault();

        const targetElement = document.querySelector(href);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    });
  });
});
