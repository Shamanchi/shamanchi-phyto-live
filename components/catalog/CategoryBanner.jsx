import { asset } from "../../lib/site";

/**
 * Баннер категории каталога с лицом врача (пункты 2.14/2.20 ТЗ): лицо Евгения
 * продаёт в каждой категории — фото + короткая фраза категории + цитата отзыва.
 */
const PHRASES = {
  fitosbory: "Фитосборы — основа системы доктора: травы подобраны под задачу и принимаются курсом.",
  "griby-v-kapsulah": "Грибы с собственной фермы в капсулах — удобный формат курсовой поддержки.",
  "griby-v-poroshkah": "Грибы с собственной фермы в порошках — добавьте в привычный рацион.",
  combosets: "Наборы по системе Евгения Козлова — готовые курсы из нескольких средств.",
  "vitaminy-i-dobavki": "Витамины и добавки, которые врач рекомендует к курсам: коллаген, магний, витамин D.",
  immunity: "Для поддержки иммунитета — грибы, сборы и витамины курсом, как назначает врач.",
  gastrointestinal: "Здоровье ЖКТ — база всего: сборы, клетчатка и мягкое очищение по системе доктора.",
  antiparasitic: "Антипаразитарные фитохитодезы — традиционные рецептуры, курсовая поддержка.",
  antistress: "Мягкая поддержка нервной системы: травяные сборы для сна, спокойствия и восстановления.",
  brain: "Поддержка памяти и ясности мышления: сборы и грибы для работы мозга.",
  "dlya-kozhi-volos-i-nogtej": "Красота изнутри: коллаген, кремний и витамины для кожи, волос и ногтей.",
};

const QUOTES = {
  immunity: { author: "Людмила", text: "«Иммунитет повысился, энергии прибавилось. Вся продукция очень качественная»" },
  "dlya-kozhi-volos-i-nogtej": { author: "Ксения", text: "«Самый качественный коллаген: волосы крепкие, красивые — и не седые»" },
  combosets: { author: "Олег", text: "«Прошёл два курса Евгения Козлова — очень мощный оздоровительный результат»" },
};

export default function CategoryBanner({ slug, name }) {
  const phrase = PHRASES[slug] || "Товары из реального каталога PHYTOTAB, которые проверяет врач-фитотерапевт.";
  const quote = QUOTES[slug] || {
    author: "Вадим",
    text: "«Знаю Евгения Козлова уже много лет и полностью доверяю его продукции»",
  };

  return (
    <div
      data-testid="category-banner"
      className="mt-6 grid items-center gap-6 overflow-hidden rounded-3xl border border-line bg-cream p-6 shadow-card sm:grid-cols-[200px_1fr] sm:p-7"
    >
      <div className="relative mx-auto h-44 w-40 overflow-hidden rounded-2xl ring-1 ring-line/70 sm:h-44">
        <img
          src={asset("/images/brand/doctor-hero.jpg")}
          alt="Евгений Козлов — врач-фитотерапевт, основатель PHYTOTAB"
          width={400}
          height={533}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-honey/15 via-transparent to-transparent" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-secondary">врач за разделом</p>
        <h2 className="mt-1.5 font-display text-3xl font-semibold leading-tight sm:text-[34px]">
          {name} <span className="text-leaf">PHYTOTAB</span>
        </h2>
        <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-ink/90">{phrase}</p>
        <blockquote className="mt-3 rounded-2xl border-l-4 border-honey bg-paper/80 py-3 pl-4 pr-3">
          <p className="text-[14.5px] italic leading-snug text-ink/90">{quote.text}</p>
          <footer className="mt-1 font-mono text-[11px] font-bold uppercase tracking-wider text-secondary">
            — {quote.author}, отзыв с Яндекс.Карт
          </footer>
        </blockquote>
      </div>
    </div>
  );
}