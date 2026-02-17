// DOM Elements
const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");
const resetFormBtn = document.getElementById("resetForm");

// Form input elements
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const serviceInput = document.getElementById("service");
const messageInput = document.getElementById("message");

// Error display elements
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const messageError = document.getElementById("messageError");

// Regular expressions for validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;

// Initialize form on load
document.addEventListener("DOMContentLoaded", function () {
  console.log("Contact form initialized");

  // Set initial state
  if (successMessage) {
    successMessage.style.display = "none";
  }

  // Debug: Check if elements exist
  console.log("Form elements found:", {
    contactForm: !!contactForm,
    nameInput: !!nameInput,
    emailInput: !!emailInput,
    phoneInput: !!phoneInput,
    messageInput: !!messageInput,
  });

  // Add shake animation for form errors
  const style = document.createElement("style");
  style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .input-error {
            border-color: #f56565 !important;
            box-shadow: 0 0 0 2px rgba(245, 101, 101, 0.2) !important;
        }
        .input-success {
            border-color: #10b981 !important;
        }
    `;
  document.head.appendChild(style);
});

// Function to display error message
function showError(element, message, inputElement = null) {
  if (element) {
    element.textContent = message;
    element.style.opacity = "1";
    element.style.color = "#f56565";
    element.style.fontSize = "0.85rem";
    element.style.marginTop = "5px";
    element.style.minHeight = "20px";
    element.style.display = "block";
  }

  // Highlight the input field
  const input =
    inputElement ||
    element?.parentElement?.querySelector("input, textarea, select");
  if (input) {
    input.classList.add("input-error");
    input.classList.remove("input-success");
  }
}

// Function to show success state
function showSuccess(inputElement) {
  if (inputElement) {
    inputElement.classList.remove("input-error");
    inputElement.classList.add("input-success");
  }
}

// Function to clear error message
function clearError(element) {
  if (element) {
    element.textContent = "";
    element.style.opacity = "0";
    element.style.display = "none";
  }
}

// Function to validate name
function validateName() {
  const nameValue = nameInput.value.trim();

  if (nameValue === "") {
    showError(nameError, "Name is required", nameInput);
    return false;
  } else if (nameValue.length < 2) {
    showError(nameError, "Name must be at least 2 characters", nameInput);
    return false;
  } else if (nameValue.length > 50) {
    showError(nameError, "Name cannot exceed 50 characters", nameInput);
    return false;
  } else {
    clearError(nameError);
    showSuccess(nameInput);
    return true;
  }
}

// Function to validate email
function validateEmail() {
  const emailValue = emailInput.value.trim();

  if (emailValue === "") {
    showError(emailError, "Email is required", emailInput);
    return false;
  } else if (!emailRegex.test(emailValue)) {
    showError(
      emailError,
      "Please enter a valid email address (e.g., name@example.com)",
      emailInput
    );
    return false;
  } else {
    clearError(emailError);
    showSuccess(emailInput);
    return true;
  }
}

// Function to validate phone (REQUIRED - based on your HTML)
function validatePhone() {
  const phoneValue = phoneInput.value.trim();

  if (phoneValue === "") {
    showError(phoneError, "Phone number is required", phoneInput);
    return false;
  } else if (!phoneRegex.test(phoneValue)) {
    showError(
      phoneError,
      "Please enter a valid phone number (10-15 digits)",
      phoneInput
    );
    return false;
  }

  // Additional check for minimum digits
  const digitsOnly = phoneValue.replace(/\D/g, "");
  if (digitsOnly.length < 10) {
    showError(
      phoneError,
      "Phone number must have at least 10 digits",
      phoneInput
    );
    return false;
  }

  clearError(phoneError);
  showSuccess(phoneInput);
  return true;
}

// Function to validate message
function validateMessage() {
  const messageValue = messageInput.value.trim();

  if (messageValue === "") {
    showError(messageError, "Message is required", messageInput);
    return false;
  } else if (messageValue.length < 10) {
    showError(
      messageError,
      "Message must be at least 10 characters",
      messageInput
    );
    return false;
  } else if (messageValue.length > 1000) {
    showError(
      messageError,
      "Message cannot exceed 1000 characters",
      messageInput
    );
    return false;
  } else {
    clearError(messageError);
    showSuccess(messageInput);
    return true;
  }
}

// Function to validate service (optional)
function validateService() {
  const serviceValue = serviceInput.value;
  if (serviceValue) {
    showSuccess(serviceInput);
  }
  return true; // Service is optional
}

// Real-time validation as user types
if (nameInput) {
  nameInput.addEventListener("input", function () {
    validateName();
  });
}

if (emailInput) {
  emailInput.addEventListener("input", function () {
    validateEmail();
  });
}

if (phoneInput) {
  phoneInput.addEventListener("input", function () {
    validatePhone();
  });
}

if (messageInput) {
  messageInput.addEventListener("input", function () {
    validateMessage();
  });
}

if (serviceInput) {
  serviceInput.addEventListener("change", function () {
    validateService();
  });
}

// Add focus effects to inputs
const inputs = document.querySelectorAll(
  ".input-container input, .input-container textarea, .input-container select"
);

inputs.forEach((input) => {
  // Focus effect
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "scale(1.02)";
    this.style.transition = "all 0.3s ease";
    this.style.backgroundColor = "#ffffff";
  });

  // Blur effect with validation
  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "scale(1)";
    this.style.transition = "all 0.3s ease";

    // Validate specific fields on blur
    switch (this.id) {
      case "name":
        validateName();
        break;
      case "email":
        validateEmail();
        break;
      case "phone":
        validatePhone();
        break;
      case "message":
        validateMessage();
        break;
      case "service":
        validateService();
        break;
    }
  });

  // Initial setup
  input.style.transition = "all 0.3s ease";
});

// Form submission handler
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Form submission started...");

    // Validate all required fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isMessageValid = validateMessage();
    const isServiceValid = validateService();

    console.log("Validation results:", {
      name: isNameValid,
      email: isEmailValid,
      phone: isPhoneValid,
      message: isMessageValid,
      service: isServiceValid,
    });

    // If all validations pass
    if (
      isNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isMessageValid &&
      isServiceValid
    ) {
      console.log("All validations passed");

      // Show loading state on button
      const submitBtn = document.querySelector(".submit-btn");
      if (submitBtn) {
        const btnText = submitBtn.querySelector(".btn-text");
        if (btnText) {
          const originalText = btnText.textContent;
          btnText.textContent = "Sending...";
          submitBtn.disabled = true;
          submitBtn.style.opacity = "0.8";
          submitBtn.style.cursor = "not-allowed";

          // Simulate form submission
          setTimeout(() => {
            console.log("Form submission successful");

            // Hide form and show success message
            if (contactForm && successMessage) {
              contactForm.style.display = "none";
              successMessage.style.display = "block";

              // Reset button state
              btnText.textContent = originalText;
              submitBtn.disabled = false;
              submitBtn.style.opacity = "1";
              submitBtn.style.cursor = "pointer";

              // Log form data
              const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                service: serviceInput.value || "Not specified",
                message: messageInput.value.trim(),
                timestamp: new Date().toISOString(),
              };

              console.log("Form submitted with data:", formData);

              // Optional: Send data to server
              // sendFormData(formData);
            }
          }, 1500);
        }
      }
    } else {
      console.log("Validation failed");

      // Shake form to indicate errors
      contactForm.style.animation = "none";
      void contactForm.offsetWidth; // Trigger reflow

      contactForm.style.animation = "shake 0.5s ease-in-out";

      // Remove shake animation after it completes
      setTimeout(() => {
        contactForm.style.animation = "";
      }, 500);

      // Scroll to first error
      const firstError = document.querySelector(
        '.error-message[style*="display: block"]'
      );
      if (firstError) {
        firstError.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  });
}

// Reset form functionality
if (resetFormBtn) {
  resetFormBtn.addEventListener("click", function () {
    console.log("Resetting form...");

    // Reset form values
    if (contactForm) {
      contactForm.reset();
      contactForm.style.display = "flex";
    }

    // Clear all error messages
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((error) => {
      error.textContent = "";
      error.style.opacity = "0";
      error.style.display = "none";
    });

    // Reset all input styles
    inputs.forEach((input) => {
      input.classList.remove("input-error", "input-success");
      input.style.borderColor = "";
      input.style.boxShadow = "";
      input.style.backgroundColor = "#f8fafc";
      if (input.parentElement) {
        input.parentElement.style.transform = "scale(1)";
      }
    });

    // Hide success message
    if (successMessage) {
      successMessage.style.display = "none";
    }

    // Focus on first input
    if (nameInput) {
      nameInput.focus();
    }
  });
}

// Optional: Function to send data to server
function sendFormData(formData) {
  // Example using Fetch API
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        // Show success message
        if (contactForm && successMessage) {
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Show error message to user
        alert('There was an error submitting the form. Please try again.');
        
        // Reset button state
        const submitBtn = document.querySelector('.submit-btn');
        if (submitBtn) {
            const btnText = submitBtn.querySelector('.btn-text');
            if (btnText) {
                btnText.textContent = 'Send Message';
            }
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        }
    });
}

// Keyboard shortcuts for better UX
document.addEventListener("keydown", function (e) {
  // Ctrl/Cmd + Enter to submit form
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    if (contactForm && contactForm.style.display !== "none") {
      const submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      contactForm.dispatchEvent(submitEvent);
    }
  }

  // Escape to reset form when in success message
  if (
    e.key === "Escape" &&
    successMessage &&
    successMessage.style.display === "block"
  ) {
    if (resetFormBtn) {
      resetFormBtn.click();
    }
  }
});

// Character counter for message (optional)
if (messageInput) {
  // Create character counter element
  const charCounter = document.createElement("div");
  charCounter.className = "char-counter";
  charCounter.style.fontSize = "0.8rem";
  charCounter.style.color = "#718096";
  charCounter.style.textAlign = "right";
  charCounter.style.marginTop = "5px";
  charCounter.style.display = "none";

  // Insert after textarea
  messageInput.parentElement.appendChild(charCounter);

  messageInput.addEventListener("input", function () {
    const charCount = this.value.length;
    const maxChars = 1000;

    if (charCount > 0) {
      charCounter.style.display = "block";
      charCounter.textContent = `${charCount}/${maxChars} characters`;

      // Change color based on count
      if (charCount > maxChars) {
        charCounter.style.color = "#f56565";
        this.style.borderColor = "#f56565";
      } else if (charCount > maxChars * 0.9) {
        charCounter.style.color = "#f59e0b";
      } else {
        charCounter.style.color = "#10b981";
      }
    } else {
      charCounter.style.display = "none";
    }
  });
}
