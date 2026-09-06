import { notFound } from "next/navigation";
import Link from "next/link";
import articles from "../../../data/articles.json";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} — Знания врача`,
    description: `Статья врача-фитотерапевта Евгения Козлова: ${String(article.text || "").replace(/\s+/g, " ").slice(0, 160)}…`,
  };
}

function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = String(iso).split("-");
  return y && m && d ? `${d}.${m}.${y}` : iso;
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  const others = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <main id="main">
      <div className="pt-16 sm:pt-[72px]">
        <div className="wrap py-8 sm:py-12">
          <nav aria-label="Хлебные крошки" className="font-mono text-[11px] uppercase tracking-wider text-khaki">
            <Link href="/" className="transition hover:text-leaf">Главная</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/knowledge/" className="transition hover:text-leaf">Знания врача</Link>
            <span aria-hidden="true"> / {article.title}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_300px]">
            <article className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-wider text-khaki">
                {formatDate(article.date)} · PHYTOTAB
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                {article.title}
              </h1>
              <div className="mt-6 space-y-4 text-[16.5px] leading-[1.75] text-ink/85">
                {String(article.text || "")
                  .split(/\n+/)
                  .filter(Boolean)
                  .map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
              </div>
              {article.safetyNote && (
                <p className="mt-8 rounded-2xl border border-line bg-cream p-4 text-[13px] leading-relaxed text-ink/60">
                  {article.safetyNote}
                </p>
              )}
              <p className="mt-8 rounded-2xl bg-sageSoft/40 p-4 text-[13px] leading-relaxed text-leafDark">
                БАД. Не является лекарственным средством. Перед применением проконсультируйтесь со специалистом.
              </p>
            </article>

            <aside className="h-fit rounded-3xl border border-line bg-cream p-6 lg:sticky lg:top-24">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-khaki">ещё статьи</p>
              <ul className="mt-4 space-y-3">
                {others.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/knowledge/${a.slug}/`} className="text-[14.5px] font-semibold leading-snug text-ink/75 transition hover:text-leaf">
                      {a.title} →
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/catalog/"
                className="mt-5 block rounded-full bg-honey px-5 py-3 text-center text-[14px] font-extrabold text-ink shadow-card transition hover:-translate-y-0.5 hover:bg-[#BB7B1E]"
              >
                Перейти в каталог
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}