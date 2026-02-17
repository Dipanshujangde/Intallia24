document.addEventListener("DOMContentLoaded", function () {
  // Get all cards and dots
  const cards = document.querySelectorAll(".card");
  const dots = document.querySelectorAll(".dot");
  const readMoreButtons = document.querySelectorAll(".read-more-btn");

  // Initialize - first card is active
  let activeCard = 1;

  // Function to activate a specific card
  function activateCard(cardNumber) {
    // If clicking the already active card, do nothing
    if (cardNumber === activeCard) return;

    // Close the currently active card with slide animation
    const currentActiveCard = document.querySelector(
      `.card[data-card="${activeCard}"]`
    );
    const currentCardContent = currentActiveCard.querySelector(".card-content");
    const currentReadMoreBtn =
      currentActiveCard.querySelector(".read-more-btn");
    const currentDetails = currentActiveCard.querySelector(".card-details");

    // Close details if expanded
    if (currentDetails.classList.contains("expanded")) {
      currentDetails.classList.remove("expanded");
      currentReadMoreBtn.classList.remove("expanded");
      currentReadMoreBtn.querySelector(".read-more-text").textContent =
        "Read More";
    }

    // Animate closing current card
    currentActiveCard.style.transform = "translateX(-100%)";
    currentActiveCard.style.opacity = "0";

    setTimeout(() => {
      // Remove active class from current card and dot
      currentActiveCard.classList.remove("active");
      document
        .querySelector(`.dot[data-card="${activeCard}"]`)
        .classList.remove("active");

      // Add active class to new card and dot
      const newCard = document.querySelector(
        `.card[data-card="${cardNumber}"]`
      );
      newCard.classList.add("active");
      document
        .querySelector(`.dot[data-card="${cardNumber}"]`)
        .classList.add("active");

      // Reset transform and opacity for new card
      newCard.style.transform = "translateX(0)";
      newCard.style.opacity = "1";

      // Update active card
      activeCard = cardNumber;

      // Re-arrange cards in the stack
      arrangeCards();
    }, 300);
  }

  // Function to arrange cards in stack based on active card
  function arrangeCards() {
    cards.forEach((card) => {
      const cardNumber = parseInt(card.getAttribute("data-card"));

      // Reset styles for all cards
      card.style.transform = "";
      card.style.opacity = "";
      card.style.marginLeft = "";

      if (cardNumber === activeCard) {
        // Active card - position normally
        card.style.zIndex = "10";
      } else if (cardNumber > activeCard) {
        // Cards to the right of active card
        const offset = (cardNumber - activeCard - 1) * 80 + 80;
        card.style.marginLeft = `-${offset}px`;
        card.style.zIndex = (10 - (cardNumber - activeCard)).toString();
      } else {
        // Cards to the left of active card
        card.style.zIndex = (10 - (activeCard - cardNumber)).toString();
      }
    });
  }

  // Function to toggle read more/less for a card
  function toggleReadMore(card) {
    const cardDetails = card.querySelector(".card-details");
    const readMoreBtn = card.querySelector(".read-more-btn");
    const readMoreText = readMoreBtn.querySelector(".read-more-text");

    if (cardDetails.classList.contains("expanded")) {
      // Collapse details
      cardDetails.classList.remove("expanded");
      readMoreBtn.classList.remove("expanded");
      readMoreText.textContent = "Read More";
    } else {
      // Expand details
      cardDetails.classList.add("expanded");
      readMoreBtn.classList.add("expanded");
      readMoreText.textContent = "Read Less";
    }
  }

  // Add click event to each card
  cards.forEach((card) => {
    card.addEventListener("click", function (e) {
      // Don't activate if clicking on read more button or toggle button
      if (
        e.target.closest(".read-more-btn") ||
        e.target.closest(".card-toggle")
      ) {
        return;
      }

      const cardNumber = parseInt(this.getAttribute("data-card"));
      activateCard(cardNumber);
    });
  });

  // Add click event to card toggle buttons
  document.querySelectorAll(".card-toggle").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      const card = this.closest(".card");
      const cardNumber = parseInt(card.getAttribute("data-card"));

      // If this card is not active, activate it
      if (!card.classList.contains("active")) {
        activateCard(cardNumber);
      }
    });
  });

  // Add click event to dots
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const cardNumber = parseInt(this.getAttribute("data-card"));
      activateCard(cardNumber);
    });
  });

  // Add click event to read more buttons
  readMoreButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      const card = this.closest(".card");
      toggleReadMore(card);
    });
  });

  // Initialize card arrangement
  arrangeCards();

  // Optional: Auto-rotate cards every 8 seconds
  let autoRotateInterval;

  function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
      let nextCard = activeCard + 1;
      if (nextCard > 6) nextCard = 1;
      activateCard(nextCard);
    }, 3000);
  }

  function stopAutoRotate() {
    clearInterval(autoRotateInterval);
  }

  // Start auto-rotate
  startAutoRotate();

  // Pause auto-rotate when user interacts with cards
  const cardsContainer = document.querySelector(".cards-wrapper");
  cardsContainer.addEventListener("mouseenter", stopAutoRotate);
  cardsContainer.addEventListener("mouseleave", startAutoRotate);

  // Also pause on touch for mobile
  cardsContainer.addEventListener("touchstart", stopAutoRotate);

  // Add keyboard navigation support
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      let nextCard = activeCard + 1;
      if (nextCard > 6) nextCard = 1;
      activateCard(nextCard);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      let prevCard = activeCard - 1;
      if (prevCard < 1) prevCard = 6;
      activateCard(prevCard);
    }
  });
});
