"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useShop } from "@/store/shop";
import { useMarket } from "@/store/market";
import Logo from "./Logo";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const { cartCount, setCartOpen, setSearchOpen, menuOpen, setMenuOpen } = useShop();
  const { base, market, t, fmt } = useMarket();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const isHome = pathname === base || pathname === `${base}/`;
  const transparent = isHome && !scrolled && !megaOpen;

  const NAV = [
    { label: t("nav.new"), to: `${base}/kids/new`},
    { label: t("nav.kids"), to: `${base}/kids`, mega: true },
    { label: t("nav.collections"), to: `${base}/collections` },
    { label: t("nav.stories"), to: `${base}/stories` },
    { label: t("nav.sale"), to: `${base}/sale`, accent: true },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  const marquee = [
    t("common.freeShipping", { amount: fmt(market.freeShipping) }),
    t("common.newCollection"),
    `${market.name.toUpperCase()} | ${market.currency}`,
    t("common.returns"),
  ].join(" · ") + " · ";

  return (
    <>
      {/* announcement marquee — market aware */}
      <div className="bg-[#0a0a0a] text-white overflow-hidden py-2 relative z-[60]">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[0, 1].map((n) => (
            <span key={n} className="label-caps !text-[10px] tracking-[0.3em] px-8">
              {marquee}
            </span>
          ))}
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          transparent
            ? "bg-transparent text-white"
            : "bg-white/95 backdrop-blur-sm text-[#0a0a0a] border-b border-[#e6e6e6]"
        }`}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className="flex items-center justify-between h-16 px-5 md:px-10">
          {/* left */}
          <div className="flex items-center gap-8 flex-1">
            <button
              className="lg:hidden flex flex-col gap-[5px] p-2 -ms-2"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <span className="w-5 h-px bg-current" />
              <span className="w-5 h-px bg-current" />
            </button>
            <nav className="hidden lg:flex items-center gap-8">
              {NAV.map((item) =>
                item.mega ? (
                  <button
                    key={item.label}
                    onMouseEnter={() => setMegaOpen(true)}
                    onClick={() => router.push(item.to)}
                    className={`label-caps link-underline ${
                      pathname.endsWith(`/${item.label.toLowerCase()}/`) ? "active" : ""
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={item.to}
                    onMouseEnter={() => setMegaOpen(false)}
                    className={`label-caps link-underline ${
                      item.accent && !transparent ? "accent-orange" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* center logo */}
          <Logo
            light={transparent}
            className="h-6 md:h-7 absolute left-1/2 -translate-x-1/2 rtl:-translate-x-1/2"
          />

          {/* right */}
          <div className="flex items-center gap-5 md:gap-7 flex-1 justify-end">
            <button
              aria-label="Search"
              className="label-caps hidden sm:flex items-center gap-2 link-underline"
              onClick={() => setSearchOpen(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <span className="hidden xl:inline">{t("nav.search")}</span>
            </button>
            <button aria-label="Search" className="sm:hidden p-1" onClick={() => setSearchOpen(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
            <Link href={`${base}/account`} aria-label="Account" className="hidden sm:block label-caps link-underline">
              {t("nav.account")}
            </Link>
            <button
              aria-label="Bag"
              className="label-caps flex items-center gap-1 link-underline"
              onClick={() => setCartOpen(true)}
            >
              {t("nav.bag")}
              <span>({cartCount})</span>
            </button>
          </div>
        </div>

        <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
