document.addEventListener("DOMContentLoaded", () => {
    const galleryTrack = document.getElementById("galleryTrack");
    const galleryLeft = document.getElementById("galleryLeft");
    const galleryRight = document.getElementById("galleryRight");
    const packageCards = Array.from(document.querySelectorAll(".pkg-card"));

    const pkgModal = document.getElementById("pkgModal");
    const modalImg = document.getElementById("modalImg");
    const modalCaption = document.getElementById("modalCaption");
    const modalClose = document.getElementById("modalClose");
    const modalBackdrop = document.getElementById("modalBackdrop");

    const destinationBox = document.getElementById("destination-box");
    const dateBox = document.getElementById("date-box");
    const destinationInput = document.getElementById("destination-input");
    const travelDateInput = document.getElementById("travel-date");
    const searchButton = document.getElementById("search-button");
    const suggestions = document.getElementById("suggestions");

    const sliderTrack = document.getElementById("sliderTrack");
    const sliderPrev = document.getElementById("sliderPrev");
    const sliderNext = document.getElementById("sliderNext");
    const dotsWrap = document.getElementById("sliderDots");
    const slides = Array.from(document.querySelectorAll(".testimonial-slide"));

    const featuredTabs = Array.from(document.querySelectorAll(".dest-tab"));
    const featuredCards = Array.from(document.querySelectorAll(".dest-card"));
    const destModal = document.getElementById("destModal");
    const destModalImg = document.getElementById("destModalImg");
    const destModalRegion = document.getElementById("destModalRegion");
    const destModalTitle = document.getElementById("destModalTitle");
    const destModalDesc = document.getElementById("destModalDesc");
    const destModalBest = document.getElementById("destModalBest");
    const destModalKnown = document.getElementById("destModalKnown");
    const destModalClose = document.getElementById("destModalClose");

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const destinations = packageCards.map((card) => ({
        title: card.dataset.title || "",
        node: card
    }));

    const activateSearchBox = (selectedBox) => {
        [destinationBox, dateBox].forEach((box) => {
            if (!box) {
                return;
            }

            box.classList.toggle("active", box === selectedBox);
        });
    };

    if (destinationBox && destinationInput) {
        destinationBox.addEventListener("click", () => {
            activateSearchBox(destinationBox);
            destinationInput.focus();
        });

        destinationInput.addEventListener("focus", () => activateSearchBox(destinationBox));
    }

    if (dateBox && travelDateInput) {
        dateBox.addEventListener("click", () => {
            activateSearchBox(dateBox);
            travelDateInput.focus();
        });

        travelDateInput.addEventListener("focus", () => activateSearchBox(dateBox));
    }

    document.addEventListener("click", (event) => {
        const clickedInsideSearch =
            destinationBox?.contains(event.target) ||
            dateBox?.contains(event.target) ||
            searchButton?.contains(event.target);

        if (!clickedInsideSearch) {
            activateSearchBox(null);
            hideSuggestions();
        }
    });

    function showSuggestions(matches) {
        if (!suggestions || !destinationInput) {
            return;
        }

        suggestions.innerHTML = "";

        if (!matches.length) {
            hideSuggestions();
            return;
        }

        matches.forEach((match) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "suggestion-item";
            button.setAttribute("role", "option");
            button.textContent = match.title;

            button.addEventListener("click", () => {
                destinationInput.value = match.title;
                destinationInput.setAttribute("aria-expanded", "false");
                hideSuggestions();
                focusPackage(match.node);
            });

            suggestions.appendChild(button);
        });

        suggestions.classList.add("show");
        destinationInput.setAttribute("aria-expanded", "true");
    }

    function hideSuggestions() {
        if (!suggestions || !destinationInput) {
            return;
        }

        suggestions.classList.remove("show");
        destinationInput.setAttribute("aria-expanded", "false");
    }

    if (destinationInput) {
        destinationInput.addEventListener("input", () => {
            const query = destinationInput.value.trim().toLowerCase();

            if (!query) {
                hideSuggestions();
                return;
            }

            const matches = destinations.filter((item) =>
                item.title.toLowerCase().includes(query)
            );

            showSuggestions(matches.slice(0, 6));
        });

        destinationInput.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                hideSuggestions();
                destinationInput.blur();
            }
        });
    }

    function focusPackage(card) {
        if (!card) {
            return;
        }

        card.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            inline: "center",
            block: "nearest"
        });

        card.classList.add("pkg-card--highlight");

        window.setTimeout(() => {
            card.classList.remove("pkg-card--highlight");
        }, 1500);
    }

    function handleSearch() {
        const query = destinationInput?.value.trim().toLowerCase() || "";
        const selectedCard = destinations.find((item) =>
            item.title.toLowerCase().includes(query)
        );

        if (selectedCard) {
            focusPackage(selectedCard.node);
        } else if (galleryTrack) {
            galleryTrack.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "center"
            });
        }

        hideSuggestions();

        if (travelDateInput?.value) {
            activateSearchBox(dateBox);
        }
    }

    searchButton?.addEventListener("click", handleSearch);

    destinationInput?.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    });

    if (galleryTrack && galleryLeft && galleryRight) {
        const getScrollStep = () => Math.min(galleryTrack.clientWidth * 0.85, 340);

        const updateGalleryArrows = () => {
            const maxScroll = galleryTrack.scrollWidth - galleryTrack.clientWidth;
            galleryLeft.disabled = galleryTrack.scrollLeft <= 4;
            galleryRight.disabled = galleryTrack.scrollLeft >= maxScroll - 4;
        };

        galleryLeft.addEventListener("click", () => {
            galleryTrack.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
        });

        galleryRight.addEventListener("click", () => {
            galleryTrack.scrollBy({ left: getScrollStep(), behavior: "smooth" });
        });

        let isPointerDown = false;
        let startX = 0;
        let scrollStart = 0;

        galleryTrack.addEventListener("pointerdown", (event) => {
            isPointerDown = true;
            startX = event.clientX;
            scrollStart = galleryTrack.scrollLeft;
            galleryTrack.classList.add("dragging");
            galleryTrack.setPointerCapture(event.pointerId);
        });

        galleryTrack.addEventListener("pointermove", (event) => {
            if (!isPointerDown) {
                return;
            }

            const walk = (event.clientX - startX) * 1.2;
            galleryTrack.scrollLeft = scrollStart - walk;
        });

        const endPointerDrag = (event) => {
            if (!isPointerDown) {
                return;
            }

            isPointerDown = false;
            galleryTrack.classList.remove("dragging");

            if (event.pointerId !== undefined && galleryTrack.hasPointerCapture(event.pointerId)) {
                galleryTrack.releasePointerCapture(event.pointerId);
            }
        };

        galleryTrack.addEventListener("pointerup", endPointerDrag);
        galleryTrack.addEventListener("pointercancel", endPointerDrag);
        galleryTrack.addEventListener("lostpointercapture", () => {
            isPointerDown = false;
            galleryTrack.classList.remove("dragging");
        });

        galleryTrack.addEventListener("scroll", updateGalleryArrows, { passive: true });
        window.addEventListener("resize", updateGalleryArrows);
        updateGalleryArrows();
    }

    function openPackageModal(card) {
        if (!pkgModal || !modalImg || !modalCaption) {
            return;
        }

        modalImg.src = card.dataset.img || "";
        modalImg.alt = card.dataset.title || "Package image";
        modalCaption.textContent = card.dataset.title || "";

        pkgModal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closePackageModal() {
        if (!pkgModal || !modalImg) {
            return;
        }

        pkgModal.classList.remove("active");
        document.body.style.overflow = "";

        window.setTimeout(() => {
            if (!pkgModal.classList.contains("active")) {
                modalImg.src = "";
            }
        }, 250);
    }

    packageCards.forEach((card) => {
        card.tabIndex = 0;

        card.addEventListener("click", () => openPackageModal(card));
        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openPackageModal(card);
            }
        });
    });

    modalClose?.addEventListener("click", closePackageModal);
    modalBackdrop?.addEventListener("click", closePackageModal);

    const fadeItems = document.querySelectorAll(".fade-in-up");

    if ("IntersectionObserver" in window) {
        const fadeObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.15 }
        );

        fadeItems.forEach((item) => fadeObserver.observe(item));
    } else {
        fadeItems.forEach((item) => item.classList.add("visible"));
    }

    if (sliderTrack && sliderPrev && sliderNext && dotsWrap && slides.length) {
        let currentSlide = 0;
        let autoSlideTimer = null;
        let touchStartX = 0;
        let touchEndX = 0;

        slides.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.className = "slider-dot";
            dot.type = "button";
            dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
            dot.addEventListener("click", () => {
                goToSlide(index);
                resetAutoSlide();
            });
            dotsWrap.appendChild(dot);
        });

        const dots = Array.from(dotsWrap.querySelectorAll(".slider-dot"));

        function goToSlide(index) {
            currentSlide = (index + slides.length) % slides.length;
            sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle("active", dotIndex === currentSlide);
            });
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        function startAutoSlide() {
            if (prefersReducedMotion) {
                return;
            }

            autoSlideTimer = window.setInterval(nextSlide, 4500);
        }

        function resetAutoSlide() {
            if (autoSlideTimer) {
                window.clearInterval(autoSlideTimer);
            }

            startAutoSlide();
        }

        sliderNext.addEventListener("click", () => {
            nextSlide();
            resetAutoSlide();
        });

        sliderPrev.addEventListener("click", () => {
            prevSlide();
            resetAutoSlide();
        });

        sliderTrack.addEventListener("touchstart", (event) => {
            touchStartX = event.changedTouches[0].clientX;
        }, { passive: true });

        sliderTrack.addEventListener("touchend", (event) => {
            touchEndX = event.changedTouches[0].clientX;
            const swipeDistance = touchEndX - touchStartX;

            if (Math.abs(swipeDistance) < 40) {
                return;
            }

            if (swipeDistance < 0) {
                nextSlide();
            } else {
                prevSlide();
            }

            resetAutoSlide();
        }, { passive: true });

        const pauseTargets = [sliderTrack, sliderPrev, sliderNext, dotsWrap];

        pauseTargets.forEach((target) => {
            target.addEventListener("mouseenter", () => {
                if (autoSlideTimer) {
                    window.clearInterval(autoSlideTimer);
                }
            });

            target.addEventListener("mouseleave", resetAutoSlide);
            target.addEventListener("focusin", () => {
                if (autoSlideTimer) {
                    window.clearInterval(autoSlideTimer);
                }
            });
            target.addEventListener("focusout", resetAutoSlide);
        });

        goToSlide(0);
        startAutoSlide();
    }

    if (featuredTabs.length && featuredCards.length) {
        featuredTabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                featuredTabs.forEach((item) => item.classList.remove("active"));
                tab.classList.add("active");

                const filter = tab.dataset.filter;

                featuredCards.forEach((card) => {
                    const shouldShow = filter === "all" || card.dataset.region === filter;
                    card.classList.toggle("hidden", !shouldShow);
                });
            });
        });
    }

    function openFeaturedModal(card) {
        if (!destModal || !destModalImg || !destModalRegion || !destModalTitle || !destModalDesc || !destModalBest || !destModalKnown) {
            return;
        }

        const cardImage = card.querySelector(".dest-card-img");
        const cardRegion = card.querySelector(".dest-card-region");

        destModalImg.src = cardImage?.src || "";
        destModalImg.alt = card.dataset.name || "";
        destModalRegion.textContent = cardRegion?.textContent || "";
        destModalTitle.textContent = card.dataset.name || "";
        destModalDesc.textContent = card.dataset.desc || "";
        destModalBest.textContent = `Best time: ${card.dataset.best || ""}`;
        destModalKnown.textContent = `Known for: ${card.dataset.known || ""}`;
        destModal.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeFeaturedModal() {
        if (!destModal) {
            return;
        }

        destModal.classList.remove("open");
        document.body.style.overflow = "";
    }

    featuredCards.forEach((card) => {
        card.tabIndex = 0;

        card.addEventListener("click", () => openFeaturedModal(card));

        card.querySelector(".dest-card-btn")?.addEventListener("click", (event) => {
            event.stopPropagation();
            openFeaturedModal(card);
        });

        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openFeaturedModal(card);
            }
        });
    });

    destModalClose?.addEventListener("click", closeFeaturedModal);

    destModal?.addEventListener("click", (event) => {
        if (event.target === destModal) {
            closeFeaturedModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closePackageModal();
            closeFeaturedModal();
        }
    });
});
