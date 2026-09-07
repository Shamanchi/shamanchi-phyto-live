import Link from "next/link";
import Reveal from "../Reveal";
import { SHOP_PHONE, SHOP_TG_URL, PICKUP_ADDRESS } from "../../lib/site";

// Правка 5, п. 3: Доставка / Оплата / Возврат — отрисованные двухцветные
// иконки в стиле категорий (фирменный зелёный + шалфей + янтарный акцент).
const G1 = "#207D44";
const G2 = "#78AA36";
const G3 = "#E8963A";
const PAPER = "#FBF8F1";
const INK = "#22301F";
const ICON = { viewBox: "0 0 64 64", className: "h-11 w-11 sm:h-12 sm:w-12", "aria-hidden": true };

function DeliveryIcon() {
  return (
    <svg {...ICON}>
      <rect x="8" y="25" width="29" height="20" rx="4" fill={G1} />
      <path d="M23.5 25v20" stroke={PAPER} strokeWidth="1.7" />
      <path d="M37 29h12l6 6v10h-18V29Z" fill={G2} />
      <path d="M39 32.5h6.5" stroke={PAPER} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M33 33.5c2.3 1.1 3.6 3.1 3.6 5.5 0 2.5-1.3 4.5-3.6 5.6-2.3-1.1-3.6-3.1-3.6-5.6 0-2.4 1.3-4.4 3.6-5.5Z" fill={G3} />
      <path d="M33 34.5v9.6" stroke={PAPER} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="17" cy="49.5" r="6.5" fill={INK} />
      <circle cx="17" cy="49.5" r="2.6" fill={G3} />
      <circle cx="46.5" cy="49.5" r="6.5" fill={INK} />
      <circle cx="46.5" cy="49.5" r="2.6" fill={G3} />
      <path d="M8 59h48" stroke={G2} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg {...ICON}>
      <rect x="6" y="15" width="52" height="33" rx="7" fill={G1} />
      <path d="M6 24h52" stroke={G2} strokeWidth="5" />
      <rect x="12" y="31" width="14" height="10" rx="2.5" fill={G3} />
      <path d="M15.5 33.5v5M18.7 33.5v5M21.9 33.5v5" stroke={PAPER} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M33 35.5h18M33 40h12" stroke={PAPER} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M42.5 38.2a4.6 4.6 0 0 1 0 6.6" stroke="#E8963A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M46.2 35a8.2 8.2 0 0 1 0 13" stroke={PAPER} strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg {...ICON}>
      {/* Кольцо возврата: стрелка-«разворот» вокруг коробки */}
      <path d="M27.6 54.5A21 21 0 1 1 36.4 54.5" stroke={G3} strokeWidth="5.4" strokeLinecap="round" fill="none" />
      <path d="m37.8 51.3-7.2 3.7 7.2 3.7" stroke={G3} strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Коробка с крышкой и лентой */}
      <rect x="23" y="24.5" width="18" height="5.5" rx="2.75" fill={G2} />
      <rect x="25" y="28.5" width="14" height="13" rx="2.5" fill={G1} />
      <path d="M32 24.5v17" stroke={PAPER} strokeWidth="2" strokeLinecap="round" />
      <path d="M28.5 34.2h7M25.6 37.6h12.8" stroke={PAPER} strokeWidth="1.3" strokeLinecap="round" opacity="0.75" />
      <circle cx="50" cy="13" r="2.6" fill={G2} />
      <path d="M49 11.3a3.4 3.4 0 0 1 4.6 4.6" stroke={G2} strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

const ITEMS = [
  {
    href: "/info/delivery/",
    label: "Доставка",
    text: "СДЭК по России, Беларуси и Казахстану. Бесплатно от 7 900 ₽ — в большинстве регионов.",
    Icon: DeliveryIcon,
  },
  {
    href: "/info/payment/",
    label: "Оплата",
    text: "Картой, СБП или Яндекс Пей. Ссылка на безопасную оплату — после подтверждения заказа.",
    Icon: PaymentIcon,
  },
  {
    href: "/info/return/",
    label: "Возврат",
    text: "Вернуть товар можно в течение 7 дней при сохранении товарного вида и упаковки.",
    Icon: ReturnIcon,
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
                className="flex h-full flex-col gap-3 rounded-3xl border border-line glass-cream p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cream to-sageSoft/60 ring-1 ring-leaf/20">
                  <item.Icon />
                </span>
                <span>
                  <span className="block text-lg font-extrabold">{item.label}</span>
                  <span className="mt-1 block text-[14.5px] leading-relaxed text-ink/90">{item.text}</span>
                </span>
                <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-leafDark">
                  Подробнее
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M3 8h9M8 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p className="mt-6 rounded-2xl border border-sage/40 bg-sageSoft/30 px-5 py-4 text-center text-[15px] leading-relaxed text-ink">
            Самовывоз в Москве: {PICKUP_ADDRESS}, ежедневно 11:00–19:00 · Поддержка: {SHOP_PHONE} ·
            <a href={SHOP_TG_URL} target="_blank" rel="noreferrer" className="font-bold text-leaf hover:text-leafDark"> Telegram PHYTOTAB</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}