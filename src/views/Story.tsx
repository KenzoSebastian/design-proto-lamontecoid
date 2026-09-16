"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { stories, getProduct } from "@/data/catalog";
import { useMarket } from "@/store/market";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

export function StoriesIndex() {
  const { base } = useMarket();
  return (
    <main className="pb-24">
      <section className="px-6 md:px-10 max-w-[1600px] mx-auto pt-16 pb-12">
        <p className="label-caps text-muted">LAMONTE STORIES</p>
        <h1 className="font-editorial font-light text-5xl md:text-7xl mt-4">
          Stories, not posts.
        </h1>
        <p className="text-muted mt-6 max-w-xl leading-relaxed">
          Editorials on fashion, kids, craft and culture — from the Lamonte
          atelier and the families who wear it.
        </p>
      </section>
      <section className="px-6 md:px-10 max-w-[1600px] mx-auto grid md:grid-cols-3 gap-4 md:gap-6">
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
              <p className="font-editorial text-3xl mt-1 group-hover:underline underline-offset-8">
                {s.title}
              </p>
              <p className="text-[13px] text-muted mt-3 leading-relaxed line-clamp-2">
                {s.copy}
              </p>
            </Link>
          </Reveal>
        ))}
      </section>
    </main>
  );
}

export default function Story() {
  const slug = String(useParams()?.slug ?? "");
  const { base } = useMarket();
  const story = stories.find((s) => s.slug === slug);

  if (!story) {
    return (
      <main className="py-40 text-center px-6">
        <p className="font-editorial italic text-4xl">This story has moved on.</p>
        <Link href={`${base}/stories`} className="label-caps link-underline inline-block mt-8">
          ALL STORIES
        </Link>
      </main>
    );
  }

  return (
    <main className="pb-24">
      {/* hero */}
      <section className="relative h-[75vh] min-h-[480px] overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover hero-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-16 text-white max-w-3xl">
          <p className="label-caps-lg mb-4">{story.kicker}</p>
          <h1 className="font-editorial font-light text-5xl md:text-7xl leading-[0.98]">
            {story.title}
          </h1>
        </div>
      </section>

      {/* narrative */}
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <Reveal>
          <p className="font-editorial text-2xl md:text-3xl leading-relaxed italic">
            “{story.copy}”
          </p>
          <p className="label-caps text-muted mt-8">LAMONTE ATELIER — JAKARTA</p>
        </Reveal>
      </section>

      {/* shop the story */}
      <section className="px-6 md:px-10 max-w-[1600px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-editorial font-light text-4xl">Shop the Story</h2>
          <Link href={`${base}/kids`} className="label-caps link-underline hidden sm:block">
            VIEW ALL
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {story.productIds.map((id) => {
            const p = getProduct(id);
            return p ? <ProductCard key={id} product={p} /> : null;
          })}
        </div>
      </section>

      {/* related stories */}
      <section className="px-6 md:px-10 max-w-[1600px] mx-auto mt-24">
        <h2 className="font-editorial font-light text-4xl mb-10">More Stories</h2>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {stories
            .filter((s) => s.slug !== slug)
            .map((s) => (
              <Link key={s.slug} href={`${base}/story/${s.slug}`} className="group relative block overflow-hidden aspect-[16/9]">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <p className="absolute bottom-6 left-6 font-editorial text-3xl text-white">
                  {s.title}
                </p>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
