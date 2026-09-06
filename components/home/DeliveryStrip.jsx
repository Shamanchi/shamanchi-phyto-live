import Link from "next/link";
import Reveal from "../Reveal";
import { SHOP_PHONE, SHOP_TG_URL, PICKUP_ADDRESS } from "../../lib/site";

const ITEMS = [
  {
    href: "/info/delivery/",
    label: "Доставка",
    text: "СДЭК по России, Беларуси и Казахстану. Бесплатно от 7 900 ₽ — в большинстве регионов.",
    icon: <path d="M4 8h11v8H4zM15 10h3l2 3v3h-5zM7.5 18.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM17.5 18.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z" />,
  },
  {
    href: "/payment/",
    label: "Оплата",
    text: "Картой, СБП или Яндекс Пей. Ссылка на безопасную оплату — после подтверждения заказа.",
    icon: <path d="M4 6h16v12H4zM4 10h16" />,
  },
  {
    href: "/return/",
    label: "Возврат",
    text: "Вернуть товар можно в течение 7 дней при сохранении товарного вида и упаковки.",
    icon: <path d="M4 10a8 8 0 1 1 1.2 6M4 10V5m0 5h5" />,
  },
];

export default function DeliveryStrip() {
  return (
    <section aria-label="Сервис магазина" className="py-12">
      <div className="wrap">
        <div className="grid gap-5 md:grid-cols-3">
          {ITEMS.map((item, i) => (
            <Reveal key={item.label} delay={i * 80} className="h-full">
              <Link
                href={item.href}
                className="flex h-full flex-col gap-3 rounded-3xl border border-line bg-cream p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-sageSoft text-leaf">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    {item.icon}
                  </svg>
                </span>
                <span>
                  <span className="block text-lg font-extrabold">{item.label}</span>
                  <span className="mt-1 block text-[13.5px] leading-relaxed text-ink/60">{item.text}</span>
                </span>
                <span className="mt-auto font-mono text-[10px] font-bold uppercase tracking-wider text-leaf">
                  Подробнее →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p className="mt-6 rounded-2xl border border-sage/40 bg-sageSoft/30 px-5 py-4 text-center text-[14px] leading-relaxed text-ink/70">
            Самовывоз в Москве: {PICKUP_ADDRESS}, ежедневно 11:00–19:00 · Поддержка: {SHOP_PHONE} ·
            <a href={SHOP_TG_URL} target="_blank" rel="noreferrer" className="font-bold text-leaf hover:text-leafDark"> Telegram PHYTOTAB</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}