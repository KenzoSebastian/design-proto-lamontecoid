"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Product } from "@/data/catalog";
import { products, inAgeGroup, AGE_GROUPS } from "@/data/catalog";
import { useMarket } from "@/store/market";
import ProductCard from "@/components/ProductCard";

const SIZES = ["68", "74", "80", "86", "92", "100", "110", "120", "130", "140"];
const AGES = ["0–12 months", "1–3 years", "3–6 years", "6–9 years"];
const COLORS = [
  { name: "Cream", hex: "#f0ead9" },
  { name: "Sand", hex: "#d8c7a8" },
  { name: "White", hex: "#f5f3ee" },
  { name: "Olive", hex: "#8a8a6d" },
  { name: "Navy", hex: "#2c3a4d" },
  { name: "Denim", hex: "#a9bfd0" },
];

export default function Category() {
  const pathname = usePathname() ?? "";
  const { base, t, fmt, priceOf, available } = useMarket();

  // strip /{country}/{lang} prefix, then derive the category key
  const rest = pathname.replace(/^\/[a-z]{2}\/[a-z]{2}\/?/, "");
  const seg = rest.split("/").filter(Boolean);
  const key =
    seg[0] === "sale" || seg[0] === "collections"
      ? seg[0]
      : seg[seg.length - 1] || "kids";

  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState("recommended");
  const [cols, setCols] = useState<2 | 3 | 4 | 6>(4);
  const [selSizes, setSelSizes] = useState<string[]>([]);
  const [selAges, setSelAges] = useState<string[]>([]);
  const [selColors, setSelColors] = useState<string[]>([]);

  const inMarket = useMemo(() => products.filter(available), [available]);
  const marketMax = useMemo(
    () => Math.ceil(Math.max(...inMarket.map((p) => priceOf(p).price)) * 1.02),
    [inMarket, priceOf]
  );
  const marketMin = useMemo(
    () => Math.floor(Math.min(...inMarket.map((p) => priceOf(p).price)) * 0.9),
    [inMarket, priceOf]
  );
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const cap = maxPrice ?? marketMax;

  const baseList = useMemo(() => {
    if (key === "sale") return inMarket.filter((p) => p.isSale);
    if (key === "girls" || key === "boys" || key === "baby")
      return inMarket.filter((p) => p.category === key || p.category === "unisex");
    if (key === "little-kids")
      return inMarket.filter((p) => inAgeGroup(p, 1.5, 6));
    const ageGroup = AGE_GROUPS.find((g) => g.key === key);
    if (ageGroup) return inMarket.filter((p) => inAgeGroup(p, ageGroup.min, ageGroup.max));
    if (key === "new") return inMarket.filter((p) => p.label === "NEW");
    if (key === "best-sellers") return inMarket.filter((p) => p.label === "BESTSELLER");
    if (key === "trending")
      return inMarket.filter((p) => p.label === "BESTSELLER" || p.isSale);
    return inMarket;
  }, [key, inMarket]);

  const filtered = useMemo(() => {
    let list: Product[] = baseList.filter(
      (p) =>
        (selSizes.length === 0 || p.sizes.some((s) => selSizes.includes(s))) &&
        (selAges.length === 0 || selAges.includes(p.ageRange)) &&
        (selColors.length === 0 ||
          p.colors.some((c) =>
            selColors.some(
              (sc) =>
                c.name.toLowerCase().includes(sc.toLowerCase()) ||
                sc.toLowerCase().includes(c.name.toLowerCase())
            )
          )) &&
        priceOf(p).price <= cap
    );
    if (sort === "newest")
      list = [...list].sort((a, b) => (b.label === "NEW" ? 1 : 0) - (a.label === "NEW" ? 1 : 0));
    if (sort === "price-asc")
      list = [...list].sort((a, b) => priceOf(a).price - priceOf(b).price);
    if (sort === "price-desc")
      list = [...list].sort((a, b) => priceOf(b).price - priceOf(a).price);
    return list;
  }, [baseList, selSizes, selAges, selColors, cap, sort, priceOf]);

  const toggle = (arr: string[], v: string, set: (x: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const resetFilters = () => {
    setSelSizes([]);
    setSelAges([]);
    setSelColors([]);
    setMaxPrice(null);
  };

  const activeCount =
    selSizes.length + selAges.length + selColors.length + (maxPrice !== null ? 1 : 0);

  const SORTS = [
    { id: "recommended", label: t("plp.sort.recommended") },
    { id: "newest", label: t("plp.sort.newest") },
    { id: "price-asc", label: t("plp.sort.priceAsc") },
    { id: "price-desc", label: t("plp.sort.priceDesc") },
  ];

  return (
    <main className="px-6 md:px-10 max-w-[1600px] mx-auto pb-24">
      {/* breadcrumb + title */}
      <div className="pt-10 pb-8">
        <p className="label-caps !text-[10px] text-muted">
          <Link href={base} className="hover:underline">{t("common.home")}</Link>
          <span className="mx-2">/</span>
          <span>{t(`cat.${key}`).toUpperCase()}</span>
        </p>
        <h1 className="font-editorial font-light text-5xl md:text-6xl mt-4">
          {t(`cat.${key}`)}
        </h1>
        <p className="text-muted mt-3">{t(`cat.${key}.sub`)}</p>
      </div>

      {/* toolbar */}
      <div className="flex items-center justify-between border-y border-[#e6e6e6] py-4 sticky top-16 bg-white z-30">
        <div className="flex items-center gap-6">
          <button
            className="label-caps flex items-center gap-2 link-underline"
            onClick={() => setFilterOpen(true)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            {t("plp.filter")}{activeCount > 0 && ` (${activeCount})`}
          </button>
          <span className="label-caps !text-[10px] text-muted hidden sm:inline">
            {filtered.length} {t("plp.products")}
          </span>
        </div>
        <div className="flex items-center gap-6">
          {/* density switcher — 2 / 3 / 4 / 6 */}
          <div className="hidden md:flex items-center gap-2">
            {([2, 3, 4, 6] as const).map((n) => (
              <button
                key={n}
                aria-label={`${n} columns`}
                onClick={() => setCols(n)}
                className={`hidden gap-[3px] p-1 ${
                  n === 6 ? "xl:flex" : "md:flex"
                } ${cols === n ? "opacity-100" : "opacity-30"}`}
              >
                {Array.from({ length: n }).map((_, i) => (
                  <span key={i} className="w-[3px] h-4 bg-[#0a0a0a]" />
                ))}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="label-caps bg-transparent outline-none cursor-pointer"
            aria-label="Sort products"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* grid */}
      {filtered.length === 0 ? (
        <div className="py-32 text-center">
          <p className="font-editorial text-3xl">{t("plp.noMatch")}</p>
          <button className="label-caps link-underline mt-6" onClick={resetFilters}>
            {t("plp.clearFilters")}
          </button>
        </div>
      ) : (
        <div
          className={`grid gap-x-4 gap-y-10 md:gap-x-6 mt-10 grid-cols-2 ${
            cols === 2
              ? "md:grid-cols-2"
              : cols === 3
                ? "md:grid-cols-3"
                : cols === 4
                  ? "md:grid-cols-4"
                  : "md:grid-cols-4 xl:grid-cols-6"
          }`}
        >
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* filter drawer */}
      <div
        className={`overlay-fade fixed inset-0 bg-black/40 z-[70] ${filterOpen ? "open" : ""}`}
        onClick={() => setFilterOpen(false)}
      />
      <aside
        className={`drawer-left fixed top-0 left-0 h-full w-full max-w-sm bg-white z-[80] flex flex-col ${filterOpen ? "open" : ""}`}
        role="dialog"
        aria-label="Filters"
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#e6e6e6]">
          <p className="label-caps">{t("plp.filter")}</p>
          <button aria-label="Close filters" onClick={() => setFilterOpen(false)} className="p-2 -me-2">
            <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10">
          <div>
            <p className="label-caps text-muted mb-4">{t("plp.age")}</p>
            <div className="space-y-3">
              {AGES.map((a) => (
                <label key={a} className="flex items-center gap-3 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selAges.includes(a)}
                    onChange={() => toggle(selAges, a, setSelAges)}
                    className="w-4 h-4 accent-black"
                  />
                  {a}
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="label-caps text-muted mb-4">{t("plp.size")}</p>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => toggle(selSizes, s, setSelSizes)}
                  className={`w-12 h-12 border text-[13px] transition-colors ${
                    selSizes.includes(s)
                      ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                      : "border-[#d4d4d4] hover:border-[#0a0a0a]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="label-caps text-muted mb-4">{t("plp.color")}</p>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  title={c.name}
                  onClick={() => toggle(selColors, c.name, setSelColors)}
                  className={`w-8 h-8 border-2 transition-colors ${
                    selColors.includes(c.name) ? "border-[#0a0a0a]" : "border-[#d4d4d4]"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="label-caps text-muted mb-4">
              {t("plp.priceUpTo")} — {fmt(cap)}
            </p>
            <input
              type="range"
              min={marketMin}
              max={marketMax}
              step={Math.max(1, Math.round((marketMax - marketMin) / 50))}
              value={cap}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-black"
              aria-label="Maximum price"
            />
          </div>
        </div>
        <div className="border-t border-[#e6e6e6] px-6 py-4 flex gap-3">
          <button className="flex-1 border border-[#0a0a0a] label-caps py-3" onClick={resetFilters}>
            {t("plp.clear")}
          </button>
          <button
            className="flex-1 bg-[#0a0a0a] text-white label-caps py-3"
            onClick={() => setFilterOpen(false)}
          >
            {t("plp.view")} {filtered.length}
          </button>
        </div>
      </aside>
    </main>
  );
}
