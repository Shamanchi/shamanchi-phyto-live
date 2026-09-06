"use client";

import { useEffect, useMemo, useState } from "react";
import { useIdleReady } from "./useIdleReady";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const MQ_SMALL = "(max-width: 767px)";
const MQ_REDUCED = "(prefers-reduced-motion: reduce)";

// Мягкая «пылинка» со свечением: радиальный градиент, цвет подставляется
// через replaceColor (белая сердцевина тонируется янтарём/мёдом/шалфеем).
function glowSprite() {
  const svg =
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>" +
    "<defs><radialGradient id='g' cx='50%' cy='50%' r='50%'>" +
    "<stop offset='0%' stop-color='#ffffff' stop-opacity='0.95'/>" +
    "<stop offset='42%' stop-color='#ffffff' stop-opacity='0.5'/>" +
    "<stop offset='100%' stop-color='#ffffff' stop-opacity='0'/>" +
    "</radialGradient></defs>" +
    "<circle cx='32' cy='32' r='31' fill='url(#g)'/>" +
    "</svg>";
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function makeOptions(count) {
  return {
    fpsLimit: 60,
    autoPlay: true,
    pauseOnBlur: true,
    pauseOnOutsideViewport: false,
    detectRetina: true,
    fullScreen: false,
    background: { color: "transparent" },
    particles: {
      number: { value: count, density: { enable: false } },
      // Янтарь и мёд читаются на кремовом #F7F3EA; шалфей — спокойная примесь.
      color: { value: ["#C98A2C", "#D9A03C", "#E0B84F", "#8FA98A", "#A9C47A"] },
      shape: {
        type: "image",
        options: {
          image: { src: glowSprite(), width: 64, height: 64, replaceColor: true },
        },
      },
      // Мерцание: пыльца «вспыхивает в луче» — opacity 0.25–0.65, у каждой своя фаза.
      opacity: {
        value: { min: 0.25, max: 0.6 },
        animation: {
          enable: true,
          speed: 0.7,
          sync: false,
          startValue: "random",
        },
      },
      // 2–6 px с вариацией + редкие крупные до 8 px (анимация размера даёт их долю).
      size: {
        value: { min: 2, max: 6 },
        animation: {
          enable: true,
          speed: 4,
          min: 1.6,
          sync: false,
          startValue: "random",
        },
      },
      move: {
        enable: true,
        direction: "top",
        speed: { min: 0.3, max: 0.95 },
        straight: false,
        drift: { min: -0.07, max: 0.07 },
        random: false,
        outModes: { default: "out" },
      },
      links: { enable: false },
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: { enable: false },
        onClick: { enable: false },
        resize: { enable: true },
      },
    },
  };
}

/**
 * Единственный переиспользуемый слой «пыльца на свету» (tsParticles, canvas 2D).
 * Fullscreen-канвас за контентом, монтируется на всех страницах через layout:
 * 70–90 частиц 2–6 px на десктопе, 30–40 на мобильных (<768px).
 * Инициализация — после контента (requestIdleCallback),
 * prefers-reduced-motion — статичный фон без канваса.
 */
export default function LivePollen() {
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

  const options = useMemo(() => makeOptions(small ? 38 : 84), [small]);

  if (!idleReady) {
    return <div data-live-pollen="preload" aria-hidden="true" className="fixed inset-0 z-0" />;
  }

  if (idleReady && reduced) {
    return (
      <div
        data-live-pollen="static"
        aria-hidden="true"
        className="bg-pollen-static pointer-events-none fixed inset-0 z-[-1]"
      />
    );
  }

  return (
    <div
      data-live-pollen="canvas"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1] h-screen w-screen"
    >
      <ParticlesProvider init={loadSlim}>
        <Particles id="live-pollen" options={options} className="h-full w-full" />
      </ParticlesProvider>
    </div>
  );
}
