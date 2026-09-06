import { notFound } from "next/navigation";
import InfoPageView from "../../../components/info/InfoPageView";
import infoPages from "../../../data/info-pages.json";

export function generateStaticParams() {
  return infoPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = infoPages.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    title: `${page.title} — PHYTOTAB`,
    description: page.intro,
  };
}

export default async function InfoPage({ params }) {
  const { slug } = await params;
  const page = infoPages.find((p) => p.slug === slug);
  if (!page) notFound();
  return (
    <main id="main">
      <InfoPageView page={page} />
    </main>
  );
}