import Reveal from "./Reveal";

const ITEMS = [
  {
    title: "Врач за рецептурами",
    note: "Практикующий врач-фитотерапевт проверяет каждый товар",
    icon: <path d="M12 21a9 9 0 1 0-9-9c0 2.6 1.2 5 3 6.5M9 21h6" />,
  },
  {
    title: "Сырьё из чистых регионов",
    note: "Травы — Алтай, Крым, Башкортостан; грибы — собственная ферма",
    icon: <path d="M12 20c-5-2.3-7.5-6.4-7.5-10.6C4.5 6 8 4 12 3c4 1 7.5 3 7.5 6.4 0 4.2-2.5 8.3-7.5 10.6Z" />,
  },
  {
    title: "Понятный состав",
    note: "Состав и способ применения указаны на странице каждого товара",
    icon: <path d="M4 6h16M4 12h16M4 18h10M18 15v6M15 18h6" />,
  },
  {
    title: "Доставка и поддержка",
    note: "СДЭК по России, самовывоз в Москве, поддержка ежедневно 10:00–20:00",
    icon: <path d="M4 8h12v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Zm4-4h6v4H8V4Z" />,
  },
];

export default function TrustBar() {
  return (
    <section aria-label="Почему нам доверяют" className="border-y border-line/70 bg-cream/60">
      <div className="wrap grid gap-x-6 gap-y-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item, i) => (
          <Reveal key={item.title} delay={i * 90} className="flex gap-3.5">
            <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sageSoft text-leaf">
              <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                {item.icon}
              </svg>
            </span>
            <span>
              <span className="block text-[15px] font-extrabold leading-snug">{item.title}</span>
              <span className="mt-1 block text-[13px] leading-snug text-ink/60">{item.note}</span>
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}