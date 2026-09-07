// Правка 5, п. 2: набор рисованных листьев (не абстрактные овалы).
// Каждая форма — замкнутый силуэт листа; в кодировку добавляется светлая
// прожилка. Цвета — фирменный зелёный и шалфей, прозрачность задаёт CSS.
export const LEAF_COLORS = ["#207D44", "#4E9460", "#8FA98A", "#A9C47A"];
export const VEIN_COLOR = "#E6EFD8";

// viewBox 0 0 64 64. Каждая форма: body — контур, vein — прожилка.
export const LEAF_SHAPES = [
  {
    id: "round",
    body: "M32 5c14 4.5 21 14 21 26 0 13-9 24.5-21 28-12-3.5-21-15-21-28 0-12 7-21.5 21-26Z",
    vein: "M32 10v39M32 30c-4.6-1-8.4-3-11.2-6.4M32 30c4.6-1 8.4-3 11.2-6.4",
  },
  {
    id: "narrow",
    body: "M32 4c9 4 14 14 14 25 0 13-6 26-14 31-8-5-14-18-14-31 0-11 5-21 14-25Z",
    vein: "M32 9v46",
  },
  {
    id: "wide",
    body: "M32 8c11 3 17 11 17 20 0 12-7 22-17 28C22 50 15 40 15 28c0-9 6-17 17-20Z",
    vein: "M32 12v42M32 33c-3.8-.8-7-2.5-9.3-5.2M32 33c3.8-.8 7-2.5 9.3-5.2",
  },
  {
    id: "willow",
    body: "M33 4c5 15 4 31-2 45-5-7-8.5-21-7.5-34 0-8 4-11.5 9.5-11Z",
    vein: "M32 8c1 15 0 29-4 40",
  },
  {
    id: "teardrop",
    body: "M32 7c9 5 14 15 14 25 0 12-6 23-14 28C24 55 18 44 18 32c0-10 5-20 14-25Z",
    vein: "M32 11v43M32 34c-3.6-.7-6.8-2.3-9-5M32 34c3.6-.7 6.8-2.3 9-5",
  },
  {
    id: "oval",
    body: "M12 32c0-11 9-20 20-20s20 9 20 20-9 20-20 20S12 43 12 32Z",
    vein: "M32 12v40M22 24c4-2.5 7-4.5 10-5.5M42 24c-4-2.5-7-4.5-10-5.5",
  },
  {
    id: "sprig",
    rect: { x: 30.7, y: 12, width: 2.6, height: 46, rx: 1.3 },
    parts: [
      "M30 28C22 26 16 19 16 10c9 1 15 7 14 18Z",
      "M34 40c8-2 14-8 15-17-9 1-16 7-15 17Z",
    ],
  },
];

export function leafSvg(shapeIdx, colorIdx) {
  const shape = LEAF_SHAPES[shapeIdx];
  const color = LEAF_COLORS[colorIdx % LEAF_COLORS.length];
  const parts = [];
  if (shape.rect) {
    const r = shape.rect;
    parts.push(`<rect x='${r.x}' y='${r.y}' width='${r.width}' height='${r.height}' rx='${r.rx}' fill='${color}'/>`);
  }
  if (shape.parts) {
    for (const d of shape.parts) parts.push(`<path d='${d}' fill='${color}'/>`);
  } else {
    parts.push(`<path d='${shape.body}' fill='${color}'/>`);
    if (shape.vein) parts.push(`<path d='${shape.vein}' stroke='${VEIN_COLOR}' stroke-width='2.2' stroke-linecap='round' fill='none'/>`);
  }
  return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>${parts.join("")}</svg>`;
}

export function leafDataUri(shapeIdx, colorIdx) {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(leafSvg(shapeIdx, colorIdx));
}