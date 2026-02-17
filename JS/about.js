// Typewriter effect for "Intallia24"
function initTypewriter() {
  const textElement = document.querySelector(".typewriter-text");
  const originalText = textElement.textContent;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeWriter() {
    const currentText = originalText.substring(0, charIndex);
    textElement.textContent = currentText;

    if (!isDeleting && charIndex < originalText.length) {
      // Typing forward
      charIndex++;
      setTimeout(typeWriter, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
      // Deleting backward
      charIndex--;
      setTimeout(typeWriter, typingSpeed / 2);
    } else {
      // Switch between typing and deleting
      isDeleting = !isDeleting;

      // Pause at the end of typing or deleting
      setTimeout(typeWriter, isDeleting ? 1000 : 500);
    }
  }

  // Start the typewriter effect
  setTimeout(typeWriter, 1000);
}

// Developers data
const developers = [
  {
    name: "Bhavyadeep sharma",
    role: "Data Analyst",
    experience: "1.5+ years",
    tech: "Data Visualization, Python, Power BI",
    img: "/Images/profile-pic/bhavya.jpg",
  },
  {
    name: "Vishal Rajput",
    role: "Data Scientist",
    experience: "5+ years",
    tech: "Data Science, Data Analytics",
    img: "/Images/profile-pic/vishal.jpg",
  },
  {
    name: "Syed Faiz Jawed",
    role: "Senior Data Analyst",
    experience: "1.8+ years",
    tech: "Power BI, Excel, Power Platform",
    img: "/Images/profile-pic/faiz.jpg",
  },
  {
    name: "Purvansh Vishwakarma",
    role: "Data Analyst",
    experience: "1.5+ years",
    tech: "Data Visualization, Python, Power BI",
    img: "/Images/profile-pic/purvansh.jpg",
  },
  {
    name: "Akshita Bankey",
    role: "Java Developer",
    experience: "2+ years",
    tech: "Core Java,Adv. Java, Spring boot",
    img: "/Images/profile-pic/akshita.jpg",
  },
  {
    name: "Sejal Raykhere",
    role: "Financial Analyst",
    experience: "2+ years",
    tech: "Power BI, Tableu, Adv. Excel,",
    img: "/Images/profile-pic/sejal.jpg",
  },
  {
    name: "Pallavi Chaudhary",
    role: "Data Analyst",
    experience: "6+ months",
    tech: "SQL, Power BI, Excel",
    img: "/Images/profile-pic/pallavi.jpg",
  },
  {
    name: "Shreya Verma",
    role: "Human Resource Executive",
    experience: "6+ Month",
    tech: "Talent Acquisition, People Management",
    img: "/Images/profile-pic/shreyaa.jpg",
  },
  {
    name: "Ayush Raghuvanshi",
    role: "UI/UX Designer",
    experience: "Fresher",
    tech: "Adobe Cloud, Figma",
    img: "/Images/profile-pic/ayush.jpg",
  },
  {
    name: "Jeetendra Sahu",
    role: "MERN Stack Developer + Trainer",
    experience: "1+ years",
    tech: "MongoDB, Expressjs, Reactjs, Nodejs",
    img: "/Images/profile-pic/jeetu.jpg",
  },
  {
    name: "Sharad Soni",
    role: "Digital Marketing & social Media Manager",
    experience: "1+ years",
    tech: "Marketing Specialist, Lead Management",
    img: "/Images/profile-pic/sharad.jpg",
  },
  {
    name: "Dipanshu Jangde (DJ)",
    role: "Full Stack Developer",
    experience: "6+ month",
    tech: "MERN Stack, Frontend",
    img: "/Images/profile-pic/DJ.jpg",
  },
  {
    name: "Shubham Nagar",
    role: "Business Manager",
    experience: "5+ years",
    tech: "Data Analyst, Sales & marketing",
    img: "/Images/profile-pic/shubham.jpg",
  },
  {
    name: "Mia Martinez",
    role: "Business Analyst",
    experience: "8+ years",
    tech: "Requirements Analysis, Process Mapping",
    img: "https://randomuser.me/api/portraits/women/63.jpg",
  },
  {
    name: "Sarah Martinez",
    role: "Lead Web Architect",
    experience: "8+ years",
    tech: "Scalable Web & Mobile Apps",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Isabella Thomas",
    role: "Security Specialist",
    experience: "6+ years",
    tech: "Cybersecurity, Penetration Testing",
    img: "https://randomuser.me/api/portraits/women/41.jpg",
  },
];

// Function to create developer cards
function createDeveloperCards() {
  const container = document.getElementById("developersContainer");
  container.innerHTML = "";

  // Determine how many cards to show initially
  const showAll = container.classList.contains("show-all");
  const cardsToShow = showAll ? developers.length : 8;

  for (let i = 0; i < cardsToShow; i++) {
    const dev = developers[i];
    const card = document.createElement("div");
    card.className = "developer-card";
    card.innerHTML = `
            <img src="${dev.img}" alt="${dev.name}" class="profile-img">
            <h3 class="developer-name">${dev.name}</h3>
            <p class="developer-role">${dev.role}</p>
            <div class="developer-experience">
                <i class="fas fa-calendar-alt experience-icon"></i>
                <span>${dev.experience}</span>
            </div>
            <div class="developer-tech">${dev.tech}</div>
        `;
    container.appendChild(card);
  }
}

// Toggle view more/less developers
function toggleDevelopersView() {
  const container = document.getElementById("developersContainer");
  const button = document.getElementById("viewMoreBtn");

  if (container.classList.contains("show-all")) {
    // Switch to show less
    container.classList.remove("show-all");
    button.innerHTML =
      'View More Developers <i class="fas fa-chevron-down"></i>';
    button.classList.remove("active");
  } else {
    // Switch to show all
    container.classList.add("show-all");
    button.innerHTML = 'View Less Developers <i class="fas fa-chevron-up"></i>';
    button.classList.add("active");
  }

  createDeveloperCards();
}

// Counter animation for numbers section - FIXED VERSION
function initCounters() {
  const counters = document.querySelectorAll(".number-count");
  const speed = 500; // Animation duration in milliseconds

  counters.forEach((counter) => {
    // Reset counter if it's already been animated
    if (counter.hasAttribute("data-animated")) {
      return;
    }

    const target = +counter.getAttribute("data-target");
    const startValue = 0;
    const duration = speed;
    const startTime = Date.now();

    // Mark as animated to prevent re-animation
    counter.setAttribute("data-animated", "true");

    function updateCounter() {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const currentValue = Math.floor(
        startValue + (target - startValue) * easeOutQuart,
      );
      counter.textContent = currentValue.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    }

    updateCounter();
  });
}

// Improved Intersection Observer for counters
function initIntersectionObserver() {
  // Track if counters have already been animated
  let countersAnimated = false;

  const options = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px", // Trigger slightly before element is fully visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        initCounters();
      }
    });
  }, options);

  const numbersSection = document.querySelector(".numbers-section");
  if (numbersSection) {
    observer.observe(numbersSection);
  }
}

// FAQ toggle functionality
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Close other open items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      item.classList.toggle("active");
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize typewriter effect
  initTypewriter();

  // Create initial developer cards (8 only)
  createDeveloperCards();

  // Add event listener to view more button
  const viewMoreBtn = document.getElementById("viewMoreBtn");
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener("click", toggleDevelopersView);
  }

  // Initialize FAQ functionality
  initFAQ();

  // Initialize intersection observer for counters
  initIntersectionObserver();

  // Add hover effect to all cards
  const cards = document.querySelectorAll(
    ".card, .value-card, .developer-card, .number-card, .expertise-card",
  );
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = this.style.transform || "translateY(0)";
    });

    card.addEventListener("mouseleave", function () {
      if (
        !this.classList.contains("developer-card") ||
        !this.closest(".developers-grid").classList.contains("show-all")
      ) {
        this.style.transform = "translateY(0)";
      }
    });
  });
});
