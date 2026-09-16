"use client";

import Link from "next/link";
import { useMarket } from "@/store/market";

export default function Logo({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  const { base } = useMarket();
  return (
    <Link href={base} aria-label="LAMONTE home" className={`inline-block ${className}`}>
      <img
        src={light ? "/logo-light.png" : "/logo-dark.png"}
        alt="LAMONTE"
        className="h-full w-auto select-none"
        draggable={false}
      />
    </Link>
  );
}
