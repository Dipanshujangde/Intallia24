// footer.js
document.addEventListener("DOMContentLoaded", function () {
  // Set current year in copyright
  const currentYear = new Date().getFullYear();
  document.getElementById("current-year").textContent = currentYear;

  // Add smooth scrolling to anchor links
  const anchorLinks = document.querySelectorAll('.footer-links a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    const newsletterInput = newsletterForm.querySelector('input[type="email"]');
    const subscribeBtn = newsletterForm.querySelector(".btn-subscribe");

    subscribeBtn.addEventListener("click", function () {
      const email = newsletterInput.value.trim();

      if (!email) {
        showNotification("Please enter your email address", "error");
        newsletterInput.focus();
        return;
      }

      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address", "error");
        newsletterInput.focus();
        return;
      }

      // In a real app, you would send this to a server
      showNotification(
        "Thank you for subscribing to our newsletter!",
        "success"
      );
      newsletterInput.value = "";

      // Animate the button
      this.textContent = "Subscribed!";
      this.style.backgroundColor = "#1a7f5c";

      setTimeout(() => {
        this.textContent = "Subscribe";
        this.style.backgroundColor = "";
      }, 2000);
    });

    // Allow Enter key to submit
    newsletterInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        subscribeBtn.click();
      }
    });
  }

  // CTA buttons animation
  const ctaButtons = document.querySelectorAll(
    ".btn-primary, .btn-secondary, .btn-quote"
  );
  ctaButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Social icons animation enhancement
  const socialIcons = document.querySelectorAll(".social-icon");
  socialIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      const bg = this.querySelector(".icon-bg");
      bg.style.transform = "scale(1.1)";
    });

    icon.addEventListener("mouseleave", function () {
      const bg = this.querySelector(".icon-bg");
      bg.style.transform = "scale(1)";
    });
  });

  // Helper functions
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showNotification(message, type) {
    // Remove any existing notification
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 4px;
      color: white;
      font-weight: 500;
      z-index: 1000;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      animation: slideIn 0.3s ease;
    `;

    if (type === "success") {
      notification.style.backgroundColor = "#1a7f5c";
    } else {
      notification.style.backgroundColor = "#e53e3e";
    }

    // Add animation keyframes
    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);

    // Add to DOM
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Add hover effect to footer links
  const footerLinks = document.querySelectorAll(".footer-links a");
  footerLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.color = "#2dd4bf";
    });

    link.addEventListener("mouseleave", function () {
      if (!this.classList.contains("active")) {
        this.style.color = "";
      }
    });
  });
});
