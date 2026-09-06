import Link from "next/link";
import infoPages from "../../data/info-pages.json";
import { asset } from "../../lib/site";

const EXTRA_LINKS = [
  { href: "/catalog/", label: "Каталог товаров" },
  { href: "/knowledge/", label: "Знания врача" },
  { href: "/reviews/", label: "Отзывы" },
  { href: "/account/", label: "Мои заказы" },
];

export default function InfoPageView({ page }) {
  const others = infoPages
    .filter((p) => p.slug !== page.slug)
    .map((p) => ({ href: `/info/${p.slug}/`, label: p.title }));
  return (
    <div className="pt-16 sm:pt-[72px]">
      <div className="wrap py-8 sm:py-12">
        <nav aria-label="Хлебные крошки" className="font-mono text-[11px] uppercase tracking-wider text-khaki">
          <Link href="/" className="transition hover:text-leaf">Главная</Link>
          <span aria-hidden="true"> / {page.title}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="min-w-0">
            <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {page.title}
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink/90">{page.intro}</p>

            {(page.gallery || []).length > 0 && (
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {(page.gallery || []).map((photo, i) => (
                  <figure key={i} className="overflow-hidden rounded-3xl border border-line bg-cream shadow-card">
                    <img
                      src={asset(photo.src)}
                      alt={photo.alt || ""}
                      width={1000}
                      height={700}
                      loading="lazy"
                      className="w-full object-cover"
                    />
                    {photo.caption && (
                      <figcaption className="px-5 py-4 text-[14px] leading-relaxed text-secondary">
                        {photo.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}

            <div className="mt-8 space-y-6">
              {(page.sections || []).map((section, i) => (
                <section
                  key={section.h + i}
                  className="rounded-3xl border border-line bg-cream p-6 sm:p-7"
                  aria-label={section.h}
                >
                  <h2 className="font-display text-2xl font-semibold">{section.h}</h2>
                  {(section.paragraphs || []).map((text, j) => (
                    <p key={j} className="mt-3 text-[16px] leading-relaxed text-ink">
                      {text}
                    </p>
                  ))}
                  {(section.bullets || []).length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {(section.bullets || []).map((text, j) => (
                        <li key={j} className="flex items-baseline gap-2.5 text-[16px] leading-relaxed text-ink">
                          <span className="h-1.5 w-1.5 shrink-0 translate-y-[-1px] rounded-full bg-honey" aria-hidden="true" />
                          {text}
                        </li>
                      ))}
                    </ul>
                  )}
                  {(section.links || []).length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-3">
                      {(section.links || []).map((item, j) => {
                        const external = /^https?:\/\//.test(item.href);
                        return external ? (
                          <a
                            key={j}
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex rounded-full border border-leaf/40 bg-paper px-5 py-2.5 text-[14px] font-bold text-leafDark transition hover:-translate-y-0.5 hover:bg-leaf hover:text-paper"
                          >
                            {item.label} →
                          </a>
                        ) : (
                          <Link
                            key={j}
                            href={item.href}
                            className="inline-flex rounded-full border border-leaf/40 bg-paper px-5 py-2.5 text-[14px] font-bold text-leafDark transition hover:-translate-y-0.5 hover:bg-leaf hover:text-paper"
                          >
                            {item.label} →
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/catalog/"
                className="rounded-full bg-honey px-6 py-3 text-[15px] font-extrabold text-ink shadow-card transition hover:-translate-y-0.5 hover:bg-honeyDark"
              >
                Перейти в каталог
              </Link>
              <Link
                href="/#shelves"
                className="rounded-full border border-line bg-paper px-6 py-3 text-[15px] font-bold text-ink/90 transition hover:border-leaf hover:text-leaf"
              >
                Подборки на главной
              </Link>
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-line bg-cream p-6 lg:sticky lg:top-24">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-khaki">полезные страницы</p>
            <ul className="mt-4 space-y-2">
              {[...others, ...EXTRA_LINKS].map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    className="text-[14.5px] font-semibold text-ink transition hover:text-leaf"
                  >
                    {item.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}