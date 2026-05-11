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
let adults = 1;
let children = 0;
let errorTimeoutId = null;
let typingTimer;

function getToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function getMinDate() {
  const minDate = new Date(getToday());
  minDate.setDate(minDate.getDate() + 7);
  return minDate;
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

function parseNativeDate(value) {
  if (!value) {
    return null;
  }

  const parsedDate = new Date(`${value}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  parsedDate.setHours(0, 0, 0, 0);
  return parsedDate;
}

function isDateAllowed(date) {
  return date >= getMinDate();
}

function getAvailableDatesForDestination(destination) {
  const normalized = destination.trim().toLowerCase();

  if (!normalized || !DESTINATIONS.some((item) => item.toLowerCase() === normalized)) {
    return [];
  }

  const minDate = getMinDate();
  const baseDates = [10, 17, 24].map((offset) => {
    const nextDate = new Date(minDate);
    nextDate.setDate(minDate.getDate() + offset);
    nextDate.setHours(0, 0, 0, 0);
    return nextDate;
  });

  if (normalized === "hongkong" || normalized === "iloilo, philippines") {
    return [];
  }

  if (normalized === "taiwan") {
    return baseDates.slice(0, 2);
  }

  return baseDates;
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
}

function closeBoxesIfEmpty() {
  if (!destinationInput.value.trim()) {
    destinationBox.classList.remove("active");
    suggestionsList.classList.remove("show");
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

function openNativeDatePicker() {
  activateBox(dateBox);
  dateTrigger.setAttribute("aria-expanded", "true");

  window.requestAnimationFrame(() => {
    dateInput.focus();

    if (typeof dateInput.showPicker === "function") {
      dateInput.showPicker();
    }
  });
}

function syncDateInput(date) {
  selectedDate = new Date(date);
  selectedDate.setHours(0, 0, 0, 0);
  dateInput.value = formatDateForInput(selectedDate);
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
    showError(`Please choose a date on or after ${formatDate(getMinDate())}.`);
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
      suggestionsList.classList.remove("show");
      focusDestinationInput();
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

destinationBox.addEventListener("click", (event) => {
  if (event.target.closest(".suggestions")) {
    return;
  }

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

dateBox.addEventListener("click", () => {
  activateBox(dateBox);
});

dateTrigger.addEventListener("click", (event) => {
  event.stopPropagation();
  openNativeDatePicker();
});

dateBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    dateTrigger.focus();
  }
});

dateInput.addEventListener("input", () => {
  activateBox(dateBox);
  applySelectedDate();
});

dateInput.addEventListener("change", () => {
  activateBox(dateBox);
  applySelectedDate();
});

dateInput.addEventListener("blur", () => {
  closeDatePanel();
});

peopleBox.addEventListener("click", (event) => {
  if (event.target.closest(".people-dropdown")) {
    return;
  }

  activateBox(peopleBox);
  peopleDropdown.classList.add("show");
  peopleBox.classList.add("dropdown-open");
});

peopleDisplay.addEventListener("click", (event) => {
  event.stopPropagation();
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

  window.location.href = `destinations.html?${searchParams.toString()}#destination-columns`;
});

dateInput.min = formatDateForInput(getMinDate());
refreshPeopleLabel();
updatePersistentStates();
