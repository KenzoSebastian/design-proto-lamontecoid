"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProduct, isAvailableIn } from "@/data/catalog";
import { priceFor } from "@/data/prices";
import { MARKETS, getMarket } from "@/data/markets";
import { useShop } from "@/store/shop";
import { useMarket } from "@/store/market";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useShop();
  const { base, market, t, fmt } = useMarket();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [shipIdx, setShipIdx] = useState(0);
  const [addressMarket, setAddressMarket] = useState(market.code);

  const STEPS = [t("ck.contact"), t("ck.delivery"), t("ck.payment"), t("ck.confirmation")];

  const linePrice = (productId: string) => {
    const p = getProduct(productId);
    if (!p) return 0;
    return priceFor(market.code, productId)?.price ?? p.price;
  };

  if (done) {
    return (
      <main className="py-32 text-center px-6 max-w-xl mx-auto">
        <p className="label-caps text-muted">ORDER LMT-2026-00847 · {market.name.toUpperCase()}</p>
        <h1 className="font-editorial font-light text-5xl mt-6">{t("ck.thankYou")}</h1>
        <p className="text-muted mt-6 leading-relaxed">{t("ck.orderNote")}</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`${base}/kids/new`} className="bg-[#0a0a0a] text-white label-caps px-10 py-4">
            {t("ck.continueShopping")}
          </Link>
          <Link href={`${base}/account`} className="border border-[#0a0a0a] label-caps px-10 py-4">
            {t("nav.account")}
          </Link>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="py-40 text-center px-6">
        <p className="font-editorial text-4xl">{t("cart.empty")}</p>
        <Link href={`${base}/kids/new`} className="label-caps link-underline inline-block mt-8">
          {t("cart.discover")}
        </Link>
      </main>
    );
  }

  const method = market.shipping[shipIdx] ?? market.shipping[0];
  const shipping = cartTotal >= market.freeShipping ? 0 : method.price;
  const detected = addressMarket !== market.code ? getMarket(addressMarket) : null;

  return (
    <main className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-16">
      {/* steps */}
      <div className="flex items-center gap-4 md:gap-8 justify-center mb-14 flex-wrap">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-4 md:gap-8">
            <span
              className={`label-caps !text-[10px] ${
                i === step ? "" : i < step ? "text-muted line-through" : "text-[#c4c4c4]"
              }`}
            >
              {i + 1}. {s}
            </span>
            {i < STEPS.length - 1 && <span className="w-6 h-px bg-[#d4d4d4]" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-12">
        {/* form */}
        <div className="lg:col-span-3">
          {step === 0 && (
            <section>
              <h1 className="font-editorial font-light text-4xl mb-8">{t("ck.contact")}</h1>
              <div className="space-y-5">
                <Field label="EMAIL" type="email" placeholder="you@example.com" />
                <Field label="PHONE / WHATSAPP" type="tel" placeholder="+62" />
                <label className="flex items-center gap-3 text-sm text-muted pt-2">
                  <input type="checkbox" className="w-4 h-4 accent-black" defaultChecked />
                  Keep me updated on new collections
                </label>
              </div>
            </section>
          )}
          {step === 1 && (
            <section>
              <h1 className="font-editorial font-light text-4xl mb-8">{t("ck.delivery")}</h1>
              <div className="grid grid-cols-2 gap-5">
                <Field label="FIRST NAME" placeholder="Adiva" />
                <Field label="LAST NAME" placeholder="Putri" />
                <div className="col-span-2">
                  <Field label="ADDRESS" placeholder="Street, number" />
                </div>
                <Field label="CITY" placeholder="Jakarta" />
                <Field label="POSTAL CODE" placeholder="12190" />
                {/* market validation — delivery country must match the shopping market */}
                <label className="block col-span-2">
                  <span className="label-caps !text-[10px] text-muted">{t("ck.country")}</span>
                  <select
                    value={addressMarket}
                    onChange={(e) => setAddressMarket(e.target.value as never)}
                    className="w-full mt-2 border border-[#d4d4d4] focus:border-[#0a0a0a] outline-none px-4 py-3 text-sm bg-white transition-colors"
                  >
                    {MARKETS.map((m) => (
                      <option key={m.code} value={m.code}>{m.name}</option>
                    ))}
                  </select>
                </label>
              </div>

              {detected && (
                <div className="mt-6 border border-[#0a0a0a] p-5">
                  <p className="text-sm leading-relaxed">
                    {t("ck.switchPrompt", { detected: detected.name })}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <button
                      className="label-caps bg-[#0a0a0a] text-white px-6 py-3"
                      onClick={() =>
                        router.push(`/${detected.code}/${detected.defaultLang}/checkout`)
                      }
                    >
                      {t("ck.switchYes", { detected: detected.name.toUpperCase() })}
                    </button>
                    <button
                      className="label-caps link-underline"
                      onClick={() => setAddressMarket(market.code)}
                    >
                      {t("ck.stayHere", { market: market.name })}
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-8 space-y-3">
                <p className="label-caps text-muted">{t("ck.shippingMethod")}</p>
                {market.shipping.map((m, i) => (
                  <label
                    key={m.id}
                    className="flex justify-between items-center border border-[#d4d4d4] px-5 py-4 cursor-pointer has-[:checked]:border-[#0a0a0a]"
                  >
                    <span className="flex items-center gap-3 text-sm">
                      <input
                        type="radio"
                        name="ship"
                        checked={shipIdx === i}
                        onChange={() => setShipIdx(i)}
                        className="accent-black"
                      />
                      {m.name} — {m.eta}
                    </span>
                    <span className="text-sm">
                      {cartTotal >= market.freeShipping
                        ? t("ck.free")
                        : m.price === 0
                          ? t("ck.free")
                          : fmt(m.price)}
                    </span>
                  </label>
                ))}
                <p className="text-[12px] text-muted">
                  {t("common.freeShipping", { amount: fmt(market.freeShipping) })}
                </p>
              </div>
            </section>
          )}
          {step === 2 && (
            <section>
              <h1 className="font-editorial font-light text-4xl mb-8">{t("ck.payment")}</h1>
              <div className="space-y-3">
                {market.payments.map((m, i) => (
                  <label
                    key={m}
                    className="flex items-center gap-3 border border-[#d4d4d4] px-5 py-4 cursor-pointer has-[:checked]:border-[#0a0a0a] text-sm"
                  >
                    <input type="radio" name="pay" defaultChecked={i === 0} className="accent-black" />
                    {m}
                  </label>
                ))}
              </div>
              <p className="text-[12px] text-muted mt-6 leading-relaxed">
                Payments are processed securely in {market.currency}. Stock is
                reserved for 15 minutes while you complete payment.
              </p>
            </section>
          )}
          {step === 3 && (
            <section>
              <h1 className="font-editorial font-light text-4xl mb-8">{t("ck.confirmation")}</h1>
              <ul className="divide-y divide-[#ececec] border-y border-[#ececec]">
                {cart.map((item, i) => {
                  const p = getProduct(item.productId)!;
                  return (
                    <li key={i} className="flex justify-between py-4 text-sm">
                      <span>
                        {p.name} — {item.color}, {t("pdp.size").toLowerCase()} {item.size} × {item.qty}
                      </span>
                      <span>{fmt(linePrice(item.productId) * item.qty)}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <div className="flex gap-4 mt-12">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="border border-[#0a0a0a] label-caps px-10 py-4"
              >
                {t("ck.back")}
              </button>
            )}
            <button
              onClick={() => {
                if (step < 3) setStep(step + 1);
                else {
                  setDone(true);
                  clearCart();
                }
              }}
              className="flex-1 bg-[#0a0a0a] text-white label-caps px-10 py-4 hover:bg-[#2a2a2a] transition-colors"
            >
              {step === 3 ? t("ck.placeOrder") : t("ck.continue")}
            </button>
          </div>
        </div>

        {/* summary */}
        <aside className="lg:col-span-2 bg-cream p-8 h-fit">
          <p className="label-caps text-muted mb-6">{t("ck.orderSummary")}</p>
          <ul className="space-y-4">
            {cart.map((item, i) => {
              const p = getProduct(item.productId)!;
              const inMarket = isAvailableIn(p, market.code);
              return (
                <li key={i} className="flex gap-3">
                  <div className="w-14 aspect-[3/4] bg-white overflow-hidden shrink-0">
                    <img src={p.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-[12px] flex-1">
                    <p>{p.name}</p>
                    <p className="text-muted mt-1">
                      {item.size} × {item.qty}
                    </p>
                    {!inMarket && (
                      <p className="accent-orange mt-1">
                        {t("cart.notAvailable", { market: market.name })}
                      </p>
                    )}
                  </div>
                  <p className="text-[12px]">{fmt(linePrice(item.productId) * item.qty)}</p>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-[#dcdad4] mt-6 pt-4 space-y-2 text-[13px]">
            <div className="flex justify-between">
              <span className="text-muted">{t("ck.subtotal")}</span>
              <span>{fmt(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">{t("ck.shipping")}</span>
              <span>{shipping === 0 ? t("ck.free") : fmt(shipping)}</span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t border-[#dcdad4]">
              <span className="label-caps">{t("ck.total")}</span>
              <span>{fmt(cartTotal + shipping)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="label-caps !text-[10px] text-muted">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full mt-2 border border-[#d4d4d4] focus:border-[#0a0a0a] outline-none px-4 py-3 text-sm transition-colors"
      />
    </label>
  );
}
