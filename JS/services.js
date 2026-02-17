// Our Services Section Interactions

document.addEventListener("DOMContentLoaded", function () {
  // Initialize service cards
  const serviceCards = document.querySelectorAll(".service-card");

  // Add scroll animation observer
  const cardObserverOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("card-visible");
        cardObserver.unobserve(entry.target);
      }
    });
  }, cardObserverOptions);

  // Set initial state and observe cards
  serviceCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    cardObserver.observe(card);
  });

  // Handle card hover effects
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      // Add zoom in effect
      this.style.transform = "translateY(-15px) scale(1.03)";

      // Add border glow effect
      this.style.boxShadow = "0 20px 40px rgba(6, 182, 212, 0.25)";

      // Start icon rotation
      const icon = this.querySelector(".card-icon");
      icon.style.transform = "rotateY(360deg)";
    });

    card.addEventListener("mouseleave", function () {
      // Reset to original position if not scrolled
      if (!this.classList.contains("card-visible")) {
        this.style.transform = "translateY(30px)";
      } else {
        this.style.transform = "translateY(0) scale(1)";
      }

      // Remove border glow
      this.style.boxShadow = "0 8px 25px rgba(16, 185, 129, 0.1)";

      // Reset icon rotation
      const icon = this.querySelector(".card-icon");
      icon.style.transform = "rotateY(0)";
    });
  });

  // Handle intersection callback
  cardObserver.POLL_INTERVAL = 100;
  cardObserver.HANDLE_EVENTS = true;

  // Custom CSS class for visible cards
  const style = document.createElement("style");
  style.textContent = `
    .service-card.card-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // Handle "Learn More" button clicks - MODIFIED TO DIRECT NAVIGATION
  const learnMoreBtns = document.querySelectorAll(".learn-more-btn");

  learnMoreBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");

      // Add click animation for feedback
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);

      // DIRECT NAVIGATION - simply navigate to the href
      // Ensure your service pages exist at these URLs:
      // - web-development.html
      // - mobile-apps.html
      // - cloud-solutions.html
      // - digital-marketing.html
      // - ai-solutions.html
      // - seo-services.html
      window.location.href = href;
    });
  });

  // Add gradient animation to main heading
  const mainHeading = document.querySelector(".main-heading");
  if (mainHeading) {
    let hue = 160; // Starting green-blue hue

    function updateHeadingGradient() {
      // Cycle through green-blue hues
      hue = (hue + 0.5) % 360;
      const color1 = `hsl(${hue}, 85%, 45%)`;
      const color2 = `hsl(${(hue + 20) % 360}, 90%, 50%)`;

      mainHeading.style.color = `linear-gradient(90deg, ${color1}, ${color2})`;
      mainHeading.style.background = `linear-gradient(90deg, ${color1}, ${color2})`;
      mainHeading.style.webkitBackgroundClip = "text";
      mainHeading.style.backgroundClip = "text";
      requestAnimationFrame(updateHeadingGradient);
    }

    // Start the gradient animation
    requestAnimationFrame(updateHeadingGradient);
  }
});
