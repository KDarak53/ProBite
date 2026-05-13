// ===== SCAN BUTTON INTERACTION =====
document.getElementById('scan-btn').addEventListener('click', function() {
    const details = document.getElementById('product-details');
    const scanner = document.getElementById('scanner-section');
    
    // Show the hidden product details
    details.classList.remove('hidden');
    
    // Change button text or hide scanner for effect
    this.innerText = "PRODUCT IDENTIFIED ✓";
    this.style.background = "#2ecc71"; // Success green
    this.style.transform = "scale(1.05)";

    // Smooth scroll to the first detail card
    setTimeout(() => {
        details.scrollIntoView({ behavior: 'smooth' });
    }, 300);
    
    // Add animation to scanner box
    scanner.style.animation = "none";
});

// ===== MOUSE TRACKING ON SCANNER BOX =====
const scannerBox = document.querySelector('.scanner-box');
document.addEventListener('mousemove', (e) => {
    const scannerRect = scannerBox.getBoundingClientRect();
    const scannerCenterX = scannerRect.left + scannerRect.width / 2;
    const scannerCenterY = scannerRect.top + scannerRect.height / 2;
    
    const angleX = (e.clientY - scannerCenterY) * 0.05;
    const angleY = (e.clientX - scannerCenterX) * 0.05;
    
    scannerBox.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
});

scannerBox.addEventListener('mouseleave', () => {
    scannerBox.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
});

// ===== PARALLAX SCROLLING EFFECT =====
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    
    // Header moves slower (parallax effect)
    header.style.transform = `translateY(${scrollY * 0.5}px)`;
    
    // Cards fade in and move based on scroll
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const isVisible = cardRect.top < window.innerHeight && cardRect.bottom > 0;
        
        if (isVisible) {
            const visiblePercent = (window.innerHeight - cardRect.top) / window.innerHeight;
            card.style.opacity = Math.min(visiblePercent, 1);
        }
    });
});

// ===== INTERACTIVE CARD HOVER EFFECTS =====
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        cards.forEach(c => {
            if (c !== card) {
                c.style.opacity = '0.6';
            }
        });
    });
    
    card.addEventListener('mouseleave', () => {
        cards.forEach(c => {
            c.style.opacity = '1';
        });
    });
    
    // Click animation
    card.addEventListener('click', () => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'cardPulse 0.6s ease-out';
        }, 10);
    });
});

// ===== BUTTON HOVER ANIMATION =====
const scanBtn = document.getElementById('scan-btn');
scanBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.08) translateY(-3px)';
    this.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.4)';
});

scanBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) translateY(0)';
    this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
});

// ===== ADD CARD PULSE ANIMATION =====
const style = document.createElement('style');
style.textContent = `
    @keyframes cardPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.03); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// ===== REAL-TIME CURSOR GLOW EFFECT =====
const customCursor = document.createElement('div');
customCursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #FF0000;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    display: none;
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.6);
    transition: all 0.1s ease-out;
`;
document.body.appendChild(customCursor);

// Track cursor on scanner area
scannerBox.addEventListener('mouseenter', () => {
    customCursor.style.display = 'block';
});

scannerBox.addEventListener('mouseleave', () => {
    customCursor.style.display = 'none';
});

document.addEventListener('mousemove', (e) => {
    if (customCursor.style.display === 'block') {
        customCursor.style.left = (e.clientX - 10) + 'px';
        customCursor.style.top = (e.clientY - 10) + 'px';
    }
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});