import Reveal from "./Reveal";

const ITEMS = [
  {
    title: "Врач за рецептурами",
    note: "Практикующий врач-фитотерапевт проверяет каждый товар",
    icon: <> <circle cx="11" cy="12" r="8.5" /> <path d="M11 8.2V15.8M7.6 12H14.4" strokeLinecap="round" /> <circle cx="18" cy="6" r="2.2" fill="#E8963A" stroke="none" /> </>,
  },
  {
    title: "Сырьё из чистых регионов",
    note: "Травы — Алтай, Крым, Башкортостан; грибы — собственная ферма",
    icon: <> <path d="M19.5 4.5C11 4.5 5.5 9 5.5 14.5C5.5 17.5 7.5 19.5 10.5 19.5C16 19.5 19.5 13 19.5 4.5Z" strokeLinejoin="round" /> <path d="M6.5 18C9.5 12.5 13 9.5 17.5 7.5" strokeWidth="1.4" strokeLinecap="round" /> <circle cx="17.5" cy="17.5" r="1.9" fill="#E8963A" stroke="none" /> </>,
  },
  {
    title: "Понятный состав",
    note: "Состав и способ применения указаны на странице каждого товара",
    icon: <> <path d="M4.5 6.5H14.5M4.5 12H14.5M4.5 17.5H10.5" strokeWidth="1.7" strokeLinecap="round" /> <path d="M18 14.5V20M15 17.2H21" stroke="#E8963A" strokeWidth="1.8" strokeLinecap="round" /> </>,
  },
  {
    title: "Доставка и поддержка",
    note: "СДЭК по России, самовывоз в Москве, поддержка ежедневно 10:00–20:00",
    icon: <> <path d="M12 3.2L20 7.2V16.8L12 20.8L4 16.8V7.2Z" strokeLinejoin="round" /> <path d="M4 7.2L12 11.2L20 7.2M12 11.2V20.8" strokeLinejoin="round" /> <path d="M12 3.2V11.2" stroke="#E8963A" strokeWidth="1.7" strokeLinecap="round" /> </>,
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
              <span className="mt-1 block text-[13px] leading-snug text-secondary">{item.note}</span>
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}