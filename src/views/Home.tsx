"use client";

import Link from "next/link";
import { products, stories, AGE_GROUPS } from "@/data/catalog";
import { campaignFor } from "@/data/markets";
import { useMarket } from "@/store/market";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

const AGE_TILES = [
  { group: AGE_GROUPS[0], img: "/images/cat-baby.jpg", to: "/kids/age-baby" },
  { group: AGE_GROUPS[1], img: "/images/story-play.jpg", to: "/kids/age-little" },
  { group: AGE_GROUPS[2], img: "/images/cat-girls.jpg", to: "/kids/age-kids" },
];

export default function Home() {
  const { base, market, lang, t, fmtPrice, available } = useMarket();
  const campaign = campaignFor(market, lang);

  const inMarket = products.filter(available);
  const newArrivals = inMarket
    .filter((p) => p.label === "NEW")
    .concat(inMarket.filter((p) => !p.label))
    .slice(0, 8);
  const trending = inMarket.filter((p) => p.label === "BESTSELLER" || p.isSale).slice(0, 4);

  return (
    <main>
      {/* SECTION 1 — FULLSCREEN HERO (market-localized campaign) */}
      <section className="relative h-[calc(100vh-6.5rem)] min-h-[540px] overflow-hidden -mt-16">
        <img
          src="/images/hero.jpeg"
          alt="Lamonte new collection campaign"
          className="absolute inset-0 w-full h-full object-cover hero-zoom"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/25" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-28 text-white text-center px-6">
          <p className="label-caps-lg mb-5 tracking-[0.4em]">{campaign.kicker}</p>
          <h1 className="font-editorial font-light text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
            {campaign.title}
          </h1>
          <p className="font-editorial text-lg md:text-xl mt-4 text-white/85">
            {campaign.sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              href={`${base}/kids/new`}
              className="bg-white text-[#0a0a0a] label-caps px-10 py-4 hover:bg-[#e8e8e8] transition-colors"
            >
              {campaign.ctaPrimary}
            </Link>
            <Link
              href={`${base}/collections`}
              className="border border-white/80 text-white label-caps px-10 py-4 hover:bg-white hover:text-[#0a0a0a] transition-colors"
            >
              {campaign.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2 — NEW ARRIVALS */}
      <section className="py-20 md:py-28">
        <div className="px-6 md:px-10 max-w-[1600px] mx-auto">
          <Reveal className="flex items-end justify-between mb-10">
            <h2 className="font-editorial font-light text-4xl md:text-5xl">
              {t("home.newArrivals")}
            </h2>
            <Link href={`${base}/kids/new`} className="label-caps link-underline hidden sm:block">
              {t("home.viewAll")}
            </Link>
          </Reveal>
          <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-4">
            {newArrivals.map((p, i) => (
              <div key={p.id} className="min-w-[62vw] sm:min-w-[40vw] md:min-w-0 snap-start">
                <Reveal delay={i * 60}>
                  <ProductCard product={p} eager={i < 4} />
                </Reveal>
              </div>
            ))}
          </div>
          <Link href={`${base}/kids/new`} className="label-caps link-underline inline-block mt-8 sm:hidden">
            {t("home.viewAll")}
          </Link>
        </div>
      </section>

      {/* SECTION 3 — SHOP BY AGE */}
      <section className="pb-20 md:pb-28">
        <div className="px-6 md:px-10 max-w-[1600px] mx-auto">
          <Reveal className="mb-10 text-center">
            <h2 className="font-editorial font-light text-4xl md:text-5xl">
              {t("home.shopByAge")} 
            </h2>
            <p className="text-muted mt-3">{t("home.shopByAge.sub")}</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {AGE_TILES.map((tile, i) => (
              <Reveal key={tile.group.key} delay={i * 100}>
                <Link
                  href={`${base}${tile.to}`}
                  className="group relative block overflow-hidden aspect-[4/5]"
                >
                  <img
                    src={tile.img}
                    alt={t(`cat.${tile.group.key}`)}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover img-zoom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 text-white text-center">
                    <p className="font-editorial font-light text-3xl md:text-4xl">
                      {t(`cat.${tile.group.key}`)}
                    </p>
                    <p className="label-caps mt-3 link-underline inline-block">
                      {t("home.shopNow")}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — SHOP THE STORY */}
      <section className="py-10 md:py-16">
        <div className="px-6 md:px-10 max-w-[1600px] mx-auto">
          <Reveal className="mb-10">
            <p className="label-caps text-muted mb-3">{t("home.shopTheStory")}</p>
            <h2 className="font-editorial font-light text-4xl md:text-5xl">
              {t("home.editorials")}
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {stories.map((s, i) => (
              <Reveal key={s.slug} delay={i * 100}>
                <Link href={`${base}/story/${s.slug}`} className="group block">
                  <div className="overflow-hidden aspect-[4/5] bg-cream">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="w-full h-full object-cover img-zoom"
                    />
                  </div>
                  <p className="label-caps text-muted mt-5">{s.kicker}</p>
                  <p className="font-editorial text-2xl md:text-3xl mt-1 group-hover:underline underline-offset-8">
                    {s.title}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — CATEGORY GATEWAYS */}
      <section className="py-20 md:py-28 bg-cream mt-16">
        <div className="px-6 md:px-10 max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {[
              { label: t("home.girls"), to: `${base}/kids/girls`, img: "/images/cat-girls.jpg", sub: t("cat.girls.sub") },
              { label: t("home.boys"), to: `${base}/kids/boys`, img: "/images/cat-boys.jpg", sub: t("cat.boys.sub") },
              { label: t("home.baby"), to: `${base}/kids/baby`, img: "/images/cat-baby.jpg", sub: t("cat.baby.sub") },
            ].map((c, i) => (
              <Reveal key={c.label} delay={i * 100}>
                <Link href={c.to} className="group relative block overflow-hidden aspect-[3/4]">
                  <img
                    src={c.img}
                    alt={c.label}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover img-zoom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <div className="absolute bottom-0 start-0 p-6 md:p-8 text-white">
                    <p className="font-editorial font-light text-4xl md:text-5xl">{c.label}</p>
                    <p className="text-[13px] text-white/80 mt-2 max-w-[90%]">{c.sub}</p>
                    <p className="label-caps mt-4 link-underline inline-block">
                      {t("home.shopNow")}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — SHOP THE LOOK */}
      <section className="py-20 md:py-32">
        <div className="px-6 md:px-10 max-w-[1600px] mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <Reveal>
            <div className="relative overflow-hidden bg-cream">
              <img
                src="/images/look-main.jpg"
                alt="Shop the look — complete outfit"
                loading="lazy"
                className="w-full object-cover"
              />
              {[
                { top: "22%", left: "48%", label: "Linen Overshirt", id: "linen-overshirt" },
                { top: "58%", left: "40%", label: "Explorer Play Set", id: "explorer-set" },
              ]
                .filter((h) => {
                  const p = products.find((x) => x.id === h.id);
                  return p ? available(p) : false;
                })
                .map((h) => (
                <Link
                  key={h.label}
                  href={`${base}/product/${h.id}`}
                  style={{ top: h.top, left: h.left }}
                  className="absolute group/spot flex items-center"
                >
                  <span className="w-4 h-4 bg-white border border-[#0a0a0a]/20 rounded-full shadow group-hover/spot:scale-125 transition-transform" />
                  <span className="ms-2 bg-white/95 label-caps !text-[9px] px-3 py-2 opacity-0 group-hover/spot:opacity-100 transition-opacity whitespace-nowrap">
                    {h.label}
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="label-caps text-muted mb-4">{t("home.shopTheLook")}</p>
            <h2 className="font-editorial font-light text-4xl md:text-6xl leading-[1.05]">
              One look.
              <br />
              <em>Ready to wear.</em>
            </h2>
            <p className="text-muted mt-6 max-w-md leading-relaxed">
              Every piece styled together, available together. Hover the image
              to discover each item, or add the complete look in one gesture.
            </p>
            <div className="mt-8 space-y-3 border-t border-[#e6e6e6] pt-6 max-w-md">
              {["linen-overshirt", "explorer-set", "breton-tee"]
                .map((id) => products.find((x) => x.id === id)!)
                .filter((p) => p && available(p))
                .map((p) => {
                return (
                  <Link
                    key={p.id}
                    href={`${base}/product/${p.id}`}
                    className="flex justify-between items-center group"
                  >
                    <span className="text-sm group-hover:underline underline-offset-4">
                      {p.name}
                    </span>
                    <span className="text-sm text-muted">{fmtPrice(p).price}</span>
                  </Link>
                );
              })}
            </div>
            <Link
              href={`${base}/product/linen-overshirt`}
              className="inline-block mt-8 bg-[#0a0a0a] text-white label-caps px-10 py-4 hover:bg-[#2a2a2a] transition-colors"
            >
              {t("home.shopThisLook")}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SECTION 7 — TRENDING NOW */}
      <section className="py-16 md:py-24 bg-[#0a0a0a] text-white">
        <div className="px-6 md:px-10 max-w-[1600px] mx-auto">
          <Reveal className="flex items-end justify-between mb-10">
            <h2 className="font-editorial font-light text-4xl md:text-5xl">
              {t("home.trendingNow")}
            </h2>
            <Link href={`${base}/kids/trending`} className="label-caps link-underline hidden sm:block">
              {t("home.viewAll")}
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {trending.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <Link href={`${base}/product/${p.id}`} className="group block">
                  <div className="overflow-hidden aspect-[3/4] bg-[#1a1a1a]">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover img-zoom"
                    />
                  </div>
                  <p className="text-[13px] mt-3 group-hover:underline underline-offset-4">
                    {p.name}
                  </p>
                  <p className="text-[13px] text-[#9a9a9a] mt-1">{fmtPrice(p).price}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — BRAND STORY */}
      <section className="relative py-28 md:py-44 overflow-hidden">
        <img
          src="/images/brand.jpg"
          alt="Lamonte atelier"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative max-w-3xl mx-auto text-center text-white px-6">
          <Reveal>
            <p className="label-caps-lg mb-6">FROM INDONESIA TO THE WORLD</p>
            <h2 className="font-editorial font-light text-4xl md:text-6xl leading-[1.05]">
              Great fashion,
              <br />
              <em>made honestly.</em>
            </h2>
            <p className="mt-8 text-white/85 leading-relaxed max-w-xl mx-auto">
              Lamonte begins with fabric, hands, and time. Designed in Jakarta,
              worn everywhere — one collection, one standard, no borders.
            </p>
            <Link
              href={`${base}/stories`}
              className="inline-block mt-10 border border-white label-caps px-10 py-4 hover:bg-white hover:text-[#0a0a0a] transition-colors"
            >
              {t("home.ourStory")}
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
