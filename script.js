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
    ...rowSeats("top-table-1-top", 382, 19, 2, seatSize, 46),
    ...rowSeats("top-table-1-bottom", 382, 89, 2, seatSize, 46),
    ...rowSeats("top-table-2-top", 382, 142, 2, seatSize, 46),
    ...rowSeats("top-table-2-bottom", 382, 210, 2, seatSize, 46),
    { id: "round-left-top", x: 54, y: 512, size: 24 },
    { id: "round-left-bottom", x: 54, y: 610, size: 24 },
    { id: "round-right-top", x: 146, y: 512, size: 24 },
    { id: "round-right-bottom", x: 146, y: 610, size: 24 },
  ],
};

if (!floorSeatMaps[activeFloor]) {
  activeFloor = "3";
}

const floorNames = {
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
  seat.setAttribute("aria-label", `${seat.dataset.seat}, ${occupied ? "occupied" : "available"}`);
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

Object.entries(floorSeatMaps).forEach(([floor, seats]) => {
  const seatsLayer = document.querySelector(`[data-floor-layer="${floor}"]`);

  seats.forEach(({ id, x, y, size }) => {
    const seat = document.createElement("button");
    const seatId = `floor-${floor}-${id}`;
    seat.className = "seat";
    seat.type = "button";
    seat.dataset.floor = floor;
    seat.dataset.seat = seatId;
    seat.style.left = `${x}px`;
    seat.style.top = `${y}px`;
    seat.style.width = `${size}px`;
    seat.style.height = `${size}px`;

    setSeatStatus(seat, Boolean(savedState[seatId]));

    seat.addEventListener("click", () => {
      setSeatStatus(seat, !seat.classList.contains("occupied-state"));
      saveState();
      updateCounts();
    });

    seatsLayer.append(seat);
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
