export interface Product {
  id: string;
  name: string;
  price: number;
  compareAt?: number;
  category: "girls" | "boys" | "baby" | "unisex";
  ageRange: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  image: string;
  label?: "NEW" | "BESTSELLER" | "LIMITED" | "ONLINE EXCLUSIVE" | "LOW STOCK";
  collection: string;
  material: string;
  story: string;
  isSale?: boolean;
  /** Market availability — undefined = available in all markets */
  markets?: string[];
  /** Markets where this SKU is announced but not yet sellable */
  comingSoon?: string[];
}

export const isAvailableIn = (p: Product, market: string) =>
  !p.markets || p.markets.includes(market);

export const isComingSoonIn = (p: Product, market: string) =>
  !!p.comingSoon?.includes(market);

/** Parse "3–6 years" / "0–12 months" into a numeric age range in years. */
export function ageRangeOf(p: Product): [number, number] {
  const m = p.ageRange.match(/(\d+(?:\.\d+)?)\s*[–-]\s*(\d+(?:\.\d+)?)\s*(months?|years?)/i);
  if (!m) return [0, 14];
  let min = parseFloat(m[1]);
  let max = parseFloat(m[2]);
  if (/months?/i.test(m[3])) {
    min /= 12;
    max /= 12;
  }
  return [min, max];
}

export const AGE_GROUPS = [
  { key: "age-baby", label: "0–18 Months", min: 0, max: 1.5 },
  { key: "age-little", label: "1½–6 Years", min: 1, max: 6 },
  { key: "age-kids", label: "6–14 Years", min: 6, max: 14 },
] as const;

export const inAgeGroup = (p: Product, min: number, max: number) => {
  const [a, b] = ageRangeOf(p);
  return b >= min && a <= max;
};

export const KIDS_SIZES = ["100", "110", "120", "130", "140"];
export const BABY_SIZES = ["68", "74", "80", "86", "92"];

export const products: Product[] = [
  {
    id: "frill-blouse-pleated-skirt",
    name: "Frill Blouse & Pleated Skirt Set",
    price: 389000,
    compareAt: 459000,
    category: "girls",
    ageRange: "6–9 years",
    sizes: KIDS_SIZES,
    colors: [{ name: "White/Black", hex: "#1c1c1c" }],
    image: "/images/added1.jpeg",
    label: "BESTSELLER",
    collection: "Back to School",
    material: "Cotton poplin, polyester pleated skirt",
    story:
      "A tailored poplin blouse framed with delicate cascading ruffles and a black contrast bow, paired with an accordion pleated skirt.",
    isSale: true,
    markets: ["id", "sg", "my", "vn", "jp", "cn", "au", "us", "uk", "eu", "bd"],
  },
  {
    id: "knit-cardigan-polka-set",
    name: "Cardigan & Tiered Polka Skirt Set",
    price: 369000,
    category: "girls",
    ageRange: "3–6 years",
    sizes: KIDS_SIZES,
    colors: [{ name: "Black/Sand Dot", hex: "#2b2b2b" }],
    image: "/images/added2.jpeg",
    label: "NEW",
    collection: "The Weekend Edit",
    material: "Fine knit cotton, printed chiffon",
    story:
      "Soft crewneck cardigan with snap fastenings, layered effortlessly over a gathered double-tiered polka dot skirt.",
    markets: ["id", "sg", "my", "vn", "jp", "cn", "au", "us", "uk", "eu", "bd"],
  },
  {
    id: "wide-leg-denim-set",
    name: "Wide-Leg Denim & Ribbed Top Set",
    price: 349000,
    category: "girls",
    ageRange: "6–9 years",
    sizes: KIDS_SIZES,
    colors: [
      { name: "Washed Blue", hex: "#526e8a" },
      { name: "Ecru", hex: "#f1eee7" },
    ],
    image: "/images/added3.jpeg",
    collection: "Everyday Essentials",
    material: "100% cotton denim, ribbed jersey",
    story:
      "A breathable mock-rib long-sleeve tee paired with slouchy wide-leg denim featuring a gentle elastic paperbag waistband.",
    markets: ["id", "sg", "my", "vn", "jp", "cn", "au", "us", "uk", "eu", "bd"],
  },
  {
    id: "sailor-tracksuit-set",
    name: "Sailor Collar Contrast Tracksuit",
    price: 429000,
    category: "girls",
    ageRange: "6–9 years",
    sizes: KIDS_SIZES,
    colors: [{ name: "Black/White", hex: "#1e1e1e" }],
    image: "/images/added4.jpeg",
    label: "ONLINE EXCLUSIVE",
    collection: "Celebration",
    material: "Double-knit jersey cotton",
    story:
      "Sport meets timeless tailoring: an oversized sailor-style cape collar jacket paired with piped track trousers.",
    markets: ["id", "sg", "my", "ae", "sa", "vn", "cn", "au", "us", "uk", "eu", "bd"],
  },
  {
    id: "linen-cargo-jogger",
    name: "Linen Utility Cargo Jogger Set",
    price: 319000,
    compareAt: 389000,
    category: "girls",
    ageRange: "6–9 years",
    sizes: KIDS_SIZES,
    colors: [
      { name: "Mocha", hex: "#7a5c4d" },
      { name: "Natural", hex: "#e3d9c6" },
    ],
    image: "/images/added5.jpeg",
    collection: "Play All Day",
    material: "Washed linen-cotton blend",
    story:
      "Tapered cargo joggers cut from cool washed linen with functional bellows pockets, matched with an essential slub cotton tee.",
    isSale: true,
    markets: ["id", "sg", "my", "vn", "jp", "cn", "au", "us", "uk", "eu", "bd"],
  },
  {
    id: "active-tank-shorts-set",
    name: "Vintage Graphic Tank & Shorts Set",
    price: 229000,
    category: "boys",
    ageRange: "1–3 years",
    sizes: KIDS_SIZES,
    colors: [
      { name: "Crimson Red", hex: "#b82b2b" },
      { name: "Ecru", hex: "#f0ead9" },
    ],
    image: "/images/added6.jpeg",
    label: "NEW",
    collection: "Play All Day",
    material: "100% organic cotton jersey",
    story:
      "A sleeveless muscle tank featuring vintage athletics lettering with breathable pull-on twill shorts for active sunny days.",
    markets: ["id", "sg", "my", "vn", "jp", "cn", "au", "us", "uk", "eu", "bd"],
  },
  {
    id: "preppy-vest-shirt-set",
    name: "Heritage Knit Vest & Oxford Set",
    price: 459000,
    category: "boys",
    ageRange: "3–6 years",
    sizes: KIDS_SIZES,
    colors: [{ name: "Chambray/Cream", hex: "#87a4c0" }],
    image: "/images/added7.jpeg",
    label: "BESTSELLER",
    collection: "Back to School",
    material: "Combed cotton knit, cotton chambray",
    story:
      "A collegiate jacquard sweater vest with contrast tipping layered over a chambray button-down shirt and relaxed jeans.",
    markets: ["id", "sg", "my", "vn", "jp", "cn", "au", "us", "uk", "eu", "bd"],
  },
  {
    id: "panda-fleece-loungeset",
    name: "Panda Monogram Sweatshirt Set",
    price: 339000,
    category: "unisex",
    ageRange: "3–6 years",
    sizes: KIDS_SIZES,
    colors: [
      { name: "Cream Panda", hex: "#f2ece1" },
      { name: "Charcoal", hex: "#2f2f2f" },
    ],
    image: "/images/added8.jpeg",
    collection: "Everyday Essentials",
    material: "Brushed French terry, cotton waffle",
    story:
      "All-over panda monogram crewneck pullover crafted from plush French terry, paired with textured waffle shorts.",
    markets: ["id", "sg", "my", "vn", "jp", "cn", "au", "us", "uk", "eu", "bd"],
  },
  {
    id: "utility-overshirt-cargo-set",
    name: "Utility Overshirt & Grey Cargo Set",
    price: 439000,
    category: "boys",
    ageRange: "6–9 years",
    sizes: KIDS_SIZES,
    colors: [
      { name: "Washed Black", hex: "#343434" },
      { name: "Slate Grey", hex: "#7d8285" },
    ],
    image: "/images/added9.jpeg",
    label: "NEW",
    collection: "Everyday Essentials",
    material: "Cotton ripstop, slub cotton",
    story:
      "Lightweight zip-front overshirt layered over a clean white tee, finished with multi-pocket slate cargo trousers.",
    markets: ["id", "sg", "my", "vn", "jp", "cn", "au", "us", "uk", "eu", "bd"],
  },
  {
    id: "leopard-trim-denim-set",
    name: "Leopard Accent Denim Trucker & Jeans Set",
    price: 499000,
    compareAt: 559000,
    category: "girls",
    ageRange: "6–9 years",
    sizes: KIDS_SIZES,
    colors: [{ name: "Light Wash/Leopard", hex: "#9bb5ce" }],
    image: "/images/added10.jpeg",
    label: "LIMITED",
    collection: "The Weekend Edit",
    material: "100% washed cotton denim, printed canvas",
    story:
      "A vintage light-wash denim trucker jacket and matching wide-leg jeans, accented with bold leopard-print cuffs, pocket flaps, and hem details.",
    isSale: true,
    markets: ["id", "sg", "my", "vn", "jp", "cn", "au", "us", "uk", "eu", "bd"],
  },  
  {
    id: "poplin-dress",
    name: "Poplin Puff-Sleeve Dress",
    price: 329000,
    category: "girls",
    ageRange: "3–6 years",
    sizes: KIDS_SIZES,
    colors: [
      { name: "Sand", hex: "#d8c7a8" },
      { name: "White", hex: "#f5f3ee" },
    ],
    image: "/images/p1.jpg",
    label: "NEW",
    collection: "The Weekend Edit",
    material: "100% cotton poplin",
    story:
      "A crisp cotton poplin dress with gently gathered puff sleeves. Cut for movement, finished by hand.",
  },
  {
    id: "linen-overshirt",
    name: "Linen Overshirt",
    price: 399000,
    category: "boys",
    ageRange: "3–9 years",
    sizes: KIDS_SIZES,
    colors: [
      { name: "Natural", hex: "#e3d9c6" },
      { name: "Olive", hex: "#8a8a6d" },
    ],
    image: "/images/p2.jpg",
    label: "NEW",
    collection: "Everyday Essentials",
    material: "100% washed linen",
    story: "A breathable washed-linen overshirt with utility chest pockets. Layers through every season.",
  },
  {
    id: "organic-romper",
    name: "Organic Cotton Romper",
    price: 249000,
    category: "baby",
    ageRange: "0–12 months",
    sizes: BABY_SIZES,
    colors: [
      { name: "Cream", hex: "#f0ead9" },
      { name: "Sand", hex: "#d8c7a8" },
    ],
    image: "/images/p3.jpg",
    collection: "Little Beginnings",
    material: "100% organic cotton",
    story: "Buttery-soft organic cotton with a gentle collar and nickel-free snaps for easy changes.",
  },
  {
    id: "tulle-dress",
    name: "Tulle Occasion Dress",
    price: 549000,
    category: "girls",
    ageRange: "3–6 years",
    sizes: KIDS_SIZES,
    colors: [{ name: "Ivory", hex: "#f4efe6" }],
    image: "/images/p4.jpg",
    label: "LIMITED",
    collection: "Celebration",
    material: "Tulle, satin lining",
    story:
      "Layered ivory tulle with a satin ribbon waist. Made for birthdays, weddings, and small grand entrances.",
    comingSoon: ["cn", "bd"],
  },
  {
    id: "cargo-set",
    name: "Utility Cargo Set",
    price: 379000,
    compareAt: 449000,
    category: "boys",
    ageRange: "6–9 years",
    sizes: KIDS_SIZES,
    colors: [
      { name: "Olive", hex: "#8a8a6d" },
      { name: "Cream", hex: "#f0ead9" },
    ],
    image: "/images/p5.jpg",
    label: "BESTSELLER",
    collection: "Play All Day",
    material: "Cotton twill",
    story: "A two-piece set in durable cotton twill. Reinforced knees, elastic waist — built for real play.",
    isSale: true,
  },
  {
    id: "knit-cardigan",
    name: "Chunky Knit Cardigan",
    price: 429000,
    category: "unisex",
    ageRange: "1–3 years",
    sizes: ["92", ...KIDS_SIZES.slice(0, 3)],
    colors: [
      { name: "Oatmeal", hex: "#d9cfbd" },
      { name: "Charcoal", hex: "#4a4a48" },
    ],
    image: "/images/p6.jpg",
    collection: "Everyday Essentials",
    material: "Cotton-wool blend knit",
    story: "A chunky knit with natural wooden buttons. Warm without weight, soft against skin.",
  },
  {
    id: "denim-overalls",
    name: "Soft Denim Overalls",
    price: 359000,
    category: "baby",
    ageRange: "1–3 years",
    sizes: BABY_SIZES,
    colors: [{ name: "Light Wash", hex: "#a9bfd0" }],
    image: "/images/p7.jpg",
    label: "BESTSELLER",
    collection: "Little Explorers",
    material: "Soft-washed denim",
    story: "Featherlight denim overalls with adjustable straps. A small classic, made softer.",
  },
  {
    id: "breton-tee",
    name: "Breton Stripe Tee",
    price: 179000,
    category: "unisex",
    ageRange: "3–9 years",
    sizes: KIDS_SIZES,
    colors: [
      { name: "Ecru/Sand", hex: "#e8ddc8" },
      { name: "Ecru/Navy", hex: "#2c3a4d" },
    ],
    image: "/images/p8.jpg",
    collection: "Everyday Essentials",
    material: "Heavyweight cotton jersey",
    story: "The eternal stripe, cut boxy in heavyweight jersey. One in every colour is the correct number.",
  },
  {
    id: "weekend-linen-dress",
    name: "Weekend Linen Dress",
    price: 469000,
    category: "girls",
    ageRange: "6–9 years",
    sizes: KIDS_SIZES,
    colors: [{ name: "Cream", hex: "#f0ead9" }],
    image: "/images/cat-girls.jpg",
    label: "NEW",
    collection: "The Weekend Edit",
    material: "100% linen",
    story: "A flowing linen dress that catches the light when she spins. Weekend, distilled.",
  },
  {
    id: "smart-set",
    name: "Smart Shirt & Shorts Set",
    price: 419000,
    category: "boys",
    ageRange: "6–9 years",
    sizes: KIDS_SIZES,
    colors: [
      { name: "Navy", hex: "#2c3a4d" },
      { name: "Sand", hex: "#d8c7a8" },
    ],
    image: "/images/cat-boys.jpg",
    collection: "Back to School",
    material: "Cotton oxford",
    story: "Crisp oxford shirt with tailored shorts. School-ready, ceremony-ready, anything-ready.",
  },
  {
    id: "explorer-set",
    name: "Explorer Play Set",
    price: 299000,
    compareAt: 359000,
    category: "unisex",
    ageRange: "3–6 years",
    sizes: KIDS_SIZES,
    colors: [{ name: "Earth", hex: "#b09a72" }],
    image: "/images/story-play.jpg",
    collection: "Play All Day",
    material: "French terry cotton",
    story: "French terry set in earth tones. Grass stains wash out; the memory of the afternoon stays.",
    isSale: true,
    markets: ["id", "sg", "my", "vn", "jp", "cn", "au", "us", "uk", "eu", "bd"],
  },
  {
    id: "celebration-dress",
    name: "Golden Hour Dress",
    price: 589000,
    category: "girls",
    ageRange: "6–9 years",
    sizes: KIDS_SIZES,
    colors: [{ name: "Sand", hex: "#d8c7a8" }],
    image: "/images/story-weekend.jpg",
    label: "ONLINE EXCLUSIVE",
    collection: "Celebration",
    material: "Cotton sateen",
    story: "Sateen with a soft sheen, photographed at golden hour. Online exclusive, limited run.",
    markets: ["id", "sg", "my", "ae", "sa", "vn", "cn", "au", "us", "uk", "eu", "bd"],
  },
];

export const stories = [
  {
    slug: "the-weekend-edit",
    title: "The Weekend Edit",
    kicker: "Editorial 01",
    image: "/images/story-weekend.jpg",
    copy: "Slow mornings, sun-warmed steps, linen that moves with her. A small wardrobe for unhurried days.",
    productIds: ["weekend-linen-dress", "poplin-dress", "breton-tee", "celebration-dress"],
  },
  {
    slug: "back-to-school",
    title: "Back to School",
    kicker: "Editorial 02",
    image: "/images/story-school.jpg",
    copy: "Crisp collars and confident first days. Smart sets that survive the classroom and the corridor race.",
    productIds: ["smart-set", "linen-overshirt", "breton-tee", "cargo-set"],
  },
  {
    slug: "play-all-day",
    title: "Play All Day",
    kicker: "Editorial 03",
    image: "/images/story-play.jpg",
    copy: "Reinforced knees, elastic waists, zero restrictions. Engineered for the serious business of play.",
    productIds: ["cargo-set", "explorer-set", "denim-overalls", "breton-tee"],
  },
];

export const formatIDR = (n: number) =>
  "Rp" + n.toLocaleString("id-ID");

export const getProduct = (id: string) => products.find((p) => p.id === id);
