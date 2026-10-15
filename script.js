// State Management
let currentActiveTable = null;
let selectedStatusTemp = 'available';
let seatedGuestCount = 2;

// Live Clock with Thai locale
function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('th-TH', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    }) + ' น.';
    
    const dateStr = now.toLocaleDateString('th-TH', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short',
        year: 'numeric'
    });
    
    document.getElementById('timeDigits').textContent = timeStr;
    document.getElementById('dateDigits').textContent = dateStr;
}
setInterval(updateClock, 1000);
updateClock();

// Floor Navigation Tabs
const floorBtns = document.querySelectorAll('.floor-tab-btn');
const floorCanvases = document.querySelectorAll('.floor-canvas');

floorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetFloor = btn.dataset.floor;
        floorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        floorCanvases.forEach(canvas => {
            if (canvas.dataset.floor === targetFloor) {
                canvas.classList.add('active');
            } else {
                canvas.classList.remove('active');
            }
        });
    });
});

// Table Status Counts Calculation across all floors
function recalculateAllCounts() {
    const allTableBtns = document.querySelectorAll('.table-btn');
    let totalAvailable = 0;
    let totalOccupied = 0;
    let totalCleaning = 0;

    const floorAvailable = { 1: 0, 2: 0, 3: 0 };

    allTableBtns.forEach(btn => {
        const floor = btn.dataset.floor;
        if (btn.classList.contains('status-available')) {
            totalAvailable++;
            if (floorAvailable[floor] !== undefined) floorAvailable[floor]++;
        } else if (btn.classList.contains('status-occupied')) {
            totalOccupied++;
        } else if (btn.classList.contains('status-cleaning')) {
            totalCleaning++;
        }
    });

    // Update Top Header Summary: Available Tables with Numbers
    document.getElementById('headerAvailableCount').textContent = totalAvailable;
    document.getElementById('headerOccupiedCount').textContent = totalOccupied;
    document.getElementById('headerCleaningCount').textContent = totalCleaning;

    // Update Floor Tab Badges
    document.getElementById('tabBadge1').textContent = `ว่าง ${floorAvailable[1]} โต๊ะ`;
    document.getElementById('tabBadge2').textContent = `ว่าง ${floorAvailable[2]} โต๊ะ`;
    document.getElementById('tabBadge3').textContent = `ว่าง ${floorAvailable[3]} โต๊ะ`;
}

// Modal Elements
const modalOverlay = document.getElementById('tableModalOverlay');
const modalTableTitle = document.getElementById('modalTableTitle');
const modalTableSub = document.getElementById('modalTableSub');
const modalPreviewIcon = document.getElementById('modalPreviewIcon');
const stepperValue = document.getElementById('stepperValue');
const tableNoteInput = document.getElementById('tableNoteInput');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const btnCancelModal = document.getElementById('btnCancelModal');
const btnApplyTable = document.getElementById('btnApplyTable');
const toastFeedback = document.getElementById('toastFeedback');

// Status Label Mapping in Thai
const statusLabels = {
    available: 'ว่าง',
    occupied: 'มีลูกค้า',
    cleaning: 'กำลังทำความสะอาด'
};

// Attach Click to all Table Buttons
document.querySelectorAll('.table-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openTableActions(btn);
    });
});

function openTableActions(btn) {
    currentActiveTable = btn;
    const tableId = btn.dataset.id;
    const tableName = btn.dataset.name || `โต๊ะ ${tableId}`;
    const floor = btn.dataset.floor;
    const seats = btn.dataset.seats || 2;
    const numText = btn.querySelector('.table-num').textContent;

    // Determine current status
    if (btn.classList.contains('status-available')) selectedStatusTemp = 'available';
    else if (btn.classList.contains('status-occupied')) selectedStatusTemp = 'occupied';
    else if (btn.classList.contains('status-cleaning')) selectedStatusTemp = 'cleaning';

    // Populate Modal
    modalTableTitle.textContent = tableName;
    modalTableSub.textContent = `ชั้น ${floor} • รองรับได้ ${seats} ที่นั่ง`;
    modalPreviewIcon.textContent = numText;
    
    // Set preview avatar color
    updatePreviewAvatar(selectedStatusTemp);

    // Highlight chosen status button
    updateStatusButtonsUI(selectedStatusTemp);

    seatedGuestCount = parseInt(btn.dataset.currentGuests || seats);
    stepperValue.textContent = seatedGuestCount;
    tableNoteInput.value = btn.dataset.note || '';

    modalOverlay.classList.add('open');
}

function updatePreviewAvatar(status) {
    if (status === 'available') {
        modalPreviewIcon.style.background = 'var(--status-green)';
        modalPreviewIcon.style.boxShadow = '0 0 16px var(--status-green-glow)';
    } else if (status === 'occupied') {
        modalPreviewIcon.style.background = 'var(--status-red)';
        modalPreviewIcon.style.boxShadow = '0 0 16px var(--status-red-glow)';
    } else {
        modalPreviewIcon.style.background = 'var(--status-yellow)';
        modalPreviewIcon.style.boxShadow = '0 0 16px var(--status-yellow-glow)';
    }
}

function updateStatusButtonsUI(status) {
    document.querySelectorAll('.status-action-btn').forEach(b => {
        if (b.dataset.targetStatus === status) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
}

// Tap Status Choice in Modal
document.querySelectorAll('.status-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        selectedStatusTemp = btn.dataset.targetStatus;
        updateStatusButtonsUI(selectedStatusTemp);
        updatePreviewAvatar(selectedStatusTemp);
    });
});

// Guest Stepper buttons
document.getElementById('stepUpBtn').addEventListener('click', () => {
    seatedGuestCount = Math.min(20, seatedGuestCount + 1);
    stepperValue.textContent = seatedGuestCount;
});

document.getElementById('stepDownBtn').addEventListener('click', () => {
    seatedGuestCount = Math.max(1, seatedGuestCount - 1);
    stepperValue.textContent = seatedGuestCount;
});

// Close Modal
function closeModal() {
    modalOverlay.classList.remove('open');
    currentActiveTable = null;
}

modalCloseBtn.addEventListener('click', closeModal);
if (btnCancelModal) btnCancelModal.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

// Apply & Save
btnApplyTable.addEventListener('click', () => {
    if (!currentActiveTable) return;

    // Remove previous classes
    currentActiveTable.classList.remove('status-available', 'status-occupied', 'status-cleaning');
    
    // Add new class
    currentActiveTable.classList.add(`status-${selectedStatusTemp}`);
    
    // Save metadata
    currentActiveTable.dataset.currentGuests = seatedGuestCount;
    currentActiveTable.dataset.note = tableNoteInput.value.trim();

    const tableNum = currentActiveTable.querySelector('.table-num').textContent;
    const statusLabel = statusLabels[selectedStatusTemp] || selectedStatusTemp;

    closeModal();
    recalculateAllCounts();
    showToast(`อัปเดตโต๊ะ ${tableNum} เป็นสถานะ "${statusLabel}" เรียบร้อย`);
});

// Toast feedback banner
function showToast(msg) {
    document.getElementById('toastMessage').textContent = msg;
    toastFeedback.classList.add('show');
    setTimeout(() => {
        toastFeedback.classList.remove('show');
    }, 2200);
}

// Quick Reset Table States
document.getElementById('resetStateBtn').addEventListener('click', () => {
    document.querySelectorAll('.table-btn').forEach((btn, idx) => {
        btn.classList.remove('status-available', 'status-occupied', 'status-cleaning');
        if (idx % 4 === 1) {
            btn.classList.add('status-occupied');
        } else if (idx % 7 === 0) {
            btn.classList.add('status-cleaning');
        } else {
            btn.classList.add('status-available');
        }
    });
    recalculateAllCounts();
    showToast('รีเซ็ตข้อมูลโต๊ะทั้งหมดเรียบร้อย');
});

// Initial Calculation
recalculateAllCounts();
