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
        <path d="M6.8 3.6 C8.2 3.6 9.5 4.3 10.2 5.5 L11.3 7.5 C11.8 8.5 11.5 9.6 10.8 10.3 L9.8 11.2 C11 13.3 12.7 15 14.8 16.2 L15.7 15.2 C16.4 14.5 17.5 14.2 18.4 14.7 L20.5 15.8 C21.7 16.5 22.4 17.8 22.4 19.1 C22.4 20.2 21.5 21.1 20.4 21.1 C11.8 21.1 4.9 14.2 4.9 5.6 C4.9 4.5 5.7 3.6 6.8 3.6 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M16.4 2.6 A4.9 4.9 0 0 1 20.8 6.9" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        <circle cx="21.9" cy="3" r="1.6" fill={accent} />
      </svg>
    );
  }

  function PinGlyph({ className, accent = "#E8963A" }) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M12 21.8 C12 21.8 4.4 14.8 4.4 9.3 A7.6 7.6 0 1 1 19.6 9.3 C19.6 14.8 12 21.8 12 21.8 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="12" cy="9.3" r="3.3" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="9.3" r="1.7" fill={accent} />
      </svg>
    );
  }

  function SearchGlyph({ className }) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <circle cx="10.8" cy="10.8" r="6.9" stroke="currentColor" strokeWidth="2" />
        <path d="M16 16 L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8.2 9.1 Q9.2 7 11.8 6.8" stroke="#78AA36" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M13.8 11 C14.6 12.1 15.2 13 15.2 14 A1.8 1.8 0 1 1 11.6 14 C11.6 13 12.2 12.1 13.8 11 Z" fill="#E8963A" />
      </svg>
    );
  }

  function UserGlyph({ className }) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <circle cx="12" cy="8.1" r="3.9" stroke="currentColor" strokeWidth="2" />
        <path d="M5 20.4 C5 16.2 8.2 14.1 12 14.1 C15.8 14.1 19 16.2 19 20.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="17.1" cy="4.9" r="1.6" fill="#E8963A" />
      </svg>
    );
  }

  function HeartGlyph({ className }) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M12 20 C12 20 4.3 15.3 4.3 9.4 C4.3 6.3 6.8 4.2 9.3 4.2 C10.6 4.2 11.6 4.9 12 5.8 C12.4 4.9 13.4 4.2 14.7 4.2 C17.2 4.2 19.7 6.3 19.7 9.4 C19.7 15.3 12 20 12 20 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 10.3 C13 11.7 13.8 12.7 13.8 13.9 A1.9 1.9 0 1 1 10.2 13.9 C10.2 12.7 11 11.7 12 10.3 Z" fill="#E8963A" />
      </svg>
    );
  }

  function BagGlyph({ className }) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M8.3 8.1 V6.7 A3.7 3.7 0 0 1 15.7 6.7 V8.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M5.4 8.1 H18.6 L19.6 18.8 A2.2 2.2 0 0 1 17.4 21 H6.6 A2.2 2.2 0 0 1 4.4 18.8 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M7.8 13.5 Q12 15.4 16.2 13.5" stroke="#78AA36" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="12" cy="17.1" r="1.8" fill="#E8963A" />
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
            <PhoneGlyph className="h-3.5 w-3.5" />
            Служба поддержки {SUPPORT_PHONE_RAW}, с 10 до 20 (МСК)
          </a>
          <div className="flex items-center gap-6">
            <Link href="/info/contacts/" className="flex items-center gap-1.5 font-semibold transition hover:text-white">
              <PinGlyph className="h-3.5 w-3.5" />
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
