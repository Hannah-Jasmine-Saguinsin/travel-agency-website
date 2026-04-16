document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("pkgModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.getElementById("modalClose");
    const backdrop = document.getElementById("modalBackdrop");
    const cards = document.querySelectorAll(".pkg-card");

    // Open Modal
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const imgSrc = card.getAttribute("data-img");
            if (imgSrc) {
                modalImg.src = imgSrc;
                modal.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        });
    });

    // Close function
    const closeModal = () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
        setTimeout(() => { modalImg.src = ""; }, 300);
    };

    closeBtn?.addEventListener("click", closeModal);
    backdrop?.addEventListener("click", closeModal);
    
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
});