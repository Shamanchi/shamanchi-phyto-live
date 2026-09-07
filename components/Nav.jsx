"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { asset, BRAND, SHOP_PHONE_HREF, SUPPORT_HOURS, SUPPORT_PHONE_RAW } from "../lib/site";
import { useShop } from "./ShopContext";
import Logo from "./Logo";

// Полное меню: Каталог, О нас, Оплата, Доставка, Вопросы, Статьи, Контакты.
const MENU_LINKS = [
  { href: "/catalog/", label: "Каталог" },
  { href: "/info/brand/", label: "О нас" },
  { href: "/info/payment/", label: "Оплата" },
  { href: "/info/delivery/", label: "Доставка" },
  { href: "/info/faq/", label: "Вопросы" },
  { href: "/knowledge/", label: "Статьи" },
  { href: "/info/contacts/", label: "Контакты" },
];

const MOBILE_EXTRA = [
  { href: "/#podbor", label: "Подбор по задаче" },
  { href: "/info/doctor/", label: "О создателе проекта" },
  { href: "/favorites/", label: "Избранное" },
  { href: "/account/", label: "Мои заказы" },
];


  function PhoneGlyph({ className, accent = "#E8963A" }) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M6.8 3.8 C8.1 3.8 9.4 4.5 10.1 5.7 L11.2 7.7 C11.7 8.6 11.4 9.7 10.7 10.4 L9.7 11.3 C10.9 13.4 12.6 15.1 14.7 16.3 L15.6 15.3 C16.3 14.6 17.4 14.3 18.3 14.8 L20.4 15.9 C21.6 16.6 22.3 17.9 22.3 19.2 C22.3 20.3 21.4 21.2 20.3 21.2 C11.7 21.2 4.8 14.3 4.8 5.7 C4.8 4.6 5.7 3.8 6.8 3.8 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M16.6 3 A4.8 4.8 0 0 1 20.6 6.8" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M13.4 2.2 A7.8 7.8 0 0 1 21.4 9.6" stroke={accent} strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
        <circle cx="21.6" cy="3.4" r="1.5" fill={accent} />
      </svg>
    );
  }

  function PinGlyph({ className, accent = "#E8963A" }) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M12 21.6 C12 21.6 4.6 14.7 4.6 9.4 A7.4 7.4 0 1 1 19.4 9.4 C19.4 14.7 12 21.6 12 21.6 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="12" cy="9.4" r="3.6" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="9.4" r="1.8" fill={accent} />
      </svg>
    );
  }

  function SearchGlyph({ className }) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M15.9 15.9 L20.8 20.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8.4 9.2 Q9.3 7.2 11.7 7" stroke="#78AA36" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M13.6 11 C14.4 12.1 15 13 15 14 A1.7 1.7 0 1 1 11.6 14 C11.6 13 12.2 12.1 13.6 11 Z" fill="#E8963A" />
      </svg>
    );
  }

  function UserGlyph({ className }) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <circle cx="12" cy="8.2" r="3.8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5.2 20.2 C5.2 16.2 8.3 14.2 12 14.2 C15.7 14.2 18.8 16.2 18.8 20.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="16.9" cy="5.2" r="1.5" fill="#E8963A" />
      </svg>
    );
  }

  function HeartGlyph({ className }) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M12 19.9 C12 19.9 4.5 15.3 4.5 9.5 C4.5 6.5 6.9 4.4 9.4 4.4 C10.7 4.4 11.6 5 12 5.9 C12.4 5 13.3 4.4 14.6 4.4 C17.1 4.4 19.5 6.5 19.5 9.5 C19.5 15.3 12 19.9 12 19.9 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 10.4 C13 11.8 13.7 12.7 13.7 13.8 A1.8 1.8 0 1 1 10.3 13.8 C10.3 12.7 11 11.8 12 10.4 Z" fill="#E8963A" />
      </svg>
    );
  }

  function BagGlyph({ className }) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M8.4 8.2 V6.9 A3.6 3.6 0 0 1 15.6 6.9 V8.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M5.6 8.2 H18.4 L19.4 18.7 A2.1 2.1 0 0 1 17.3 21 H6.7 A2.1 2.1 0 0 1 4.6 18.7 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 13.6 Q12 15.4 16 13.6" stroke="#78AA36" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="17" r="1.7" fill="#E8963A" />
      </svg>
    );
  }

  export default function Nav() {
  const { count, favoriteCount, setCartOpen } = useShop();
  const router = useRouter();
  const pathname = usePathname() || "/";
  const page = pathname.replace(/\/+$/, "") || "/";
  const isHome = page === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      window.setTimeout(() => searchInputRef.current?.focus(), 40);
    }
  }, [searchOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const submitSearch = (event) => {
    event.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/catalog/?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  const solid = scrolled || menuOpen || searchOpen || !isHome;
  const headerClass = solid
    ? "border-b border-line/70 bg-paper/90 shadow-[0_8px_30px_-20px_rgba(34,48,31,.3)] backdrop-blur-md"
    : "bg-transparent";

  return (
    <header className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${headerClass}`}>
      {/* Верхняя плашка: поддержка + самовывоз */}
      <div
        data-testid="nav-topbar"
        className="hidden bg-leafDark text-[#EDF3E4] lg:block"
      >
        <div className="wrap flex h-[38px] items-center justify-between gap-4 text-[13px]">
          <a href={SHOP_PHONE_HREF} className="flex items-center gap-2 font-semibold transition hover:text-white">
            <PhoneGlyph className="h-3.5 w-3.5" accent="#EDF3E4" />
            Служба поддержки {SUPPORT_PHONE_RAW}, с 10 до 20 (МСК)
          </a>
          <div className="flex items-center gap-6">
            <Link href="/info/contacts/" className="flex items-center gap-1.5 font-semibold transition hover:text-white">
              <PinGlyph className="h-3.5 w-3.5" accent="#EDF3E4" />
              Пункт самовывоза
            </Link>
          </div>
        </div>
      </div>

      <div className="wrap flex h-16 items-center justify-between gap-2 sm:h-[72px] sm:gap-3">
        <Link
          href="/"
          aria-label={`${BRAND.wordmarkA} ${BRAND.wordmarkB} — на главную`}
          className="flex shrink-0 items-center rounded-full bg-paper/85 py-1 pl-1.5 pr-3 ring-1 ring-line/80 transition hover:bg-paper sm:pr-3.5"
        >
          <Logo height={22} wordClassName="hidden sm:block" />
        </Link>

        <nav aria-label="Основная навигация" className="hidden items-center gap-0 xl:flex">
          {MENU_LINKS.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="whitespace-nowrap rounded-full px-2 py-2 text-[13.5px] font-semibold text-ink/90 transition hover:bg-sageSoft/60 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#podbor"
            className="ml-1 whitespace-nowrap rounded-full bg-leaf px-3 py-2 text-[13px] font-bold text-paper transition hover:bg-leafDark"
          >
            Подбор по задаче
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          {/* Поиск */}
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-expanded={searchOpen}
            aria-label={searchOpen ? "Закрыть поиск" : "Открыть поиск"}
            className="group grid h-10 w-10 place-items-center rounded-full border border-line bg-cream text-ink transition hover:border-leaf/50 hover:bg-sageSoft/50 sm:h-11 sm:w-11"
          >
            <SearchGlyph className="h-[18px] w-[18px] text-leaf group-hover:text-leafDark" />
          </button>
          {/* Телефон — на мобильных плашка сворачивается в иконку */}
          <a
            href={SHOP_PHONE_HREF}
            aria-label="Позвонить в поддержку"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-cream text-ink transition hover:border-leaf/50 hover:bg-sageSoft/50 xl:hidden sm:h-11 sm:w-11"
          >
            <PhoneGlyph className="h-[18px] w-[18px] text-leaf group-hover:text-leafDark" />
          </a>
          {/* Кабинет */}
          <Link
            href="/account/"
            aria-label="Личный кабинет — мои заказы"
            className="group hidden h-10 w-10 place-items-center rounded-full border border-line bg-cream text-ink transition hover:border-leaf/50 hover:bg-sageSoft/50 md:grid sm:h-11 sm:w-11"
          >
            <UserGlyph className="h-[18px] w-[18px] text-leaf group-hover:text-leafDark" />
          </Link>
          {/* Избранное */}
          <Link
            href="/favorites/"
            aria-label={`Избранное, товаров: ${favoriteCount}`}
            className="group relative hidden h-10 w-10 place-items-center rounded-full border border-line bg-cream text-ink transition hover:border-leaf/50 hover:bg-sageSoft/50 md:grid sm:h-11 sm:w-11"
          >
            <HeartGlyph className="h-[18px] w-[18px] text-leaf group-hover:text-leafDark" />
            {favoriteCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-leaf px-1 text-[11px] font-extrabold text-paper">
                {favoriteCount}
              </span>
            )}
          </Link>
          {/* Корзина */}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Корзина, товаров: ${count}`}
            className="group relative grid h-10 w-10 place-items-center rounded-full border border-line bg-cream text-ink transition hover:border-leaf/50 hover:bg-sageSoft/50 sm:h-11 sm:w-11"
          >
            <BagGlyph className="h-[18px] w-[18px] text-leaf group-hover:text-leafDark" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-honey px-1 text-[11px] font-extrabold text-ink">
                {count}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            className="group grid h-10 w-10 place-items-center rounded-full border border-line bg-cream text-ink xl:hidden sm:h-11 sm:w-11"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {menuOpen ? <path d="M6 6 L18 18 M18 6 L6 18" /> : <path d="M4 7 H20 M4 12 H20 M4 17 H20" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Поисковая панель */}
      {searchOpen && (
        <div className="border-t border-line/60 bg-paper/95 px-5 py-4 backdrop-blur-md">
          <form onSubmit={submitSearch} className="wrap flex items-center gap-3" role="search" aria-label="Поиск по каталогу">
            <SearchGlyph className="h-5 w-5 shrink-0 text-leaf" />
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск: иммунитет, коллаген, грибы…"
              aria-label="Поиск по каталогу"
              className="w-full bg-transparent text-[16px] outline-none placeholder:text-ink/40"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-leaf px-5 py-2 text-[14px] font-bold text-paper transition hover:bg-leafDark"
            >
              Найти
            </button>
          </form>
        </div>
      )}

      {/* Мобильное меню (до xl) */}
      {menuOpen && (
        <nav aria-label="Мобильная навигация" className="max-h-[calc(100vh-6rem)] overflow-y-auto border-t border-line/60 bg-paper/95 px-5 pb-5 pt-2 xl:hidden">
          <div className="wrap space-y-0.5">
            {MENU_LINKS.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-[16px] font-semibold text-ink hover:bg-sageSoft/50"
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-line" />
            {MOBILE_EXTRA.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[15.5px] font-bold text-leafDark hover:bg-sageSoft/50"
              >
                {link.href.startsWith("/favorites") && link.label === "Избранное" && favoriteCount > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-leaf px-1 text-[11px] font-extrabold text-paper">
                    {favoriteCount}
                  </span>
                )}
                {link.label}
              </Link>
            ))}
            <div className="mt-3 rounded-2xl border border-line bg-cream px-4 py-3 text-[14px] leading-relaxed text-secondary">
              Служба поддержки{" "}
              <a href={SHOP_PHONE_HREF} className="font-extrabold text-leaf">
                {SUPPORT_PHONE_RAW}
              </a>
              , ежедневно {SUPPORT_HOURS}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
