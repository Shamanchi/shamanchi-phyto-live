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
  const common = { viewBox: "0 0 64 64", className: "h-12 w-12 sm:h-14 sm:w-14", "aria-hidden": true };
  if (name === "leaf") {
    return (
      <svg {...common}>
        <path d="M36.5 4c11.8 1.8 19.2 9.8 19.2 21.2 0 12.2-8.4 21.8-19.2 26.7-10.8-4.9-19.2-14.5-19.2-26.7C17.3 13.8 24.7 5.8 36.5 4Z" fill={G1} />
        <path d="M36.5 13v27" stroke={G2} strokeWidth="2.6" strokeLinecap="round" />
        <path d="M36.5 25.2c-4.3-1-7.9-3-10.7-6.3M36.5 25.2c4.3-1 7.9-3 10.7-6.3M36.5 33.8c-3.1.6-5.9 2.1-8.4 4.5M36.5 33.8c3.1.6 5.9 2.1 8.4 4.5" stroke={G2} strokeWidth="2.1" strokeLinecap="round" fill="none" />
        <path d="M11.5 43.5c.4-6.6 3.8-11.4 9.2-13.4.6 6.4-2.2 11.2-9.2 13.4Z" fill={G2} />
        <path d="M18.5 57.5c-.8-4.8 1.5-8.9 5.6-10.6.8 4.4-1.1 8-5.6 10.6Z" fill={G2} />
        <circle cx="54.5" cy="46.5" r="5.8" fill={G3} />
        <circle cx="52.9" cy="44.6" r="1.7" fill={PAPER_CARVE} />
      </svg>
    );
  }
  if (name === "farm") {
    return (
      <svg {...common}>
        <rect x="6" y="46" width="52" height="10" rx="5" fill={G1} />
        <rect x="6" y="46" width="52" height="3.6" rx="1.8" fill={G2} />
        <path d="M11.5 37.5a10.5 10.5 0 0 1 21 0Z" fill={G2} />
        <path d="M15.5 33.4c.7.5 1.1 1.2 1.3 2M20.5 31.8c.5.7.7 1.5.8 2.3M18 35.6c-.8-.2-1.4-.1-2 .1" stroke={PAPER_CARVE} strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <rect x="18" y="37.5" width="8" height="8.5" rx="3" fill={PAPER_CARVE} />
        <path d="M46 37.5a9.5 9.5 0 0 1 19 0Z" fill={G1} />
        <path d="M50 33.3c.6.5 1 1.1 1.2 1.9M54.5 31.9c.4.6.6 1.3.7 2" stroke={PAPER_CARVE} strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <rect x="52.5" y="37.5" width="7.5" height="8.5" rx="3" fill={PAPER_CARVE} />
        <path d="M31 42.5 34.5 39c3.2 3 5.5 6 7 9.4H31v-5.9Z" fill={G3} />
        <circle cx="51" cy="13" r="3" fill={G3} />
        <circle cx="49.9" cy="11.9" r="0.9" fill={PAPER_CARVE} />
        <path d="M6 56.5h52" stroke={G2} strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "dose") {
    return (
      <svg {...common}>
        <rect x="25" y="8" width="15" height="38" rx="7.5" fill={G2} />
        <path d="M25 23h15v-7.5a7.5 7.5 0 0 0-15 0V23Z" fill={G1} />
        <path d="M25 22.2h15" stroke={PAPER_CARVE} strokeWidth="1.5" />
        <path d="M28.5 15.6h4.2" stroke={PAPER_CARVE} strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
        <path d="M32.5 27.5c2.6 1.3 4.1 3.6 4.1 6.5 0 2.9-1.5 5.2-4.1 6.5-2.6-1.3-4.1-3.6-4.1-6.5 0-2.9 1.5-5.2 4.1-6.5Z" fill={G3} />
        <path d="M32.5 28.8v9.8" stroke={PAPER_CARVE} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M13.5 43.5c1-5 3.8-8.4 8-9.8 1.4 5.2-.8 9.4-8 9.8Z" fill={G2} />
        <path d="M56 13.5v6M53 16.5h6" stroke={G3} strokeWidth="2.6" strokeLinecap="round" />
        <path d="M50 47c-.6-4.2 1.4-7.8 5.6-9.4 1.2 4.6-.8 8.4-5.6 9.4Z" fill={G2} />
      </svg>
    );
  }
  if (name === "cert") {
    return (
      <svg {...common}>
        <path d="M32 4.5 48.5 10v11.4c0 11-6.6 19.9-16.5 25-9.9-5.1-16.5-14-16.5-25V10L32 4.5Z" fill={G1} />
        <path d="M32 10.5 44.8 14.6v6.9c0 8.3-5.3 15.2-12.8 19.3-7.5-4.1-12.8-11-12.8-19.3v-6.9L32 10.5Z" fill="none" stroke={G2} strokeWidth="2" />
        <path d="m25.2 31.4 5 5 9.4-10.2" stroke={PAPER_CARVE} strokeWidth="5.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="49" cy="14.5" r="7.4" fill={G3} />
        <circle cx="49" cy="14.5" r="2.7" fill={PAPER_CARVE} />
        <path d="M20.5 52c-1.8-3.4-1.6-6.4.8-9.2 2.2 2.9 2.6 5.9 1 9.2h-1.8Z" fill={G2} />
        <path d="M43.5 52c1.8-3.4 1.6-6.4-.8-9.2-2.2 2.9-2.6 5.9-1 9.2h1.8Z" fill={G2} />
        <path d="M32 56.5v3.4" stroke={G3} strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "dev") {
    return (
      <svg {...common}>
        <circle cx="33" cy="48" r="15.5" fill={G1} />
        <rect x="27" y="8" width="12" height="34" rx="2" fill={G1} />
        <rect x="25" y="5.5" width="16" height="5" rx="2.5" fill={G2} />
        <circle cx="33" cy="51.5" r="9.2" fill={G2} />
        <path d="M24.6 48.4c2.4-1.7 4.6-1.7 6.6 0 1.8 1.6 4 1.6 6.3 0 1.5-1.1 2.9-1.4 4.3-1" stroke={PAPER_CARVE} strokeWidth="1.7" strokeLinecap="round" fill="none" />
        <circle cx="29.6" cy="55.6" r="2.1" fill={PAPER_CARVE} />
        <circle cx="35.6" cy="52.4" r="1.6" fill={PAPER_CARVE} />
        <circle cx="32" cy="57.4" r="1.2" fill={PAPER_CARVE} />
        <path d="M23.5 34.5c1.6-4.6 3.6-7.6 6-9.4 1.2 5-1 8.8-6 9.4Z" fill={G2} />
        <path d="M46.5 30v6M43.5 33h6" stroke={G3} strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "eco") {
    return (
      <svg {...common}>
        <path d="M0 52 16.5 12l17.5 40H0Z" fill={G1} />
        <path d="M17 52 35.5 26 63 52H17Z" fill={G2} />
        <path d="M11.6 24.8 16.5 12l4.9 12.8-9.8 0Z" fill={PAPER_CARVE} />
        <path d="M46 11.5c2.5 3.2 4 5.8 4 8.4a4 4 0 1 1-8 0c0-2.6 1.5-5.2 4-8.4Z" fill={G3} />
        <path d="M45.1 15.2c.8 1 .8 1.9 0 2.9" stroke={PAPER_CARVE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M51 32.5 60 52H42l9-19.5Z" fill={G1} />
        <path d="M51 41 57.6 52H44.4L51 41Z" fill={G2} />
        <path d="M49.5 52c0-5.6 1.8-9.6 5-12-1.8 5.6-.6 9.4 3.4 12h-8.4Z" fill={G3} />
        <path d="M7 40c2.2 3 3.4 5.2 3.4 7.6a3.4 3.4 0 1 1-6.8 0C3.6 45.2 4.8 43 7 40Z" fill={G3} />
        <path d="M6.2 44.2c.7.9.7 1.8 0 2.7" stroke={PAPER_CARVE} strokeWidth="1.4" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="32" cy="32" r="25.5" fill={G2} />
      <circle cx="32" cy="32" r="25.5" fill="none" stroke={G1} strokeWidth="3" />
      <path d="M32 15c6.4 2.6 10 6.9 10 12.4 0 6.8-4.4 12.4-10 15.6-5.6-3.2-10-8.8-10-15.6 0-5.5 3.6-9.8 10-12.4Z" fill={PAPER_CARVE} />
      <path d="M32 18.5v22M32 29c-2.8-.6-5.1-1.9-6.9-4M32 29c2.8-.6 5.1-1.9 6.9-4" stroke={G2} strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="49.5" cy="15.5" r="3.6" fill={G3} />
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
                  фитотерапевт, клинический фармаколог, доктор китайской медицины, нутрициолог, автор YouTube-канала
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
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cream to-sageSoft/60 ring-1 ring-leaf/20">
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