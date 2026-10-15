import React from 'react';

/**
 * High-performance Lucide Icon generator adhering strictly to the official Lucide specs
 * (viewBox: 24x24, strokeWidth: 2, lineCap: round, lineJoin: round).
 */
function createLucideIcon(displayName, elements) {
  const Component = React.forwardRef(({
    color = 'currentColor',
    size = 24,
    strokeWidth = 2,
    className = '',
    children,
    ...props
  }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`lucide lucide-${displayName.toLowerCase()} ${className}`.trim()}
        {...props}
      >
        {elements}
        {children}
      </svg>
    );
  });
  Component.displayName = displayName;
  return Component;
}

// 1. Coffee (Cafe branding & drinks)
export const Coffee = createLucideIcon('Coffee', (
  <>
    <path d="M10 2v2" />
    <path d="M14 2v2" />
    <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h12Z" />
    <path d="M6 2v2" />
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
  </>
));

// 2. RotateCcw (Reset button)
export const RotateCcw = createLucideIcon('RotateCcw', (
  <>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </>
));

// 3. Clock (Live Time)
export const Clock = createLucideIcon('Clock', (
  <>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </>
));

// 4. CheckCircle2 (Available Status)
export const CheckCircle2 = createLucideIcon('CheckCircle2', (
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </>
));

// 5. UserCheck (Occupied / Seated)
export const UserCheck = createLucideIcon('UserCheck', (
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" />
  </>
));

// 6. Users (Party / Table Guests)
export const Users = createLucideIcon('Users', (
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </>
));

// 7. Sparkles (Cleaning Status)
export const Sparkles = createLucideIcon('Sparkles', (
  <>
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" />
    <path d="M22 5h-4" />
    <path d="M4 17v2" />
    <path d="M5 18H3" />
  </>
));

// 8. Armchair (Chair / Seat booking)
export const Armchair = createLucideIcon('Armchair', (
  <>
    <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
    <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z" />
    <path d="M5 18v2" />
    <path d="M19 18v2" />
  </>
));

// 9. X (Close modal)
export const X = createLucideIcon('X', (
  <>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </>
));

// 10. Plus (Increment)
export const Plus = createLucideIcon('Plus', (
  <>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </>
));

// 11. Minus (Decrement)
export const Minus = createLucideIcon('Minus', (
  <>
    <path d="M5 12h14" />
  </>
));

// 12. Check (Confirm / Save)
export const Check = createLucideIcon('Check', (
  <>
    <path d="M20 6 9 17l-5-5" />
  </>
));

// 13. Layers (Floor tabs)
export const Layers = createLucideIcon('Layers', (
  <>
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
    <path d="m22 12.5-8.58 3.91a2 2 0 0 1-1.66 0L2 12.5" />
    <path d="m22 17.5-8.58 3.91a2 2 0 0 1-1.66 0L2 17.5" />
  </>
));

// 14. FileText (Service Notes)
export const FileText = createLucideIcon('FileText', (
  <>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </>
));

// 15. CheckSquare (Checked box)
export const CheckSquare = createLucideIcon('CheckSquare', (
  <>
    <path d="m9 11 3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </>
));

// 16. UtensilsCrossed (Table / Dining)
export const UtensilsCrossed = createLucideIcon('UtensilsCrossed', (
  <>
    <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8Z" />
    <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
    <path d="m2.1 21.8 6.4-6.3" />
    <path d="m19 5-7 7" />
  </>
));

// 17. Bell (Notifications / Toast)
export const Bell = createLucideIcon('Bell', (
  <>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </>
));

// 18. Scissors (Barber Salon)
export const Scissors = createLucideIcon('Scissors', (
  <>
    <circle cx="6" cy="6" r="3" />
    <path d="M8.12 8.12 12 12" />
    <path d="M20 4 8.12 15.88" />
    <circle cx="6" cy="18" r="3" />
    <path d="M14.8 14.8 20 20" />
  </>
));

// 19. Sun (Celestial Art)
export const Sun = createLucideIcon('Sun', (
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </>
));

// 20. Moon (Celestial Art)
export const Moon = createLucideIcon('Moon', (
  <>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </>
));

// 21. Star (Celestial Art)
export const Star = createLucideIcon('Star', (
  <>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </>
));

// 22. Maximize2 (Fullscreen Toggle)
export const Maximize2 = createLucideIcon('Maximize2', (
  <>
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" x2="14" y1="3" y2="10" />
    <line x1="3" x2="10" y1="21" y2="14" />
  </>
));

// 23. Minimize2 (Exit Fullscreen)
export const Minimize2 = createLucideIcon('Minimize2', (
  <>
    <polyline points="4 14 10 14 10 20" />
    <polyline points="20 10 14 10 14 4" />
    <line x1="14" x2="21" y1="10" y2="3" />
    <line x1="3" x2="10" y1="21" y2="14" />
  </>
));

// 24. Crown (VIP Room)
export const Crown = createLucideIcon('Crown', (
  <>
    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
  </>
));

// 25. User (Individual customer)
export const User = createLucideIcon('User', (
  <>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </>
));



