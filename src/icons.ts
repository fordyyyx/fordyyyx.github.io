// Small line icons, drawn on a 24×24 grid with strokes only (no fill), so
// they match the hero route line and take their colour from the text
// around them. Icon.astro wraps one in an <svg>.
//
// Every shape has pathLength="1", which tells the browser to treat its
// length as 1 whatever its real size. That lets CSS "draw" any icon in by
// animating stroke-dashoffset from 1 to 0 (see ActivityList.astro).
export const icons = {
  // A pointed oval (two arcs between opposite corners) with laces
  football: `
    <path pathLength="1" d="M3.5 20.5 A15 15 0 0 1 20.5 3.5 A15 15 0 0 1 3.5 20.5 Z" />
    <path pathLength="1" d="M10 14 L14 10" />
    <path pathLength="1" d="M9.6 12.6 L11.4 14.4 M11.1 11.1 L12.9 12.9 M12.6 9.6 L14.4 11.4" />`,
  // A runner mid-stride
  run: `
    <circle pathLength="1" cx="14.5" cy="4.5" r="2" />
    <path pathLength="1" d="M13.5 8 L11 14 M7 11 L10 8.5 L13.5 8 L16 11 L18.5 11.5" />
    <path pathLength="1" d="M11 14 L14.5 16 L13.5 21 M11 14 L9 18 L5 19" />`,
  // A road bike
  ride: `
    <circle pathLength="1" cx="5.5" cy="16" r="3.5" />
    <circle pathLength="1" cx="18.5" cy="16" r="3.5" />
    <path pathLength="1" d="M5.5 16 L11 16 L8.5 9.5 L16 9.5 L11 16 M8.5 9.5 L5.5 16 M16 9.5 L18.5 16 M16 9.5 L15.5 7 L18 7 M7 9.5 L10 9.5" />`,
} as const;

export type IconName = keyof typeof icons;

// The list of names, in the form the content schemas need
export const iconNames = Object.keys(icons) as [IconName, ...IconName[]];
