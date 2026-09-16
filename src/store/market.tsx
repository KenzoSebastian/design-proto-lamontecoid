"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { LangCode, Market, MarketCode } from "@/data/markets";
import { getMarket } from "@/data/markets";
import { translate } from "@/i18n/dict";
import { priceFor } from "@/data/prices";
import type { Product } from "@/data/catalog";
import { isAvailableIn, isComingSoonIn } from "@/data/catalog";

const STORAGE_KEY = "lamonte.market";

interface MarketState {
  market: Market;
  lang: LangCode;
  base: string;
  isRTL: boolean;
  setMarketLang: (market: MarketCode, lang?: LangCode) => void;
  t: (key: string, vars?: Record<string, string>) => string;
  fmt: (n: number) => string;
  priceOf: (p: Product) => { price: number; compareAt?: number };
  fmtPrice: (p: Product) => { price: string; compareAt?: string };
  available: (p: Product) => boolean;
  comingSoon: (p: Product) => boolean;
}

const Ctx = createContext<MarketState | null>(null);

function loadSaved(): { market: MarketCode; lang: LangCode } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      const m = getMarket(s.market);
      if (m && m.languages.some((l) => l.code === s.lang))
        return { market: m.code, lang: s.lang };
      if (m) return { market: m.code, lang: m.defaultLang };
    }
  } catch {
    /* ignore */
  }
  return { market: "id", lang: "id" };
}

export function savedMarketPreference(): { market: MarketCode; lang: LangCode } | null {
  try {
    return localStorage.getItem(STORAGE_KEY) ? loadSaved() : null;
  } catch {
    return null;
  }
}

export function MarketProvider({ children }: { children: React.ReactNode }) {
  // Deterministic default so prerendered HTML and first client render match;
  // the MarketGate syncs the real market from the URL after hydration, and
  // the gateway reads savedMarketPreference() itself.
  const [state, setState] = useState<{ market: MarketCode; lang: LangCode }>({
    market: "id",
    lang: "id",
  });

  const market = getMarket(state.market) ?? getMarket("id")!;
  const lang: LangCode = market.languages.some((l) => l.code === state.lang)
    ? state.lang
    : market.defaultLang;
  const isRTL = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = `${lang}-${market.code.toUpperCase()}`;
  }, [isRTL, lang, market.code]);

  const setMarketLang = useCallback((code: MarketCode, l?: LangCode) => {
    const m = getMarket(code);
    if (!m) return;
    const next = {
      market: code,
      lang: l && m.languages.some((x) => x.code === l) ? l : m.defaultLang,
    };
    setState(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string>) => translate(lang, key, vars),
    [lang]
  );

  const fmt = useCallback(
    (n: number) =>
      new Intl.NumberFormat(market.locale, {
        style: "currency",
        currency: market.currency,
        maximumFractionDigits: ["IDR", "JPY", "VND", "BDT"].includes(market.currency)
          ? 0
          : 2,
      }).format(n),
    [market]
  );

  const priceOf = useCallback(
    (p: Product) => {
      const mp = priceFor(market.code, p.id);
      return { price: mp?.price ?? p.price, compareAt: mp?.compareAt ?? p.compareAt };
    },
    [market]
  );

  const fmtPrice = useCallback(
    (p: Product) => {
      const { price, compareAt } = priceOf(p);
      return { price: fmt(price), compareAt: compareAt ? fmt(compareAt) : undefined };
    },
    [priceOf, fmt]
  );

  const available = useCallback((p: Product) => isAvailableIn(p, market.code), [market]);
  const comingSoon = useCallback((p: Product) => isComingSoonIn(p, market.code), [market]);

  const value = useMemo<MarketState>(
    () => ({
      market,
      lang,
      base: `/${market.code}/${lang}`,
      isRTL,
      setMarketLang,
      t,
      fmt,
      priceOf,
      fmtPrice,
      available,
      comingSoon,
    }),
    [market, lang, isRTL, setMarketLang, t, fmt, priceOf, fmtPrice, available, comingSoon]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useMarket() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useMarket must be used within MarketProvider");
  return ctx;
}
