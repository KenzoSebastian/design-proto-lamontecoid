"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MARKETS } from "@/data/markets";
import { savedMarketPreference } from "@/store/market";

/**
 * Corporate Global Network — markets, partners, distribution, business
 * opportunities. Deliberately separate from the retail country selector.
 */
export default function GlobalNetwork() {
  const [saved, setSaved] = useState<{ market: string; lang: string } | null>(null);
  useEffect(() => {
    setSaved(savedMarketPreference());
  }, []);
  const shopLink = saved ? `/${saved.market}/${saved.lang}` : "/";

  return (
    <main className="bg-white text-[#0a0a0a]">
      <div className="flex items-center justify-between px-6 md:px-10 h-16 border-b border-[#e6e6e6]">
        <Link  href="/" aria-label="LAMONTE home">
          <img src="/logo-dark.png" alt="LAMONTE" className="h-5 select-none" draggable={false} />
        </Link>
        <Link href={shopLink} className="label-caps !text-[10px] link-underline">
          SHOP LAMONTE →
        </Link>
      </div>

      <section className="px-6 md:px-10 pt-20 md:pt-32 pb-16 max-w-6xl mx-auto">
        <p className="label-caps-lg text-muted tracking-[0.4em]">LAMONTE GLOBAL NETWORK</p>
        <h1 className="font-editorial font-light text-5xl md:text-7xl leading-[0.98] mt-6 max-w-4xl">
          One brand. <em>Many markets.</em>
        </h1>
        <p className="text-muted mt-8 max-w-2xl leading-relaxed">
          Lamonte operates as a single global fashion ecosystem — one product
          master, one design language, one standard of quality — delivered
          through local markets with local pricing, local inventory, local
          payments and local service.
        </p>
      </section>

      {/* stats */}
      <section className="border-y border-[#e6e6e6]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#e6e6e6]">
          {[
            [String(MARKETS.length), "MARKETS"],
            ["6", "LANGUAGES"],
            ["13", "CURRENCIES"],
            ["1", "GLOBAL PRODUCT MASTER"],
          ].map(([n, l]) => (
            <div key={l} className="py-10 md:py-14 px-6 text-center">
              <p className="font-editorial font-light text-5xl md:text-6xl">{n}</p>
              <p className="label-caps !text-[10px] text-muted mt-3">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* markets */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-20">
        <p className="label-caps text-muted mb-8">GLOBAL MARKETS</p>
        <ul className="divide-y divide-[#ececec] border-t border-[#ececec]">
          {MARKETS.map((m) => (
            <li key={m.code} className="py-5 flex flex-wrap items-baseline gap-x-8 gap-y-2">
              <span className="text-xl font-light w-56">{m.name}</span>
              <span className="label-caps !text-[10px] text-muted w-24">{m.currency}</span>
              <span className="text-[13px] text-muted flex-1">
                {m.languages.map((l) => l.label).join(" · ")}
              </span>
              <span
                className={`label-caps !text-[9px] px-2 py-1 ${
                  m.status === "LIVE" ? "bg-[#0a0a0a] text-white" : "border border-[#d4d4d4] text-muted"
                }`}
              >
                {m.status}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* opportunities */}
      <section className="bg-[#0a0a0a] text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-3 gap-12">
          {[
            {
              t: "PARTNERS",
              d: "Distributors, agents and resellers grow Lamonte in their market with role-based price lists and dedicated support.",
            },
            {
              t: "DISTRIBUTION",
              d: "A global inventory engine — product, market, warehouse, store — keeps local stock honest and delivery promises real.",
            },
            {
              t: "BUSINESS OPPORTUNITIES",
              d: "Affiliate, corporate and government procurement programs run on the same global ecosystem, powered by LMI Indonesia.",
            },
          ].map((c) => (
            <div key={c.t}>
              <p className="label-caps text-[#9a9a9a] mb-5">{c.t}</p>
              <p className="text-[#d4d4d4] text-[15px] leading-relaxed">{c.d}</p>
            </div>
          ))}
          <div className="md:col-span-3 pt-6">
            <Link
              href={saved ? `/${saved.market}/${saved.lang}/business` : "/id/en/business"}
              className="inline-block bg-white text-[#0a0a0a] label-caps px-10 py-4 hover:bg-[#e8e8e8] transition-colors"
            >
              BECOME A PARTNER
            </Link>
          </div>
        </div>
      </section>

      <div className="px-6 md:px-10 py-6 flex justify-between label-caps !text-[9px] text-muted">
        <span>© 2026 LAMONTE</span>
        <span>FASHION WITHOUT BORDERS</span>
      </div>
    </main>
  );
}
