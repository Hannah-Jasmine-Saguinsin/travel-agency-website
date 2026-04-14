const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');

    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

const destinations = [
    "Paris, France",
    "Tokyo, Japan",
    "Seoul, South Korea",
    "Bali, Indonesia",
    "New York, USA",
    "London, UK",
    "Rome, Italy",
    "Dubai, UAE",
    "Singapore",
    "Bangkok, Thailand",
    "Manila, Philippines",
    "Palawan, Philippines",
    "Cebu, Philippines"
];

const input = document.getElementById("destination-input");
const suggestions = document.getElementById("suggestions");

input.addEventListener("input", function () {
    const value = this.value.toLowerCase();
    suggestions.innerHTML = "";

    if (!value) {
        suggestions.style.display = "none";
        return;
    }

    const filtered = destinations.filter(dest =>
        dest.toLowerCase().includes(value)
    );

    if (filtered.length === 0) {
        suggestions.style.display = "none";
        return;
    }

    filtered.forEach(dest => {
        const div = document.createElement("div");
        div.classList.add("suggestion-item");
        div.textContent = dest;

        div.onclick = () => {
            input.value = dest;
            suggestions.style.display = "none";
        };

        suggestions.appendChild(div);
    });

    suggestions.style.display = "block";
});

// close dropdown when clicking outside
document.addEventListener("click", function (e) {
    if (!document.getElementById("destination-box").contains(e.target)) {
        suggestions.style.display = "none";
    }
});
