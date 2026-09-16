import Product from "@/views/Product";
import { products } from "@/data/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default function Page() {
  return <Product />;
}
