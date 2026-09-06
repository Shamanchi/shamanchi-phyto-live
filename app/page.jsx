import Hero from "../components/Hero";
import PromoSwiper from "../components/home/PromoSwiper";
import CategoryTiles from "../components/home/CategoryTiles";
import QuizSection from "../components/home/QuizSection";
import HomeShelves from "../components/home/HomeShelves";
import DeliveryStrip from "../components/home/DeliveryStrip";
import AboutDoctor from "../components/home/AboutDoctor";
import KnowledgeTeasers from "../components/home/KnowledgeTeasers";
import Reviews from "../components/Reviews";
import FinalCta from "../components/home/FinalCta";
import { BRAND, SITE_URL } from "../lib/site";

const ldJson = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  name: BRAND.name,
  url: SITE_URL,
  description:
    "Магазин товаров здоровья врача-фитотерапевта Евгения Козлова: фитосборы, грибы, витамины и наборы. Доставка СДЭК по России, самовывоз в Москве.",
  founder: {
    "@type": "Person",
    name: "Евгений Козлов",
    jobTitle: "врач-фитотерапевт",
  },
  inLanguage: "ru",
};

export default function Page() {
  return (
    <>
      <main id="main">
        {/* Канонический порядок (правка 3, п. 1): hero → категории → витрина/подборки → квиз → преимущества → отзывы → CTA → подвал */}
        <Hero />
        <CategoryTiles />
        <PromoSwiper />
        <HomeShelves />
        <QuizSection />
        <DeliveryStrip />
        <AboutDoctor />
        <KnowledgeTeasers />
        <Reviews />
        <FinalCta />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
    </>
  );
}