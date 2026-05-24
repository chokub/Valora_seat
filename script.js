const seatsLayer = document.querySelector("#seatsLayer");
const resetButton = document.querySelector("#resetAll");
const availableCount = document.querySelector("#availableCount");
const occupiedCount = document.querySelector("#occupiedCount");

const storageKey = "valora-seat-map-seat-status";

const seatSize = 34;
const smallSeatSize = 34;
const verticalGap = 36;
const rowGap = 38;

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

const middleTableSeats = (table, tableX, tableY) => [
  { id: `table-${table}-left-1`, x: tableX - 72, y: tableY - 1, size: seatSize },
  { id: `table-${table}-left-2`, x: tableX - 72, y: tableY + 23, size: seatSize },
  { id: `table-${table}-right-1`, x: tableX + 94, y: tableY - 1, size: seatSize },
  { id: `table-${table}-right-2`, x: tableX + 94, y: tableY + 23, size: seatSize },
];

const seatMap = [
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
];

const readSavedState = () => {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch {
    return {};
  }
};

const saveState = () => {
  const state = Object.fromEntries(
    getSeats().map((seat) => [seat.dataset.seat, seat.classList.contains("occupied-state")])
  );
  localStorage.setItem(storageKey, JSON.stringify(state));
};

const getSeats = () => [...document.querySelectorAll(".seat")];

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

const savedState = readSavedState();

seatMap.forEach(({ id, x, y, size }) => {
  const seat = document.createElement("button");
  seat.className = "seat";
  seat.type = "button";
  seat.dataset.seat = id;
  seat.style.left = `${x}px`;
  seat.style.top = `${y}px`;
  seat.style.width = `${size}px`;
  seat.style.height = `${size}px`;

  setSeatStatus(seat, Boolean(savedState[id]));

  seat.addEventListener("click", () => {
    setSeatStatus(seat, !seat.classList.contains("occupied-state"));
    saveState();
    updateCounts();
  });

  seatsLayer.append(seat);
});

resetButton.addEventListener("click", () => {
  getSeats().forEach((seat) => setSeatStatus(seat, false));
  saveState();
  updateCounts();
});

updateCounts();
