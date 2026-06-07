const resetButton = document.querySelector("#resetAll");
const availableCount = document.querySelector("#availableCount");
const occupiedCount = document.querySelector("#occupiedCount");
const floorLabel = document.querySelector("#floorLabel");
const floorButtons = [...document.querySelectorAll(".floor-button")];
const floorPlans = [...document.querySelectorAll(".floor-plan")];

const storageKey = "valora-seat-map-seat-status";
const activeFloorKey = "valora-seat-map-active-floor";

const seatSize = 34;
const smallSeatSize = 34;
const verticalGap = 36;
const rowGap = 38;

let activeFloor = localStorage.getItem(activeFloorKey) || "3";

const verticalSeats = (prefix, x, y, count = 6, size = smallSeatSize, gap = verticalGap) =>
  Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${index + 1}`,
    x,
    y: y + index * gap,
    size,
  }));

const rowSeats = (prefix, x, y, count = 3, size = seatSize, gap = rowGap) =>
  Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${index + 1}`,
    x: x + index * gap,
    y,
    size,
  }));

const floorSeatMaps = {
  "1": [
    { id: "counter-left", x: 82, y: 41, size: 26 },
    { id: "counter-right", x: 172, y: 41, size: 26 },
    ...rowSeats("top-table-1-top", 382, 5, 2, seatSize, 46),
    ...rowSeats("top-table-1-bottom", 382, 97, 2, seatSize, 46),
    ...rowSeats("top-table-2-top", 382, 134, 2, seatSize, 46),
    ...rowSeats("top-table-2-bottom", 382, 218, 2, seatSize, 46),
    { id: "round-top", x: 406, y: 478, size: seatSize },
    { id: "round-right", x: 453, y: 531, size: seatSize },
    { id: "round-bottom", x: 406, y: 584, size: seatSize },
    { id: "round-left", x: 359, y: 531, size: seatSize },
  ],
  "3": [
    ...verticalSeats("14-13-left", 38, 10, 6),
    ...verticalSeats("14-13-right", 170, 10, 6),
    ...verticalSeats("12-11-left", 38, 252, 6),
    ...verticalSeats("12-11-right", 170, 252, 6),
    ...rowSeats("bottom", 4, 614, 4, seatSize, 53),
    ...verticalSeats("8-5-middle-left", 251, 222, 8, seatSize, 45),
    ...verticalSeats("8-5-middle-right", 337, 222, 8, seatSize, 45),
    ...rowSeats("4-top", 420, 143),
    ...rowSeats("4-bottom", 420, 229),
    ...rowSeats("3-top", 420, 274),
    ...rowSeats("3-bottom", 420, 360),
    ...rowSeats("2-top", 420, 405),
    ...rowSeats("2-bottom", 420, 491),
    ...rowSeats("1-top", 420, 535),
    ...rowSeats("1-bottom", 420, 621),
  ],
  "2": [
    ...rowSeats("top-table-1-top", 382, 5, 2, seatSize, 46),
    ...rowSeats("top-table-1-bottom", 382, 97, 2, seatSize, 46),
    ...rowSeats("top-table-2-top", 382, 134, 2, seatSize, 46),
    ...rowSeats("top-table-2-bottom", 382, 218, 2, seatSize, 46),
    { id: "round-left-top", x: 49, y: 505, size: seatSize },
    { id: "round-left-bottom", x: 49, y: 607, size: seatSize },
    { id: "round-right-top", x: 139, y: 505, size: seatSize },
    { id: "round-right-bottom", x: 139, y: 607, size: seatSize },
  ],
};

if (!floorSeatMaps[activeFloor]) {
  activeFloor = "3";
}

const floorNames = {
  "1": "1st floor seats",
  "2": "2nd floor seats",
  "3": "3rd floor seats",
};

const readSavedState = () => {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch {
    return {};
  }
};

const getSeats = (floor = activeFloor) => [
  ...document.querySelectorAll(`.seat[data-floor="${floor}"]`),
];

const getAllSeats = () => [...document.querySelectorAll(".seat")];

const saveState = () => {
  const state = Object.fromEntries(
    getAllSeats().map((seat) => [seat.dataset.seat, seat.classList.contains("occupied-state")])
  );
  localStorage.setItem(storageKey, JSON.stringify(state));
};

const updateCounts = () => {
  const seats = getSeats();
  const occupied = seats.filter((seat) => seat.classList.contains("occupied-state")).length;
  occupiedCount.textContent = occupied;
  availableCount.textContent = seats.length - occupied;
};

const setSeatStatus = (seat, occupied) => {
  seat.classList.toggle("occupied-state", occupied);
  seat.setAttribute("aria-pressed", String(occupied));
  const seatNumber = seat.dataset.seatNumber;
  seat.setAttribute(
    "aria-label",
    `Seat ${seatNumber}, ${occupied ? "occupied" : "available"}`
  );
};

const setActiveFloor = (floor) => {
  activeFloor = floor;
  localStorage.setItem(activeFloorKey, floor);
  floorLabel.textContent = floorNames[floor];

  floorPlans.forEach((plan) => {
    plan.classList.toggle("active", plan.dataset.floor === floor);
  });

  floorButtons.forEach((button) => {
    const selected = button.dataset.floorTarget === floor;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  updateCounts();
};

const savedState = readSavedState();
const floorOrder = ["1", "2", "3"];
let seatNumber = 1;

floorOrder.forEach((floor) => {
  const seatsLayer = document.querySelector(`[data-floor-layer="${floor}"]`);
  const seats = floorSeatMaps[floor];

  if (!seatsLayer || !seats) {
    return;
  }

  seats.forEach(({ id, x, y, size }) => {
    const seat = document.createElement("button");
    const seatId = `floor-${floor}-${id}`;
    const label = document.createElement("span");
    const currentNumber = seatNumber;

    seat.className = "seat";
    if (size < 30) {
      seat.classList.add("seat--compact");
    }
    seat.type = "button";
    seat.dataset.floor = floor;
    seat.dataset.seat = seatId;
    seat.dataset.seatNumber = String(currentNumber);
    seat.style.left = `${x}px`;
    seat.style.top = `${y}px`;
    seat.style.width = `${size}px`;
    seat.style.height = `${size}px`;

    label.className = "seat-number";
    label.textContent = currentNumber;
    seat.append(label);

    setSeatStatus(seat, Boolean(savedState[seatId]));

    seat.addEventListener("click", () => {
      setSeatStatus(seat, !seat.classList.contains("occupied-state"));
      saveState();
      updateCounts();
    });

    seatsLayer.append(seat);
    seatNumber += 1;
  });
});

floorButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveFloor(button.dataset.floorTarget));
});

resetButton.addEventListener("click", () => {
  getSeats().forEach((seat) => setSeatStatus(seat, false));
  saveState();
  updateCounts();
});

setActiveFloor(activeFloor);
