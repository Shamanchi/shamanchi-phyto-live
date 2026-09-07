import Link from "next/link";
import Reveal from "../Reveal";
import { SHOP_PHONE, SHOP_TG_URL, PICKUP_ADDRESS } from "../../lib/site";

// Правка 5, п. 3: Доставка / Оплата / Возврат — отрисованные двухцветные
// иконки в стиле категорий (фирменный зелёный + шалфей + янтарный акцент).
const G1 = "#207D44";
const G2 = "#78AA36";
const G3 = "#E8963A";
const PAPER = "#F7F3EA";
const INK = "#22301F";
const ICON = { viewBox: "0 0 64 64", className: "h-11 w-11 sm:h-12 sm:w-12", "aria-hidden": true };

function DeliveryIcon() {
  return (
    <svg {...ICON}>
      <rect x="7" y="18" width="31" height="24" rx="3" fill={G1} />
      <rect x="20" y="18" width="5" height="24" fill={G2} />
      <path d="M26 24C27.5 26.5 29 28 29 30.2A4.2 4.2 0 1 1 20.6 30.2C20.6 28 24.5 26.5 26 24Z" fill={G3} />
      <path d="M38 26H47L54 34V42H38Z" fill={G2} />
      <rect x="42" y="29" width="7" height="7" rx="1.5" fill={PAPER} />
      <circle cx="18" cy="46" r="5" fill={PAPER} stroke={G1} strokeWidth="3" />
      <circle cx="46" cy="46" r="5" fill={PAPER} stroke={G1} strokeWidth="3" />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg {...ICON}>
      <rect x="8" y="17" width="48" height="30" rx="5" fill={G1} />
      <rect x="14" y="26" width="9" height="7" rx="1.6" fill={G3} />
      <path d="M14 30H23M18.5 26V33" stroke={G1} strokeWidth="1.4" />
      <path d="M32 27Q36 23 40 27T48 27" stroke={G2} strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <rect x="8" y="38" width="48" height="6" fill={G3} />
      <rect x="14" y="40" width="10" height="2" rx="1" fill={PAPER} />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg {...ICON}>
      <path d="M53 22A22 22 0 1 0 56 34" stroke={G1} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M53 12V24L44 18" stroke={G1} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="23" y="27" width="18" height="15" rx="2.5" fill={G2} />
      <rect x="30" y="27" width="4" height="15" fill={PAPER} />
      <path d="M23 31H41" stroke={G1} strokeWidth="1.6" opacity="0.35" />
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
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M2.5 8h9.5M8.6 4.6l3.8 3.4-3.8 3.4" strokeLinecap="round" strokeLinejoin="round" />
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