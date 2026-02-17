document.addEventListener("DOMContentLoaded", function () {
  // Counter Animation for Stats
  const automationCounters = document.querySelectorAll(".automation-counter");
  const automationSpeed = 200; // The lower the slower

  const automationAnimateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = target / automationSpeed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => automationAnimateCounter(counter), 20);
    } else {
      counter.innerText = target;
    }
  };

  // Intersection Observer for counter animation
  const automationObserverOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const automationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        automationAnimateCounter(counter);
        automationObserver.unobserve(counter);
      }
    });
  }, automationObserverOptions);

  automationCounters.forEach((counter) => {
    automationObserver.observe(counter);
  });

  // FAQ Toggle Functionality
  const automationFaqQuestions = document.querySelectorAll(
    ".automation-faq-question",
  );

  automationFaqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const automationFaqItem = question.parentElement;
      const automationAnswer = question.nextElementSibling;

      // Close other open FAQs
      document.querySelectorAll(".automation-faq-item").forEach((item) => {
        if (item !== automationFaqItem && item.classList.contains("active")) {
          item.classList.remove("active");
          item
            .querySelector(".automation-faq-answer")
            .classList.remove("active");
        }
      });

      // Toggle current FAQ
      automationFaqItem.classList.toggle("active");
      automationAnswer.classList.toggle("active");
    });
  });

  // Card Hover Effects Enhancement
  const automationAllCards = document.querySelectorAll(
    ".automation-service-card, .automation-tech-card, .automation-feature-card, .automation-process-card, .automation-success-card, .automation-testimonial-card, .automation-strategy-card, .automation-platform-card, .automation-excellence-item",
  );

  automationAllCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      if (window.innerWidth > 768) {
        this.style.transform = "translateY(-10px)";
      }
    });

    card.addEventListener("mouseleave", function () {
      if (window.innerWidth > 768) {
        this.style.transform = "translateY(0)";
      }
    });
  });

  // Button Hover Effects
  const automationAllButtons = document.querySelectorAll(
    ".automation-btn-primary1, .automation-btn-secondary1, .automation-btn-launch-primary, .automation-btn-launch-secondary",
  );

  automationAllButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Mobile menu toggle for process cards (for vertical layout on mobile)
  const automationProcessCardsContainer = document.querySelector(
    ".automation-process-cards",
  );

  function automationAdjustProcessCardsLayout() {
    if (window.innerWidth <= 768) {
      // On mobile, ensure process cards stack vertically
      if (automationProcessCardsContainer) {
        automationProcessCardsContainer.style.gridTemplateColumns = "1fr";
      }
    } else {
      // On larger screens, use the grid layout
      if (automationProcessCardsContainer) {
        automationProcessCardsContainer.style.gridTemplateColumns =
          "repeat(auto-fill, minmax(240px, 1fr))";
      }
    }
  }

  // Run on load and resize
  automationAdjustProcessCardsLayout();
  window.addEventListener("resize", automationAdjustProcessCardsLayout);

  // Automation Success Card Animation
  const automationSuccessCards = document.querySelectorAll(
    ".automation-success-card",
  );

  automationSuccessCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.animation = "automation-pulse 1.5s infinite";
    });

    card.addEventListener("mouseleave", function () {
      this.style.animation = "none";
    });
  });

  // Initialize first FAQ as open
  const firstAutomationFaq = document.querySelector(".automation-faq-item");
  if (firstAutomationFaq) {
    firstAutomationFaq.classList.add("active");
    firstAutomationFaq
      .querySelector(".automation-faq-answer")
      .classList.add("active");
  }

  // Add scroll animation for sections
  const automationSections = document.querySelectorAll("section");

  const automationSectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          entry.target.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  // Set initial styles for animation
  automationSections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    automationSectionObserver.observe(section);
  });

  // Icon rotation animations
  const automationIcons = document.querySelectorAll(
    ".automation-title-icon, .automation-tech-icon, .automation-strategy-icon, .automation-success-icon, .automation-platform-icon",
  );

  automationIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      if (window.innerWidth > 768) {
        this.style.transform = "rotate(15deg) scale(1.1)";
      }
    });

    icon.addEventListener("mouseleave", function () {
      if (window.innerWidth > 768) {
        if (this.classList.contains("automation-title-icon")) {
          // Reset to floating animation for hero icon
          this.style.transform = "translateY(0)";
        } else {
          this.style.transform = "rotate(0) scale(1)";
        }
      }
    });
  });

  // Add a subtle animation to service icons
  const automationServiceIcons = document.querySelectorAll(
    ".automation-service-icon",
  );

  automationServiceIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      this.style.transition = "all 0.5s ease";
    });
  });

  // Animate stat items on scroll
  const automationStatItems = document.querySelectorAll(
    ".automation-stat-item",
  );

  const automationStatObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 100);
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  // Set initial styles for stat items
  automationStatItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    automationStatObserver.observe(item);
  });

  // Add loading animation for cards
  const automationCards = document.querySelectorAll(
    ".automation-service-card, .automation-tech-card, .automation-feature-card",
  );

  const automationCardsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 100);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  // Set initial styles for cards
  automationCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    automationCardsObserver.observe(card);
  });
});
