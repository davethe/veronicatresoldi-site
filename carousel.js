
// Testimonial Carousel Logic
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.testimonials-track');
    // If no carousel, stop
    if (!track) return;

    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-control.next');
    const prevButton = document.querySelector('.carousel-control.prev');
    const dotsNav = document.querySelector('.carousel-dots');

    // Config: How many slides visible at once?
    // We need to calculate this dynamically
    const getSlidesPerView = () => {
        if (window.innerWidth >= 1024) return 4;
        if (window.innerWidth >= 768) return 2;
        return 1;
    };

    let slidesPerView = getSlidesPerView();
    let currentSlideIndex = 0;

    // Create dots based on *pages* of slides, or just 1 dot per group? 
    // Standard carousel usually does 1 dot per slide or 1 dot per "page".
    // Let's do 1 dot per slide for simplicity, but handle the scroll math.

    // Better approach: Calculate Total Pages = Math.ceil(slides.length / slidesPerView) NO, 
    // smooth scrolling usually increments by 1 slide.
    // Let's create `slides.length` dots, but limit max index.

    // Clear existing dots in case of resize re-init (if we did that)
    dotsNav.innerHTML = '';
    slides.forEach((_, index) => {
        // We only need dots for valid starting positions.
        // e.g. if we have 4 slides and view 3, we can only go to index 0 and 1? 
        // Or 0 (1-3) and 1 (2-4). Yes.
        // Max valid index = slides.length - slidesPerView
        // Actually, let's just make it infinite loop or simple bound? Simple bound for now.
        const dot = document.createElement('button');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Vai alla recensione ${index + 1}`);
        dotsNav.appendChild(dot);
    });

    const dots = Array.from(dotsNav.children);

    const updateCarousel = (index) => {
        // Bounds check
        const maxIndex = slides.length - slidesPerView;

        // Handle wrapping or stopping? Let's stop at edges or wrap?
        // User said "scrollarle", wrapping is nice.
        // But with multi-view, wrapping is tricky without cloning.
        // Let's stick to bounded scroll for MVP.

        if (index < 0) index = 0;
        if (index > maxIndex) index = 0; // Wrap to start if next click goes over

        // Wait, if we are at the end, next button should go to start?
        // Or should we just clamp? 
        // Let's clamp for prev/next buttons logic specifically, or wrap.
        // Let's do simple translation.

        const slideWidth = slides[0].getBoundingClientRect().width;
        // Logic for gap needs to be included? 
        // gap is 30px.
        // The move amount is (slideWidth + gap) * index.
        const gap = 30;
        const moveAmount = (slideWidth + gap) * index;

        track.style.transform = `translateX(-${moveAmount}px)`;
        currentSlideIndex = index;

        // Update dots
        dots.forEach(d => d.classList.remove('active'));
        // If we wrapped or clamped, finding the right dot might be tricky if we don't map 1:1
        // But here index 1:1 maps to starting slide position.
        if (dots[index]) dots[index].classList.add('active');
    };

    // Resize Observer to update width/gaps/slidesPerView
    window.addEventListener('resize', () => {
        slidesPerView = getSlidesPerView();
        // Reset to 0 or try to maintain?
        updateCarousel(currentSlideIndex);

        // Hide/Show dots that are out of bounds?
        // Max valid index changes on resize.
        const maxIndex = slides.length - slidesPerView;
        dots.forEach((dot, i) => {
            if (i > maxIndex) dot.style.display = 'none';
            else dot.style.display = 'block';
        });

        // Clamp index if needed
        if (currentSlideIndex > maxIndex) {
            updateCarousel(maxIndex);
        }
    });

    // Initial check for dots visibility
    const checkDots = () => {
        const maxIndex = slides.length - slidesPerView;
        dots.forEach((dot, i) => {
            if (i > maxIndex) dot.style.display = 'none';
            else dot.style.display = 'block';
        });
    };
    checkDots();

    nextButton.addEventListener('click', () => {
        const maxIndex = slides.length - slidesPerView;
        let nextIndex = currentSlideIndex + 1;
        if (nextIndex > maxIndex) nextIndex = 0; // Wrap
        updateCarousel(nextIndex);
    });

    prevButton.addEventListener('click', () => {
        const maxIndex = slides.length - slidesPerView;
        let prevIndex = currentSlideIndex - 1;
        if (prevIndex < 0) prevIndex = maxIndex; // Wrap to end
        updateCarousel(prevIndex);
    });

    dotsNav.addEventListener('click', (e) => {
        const targetDot = e.target.closest('.dot');
        if (!targetDot) return;

        const targetIndex = dots.findIndex(dot => dot === targetDot);
        updateCarousel(targetIndex);
    });
});
