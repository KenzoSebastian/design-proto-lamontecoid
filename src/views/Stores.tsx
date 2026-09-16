"use client";

import { useMemo, useState } from "react";
import { STORES } from "@/data/markets";
import { useMarket } from "@/store/market";
import Reveal from "@/components/Reveal";

export default function Stores() {
  const { t, market } = useMarket();
  const [country, setCountry] = useState("all");
  const [city, setCity] = useState("all");

  const countries = useMemo(() => [...new Set(STORES.map((s) => s.country))], []);
  const cities = useMemo(
    () =>
      [...new Set(
        STORES.filter((s) => country === "all" || s.country === country).map((s) => s.city)
      )],
    [country]
  );

  const list = STORES.filter(
    (s) =>
      (country === "all" || s.country === country) && (city === "all" || s.city === city)
  );

  return (
    <main className="px-6 md:px-10 max-w-[1600px] mx-auto pb-24">
      <div className="pt-10 pb-8">
        <p className="label-caps !text-[10px] text-muted">{t("nav.stores")}</p>
        <h1 className="font-editorial font-light text-5xl md:text-6xl mt-4">{t("stores.title")}</h1>
        <p className="text-muted mt-3 max-w-xl">{t("stores.sub")}</p>
      </div>

      {/* filters */}
      <div className="flex flex-wrap gap-4 border-y border-[#e6e6e6] py-4">
        <label className="flex items-center gap-3">
          <span className="label-caps !text-[10px] text-muted">{t("stores.country")}</span>
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setCity("all");
            }}
            className="label-caps bg-transparent outline-none cursor-pointer"
          >
            <option value="all">{t("stores.all").toUpperCase()}</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c.toUpperCase()}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-3">
          <span className="label-caps !text-[10px] text-muted">{t("stores.city")}</span>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="label-caps bg-transparent outline-none cursor-pointer"
          >
            <option value="all">{t("stores.all").toUpperCase()}</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c.toUpperCase()}</option>
            ))}
          </select>
        </label>
      </div>

      {/* list */}
      <div className="grid md:grid-cols-2 gap-x-10 mt-10">
        {list.map((s, i) => (
          <Reveal key={s.id} delay={i * 60}>
            <article className="border-t border-[#0a0a0a] py-8">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-editorial font-light text-3xl">{s.name}</h2>
                {s.comingSoon && (
                  <span className="label-caps !text-[9px] bg-[#0a0a0a] text-white px-2 py-1 whitespace-nowrap">
                    {t("stores.comingSoon")}
                  </span>
                )}
              </div>
              <p className="label-caps !text-[10px] text-muted mt-2">
                {s.city.toUpperCase()} · {s.country.toUpperCase()}
                {s.market === market.code && <span className="accent-orange"> · YOUR MARKET</span>}
              </p>
              <p className="text-sm mt-5 max-w-md">{s.address}</p>
              <div className="grid sm:grid-cols-2 gap-6 mt-6">
                <div>
                  <p className="label-caps !text-[9px] text-muted mb-2">{t("stores.hours")}</p>
                  <p className="text-[13px]">{s.hours}</p>
                </div>
                <div>
                  <p className="label-caps !text-[9px] text-muted mb-2">{t("stores.services")}</p>
                  <p className="text-[13px]">{s.services.join(" · ")}</p>
                </div>
              </div>
              <button className="label-caps !text-[10px] link-underline mt-6">
                {t("stores.directions")} →
              </button>
            </article>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
