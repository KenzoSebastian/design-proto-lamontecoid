"use client";

import type { LangCode, MarketCode } from "@/data/markets";
import { detectMarketFromBrowser, getMarket } from "@/data/markets";
import { savedMarketPreference, useMarket } from "@/store/market";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Global entry — the market selector.
 * One calm form: country/region (which sets currency, catalogue, pricing,
 * stock and delivery) plus language. A saved preference or the browser
 * region pre-selects the form — never a forced redirect.
 */
export default function Gateway() {
  const router = useRouter();

  const [marketCode, setMarketCode] = useState<MarketCode>("id");
  const [lang, setLang] = useState<LangCode>("id");
  const [suggested, setSuggested] = useState<string | null>(null);

  // Pre-select after mount (SSR-safe): saved preference wins, otherwise the
  // detected browser region becomes a gentle suggestion.
  useEffect(() => {
    const saved = savedMarketPreference();
    if (saved) {
      setMarketCode(saved.market);
      setLang(saved.lang);
      return;
    }
    const d = detectMarketFromBrowser();
    if (d) {
      const m = getMarket(d);
      if (m) {
        setMarketCode(m.code);
        setLang(m.defaultLang);
        setSuggested(m.name);
      }
    }
  }, []);

  // redirect to main page
  useEffect(() => {
    if (savedMarketPreference()) {
      router.push(`/${marketCode}/${lang}/`);
    }
  }, [marketCode, lang, router]);

  // const market = getMarket(marketCode)!;

  // const onMarketChange = (code: MarketCode) => {
  //   const m = getMarket(code)!;
  //   setMarketCode(code);
  //   setSuggested(null); // manual choice replaces the location suggestion
  //   if (!m.languages.some((l) => l.code === lang)) setLang(m.defaultLang);
  // };

  // const submit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setMarketLang(marketCode, lang);
  //   router.push(`/${marketCode}/${lang}/`);
  // };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex justify-center items-center flex-col">
      <h1>LAMONTE</h1>
      <p className="text-[#b5b5b5]">Loading...</p>
      {/* top bar */}
      {/* <div className="flex items-center justify-between px-6 md:px-10 h-16">
        <img src="/logo-light.png" alt="LAMONTE" className="h-5 select-none" draggable={false} />
        <Link href="/globalnetwork/" className="label-caps !text-[10px] text-[#9a9a9a] link-underline">
          {t("gateway.network")}
        </Link>
      </div> */}

      {/* selector */}
      {/* <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <p className="label-caps-lg text-[#9a9a9a] tracking-[0.4em] text-center">{t("gateway.kicker")}</p>
          <h1 className="font-editorial font-light text-5xl md:text-6xl leading-[0.98] mt-6 text-center">
            {t("gateway.title")}
          </h1>
          <p className="text-[#b5b5b5] mt-5 leading-relaxed text-center text-[15px]">{t("gateway.sub")}</p>

          <form onSubmit={submit} className="mt-12 space-y-7"> */}
            {/* country / region — sets currency */}
            {/* <label className="block">
              <span className="label-caps !text-[10px] text-[#8a8a8a]">{t("gateway.country")}</span>
              <span className="relative block mt-2.5">
                <select
                  value={marketCode}
                  onChange={(e) => onMarketChange(e.target.value as MarketCode)}
                  className="w-full appearance-none bg-[#0a0a0a] border border-[#3a3a3a] focus:border-white outline-none px-5 py-4 text-[15px] text-white transition-colors cursor-pointer"
                >
                  {REGIONS.map((r) => (
                    <optgroup
                      key={r.name}
                      label={r.name.toUpperCase()}
                      className="bg-[#0a0a0a] text-[#8a8a8a]"
                    >
                      {r.markets.map((code) => {
                        const m = getMarket(code)!;
                        return (
                          <option key={code} value={code} className="bg-[#0a0a0a] text-white">
                            {m.name} — {m.currency}
                            {m.status === "PREVIEW" ? " · PREVIEW" : ""}
                          </option>
                        );
                      })}
                    </optgroup>
                  ))}
                </select>
                <svg
                  className="absolute end-5 top-1/2 -translate-y-1/2 pointer-events-none"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </label> */}

            {/* language */}
            {/* <label className="block">
              <span className="label-caps !text-[10px] text-[#8a8a8a]">{t("gateway.language")}</span>
              <span className="relative block mt-2.5">
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value as LangCode)}
                  className="w-full appearance-none bg-[#0a0a0a] border border-[#3a3a3a] focus:border-white outline-none px-5 py-4 text-[15px] text-white transition-colors cursor-pointer"
                >
                  {market.languages.map((l) => (
                    <option key={l.code} value={l.code} className="bg-[#0a0a0a] text-white">
                      {l.label}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute end-5 top-1/2 -translate-y-1/2 pointer-events-none"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </label>

            <p className="text-[12px] text-[#6a6a6a] leading-relaxed">
              {suggested ? t("gateway.suggested", { market: suggested }) : t("gateway.localized")}
            </p>

            <button
              type="submit"
              className="w-full bg-white text-[#0a0a0a] label-caps px-10 py-4 hover:bg-[#e8e8e8] transition-colors"
            >
              {t("gateway.continue")} →
            </button>
          </form>
        </div>
      </div> */}

      {/* bottom strip */}
      {/* <div className="border-t border-[#222] px-6 md:px-10 py-5 flex flex-col md:flex-row justify-between gap-3">
        <p className="label-caps !text-[9px] text-[#6a6a6a]">
          ONE GLOBAL BRAND · MANY MARKETS · ONE COMMERCE ECOSYSTEM
        </p>
        <p className="label-caps !text-[9px] text-[#6a6a6a]">{MARKETS.length} MARKETS · © 2026 LAMONTE</p>
      </div> */}
    </main>
  );
}
