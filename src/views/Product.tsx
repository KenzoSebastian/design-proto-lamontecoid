"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProduct, products } from "@/data/catalog";
import { useShop } from "@/store/shop";
import { useMarket } from "@/store/market";
import ProductCard from "@/components/ProductCard";

export default function Product() {
  const id = String(useParams()?.id ?? "");
  const product = getProduct(id ?? "");
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const { base, market, t, fmt, fmtPrice, available, comingSoon } = useMarket();
  const [size, setSize] = useState<string | null>(null);
  const [colorIdx, setColorIdx] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [openAcc, setOpenAcc] = useState<string | null>("details");

  const related = useMemo(
    () =>
      products
        .filter((p) => available(p))
        .filter((p) => p.id !== product?.id && p.category === product?.category)
        .concat(products.filter((p) => available(p) && p.id !== product?.id))
        .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
        .slice(0, 4),
    [product, available]
  );

  if (!product) {
    return (
      <main className="py-40 text-center px-6">
        <p className="font-editorial text-4xl">{t("pdp.movedOn")}</p>
        <Link href={`${base}/kids/new`} className="label-caps link-underline inline-block mt-8">
          {t("pdp.explore")}
        </Link>
      </main>
    );
  }

  const saved = wishlist.includes(product.id);
  const inMarket = available(product);
  const soon = comingSoon(product);
  const price = fmtPrice(product);

  const handleAdd = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    addToCart({
      productId: product.id,
      size,
      color: product.colors[colorIdx].name,
      qty: 1,
    });
  };

  const ACCORDIONS = [
    { id: "details", title: t("pdp.details"), body: product.story },
    {
      id: "fabric",
      title: t("pdp.fabric"),
      body: `${product.material}. Machine wash cold with like colours, line dry in shade, warm iron if needed. Made to be washed, worn, and passed down.`,
    },
    {
      id: "shipping",
      title: t("pdp.shippingReturns"),
      body: `Complimentary shipping on orders over ${fmt(market.freeShipping)}. ${market.shipping
        .map((s) => `${s.name} — ${s.eta}`)
        .join(" · ")}. Easy 30-day returns — digital return request from your account.`,
    },
  ];

  return (
    <main className="pb-24">
      <div className="grid lg:grid-cols-12">
        {/* gallery — 70% */}
        <div className="lg:col-span-7 bg-cream">
          <div className="lg:sticky lg:top-16">
            <img
              src={product.image}
              alt={product.name}
              className="w-full object-cover"
              fetchPriority="high"
            />
          </div>
        </div>

        {/* commerce panel — 30% */}
        <div className="lg:col-span-5 px-6 md:px-10 lg:pe-16 py-10 lg:py-16">
          <p className="label-caps !text-[10px] text-muted">
            <Link href={base} className="hover:underline">{t("common.home")}</Link>
            <span className="mx-2">/</span>
            <Link href={`${base}/kids/${product.category}`} className="hover:underline">
              {t(`cat.${product.category === "unisex" ? "kids" : product.category}`).toUpperCase()}
            </Link>
          </p>

          <p className="label-caps mt-8">LAMONTE</p>
          <h1 className="font-editorial font-light text-4xl md:text-5xl mt-2 leading-tight">
            {product.name}
          </h1>
          <p className="label-caps !text-[10px] text-muted mt-2">
            {product.collection.toUpperCase()} · {product.ageRange.toUpperCase()}
          </p>

          <p className="text-lg mt-6">
            {price.compareAt && (
              <span className="line-through text-muted me-3">{price.compareAt}</span>
            )}
            <span className={product.isSale ? "accent-orange" : ""}>{price.price}</span>
          </p>

          {/* market availability — revalidated on market switch */}
          {!inMarket ? (
            <div className="mt-10 border border-[#e6e6e6] p-6">
              <p className="font-editorial text-2xl leading-snug">
                {t("pdp.notAvailable", { market: market.name })}
              </p>
              <p className="label-caps !text-[10px] text-muted mt-4">
                {t("pdp.alternatives").toUpperCase()} ↓
              </p>
            </div>
          ) : soon ? (
            <div className="mt-10 border border-[#e6e6e6] p-6">
              <p className="font-editorial text-2xl leading-snug">
                {t("pdp.comingSoon", { market: market.name })}
              </p>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="label-caps link-underline mt-4"
              >
                {saved ? "SAVED ✓" : "NOTIFY ME"}
              </button>
            </div>
          ) : (
            <>
              {/* color */}
              <div className="mt-8">
                <p className="label-caps !text-[10px] text-muted mb-3">
                  {t("pdp.colour")} — {product.colors[colorIdx].name.toUpperCase()}
                </p>
                <div className="flex gap-3">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      title={c.name}
                      onClick={() => setColorIdx(i)}
                      className={`w-9 h-9 border-2 transition-colors ${
                        i === colorIdx ? "border-[#0a0a0a]" : "border-[#d4d4d4]"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* size */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-3">
                  <p className="label-caps !text-[10px] text-muted">
                    {t("pdp.size")}{" "}
                    {sizeError && (
                      <span className="accent-orange normal-case tracking-normal">
                        — {t("pdp.selectSize")}
                      </span>
                    )}
                  </p>
                  <button
                    className="label-caps !text-[10px] link-underline"
                    onClick={() => setGuideOpen(true)}
                  >
                    {t("pdp.sizeGuide")}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSize(s);
                        setSizeError(false);
                      }}
                      className={`w-14 h-14 border text-sm transition-colors ${
                        size === s
                          ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                          : "border-[#d4d4d4] hover:border-[#0a0a0a]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10 flex gap-3">
                <button
                  onClick={handleAdd}
                  className="flex-1 bg-[#0a0a0a] text-white label-caps py-5 hover:bg-[#2a2a2a] transition-colors"
                >
                  {t("pdp.addToBag")}
                </button>
                <button
                  aria-label="Save to wishlist"
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-14 border flex items-center justify-center transition-colors ${
                    saved ? "border-[#0a0a0a] bg-[#0a0a0a]" : "border-[#d4d4d4] hover:border-[#0a0a0a]"
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? "#fff" : "none"} stroke={saved ? "#fff" : "#0a0a0a"} strokeWidth="1.4">
                    <path d="M12 21c-4.8-3.6-9-6.9-9-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4.1-4.2 7.4-9 11z" />
                  </svg>
                </button>
              </div>

              <Link
                href={`${base}/stores`}
                className="label-caps !text-[10px] link-underline mt-5 text-muted inline-block"
              >
                {t("pdp.findInStore")}
              </Link>
            </>
          )}

          {/* accordions */}
          <div className="mt-10 border-t border-[#e6e6e6]">
            {ACCORDIONS.map((a) => (
              <div key={a.id} className="border-b border-[#e6e6e6]">
                <button
                  className="w-full flex justify-between items-center py-5 label-caps"
                  onClick={() => setOpenAcc(openAcc === a.id ? null : a.id)}
                >
                  {a.title}
                  <span className="text-lg font-light">{openAcc === a.id ? "−" : "+"}</span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openAcc === a.id ? "max-h-60 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-[13px] text-muted leading-relaxed">{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* you may also like */}
      <section className="px-6 md:px-10 max-w-[1600px] mx-auto mt-20">
        <h2 className="font-editorial font-light text-3xl md:text-4xl mb-10">
          {t("pdp.youMayLike")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* size guide modal — age & height mapping */}
      <div
        className={`overlay-fade fixed inset-0 bg-black/50 z-[90] flex items-center justify-center p-6 ${guideOpen ? "open" : ""}`}
        onClick={() => setGuideOpen(false)}
      >
        <div
          className="bg-white max-w-lg w-full p-8 max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label="Size guide"
        >
          <div className="flex justify-between items-center mb-6">
            <p className="label-caps">{t("pdp.sizeGuide")} — KIDS</p>
            <button aria-label="Close size guide" onClick={() => setGuideOpen(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="label-caps !text-[10px] text-muted border-b border-[#e6e6e6]">
                <th className="text-start py-3 font-medium">{t("plp.size")}</th>
                <th className="text-start py-3 font-medium">{t("plp.age")}</th>
                <th className="text-start py-3 font-medium">HEIGHT (CM)</th>
                <th className="text-start py-3 font-medium">CHEST (CM)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {[
                ["80", "9–12 m", "74–80", "47–49"],
                ["92", "1–2 y", "86–92", "50–52"],
                ["100", "2–3 y", "92–100", "52–54"],
                ["110", "3–4 y", "100–110", "54–57"],
                ["120", "5–6 y", "110–120", "57–61"],
                ["130", "7–8 y", "120–130", "61–65"],
                ["140", "9–10 y", "130–140", "65–70"],
              ].map((r) => (
                <tr key={r[0]}>
                  {r.map((c, i) => (
                    <td key={i} className={`py-3 ${i === 0 ? "font-medium" : "text-muted"}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[12px] text-muted mt-6 leading-relaxed">
            Between sizes? Lamonte pieces are cut with room to grow — we
            recommend the smaller size for a neater fit, the larger for longer wear.
          </p>
        </div>
      </div>
    </main>
  );
}
