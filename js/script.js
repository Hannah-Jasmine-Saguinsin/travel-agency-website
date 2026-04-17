const destinations = [
/* LOCAL (PHILIPPINES)*/
"Baguio, Philippines",
"Baler, Philippines",
"Calaguas, Philippines",
"La Union, Philippines",
"Mt. Pulag, Philippines",
"Sagada, Philippines",
"Batanes, Philippines",
"Iloilo, Philippines",
"Manila, Philippines",
"Palawan, Philippines",
"Cebu, Philippines",
"Boracay, Philippines",
"Siargao, Philippines",
"Bohol, Philippines",
"Coron, Philippines",
"Cagayan de Oro, Philippines",
"Iligan, Philippines",
"Bukidnon, Philippines",
"Camiguin, Philippines",
"Guimaras, Philippines",

/* EAST ASIA */
"Taiwan",
"Taipei, Taiwan",
"Hong Kong",
"Disneyland, Hong Kong",
"Tokyo, Japan",
"Osaka, Japan",
"Hokkaido, Japan",
"Kyushu, Japan",
"Seoul, South Korea",
"Beijing, China",
"Shanghai, China",
"Xian, China",
"Hainan, China",
"Zhangjiajie, China",

/*SOUTHEAST ASIA*/
"Bali, Indonesia",
"Kuala Lumpur, Malaysia",
"Singapore",
"Bangkok, Thailand",
"Da Nang, Vietnam",
"Hanoi, Vietnam",

/* MULTI-COUNTRY (ASIA)*/
"Singapore-Malaysia",
"Indochina (Vietnam, Cambodia, Laos)",

/*MIDDLE EAST*/
"Dubai, UAE",
"Abu Dhabi, UAE",
"Holy Land, Israel",
"Jordan",
/* EUROPE*/
"London, UK",
"Rome, Italy",
"Iceland",
"Balkans (Croatia, Serbia, Bosnia & Herzegovina, Montenegro, Albania)",
];

const destinationBox = document.getElementById("destination-box");
const input = document.getElementById("destination-input");
const suggestions = document.getElementById("suggestions");
const dateBox = document.getElementById("date-box");
const dateInput = document.getElementById("travel-date");
const searchButton = document.getElementById("search-button");

if (destinationBox && input && suggestions && searchButton) {
    const setActiveBox = (activeBox) => {
        [destinationBox, dateBox].forEach((box) => {
            if (!box) {
                return;
            }

            box.classList.toggle("active", box === activeBox);
        });
    };

    const hideSuggestions = () => {
        suggestions.style.display = "none";
        suggestions.innerHTML = "";
    };

    const renderSuggestions = (matches) => {
        suggestions.innerHTML = "";

        if (!matches.length) {
            hideSuggestions();
            return;
        }

        matches.forEach((destination) => {
            const item = document.createElement("button");
            item.type = "button";
            item.className = "suggestion-item";
            item.textContent = destination;

            item.addEventListener("click", () => {
                input.value = destination;
                hideSuggestions();
                input.focus();
            });

            suggestions.appendChild(item);
        });

        suggestions.style.display = "block";
    };

    input.addEventListener("input", () => {
        setActiveBox(destinationBox);
        const value = input.value.trim().toLowerCase();

        if (!value) {
            hideSuggestions();
            return;
        }

        const filtered = destinations.filter((destination) =>
            destination.toLowerCase().includes(value)
        );

        renderSuggestions(filtered);
    });

    input.addEventListener("focus", () => {
        setActiveBox(destinationBox);
        const value = input.value.trim().toLowerCase();

        if (!value) {
            return;
        }

        const filtered = destinations.filter((destination) =>
            destination.toLowerCase().includes(value)
        );

        renderSuggestions(filtered);
    });

    document.addEventListener("click", (event) => {
        if (!destinationBox.contains(event.target)) {
            hideSuggestions();
        }

        const clickedInsideSearchBox =
            destinationBox.contains(event.target) ||
            (dateBox && dateBox.contains(event.target));

        if (!clickedInsideSearchBox) {
            setActiveBox(null);
        }
    });

    destinationBox.addEventListener("click", () => {
        setActiveBox(destinationBox);
        input.focus();
    });

    destinationBox.addEventListener("focusin", () => {
        setActiveBox(destinationBox);
    });

    if (dateInput) {
        dateInput.min = new Date().toISOString().split("T")[0];

        if (dateBox) {
            dateBox.addEventListener("click", () => {
                setActiveBox(dateBox);
                dateInput.focus();
                if (typeof dateInput.showPicker === "function") {
                    dateInput.showPicker();
                }
            });

            dateBox.addEventListener("focusin", () => {
                setActiveBox(dateBox);
            });
        }
    }

    const performSearch = () => {
        const destination = input.value.trim();
        const selectedDate = dateInput ? dateInput.value : "";

        if (!destination) {
            alert("Please enter a destination first.");
            input.focus();
            return;
        }

        const params = new URLSearchParams();
        params.set("destination", destination);

        if (selectedDate) {
            params.set("date", selectedDate);
        }

        window.location.href = `/destinations/destinations.html?${params.toString()}`;
    };

    searchButton.addEventListener("click", performSearch);

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            performSearch();
        }
    });

    if (dateInput) {
        dateInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                performSearch();
            }
        });
    }
}
