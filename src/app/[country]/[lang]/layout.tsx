import type { ReactNode } from "react";
import { MARKETS } from "@/data/markets";
import MarketChrome from "@/components/MarketChrome";

export const dynamicParams = false;

/** Every valid /{country}/{lang} combination is prerendered. */
export function generateStaticParams() {
  return MARKETS.flatMap((m) =>
    m.languages.map((l) => ({ country: m.code, lang: l.code }))
  );
}

export default function MarketLayout({ children }: { children: ReactNode }) {
  return <MarketChrome>{children}</MarketChrome>;
}
