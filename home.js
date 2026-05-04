/* =========================
   GLOBAL CHECK
========================= */
const isMobile = window.innerWidth <= 768;

/* =========================
   GALLERY (PACKAGES)
========================= */
const galleryTrack = document.getElementById('galleryTrack');
const galleryLeft  = document.getElementById('galleryLeft');
const galleryRight = document.getElementById('galleryRight');

/* Arrow Button Scrolling */
galleryLeft?.addEventListener('click', () => {
    galleryTrack.scrollBy({
        left: -galleryTrack.offsetWidth * 0.8,
        behavior: 'smooth'
    });
});

galleryRight?.addEventListener('click', () => {
    galleryTrack.scrollBy({
        left: galleryTrack.offsetWidth * 0.8,
        behavior: 'smooth'
    });
});

/* Drag to Scroll (Mouse) */
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

if (galleryTrack) {
    galleryTrack.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - galleryTrack.offsetLeft;
        scrollLeft = galleryTrack.scrollLeft;
        galleryTrack.style.cursor = 'grabbing';
    });

    galleryTrack.addEventListener('mouseleave', () => {
        isDragging = false;
        galleryTrack.style.cursor = 'grab';
    });

    galleryTrack.addEventListener('mouseup', () => {
        isDragging = false;
        galleryTrack.style.cursor = 'grab';
    });

    galleryTrack.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();

        const x = e.pageX - galleryTrack.offsetLeft;
        const walk = (x - startX) * 1.5;

        galleryTrack.scrollLeft = scrollLeft - walk;
    });
}

/* Mobile swipe enable */
function enableMobileSwipe() {
    if (!galleryTrack) return;

    if (isMobile) {
        galleryTrack.style.overflowX = 'auto';
        galleryTrack.style.cursor = 'grab';
    }
}
enableMobileSwipe();

/* =========================
   PACKAGE MODAL
========================= */
const pkgModal      = document.getElementById('pkgModal');
const modalImg      = document.getElementById('modalImg');
const modalCaption  = document.getElementById('modalCaption');
const modalClose    = document.getElementById('modalClose');
const modalBackdrop = document.getElementById('modalBackdrop');

document.querySelectorAll('.pkg-card').forEach(card => {
    card.addEventListener('click', () => {
        const imgSrc = card.getAttribute('data-img');
        const title  = card.getAttribute('data-title');

        modalImg.src = imgSrc;
        modalImg.alt = title;
        modalCaption.textContent = title;

        pkgModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    pkgModal.classList.remove('active');
    document.body.style.overflow = '';

    setTimeout(() => {
        modalImg.src = '';
    }, 300);
}

modalClose?.addEventListener('click', closeModal);
modalBackdrop?.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});


/* =========================
   TESTIMONIAL SLIDER
========================= */
const sliderTrack = document.getElementById('sliderTrack');
const sliderPrev  = document.getElementById('sliderPrev');
const sliderNext  = document.getElementById('sliderNext');
const dotsWrap    = document.getElementById('sliderDots');

const slides = document.querySelectorAll('.testimonial-slide');
const totalSlides = slides.length;

let currentSlide = 0;
let autoSlideTimer;

/* Build dots */
slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);

    if (i === 0) dot.classList.add('active');

    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap?.appendChild(dot);
});

/* Core slide function */
function goToSlide(index) {
    currentSlide = index;

    console.log("Slide:", currentSlide); // debug

    if (sliderTrack) {
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    document.querySelectorAll('.slider-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

/* Next / Prev */
function nextSlide() {
    goToSlide((currentSlide + 1) % totalSlides);
}

function prevSlide() {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
}

/* Arrow buttons (DESKTOP ONLY behavior) */
sliderNext?.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

sliderPrev?.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

/* Auto slide (DESKTOP ONLY) */
function startAutoSlide() {
    if (isMobile) return;

    autoSlideTimer = setInterval(nextSlide, 4500);
}

function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
}

/* INIT */
startAutoSlide();
goToSlide(0);

/* Mobile touch/swipe for testimonials slider */
if (isMobile && sliderTrack) {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let startTime = 0;

    const sliderContainer = document.querySelector('.slider-track-wrap');

    sliderContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        currentX = startX;
        isDragging = true;
        startTime = Date.now();
        resetAutoSlide();
    });

    sliderContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    });

    sliderContainer.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;

        const diffX = startX - currentX;
        const diffTime = Date.now() - startTime;
        const threshold = 50; // minimum swipe distance
        const velocity = Math.abs(diffX) / diffTime;

        if (Math.abs(diffX) > threshold || velocity > 0.3) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
}

/* =========================
   FADE IN ON SCROLL
========================= */
const fadeItems = document.querySelectorAll('.fade-in-up');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

fadeItems.forEach(item => observer.observe(item));