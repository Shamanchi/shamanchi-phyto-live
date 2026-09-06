import Link from "next/link";
import products from "../data/products.json";
import HeroLeavesMount from "./live/HeroLeavesMount";
import DoctorCard from "./home/DoctorCard";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-10 pt-28 sm:pt-32 lg:pb-14">
      {/* слой 2 «листья»: tsParticles, только первый экран и десктоп */}
      <HeroLeavesMount />

      <div className="wrap relative grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-sage/50 bg-cream/70 px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-leaf" aria-hidden="true" />
            PHYTOTAB · магазин товаров здоровья
          </p>

          <h1 className="font-display text-[44px] font-semibold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-[64px]">
            Фитосборы врача
            <br />
            <span className="text-leaf">Евгения Козлова</span>
          </h1>

          {/* Креденшелы под заголовком (правка 3, п. 8) — одна строка, без дублирования полного блока */}
          <p className="mt-4 flex flex-wrap items-center gap-x-2 text-[15px] font-bold leading-snug text-leafDark sm:text-base">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-honey" aria-hidden="true" />
            Врач-фитотерапевт, клинический фармаколог, вице-президент китайского фармакологического общества
          </p>

          <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-ink sm:text-xl">
            Фитосборы, грибы, витамины и наборы по системе доктора. Практикующий
            врач-фитотерапевт и рецептуры, проверенные в работе с пациентами.
          </p>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink/90 sm:text-base">
            Сырьё из экологически чистых регионов России: травы с Алтая, из Крыма и
            Башкортостана, грибы — с собственной фермы. Понятный состав и способ применения
            на странице каждого товара.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/catalog/"
              className="inline-flex items-center gap-2 rounded-full bg-honey px-7 py-3.5 text-lg font-bold text-ink shadow-card transition hover:-translate-y-0.5 hover:bg-honeyDark"
            >
              Смотреть каталог
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 10h12m0 0-5-5m5 5-5 5" />
              </svg>
            </Link>
            <Link
              href="/#podbor"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink/15 bg-transparent px-7 py-3 text-lg font-bold text-ink transition hover:border-leaf hover:text-leaf"
            >
              Подобрать под задачу
            </Link>
          </div>

          <p className="mt-7 font-mono text-[12px] uppercase tracking-[0.12em] text-secondary">
            {products.length} товара в каталоге · доставка СДЭК по России · самовывоз в Москве
          </p>
        </div>

        {/* Живое фото врача справа от заголовка */}
        <div className="relative z-10 mx-auto w-full max-w-[440px]">
          <DoctorCard />
        </div>
      </div>
    </section>
  );
}
