const galleryTrack = document.getElementById('galleryTrack');
    const galleryLeft  = document.getElementById('galleryLeft');
    const galleryRight = document.getElementById('galleryRight');

    /*Arrow Button Scrolling*/
    galleryLeft.addEventListener('click', () => {
        galleryTrack.scrollBy({ left: -320, behavior: 'smooth' });
    });

    galleryRight.addEventListener('click', () => {
        galleryTrack.scrollBy({ left: 320, behavior: 'smooth' });
    });

    /*Drag to Scroll (Mouse)*/
    let isDragging = false;
    let startX     = 0;
    let scrollLeft = 0;

    galleryTrack.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX     = e.pageX - galleryTrack.offsetLeft;
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
        const x    = e.pageX - galleryTrack.offsetLeft;
        const walk = (x - startX) * 1.5; // scroll speed multiplier
        galleryTrack.scrollLeft = scrollLeft - walk;
    });

    /*Modal Open / Close*/
    const pkgModal     = document.getElementById('pkgModal');
    const modalImg     = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose   = document.getElementById('modalClose');
    const modalBackdrop = document.getElementById('modalBackdrop');

    // Open modal when a card is clicked
    document.querySelectorAll('.pkg-card').forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.getAttribute('data-img');
            const title  = card.getAttribute('data-title');

            modalImg.src       = imgSrc;
            modalImg.alt       = title;
            modalCaption.textContent = title;

            pkgModal.classList.add('active');   // show modal
            document.body.style.overflow = 'hidden'; // lock scroll
        });
    });

    // Close modal — close button
    modalClose.addEventListener('click', closeModal);

    // Close modal — clicking backdrop
    modalBackdrop.addEventListener('click', closeModal);

    // Close modal — Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    function closeModal() {
        pkgModal.classList.remove('active');
        document.body.style.overflow = ''; // unlock scroll
        // Clear src after animation ends to avoid flicker
        setTimeout(() => { modalImg.src = ''; }, 300);
    }


    /* TESTIMONIAL SLIDESHOW
       Auto-slide every 4500ms, manual prev/next */

    const sliderTrack = document.getElementById('sliderTrack');
    const sliderPrev  = document.getElementById('sliderPrev');
    const sliderNext  = document.getElementById('sliderNext');
    const dotsWrap    = document.getElementById('sliderDots');

    const slides      = document.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;
    let currentSlide  = 0;
    let autoSlideTimer;

    /*Build Dot Indicator*/
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        if (i === 0) dot.classList.add('active'); // first dot active
        dot.addEventListener('click', () => goToSlide(i));
        dotsWrap.appendChild(dot);
    });

    /*Go To a Specific Slide*/
    function goToSlide(index) {
        currentSlide = index;

        // Move the track: each slide is 100% of the wrapper width
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update dot states
        document.querySelectorAll('.slider-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    /*Next Slide*/
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides; // loop back to 0
        goToSlide(next);
    }

    /*Previous Slide*/
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(prev);
    }

    /*Button Listeners*/
    sliderNext.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide(); // restart timer after manual click
    });

    sliderPrev.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    /*Auto-slide every 4.5 seconds*/
    function startAutoSlide() {
        autoSlideTimer = setInterval(nextSlide, 4500);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        startAutoSlide();
    }

    startAutoSlide(); // kick off auto-slide on page load


    /* FADE-IN ON SCROLL - Adds .visible class when element enters view*/
    const fadeItems = document.querySelectorAll('.fade-in-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // run once
            }
        });
    }, { threshold: 0.15 });

    fadeItems.forEach(item => observer.observe(item));
