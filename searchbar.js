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
    "Cebu, Philippines",
    "Boracay, Philippines",
    "Siargao, Philippines",
    "Bohol, Philippines"
];

const destinationBox = document.getElementById("destination-box");
const destinationInput = document.getElementById("destination-input");
const suggestionsEl = document.getElementById("suggestions");
const dateBox = document.getElementById("date-box");
const dateDisplay = document.getElementById("date-display");
const datePlaceholder = document.getElementById("date-placeholder");
const calendarDropdown = document.getElementById("calendar-dropdown");
const peopleBox = document.getElementById("people-box");
const peopleDisplay = document.getElementById("people-display");
const peopleDropdown = document.getElementById("people-dropdown");
const peopleLabel = document.getElementById("people-label");
const searchButton = document.getElementById("search-button");
const adultCountEl = document.getElementById("adult-count");
const childCountEl = document.getElementById("child-count");
const adultIncBtn = document.getElementById("adult-inc");
const adultDecBtn = document.getElementById("adult-dec");
const childIncBtn = document.getElementById("child-inc");
const childDecBtn = document.getElementById("child-dec");

if (
    !destinationBox ||
    !destinationInput ||
    !suggestionsEl ||
    !dateBox ||
    !dateDisplay ||
    !datePlaceholder ||
    !calendarDropdown ||
    !peopleBox ||
    !peopleDisplay ||
    !peopleDropdown ||
    !peopleLabel ||
    !searchButton
) {
    console.warn("Search bar elements are missing.");
} else {
    let selectedDate = null;
    let calendarYear = 0;
    let calendarMonth = 0;
    let adults = Number(adultCountEl?.textContent) || 1;
    let children = Number(childCountEl?.textContent) || 0;

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const getToday = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    };

    const getMinSelectableDate = () => {
        const minDate = getToday();
        minDate.setDate(minDate.getDate() + 7);
        return minDate;
    };

    const formatDisplayDate = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const setActiveBox = (activeBox = null) => {
        [destinationBox, dateBox, peopleBox].forEach((box) => {
            box.classList.toggle("active", box === activeBox);
        });
    };

    const hideSuggestions = () => {
        suggestionsEl.classList.remove("show");
        suggestionsEl.innerHTML = "";
    };

    const renderSuggestions = (matches) => {
        suggestionsEl.innerHTML = "";

        if (!matches.length) {
            hideSuggestions();
            return;
        }

        matches.forEach((destination) => {
            const item = document.createElement("button");
            item.type = "button";
            item.className = "suggestion-item";
            item.textContent = destination;
            item.setAttribute("role", "option");

            item.addEventListener("click", () => {
                destinationInput.value = destination;
                hideSuggestions();
                setActiveBox(destinationBox);
                destinationInput.focus();
            });

            suggestionsEl.appendChild(item);
        });

        suggestionsEl.classList.add("show");
    };

    const filterDestinations = () => {
        const value = destinationInput.value.trim().toLowerCase();

        if (!value) {
            hideSuggestions();
            return;
        }

        const matches = destinations.filter((destination) =>
            destination.toLowerCase().includes(value)
        );

        renderSuggestions(matches);
    };

    const syncPeopleCount = () => {
        if (adultCountEl) {
            adultCountEl.textContent = String(adults);
        }

        if (childCountEl) {
            childCountEl.textContent = String(children);
        }

        let label = adults === 1 ? "1 adult" : `${adults} adults`;

        if (children > 0) {
            label += children === 1 ? ", 1 child" : `, ${children} children`;
        }

        peopleLabel.textContent = label;
    };

    const updateSelectedDate = (date) => {
        selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);
        datePlaceholder.textContent = formatDisplayDate(selectedDate);
        datePlaceholder.dataset.filled = "true";
        dateDisplay.dataset.filled = "true";
    };

    const clearSelectedDate = () => {
        selectedDate = null;
        datePlaceholder.textContent = "dd/mm/yyyy";
        delete datePlaceholder.dataset.filled;
        delete dateDisplay.dataset.filled;
    };

    const ensureCalendarWindow = () => {
        const minDate = getMinSelectableDate();

        if (selectedDate && selectedDate < minDate) {
            clearSelectedDate();
        }

        const basisDate = selectedDate && selectedDate >= minDate ? selectedDate : minDate;
        calendarYear = basisDate.getFullYear();
        calendarMonth = basisDate.getMonth();
    };

    const closeAll = () => {
        hideSuggestions();
        calendarDropdown.classList.remove("show");
        peopleDropdown.classList.remove("show");
        dateBox.classList.remove("dropdown-open");
        peopleBox.classList.remove("dropdown-open");
        setActiveBox(null);
    };

    const buildCalendar = (year, month) => {
        const minDate = getMinSelectableDate();
        calendarDropdown.innerHTML = "";

        const header = document.createElement("div");
        header.className = "cal-header";

        const prevBtn = document.createElement("button");
        prevBtn.type = "button";
        prevBtn.className = "cal-nav-btn";
        prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
        prevBtn.addEventListener("click", (event) => {
            event.stopPropagation();

            const previousMonthDate = new Date(calendarYear, calendarMonth - 1, 1);
            const firstAllowedMonth = new Date(minDate.getFullYear(), minDate.getMonth(), 1);

            if (previousMonthDate < firstAllowedMonth) {
                return;
            }

            calendarYear = previousMonthDate.getFullYear();
            calendarMonth = previousMonthDate.getMonth();
            buildCalendar(calendarYear, calendarMonth);
        });

        const firstAllowedMonth = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
        const currentMonthDate = new Date(year, month, 1);
        prevBtn.disabled = currentMonthDate <= firstAllowedMonth;

        const headerCenter = document.createElement("div");
        headerCenter.className = "cal-header-center";
        headerCenter.innerHTML = `
            <span class="cal-year">${year}</span>
            <span class="cal-month">${monthNames[month].toUpperCase()}</span>
        `;

        const nextBtn = document.createElement("button");
        nextBtn.type = "button";
        nextBtn.className = "cal-nav-btn";
        nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        nextBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            const nextMonthDate = new Date(calendarYear, calendarMonth + 1, 1);
            calendarYear = nextMonthDate.getFullYear();
            calendarMonth = nextMonthDate.getMonth();
            buildCalendar(calendarYear, calendarMonth);
        });

        header.append(prevBtn, headerCenter, nextBtn);
        calendarDropdown.appendChild(header);

        const daysRow = document.createElement("div");
        daysRow.className = "cal-days-row";

        dayNames.forEach((day) => {
            const dayLabel = document.createElement("span");
            dayLabel.className = "cal-day-name";
            dayLabel.textContent = day;
            daysRow.appendChild(dayLabel);
        });

        calendarDropdown.appendChild(daysRow);

        const grid = document.createElement("div");
        grid.className = "cal-grid";

        const firstWeekday = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstWeekday; i += 1) {
            const emptyCell = document.createElement("span");
            emptyCell.className = "cal-cell cal-cell--empty";
            grid.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day += 1) {
            const cell = document.createElement("button");
            const cellDate = new Date(year, month, day);
            cellDate.setHours(0, 0, 0, 0);

            cell.type = "button";
            cell.className = "cal-cell";
            cell.textContent = String(day);

            if (cellDate < minDate) {
                cell.classList.add("cal-cell--disabled");
                cell.disabled = true;
            } else {
                if (selectedDate && cellDate.getTime() === selectedDate.getTime()) {
                    cell.classList.add("cal-cell--selected");
                }

                cell.addEventListener("click", (event) => {
                    event.stopPropagation();
                    updateSelectedDate(cellDate);
                    calendarDropdown.classList.remove("show");
                    dateBox.classList.remove("dropdown-open");
                    setActiveBox(dateBox);
                    buildCalendar(calendarYear, calendarMonth);
                });
            }

            grid.appendChild(cell);
        }

        calendarDropdown.appendChild(grid);
    };

    const performSearch = () => {
        const destination = destinationInput.value.trim();
        const date = datePlaceholder.dataset.filled ? datePlaceholder.textContent : "";
        const people = peopleLabel.textContent.trim();

        if (!destination) {
            destinationBox.classList.add("sb-error");
            destinationInput.focus();
            window.setTimeout(() => destinationBox.classList.remove("sb-error"), 1500);
            return;
        }

        const params = new URLSearchParams({
            destination,
            people
        });

        if (date) {
            params.set("date", date);
        }

        window.location.href = `destinations.html?${params.toString()}`;
    };

    const openDatePicker = () => {
        hideSuggestions();
        peopleDropdown.classList.remove("show");
        peopleBox.classList.remove("dropdown-open");
        ensureCalendarWindow();
        buildCalendar(calendarYear, calendarMonth);
        calendarDropdown.classList.add("show");
        dateBox.classList.add("dropdown-open");
        setActiveBox(dateBox);
    };

    const openPeoplePicker = () => {
        hideSuggestions();
        calendarDropdown.classList.remove("show");
        dateBox.classList.remove("dropdown-open");
        peopleDropdown.classList.add("show");
        peopleBox.classList.add("dropdown-open");
        setActiveBox(peopleBox);
    };

    destinationBox.addEventListener("click", (event) => {
        event.stopPropagation();
        setActiveBox(destinationBox);
        peopleDropdown.classList.remove("show");
        peopleBox.classList.remove("dropdown-open");
        calendarDropdown.classList.remove("show");
        dateBox.classList.remove("dropdown-open");
        destinationInput.focus();
        filterDestinations();
    });

    destinationInput.addEventListener("input", () => {
        setActiveBox(destinationBox);
        filterDestinations();
    });

    destinationInput.addEventListener("focus", () => {
        setActiveBox(destinationBox);
        filterDestinations();
    });

    destinationInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            performSearch();
        }
    });

    dateBox.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = calendarDropdown.classList.contains("show");

        if (isOpen) {
            calendarDropdown.classList.remove("show");
            dateBox.classList.remove("dropdown-open");
            setActiveBox(null);
            return;
        }

        openDatePicker();
    });

    peopleBox.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = peopleDropdown.classList.contains("show");

        if (isOpen) {
            peopleDropdown.classList.remove("show");
            peopleBox.classList.remove("dropdown-open");
            setActiveBox(null);
            return;
        }

        openPeoplePicker();
    });

    adultIncBtn?.addEventListener("click", (event) => {
        event.stopPropagation();
        adults += 1;
        syncPeopleCount();
    });

    adultDecBtn?.addEventListener("click", (event) => {
        event.stopPropagation();
        if (adults > 1) {
            adults -= 1;
            syncPeopleCount();
        }
    });

    childIncBtn?.addEventListener("click", (event) => {
        event.stopPropagation();
        children += 1;
        syncPeopleCount();
    });

    childDecBtn?.addEventListener("click", (event) => {
        event.stopPropagation();
        if (children > 0) {
            children -= 1;
            syncPeopleCount();
        }
    });

    [calendarDropdown, peopleDropdown, suggestionsEl].forEach((element) => {
        element.addEventListener("click", (event) => event.stopPropagation());
    });

    [dateBox, peopleBox].forEach((box) => {
        box.addEventListener("keydown", (event) => {
            if (event.key !== "Enter" && event.key !== " ") {
                return;
            }

            event.preventDefault();

            if (box === dateBox) {
                openDatePicker();
                return;
            }

            openPeoplePicker();
        });
    });

    searchButton.addEventListener("click", performSearch);
    document.addEventListener("click", closeAll);

    syncPeopleCount();
    ensureCalendarWindow();
    buildCalendar(calendarYear, calendarMonth);
}
