// FAQ Accordion Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Select all FAQ items
  const faqItems = document.querySelectorAll(".faq-single-item");

  // Function to close all FAQ items
  function closeAllFaqItems() {
    faqItems.forEach((item) => {
      item.classList.remove("faq-active");
      const answer = item.querySelector(".faq-answer-content");
      answer.style.maxHeight = "0";
    });
  }

  // Function to open specific FAQ item
  function openFaqItem(item) {
    const answer = item.querySelector(".faq-answer-content");
    item.classList.add("faq-active");
    answer.style.maxHeight = answer.scrollHeight + "px";
  }

  // Function to toggle FAQ item
  function toggleFaqItem(item) {
    const isActive = item.classList.contains("faq-active");

    // Close all items first
    closeAllFaqItems();

    // If clicked item wasn't active, open it
    if (!isActive) {
      openFaqItem(item);
    }
  }

  // Add click event to all FAQ questions
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question-wrapper");

    question.addEventListener("click", function () {
      toggleFaqItem(item);

      // Add bounce effect to icon
      const icon = this.querySelector(".faq-toggle-icon");
      icon.style.transform = "scale(0.9)";
      setTimeout(() => {
        if (item.classList.contains("faq-active")) {
          icon.style.transform = "rotate(180deg)";
        } else {
          icon.style.transform = "";
        }
      }, 150);
    });

    // Add keyboard support
    question.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleFaqItem(item);
      }
    });

    // Make focusable for accessibility
    question.setAttribute("tabindex", "0");
    question.setAttribute("role", "button");
    question.setAttribute("aria-expanded", "false");
  });

  // Initialize - open first FAQ item
  if (faqItems.length > 0) {
    openFaqItem(faqItems[0]);
  }

  // Update aria attributes
  function updateAriaAttributes() {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question-wrapper");
      const isExpanded = item.classList.contains("faq-active");
      question.setAttribute("aria-expanded", isExpanded.toString());
    });
  }

  // Update aria attributes on toggle
  document.addEventListener("click", function (e) {
    if (e.target.closest(".faq-question-wrapper")) {
      setTimeout(updateAriaAttributes, 10);
    }
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    faqItems.forEach((item) => {
      if (item.classList.contains("faq-active")) {
        const answer = item.querySelector(".faq-answer-content");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // Initialize console message
  console.log("FAQ section initialized with " + faqItems.length + " questions");
});
