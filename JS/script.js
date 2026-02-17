// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
const viewMoreServices = document.getElementById('viewMoreServices');
const consultationBtn = document.getElementById('consultationBtn');
const consultationModal = document.getElementById('consultationModal');
const closeModal = document.getElementById('closeModal');
const consultationForm = document.getElementById('consultationForm');
const sectionTitle = document.getElementById('sectionTitle');
const sectionDescription = document.getElementById('sectionDescription');

// Check if mobile view
function isMobileView() {
    return window.innerWidth <= 992;
}

// Toggle Mobile Menu
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Close all dropdowns when opening/closing mobile menu
    if (!navMenu.classList.contains('active')) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Handle dropdowns
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        // For mobile, handle dropdown toggle
        if (isMobileView()) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdown = toggle.parentElement;
            const isActive = dropdown.classList.contains('active');
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown').forEach(item => {
                if (item !== dropdown) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
            
            // Prevent closing the menu when clicking dropdown
            if (!isActive) {
                e.stopPropagation();
            }
        }
    });
});

// Close mobile menu when clicking on a non-dropdown link
navLinks.forEach(link => {
    if (!link.classList.contains('dropdown-toggle')) {
        link.addEventListener('click', () => {
            // If on mobile, close the menu after clicking a link
            if (isMobileView() && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Close all dropdowns
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
            
            // Update active link
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            
            // Update content section based on clicked link
            updateContentSection(link.textContent.trim());
        });
    }
});

// Close dropdowns when clicking outside (for desktop)
document.addEventListener('click', (e) => {
    if (!isMobileView()) {
        dropdownToggles.forEach(toggle => {
            const dropdown = toggle.parentElement;
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMobileView() && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Close all dropdowns
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    // If resizing to larger screen, ensure mobile menu is closed
    if (!isMobileView()) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Reset dropdown active states for mobile
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// View More Services functionality
viewMoreServices.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // In a real application, this would fetch more services from a server
    // For demo purposes, we'll show an alert and add more services dynamically
    const servicesList = viewMoreServices.closest('.dropdown-menu');
    
    // Create additional service items
    // const additionalServices = [
    //     {icon: 'fas fa-cloud', name: 'Cloud Solutions'},
    //     {icon: 'fas fa-chart-pie', name: 'Business Intelligence'},
    //     {icon: 'fas fa-shopping-cart', name: 'E-commerce Solutions'},
    //     {icon: 'fas fa-headset', name: 'IT Support & Maintenance'}
    // ];
    
    // If "View More" hasn't been clicked yet, add more services
    if (!viewMoreServices.classList.contains('expanded')) {
        additionalServices.forEach(service => {
            const li = document.createElement('li');
            li.className = 'dropdown-item';
            
            li.innerHTML = `
                <a href="#">
                    <i class="${service.icon}"></i>
                    <span>${service.name}</span>
                </a>
            `;
            
            // Insert before the "View More" item
            servicesList.insertBefore(li, viewMoreServices.parentElement);
        });
        
        // Update the "View More" button to "Show Less"
        viewMoreServices.innerHTML = `
            <i class="fas fa-eye-slash"></i>
            <span>Show Less Services</span>
        `;
        
        viewMoreServices.classList.add('expanded');
    } else {
        // Remove the additional services
        const additionalItems = servicesList.querySelectorAll('.dropdown-item:nth-last-child(n+7)');
        additionalItems.forEach(item => {
            if (item !== viewMoreServices.parentElement) {
                item.remove();
            }
        });
        
        // Update the "Show Less" button back to "View More"
        viewMoreServices.innerHTML = `
            <i class="fas fa-eye"></i>
            <span>View More Services</span>
        `;
        
        viewMoreServices.classList.remove('expanded');
    }
    
    // Update content section
    sectionTitle.textContent = 'Our Services';
    sectionDescription.textContent = 'We offer a comprehensive range of technology services to help your business grow. From Full Stack Development to AI-powered platforms, we have the expertise to bring your ideas to life.';
});

// Consultation Modal
consultationBtn.addEventListener('click', () => {
    consultationModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
    consultationModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === consultationModal) {
        consultationModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Handle form submission
consultationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // In a real application, you would send this data to a server
    // For demo purposes, we'll show a success message
    alert('Thank you for your consultation request! Our team will contact you within 24 hours.');
    
    // Reset form and close modal
    consultationForm.reset();
    consultationModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Update content section based on clicked menu item
function updateContentSection(menuItem) {
    const contentMap = {
        'Home': {
            title: 'Welcome to INTALLA 24',
            description: 'We are a technology company focused on building tomorrow\'s workforce. Our mission is to empower businesses with innovative solutions that drive growth and efficiency. Explore our website to learn more about our services, products, and company culture.'
        },
        'About Us': {
            title: 'About Our Company',
            description: 'INTALLA 24 is a forward-thinking technology company established with the vision of building tomorrow\'s workforce. We combine cutting-edge technology with human expertise to deliver solutions that transform businesses and create lasting value for our clients.'
        },
        'Services': {
            title: 'Our Services',
            description: 'We offer a comprehensive range of technology services to help your business grow. From Full Stack Development to AI-powered platforms, we have the expertise to bring your ideas to life. Our team of experts works closely with you to understand your needs and deliver solutions that exceed expectations.'
        },
        'Products': {
            title: 'Our Products',
            description: 'Discover our innovative product portfolio designed to solve modern business challenges. Our products are built with scalability, security, and user experience in mind, ensuring they deliver maximum value to your organization.'
        }
    };
    
    // For dropdown items, we need to check the text content
    const mainItem = menuItem.split('\n')[0]; // Handle cases with icons
    
    if (contentMap[mainItem]) {
        sectionTitle.textContent = contentMap[mainItem].title;
        sectionDescription.textContent = contentMap[mainItem].description;
    } else {
        // For dropdown sub-items
        sectionTitle.textContent = menuItem;
        sectionDescription.textContent = `This is the content section for ${menuItem}. Here you would find detailed information about this specific topic, including features, benefits, and how it relates to our overall mission at INTALLA 24.`;
    }
    
    // Add animation effect
    const contentSection = document.querySelector('.content-section');
    if (contentSection) {
        contentSection.style.animation = 'none';
        setTimeout(() => {
            contentSection.style.animation = 'fadeIn 0.8s ease';
        }, 10);
    }
}

// Handle dropdown sub-items
document.querySelectorAll('.dropdown-item a').forEach(item => {
    item.addEventListener('click', (e) => {
        if (isMobileView()) {
            // On mobile, allow normal link behavior but close menu
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Close all dropdowns
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
        
        const itemText = item.querySelector('span').textContent;
        updateContentSection(itemText);
        
        // Update active state
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Find and activate the parent dropdown
        const parentDropdown = item.closest('.dropdown');
        if (parentDropdown) {
            const dropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
            dropdownToggle.classList.add('active');
        }
    });
});

// Initialize with home content
updateContentSection('Home');

// Banner Section Typewriter Effect (if you have banner section)
const typewriterText = document.getElementById('typewriter');
if (typewriterText) {
    const cursor = document.querySelector('.cursor');
    
    const typewriterWords = [
        "Job Simulation",
        "Financial AI",
        "Business Services"
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let deletingSpeed = 50;
    let pauseTime = 1500;
    
    function typeWriter() {
        const currentWord = typewriterWords[wordIndex];
        
        if (isDeleting) {
            // Deleting characters
            typewriterText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = deletingSpeed;
        } else {
            // Typing characters
            typewriterText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // When word is fully typed
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = pauseTime; // Pause at the end
            cursor.style.animation = 'none';
            setTimeout(() => {
                cursor.style.animation = 'blink 1s infinite';
            }, 10);
        }
        
        // When word is fully deleted
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % typewriterWords.length;
            typingSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start typewriter effect when page loads
    window.addEventListener('load', () => {
        // Start typewriter after a short delay
        setTimeout(typeWriter, 1000);
    });
    
}