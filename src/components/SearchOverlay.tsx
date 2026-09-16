"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Product } from "@/data/catalog";
import { products, ageRangeOf } from "@/data/catalog";
import { useShop } from "@/store/shop";
import { useMarket } from "@/store/market";

const TRENDING = [
  "linen dress",
  "back to school",
  "romper",
  "overshirt",
  "tulle",
  "stripe tee",
];

/**
 * Local-language synonym index — the search understands the market's
 * language, not just English ("baju anak perempuan", "فساتين أطفال", "子供服").
 */
const SYNONYMS: Record<string, { category?: Product["category"]; kw?: string }> = {
  // Bahasa Indonesia / Melayu
  perempuan: { category: "girls" }, cewek: { category: "girls" }, putri: { category: "girls" },
  "laki-laki": { category: "boys" }, laki: { category: "boys" }, cowok: { category: "boys" }, putra: { category: "boys" },
  bayi: { category: "baby" },
  gaun: { kw: "dress" }, dress: { kw: "dress" }, kemeja: { kw: "shirt" },
  setelan: { kw: "set" }, baju: { kw: "" }, anak: { kw: "" },
  // Arabic
  "فساتين": { kw: "dress" }, "فستان": { kw: "dress" },
  "بنات": { category: "girls" }, "أولاد": { category: "boys" }, "اولاد": { category: "boys" },
  "أطفال": { kw: "" }, "اطفال": { kw: "" }, "رضع": { category: "baby" }, "رضّع": { category: "baby" },
  // Japanese
  "子供服": { kw: "" }, "子供": { kw: "" }, "ドレス": { kw: "dress" }, "ワンピース": { kw: "dress" },
  "女の子": { category: "girls" }, "男の子": { category: "boys" },
  "赤ちゃん": { category: "baby" }, "ベビー": { category: "baby" },
  // Chinese
  "连衣裙": { kw: "dress" }, "女童": { category: "girls" }, "男童": { category: "boys" },
  "婴儿": { category: "baby" }, "童装": { kw: "" },
  // Vietnamese
  "váy": { kw: "dress" }, "đầm": { kw: "dress" },
  "gái": { category: "girls" }, "trai": { category: "boys" },
  "bé": { kw: "" }, "trẻ": { kw: "" }, "sơ": { category: "baby" },
  // English
  girls: { category: "girls" }, girl: { category: "girls" },
  boys: { category: "boys" }, boy: { category: "boys" },
  baby: { category: "baby" }, babies: { category: "baby" },
  kids: { kw: "" }, children: { kw: "" },
};

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useShop();
  const { base, t, fmtPrice, available } = useMarket();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];

    // age intent: "8 years", "umur 8", "8 tahun", "8歳", "8岁"
    const ageMatch = query.match(/(\d{1,2})\s*(?:years?|yrs?|tahun|th|thn|歳|才|岁|سنة|عام)/);
    const age = ageMatch ? parseInt(ageMatch[1], 10) : null;

    const tokens = query.split(/\s+/);
    let cat: Product["category"] | null = null;
    const kws: string[] = [];
    for (const tok of tokens) {
      const syn = SYNONYMS[tok];
      if (syn?.category) cat = syn.category;
      else if (syn && syn.kw) kws.push(syn.kw);
      else if (!syn) kws.push(tok);
    }

    return products
      .filter((p) => available(p)) // market-local inventory only
      .filter((p) => {
        if (cat && p.category !== cat && p.category !== "unisex") return false;
        if (age !== null) {
          const [min, max] = ageRangeOf(p);
          if (age < min - 0.5 || age > max + 0.5) return false;
        }
        if (kws.length === 0 && (cat || age !== null)) return true;
        const hay = `${p.name} ${p.collection} ${p.category} ${p.material}`.toLowerCase();
        return kws.every((k) => !k || hay.includes(k));
      })
      .slice(0, 6);
  }, [q, available]);

  return (
    <div
      className={`overlay-fade fixed inset-0 bg-white z-[90] flex flex-col ${
        searchOpen ? "open" : ""
      }`}
      role="dialog"
      aria-label="Search"
    >
      <div className="max-w-3xl w-full mx-auto px-6 pt-24 md:pt-32">
        <div className="flex items-center border-b border-[#0a0a0a] pb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="shrink-0">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("search.placeholder")}
            className="w-full px-4 text-xl md:text-2xl font-light outline-none placeholder:text-[#b5b5b5] bg-transparent"
          />
          <button
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
            className="label-caps p-2 link-underline"
          >
            {t("search.close")}
          </button>
        </div>

        {!q && (
          <div className="pt-10">
            <p className="label-caps text-muted mb-5">{t("search.trending")}</p>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {TRENDING.map((term) => (
                <button
                  key={term}
                  onClick={() => setQ(term)}
                  className="text-lg font-editorial hover:underline underline-offset-4"
                >
                  {term}
                </button>
              ))}
            </div>
            <p className="text-[12px] text-muted mt-10">{t("search.hint")}</p>
          </div>
        )}

        {q && (
          <div className="pt-8 pb-16 overflow-y-auto">
            {results.length === 0 ? (
              <div className="pt-6">
                <p className="font-editorial text-2xl">
                  {t("search.nothing")} “{q}”.
                </p>
                <Link
                  href={`${base}/kids`}
                  onClick={() => setSearchOpen(false)}
                  className="label-caps link-underline inline-block mt-6"
                >
                  {t("pdp.explore")}
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-[#ececec]">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`${base}/product/${p.id}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-5 py-4 group"
                    >
                      <div className="w-14 aspect-[3/4] bg-cream overflow-hidden shrink-0">
                        <img src={p.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm group-hover:underline underline-offset-4">
                          {p.name}
                        </p>
                        <p className="label-caps !text-[9px] text-muted mt-1">
                          {p.collection}
                        </p>
                      </div>
                      <p className="text-sm">{fmtPrice(p).price}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
