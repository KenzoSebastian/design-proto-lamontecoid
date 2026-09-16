"use client";

import Link from "next/link";
import type { Product } from "@/data/catalog";
import { useShop } from "@/store/shop";
import { useMarket } from "@/store/market";

export default function ProductCard({
  product,
  eager = false,
}: {
  product: Product;
  eager?: boolean;
}) {
  const { wishlist, toggleWishlist } = useShop();
  const { base, fmtPrice, comingSoon } = useMarket();
  const saved = wishlist.includes(product.id);
  const price = fmtPrice(product);
  const soon = comingSoon(product);

  return (
    <div className="group">
      <div className="relative overflow-hidden bg-cream aspect-[3/4]">
        <Link href={`${base}/product/${product.id}`} aria-label={product.name}>
          <img
            src={product.image}
            alt={product.name}
            loading={eager ? "eager" : "lazy"}
            className="w-full h-full object-cover img-zoom"
          />
        </Link>
        {soon ? (
          <span className="absolute top-3 start-3 label-caps !text-[9px] bg-[#0a0a0a] text-white px-2 py-1 tracking-[0.18em]">
            COMING SOON
          </span>
        ) : product.isSale ? (
          <span className="absolute top-3 start-3 label-caps !text-[9px] bg-[#0a0a0a] text-white px-2 py-1 tracking-[0.18em]">
            SALE
          </span>
        ) : (
          product.label && (
            <span className="absolute top-3 start-3 label-caps !text-[9px] bg-white/90 px-2 py-1 tracking-[0.18em]">
              {product.label}
            </span>
          )
        )}
        <button
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-2 end-2 p-2 transition-opacity duration-300 ${
            saved ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={saved ? "#0a0a0a" : "none"}
            stroke="#0a0a0a"
            strokeWidth="1.4"
          >
            <path d="M12 21c-4.8-3.6-9-6.9-9-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4.1-4.2 7.4-9 11z" />
          </svg>
        </button>
      </div>
      <div className="pt-3 space-y-1">
        <Link
          href={`${base}/product/${product.id}`}
          className="block text-[13px] leading-snug hover:underline underline-offset-4"
        >
          {product.name}
        </Link>
        <p className="text-[13px]">
          {price.compareAt && (
            <span className="line-through text-muted me-2">{price.compareAt}</span>
          )}
          <span className={product.isSale ? "accent-orange" : ""}>{price.price}</span>
        </p>
        <div className="flex gap-1.5 pt-1">
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="w-3 h-3 border border-[#d4d4d4]"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
