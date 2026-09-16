"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProduct, products } from "@/data/catalog";
import { useShop } from "@/store/shop";
import { useMarket } from "@/store/market";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeItem, cartTotal } = useShop();
  const { base, market, t, fmt, available } = useMarket();
  const router = useRouter();

  const suggestions = products
    .filter((p) => available(p) && !cart.some((c) => c.productId === p.id))
    .slice(0, 3);

  return (
    <>
      <div
        className={`overlay-fade fixed inset-0 bg-black/40 z-[70] ${cartOpen ? "open" : ""}`}
        onClick={() => setCartOpen(false)}
      />
      <aside
        className={`drawer-right fixed top-0 right-0 h-full w-full max-w-md bg-white z-[80] flex flex-col ${
          cartOpen ? "open" : ""
        }`}
        aria-hidden={!cartOpen}
        role="dialog"
        aria-label="Shopping bag"
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#e6e6e6]">
          <p className="label-caps">{t("cart.title")} ({cart.length})</p>
          <button aria-label="Close bag" onClick={() => setCartOpen(false)} className="p-2 -me-2">
            <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {cart.length === 0 ? (
            <div className="pt-20 text-center">
              <p className="font-editorial text-2xl">{t("cart.empty")}</p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  router.push(`${base}/kids/new`);
                }}
                className="label-caps link-underline mt-6 inline-block"
              >
                {t("cart.discover")}
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-[#ececec]">
              {cart.map((item, i) => {
                const p = getProduct(item.productId);
                if (!p) return null;
                const inMarket = available(p);
                return (
                  <li key={i} className={`flex gap-4 py-5 ${inMarket ? "" : "opacity-60"}`}>
                    <Link
                      href={`${base}/product/${p.id}`}
                      onClick={() => setCartOpen(false)}
                      className="w-20 aspect-[3/4] bg-cream overflow-hidden shrink-0"
                    >
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] leading-snug">{p.name}</p>
                      <p className="text-[12px] text-muted mt-1">
                        {item.color} · {t("pdp.size")} {item.size}
                      </p>
                      {inMarket ? (
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-[#d4d4d4]">
                            <button
                              aria-label="Decrease quantity"
                              className="w-7 h-7 text-sm"
                              onClick={() => updateQty(i, item.qty - 1)}
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-[13px]">{item.qty}</span>
                            <button
                              aria-label="Increase quantity"
                              className="w-7 h-7 text-sm"
                              onClick={() => updateQty(i, item.qty + 1)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="text-[11px] text-muted underline underline-offset-2"
                            onClick={() => removeItem(i)}
                          >
                            {t("cart.remove")}
                          </button>
                        </div>
                      ) : (
                        <button
                          className="text-[11px] accent-orange underline underline-offset-2 mt-3"
                          onClick={() => removeItem(i)}
                        >
                          {t("cart.notAvailable", { market: market.name })} — {t("cart.remove")}
                        </button>
                      )}
                    </div>
                    {inMarket && (
                      <p className="text-[13px] whitespace-nowrap">
                        <PriceLine productId={p.id} qty={item.qty} />
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          {cart.length > 0 && (
            <div className="pt-8 pb-6">
              <p className="label-caps text-muted mb-4">{t("cart.youMayLike")}</p>
              <div className="grid grid-cols-3 gap-3">
                {suggestions.map((p) => (
                  <Link
                    key={p.id}
                    href={`${base}/product/${p.id}`}
                    onClick={() => setCartOpen(false)}
                    className="group"
                  >
                    <div className="aspect-[3/4] bg-cream overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover img-zoom" />
                    </div>
                    <p className="text-[11px] mt-2 leading-snug">{p.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-[#e6e6e6] px-6 py-5 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="label-caps">{t("cart.subtotal")}</span>
              <span>{fmt(cartTotal)}</span>
            </div>
            <p className="text-[11px] text-muted">{t("cart.shippingNote")}</p>
            <button
              onClick={() => {
                setCartOpen(false);
                router.push(`${base}/checkout`);
              }}
              className="w-full bg-[#0a0a0a] text-white label-caps py-4 hover:bg-[#2a2a2a] transition-colors"
            >
              {t("cart.checkout")}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

import { priceFor } from "@/data/prices";

function PriceLine({ productId, qty }: { productId: string; qty: number }) {
  const { market, fmt } = useMarket();
  const p = getProduct(productId);
  if (!p) return null;
  const unit = priceFor(market.code, productId)?.price ?? p.price;
  return <>{fmt(unit * qty)}</>;
}
