import Category from "@/views/Category";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    "girls",
    "boys",
    "baby",
    "little-kids",
    "new",
    "best-sellers",
    "trending",
    "age-baby",
    "age-little",
    "age-kids",
  ].map((category) => ({ category }));
}

export default function Page() {
  return <Category />;
}
