import "./globals.css";
import "./fonts.css";
import { BRAND, SEO, SITE_PATH, SITE_URL } from "../lib/site";
import { ShopProvider } from "../components/ShopContext";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import SupportFab from "../components/support/SupportFab";
import LivePollen from "../components/live/LivePollenMount";
import LeafField from "../components/live/LeafField";


export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO.titleDefault,
    template: `%s · ${BRAND.name}`,
  },
  description: SEO.description,
  keywords: SEO.keywords,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: SITE_PATH + "/favicon.png", sizes: "192x192", type: "image/png" },
      { url: SITE_PATH + "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: SITE_PATH + "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
    apple: SITE_PATH + "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: BRAND.name,
    title: "PHYTOTAB — фитосборы, грибы и товары для здоровья врача Евгения Козлова",
    description:
      "Каталог фитосборов, грибов, витаминов и наборов PHYTOTAB с ценами и составом, корзина, оформление заказа, доставка СДЭК по России.",
    images: [{ url: `${SITE_URL}/og.svg`, width: 1200, height: 630, alt: "PHYTOTAB — магазин товаров здоровья" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PHYTOTAB — магазин товаров здоровья врача Евгения Козлова",
    description: "Фитосборы, грибы, витамины и наборы. Доставка СДЭК по России, самовывоз в Москве.",
    images: [`${SITE_URL}/og.svg`],
  },
  robots: { index: true, follow: true },
};

// Кириллические начертания первого экрана: ускоряют LCP (h1 Cormorant 600, текст Manrope 400).
// Имена файлов контентные (hash от файла) и стабильны между сборками.
const PRELOAD_FONTS = [
  `${SITE_PATH}/_next/static/media/Cormorant-cyrillic-600.50c4eb61.woff2`,
  `${SITE_PATH}/_next/static/media/Manrope-cyrillic-400.1a075d0e.woff2`,
  `${SITE_PATH}/_next/static/media/Manrope-cyrillic-700.a3ab8973.woff2`,
  `${SITE_PATH}/_next/static/media/Manrope-latin-400.b69ff29f.woff2`,
  `${SITE_PATH}/_next/static/media/Manrope-latin-700.4fc2723e.woff2`,
];

export const viewport = {
  themeColor: "#F7F3EA",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="min-h-screen">
        {PRELOAD_FONTS.map((href) => (
          <link key={href} rel="preload" as="font" type="font/woff2" href={href} crossOrigin="anonymous" />
        ))}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Перейти к содержанию
        </a>
        <ShopProvider>
          <div className="site-bg" aria-hidden="true">
            <LivePollen />
            <LeafField />
          </div>
          <div className="site-content">
            <Nav />
            {children}
            <Footer />
            <CartDrawer />
            <SupportFab />
          </div>
        </ShopProvider>
        <noscript>
          <style>{`.rv{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
      </body>
    </html>
  );
}