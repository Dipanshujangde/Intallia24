// Typewriter Effect
function initTypewriter() {
    const typewriterText = document.getElementById('typewriter');
    const cursor = document.querySelector('.cursor');
    
    if (!typewriterText) {
        console.warn('Typewriter element not found');
        return;
    }
    
    const words = ["Job Simulation", "Financial AI", "Business Services"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let deletingSpeed = 50;
    let pauseTime = 1500;
    
    function typeWriter() {
        const currentWord = words[wordIndex];
        
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
            if (cursor) {
                cursor.style.animation = 'none';
                setTimeout(() => {
                    cursor.style.animation = 'cursorBlink 1s infinite';
                }, 10);
            }
        }
        
        // When word is fully deleted
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start typewriter after a short delay
    setTimeout(typeWriter, 1000);
}

// Card Interactions
function initCardInteractions() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', function() {
    initTypewriter();
    initCardInteractions();
});