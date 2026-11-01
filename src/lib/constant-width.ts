// Geometry for the constant-width demos, shared by both so their numbers
// can't disagree. Every shape has a width of 1. Coordinates are screen-style,
// with y increasing downwards, so a positive rotation turns clockwise.

export type Point = { x: number; y: number };

// How many points approximate each curved side of a shape.
const POINTS_PER_ARC = 120;

/**
 * Builds the outline of a Reuleaux polygon, as a list of closely spaced
 * points. `sides` must be odd (3 gives the Reuleaux triangle).
 *
 * Start with a regular polygon, then replace each straight side with an arc
 * centred on the corner opposite it. The arc's radius is the distance from
 * that corner to the side's ends, which is the shape's width.
 */
export function reuleauxOutline(sides: number): Point[] {
  // Scales the polygon so its longest diagonal is exactly 1
  const radius = 1 / (2 * Math.cos(Math.PI / (2 * sides)));
  const corners = Array.from({ length: sides }, (_, k) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * k) / sides;
    return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
  });

  const outline: Point[] = [];
  for (let side = 0; side < sides; side++) {
    const start = corners[side];
    const centre = corners[(side + (sides + 1) / 2) % sides];
    const startAngle = Math.atan2(start.y - centre.y, start.x - centre.x);

    for (let step = 0; step < POINTS_PER_ARC; step++) {
      // Each arc sweeps through an angle of π ÷ sides
      const angle = startAngle + (step / POINTS_PER_ARC) * (Math.PI / sides);
      outline.push({ x: centre.x + Math.cos(angle), y: centre.y + Math.sin(angle) });
    }
  }
  return outline;
}

/** Turns a point around the origin by `angle` radians. */
export function rotate({ x, y }: Point, angle: number): Point {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: x * cos - y * sin, y: x * sin + y * cos };
}

/** The distance between the sides of a shape turned by `angle`, measured as parallel lines would. */
export function widthAt(outline: Point[], angle: number): number {
  const heights = outline.map((point) => rotate(point, angle).y);
  return Math.max(...heights) - Math.min(...heights);
}

/** The total length around a shape: the sum of the gaps between its points. */
export function perimeter(outline: Point[]): number {
  return outline.reduce((total, point, index) => {
    const next = outline[(index + 1) % outline.length];
    return total + Math.hypot(next.x - point.x, next.y - point.y);
  }, 0);
}

/** Converts an outline to an SVG path, scaled up to screen size. */
export function toSvgPath(outline: Point[], scale: number): string {
  const points = outline.map(({ x, y }) => `${(x * scale).toFixed(2)} ${(y * scale).toFixed(2)}`);
  return `M ${points.join(' L ')} Z`;
}

export type RollingPosition = {
  /** The point touching the ground, relative to the shape's centre */
  contact: Point;
  /** How far along the ground the shape has rolled */
  distance: number;
};

/**
 * Works out where a shape is after rolling through `angle` radians without
 * slipping. Rolling means the length of edge that has touched the ground
 * equals the distance travelled, so we measure along the outline from where
 * it first touched to where it touches now.
 */
export function createRoller(outline: Point[]) {
  // Distance along the outline to each point
  const along: number[] = [0];
  for (let i = 1; i < outline.length; i++) {
    along[i] = along[i - 1] + Math.hypot(outline[i].x - outline[i - 1].x, outline[i].y - outline[i - 1].y);
  }
  const total = perimeter(outline);

  // The ground touches whichever point is lowest: the largest y on screen
  const lowest = (angle: number) => {
    let index = 0;
    let lowestY = -Infinity;
    outline.forEach((point, i) => {
      const y = rotate(point, angle).y;
      if (y > lowestY) {
        lowestY = y;
        index = i;
      }
    });
    return index;
  };

  const startIndex = lowest(0);

  return (angle: number): RollingPosition => {
    const turns = Math.floor(angle / (2 * Math.PI));
    const index = lowest(angle);
    // As the shape turns clockwise, the touching point moves backwards along
    // the outline; the wrap-around keeps this between 0 and one lap
    let lapDistance = (along[startIndex] - along[index] + total) % total;
    // Moments before a full turn, the nearest point can already be the
    // starting point, which would otherwise read as no distance at all
    if (angle - turns * 2 * Math.PI > Math.PI && lapDistance < total / 4) lapDistance += total;
    return { contact: rotate(outline[index], angle), distance: turns * total + lapDistance };
  };
}
