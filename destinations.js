const cards = document.querySelectorAll(".text-card");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close-btn");

// OPEN MODAL
cards.forEach(card => {
    card.addEventListener("click", () => {
        const imgSrc = card.getAttribute("data-img");
        modalImg.src = imgSrc;
        modal.classList.add("show");
    });
});

// CLOSE BUTTON
closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
});

// CLICK OUTSIDE
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("show");
    }
});

// ESC KEY
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.classList.remove("show");
    }
});