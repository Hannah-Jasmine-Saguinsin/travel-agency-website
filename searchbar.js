const DESTINATIONS = [
  "South Korea",
  "Shanghai, China",
  "Taiwan",
  "Hongkong",
  "Singapore",
  "Thailand",
  "Japan",
  "Batanes, Philippines",
  "El Nido, Philippines",
  "Siargao, Philippines",
  "Iloilo, Philippines",
  "Boracay, Philippines"
];

const PACKAGE_DATE_RANGES = {
  "south korea": [
    ["2026-09-02", "2026-09-07"],
    ["2026-10-16", "2026-10-21"],
    ["2026-10-17", "2026-10-22"],
    ["2026-11-02", "2026-11-07"],
    ["2026-11-12", "2026-11-17"],
    ["2026-11-14", "2026-11-19"],
    ["2026-11-20", "2026-11-25"],
    ["2026-11-22", "2026-11-27"],
    ["2026-11-26", "2026-12-01"],
    ["2026-11-29", "2026-12-04"],
    ["2026-11-30", "2026-12-05"],
    ["2026-04-16", "2026-04-21"],
    ["2026-04-21", "2026-04-26"],
    ["2026-04-23", "2026-04-28"],
    ["2026-05-09", "2026-05-14"],
    ["2026-05-16", "2026-05-21"],
    ["2026-10-27", "2026-11-01"],
    ["2026-11-28", "2026-12-03"],
    ["2026-12-19", "2026-12-24"],
    ["2026-12-22", "2026-12-27"],
    ["2026-12-24", "2026-12-29"],
    ["2026-12-25", "2026-12-30"],
    ["2026-12-28", "2027-01-02"]
  ],
  "shanghai, china": [
    ["2026-05-20", "2026-05-24"],
    ["2026-05-29", "2026-06-02"],
    ["2026-05-27", "2026-05-31"],
    ["2026-06-08", "2026-06-12"],
    ["2026-06-09", "2026-06-13"],
    ["2026-06-12", "2026-06-16"],
    ["2026-08-25", "2026-08-29"],
    ["2026-09-02", "2026-09-06"],
    ["2026-09-17", "2026-09-21"],
    ["2026-09-30", "2026-10-04"],
    ["2026-10-02", "2026-10-06"],
    ["2026-10-08", "2026-10-12"],
    ["2026-10-26", "2026-10-30"],
    ["2026-10-28", "2026-11-01"],
    ["2026-10-29", "2026-11-02"],
    ["2026-10-30", "2026-11-03"],
    ["2026-11-03", "2026-11-07"],
    ["2026-11-06", "2026-11-10"],
    ["2026-11-12", "2026-11-16"],
    ["2026-11-26", "2026-11-30"],
    ["2026-12-05", "2026-12-09"],
    ["2026-12-27", "2026-12-31"],
    ["2026-12-28", "2027-01-01"],
    ["2027-02-24", "2027-02-28"],
    ["2027-03-04", "2027-03-08"]
  ],
  "taiwan": [
    ["2026-06-03", "2026-06-07"],
    ["2026-06-09", "2026-06-13"],
    ["2026-07-24", "2026-07-28"],
    ["2026-08-21", "2026-08-25"],
    ["2026-09-09", "2026-09-13"],
    ["2026-10-28", "2026-11-01"],
    ["2026-11-27", "2026-12-01"],
    ["2026-12-08", "2026-12-12"],
    ["2026-12-22", "2026-12-26"],
    ["2026-12-23", "2026-12-27"],
    ["2026-12-24", "2026-12-28"],
    ["2026-12-25", "2026-12-29"],
    ["2026-12-26", "2026-12-30"],
    ["2026-12-30", "2027-01-03"]
  ],
  "hongkong": [
    ["2026-05-06", "2026-05-09"],
    ["2026-05-15", "2026-05-18"],
    ["2026-05-21", "2026-05-24"],
    ["2026-06-10", "2026-06-13"],
    ["2026-08-20", "2026-08-23"],
    ["2026-09-11", "2026-09-14"],
    ["2026-10-28", "2026-10-31"],
    ["2026-11-28", "2026-12-01"],
    ["2026-12-22", "2026-12-25"],
    ["2026-12-23", "2026-12-26"],
    ["2026-12-25", "2026-12-28"],
    ["2026-12-26", "2026-12-29"],
    ["2026-12-27", "2026-12-30"]
  ],
  "singapore": [
    ["2026-04-29", "2026-05-02"],
    ["2026-04-30", "2026-05-03"],
    ["2026-05-06", "2026-05-09"],
    ["2026-05-13", "2026-05-16"],
    ["2026-05-28", "2026-05-31"],
    ["2026-06-09", "2026-06-12"],
    ["2026-07-02", "2026-07-06"],
    ["2026-08-27", "2026-08-31"],
    ["2026-09-23", "2026-09-26"],
    ["2026-10-28", "2026-11-01"],
    ["2026-11-26", "2026-11-30"],
    ["2026-12-04", "2026-12-08"],
    ["2026-12-23", "2026-12-27"],
    ["2026-12-24", "2026-12-28"],
    ["2026-12-25", "2026-12-29"],
    ["2026-12-26", "2026-12-30"],
    ["2026-12-31", "2027-01-04"],
    ["2027-01-13", "2027-01-17"],
    ["2027-02-11", "2027-02-15"],
    ["2027-02-24", "2027-02-28"],
    ["2027-03-23", "2027-03-27"]
  ],
  "thailand": [
    ["2026-04-30", "2026-05-03"],
    ["2026-05-01", "2026-05-05"],
    ["2026-05-06", "2026-05-10"],
    ["2026-06-10", "2026-06-14"],
    ["2026-06-12", "2026-06-16"],
    ["2026-07-22", "2026-07-26"],
    ["2026-08-21", "2026-08-25"],
    ["2026-08-27", "2026-08-31"],
    ["2026-09-16", "2026-09-20"],
    ["2026-10-31", "2026-11-04"],
    ["2026-11-29", "2026-12-03"],
    ["2026-12-05", "2026-12-09"],
    ["2026-12-22", "2026-12-26"],
    ["2026-12-26", "2026-12-30"],
    ["2026-12-29", "2027-01-02"],
    ["2027-01-12", "2027-01-16"],
    ["2027-02-10", "2027-02-14"],
    ["2027-02-11", "2027-02-15"],
    ["2027-02-24", "2027-02-28"],
    ["2027-03-23", "2027-03-27"],
    ["2027-03-24", "2027-03-28"]
  ],
  "japan": [
    ["2026-04-07", "2026-04-11"],
    ["2026-04-22", "2026-04-26"],
    ["2026-05-06", "2026-05-10"],
    ["2026-05-16", "2026-05-20"],
    ["2026-06-10", "2026-06-14"],
    ["2026-08-27", "2026-08-31"],
    ["2026-10-27", "2026-10-31"],
    ["2026-11-27", "2026-12-01"],
    ["2026-12-21", "2026-12-25"],
    ["2026-12-24", "2026-12-28"],
    ["2026-12-25", "2026-12-29"],
    ["2026-07-29", "2026-08-02"],
    ["2026-09-15", "2026-09-19"],
    ["2026-11-02", "2026-11-06"],
    ["2026-11-26", "2026-11-30"],
    ["2026-12-08", "2026-12-12"],
    ["2026-12-17", "2026-12-21"]
  ],
  "batanes, philippines": [
    ["2026-05-15", "2026-05-18"],
    ["2026-06-26", "2026-06-29"],
    ["2026-07-10", "2026-07-13"],
    ["2026-08-21", "2026-08-24"],
    ["2026-09-04", "2026-09-07"],
    ["2026-10-30", "2026-11-02"],
    ["2026-11-20", "2026-11-23"],
    ["2026-12-23", "2026-12-26"],
    ["2026-12-30", "2027-01-02"]
  ],
  "el nido, philippines": [
    ["2026-04-10", "2026-04-13"],
    ["2026-04-16", "2026-04-19"],
    ["2026-04-23", "2026-04-26"],
    ["2026-04-28", "2026-05-01"],
    ["2026-04-30", "2026-05-03"],
    ["2026-05-01", "2026-05-04"],
    ["2026-05-08", "2026-05-11"],
    ["2026-05-13", "2026-05-16"],
    ["2026-05-21", "2026-05-24"],
    ["2026-05-28", "2026-05-31"],
    ["2026-06-11", "2026-06-14"],
    ["2026-07-02", "2026-07-05"],
    ["2026-08-28", "2026-08-31"],
    ["2026-09-17", "2026-10-31"],
    ["2026-10-28", "2026-12-01"],
    ["2026-12-24", "2026-12-27"]
  ],
  "siargao, philippines": [
    ["2026-03-28", "2026-04-01"],
    ["2026-04-09", "2026-04-13"],
    ["2026-04-30", "2026-05-04"],
    ["2026-06-12", "2026-06-16"]
  ],
  "iloilo, philippines": [
    ["2026-04-30", "2026-05-03"],
    ["2026-05-01", "2026-05-04"],
    ["2026-05-08", "2026-05-11"],
    ["2026-05-13", "2026-05-16"],
    ["2026-06-10", "2026-06-13"],
    ["2026-07-22", "2026-07-25"],
    ["2026-08-20", "2026-08-23"],
    ["2026-09-10", "2026-09-13"],
    ["2026-10-29", "2026-11-01"],
    ["2026-11-27", "2026-11-30"]
  ]
};

const DESTINATION_LINKS = DESTINATIONS.reduce((links, destination) => {
  links[destination.toLowerCase()] = `destinations.html?destination=${encodeURIComponent(destination)}#destination-columns`;
  return links;
}, {});

const destinationBox = document.getElementById("destination-box");
const destinationInput = document.getElementById("destination-input");
const suggestionsList = document.getElementById("suggestions");

const dateBox = document.getElementById("date-box");
const dateInput = document.getElementById("date-input");
const dateTrigger = document.getElementById("date-trigger");
const calendarDropdown = document.createElement("div");
calendarDropdown.className = "calendar-dropdown";
calendarDropdown.id = "calendar-dropdown";
calendarDropdown.setAttribute("role", "dialog");
calendarDropdown.setAttribute("aria-label", "Available travel dates");
dateBox.appendChild(calendarDropdown);

const peopleBox = document.getElementById("people-box");
const peopleDisplay = document.getElementById("people-display");
const peopleLabel = document.getElementById("people-label");
const peopleDropdown = document.getElementById("people-dropdown");

const adultDec = document.getElementById("adult-dec");
const adultInc = document.getElementById("adult-inc");
const adultCount = document.getElementById("adult-count");
const childDec = document.getElementById("child-dec");
const childInc = document.getElementById("child-inc");
const childCount = document.getElementById("child-count");

const searchBtn = document.getElementById("search-button");
const searchBar = document.querySelector(".search-bar");

let selectedDate = null;
let calendarViewDate = new Date(2026, 3, 1);
let calendarMode = "months";
let adults = 1;
let children = 0;
let errorTimeoutId = null;
let typingTimer;
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fullMonthNames = [
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

function getToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function formatDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

function formatDateForInput(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

function parseIsoDate(value) {
  const parsedDate = new Date(`${value}T00:00:00`);
  parsedDate.setHours(0, 0, 0, 0);
  return parsedDate;
}

function parseNativeDate(value) {
  if (!value) {
    return null;
  }

  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const displayMatch = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  const parsedDate = isoMatch
    ? new Date(`${value}T00:00:00`)
    : displayMatch
      ? new Date(Number(displayMatch[3]), Number(displayMatch[1]) - 1, Number(displayMatch[2]))
      : new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  parsedDate.setHours(0, 0, 0, 0);
  return parsedDate;
}

function isDateAllowed(date) {
  return date >= getToday();
}

function getAvailableDatesForDestination(destination) {
  const normalized = destination.trim().toLowerCase();

  if (!normalized || !DESTINATIONS.some((item) => item.toLowerCase() === normalized)) {
    return [];
  }

  const ranges = PACKAGE_DATE_RANGES[normalized] || [];
  const dates = [];

  ranges.forEach(([startValue, endValue]) => {
    const currentDate = parseIsoDate(startValue);
    const endDate = parseIsoDate(endValue);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  return dates.filter((date, index, allDates) =>
    isDateAllowed(date) && allDates.findIndex((item) => sameDate(item, date)) === index
  );
}

function sameDate(dateA, dateB) {
  return (
    dateA &&
    dateB &&
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

function setBoxPersistentState(box, hasValue) {
  box.classList.toggle("filled", hasValue);
}

function activateBox(box) {
  box.classList.add("active");
}

function updatePersistentStates() {
  setBoxPersistentState(destinationBox, destinationInput.value.trim().length > 0);
  setBoxPersistentState(dateBox, Boolean(selectedDate || dateInput.value));
  setBoxPersistentState(peopleBox, adults > 1 || children > 0);
}

function closeDatePanel() {
  dateTrigger.setAttribute("aria-expanded", "false");
  calendarDropdown.classList.remove("show");
}

function closeDestinationPanel() {
  suggestionsList.innerHTML = "";
  suggestionsList.classList.remove("show");
}

function closeBoxesIfEmpty() {
  if (!destinationInput.value.trim()) {
    destinationBox.classList.remove("active");
    closeDestinationPanel();
  }

  if (!dateInput.value && !selectedDate) {
    dateBox.classList.remove("active");
    closeDatePanel();
  }

  if (adults <= 1 && children <= 0) {
    peopleBox.classList.remove("active");
    peopleDropdown.classList.remove("show");
    peopleBox.classList.remove("dropdown-open");
  }
}

function openDestinationPanel() {
  activateBox(destinationBox);

  const value = destinationInput.value.trim();

  if (value.length > 0) {
    buildSuggestions(value);
  } else {
    suggestionsList.innerHTML = "";
    suggestionsList.classList.remove("show");
  }
}

function focusDestinationInput() {
  window.requestAnimationFrame(() => {
    destinationInput.focus();
    const valueLength = destinationInput.value.length;
    destinationInput.setSelectionRange(valueLength, valueLength);
  });
}

function getCurrentDestination() {
  return getDestinationMatch(destinationInput.value.trim());
}

function getAvailableDateKeysForDestination(destination) {
  return new Set(getAvailableDatesForDestination(destination).map(formatDateForInput));
}

function getAvailableMonthKeysForDestination(destination) {
  const monthKeys = new Set();

  getAvailableDatesForDestination(destination).forEach((date) => {
    monthKeys.add(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`);
  });

  return monthKeys;
}

function getFirstAvailableDate(destination) {
  return getAvailableDatesForDestination(destination).sort((a, b) => a - b)[0] || null;
}

function ensureCalendarMonth(destination) {
  if (selectedDate && destinationHasAvailableDate(destination, selectedDate)) {
    calendarViewDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    return;
  }

  const firstAvailableDate = getFirstAvailableDate(destination);
  if (firstAvailableDate) {
    calendarViewDate = new Date(firstAvailableDate.getFullYear(), firstAvailableDate.getMonth(), 1);
  }
}

function renderCalendar() {
  const destination = getCurrentDestination();
  calendarDropdown.innerHTML = "";

  if (!destination) {
    calendarDropdown.innerHTML = '<p class="cal-empty">Select a destination first.</p>';
    return;
  }

  const availableDates = getAvailableDatesForDestination(destination);
  if (!availableDates.length) {
    calendarDropdown.innerHTML = '<p class="cal-empty">No available dates for this destination.</p>';
    return;
  }

  const header = document.createElement("div");
  header.className = "cal-header";

  const previousButton = document.createElement("button");
  previousButton.type = "button";
  previousButton.className = "cal-nav-btn";
  previousButton.setAttribute("aria-label", "Previous year");
  previousButton.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.className = "cal-nav-btn";
  nextButton.setAttribute("aria-label", "Next year");
  nextButton.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

  const center = document.createElement("div");
  center.className = "cal-header-center";

  const yearButton = document.createElement("button");
  yearButton.type = "button";
  yearButton.className = "cal-year";
  yearButton.textContent = String(calendarViewDate.getFullYear());

  const monthButton = document.createElement("button");
  monthButton.type = "button";
  monthButton.className = "cal-month";
  monthButton.textContent = calendarMode === "months"
    ? "Choose Month"
    : fullMonthNames[calendarViewDate.getMonth()];

  center.append(yearButton, monthButton);
  header.append(previousButton, center, nextButton);
  calendarDropdown.appendChild(header);

  previousButton.addEventListener("click", (event) => {
    event.stopPropagation();
    calendarViewDate.setFullYear(calendarViewDate.getFullYear() - 1);
    renderCalendar();
  });

  nextButton.addEventListener("click", (event) => {
    event.stopPropagation();
    calendarViewDate.setFullYear(calendarViewDate.getFullYear() + 1);
    renderCalendar();
  });

  monthButton.addEventListener("click", (event) => {
    event.stopPropagation();
    calendarMode = "months";
    renderCalendar();
  });

  yearButton.addEventListener("click", (event) => {
    event.stopPropagation();
    calendarMode = "months";
    renderCalendar();
  });

  if (calendarMode === "months") {
    renderMonthPicker(destination);
    return;
  }

  renderDayPicker(destination);
}

function renderMonthPicker(destination) {
  const availableMonthKeys = getAvailableMonthKeysForDestination(destination);
  const picker = document.createElement("div");
  picker.className = "cal-month-picker";

  monthNames.forEach((monthName, monthIndex) => {
    const monthKey = `${calendarViewDate.getFullYear()}-${String(monthIndex + 1).padStart(2, "0")}`;
    const option = document.createElement("button");
    option.type = "button";
    option.className = "cal-month-option";
    option.textContent = monthName;
    option.disabled = !availableMonthKeys.has(monthKey);

    if (calendarViewDate.getMonth() === monthIndex) {
      option.classList.add("cal-month-option--selected");
    }

    option.addEventListener("click", (event) => {
      event.stopPropagation();
      calendarViewDate = new Date(calendarViewDate.getFullYear(), monthIndex, 1);
      calendarMode = "days";
      renderCalendar();
    });

    picker.appendChild(option);
  });

  calendarDropdown.appendChild(picker);
}

function renderDayPicker(destination) {
  const availableDateKeys = getAvailableDateKeysForDestination(destination);
  const daysRow = document.createElement("div");
  daysRow.className = "cal-days-row";

  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((dayName) => {
    const day = document.createElement("span");
    day.className = "cal-day-name";
    day.textContent = dayName;
    daysRow.appendChild(day);
  });

  const grid = document.createElement("div");
  grid.className = "cal-grid";

  const year = calendarViewDate.getFullYear();
  const month = calendarViewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i += 1) {
    const emptyCell = document.createElement("span");
    emptyCell.className = "cal-cell cal-cell--empty";
    grid.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const cellDate = new Date(year, month, day);
    cellDate.setHours(0, 0, 0, 0);
    const dateKey = formatDateForInput(cellDate);
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "cal-cell";
    cell.textContent = String(day);
    cell.disabled = !availableDateKeys.has(dateKey);

    if (cell.disabled) {
      cell.classList.add("cal-cell--disabled");
    }

    if (sameDate(cellDate, selectedDate)) {
      cell.classList.add("cal-cell--selected");
    }

    cell.addEventListener("click", (event) => {
      event.stopPropagation();
      syncDateInput(cellDate);
      closeDatePanel();
      clearError();
    });

    grid.appendChild(cell);
  }

  calendarDropdown.append(daysRow, grid);
}

function openDateCalendar() {
  activateBox(dateBox);
  dateTrigger.setAttribute("aria-expanded", "true");
  calendarDropdown.classList.add("show");

  const destination = getCurrentDestination();

  if (!destination) {
    showError("Please select a destination first.");
  } else {
    ensureCalendarMonth(destination);
    calendarMode = "months";
    clearError();
  }

  renderCalendar();
}

function syncDateInput(date) {
  selectedDate = new Date(date);
  selectedDate.setHours(0, 0, 0, 0);
  dateInput.value = formatDate(selectedDate);
  dateInput.dataset.filled = "true";
  updatePersistentStates();
}

function clearDateSelection() {
  selectedDate = null;
  dateInput.value = "";
  delete dateInput.dataset.filled;
  updatePersistentStates();
}

function applySelectedDate() {
  const parsedDate = parseNativeDate(dateInput.value);

  if (!parsedDate) {
    clearDateSelection();
    return true;
  }

  if (!isDateAllowed(parsedDate)) {
    showError(`Please choose a date on or after ${formatDate(getToday())}.`);
    clearDateSelection();
    return false;
  }

  const destination = getCurrentDestination();
  if (destination && !destinationHasAvailableDate(destination, parsedDate)) {
    showError("Please choose one of the available package dates.");
    clearDateSelection();
    return false;
  }

  syncDateInput(parsedDate);
  clearError();
  return true;
}

function normalizeDestinationValue(value) {
  return value.replace(/[0-9]/g, "").replace(/\s{2,}/g, " ");
}

function buildSuggestions(query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    suggestionsList.innerHTML = "";
    suggestionsList.classList.remove("show");
    return;
  }

  suggestionsList.innerHTML = "";

  const matches = DESTINATIONS.filter((destination) =>
    destination.toLowerCase().includes(normalizedQuery)
  );

  if (matches.length === 0) {
    suggestionsList.classList.remove("show");
    return;
  }

  matches.forEach((destination) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "suggestion-item";
    option.textContent = destination;

    option.addEventListener("click", (event) => {
      event.stopPropagation();
      destinationInput.value = destination;
      activateBox(destinationBox);
      updatePersistentStates();
      clearError();
      closeDestinationPanel();
      refreshSelectedDateForDestination();
      dateTrigger.focus();
    });

    suggestionsList.appendChild(option);
  });

  suggestionsList.classList.add("show");
}

function refreshPeopleLabel() {
  const parts = [`${adults} adult${adults !== 1 ? "s" : ""}`];

  if (children > 0) {
    parts.push(`${children} ${children === 1 ? "child" : "children"}`);
  }

  peopleLabel.textContent = parts.join(", ");
  adultCount.textContent = adults;
  childCount.textContent = children;
  adultDec.disabled = adults <= 1;
  childDec.disabled = children <= 0;
  updatePersistentStates();
}

function showError(message, linkText, linkHref) {
  clearError();

  const errorBox = document.createElement("div");
  errorBox.className = "search-error";
  errorBox.id = "searchError";

  const messageNode = document.createElement("span");
  messageNode.textContent = `${message} `;
  errorBox.appendChild(messageNode);

  if (linkText) {
    const link = document.createElement("a");
    link.className = "search-error__link";
    link.href = linkHref || "#packages";
    link.textContent = linkText;
    errorBox.appendChild(link);
  }

  searchBar.insertAdjacentElement("afterend", errorBox);

  errorTimeoutId = window.setTimeout(() => {
    clearError();
  }, 4000);
}

function clearError() {
  if (errorTimeoutId) {
    clearTimeout(errorTimeoutId);
    errorTimeoutId = null;
  }

  const existingError = document.getElementById("searchError");
  if (existingError) {
    existingError.remove();
  }
}

function getDestinationMatch(value) {
  const normalized = value.trim().toLowerCase();
  return DESTINATIONS.find((destination) => destination.toLowerCase() === normalized) || null;
}

function getDestinationPackagesLink(destination) {
  return DESTINATION_LINKS[destination.toLowerCase()] || "#packages";
}

function destinationHasAvailableDate(destination, date) {
  return getAvailableDatesForDestination(destination).some((availableDate) => sameDate(availableDate, date));
}

function refreshSelectedDateForDestination() {
  const destination = getCurrentDestination();

  if (selectedDate && (!destination || !destinationHasAvailableDate(destination, selectedDate))) {
    clearDateSelection();
  }

  if (calendarDropdown.classList.contains("show")) {
    if (destination) {
      ensureCalendarMonth(destination);
    }

    renderCalendar();
  }
}

destinationBox.addEventListener("click", (event) => {
  if (event.target.closest(".suggestions")) {
    return;
  }

  closeDatePanel();
  openDestinationPanel();
  focusDestinationInput();
});

destinationInput.addEventListener("click", (event) => {
  event.stopPropagation();
  openDestinationPanel();
});

destinationBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openDestinationPanel();
    focusDestinationInput();
  }
});

destinationInput.addEventListener("input", (event) => {
  clearTimeout(typingTimer);

  const sanitizedValue = normalizeDestinationValue(event.target.value);

  if (sanitizedValue !== event.target.value) {
    event.target.value = sanitizedValue;
  }

  activateBox(destinationBox);
  updatePersistentStates();
  refreshSelectedDateForDestination();
  clearError();

  typingTimer = window.setTimeout(() => {
    buildSuggestions(event.target.value);
  }, 150);
});

destinationInput.addEventListener("focus", () => {
  openDestinationPanel();
});

destinationInput.addEventListener("keydown", (event) => {
  if (/^\d$/.test(event.key)) {
    event.preventDefault();
  }
});

dateBox.addEventListener("click", (event) => {
  if (event.target.closest(".calendar-dropdown")) {
    return;
  }

  openDateCalendar();
});

dateTrigger.addEventListener("click", (event) => {
  event.stopPropagation();
  openDateCalendar();
});

dateBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openDateCalendar();
  }
});

dateInput.addEventListener("input", () => {
  openDateCalendar();
});

dateInput.addEventListener("change", () => {
  activateBox(dateBox);
  applySelectedDate();
});

dateInput.addEventListener("click", (event) => {
  event.stopPropagation();
  openDateCalendar();
});

peopleBox.addEventListener("click", (event) => {
  if (event.target.closest(".people-dropdown")) {
    return;
  }

  closeDatePanel();
  activateBox(peopleBox);
  peopleDropdown.classList.add("show");
  peopleBox.classList.add("dropdown-open");
});

peopleDisplay.addEventListener("click", (event) => {
  event.stopPropagation();
  closeDatePanel();
  activateBox(peopleBox);
  peopleDropdown.classList.add("show");
  peopleBox.classList.add("dropdown-open");
});

peopleBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    activateBox(peopleBox);
    peopleDropdown.classList.add("show");
    peopleBox.classList.add("dropdown-open");
  }
});

adultInc.addEventListener("click", (event) => {
  event.stopPropagation();
  adults += 1;
  refreshPeopleLabel();
  clearError();
});

adultDec.addEventListener("click", (event) => {
  event.stopPropagation();
  if (adults > 1) {
    adults -= 1;
    refreshPeopleLabel();
    clearError();
  }
});

childInc.addEventListener("click", (event) => {
  event.stopPropagation();
  children += 1;
  refreshPeopleLabel();
  clearError();
});

childDec.addEventListener("click", (event) => {
  event.stopPropagation();
  if (children > 0) {
    children -= 1;
    refreshPeopleLabel();
    clearError();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".search-bar") && !event.target.closest(".search-error")) {
    closeDatePanel();
    closeBoxesIfEmpty();
  }
});

searchBtn.addEventListener("click", () => {
  clearError();

  const destinationValue = destinationInput.value.trim();
  const matchedDestination = getDestinationMatch(destinationValue);
  const hasDateText = Boolean(dateInput.value);
  const selectedDateIsValid = !hasDateText || applySelectedDate();

  if (!selectedDateIsValid) {
    activateBox(dateBox);
    return;
  }

  const hasSelectedDate = Boolean(selectedDate);

  if (!destinationValue && !hasSelectedDate) {
    showError("Please enter a destination and select a travel date.");
    return;
  }

  if (!destinationValue) {
    showError("Please enter a destination.");
    return;
  }

  if (!matchedDestination && !hasSelectedDate) {
    showError("No available destinations and dates.", "Click here", "#packages");
    return;
  }

  if (!matchedDestination) {
    showError("No available destinations.", "Click here", "#packages");
    return;
  }

  const destinationLink = getDestinationPackagesLink(matchedDestination);
  const availableDates = getAvailableDatesForDestination(matchedDestination);

  if (!availableDates.length) {
    showError("No available dates.", "Click here", destinationLink);
    return;
  }

  if (!hasSelectedDate) {
    showError("Please select a travel date.");
    return;
  }

  if (!destinationHasAvailableDate(matchedDestination, selectedDate)) {
    showError("No available dates.", "Click here", destinationLink);
    return;
  }

  const searchParams = new URLSearchParams({
    destination: matchedDestination,
    date: formatDate(selectedDate),
    adults: String(adults),
    children: String(children)
  });

  window.location.href = `destinations.html?${searchParams.toString()}`;
});

refreshPeopleLabel();
updatePersistentStates();
