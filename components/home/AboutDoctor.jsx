import Link from "next/link";
import Reveal from "../Reveal";
import { asset, SHOP_TG_URL, SHOP_YT_CHANNEL, SHOP_YT_SUBSCRIBERS, SHOP_YT_URL } from "../../lib/site";

/**
 * Секция «Наши преимущества»: врач, регалии и преимущества магазина.
 * Слева — блок врача (фото как в hero, регалии, личная цитата, YouTube и Telegram).
 * Справа — шесть карточек преимуществ с фирменной двухцветной графикой.
 * Позиция: после квиза, перед отзывами.
 */

const G1 = "#207D44";
const G2 = "#78AA36";
const G3 = "#E8963A";
const PAPER_CARVE = "#FBF8F1";

const CARDS = [
  {
    name: "leaf",
    title: "Натуральное сырьё",
    text: "Только качественные товары, созданные природой и проверенные поколениями",
  },
  {
    name: "farm",
    title: "Своя грибная ферма",
    text: "Грибы с собственной фермы, травы и сырьё — из чистых регионов России",
  },
  {
    name: "dose",
    title: "Чистые составы",
    text: "Активные формы, понятные составы и высокие дозировки",
  },
  {
    name: "cert",
    title: "Сертификация и доставка",
    text: "Продукция сертифицирована (ГРН) и проходит тестирование; доставка по всей России",
  },
  {
    name: "dev",
    title: "Опыт разработки",
    text: "Профессиональная разработка препаратов — от рецептуры до выпуска",
  },
  {
    name: "eco",
    title: "Экологичное производство",
    text: "Производство в экологически чистых местах, вдали от городов",
  },
];

function AdvantageIcon({ name }) {
  const common = { viewBox: "0 0 48 48", className: "h-7 w-7", "aria-hidden": true };
  if (name === "leaf") {
    return (
      <svg {...common}>
        <path d="M24 7c7.6 0 12.4 4.8 12.4 11.4 0 7-4.9 12.2-12.4 18.2-7.5-6-12.4-11.2-12.4-18.2C11.6 11.8 16.4 7 24 7Z" fill={G1} />
        <path d="M24 12v19" stroke={G2} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M24 18.5c-2.2 0-4.6.8-6.8 2.4M24 25.5c2.4 0 4.9.9 7 2.6" stroke={G2} strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="35.5" cy="38" r="2.6" fill={G3} />
      </svg>
    );
  }
  if (name === "farm") {
    return (
      <svg {...common}>
        <path d="M14 21.5c0-6.8 4.4-11.5 10-11.5s10 4.7 10 11.5V23H14v-1.5Z" fill={G1} />
        <rect x="20.2" y="23" width="7.6" height="10" rx="3" fill={G2} />
        <path d="M16.5 39h15l2.4 5H14.1l2.4-5Z" fill={G2} />
        <circle cx="19" cy="15.6" r="1.9" fill={PAPER_CARVE} />
        <circle cx="26.4" cy="13.2" r="2.3" fill={PAPER_CARVE} />
        <circle cx="31.2" cy="18.6" r="1.5" fill={PAPER_CARVE} />
        <circle cx="24" cy="17.2" r="1.2" fill={G3} />
      </svg>
    );
  }
  if (name === "dose") {
    return (
      <svg {...common}>
        <path d="M13 19h11v10H13a5 5 0 0 1 0-10Z" fill={G1} />
        <path d="M24 19h11a5 5 0 0 1 0 10H24V19Z" fill={G2} />
        <path d="M24 8v4.5M22 10.2h4" stroke={G3} strokeWidth="2.2" strokeLinecap="round" />
        <path d="M24 35.5V40M22 37.8h4" stroke={G3} strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "cert") {
    return (
      <svg {...common}>
        <path d="M24 6 36 10.5V20c0 9.6-5.5 17-12 20.8C17.5 37 12 29.6 12 20v-9.5L24 6Z" fill={G1} />
        <path d="M18.2 23.4 23.5 29l7-9.6" stroke={PAPER_CARVE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M33 35.8l1.5 3.1 3.4.5-2.4 2.4.6 3.4-3.1-1.6-3.1 1.6.6-3.4-2.4-2.4 3.4-.5 1.5-3.1Z" fill={G3} />
      </svg>
    );
  }
  if (name === "dev") {
    return (
      <svg {...common}>
        <rect x="19.2" y="5.5" width="9.6" height="10" rx="2.6" fill={G1} />
        <path d="M17.5 23.5h13l6.6 9.4c2.2 3.2-.5 8.1-4.3 8.1H15.2c-3.8 0-6.5-4.9-4.3-8.1l6.6-9.4Z" fill={G1} />
        <circle cx="21" cy="32" r="2" fill={G3} />
        <circle cx="27" cy="30.6" r="1.6" fill={PAPER_CARVE} />
        <circle cx="24.6" cy="36.2" r="2.4" fill={G2} />
        <path d="M22.4 4.6v2M25.6 4.6v2" stroke={G3} strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 22.5 24 11l12 11.5h-3.4V33H15.4V22.5H12Z" fill={G1} />
      <rect x="21.4" y="27" width="5.2" height="6" rx="1.6" fill={PAPER_CARVE} />
      <path d="M10 41.5h28" stroke={G2} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="39.5" cy="12.5" r="2.8" fill={G3} />
    </svg>
  );
}

export default function AboutDoctor() {
  return (
    <section
      id="doctor"
      data-testid="about-doctor"
      className="border-y border-line/70 bg-cream/60 py-14 sm:py-16"
      aria-labelledby="doctor-title"
    >
      <div className="wrap">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-khaki">02 · преимущества</p>
          <h2 id="doctor-title" className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Евгений Козлов — <span className="text-leaf">врач за проектом</span>
          </h2>
          <p className="mt-4 max-w-3xl border-l-4 border-honey pl-4 text-[17px] font-medium leading-relaxed text-ink">
            Мы не являемся просто магазином — мы исследователи и производители. Поэтому на вопрос
            «почему у вас, а не в аптеке» отвечаем делами: своим сырьём, фермой и рецептурами.
          </p>
        </Reveal>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          {/* Блок врача */}
          <Reveal className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[2rem] border border-line bg-paper shadow-lift">
              <img
                src={asset("/images/brand/doctor-hero.jpg")}
                alt="Евгений Козлов — фитотерапевт и клинический фармаколог"
                width={900}
                height={1200}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover object-top"
              />
              <div className="p-5 sm:p-6">
                <p className="font-display text-xl font-semibold leading-snug text-ink">
                  Проект Евгения Козлова
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink">
                  фитотерапевт, клинический фармаколог, доктор китайской медицины, вице-президент
                  китайского фармакологического общества, нутрициолог, автор YouTube-канала
                  «{SHOP_YT_CHANNEL}»
                </p>
                <blockquote className="mt-4 rounded-2xl border-l-4 border-honey bg-cream px-4 py-3">
                  <p className="font-display text-[17px] font-semibold italic leading-snug text-ink">
                    «Моя главная задача — помочь вам сохранить здоровье и красоту на долгие годы,
                    сделав это легко и доступно!»
                  </p>
                </blockquote>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={SHOP_YT_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`YouTube-канал «${SHOP_YT_CHANNEL}»`}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-4 py-2.5 text-[14px] font-bold text-ink transition hover:-translate-y-0.5 hover:border-leaf/60 hover:text-leafDark"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-honey" fill="currentColor" aria-hidden="true">
                      <path d="M21.4 7.4a2.6 2.6 0 0 0-1.8-1.9C17.9 5.2 12 5.2 12 5.2s-5.9 0-7.6.3A2.6 2.6 0 0 0 2.6 7.4 27 27 0 0 0 2.3 12c0 1.6.1 3.1.3 4.6a2.6 2.6 0 0 0 1.8 1.9c1.7.3 7.6.3 7.6.3s5.9 0 7.6-.3a2.6 2.6 0 0 0 1.8-1.9c.2-1.5.3-3 .3-4.6s-.1-3.1-.3-4.6ZM10.2 15.3V8.7l5.6 3.3-5.6 3.3Z" />
                    </svg>
                    YouTube · {SHOP_YT_SUBSCRIBERS} подписчиков
                  </a>
                  <a
                    href={SHOP_TG_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-4 py-2.5 text-[14px] font-bold text-ink transition hover:-translate-y-0.5 hover:border-leaf/60 hover:text-leafDark"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-leaf" fill="none" aria-hidden="true">
                      <path
                        d="M20.9 4.6 3.2 11.3c-.9.4-.8 1.7.1 2l4.6 1.5 1.7 5.2c.2.8 1.2 1 1.8.3l2.3-2.7 4.6 3.3c.6.4 1.5.1 1.7-.7l3-14.5c.2-.9-.8-1.6-1.7-1.3l-.4.1Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path d="M9 14.8 20.9 4.6M10.4 18.5l2.5-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Telegram PHYTOTAB
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Шесть карточек преимуществ */}
          <div className="grid gap-4 sm:grid-cols-2">
            {CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 60} className="h-full">
                <article className="flex h-full flex-col gap-3 rounded-3xl border border-line bg-paper p-5 shadow-card transition hover:-translate-y-0.5 hover:border-leaf/50 hover:shadow-lift">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cream to-sageSoft/60 ring-1 ring-leaf/15">
                    <AdvantageIcon name={card.name} />
                  </span>
                  <h3 className="font-display text-[19px] font-semibold leading-tight text-ink">{card.title}</h3>
                  <p className="text-[14.5px] leading-relaxed text-secondary">{card.text}</p>
                  <Link
                    href="/info/doctor/"
                    className="mt-auto inline-flex items-center gap-1.5 pt-1 font-mono text-[11px] font-bold uppercase tracking-wider text-leafDark transition hover:text-ink"
                  >
                    Подробнее о проекте
                    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M3 8h9M8 4l4 4-4 4" />
                    </svg>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}