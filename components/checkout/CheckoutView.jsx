"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useShop } from "../ShopContext";
import { formatPrice, SHOP, SHOP_TG_URL, PICKUP_ADDRESS, PICKUP_HOURS } from "../../lib/site";
import { deliveryCost, deliveryOption } from "../../lib/shop";

function OptionCard({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        active ? "border-leaf bg-sageSoft/40 shadow-card" : "border-line bg-cream hover:border-leaf/50"
      }`}
    >
      {children}
    </button>
  );
}

export default function CheckoutView() {
  const router = useRouter();
  const { lines, count, subtotal, discount, total, promo, placeOrder } = useShop();

  const [step, setStep] = useState(1);
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [deliveryKey, setDeliveryKey] = useState("cdek");
  const [address, setAddress] = useState("");
  const [paymentKey, setPaymentKey] = useState("card");
  const [error, setError] = useState("");
  const [agree, setAgree] = useState(false);

  if (lines.length === 0) {
    return (
      <div className="pt-16 sm:pt-[72px]">
        <div className="wrap py-16 text-center sm:py-24">
          <h1 className="font-display text-4xl font-semibold">Оформлять пока нечего</h1>
          <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-ink/90">
            В корзине нет товаров. Загляните в каталог и добавьте позиции — оформление занимает пару минут.
          </p>
          <Link
            href="/catalog/"
            className="mt-8 inline-flex rounded-full bg-honey px-7 py-3.5 text-lg font-bold text-ink shadow-card transition hover:-translate-y-0.5 hover:bg-honeyDark"
          >
            Открыть каталог
          </Link>
        </div>
      </div>
    );
  }

  const delivery = deliveryOption(deliveryKey);
  const shipCost = deliveryCost(deliveryKey, total);
  const grandTotal = total + shipCost;
  const contactOk = contact.name.trim().length >= 2 && contact.phone.trim().length >= 6;
  const addressOk = !delivery.needAddress || address.trim().length >= 3;

  const next = () => {
    setError("");
    if (step === 1 && !contactOk) {
      setError("Укажите имя и телефон — менеджер подтвердит заказ по телефону или в мессенджере.");
      return;
    }
    if (step === 2 && !addressOk) {
      setError("Для этого способа доставки нужен город и адрес.");
      return;
    }
    setStep((s) => Math.min(3, s + 1));
  };

  const submit = () => {
    if (!agree) {
      setError("Подтвердите согласие с договором-офертой и политикой обработки персональных данных — без этого мы не можем оформить заказ.");
      return;
    }
    const order = placeOrder({
      name: contact.name.trim(),
      phone: contact.phone.trim(),
      email: contact.email.trim(),
      address: address.trim(),
      deliveryKey,
      deliveryCost: shipCost,
      paymentKey,
    });
    if (order) {
      router.push(`/order-success?id=${encodeURIComponent(order.id)}`);
    }
  };

  const set = (key) => (e) => setContact((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="pt-16 sm:pt-[72px]">
      <div className="wrap py-8 sm:py-10">
        <nav aria-label="Хлебные крошки" className="font-mono text-[11px] uppercase tracking-wider text-khaki">
          <Link href="/" className="transition hover:text-leaf">Главная</Link>
          <span aria-hidden="true"> / </span>
          <Link href="/cart/" className="transition hover:text-leaf">Корзина</Link>
          <span aria-hidden="true"> / Оформление</span>
        </nav>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-semibold sm:text-5xl">Оформление заказа</h1>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-khaki">
              контакты → доставка → оплата
            </p>
          </div>
        </div>

        {/* Шаги */}
        <ol className="mt-6 flex flex-wrap gap-2" aria-label="Шаги оформления">
          {["Контакты", "Доставка", "Оплата"].map((label, i) => {
            const n = i + 1;
            return (
              <li key={label}>
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[13px] font-bold ${
                    step === n
                      ? "border-leaf bg-leaf text-paper"
                      : step > n
                        ? "border-sage/60 bg-sageSoft/50 text-leafDark"
                        : "border-line bg-cream text-secondary"
                  }`}
                >
                  <span aria-hidden="true">{n}</span> {label}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            {step === 1 && (
              <section aria-label="Контактные данные" className="rounded-3xl border border-line bg-cream p-6">
                <h2 className="font-display text-2xl font-semibold">Контактные данные</h2>
                <p className="mt-1 text-[13.5px] text-secondary">
                  Нужны, чтобы подтвердить заказ и отправить ссылку на оплату.
                </p>
                <div className="mt-5 grid gap-4">
                  <div>
                    <label htmlFor="co-name" className="text-[14px] font-extrabold">Имя</label>
                    <input id="co-name" type="text" value={contact.name} onChange={set("name")} placeholder="Как к вам обращаться" className="field mt-2" autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="co-phone" className="text-[14px] font-extrabold">Телефон</label>
                    <input id="co-phone" type="tel" value={contact.phone} onChange={set("phone")} placeholder="+7 900 000-00-00" className="field mt-2" autoComplete="tel" />
                  </div>
                  <div>
                    <label htmlFor="co-email" className="text-[14px] font-extrabold">Почта <span className="font-normal text-secondary">(необязательно)</span></label>
                    <input id="co-email" type="email" value={contact.email} onChange={set("email")} placeholder="для чека и статуса заказа" className="field mt-2" autoComplete="email" />
                  </div>
                </div>
              </section>
            )}

            {step === 2 && (
              <section aria-label="Способ доставки" className="rounded-3xl border border-line bg-cream p-6">
                <h2 className="font-display text-2xl font-semibold">Доставка</h2>
                <p className="mt-1 text-[13.5px] text-secondary">
                  Отправляем СДЭК в течение 1–2 рабочих дней после оплаты и присылаем трек-номер.
                  Стоимость — ориентировочная, точная рассчитывается при отправке.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {SHOP.delivery.map((d) => {
                    const cost = deliveryCost(d.key, total);
                    return (
                      <OptionCard key={d.key} active={deliveryKey === d.key} onClick={() => setDeliveryKey(d.key)}>
                        <span className="block text-[15px] font-extrabold">{d.label}</span>
                        <span className="mt-1 block text-[13px] text-secondary">{d.note}</span>
                        <span className="mt-2 block text-[17px] font-extrabold text-honeyDark">
                          {cost === 0 ? "Бесплатно" : formatPrice(cost)}
                        </span>
                      </OptionCard>
                    );
                  })}
                </div>
                {deliveryKey === "pickup" && (
                  <p className="mt-4 rounded-xl bg-paper/80 p-3.5 text-[13.5px] leading-relaxed text-ink/90">
                    Самовывоз: {PICKUP_ADDRESS} ({PICKUP_HOURS}). Заказ будет готов после подтверждения менеджером.
                  </p>
                )}
                {delivery.needAddress && (
                  <div className="mt-5">
                    <label htmlFor="co-address" className="text-[14px] font-extrabold">
                      Город и адрес доставки
                    </label>
                    <input
                      id="co-address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Город, улица, дом, квартира"
                      className="field mt-2"
                      autoComplete="street-address"
                    />
                  </div>
                )}
                <p className="mt-4 rounded-xl bg-paper/80 p-3 font-mono text-[11px] leading-relaxed text-secondary">
                  Порог бесплатной доставки СДЭК: от 7 900 ₽ — Центральный, Северо-Западный, Приволжский
                  и Южный ФО; от 10 900 ₽ — Сибирский и Уральский ФО; от 12 900 ₽ — Дальневосточный ФО.
                </p>
              </section>
            )}

            {step === 3 && (
              <section aria-label="Оплата" className="rounded-3xl border border-line bg-cream p-6">
                <h2 className="font-display text-2xl font-semibold">Оплата</h2>
                <p className="mt-1 text-[13.5px] text-secondary">
                  После оформления менеджер подтвердит заказ и пришлёт ссылку на безопасную оплату.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {SHOP.payment.map((p) => (
                    <OptionCard key={p.key} active={paymentKey === p.key} onClick={() => setPaymentKey(p.key)}>
                      <span className="block text-[15px] font-extrabold">{p.label}</span>
                      <span className="mt-1 block text-[12.5px] text-secondary">{p.note}</span>
                    </OptionCard>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-honey/40 bg-honey/10 p-4">
                  <p className="text-[14px] font-extrabold text-honeyDark">Как проходит оплата</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink/90">
                    Заказ получает номер и сохраняется в «Моих заказах». Менеджер подтверждает наличие
                    и присылает ссылку на оплату картой или СБП — без предоплаты до подтверждения.
                  </p>
                </div>
                <label className="mt-4 flex items-start gap-3 rounded-2xl border border-line bg-paper p-4">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-leaf"
                    aria-label="Согласен с договором-офертой и политикой обработки персональных данных"
                  />
                  <span className="text-[13.5px] leading-relaxed text-ink">
                    Я принимаю условия <Link href="/info/offer/" className="font-bold text-leaf underline decoration-leaf/40 underline-offset-2 hover:text-leafDark">договора-оферты</Link>{" "}
                    и даю согласие на обработку персональных данных —{" "}
                    <Link href="/info/privacy-policy/" className="font-bold text-leaf underline decoration-leaf/40 underline-offset-2 hover:text-leafDark">политика</Link>{" "}
                    и <Link href="/info/pd-agree/" className="font-bold text-leaf underline decoration-leaf/40 underline-offset-2 hover:text-leafDark">согласие</Link>.
                  </span>
                </label>
              </section>
            )}

            {error && (
              <p role="alert" className="mt-4 rounded-xl border border-honey/40 bg-honey/10 px-4 py-3 text-[14px] font-bold text-honeyDark">
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  className="rounded-full border border-line bg-cream px-6 py-3 text-[15px] font-bold text-ink/90 transition hover:border-leaf hover:text-leaf"
                >
                  ← Назад
                </button>
              ) : (
                <span />
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={next}
                  className="rounded-full bg-leaf px-8 py-3.5 text-[16px] font-bold text-paper transition hover:bg-leafDark"
                >
                  Далее
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={!agree}
                  className={`rounded-full bg-honey px-8 py-3.5 text-[16px] font-extrabold text-ink shadow-card transition hover:-translate-y-0.5 hover:bg-honeyDark ${!agree ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  Оформить заказ
                </button>
              )}
            </div>
          </div>

          {/* Сводка */}
          <aside className="h-fit rounded-3xl border border-line bg-cream p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-2xl font-semibold">Ваш заказ</h2>
            <ul className="mt-4 space-y-3">
              {lines.map(({ product, qty }) => (
                <li key={product.id} className="flex items-center justify-between gap-3 text-[14px]">
                  <span className="min-w-0">
                    <span className="block truncate font-bold">{product.name}</span>
                    <span className="text-[12px] text-khaki">× {qty}</span>
                  </span>
                  <span className="shrink-0 font-extrabold">{formatPrice(product.price * qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 border-t border-line pt-4 text-[14.5px]">
              <div className="flex justify-between">
                <dt className="text-secondary">Товары ({count})</dt>
                <dd className="font-bold">{formatPrice(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-leaf">
                  <dt>Промокод {promo ? promo.code : ""}</dt>
                  <dd className="font-bold">−{formatPrice(discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-secondary">{delivery ? delivery.label : "Доставка"}</dt>
                <dd className="font-bold">{shipCost === 0 ? "Бесплатно" : formatPrice(shipCost)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3 text-[16px]">
                <dt className="font-extrabold">Итого</dt>
                <dd className="text-xl font-extrabold text-ink">{formatPrice(grandTotal)}</dd>
              </div>
            </dl>
            <a
              href={`${SHOP_TG_URL}?text=${encodeURIComponent("Здравствуйте! Вопрос по заказу.")}`}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-line bg-paper px-5 py-3 text-[14px] font-bold text-ink/90 transition hover:border-leaf hover:text-leaf"
            >
              Написать в Telegram PHYTOTAB
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}