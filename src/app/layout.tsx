import type { Metadata } from "next";
import "./globals.css";
import { MarketProvider } from "@/store/market";
import { ShopProvider } from "@/store/shop";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lamonte.id"),
  title: "LAMONTE — Fashion Without Borders",
  description:
    "LAMONTE — Fashion Without Borders. Premium kids fashion, global commerce.",
  icons: { icon: "/favicon.png" },
  alternates: {
    canonical: "/",
    // International SEO — hreflang cluster so localized markets are not
    // treated as duplicate content.
    languages: {
      "id-ID": "/id/id/",
      "en-ID": "/id/en/",
      "en-SG": "/sg/en/",
      "en-MY": "/my/en/",
      "ms-MY": "/my/id/",
      "ar-AE": "/ae/ar/",
      "en-AE": "/ae/en/",
      "ar-SA": "/sa/ar/",
      "en-SA": "/sa/en/",
      "ja-JP": "/jp/ja/",
      "en-JP": "/jp/en/",
      "vi-VN": "/vn/vi/",
      "zh-CN": "/cn/zh/",
      "en-AU": "/au/en/",
      "en-US": "/us/en/",
      "en-GB": "/uk/en/",
      "x-default": "/",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* React 19 hoists these font links into <head> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap"
          rel="stylesheet"
        />
        {/* ShopProvider lives at the root so the bag survives cross-market
            navigation (dynamic segment changes remount the market layout) */}
        <MarketProvider>
          <ShopProvider>{children}</ShopProvider>
        </MarketProvider>
      </body>
    </html>
  );
}
