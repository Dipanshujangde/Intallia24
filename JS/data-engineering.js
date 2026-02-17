// data-engineering-solutions.js

document.addEventListener("DOMContentLoaded", function () {
  // Counter Animation for Stats
  const dataCounters = document.querySelectorAll(".data-counter");
  const dataSpeed = 200; // The lower the slower

  const dataAnimateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = target / dataSpeed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => dataAnimateCounter(counter), 20);
    } else {
      // For decimal values like 99.5
      if (target % 1 !== 0) {
        counter.innerText = target.toFixed(1);
      } else {
        counter.innerText = target;
      }
    }
  };

  // Intersection Observer for counter animation
  const dataObserverOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const dataObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        dataAnimateCounter(counter);
        dataObserver.unobserve(counter);
      }
    });
  }, dataObserverOptions);

  dataCounters.forEach((counter) => {
    dataObserver.observe(counter);
  });

  // FAQ Toggle Functionality
  const dataFaqQuestions = document.querySelectorAll(".data-faq-question");

  dataFaqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const dataFaqItem = question.parentElement;
      const dataAnswer = question.nextElementSibling;

      // Close other open FAQs
      document.querySelectorAll(".data-faq-item").forEach((item) => {
        if (item !== dataFaqItem && item.classList.contains("active")) {
          item.classList.remove("active");
          item.querySelector(".data-faq-answer").classList.remove("active");
        }
      });

      // Toggle current FAQ
      dataFaqItem.classList.toggle("active");
      dataAnswer.classList.toggle("active");
    });
  });

  // Card Hover Effects Enhancement
  const dataAllCards = document.querySelectorAll(
    ".data-service-card, .data-tech-card, .data-feature-card, .data-process-card, .data-platform-card, .data-testimonial-card, .data-strategy-card, .data-cloud-card, .data-excellence-item",
  );

  dataAllCards.forEach((card) => {
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
  const dataAllButtons = document.querySelectorAll(
    ".data-btn-primary1, .data-btn-secondary1, .data-btn-launch-primary, .data-btn-launch-secondary",
  );

  dataAllButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Mobile menu toggle for process cards (for vertical layout on mobile)
  const dataProcessCardsContainer = document.querySelector(
    ".data-process-cards",
  );

  function dataAdjustProcessCardsLayout() {
    if (window.innerWidth <= 768) {
      // On mobile, ensure process cards stack vertically
      if (dataProcessCardsContainer) {
        dataProcessCardsContainer.style.gridTemplateColumns = "1fr";
      }
    } else {
      // On larger screens, use the grid layout
      if (dataProcessCardsContainer) {
        dataProcessCardsContainer.style.gridTemplateColumns =
          "repeat(auto-fill, minmax(240px, 1fr))";
      }
    }
  }

  // Run on load and resize
  dataAdjustProcessCardsLayout();
  window.addEventListener("resize", dataAdjustProcessCardsLayout);

  // Data Platform Success Card Animation
  const dataPlatformCards = document.querySelectorAll(".data-platform-card");

  dataPlatformCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.animation = "data-pulse 1.5s infinite";
    });

    card.addEventListener("mouseleave", function () {
      this.style.animation = "none";
    });
  });

  // Initialize first FAQ as open
  const firstDataFaq = document.querySelector(".data-faq-item");
  if (firstDataFaq) {
    firstDataFaq.classList.add("active");
    firstDataFaq.querySelector(".data-faq-answer").classList.add("active");
  }

  // Add scroll animation for sections
  const dataSections = document.querySelectorAll("section");

  const dataSectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  // Set initial styles for animation
  dataSections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    dataSectionObserver.observe(section);
  });

  // Icon rotation animations
  const dataIcons = document.querySelectorAll(
    ".data-title-icon, .data-tech-icon, .data-strategy-icon, .data-platform-icon",
  );

  dataIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      if (window.innerWidth > 768) {
        this.style.transform = "rotate(15deg) scale(1.1)";
      }
    });

    icon.addEventListener("mouseleave", function () {
      if (window.innerWidth > 768) {
        this.style.transform = "rotate(0) scale(1)";
      }
    });
  });
});
