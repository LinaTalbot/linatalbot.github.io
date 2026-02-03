// Slide presentation logic
let currentSlide = 1;
const totalSlides = 16;

function showSlide(n) {
    // Hide all slides
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active');
    });

    // Show target slide
    const targetSlide = document.getElementById(`slide-${n}`);
    if (targetSlide) {
        targetSlide.classList.add('active');
    }

    // Update counter
    document.getElementById('currentSlide').textContent = n;
    document.getElementById('totalSlides').textContent = totalSlides;

    // Update progress bar
    const progress = (n / totalSlides) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

function prevSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

// Event listeners
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
    } else if (e.key === 'Home') {
        e.preventDefault();
        currentSlide = 1;
        showSlide(currentSlide);
    } else if (e.key === 'End') {
        e.preventDefault();
        currentSlide = totalSlides;
        showSlide(currentSlide);
    }
});

// Touch swipe support
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// Initialize
showSlide(currentSlide);

// Auto-advance (optional - comment out to disable)
// setInterval(nextSlide, 10000); // 10 seconds per slide

console.log('💊 substance.fun Pitch Deck loaded');
console.log('Controls: ← → arrows, Space, Touch swipe');
console.log(`Total slides: ${totalSlides}`);
