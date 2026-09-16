"use client";

import ScrollToTop from "./ScrollToTop";
import GeoBanner from "./GeoBanner";
import Header from "./Header";
import MarketGate from "./MarketGate";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import SearchOverlay from "./SearchOverlay";

/** Chrome (header/footer/drawers) wraps every market-localized page. */
export default function MarketChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollToTop />
      <GeoBanner />
      <Header />
      <MarketGate>{children}</MarketGate>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
    </>
  );
}
