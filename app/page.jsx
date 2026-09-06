import Hero from "../components/Hero";
import PromoSwiper from "../components/home/PromoSwiper";
import QuizSection from "../components/home/QuizSection";
import TrustBar from "../components/TrustBar";
import HomeShelves from "../components/home/HomeShelves";
import DeliveryStrip from "../components/home/DeliveryStrip";
import AboutDoctor from "../components/home/AboutDoctor";
import KnowledgeTeasers from "../components/home/KnowledgeTeasers";
import Reviews from "../components/Reviews";
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
        <Hero />
        <PromoSwiper />
        <TrustBar />
        <HomeShelves />
        <QuizSection />
        <DeliveryStrip />
        <AboutDoctor />
        <KnowledgeTeasers />
        <Reviews />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
    </>
  );
}