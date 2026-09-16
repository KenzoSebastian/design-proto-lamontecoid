"use client";

import { useState } from "react";
import Link from "next/link";
import { useShop } from "@/store/shop";
import { useMarket } from "@/store/market";
import { getProduct } from "@/data/catalog";

export default function Account() {
  const [mode, setMode] = useState<"signin" | "create">("signin");
  const [signedIn, setSignedIn] = useState(false);
  const { wishlist } = useShop();
  const { base } = useMarket();

  if (signedIn) {
    return (
      <main className="max-w-4xl mx-auto px-6 md:px-10 py-16">
        <p className="label-caps text-muted">MY ACCOUNT</p>
        <h1 className="font-editorial font-light text-5xl mt-4">Hello, Adiva.</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {[
            ["ORDERS", "Track, return, download invoices"],
            ["ADDRESSES", "Manage delivery addresses"],
            ["WISHLIST", `${wishlist.length} saved pieces`],
            ["RECENTLY VIEWED", "Pick up where you left off"],
            ["NOTIFICATIONS", "Back-in-stock & price drops"],
            ["PREFERENCES", "Market, language, currency"],
          ].map(([t, d]) => (
            <div key={t} className="border border-[#e6e6e6] p-6 hover:border-[#0a0a0a] transition-colors">
              <p className="label-caps">{t}</p>
              <p className="text-[13px] text-muted mt-3">{d}</p>
            </div>
          ))}
        </div>
        {wishlist.length > 0 && (
          <section className="mt-16">
            <h2 className="font-editorial font-light text-3xl mb-8">Wishlist</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {wishlist.map((id) => {
                const p = getProduct(id);
                if (!p) return null;
                return (
                  <Link key={id} href={`${base}/product/${id}`} className="group">
                    <div className="aspect-[3/4] bg-cream overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover img-zoom" />
                    </div>
                    <p className="text-[13px] mt-3 group-hover:underline underline-offset-4">{p.name}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
    );
  }

  return (
    <main className="max-w-md mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h1 className="font-editorial font-light text-5xl">
          {mode === "signin" ? "Welcome back." : "Join Lamonte."}
        </h1>
        <p className="text-muted text-sm mt-4">
          One account — shopping, orders, wishlist, across every market.
        </p>
      </div>

      <div className="flex border-b border-[#e6e6e6] mb-10">
        {(["signin", "create"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 label-caps py-4 border-b transition-colors ${
              mode === m ? "border-[#0a0a0a]" : "border-transparent text-muted"
            }`}
          >
            {m === "signin" ? "SIGN IN" : "CREATE ACCOUNT"}
          </button>
        ))}
      </div>

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setSignedIn(true);
        }}
      >
        {mode === "create" && (
          <AccField label="FULL NAME" placeholder="Your name" />
        )}
        <AccField label="EMAIL" type="email" placeholder="you@example.com" />
        <AccField label="PASSWORD" type="password" placeholder="••••••••" />
        <button className="w-full bg-[#0a0a0a] text-white label-caps py-5 hover:bg-[#2a2a2a] transition-colors">
          {mode === "signin" ? "SIGN IN" : "CREATE ACCOUNT"}
        </button>
      </form>

      <div className="mt-16 pt-8 border-t border-[#e6e6e6] text-center">
        <p className="label-caps text-muted mb-5">BUSINESS ACCOUNT?</p>
        <div className="flex justify-center gap-8">
          <Link href={`${base}/business`} className="label-caps !text-[10px] link-underline">
            PARTNER LOGIN
          </Link>
          <Link href={`${base}/business`} className="label-caps !text-[10px] link-underline">
            PROCUREMENT LOGIN
          </Link>
        </div>
      </div>
    </main>
  );
}

function AccField({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="label-caps !text-[10px] text-muted">{label}</span>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="w-full mt-2 border border-[#d4d4d4] focus:border-[#0a0a0a] outline-none px-4 py-3 text-sm transition-colors"
      />
    </label>
  );
}
