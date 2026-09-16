"use client";

import Link from "next/link";
import { useMarket } from "@/store/market";

/**
 * Zara-style numbered mega menu:
 * 01 NEW IN / 02 GIRLS 6–14 / 03 BOYS / 04 LITTLE KIDS / 05 BABY / 06 SHOP BY AGE
 */
export default function MegaMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { base, t } = useMarket();

  const COLS: { title: string; links: { label: string; to: string }[] }[] = [
    {
      title: t("mega.newIn"),
      links: [
        { label: t("mega.newArrivals"), to: `${base}/kids/new` },
        { label: t("mega.bestSellers"), to: `${base}/kids/best-sellers` },
        { label: t("mega.trending"), to: `${base}/kids/trending` },
      ],
    },
    {
      title: t("mega.girls"),
      links: [
        { label: t("mega.dresses"), to: `${base}/kids/girls` },
        { label: t("mega.sets"), to: `${base}/kids/girls` },
        { label: t("mega.occasion"), to: `${base}/kids/girls` },
        { label: t("mega.viewAll"), to: `${base}/kids/girls` },
      ],
    },
    {
      title: t("mega.boys"),
      links: [
        { label: t("mega.shirts"), to: `${base}/kids/boys` },
        { label: t("mega.sets"), to: `${base}/kids/boys` },
        { label: t("mega.outerwear"), to: `${base}/kids/boys` },
        { label: t("mega.viewAll"), to: `${base}/kids/boys` },
      ],
    },
    {
      title: t("mega.littleKids"),
      links: [
        { label: t("mega.everyday"), to: `${base}/kids/little-kids` },
        { label: t("mega.sets"), to: `${base}/kids/little-kids` },
        { label: t("mega.dresses"), to: `${base}/kids/little-kids` },
        { label: t("mega.viewAll"), to: `${base}/kids/little-kids` },
      ],
    },
    {
      title: t("mega.baby"),
      links: [
        { label: t("mega.newborn"), to: `${base}/kids/baby` },
        { label: t("mega.rompers"), to: `${base}/kids/baby` },
        { label: t("mega.viewAll"), to: `${base}/kids/baby` },
      ],
    },
    {
      title: t("mega.shopByAge"),
      links: [
        { label: t("cat.age-baby"), to: `${base}/kids/age-baby` },
        { label: t("cat.age-little"), to: `${base}/kids/age-little` },
        { label: t("cat.age-kids"), to: `${base}/kids/age-kids` },
        { label: t("nav.sale"), to: `${base}/sale` },
      ],
    },
  ];

  return (
    <div
      className={`hidden lg:block absolute left-0 top-full w-full bg-white text-[#0a0a0a] border-t border-b border-[#e6e6e6] transition-all duration-300 ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-10 py-12 grid grid-cols-7 gap-8">
        {COLS.map((col) => (
          <div key={col.title}>
            <p className="label-caps !text-[10px] text-muted mb-5">{col.title}</p>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.to}
                    onClick={onClose}
                    className="text-[13px] hover:underline underline-offset-4"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Link href={`${base}/kids/new`} onClick={onClose} className="group block">
          <div className="overflow-hidden aspect-[3/4] bg-cream">
            <img
              src="/images/story-weekend.jpg"
              alt="New collection"
              className="w-full h-full object-cover img-zoom"
            />
          </div>
          <p className="label-caps mt-3 link-underline inline-block">THE WEEKEND EDIT</p>
        </Link>
      </div>
    </div>
  );
}
