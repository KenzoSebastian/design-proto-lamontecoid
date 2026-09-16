"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { detectMarketFromBrowser, getMarket } from "@/data/markets";
import { useMarket } from "@/store/market";

const DISMISS_KEY = "lamonte.geo.dismissed";

/**
 * "Shop where you are" — a discreet travel-mode suggestion.
 * Never a forced redirect; appears once per session, only when the browser
 * region meaningfully differs from the chosen market.
 */
export default function GeoBanner() {
  const { market, t } = useMarket();
  const [detected, setDetected] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname() ?? "";

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY)) return;
    } catch {
      /* ignore */
    }
    const d = detectMarketFromBrowser();
    if (d && d !== market.code) setDetected(d);
  }, [market.code]);

  if (!detected) return null;
  const dm = getMarket(detected)!;

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setDetected(null);
  };

  const subpath = pathname.replace(/^\/[a-z]{2}\/[a-z]{2}/, "") || "/";

  return (
    <div className="fixed bottom-0 inset-x-0 z-[65] bg-[#0a0a0a] text-white px-5 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-center">
      <p className="text-[13px]">
        {t("geo.noticed", { market: dm.name })}{" "}
        <span className="text-[#b5b5b5]">{t("geo.browse", { market: dm.name })}</span>
      </p>
      <div className="flex items-center gap-6">
        <button
          className="label-caps !text-[10px] bg-white text-[#0a0a0a] px-5 py-2.5 hover:bg-[#e8e8e8] transition-colors"
          onClick={() => {
            dismiss();
            router.push(`/${dm.code}/${dm.defaultLang}${subpath === "/" ? "" : subpath}`);
          }}
        >
          {t("geo.yes")}
        </button>
        <button
          className="label-caps !text-[10px] link-underline"
          onClick={dismiss}
        >
          {t("geo.stay", { market: market.name.toUpperCase() })}
        </button>
      </div>
    </div>
  );
}
