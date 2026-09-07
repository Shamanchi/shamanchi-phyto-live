"use client";

import { useEffect, useMemo, useState } from "react";
import { useIdleReady } from "./useIdleReady";
import { LEAF_SHAPES, leafDataUri } from "./leafShapes";

const MQ_SMALL = "(max-width: 767px)";
const MQ_REDUCED = "(prefers-reduced-motion: reduce)";

const rand = (min, max) => min + Math.random() * (max - min);
const pick = (items) => items[Math.floor(Math.random() * items.length)];

/**
 * Правка 5, п. 1–2: глобальный слой падающих листьев (CSS-анимация).
 * Монтируется один раз в layout внутри .site-bg — живёт на всех страницах
 * за контентом. Формы — рисованные листья из leafShapes (не овалы),
 * фирменный зелёный + шалфей, opacity 0.35–0.6. Reduced motion — без листьев.
 */
function makeLeaves(count) {
  const leaves = [];
  for (let i = 0; i < count; i += 1) {
    const shapeIdx = Math.floor(Math.random() * LEAF_SHAPES.length);
    const isSprig = LEAF_SHAPES[shapeIdx].id === "sprig";
    const colorIdx = Math.floor(Math.random() * 4);
    const width = isSprig ? Math.round(rand(34, 54)) : Math.round(rand(18, 42));
    const spin = rand(140, 340) * (Math.random() > 0.5 ? 1 : -1);
    leaves.push({
      id: i,
      src: leafDataUri(shapeIdx, colorIdx),
      left: `${Math.round(rand(-3, 96))}%`,
      width,
      opacity: Math.round(rand(0.4, 0.6) * 100) / 100,
      dur: Math.round(rand(16, 30) * 10) / 10,
      delay: -Math.round(rand(0, 30) * 10) / 10,
      sway: Math.round(rand(3.6, 6.4) * 10) / 10,
      drift: `${Math.round(rand(-7, 7) * 10) / 10}vw`,
      r0: `${Math.round(rand(0, 360))}deg`,
      r1: `${Math.round(rand(0, 360) + spin)}deg`,
    });
  }
  return leaves;
}

export default function LeafField() {
  const idleReady = useIdleReady();
  const [small, setSmall] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const smallMq = window.matchMedia(MQ_SMALL);
    const reducedMq = window.matchMedia(MQ_REDUCED);
    setSmall(smallMq.matches);
    setReduced(reducedMq.matches);
    const onSmall = (event) => setSmall(event.matches);
    const onReduced = (event) => setReduced(event.matches);
    smallMq.addEventListener("change", onSmall);
    reducedMq.addEventListener("change", onReduced);
    return () => {
      smallMq.removeEventListener("change", onSmall);
      reducedMq.removeEventListener("change", onReduced);
    };
  }, []);

  const leaves = useMemo(() => makeLeaves(small ? 9 : 18), [small]);

  if (!idleReady || reduced) return null;

  return (
    <div data-live-leaves="css" aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {leaves.map((leaf) => (
        <span
          key={leaf.id}
          className="leaf"
          style={{
            "--left": leaf.left,
            "--leaf-w": `${leaf.width}px`,
            "--dur": `${leaf.dur}s`,
            "--delay": `${leaf.delay}s`,
            "--sway": `${leaf.sway}s`,
            "--drift": leaf.drift,
            "--r0": leaf.r0,
            "--r1": leaf.r1,
            opacity: leaf.opacity,
          }}
        >
          <img className="leaf-in" src={leaf.src} alt="" width={64} height={64} draggable={false} />
        </span>
      ))}
    </div>
  );
}