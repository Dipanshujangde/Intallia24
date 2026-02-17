// mobile-dev-scripts.js

document.addEventListener("DOMContentLoaded", function () {
  // Counter Animation for Stats
  const counters = document.querySelectorAll(".counter");
  const speed = 200; // The lower the slower

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => animateCounter(counter), 20);
    } else {
      // For decimal values like 4.8
      if (target % 1 !== 0) {
        counter.innerText = target.toFixed(1);
      } else {
        counter.innerText = target;
      }
    }
  };

  // Intersection Observer for counter animation
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        animateCounter(counter);
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter);
  });

  // FAQ Toggle Functionality
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement;
      const answer = question.nextElementSibling;

      // Close other open FAQs
      document.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== faqItem && item.classList.contains("active")) {
          item.classList.remove("active");
          item.querySelector(".faq-answer").classList.remove("active");
        }
      });

      // Toggle current FAQ
      faqItem.classList.toggle("active");
      answer.classList.toggle("active");
    });
  });

  // Card Hover Effects Enhancement
  const allCards = document.querySelectorAll(
    ".service-card, .framework-card, .feature-card, .process-card, .appstore-card, .testimonial-card, .strategy-card, .platform-card",
  );

  allCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Button Hover Effects
  const allButtons = document.querySelectorAll(
    ".btn-primary, .btn-secondary, .btn-launch-primary, .btn-launch-secondary",
  );

  allButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Mobile menu toggle for process cards (for vertical layout on mobile)
  const processCardsContainer = document.querySelector(".process-cards");

  function adjustProcessCardsLayout() {
    if (window.innerWidth <= 768) {
      // On mobile, ensure process cards stack vertically
      processCardsContainer.style.gridTemplateColumns = "1fr";
    } else {
      // On larger screens, use the grid layout
      processCardsContainer.style.gridTemplateColumns =
        "repeat(auto-fill, minmax(240px, 1fr))";
    }
  }

  // Run on load and resize
  adjustProcessCardsLayout();
  window.addEventListener("resize", adjustProcessCardsLayout);

  // App Store Success Card Animation
  const appstoreCards = document.querySelectorAll(".appstore-card");

  appstoreCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.animation = "pulse 1.5s infinite";
    });

    card.addEventListener("mouseleave", function () {
      this.style.animation = "none";
    });
  });

  // Initialize first FAQ as open
  const firstFaq = document.querySelector(".faq-item");
  if (firstFaq) {
    firstFaq.classList.add("active");
    firstFaq.querySelector(".faq-answer").classList.add("active");
  }
});
