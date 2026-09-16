"use client";

import Link from "next/link";
import { useMarket } from "@/store/market";
import Logo from "./Logo";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { base, market, lang, t } = useMarket();

  const LINKS = [
    { label: t("mega.newIn"), to: `${base}/kids/new` },
    { label: t("mega.girls"), to: `${base}/kids/girls` },
    { label: t("mega.boys"), to: `${base}/kids/boys` },
    { label: t("mega.littleKids"), to: `${base}/kids/little-kids` },
    { label: t("mega.baby"), to: `${base}/kids/baby` },
    { label: t("mega.shopByAge"), to: `${base}/kids/age-kids` },
    { label: t("nav.collections"), to: `${base}/collections` },
    { label: t("nav.stories"), to: `${base}/stories` },
    { label: t("nav.sale"), to: `${base}/sale`, accent: true },
  ];

  return (
    <>
      <div
        className={`overlay-fade fixed inset-0 bg-black/40 z-[70] ${open ? "open" : ""}`}
        onClick={onClose}
      />
      <aside
        className={`drawer-left fixed top-0 left-0 h-full w-[86%] max-w-sm bg-white z-[80] flex flex-col ${
          open ? "open" : ""
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#e6e6e6]">
          <Logo className="h-5" />
          <button aria-label="Close menu" onClick={onClose} className="p-2 -me-2">
            <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="space-y-6">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.to}
                  onClick={onClose}
                  className={`label-caps-lg ${l.accent ? "accent-orange" : ""}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12 pt-8 border-t border-[#e6e6e6] space-y-5">
            <Link href={`${base}/account`} onClick={onClose} className="block text-sm">
              {t("nav.account")}
            </Link>
            <Link href={`${base}/stores`} onClick={onClose} className="block text-sm">
              {t("nav.stores")}
            </Link>
            <Link href={`${base}/business`} onClick={onClose} className="block text-sm text-muted">
              {t("footer.business")} →
            </Link>
            <p className="label-caps text-muted pt-4">
              {market.name.toUpperCase()} | {lang.toUpperCase()} | {market.currency}
            </p>
          </div>
        </nav>
      </aside>
    </>
  );
}
