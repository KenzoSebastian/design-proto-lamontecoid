"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { getProduct, isAvailableIn } from "@/data/catalog";
import { priceFor } from "@/data/prices";
import { useMarket } from "@/store/market";

export interface CartItem {
  productId: string;
  size: string;
  color: string;
  qty: number;
}

interface ShopState {
  cart: CartItem[];
  wishlist: string[];
  cartOpen: boolean;
  searchOpen: boolean;
  menuOpen: boolean;
  addToCart: (item: CartItem) => void;
  updateQty: (index: number, qty: number) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setMenuOpen: (v: boolean) => void;
  cartCount: number;
  cartTotal: number;
}

const Ctx = createContext<ShopState | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const { market } = useMarket();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const i = prev.findIndex(
        (c) =>
          c.productId === item.productId &&
          c.size === item.size &&
          c.color === item.color
      );
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + item.qty };
        return next;
      }
      return [...prev, item];
    });
    setCartOpen(true);
  };

  const updateQty = (index: number, qty: number) =>
    setCart((prev) =>
      qty <= 0
        ? prev.filter((_, i) => i !== index)
        : prev.map((c, i) => (i === index ? { ...c, qty } : c))
    );

  const removeItem = (index: number) =>
    setCart((prev) => prev.filter((_, i) => i !== index));

  const clearCart = () => setCart([]);

  const toggleWishlist = (id: string) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );

  const cartCount = useMemo(() => cart.reduce((s, c) => s + c.qty, 0), [cart]);
  // Market-aware total: priced from the current market's price list and
  // excluding items not sold in this market (revalidated on market switch).
  const cartTotal = useMemo(
    () =>
      cart.reduce((s, c) => {
        const p = getProduct(c.productId);
        if (!p || !isAvailableIn(p, market.code)) return s;
        return s + c.qty * (priceFor(market.code, c.productId)?.price ?? p.price);
      }, 0),
    [cart, market]
  );

  return (
    <Ctx.Provider
      value={{
        cart,
        wishlist,
        cartOpen,
        searchOpen,
        menuOpen,
        addToCart,
        updateQty,
        removeItem,
        clearCart,
        toggleWishlist,
        setCartOpen,
        setSearchOpen,
        setMenuOpen,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useShop() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
