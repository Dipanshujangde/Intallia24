// Agile Process Section Animation
document.addEventListener("DOMContentLoaded", function () {
  // Get all process cards
  const processCards = document.querySelectorAll(".process-card");

  // Create an Intersection Observer to trigger animations when cards come into view
  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: "0px 0px -100px 0px", // Start animation slightly before element comes into view
    threshold: 0.1, // Trigger when at least 10% of the element is visible
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      // If the element is in the viewport
      if (entry.isIntersecting) {
        // For desktop, we want to animate cards one by one with a delay
        if (window.innerWidth >= 992) {
          // Get the index of the card
          const card = entry.target;
          const cardIndex = Array.from(processCards).indexOf(card);

          // Set a delay based on the card index for sequential animation
          setTimeout(() => {
            card.classList.add("animated");
          }, cardIndex * 200); // 200ms delay between each card
        } else {
          // For mobile/tablet, animate immediately
          entry.target.classList.add("animated");
        }

        // Stop observing the element after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe each process card
  processCards.forEach((card) => {
    observer.observe(card);
  });

  // Animate timeline icons on scroll
  const timelineIcons = document.querySelectorAll(".timeline-icon");

  const iconObserverOptions = {
    root: null,
    rootMargin: "0px 0px -50px 0px",
    threshold: 0.5,
  };

  const iconObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add animation class with delay based on index
        setTimeout(() => {
          entry.target.classList.add("icon-animated");
        }, index * 150);

        iconObserver.unobserve(entry.target);
      }
    });
  }, iconObserverOptions);

  // Observe each timeline icon
  timelineIcons.forEach((icon) => {
    iconObserver.observe(icon);
  });

  // Add hover effect enhancement with JavaScript
  processCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.zIndex = "10"; // Bring to front on hover
    });

    card.addEventListener("mouseleave", function () {
      this.style.zIndex = "2"; // Reset z-index
    });
  });

  // Handle window resize to reset animations if needed
  let resizeTimeout;
  window.addEventListener("resize", function () {
    // Clear the timeout if it exists
    clearTimeout(resizeTimeout);

    // Set a new timeout to handle the resize after user stops resizing
    resizeTimeout = setTimeout(function () {
      // Re-initialize the observer on resize for responsiveness
      processCards.forEach((card) => {
        // Only reset if the card is not already animated
        if (!card.classList.contains("animated")) {
          observer.observe(card);
        }
      });
    }, 250);
  });
});

// Add additional CSS for icon animations
const style = document.createElement("style");
style.textContent = `
    .icon-animated {
        animation: iconBounce 0.6s ease forwards;
    }
    
    @keyframes iconBounce {
        0% {
            transform: scale(0.8);
            opacity: 0.7;
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
