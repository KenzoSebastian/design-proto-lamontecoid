"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { MARKETS, REGIONS, getMarket } from "@/data/markets";
import { useMarket } from "@/store/market";
import Logo from "./Logo";

export default function Footer() {
  const { base, market, lang, t } = useMarket();
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname() ?? "";

  const COLS = [
    {
      title: t("footer.shop"),
      links: [
        { label: t("nav.new"), to: `${base}/kids/new` },
        { label: t("home.girls"), to: `${base}/kids/girls` },
        { label: t("home.boys"), to: `${base}/kids/boys` },
        { label: t("home.baby"), to: `${base}/kids/baby` },
        { label: t("nav.collections"), to: `${base}/collections` },
        { label: t("nav.sale"), to: `${base}/sale` },
      ],
    },
    {
      title: t("footer.help"),
      links: [
        { label: t("nav.stores"), to: `${base}/stores` },
        { label: "Contact", to: `${base}/account` },
        { label: "Shipping", to: `${base}/account` },
        { label: "Returns", to: `${base}/account` },
        { label: "Track Order", to: `${base}/account` },
      ],
    },
    {
      title: t("footer.business"),
      links: [
        { label: "Wholesale", to: `${base}/business` },
        { label: "Become a Reseller", to: `${base}/business` },
        { label: "Become a Distributor", to: `${base}/business` },
        { label: "Affiliate Program", to: `${base}/business` },
        { label: "Corporate Orders", to: `${base}/business` },
        { label: "Government Procurement", to: `${base}/business` },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: "About Lamonte", to: `${base}/stories` },
        { label: t("nav.stories"), to: `${base}/stories` },
        { label: "Responsibility", to: `${base}/stories` },
        { label: "Careers", to: `${base}/business` },
        { label: "Global Network", to: `/globalnetwork` },
      ],
    },
  ];

  // Market switch keeps the customer on the equivalent page where possible;
  // the destination market then revalidates catalog, price, stock.
  const subpath = pathname.replace(/^\/[a-z]{2}\/[a-z]{2}/, "") || "";

  const switchMarket = (code: string) => {
    const m = getMarket(code)!;
    const keepLang = m.languages.some((l) => l.code === lang) ? lang : m.defaultLang;
    setSwitcherOpen(false);
    router.push(`/${code}/${keepLang}${subpath}`);
  };

  const switchLang = (code: string) => {
    router.push(`/${market.code}/${code}${subpath}`);
  };

  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <Logo light className="h-8" />
            <p className="font-editorial text-xl text-[#b5b5b5] mt-6 max-w-xs leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="mt-10 space-y-3">
              <p className="label-caps text-[#8a8a8a]">{t("footer.newsletter")}</p>
              <form
                className="flex border-b border-[#3a3a3a] max-w-xs"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  required
                  placeholder={t("footer.email")}
                  className="bg-transparent flex-1 py-2 text-sm outline-none placeholder:text-[#6a6a6a]"
                />
                <button className="label-caps ps-4 link-underline">{t("footer.join")}</button>
              </form>
            </div>
          </div>
          {COLS.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <p className="label-caps text-[#8a8a8a] mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.to}
                      className="text-[13px] text-[#d4d4d4] hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* market + language switcher */}
        <div className="mt-16 pt-8 border-t border-[#2a2a2a] grid md:grid-cols-2 gap-10">
          <div>
            <p className="label-caps !text-[10px] text-[#8a8a8a] mb-4">{t("footer.market")}</p>
            <button
              onClick={() => setSwitcherOpen(!switcherOpen)}
              className="label-caps flex items-center gap-3 border border-[#3a3a3a] px-5 py-3 hover:border-white transition-colors"
            >
              {market.name.toUpperCase()} · {market.currency}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={switcherOpen ? "M6 15l6-6 6 6" : "M6 9l6 6 6-6"} />
              </svg>
            </button>
            {switcherOpen && (
              <div className="mt-4 grid sm:grid-cols-2 gap-x-10 gap-y-6 max-w-2xl">
                {REGIONS.map((r) => (
                  <div key={r.name}>
                    <p className="label-caps !text-[9px] text-[#6a6a6a] mb-3">
                      {r.name.toUpperCase()}
                    </p>
                    <ul className="space-y-2">
                      {r.markets.map((code) => {
                        const m = getMarket(code)!;
                        return (
                          <li key={code}>
                            <button
                              onClick={() => switchMarket(code)}
                              className={`text-[13px] transition-colors ${
                                code === market.code
                                  ? "text-white underline underline-offset-4"
                                  : "text-[#b5b5b5] hover:text-white"
                              }`}
                            >
                              {m.name} · {m.currency}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <p className="label-caps !text-[10px] text-[#8a8a8a] mb-4">{t("footer.language")}</p>
            <div className="flex flex-wrap gap-3">
              {market.languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => switchLang(l.code)}
                  className={`label-caps px-5 py-3 border transition-colors ${
                    l.code === lang
                      ? "border-white text-white"
                      : "border-[#3a3a3a] text-[#b5b5b5] hover:border-white hover:text-white"
                  }`}
                >
                  {l.label.toUpperCase()}
                </button>
              ))}
            </div>
            <p className="text-[12px] text-[#6a6a6a] mt-4 leading-relaxed max-w-sm">
              {market.serviceNote}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#2a2a2a] flex flex-col md:flex-row justify-between gap-6">
          <div className="flex flex-wrap gap-x-8 gap-y-2 label-caps !text-[10px] text-[#8a8a8a]">
            <span>{market.name.toUpperCase()}</span>
            <span>{market.languages.find((l) => l.code === lang)?.label.toUpperCase()}</span>
            <span>{market.currency}</span>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 label-caps !text-[10px] text-[#8a8a8a]">
            <span>© 2026 LAMONTE</span>
            <span>PRIVACY</span>
            <span>TERMS</span>
            <span>{MARKETS.length} MARKETS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
