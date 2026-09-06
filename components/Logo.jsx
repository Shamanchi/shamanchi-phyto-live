import { asset } from "../lib/site";

/**
 * ЕДИНСТВЕННЫЙ компонент лого PHYTOTAB (пункты 2.16/2.23 ТЗ):
 * оригинальная пара «знак-лист + вордмарк PHYTOTAB с буквой Y».
 * Используется во всех местах сайта: шапка, подвал, баннеры, карточка врача, оформление.
 * Никаких перерисовок: только эти два PNG (и wide-версия с дескриптором для больших мест).
 */
export default function Logo({
  markOnly = false,
  wide = false,
  className = "",
  markClassName = "",
  wordClassName = "",
  height = 28,
  alt = "PHYTOTAB",
}) {
  const wordHeight = wide ? Math.round(height * 1.2) : height;
  const wordWidth = wide ? Math.round(wordHeight * (1976 / 422)) : Math.round(wordHeight * (740 / 118));
  return (
    <span className={`inline-flex select-none items-center gap-2 ${className}`}>
      <img
        src={asset("/images/brand/logo-leaf.png")}
        alt=""
        aria-hidden="true"
        width={48}
        height={48}
        loading="eager"
        decoding="async"
        className={`h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10 ${markClassName}`}
      />
      {!markOnly && (
        <img
          src={asset(wide ? "/images/brand/logo-wide.png" : "/images/brand/logo-word.png")}
          alt={alt}
          width={wordWidth}
          height={wordHeight}
          loading="eager"
          decoding="async"
          style={{ height: wordHeight }}
          className={`w-auto object-contain ${wordClassName}`}
        />
      )}
    </span>
  );
}