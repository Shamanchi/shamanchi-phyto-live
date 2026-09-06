"use client";

import dynamic from "next/dynamic";

// Листья первого экрана (tsParticles) подключаются только на клиенте и после
// контента (useIdleReady внутри HeroLeaves), чтобы движок не блокировал старт.
const HeroLeaves = dynamic(() => import("./HeroLeaves"), {
  ssr: false,
  loading: () => null,
});

export default function HeroLeavesMount() {
  return <HeroLeaves />;
}
