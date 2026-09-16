// Global market architecture — one brand, many markets.
// Market = country + language + currency + catalog + price list + inventory + campaigns.

export type MarketCode =
  | "id" | "sg" | "my" | "ae" | "sa" | "jp" | "vn"
  | "cn" | "au" | "us" | "uk" | "eu" | "bd";

export type LangCode = "en" | "id" | "ar" | "ja" | "zh" | "vi";

export interface MarketLanguage {
  code: LangCode;
  label: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  eta: string;
  price: number;
}

export interface CampaignCopy {
  kicker: string;
  title: string;
  sub: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface Market {
  code: MarketCode;
  name: string;
  region: string;
  currency: string;
  locale: string; // BCP-47 for Intl.NumberFormat
  languages: MarketLanguage[];
  defaultLang: LangCode;
  status: "LIVE" | "PREVIEW";
  freeShipping: number; // threshold in local currency
  shipping: ShippingMethod[];
  payments: string[];
  campaign: Partial<Record<LangCode, CampaignCopy>>; // "en" always present
  serviceNote: string; // market-specific customer service line
}

export const MARKETS: Market[] = [
  {
    code: "id", name: "Indonesia", region: "Southeast Asia", currency: "IDR",
    locale: "id-ID", defaultLang: "id", status: "LIVE",
    languages: [
      { code: "id", label: "Bahasa Indonesia" },
      { code: "en", label: "English" },
    ],
    freeShipping: 500000,
    shipping: [
      { id: "reg", name: "Regular", eta: "2–5 business days", price: 29000 },
      { id: "exp", name: "Express", eta: "Next business day", price: 59000 },
    ],
    payments: ["Credit / Debit Card", "Bank Transfer (VA)", "QRIS", "E-Wallet", "COD"],
    campaign: {
      en: {
        kicker: "LAMONTE INDONESIA",
        title: "Back to School",
        sub: "The new semester edit — smart sets, everyday essentials.",
        ctaPrimary: "SHOP NEW",
        ctaSecondary: "DISCOVER COLLECTION",
      },
      id: {
        kicker: "LAMONTE INDONESIA",
        title: "Kembali ke Sekolah",
        sub: "Koleksi semester baru — setelan rapi, esensial harian.",
        ctaPrimary: "BELANJA KOLEKSI",
        ctaSecondary: "JELAJAHI KOLEKSI",
      },
    },
    serviceNote: "Customer service in Bahasa Indonesia & English, Mon–Sat 09.00–18.00 WIB.",
  },
  {
    code: "sg", name: "Singapore", region: "Southeast Asia", currency: "SGD",
    locale: "en-SG", defaultLang: "en", status: "LIVE",
    languages: [{ code: "en", label: "English" }],
    freeShipping: 60,
    shipping: [
      { id: "std", name: "Home Delivery", eta: "1–3 business days", price: 4.9 },
      { id: "exp", name: "Express", eta: "Same day (order by 12:00)", price: 9.9 },
    ],
    payments: ["Credit / Debit Card", "Apple Pay", "Google Pay", "PayNow"],
    campaign: {
      en: {
        kicker: "LAMONTE SINGAPORE",
        title: "The City Edit",
        sub: "Light layers for the equatorial city — new season, now live.",
        ctaPrimary: "SHOP NEW",
        ctaSecondary: "DISCOVER COLLECTION",
      },
    },
    serviceNote: "Customer service in English, Mon–Fri 09:00–18:00 SGT.",
  },
  {
    code: "my", name: "Malaysia", region: "Southeast Asia", currency: "MYR",
    locale: "en-MY", defaultLang: "en", status: "LIVE",
    languages: [
      { code: "en", label: "English" },
      { code: "id", label: "Bahasa Malaysia" },
    ],
    freeShipping: 200,
    shipping: [
      { id: "std", name: "Home Delivery", eta: "2–4 business days", price: 12 },
      { id: "exp", name: "Express", eta: "Next business day (Klang Valley)", price: 20 },
    ],
    payments: ["Credit / Debit Card", "FPX Online Banking", "E-Wallet"],
    campaign: {
      en: {
        kicker: "LAMONTE MALAYSIA",
        title: "The New Season",
        sub: "Everyday essentials and occasion pieces, made for warm days.",
        ctaPrimary: "SHOP NEW",
        ctaSecondary: "DISCOVER COLLECTION",
      },
    },
    serviceNote: "Customer service in English & Bahasa Malaysia, Mon–Fri 09:00–18:00 MYT.",
  },
  {
    code: "ae", name: "United Arab Emirates", region: "Middle East", currency: "AED",
    locale: "en-AE", defaultLang: "ar", status: "LIVE",
    languages: [
      { code: "ar", label: "العربية" },
      { code: "en", label: "English" },
    ],
    freeShipping: 200,
    shipping: [
      { id: "std", name: "Home Delivery", eta: "2–4 business days", price: 20 },
      { id: "exp", name: "Express", eta: "Next day (Dubai & Abu Dhabi)", price: 35 },
    ],
    payments: ["Credit / Debit Card", "Apple Pay", "Cash on Delivery"],
    campaign: {
      en: {
        kicker: "LAMONTE UAE",
        title: "The Occasion Edit",
        sub: "Celebration pieces and refined everyday layers for the season.",
        ctaPrimary: "SHOP NEW",
        ctaSecondary: "DISCOVER COLLECTION",
      },
      ar: {
        kicker: "لامونتي الإمارات",
        title: "مجموعة المناسبات",
        sub: "قطع الاحتفال وطبقات يومية راقية لهذا الموسم.",
        ctaPrimary: "تسوّق الجديد",
        ctaSecondary: "اكتشف المجموعة",
      },
    },
    serviceNote: "Customer service in Arabic & English, Sat–Thu 09:00–18:00 GST.",
  },
  {
    code: "sa", name: "Saudi Arabia", region: "Middle East", currency: "SAR",
    locale: "ar-SA", defaultLang: "ar", status: "LIVE",
    languages: [
      { code: "ar", label: "العربية" },
      { code: "en", label: "English" },
    ],
    freeShipping: 250,
    shipping: [
      { id: "std", name: "Home Delivery", eta: "3–5 business days", price: 25 },
      { id: "exp", name: "Express", eta: "1–2 business days (Riyadh & Jeddah)", price: 45 },
    ],
    payments: ["Credit / Debit Card", "mada", "Apple Pay", "Cash on Delivery"],
    campaign: {
      en: {
        kicker: "LAMONTE SAUDI ARABIA",
        title: "The Occasion Edit",
        sub: "Celebration pieces and refined everyday layers for the season.",
        ctaPrimary: "SHOP NEW",
        ctaSecondary: "DISCOVER COLLECTION",
      },
      ar: {
        kicker: "لامونتي السعودية",
        title: "مجموعة المناسبات",
        sub: "قطع الاحتفال وطبقات يومية راقية لهذا الموسم.",
        ctaPrimary: "تسوّق الجديد",
        ctaSecondary: "اكتشف المجموعة",
      },
    },
    serviceNote: "Customer service in Arabic & English, Sun–Thu 09:00–18:00 AST.",
  },
  {
    code: "jp", name: "Japan", region: "East Asia", currency: "JPY",
    locale: "ja-JP", defaultLang: "ja", status: "LIVE",
    languages: [
      { code: "ja", label: "日本語" },
      { code: "en", label: "English" },
    ],
    freeShipping: 8000,
    shipping: [
      { id: "std", name: "宅配便 Home Delivery", eta: "2–4 business days", price: 550 },
      { id: "exp", name: "Express", eta: "Next day (Tokyo & Osaka)", price: 900 },
    ],
    payments: ["Credit Card", "Konbini Payment", "PayPay"],
    campaign: {
      en: {
        kicker: "LAMONTE JAPAN",
        title: "Early Autumn",
        sub: "Knits and layers for the first cool mornings — Japan exclusive edit.",
        ctaPrimary: "SHOP NEW",
        ctaSecondary: "DISCOVER COLLECTION",
      },
      ja: {
        kicker: "LAMONTE JAPAN",
        title: "初秋のコレクション",
        sub: "涼しい朝に寄り添うニットとレイヤー。日本限定エディット。",
        ctaPrimary: "新作を見る",
        ctaSecondary: "コレクションを見る",
      },
    },
    serviceNote: "Customer service in Japanese & English, Mon–Fri 10:00–18:00 JST.",
  },
  {
    code: "vn", name: "Vietnam", region: "Southeast Asia", currency: "VND",
    locale: "vi-VN", defaultLang: "vi", status: "LIVE",
    languages: [
      { code: "vi", label: "Tiếng Việt" },
      { code: "en", label: "English" },
    ],
    freeShipping: 900000,
    shipping: [
      { id: "std", name: "Home Delivery", eta: "2–5 business days", price: 30000 },
      { id: "exp", name: "Express", eta: "Next day (HCMC & Hanoi)", price: 55000 },
    ],
    payments: ["Credit / Debit Card", "Bank Transfer", "E-Wallet", "COD"],
    campaign: {
      en: {
        kicker: "LAMONTE VIETNAM",
        title: "The New Season",
        sub: "Everyday essentials and play-ready sets, made for warm days.",
        ctaPrimary: "SHOP NEW",
        ctaSecondary: "DISCOVER COLLECTION",
      },
      vi: {
        kicker: "LAMONTE VIETNAM",
        title: "Bộ Sưu Tập Mới",
        sub: "Trang phục hằng ngày và set đồ năng động cho ngày nắng.",
        ctaPrimary: "MUA NGAY",
        ctaSecondary: "KHÁM PHÁ BỘ SƯU TẬP",
      },
    },
    serviceNote: "Customer service in Vietnamese & English, Mon–Sat 09:00–18:00 ICT.",
  },
  {
    code: "cn", name: "China", region: "East Asia", currency: "CNY",
    locale: "zh-CN", defaultLang: "zh", status: "PREVIEW",
    languages: [
      { code: "zh", label: "中文" },
      { code: "en", label: "English" },
    ],
    freeShipping: 300,
    shipping: [
      { id: "std", name: "Standard Delivery", eta: "2–4 business days", price: 15 },
      { id: "exp", name: "Express", eta: "Next day (major cities)", price: 25 },
    ],
    payments: ["Credit / Debit Card", "UnionPay"],
    campaign: {
      en: {
        kicker: "LAMONTE CHINA",
        title: "The New Season",
        sub: "A curated edit for the new season — preview market.",
        ctaPrimary: "SHOP NEW",
        ctaSecondary: "DISCOVER COLLECTION",
      },
      zh: {
        kicker: "LAMONTE 中国",
        title: "全新季度系列",
        sub: "新季精选系列 — 预览市场。",
        ctaPrimary: "选购新品",
        ctaSecondary: "探索系列",
      },
    },
    serviceNote: "Customer service in Chinese & English, Mon–Fri 09:00–18:00 CST.",
  },
  {
    code: "au", name: "Australia", region: "Oceania", currency: "AUD",
    locale: "en-AU", defaultLang: "en", status: "LIVE",
    languages: [{ code: "en", label: "English" }],
    freeShipping: 100,
    shipping: [
      { id: "std", name: "Standard Delivery", eta: "3–6 business days", price: 9.95 },
      { id: "exp", name: "Express", eta: "1–2 business days (metro)", price: 14.95 },
    ],
    payments: ["Credit / Debit Card", "Apple Pay", "Google Pay", "Afterpay"],
    campaign: {
      en: {
        kicker: "LAMONTE AUSTRALIA",
        title: "The Spring Edit",
        sub: "Linen, poplin and light knits for long bright days.",
        ctaPrimary: "SHOP NEW",
        ctaSecondary: "DISCOVER COLLECTION",
      },
    },
    serviceNote: "Customer service in English, Mon–Fri 09:00–17:00 AEST.",
  },
  {
    code: "us", name: "United States", region: "Americas", currency: "USD",
    locale: "en-US", defaultLang: "en", status: "LIVE",
    languages: [{ code: "en", label: "English" }],
    freeShipping: 75,
    shipping: [
      { id: "std", name: "Standard Delivery", eta: "3–5 business days", price: 6.9 },
      { id: "exp", name: "Express", eta: "1–2 business days", price: 12.9 },
    ],
    payments: ["Credit / Debit Card", "Apple Pay", "Google Pay", "PayPal"],
    campaign: {
      en: {
        kicker: "LAMONTE USA",
        title: "The New Season",
        sub: "Back-to-school staples and weekend pieces, shipped nationwide.",
        ctaPrimary: "SHOP NEW",
        ctaSecondary: "DISCOVER COLLECTION",
      },
    },
    serviceNote: "Customer service in English, Mon–Fri 09:00–18:00 ET.",
  },
  {
    code: "uk", name: "United Kingdom", region: "Europe", currency: "GBP",
    locale: "en-GB", defaultLang: "en", status: "LIVE",
    languages: [{ code: "en", label: "English" }],
    freeShipping: 60,
    shipping: [
      { id: "std", name: "Standard Delivery", eta: "2–4 business days", price: 3.99 },
      { id: "exp", name: "Next Day", eta: "Order by 20:00", price: 5.99 },
    ],
    payments: ["Credit / Debit Card", "Apple Pay", "Google Pay", "PayPal"],
    campaign: {
      en: {
        kicker: "LAMONTE UK",
        title: "The Autumn Edit",
        sub: "Chunky knits and smart sets for crisp mornings.",
        ctaPrimary: "SHOP NEW",
        ctaSecondary: "DISCOVER COLLECTION",
      },
    },
    serviceNote: "Customer service in English, Mon–Fri 09:00–17:30 GMT.",
  },
  {
    code: "eu", name: "Europe", region: "Europe", currency: "EUR",
    locale: "en-IE", defaultLang: "en", status: "LIVE",
    languages: [{ code: "en", label: "English" }],
    freeShipping: 70,
    shipping: [
      { id: "std", name: "Standard Delivery", eta: "3–5 business days", price: 4.95 },
      { id: "exp", name: "Express", eta: "1–2 business days", price: 9.95 },
    ],
    payments: ["Credit / Debit Card", "SEPA Transfer", "PayPal"],
    campaign: {
      en: {
        kicker: "LAMONTE EUROPE",
        title: "The Autumn Edit",
        sub: "Layered essentials for the season across Europe.",
        ctaPrimary: "SHOP NEW",
        ctaSecondary: "DISCOVER COLLECTION",
      },
    },
    serviceNote: "Customer service in English, Mon–Fri 09:00–18:00 CET.",
  },
  {
    code: "bd", name: "Bangladesh", region: "South Asia", currency: "BDT",
    locale: "en-BD", defaultLang: "en", status: "PREVIEW",
    languages: [{ code: "en", label: "English" }],
    freeShipping: 3500,
    shipping: [
      { id: "std", name: "Home Delivery", eta: "2–4 business days (Dhaka)", price: 100 },
      { id: "nat", name: "Nationwide", eta: "3–6 business days", price: 150 },
    ],
    payments: ["Credit / Debit Card", "Mobile Banking", "Cash on Delivery"],
    campaign: {
      en: {
        kicker: "LAMONTE BANGLADESH",
        title: "Everyday Essentials",
        sub: "Honest everyday pieces — preview market, limited catalog.",
        ctaPrimary: "SHOP NEW",
        ctaSecondary: "DISCOVER COLLECTION",
      },
    },
    serviceNote: "Customer service in English & Bangla, Sat–Thu 10:00–18:00 BST.",
  },
];

export const REGIONS: { name: string; markets: MarketCode[] }[] = [
  { name: "Southeast Asia", markets: ["id", "sg", "my", "vn"] },
  { name: "Middle East", markets: ["ae", "sa"] },
  { name: "East Asia", markets: ["jp", "cn"] },
  { name: "South Asia", markets: ["bd"] },
  { name: "Oceania", markets: ["au"] },
  { name: "Americas", markets: ["us"] },
  { name: "Europe", markets: ["uk", "eu"] },
];

export const getMarket = (code: string): Market | undefined =>
  MARKETS.find((m) => m.code === code);

export const campaignFor = (market: Market, lang: LangCode): CampaignCopy =>
  market.campaign[lang] ?? market.campaign.en!;

// Geo suggestion — maps a browser locale region to one of our markets.
const REGION_TO_MARKET: Record<string, MarketCode> = {
  ID: "id", SG: "sg", MY: "my", AE: "ae", SA: "sa", JP: "jp", VN: "vn",
  CN: "cn", AU: "au", US: "us", GB: "uk", BD: "bd",
  DE: "eu", FR: "eu", NL: "eu", ES: "eu", IT: "eu", IE: "eu", BE: "eu",
};

export function detectMarketFromBrowser(): MarketCode | null {
  try {
    const region =
      new Intl.Locale(navigator.language).region ??
      navigator.language.split("-")[1]?.toUpperCase();
    return region ? REGION_TO_MARKET[region] ?? null : null;
  } catch {
    return null;
  }
}

// ---- Store locator (future-ready) ----
export interface Store {
  id: string;
  name: string;
  market: MarketCode;
  country: string;
  city: string;
  address: string;
  hours: string;
  services: string[];
  comingSoon?: boolean;
}

export const STORES: Store[] = [
  {
    id: "jkt-flagship", name: "Lamonte Flagship Jakarta", market: "id",
    country: "Indonesia", city: "Jakarta",
    address: "Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan 12190",
    hours: "Mon–Sun 10:00–21:00 WIB",
    services: ["Full Kids Collection", "Personal Shopping", "Click & Collect", "Returns Desk"],
  },
  {
    id: "bali-experience", name: "Lamonte Experience Center Bali", market: "id",
    country: "Indonesia", city: "Bali",
    address: "Jl. Petitenget No. 21, Seminyak, Badung, Bali 80361",
    hours: "Mon–Sun 10:00–20:00 WITA",
    services: ["Resort Edit", "Personal Shopping", "Monogram Studio", "Returns Desk"],
  },
  {
    id: "sg-orchard", name: "Lamonte Orchard Road", market: "sg",
    country: "Singapore", city: "Singapore",
    address: "238 Orchard Road, #02-14, Singapore 238849",
    hours: "Mon–Sun 10:00–22:00 SGT",
    services: ["Full Kids Collection", "Click & Collect", "Same-Day Courier"],
  },
  {
    id: "kl-pavilion", name: "Lamonte Pavilion Kuala Lumpur", market: "my",
    country: "Malaysia", city: "Kuala Lumpur",
    address: "168 Jalan Bukit Bintang, Level 3, 55100 Kuala Lumpur",
    hours: "Mon–Sun 10:00–22:00 MYT",
    services: ["Kids Collection", "Click & Collect"],
    comingSoon: true,
  },
  {
    id: "dxb-mall", name: "Lamonte Dubai Hills", market: "ae",
    country: "United Arab Emirates", city: "Dubai",
    address: "Dubai Hills Estate, Retail Boulevard, Dubai, UAE",
    hours: "Sat–Thu 10:00–22:00, Fri 14:00–22:00 GST",
    services: ["Occasion Edit", "Personal Shopping", "Gift Wrapping"],
    comingSoon: true,
  },
  {
    id: "tyo-aoyama", name: "Lamonte Aoyama", market: "jp",
    country: "Japan", city: "Tokyo",
    address: "3-11-7 Minami-Aoyama, Minato-ku, Tokyo 107-0062",
    hours: "Mon–Sun 11:00–20:00 JST",
    services: ["Japan Exclusive Edit", "Gift Wrapping", "Tax-Free Counter"],
    comingSoon: true,
  },
];
