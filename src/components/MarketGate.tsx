"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getMarket } from "@/data/markets";
import type { LangCode, MarketCode } from "@/data/markets";
import { useMarket } from "@/store/market";

/**
 * Validates the /{country}/{lang} URL segment and syncs it into the market
 * store. Invalid combinations fall back to the market's default language,
 * unknown markets go back to the global gateway.
 */
export default function MarketGate({ children }: { children: React.ReactNode }) {
  const params = useParams<{ country: string; lang: string }>() ?? {
    country: "",
    lang: "",
  };
  const router = useRouter();
  const { market, lang: currentLang, setMarketLang } = useMarket();

  const m = getMarket(params.country ?? "");
  const langValid = m?.languages.some((l) => l.code === params.lang);

  useEffect(() => {
    if (!m) {
      router.replace("/");
      return;
    }
    if (!langValid) {
      router.replace(`/${m.code}/${m.defaultLang}/`);
      return;
    }
    if (m.code !== market.code || params.lang !== currentLang) {
      setMarketLang(m.code as MarketCode, params.lang as LangCode);
    }
  }, [m, langValid, params.lang, market.code, currentLang, setMarketLang, router]);

  if (!m || !langValid) return null;

  return <>{children}</>;
}
